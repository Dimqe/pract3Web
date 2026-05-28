(function(){
    function renderHeader(){
        const header = document.querySelector('header.header');
        if (!header) return;
        header.innerHTML = header.innerHTML;
    }

    window.renderHeader = renderHeader;
})();
