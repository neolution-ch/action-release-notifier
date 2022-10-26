interface ActionInputs {
    slackToken: string;
    slackChannelIds: string;
    gitHubToken: string;
    repo: string;
    includeReleaseNotes: boolean;
    releaseId: number;
}
declare const getActionInputs: () => ActionInputs;
export { getActionInputs, ActionInputs };
