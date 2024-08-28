/**
 * @class Router
 * @description A simple client-side routing class that allows for dynamically changing the content of a webpage based on the current URL.
 */
export default class PiepsRouter {
    /**
     * @constructor
     * @description Initializes the Router class with default properties.
     */
    constructor() {
        /**
         * @property {Object} routes - An object that defines the routes of the application. Each route should be associated with a template element.
         */
        this.routes;

        /**
         * @property {string} targetElement - The CSS selector of the element where the rendered content should be loaded.
         */
        this.targetElement;

        /**
         * @property {string} targetNavLinks - The CSS selector of the navigation links that trigger the routing.
         */
        this.targetNavLinks;
    }

    /**
     * @method config
     * @description Configures the router with the necessary parameters.
     * @param {Object} routesObj - An object that defines the routes of the application.
     * @param {string} targetElement - The CSS selector of the target element for the rendered content.
     * @param {string} targetNavLinks - The CSS selector of the navigation links.
     */
    config(routesObj, targetElement, targetNavLinks) {
        this.routes = routesObj;
        this.targetElement = targetElement;
        this.targetNavLinks = targetNavLinks;
    }

    /**
     * @method init
     * @description Initializes the router, adds event listeners to the navigation links, and handles the current route based on the URL.
     */
    init() {
        // Add event listeners to the navigation links
        let navLinks = document.querySelectorAll(this.targetNavLinks);
        navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                let url = e.target.getAttribute("href");
                this.go(url);
            });
        });

        // Event listener for the popstate event to support browser navigation
        window.addEventListener("popstate", (e) => {
            this.go(e.state.route, false);
        });

        // Initial routing based on the current URL
        this.go(location.pathname);
    }

    /**
     * @method go
     * @description Performs routing to the specified route and updates the browser history if necessary.
     * @param {string} route - The route to navigate to.
     * @param {boolean} [addToHistory=true] - Optional, whether to add the route to the browser history.
     */
    go(route, addToHistory = true) {
        if (addToHistory) {
            history.pushState({route}, null, route);
        }
        this.routeHandler(route);
    }

    /**
     * @method routeHandler
     * @description Handles the specified route and renders the corresponding template element.
     * @param {string} route - The route to be handled.
     */
    routeHandler(route) {
        this.pageElement = null;

        // Get the route handler function for the given route
        this.routeHandle = this.routes[`${route}`];

        // Create the new page element based on the template
        this.pageElement = document.createElement(this.routeHandle.templateElement);

        // If the page element was successfully created, render it in the target element
        if (this.pageElement) {
            const renderElement = document.querySelector(this.targetElement);
            renderElement.innerHTML = "";
            renderElement.append(this.pageElement);
        } else {
            // If the route was not found, display a 404 error message
            document.querySelector(this.targetElement).innerHTML = "Oops, 404";
        }
    }
}