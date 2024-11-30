export default class HomePage extends HTMLElement {
    constructor() {
        super();
    };

    async connectedCallback() {
        const resHtml = await fetch("pages/Home/home.html");
        const html = await resHtml.text();

        const resCss = await fetch("pages/Home/home.css");
        const css = await resCss.text();

        const styleEl = document.createElement("style");
        styleEl.innerText = css;

        this.innerHTML = html;
        this.append(styleEl);
    };
};

customElements.define("home-page", HomePage);