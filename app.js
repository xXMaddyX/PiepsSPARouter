import HomePage from "./pages/Home/home.js"
import Router from "./router.js";

window.app = {
    router: new Router()
};

document.addEventListener("DOMContentLoaded", () => {
    window.app.router.init();
});
