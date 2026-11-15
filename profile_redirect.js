(() => {
    const EVENTS = ["pointerdown", "mousedown", "pointerup", "mouseup", "touchstart", "click"];
    const PROFILE_PATH = /^\/([A-Za-z0-9._]+)\/?$/;
    const RESERVED = new Set([
        "reels", "reel", "explore", "accounts", "direct", "stories", "p",
        "about", "legal", "privacy", "web", "developer", "directory", "challenge"
    ]);

    function findProfileLink(target) {
        if (!(target instanceof Element)) return null;
        const link = target.closest("a[href]");
        if (!link) return null;

        const url = new URL(link.href, location.origin);
        if (url.origin !== location.origin) return null;

        const match = PROFILE_PATH.exec(url.pathname);
        if (!match) return null;
        if (RESERVED.has(match[1].toLowerCase())) return null;

        return url;
    }

    function handler(e) {
        const url = findProfileLink(e.target);
        if (!url) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        if (e.type === "click") location.assign(url.href);
    }

    EVENTS.forEach(type => window.addEventListener(type, handler, true));
})();