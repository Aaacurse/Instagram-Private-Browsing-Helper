
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

})();
