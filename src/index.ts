import { info } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { getActionInputs } from "./lib/actionInputs";
import { postSlackMessageForRef, postSlackMessageForRelease } from "./lib/slack";

const run = async () => {
  const actionInputs = getActionInputs();
  const githubApi = getOctokit(actionInputs.gitHubToken);

  const repoOwner = actionInputs.repo.split("/")[0];
  const repoName = actionInputs.repo.split("/")[1];

  const releaseId: number = actionInputs.releaseId || context.payload.release?.id || 0;

  // if (!releaseId) {
  //   throw new Error("Please either use a release-id input or trigger this action on a release event");
  // }

  if (releaseId) {
    info(`Fetching release data from GitHub with release id: '${releaseId}'`);

    const release = await githubApi.rest.repos.getRelease({
      owner: repoOwner,
      repo: repoName,
      release_id: releaseId,
    });

    info(`Found release: '${release.data.name}'`);

    if (actionInputs.ignoreAlphaReleases && release.data.tag_name.includes("alpha")) {
      info("Ignoring alpha release");
      return;
    }

    if (actionInputs.ignoreBetaReleases && release.data.tag_name.includes("beta")) {
      info("Ignoring beta release");
      return;
    }

    if (actionInputs.ignoreRcReleases && release.data.tag_name.includes("rc")) {
      info("Ignoring rc release");
      return;
    }

    await postSlackMessageForRelease(repoName, release.data, actionInputs);
  } else {
    await postSlackMessageForRef(repoName, context.ref, actionInputs);
  }
};

run();
