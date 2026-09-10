# xExtension-ThreePanesView (community fork)

Three-panes layout for [FreshRSS](https://freshrss.org/) - adds a vertical right pane that displays article content next to the article list, similar to Thunderbird / Outlook.

## About this fork

This is a community fork of [nicofrand's original extension](https://framagit.org/nicofrand/xextension-threepanesview), unmaintained since 2021. The upstream still works on older FreshRSS versions but breaks on recent releases.

This fork exists to keep the extension compatible with current FreshRSS releases. No new features : only compatibility fixes.

## Compatibility

| FreshRSS version | Status                        |
| ---------------- | ----------------------------- |
| < 1.30.0         | Use upstream (v1.15 or v1.16) |
| 1.30.0 and later | Use this fork                 |

## What was broken on FreshRSS 1.30.0

Right pane stayed empty when clicking an article. The `openArticle` event fired but the extension handler was never attached, because `_load()` crashed on this line:

    Uncaught TypeError: can't access property "style", menuForm is null
        _resize threepanesview.js:58

FreshRSS 1.30.0 removed the `#mark-read-aside` element from the DOM.
The extension read `menuForm` with a null check but wrote to `menuForm.style` without one, throwing before the
`freshrss:openArticle` listener could be registered.

Fix: added the missing null check, matching the defensive pattern already used a few lines above.

## Installation

Copy the extension folder to your FreshRSS extensions directory:

    /path/to/freshrss/extensions/xExtension-ThreePanesView/

Then enable **ThreePanesView** in FreshRSS: **Configuration > Extensions**.

For linuxserver.io Docker users, the typical path is:

    <config-volume>/www/freshrss/extensions/xExtension-ThreePanesView/

## Credits

Original extension by [nicofrand](https://framagit.org/nicofrand).
All credit for the extension itself goes to the original author. This fork only adds compatibility patches.

## License

Upstream repository publishes no explicit license file. This fork inherits the same status and preserves original authorship and copyright.
