import { ActionInputs } from "./actionInputs";
import { ReleaseResponse } from "./types";
declare function postSlackMessage(repoName: string, releaseData: ReleaseResponse, actionInputs: ActionInputs): Promise<void>;
export { postSlackMessage };
