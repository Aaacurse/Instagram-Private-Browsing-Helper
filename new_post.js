(()=>{
    function removePostPopup(){
    document.querySelectorAll('div.xdj266r.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x9f619.xjbqb8w.x15mokao.x1ga7v0g.x16uus16.xbiv7yw.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x78zum5.x5yr21d.xl56j7k.xixxii4.x13vifvy.xh8yej3.x1355qak').forEach(el => el.remove())
    document.querySelectorAll('div.x1n2onr6.xzkaem6').forEach(el => el.remove())
    
}
removePostPopup()

const observer = new MutationObserver(removePostPopup);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();

