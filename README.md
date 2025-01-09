# Release Notifier

This is a simple action that will get a GitHub release and post it somewhere.
For now only slack is supported, but in the future we might add more providers.

## Usage

The easiest way to use this action is to use it with the `on: release:` trigger.
Than you don't have to manually get the release id. All you need to pass in this case is the slack token and slack channel ids.

```yaml
on:
  release:
    types: [published]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: "neolution-ch/action-release-notifier@v1"
        with:
          slack-token: ${{ secrets.SLACK_RELEASE_NOTIFIER_TOKEN }}
          slack-channel-ids: "XXXXXXXXX,YYYYYYYY"
```

## Slack Token

To get a slack token you need to create a slack app. You can find more information about that [here](https://github.com/slackapi/slack-github-action#technique-2-slack-app).

If you want to post to channels (not only to users) you need to make sure that the app is added to the channels you want to post to (under the integrations tab of channel).

## Inputs

You can find a detailed description of the input parameters in the `action.yml` file.

| Required                 | Name                  | Default                     |
| ------------------------ | --------------------- | --------------------------- |
| :heavy_check_mark:       | slack-token           | -                           |
| :heavy_check_mark:       | slack-channel-ids     | -                           |
| :heavy_multiplication_x: | github-token          | `${{ github.token }}`       |
| :heavy_multiplication_x: | repo                  | ` ${{ github.repository }}` |
| :heavy_multiplication_x: | include-release-notes | `true`                      |
| :heavy_multiplication_x: | release-id            | -                           |
| :heavy_multiplication_x: | ignore-alpha-releases | `false`                     |
| :heavy_multiplication_x: | ignore-beta-releases  | `false`                     |
| :heavy_multiplication_x: | ignore-rc-releases    | `false`                     |
| :heavy_multiplication_x: | fallback-to-ref       | `false`                     |
