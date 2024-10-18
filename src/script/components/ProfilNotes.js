class ProfilNotes extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <section class="profilNotes">
            <div class="contentProfilNotes">
                <div class="imgH2">
                    <img src="./profilNotes.png" alt="">
                    <h2>
                        Hi! Fatih
                    </h2>
                </div>
                <hr class="hrHeading">
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                    survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <div class="infoAllNotes">
                    <div class="descriptionAllNotes">
                        <h4>
                            All Notes
                        </h4>
                        <h4 id="totalNotesCount">
                            
                        </h4>
                    </div>
                    <div class="imgAllNotes">
                        <img src="./allNotes.png" alt="">
                    </div>
                </div>
            </div>
        </section>
        `;
  }
}

customElements.define('profil-notes', ProfilNotes);
