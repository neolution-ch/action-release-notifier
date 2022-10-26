import { GitHub } from "@actions/github/lib/utils";
import { components } from "@octokit/openapi-types";
export declare type GithubApi = InstanceType<typeof GitHub>;
export declare type ReleaseResponse = components["schemas"]["release"];
