import { info } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { getActionInputs } from "./lib/actionInputs";
import { postSlackMessage } from "./lib/slack";

const run = async () => {
  const actionInputs = getActionInputs();
  const githubApi = getOctokit(actionInputs.gitHubToken);

  const repoOwner = actionInputs.repo.split("/")[0];
  const repoName = actionInputs.repo.split("/")[1];

  const releaseId: number = actionInputs.releaseId || context.payload.release?.id || 0;

  if (!releaseId) {
    throw new Error("Please either use a release-id input or trigger this action on a release event");
  }

  info(`Fetching release data from GitHub with release id: '${releaseId}'`);

  const release = await githubApi.rest.repos.getRelease({
    owner: repoOwner,
    repo: repoName,
    release_id: releaseId,
  });

  info(`Found release: '${release.data.name}'`);

  await postSlackMessage(repoName, release.data, actionInputs);
};

run();
