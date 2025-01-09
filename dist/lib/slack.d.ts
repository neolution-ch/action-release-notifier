import { ActionInputs } from "./actionInputs";
import { ReleaseResponse } from "./types";
import { Context } from "@actions/github/lib/context";
declare function postSlackMessageForRelease(repoName: string, releaseData: ReleaseResponse, actionInputs: ActionInputs): Promise<void>;
declare function postSlackMessageForRef(repoName: string, context: Context, actionInputs: ActionInputs): Promise<void>;
export { postSlackMessageForRelease, postSlackMessageForRef };
