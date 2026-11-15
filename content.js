
(() => {
    // Put your working JavaScript function here

    function removePopups() {
        document.querySelectorAll("div.x1n2onr6.xzkaem6").forEach(el => el.remove());
    }

    removePopups();

    // If your function uses MutationObserver,
    // initialize it here as well.
    const observer = new MutationObserver(removePopups);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    function findReelsTab(target) {
        if (!(target instanceof Element)) return null;
        const a = target.closest("a[role='link']");
        if (!a) return null;
        const svg = a.querySelector("svg[aria-label='Reels']");
        return svg ? a : null;
    }

    function handler(e) {
        const tab = findReelsTab(e.target);
        if (!tab) return;

        console.log("[reels-fix]", e.type);

        e.preventDefault();
        e.stopImmediatePropagation();

        if (e.type !== "click") return;

        const path = location.pathname.replace(/\/+$/, "");
        if (path.endsWith("/reels")) return;

        location.assign(location.origin + path + "/reels/");
    }

    ["pointerdown", "mousedown", "pointerup", "mouseup", "touchstart", "click"].forEach(type =>
        window.addEventListener(type, handler, true)
    );

})();
