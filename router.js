export default class Router {
    constructor() {
        this.routes = {
            "/": {
                templateElement: "home-page",
                discription: "HomePage"
            },
            "/news": {
                templateElement: "h1",
                discription: "Das ist nen News Test"
            }
        }
    }
    init() {
        let navLinks = document.querySelectorAll(".navLink a")
        navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                let url = e.target.getAttribute("href");
                this.go(url);
            })
        });
        window.addEventListener("popstate", (e) => {
            this.go(e.state.route, false)
        });
        this.go(location.pathname)
    };

    go(route, addToHistory=true) {
        if (addToHistory) {
            history.pushState({route}, null, route);
        }
        this.routeHandler(route)
        
    };

    routeHandler(route) {
        this.pageElement = null;
        this.routeHandle = this.routes[`${route}`];
        this.pageElement = document.createElement(this.routeHandle.templateElement);

        //This is just for testing
        if (this.routeHandle.discription != "") {
            this.pageElement.textContent = this.routeHandle.discription;
        };
        
        if (this.pageElement) {
            const renderElement = document.querySelector("main");
            renderElement.innerHTML = "";
            renderElement.append(this.pageElement);
        } else {
            document.querySelector("main").innerHTML = "Oops, 404";
        };
    };
};