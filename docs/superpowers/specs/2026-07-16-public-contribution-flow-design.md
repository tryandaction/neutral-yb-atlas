# Public Contribution Flow Design

## Goal

Keep Neutral Yb Atlas a trustworthy learning resource while allowing readers to report corrections and contribute improvements. A browser session must never modify published source text, the Git repository, or the production site directly.

## Roles and Boundaries

| Role | Allowed action | Cannot do |
| --- | --- | --- |
| Reader | Read, open a contribution issue, keep a local suggestion draft | Edit published text or deploy |
| Contributor | Submit a GitHub Issue, fork the repository, open a Pull Request | Push to `main` or publish production |
| Maintainer | Review sources, merge approved Pull Requests, deploy verified builds | Bypass review for scientific corrections |

## Reader Experience

1. The site exposes one visible contribution command: `纠错与贡献` / `Contribute`.
2. The command opens the repository's GitHub Issue template. It does not alter page text and does not require an application backend.
3. The template asks for page URL or section identifier, quoted original text, proposed replacement, reason, and a DOI, arXiv record, official database, or stable publisher URL for scientific claims.
4. The contribution command is present in the shared footer rather than beside educational controls, so it cannot be mistaken for a teaching interaction.

## Draft and Unsaved-State Rules

The public site will not offer inline editing of published text. If a future in-page suggestion draft is added, it must use the following explicit states:

- `未开始` / `Not started`: no draft exists.
- `仅保存在当前浏览器` / `Saved in this browser only`: local draft storage succeeded; no GitHub action occurred.
- `待提交至 GitHub` / `Ready to submit to GitHub`: the user has completed required fields.
- `已跳转至 GitHub` / `Opened GitHub`: the browser opened the Issue form; the site must not claim that GitHub accepted or published the change.
- `保存失败` / `Local save failed`: storage is unavailable; the user can copy the draft manually.

Leaving the document with a local, unsubmitted draft triggers a browser unload warning. Discarding a draft requires a confirmation dialog. Internal hash navigation does not trigger the warning because it stays on the same document.

## Repository Workflow

1. A maintainer triages the Issue and checks the cited source.
2. A contributor creates a Pull Request containing the content change, source update, and any translation update.
3. CI runs lint, build, public-boundary checks, and focused content tests.
4. A maintainer reviews the diff and merges only approved changes to `main`.
5. Cloudflare Pages deploys the verified build. If the repository integration does not trigger, a maintainer manually deploys the same verified `site/dist` artifact.

## Removal of the Legacy Local Editor

Remove the unused `WorkspaceState` editing fields, article overrides, notes, snapshots, import/export helpers, and the dormant workspace UI from the runtime path. Remove `contentEditable` support from article sections. Language and reading-mode preferences remain local browser preferences because they are not content changes.

## Security Decisions

- Do not place GitHub tokens, OAuth client secrets, or write-capable API calls in the frontend.
- Do not create commits, branches, Pull Requests, or deployments from anonymous browser input.
- Do not accept private laboratory data, unpublished manuscripts, credentials, or restricted figure assets through public contribution channels.
- Require source links for scientific corrections and preserve the GitHub review record.

## Verification

- Unit tests prove article text has no editable DOM state.
- Integration tests prove the contribution command targets the repository Issue workflow and no workspace/editor command is present.
- Browser tests cover the contribution command, draft warning when a future draft is enabled, and browser-width overflow.
- `npm run lint`, `npm run build`, and `npm run check:public` pass before release.
