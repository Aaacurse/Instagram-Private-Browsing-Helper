# Instagram Public Browsing Helper

A Chrome extension for browsing public Instagram accounts on the web without logging in. It removes the login popup that interrupts scrolling and lets you open posts, profiles and reels from public accounts.

> **Scope:** This only works for content that Instagram already shows to logged-out visitors, which means public accounts. It does not bypass any login wall, and private accounts will still require you to sign in.

## What it does

When you browse public Instagram accounts logged out, a login popup appears and blocks most clicks. This extension:

- Removes the login popup as soon as it appears
- Opens posts when you click them
- Opens profiles when you click a username
- Opens a profile's Reels tab and the Reels page

## Project structure

```
.
├── manifest.json
├── content.js           removes the login popup
├── new_post.js          handles the Reels tab and icon
├── posts_redirect.js    handles clicks on posts
└── profile_redirect.js  handles clicks on usernames
```

## Install

1. Clone or download this repository.
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder.
5. Open or refresh Instagram.

After editing any file, click the reload icon on the extension in `chrome://extensions`, then refresh the Instagram tab.

## How it works

Instagram's own code shows the popup when a logged-out user clicks something. Each redirect script listens for clicks in the capture phase on `window`, which runs before Instagram's handlers. If the click is on a post, profile or Reels link, the script cancels the event so Instagram never sees it, then loads the destination URL directly.

- `content.js` uses a `MutationObserver` to delete the popup element whenever it is added to the page.
- `new_post.js` finds the Reels tab by its SVG label, since its `href` is just `#`, and goes to the current URL plus `/reels/`.
- `posts_redirect.js` matches post and reel URLs (`/p/...`, `/username/p/...`, `/reel/...`) and opens them.
- `profile_redirect.js` matches single-segment URLs like `/username/` and skips Instagram's own pages such as `/explore/`.

All scripts are loaded through the `content_scripts` entry in `manifest.json`.

## Adding a new feature

1. Create a new file, for example `my_feature.js`.
2. Wrap the code in `(() => { ... })();` so its variables stay private.
3. Add the file name to the `js` array under `content_scripts` in `manifest.json`.

## Limitations

- Public accounts only. Private accounts, and any page Instagram blocks for logged-out visitors, will still ask you to log in. No script can change that, because the check happens on Instagram's server.
- Instagram may limit how much logged-out visitors can scroll or view, and the extension can't change those limits.
- The popup selector uses Instagram's generated class names, which change from time to time. If the popup comes back, inspect it and update the selector in `content.js`.
- Links with `href="#"` have no URL to read, so they need their own matching logic, like the Reels tab.
- Navigation uses a full page load, so it is slower than a normal in-page click.

## Disclaimer

This project is for personal and educational use. It is not affiliated with Instagram or Meta. Use it at your own risk and follow Instagram's terms of service.
