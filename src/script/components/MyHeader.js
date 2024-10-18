class MyHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <header>
            <h1 class="logo">note.<span>s</span></h1>
        </header>
        `;
  }
}

customElements.define('my-header', MyHeader);
