import { LitElement, html, css } from "lit-element";
//import {read, appendToStorage} from './storage';

export class Transaction extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      transactionId: { type: Number },
      transactionDate: { type: String },
      transactionFrom: { type: String },
      transactionAmount: { type: Number },
      transactionDescription: { type: String },
    };
  }

  render() {
    return html`
      <tr>
        <td>${this.transactionId}</td>
        <td>${this.transactionDate}</td>
        <td>${this.transactionFrom}</td>
        <td>${this.transactionAmount}</td>
        <td>${this.transactionDescription}</td>
      </tr>
    `;
  }
}

window.customElements.define("bank-transaction", Transaction);
