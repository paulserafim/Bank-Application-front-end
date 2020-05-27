import { LitElement, html, css } from "lit-element";

class ElementHeader extends LitElement {
  static get styles() {
    return css`
      header {
        background: rgb(188, 196, 191);
        border-radius: 0.1rem;
      }
      p {
        font-family: "Gill Sans", sans-serif;
      }
    `;
  }
  static get properties() {
    return {
      instructions: { type: String },
    };
  }
  render() {
    return html`
      <header>
        <p>${this.instructions}</p>
      </header>
    `;
  }
}
window.customElements.define("element-header", ElementHeader);
