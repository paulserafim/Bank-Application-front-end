import { LitElement, html, css } from "lit-element";
//import {read, appendToStorage} from './storage';

export class TransactionForm extends LitElement {
  static get styles() {
    return css`
      fieldset {
        padding: 2rem;
        border-radius: 0.5rem;
        font-family: "Gill Sans", sans-serif;
      }

      button {
        background-color: #ff6600;
        border: none;
        color: white;
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        padding-left: 2rem;
        padding-right: 2rem;
        border-radius: 0.5rem;
        text-align: center;
        display: inline-block;
        font-size: 1rem;
        font-family: "Gill Sans", sans-serif;
        margin-top: 1rem;
      }

      button:hover {
        box-shadow: 0 0.75rem 1rem 0 rgba(0, 0, 0, 0.24),
          0 1rem 4rem 0 rgba(0, 0, 0, 0.19);
      }

      input {
        padding: 0.8rem;
        border-radius: 0.5rem;
        width: 80%;
      }

      input:invalid:focus {
        background-color: rgb(245, 169, 164);
      }

      input:valid:focus {
        background-color: rgb(161, 255, 176);
      }
    `;
  }

  static get properties() {
    return {
      accountBalance: { type: Number },
      serverMessage: { type: String },
    };
  }

  render() {
    return html`
      <fieldset>
        <legend>Transfer money</legend>
        <form @submit=${this._onSubmit}>
          <label>Amount to transfer </label><br /><input
            type="number"
            min="0"
            max=${this.accountBalance}
            step="0.01"
            name="amount"
            required
          /><br />
          <label>To account </label><br /><input
            type="text"
            name="account"
            minlength="6"
            maxlength="6"
            required
            pattern="[a-zA-Z0-9]+"
            required
          /><br />
          <label>Add a description </label><br /><input
            maxlength="20"
            type="text"
            name="description"
          /><br />
          ${this.serverMessage != null
            ? html`<p style="color:red">${this.serverMessage}</p>`
            : html``}
          <button>Submit request</button>
        </form>
      </fieldset>
    `;
  }

  _onSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);
    const transaction = Object.fromEntries(data);

    this.dispatchEvent(
      new CustomEvent("transaction-submitted", { detail: transaction })
    );
  }
}

window.customElements.define("bank-transactionform", TransactionForm);
