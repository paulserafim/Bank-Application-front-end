import { LitElement, html, css } from "lit-element";
import { Transaction } from "./Transaction";
//import {read, appendToStorage} from './storage';

export class TransactionList extends LitElement {
  static get styles() {
    return css`
      fieldset {
        padding: 2rem;
        font-family: "Gill Sans", sans-serif;
        border-radius: 0.5rem;
      }

      tbody > tr:hover {
        background-color: rgb(224, 222, 222);
        border-radius: 0.5rem;
      }
    `;
  }

  static get properties() {
    return {
      transactionList: { type: Array },
    };
  }

  render() {
    if (this.transactionList == null || this.transactionList.length === 0) {
      return html`<fieldset>
        <legend>Transaction history</legend>
        <p>You have no transactions recoded yet!</p>
      </fieldset>`;
    } else
      return html`
        <fieldset>
          <legend>
            Transaction history
          </legend>
          <table>
            <thead>
              <th>Id</th>
              <th>Date</th>
              <th>Time</th>
              <th>From Account</th>
              <th>To Account</th>
              <th>Amount transferred</th>
              <th>Transaction Description</th>
            </thead>
            <tbody>
              ${this.transactionList.map(
                (element) =>
                  html` <tr>
                    <td>${element.transactionId}</td>
                    <td>${element.dateTime.substring(0, 10)}</td>
                    <td>${element.dateTime.substring(11, 16)}</td>
                    <td>${element.fromAccount}</td>
                    <td>${element.toAccount}</td>
                    <td>RON ${element.amount}</td>
                    <td>${element.description}</td>
                  </tr>`
              )}
            </tbody>
          </table>
        </fieldset>
      `;
  }
}

window.customElements.define("bank-transactionlist", TransactionList);
