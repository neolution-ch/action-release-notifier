# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### dependabot: \#13 Bump follow-redirects from 1.15.4 to 1.15.9

### dependabot: \#12 Bump braces from 3.0.2 to 3.0.3

### dependabot: \#7 Bump follow-redirects from 1.15.2 to 1.15.4

### dependabot: \#6 Bump tj-actions/changed-files from 34 to 41 in /.github/workflows

## [1.4.0] - 2025-01-09

### Changed

- Upgraded from node 16 to node 20.

### Added

- Added `fallback-to-ref` input parameter to allow to use the ref as fallback if there was no release found.

## [1.3.0] - 2024-09-30

### Added

- Added support to ignore alpha, beta and rc releases. This can be configured by setting the `ignore-alpha-releases`, `ignore-beta-releases` and `ignore-rc-releases` input parameters to `true`.

### dependabot: \#5 Bump word-wrap from 1.2.3 to 1.2.5

### dependabot: \#3 Bump json5 from 1.0.1 to 1.0.2

## [1.2.0] - 2023-05-09

### Added

- Added check for too long release body texts. Limit is set to 2900 characters. Text will get truncated if it exceeds the limit.

## [1.1.0] - 2022-10-27

### Added

- Added the functionality to beautify automatically created github release notes urls.
- Added missing @typescript-eslint/eslint-plugin package to the dependencies.
- Added LICENSE.md
- Added CODEOWNERS file

## [1.0.0] - 2022-10-26

### Added

- Created a new action to post a GitHub release to Slack :tada:

[unreleased]: https://github.com/neolution-ch/action-release-notifier/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/neolution-ch/action-release-notifier/compare/v1.3.0-1-gebb2be14b5687a1db7c4c99cd952fdd08d045b51...v1.4.0
[1.3.0]: https://github.com/neolution-ch/action-release-notifier/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/neolution-ch/action-release-notifier/compare/v1...v1.2.0
[1.1.0]: https://github.com/neolution-ch/action-release-notifier/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/neolution-ch/action-release-notifier/releases/tag/v1.0.0
