(function(){
    function renderNavigation(){
        const nav = document.querySelector('.main-nav');
        if (!nav) return;
        nav.innerHTML = nav.innerHTML;
    }

    window.renderNavigation = renderNavigation;
})();
