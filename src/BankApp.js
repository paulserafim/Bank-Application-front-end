import { LitElement, html, css } from "lit-element";
import { read, removeItem, removeAll, write } from "./storage";
import "./ClientInfo";
import "./TransactionList";
import "./Transaction";
import "./Login";
import "./TransactionForm";
import "./AppHeader";
import "./AppFooter";
import {
  getData,
  postData,
  getCurrentFormattedDateAndTime,
} from "./ServerOperations";

export class BankApp extends LitElement {
  static get styles() {
    return css`
      .column {
        float: left;
        width: 33.33%;
      }

      .row:after {
        content: "";
        display: table;
        clear: both;
      }

      @media only screen and (max-width: 768px) {
        .column {
          width: 100%;
        }
      }

      h2 {
        padding: 2rem;
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
    `;
  }

  static get properties() {
    return {
      username: { type: String },
      password: { type: String },
      accountBalance: { type: Number },
      firstName: { type: String },
      lastName: { type: String },
      transactionList: { type: Array },
      fromAccount: { type: String },
      toAccount: { type: String },
      amount: { type: Number },
      description: { type: String },
      applicationTitle: { type: String },
      currentYear: { type: String },
      serverMessage: { type: String },
      latitude: { type: Number },
      longitude: { type: Number },
      address: { type: String },
      lastTimeLoginDate: { type: String },
      lastLocationLogin: { type: String },
      sessionId: { type: Number },
      clearSession: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.currentYear = new Date().getFullYear();
    this.applicationTitle = "Bank Portal";
    if (read("credentials") != null) {
      this.username = read("credentials").username;
      this.password = read("credentials").password;
    }
    this.accountBalance = read("accountBalance");
    this.firstName = read("firstName");
    this.lastName = read("lastName");
    this.transactionList = read("transactionList");
    if (read("geoposition") != null) {
      this.latitude = read("geoposition").latitude;
      this.address = read("geoposition").address;
      this.longitude = read("geoposition").longitude;
    }
    if (read("lastTimeLoginDate") != null) {
      this.lastTimeLoginDate = read("lastTimeLoginDate");
    }
    if (read("lastLocationLogin") != null) {
      this.lastLocationLogin = read("lastLocationLogin");
    }
    this.sessionId = read("sessionId");
  }

  render() {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    function success(pos, latitude, longitude, address) {
      const crd = { latitude, longitude, address };
      crd.latitude = pos.coords.latitude;
      crd.longitude = pos.coords.longitude;
      write(crd, "geoposition");
      const urlToFetch = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${crd.latitude}&lon=${crd.longitude}`;

      getData(urlToFetch, {}).then((data) => {
        crd.address = data.features[0].properties.display_name;
        write(crd, "geoposition");
      });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      removeItem("geoposition");
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

    if (
      this.accountBalance == null &&
      this.firstName == null &&
      this.lastName == null
    )
      return html`
        <app-header .title=${this.applicationTitle}></app-header>
        <div class="row">
          <div class="column">
            <bank-login
              .serverMessage=${this.serverMessage}
              .username=${this.username}
              @details-submitted=${this._onSubmittingDetails}
            ></bank-login>
          </div>
          <div class="column"></div>
          <div class="column"></div>
        </div>

        <app-footer .year=${this.currentYear}></app-footer>
      `;
    else
      return html`
        <app-header .title=${this.applicationTitle}></app-header>
        <h2>Hello, ${this.firstName} ${this.lastName}!</h2>
        <div class="row">
          <div class="column">
            <client-info
              .lastTimeLoginDate=${this.lastTimeLoginDate}
              .lastLocationLogin=${this.lastLocationLogin}
              .firstName=${this.firstName}
              .lastName=${this.lastName}
              .accountBalance=${this.accountBalance}
              .accountNumber=${this.username}
            ></client-info>
          </div>

          <div class="column">
            <bank-transactionform
              .accountBalance=${this.accountBalance}
              .serverMessage=${this.serverMessage}
              @transaction-submitted=${this._onTransactionSubmitted}
            ></bank-transactionform>
          </div>
          <div class="column"></div>
        </div>
        <bank-transactionlist
          .transactionList=${this.transactionList}
        ></bank-transactionlist>
        <button style="margin:1rem" @click=${this._onLoggingOut}>Logout</button>
        <app-footer .year=${this.currentYear}></app-footer>
      `;
  }

  _onLoggingOut(event) {
    removeAll();
    this.accountBalance = null;
    this.firstName = null;
    this.lastName = null;
    this.serverMessage = null;
  }

  _onSubmittingDetails(event) {
    const credentials = read("credentials");
    this.username = credentials.username;
    this.password = credentials.password;

    if (read("geoposition") != null) {
      this.latitude = read("geoposition").latitude;
      this.longitude = read("geoposition").longitude;
      this.address = read("geoposition").address;
    } else {
      this.latitude = null;
      this.longitude = null;
      this.address = null;
    }

    postData("http://localhost:8080/credentials", {
      accountNumber: this.username,
      password: this.password,
      location: {
        latCoordinate: this.latitude,
        longCoordinate: this.longitude,
        address: this.address,
      },
      dateTime: getCurrentFormattedDateAndTime(),
    }).then((data) => {
      this.serverMessage = data.message;
      if (this.serverMessage == null) {
        this.accountBalance = write(data.account.balance, "accountBalance");
        this.firstName = write(data.firstName, "firstName");
        this.lastName = write(data.lastName, "lastName");
        this.lastTimeLoginDate = write(data.lastTimeLogin, "lastTimeLoginDate");
        this.lastLocationLogin = write(
          data.lastLoginLocation,
          "lastLocationLogin"
        );
        this.sessionId = write(data.loginEntryId, "sessionId");
        getData(
          `http://localhost:8080/ledger/custom?accountNumber=${this.username}`,
          {}
        ).then((data) => {
          this.transactionList = write(data, "transactionList");
        });
      }
    });
  }
  _onTransactionSubmitted(event) {
    postData("http://localhost:8080/ledger/new", {
      fromAccount: this.username,
      toAccount: event.detail.account,
      amount: event.detail.amount,
      description: event.detail.description,
      dateTime: getCurrentFormattedDateAndTime(),
      loginEntryId: this.sessionId,
    }).then((data) => {
      this.serverMessage = data.message;
      this.fromAccount = data.fromAccount;
      this.toAccount = data.toAccount;
      this.amount = data.amount;
      if (this.serverMessage == null) {
        this.accountBalance = write(
          read("accountBalance") - this.amount,
          "accountBalance"
        );
      }
      this.description = data.description;
      getData(
        `http://localhost:8080/ledger/custom?accountNumber=${this.username}`,
        {}
      ).then((data) => {
        this.transactionList = write(data, "transactionList");
      });
    });
  }
}
