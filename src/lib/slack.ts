import { info } from "@actions/core";
import { WebClient, Block, KnownBlock } from "@slack/web-api";
import slackifyMarkdown from "slackify-markdown";
import { ActionInputs } from "./actionInputs";
import { ReleaseResponse } from "./types";

const RELEASE_BODY_TEXT_MAX_LENGTH = 2900;

function getMessageBlocks(
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

async function postSlackMessage(repoName: string, releaseData: ReleaseResponse, actionInputs: ActionInputs) {
  const { name: releaseName, body: releaseBody, html_url: releaseHtmlUrl } = releaseData;
  const { slackToken, slackChannelIds, includeReleaseNotes } = actionInputs;

  const mainTitle = `${repoName} ${releaseName} has been released! :tada: :rocket:`;
  const releaseBodyText = beautifyGitHubLinks(releaseBody ?? "");
  const slackWebApi = new WebClient(slackToken);
  const blocks: Block[] | KnownBlock[] = getMessageBlocks(mainTitle, releaseBodyText, releaseName, releaseHtmlUrl, includeReleaseNotes);

  slackChannelIds.split(",").forEach(async (channelId) => {
    info(`Posting to channel ${channelId}`);

    await slackWebApi.chat.postMessage({
      channel: channelId,
      text: mainTitle,
      blocks: blocks,
    });
  });

  //   result.ok ? info(`Message posted successfully to ${slackChannelIds}`) : error("Message failed to post");
}

export { postSlackMessage };
