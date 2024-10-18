class MyFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <footer>
            <hr class="hrFooter">
            <p>
                "note.s® is a trademark of note.s, all rights reserved. Any other trademarks or logos used on this site are the property of their respective owners."
            </p>
            <p class="p1">Copyright &copy; 2024 Fatih Al Jabar</p>
        </footer>
        `;
  }
}

customElements.define('my-footer', MyFooter);
