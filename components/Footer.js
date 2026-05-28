(function(){
    function renderFooter(){
        const footer = document.querySelector('.footer');
        if (!footer) return;
        footer.innerHTML = footer.innerHTML;
    }

    window.renderFooter = renderFooter;
})();
