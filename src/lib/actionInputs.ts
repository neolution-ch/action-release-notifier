import { getInput } from "@actions/core";

interface ActionInputs {
  slackToken: string;
  slackChannelIds: string;
  gitHubToken: string;
  repo: string;
  includeReleaseNotes: boolean;
  releaseId: number;
  ignoreAlphaReleases: boolean;
  ignoreBetaReleases: boolean;
  ignoreRcReleases: boolean;
}

const getActionInputs = (): ActionInputs => {
  const slackChannelIds = getInput("slack-channel-ids", { required: true });
  const slackToken = getInput("slack-token", { required: true });
  const gitHubToken = getInput("github-token", { required: true });
  const repo = getInput("repo", { required: true });
  const includeReleaseNotes = getInput("include-release-notes", { required: true }) === "true";
  const releaseId = parseInt(getInput("release-id", { required: false })) || 0;
  const ignoreAlphaReleases = getInput("ignore-alpha-releases", { required: false }) === "true";
  const ignoreBetaReleases = getInput("ignore-beta-releases", { required: false }) === "true";
  const ignoreRcReleases = getInput("ignore-rc-releases", { required: false }) === "true";

  return {
    slackToken,
    slackChannelIds,
    gitHubToken,
    repo,
    includeReleaseNotes,
    releaseId,
    ignoreAlphaReleases,
    ignoreBetaReleases,
    ignoreRcReleases,
  };
};

export { getActionInputs, ActionInputs };
