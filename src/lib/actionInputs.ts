import { getInput } from "@actions/core";

interface ActionInputs {
  slackToken: string;
  slackChannelIds: string;
  gitHubToken: string;
  repo: string;
  includeReleaseNotes: boolean;
  releaseId: number;
}

const getActionInputs = (): ActionInputs => {
  const slackChannelIds = getInput("slack-channel-ids", { required: true });
  const slackToken = getInput("slack-token", { required: true });
  const gitHubToken = getInput("github-token", { required: true });
  const repo = getInput("repo", { required: true });
  const includeReleaseNotes = getInput("include-release-notes", { required: true }) === "true";
  const releaseId = parseInt(getInput("release-id", { required: false })) || 0;

  return {
    slackToken,
    slackChannelIds,
    gitHubToken,
    repo,
    includeReleaseNotes,
    releaseId,
  };
};

export { getActionInputs, ActionInputs };
