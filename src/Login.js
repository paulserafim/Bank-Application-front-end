import { LitElement, html, css } from "lit-element";
import { read, appendToStorage, removeCredentials, write } from "./storage";
import "./ElementHeader";

export class Login extends LitElement {
  static get styles() {
    return css`
      form {
        padding: 2rem;
        border-style: solid;
        border-width: 0.05rem;
        border-radius: 1rem;
        border-color: rgb(188, 196, 191);
        margin-top: 1rem;
      }

      h2 {
        text-align: center;
        font-family: "Gill Sans", sans-serif;
      }

      label {
        font-family: "Gill Sans", sans-serif;
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
    `;
  }

  static get properties() {
    return {
      username: { type: String },
      password: { type: String },
      instructions: { type: String },
      serverMessage: { type: String },
    };
  }

  constructor() {
    super();
    this.instructions = "Please insert your credentials to log in";
  }

  render() {
    return html`
      <form @submit=${this._onSubmit}>
        <element-header .instructions=${this.instructions}></element-header>
        <h2>Login</h2>
        <label>Account Number</label><br />
        <input
          type="text"
          name="username"
          maxlength="6"
          minlength="6"
          required
          pattern="[a-zA-Z0-9]+"
          required
        /><br />
        <label>Password</label><br />
        <input type="password" name="password" required /><br />
        ${this.serverMessage != null
          ? html`<p style="color:red">${this.serverMessage}</p>`
          : html``}
        <button>Login</button>
      </form>
    `;
  }

  _onSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);
    const credentials = Object.fromEntries(data);
    write(credentials, "credentials");

    this.dispatchEvent(new CustomEvent("details-submitted", { detail: data }));
  }
}

window.customElements.define("bank-login", Login);
