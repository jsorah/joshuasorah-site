# Joshua Sorah’s site

Personal website built with Hugo Extended and the Terminal theme, hosted on Netlify.

## Local development

Clone with submodules, or initialize them in an existing checkout:

```bash
git submodule update --init --recursive
```

Install the version used by Netlify through Go (requires a C/C++ toolchain for the extended build):

```bash
go install -tags extended github.com/gohugoio/hugo@v0.169.0
hugo version
```

Ensure your Go bin directory is on `PATH`. Go may download a newer toolchain when required.

With `just` installed, start a local preview at http://localhost:1313:

```bash
just
```

`just serve` runs the same preview command, `hugo server -D`, including drafts.

Build production output into `public/`:

```bash
hugo --gc --minify --panicOnWarning
```

Edit site settings in `config.toml` and content under `content/`. Google Analytics is configured under `[services.googleAnalytics]`; verify its tag in production output, since local server behavior can differ.

## Theme maintenance

`themes/terminal` is a Git submodule of [the theme fork](https://github.com/jsorah/hugo-theme-terminal). The fork’s `master` mirrors [upstream](https://github.com/panr/hugo-theme-terminal); `feature/mermaid-js` contains the customizations used by this site. `.gitmodules` tracks that branch, while the site commit pins an exact theme commit.

To update the theme, work on `feature/mermaid-js`, merge the desired upstream changes, and preserve the Mermaid shortcode and conditional script loading. Build and inspect the site, then commit and push the theme changes **before** committing the updated submodule pointer in this repository. Publish the theme commit first so fresh site checkouts can retrieve it.

For an already published theme update:

```bash
git submodule update --remote themes/terminal
git diff --submodule
git add themes/terminal
git commit -m "Update Terminal theme"
```

This advances the theme to the tracked branch tip. Use `git submodule update --init --recursive` instead to restore the exact version pinned by the site.

## Mermaid diagrams

Enable Mermaid in a post’s TOML front matter with `mermaid = true`, then use:

```text
{{< mermaid >}}
graph LR
  A[Start] --> B[Finish]
{{< /mermaid >}}
```

The theme loads a pinned Mermaid version only for enabled posts. After an upgrade, verify diagrams in a browser; a successful Hugo build does not execute Mermaid.

## Deployment

Netlify uses `netlify.toml` to build the site and publish `public/`. Production, deploy previews, and branch deploys pin Hugo to 0.169.0. Keep these pins and the installation command above aligned when upgrading Hugo.

## Reference pages

Handy Utilities and Recipes live outside `content/posts/` and use `type = "reference"`. They appear in navigation rather than the post feed. Update their `lastmod` front matter date (YYYY-MM-DD) when making substantive edits. Their `aliases` preserve redirects from the former post URLs.
