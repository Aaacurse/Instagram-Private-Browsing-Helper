(() => {
    const EVENTS = ["pointerdown", "mousedown", "pointerup", "mouseup", "touchstart", "click"];
    const POST_PATH = /^\/(?:[^/]+\/)?(?:p|reel)\/[^/]+\/?$/;

    function findPostLink(target) {
        if (!(target instanceof Element)) return null;
        const link = target.closest("a[href]");
        if (!link) return null;

        const url = new URL(link.href, location.origin);
        if (url.origin !== location.origin) return null;

        return POST_PATH.test(url.pathname) ? url : null;
    }

    function handler(e) {
        const url = findPostLink(e.target);
        if (!url) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        if (e.type === "click") location.assign(url.href);
    }

    EVENTS.forEach(type => window.addEventListener(type, handler, true));
})();