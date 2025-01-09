import { ActionInputs } from "./actionInputs";
import { ReleaseResponse } from "./types";
declare function postSlackMessageForRelease(repoName: string, releaseData: ReleaseResponse, actionInputs: ActionInputs): Promise<void>;
declare function postSlackMessageForRef(repoName: string, ref: string, actionInputs: ActionInputs): Promise<void>;
export { postSlackMessageForRelease, postSlackMessageForRef };
