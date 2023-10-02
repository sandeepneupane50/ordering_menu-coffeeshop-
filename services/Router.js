const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach(a => {
            a.addEventListener("click", e => {
                e.preventDefault();
                const url = e.target.getAttribute("href");
                Router.go(url);
            })
        })
        // Event Handler for URL changes
        window.addEventListener("popstate", e => {
            Router.go(e.state.route, false)
        })

        // Check the initial Url
        Router.go(location.pathname)
    },
    go: (route, addToHistry=true) => {

        if(addToHistry) {
            history.pushState({ route }, '', route);
        }
        let pageElement = null;
        switch(route) {
            case "/":
                pageElement = document.createElement("menu-page");
                break;
            case "/order":
                pageElement = document.createElement("order-page");
                break;
            default:
                if(route.startsWith("/product-")) {
                    pageElement = document.createElement("details-page");
                    pageElement.textContent = "Details";
                    const paramId = route.substring(route.lastIndexOf("-") + 1);
                    pageElement.dataset.productId = paramId
                }    
        }
        if(pageElement) {
            // way to remove the element before adding new element
            // document.querySelector("main").children[0].remove();
            const cache = document.querySelector("main");
            cache.innerHTML = "";

            document.querySelector("main").appendChild(pageElement);
            window.scrollX = 0;
            window.screenY = 0;
        }
    }
}

export default Router;