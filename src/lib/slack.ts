import { error, info } from "@actions/core";
import { WebClient, Block, KnownBlock } from "@slack/web-api";
import slackifyMarkdown from "slackify-markdown";
import { ActionInputs } from "./actionInputs";
import { ReleaseResponse } from "./types";
import { Context } from "@actions/github/lib/context";

const RELEASE_BODY_TEXT_MAX_LENGTH = 2900;

function getMessageBlocksForRelease(
  mainTitle: string,
  releaseBodyText: string,
  releaseName: string | null,
  releaseHtmlUrl: string,
  includeReleaseNotes: boolean,
) {
  const blocks: Block[] | KnownBlock[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: mainTitle,
        emoji: true,
      },
    },
  ];

  if (includeReleaseNotes && releaseBodyText) {
    let markDownText = slackifyMarkdown(releaseBodyText);

    if (markDownText.length > RELEASE_BODY_TEXT_MAX_LENGTH) {
      info(`Release notes are too long to post to slack, truncating to ${RELEASE_BODY_TEXT_MAX_LENGTH} characters`);
      markDownText = `${markDownText.substring(0, RELEASE_BODY_TEXT_MAX_LENGTH)}... \n\n*Release notes truncated due to length*`;
    }

    blocks.push(
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Release Notes:",
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: markDownText,
        },
      },
    );
  }

  blocks.push(
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "View release on GitHub:",
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: `${releaseName}`,
          emoji: true,
        },
        url: releaseHtmlUrl,
      },
    },
  );

  return blocks;
}

const beautifyGitHubLinks = (releaseBody: string) => {
  const pullRequestRegex = /(https:\/\/github.com\/.*\/pull\/(\d*))/g;
  const compareRegex = /(https:\/\/github.com\/.*\/compare\/(.*))/g;

  return releaseBody.replace(pullRequestRegex, "[#$2]($1)").replace(compareRegex, "[$2]($1)");
};

async function postSlackMessageForRelease(repoName: string, releaseData: ReleaseResponse, actionInputs: ActionInputs) {
  const { name: releaseName, body: releaseBody, html_url: releaseHtmlUrl } = releaseData;
  const { includeReleaseNotes } = actionInputs;

  const mainTitle = `${repoName} ${releaseName} has been released! :tada: :rocket:`;
  const releaseBodyText = beautifyGitHubLinks(releaseBody ?? "");
  const blocks: Block[] | KnownBlock[] = getMessageBlocksForRelease(
    mainTitle,
    releaseBodyText,
    releaseName,
    releaseHtmlUrl,
    includeReleaseNotes,
  );

  return postSlackMessageInternal(repoName, actionInputs, blocks);
}

async function postSlackMessageForRef(repoName: string, context: Context, actionInputs: ActionInputs) {
  const mainTitle = `${repoName} has been released! :tada: :rocket:`;
  const runUrl = `${context.payload.repository?.html_url}/actions/runs/${context.runId}`;
  const shaUrl = `${context.payload.repository?.html_url}/commit/${context.sha}`;
  const shortSha = context.sha.slice(0, 7);

  const blocks: Block[] | KnownBlock[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: mainTitle,
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `This wasn't triggered by a GitHub release. Most likely the release worfklow was ran manually.\n
*ref:* ${context.ref}\n
*short sha:* ${shortSha}\n
*sha:* <${shaUrl}|${context.sha}>`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "View run on GitHub:",
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: `${context.runId}`,
          emoji: true,
        },
        url: runUrl,
      },
    },
  ];

  return postSlackMessageInternal(repoName, actionInputs, blocks);
}

async function postSlackMessageInternal(repoName: string, actionInputs: ActionInputs, blocks: Block[] | KnownBlock[]) {
  const { slackToken, slackChannelIds } = actionInputs;

  const mainTitle = `${repoName} has been released! :tada: :rocket:`;
  const slackWebApi = new WebClient(slackToken);

  slackChannelIds.split(",").forEach(async (channelId) => {
    info(`Posting to channel ${channelId}`);

    const slackMessageResponse = await slackWebApi.chat.postMessage({
      channel: channelId,
      text: mainTitle,
      blocks: blocks,
    });

    slackMessageResponse.ok ? info(`Message posted successfully to ${slackChannelIds}`) : error("Message failed to post");
  });
}

export { postSlackMessageForRelease, postSlackMessageForRef };
