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
declare const getActionInputs: () => ActionInputs;
export { getActionInputs, ActionInputs };
