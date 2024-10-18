class FromAddNotes extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <section class="addNotes">
            <div class="contentAddNotes">
                <div class="imgH2">
                    <img src="./addNotes.png" alt="">
                    <h2>
                        AddNotes
                    </h2>
                </div>
                <hr class="hrHeading">
                <form autocomplete="off" class="formAddNotes">
                    <div class="formContentAddNotes">
                        <label for="heading">Heading</label>
                        <input id="heading" required minlength="3" pattern="^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$" aria-describedby="headingValidation" />
                        <p id="headingValidation" class="validation-message" aria-live="polite"></p>
                        <br>
                    </div>
                    <div class="formContentAddNotes">
                        <label for="body">Body</label>
                        <textarea cols="30" rows="10" id="body" required minlength="3" pattern="" aria-describedby="bodyValidation"></textarea>
                        <br>
                        <p id="bodyValidation" class="validation-message" aria-live="polite"></p>
                    </div>
                    <div class="button">
                        <button id="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </section>
        `;
  }
}

customElements.define('form-add-notes', FromAddNotes);
