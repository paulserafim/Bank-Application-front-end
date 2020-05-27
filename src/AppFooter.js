import { LitElement, html, css } from "lit-element";

class AppFooter extends LitElement {
  static get styles() {
    return css`
      :host {
        margin: 2rem;
      }
      footer {
        background: rgb(189, 191, 190);
        color: white;
        padding: 2rem;
        text-align: right;
        border-radius: 1rem;
      }
    `;
  }
  static get properties() {
    return {
      year: { type: Number },
    };
  }
  render() {
    return html`
      <footer>
        Copyright &copy; ${this.year}. All rights reserved.
      </footer>
    `;
  }
}

window.customElements.define("app-footer", AppFooter);
