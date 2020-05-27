import { LitElement, html, css } from "lit-element";
//import {read, appendToStorage} from './storage';

export class ClientInfo extends LitElement {
  static get styles() {
    return css`
      h2 {
        font-family: "Gill Sans", sans-serif;
        padding: 2rem;
      }
      fieldset {
        padding: 2rem;
        font-family: "Gill Sans", sans-serif;
        border-radius: 0.5rem;
      }
    `;
  }

  static get properties() {
    return {
      firstName: { type: String },
      lastName: { type: String },
      accountBalance: { type: Number },
      accountNumber: { type: String },
      lastTimeLoginDate: { type: String },
      lastLocationLogin: { type: String },
    };
  }

  render() {
    //getDataFromAPI

    return html`
      <section>
        <fieldset>
          <legend>
            Your account details
          </legend>
          <p>Your current balance is: RON ${this.accountBalance}</p>
          <p>Your account number is: ${this.accountNumber}</p>
          ${this.lastTimeLoginDate != null && this.lastLocationLogin != null
            ? html`<p>
                Last time you logged in: ${this.lastTimeLoginDate} in
                ${this.lastLocationLogin}
              </p>`
            : this.lastTimeLoginDate != null
            ? html`<p>Last time you logged in: ${this.lastTimeLoginDate}</p>`
            : html`<p>This is your first time using the app. Welcome!</p>`}
        </fieldset>
      </section>
    `;
  }
}

window.customElements.define("client-info", ClientInfo);
