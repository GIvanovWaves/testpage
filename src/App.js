import React from "react";
import { Signer } from "@waves/signer";
import { ProviderWeb } from "@waves.exchange/provider-web";
import { ProviderCloud } from "@waves.exchange/provider-cloud";
import { ProviderKeeper } from "@waves/provider-keeper";
import { ProviderLedger } from "@waves/provider-ledger";
import { ProviderMetamask} from "@waves/provider-metamask";
import PackagesFile from './../package.json';

var config = {
  wxUrl: "https://testnet.waves.exchange",
  nodeUrl: "https://nodes-testnet.wavesnodes.com",
};

var currentProviderWeb;
var currentProviderCloud;
var currentProviderKeeper;
var currentProviderLedger;
var currentProviderMetamask;

var signerWeb;
var signerCloud;
var signerKeeper;
var signerLedger;
var signerMetamask;

changeProviderUrl(config.wxUrl, config.nodeUrl);

function changeProviderUrl(wxUrl, nodeUrl) {
  config.wxUrl = wxUrl;
  config.nodeUrl = nodeUrl;
  var wxUrlObj = new URL(wxUrl);

  currentProviderWeb    = new ProviderWeb(wxUrlObj.origin + "/signer");
  currentProviderCloud  = new ProviderCloud(wxUrlObj.origin + "/signer-cloud" + wxUrlObj.search);
  currentProviderKeeper = new ProviderKeeper();
  currentProviderLedger = new ProviderLedger();
  try {
    currentProviderMetamask = new ProviderMetamask();
    signerMetamask = new Signer({
      NODE_URL: config.nodeUrl,
    });
    signerMetamask.setProvider(currentProviderMetamask);
  } catch { 
    currentProviderMetamask = null;
    signerMetamask = null;
   };

  signerWeb = new Signer({
    NODE_URL: config.nodeUrl,
  });

  signerCloud = new Signer({
    NODE_URL: config.nodeUrl,
  });

  signerKeeper = new Signer({
    NODE_URL: config.nodeUrl,
  });

  signerLedger = new Signer({
    NODE_URL: config.nodeUrl,
  });



  signerWeb.setProvider(currentProviderWeb);
  signerCloud.setProvider(currentProviderCloud);
  signerKeeper.setProvider(currentProviderKeeper);
  signerLedger.setProvider(currentProviderLedger);
}

function testlogin(signer) {
  return signer.login();
}

function sendToAddress(signer, params) {
  return signer
    .transfer({
      amount: params.amount || 0,
      recipient: params.address,
      assetId: params.assetId || null,
      attachment: params.attachment || null,
    })
    .broadcast();
}

function invokeWithParams(signer, params) {
  return signer
    .invoke({
      dApp: params.dapp,
      call: params.call || null,
      payment: params.payment || null,
    })
    .broadcast();
}

function testsend(signer) {
  return signer
    .transfer({
      amount: 100,
      recipient: "alias:T:merry",
    })
    .broadcast();
}

function testsend_btc(signer) {
  return signer
    .transfer({
      amount: 1,
      assetId: "DWgwcZTMhSvnyYCoWLRUXXSH1RSkzThXLJhww9gwkqdn",
      recipient: "3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",
    })
    .broadcast();
}

function testsend_waves(signer) {
  return signer
    .transfer({
      assetId: "WAVES",
      amount: 101,
      recipient: "3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",
      fee: 100001,
      feeAssetId: "WAVES",
    })
    .broadcast();
}

function testinvoke(signer) {
  return signer
    .invoke({
      dApp: "3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",
      payment: [
        {
          assetId: null,
          amount: 5,
        },
        {
          assetId: "25FEqEjRkqK6yCkiT7Lz6SAYz7gUFCtxfCChnrVFD5AT",
          amount: 4,
        },
        {
          assetId: "5Sh9KghfkZyhjwuodovDhB6PghDUGBHiAPZ4MkrPgKtX",
          amount: 3,
        },
        {
          assetId: "DWgwcZTMhSvnyYCoWLRUXXSH1RSkzThXLJhww9gwkqdn",
          amount: 2,
        },
        {
          assetId: "EmcmfM27TPaemhuREZGD8WLvsuLCdqx8WovMrDQKbXS1",
          amount: 1,
        },
      ],
      call: {
        function: "foo",
        args: [
          {
            type: "string",
            value: "Hello, world!",
          },
        ],
      },
    })
    .broadcast();
}

function testinvoke_waves(signer) {
  return signer
    .invoke({
      dApp: "3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",
      fee: 500001,
      feeAssetId: "WAVES",
      payment: [
        {
          assetId: "WAVES",
          amount: 1,
        },
        {
          assetId: "25FEqEjRkqK6yCkiT7Lz6SAYz7gUFCtxfCChnrVFD5AT",
          amount: 2,
        },
        {
          assetId: "5Sh9KghfkZyhjwuodovDhB6PghDUGBHiAPZ4MkrPgKtX",
          amount: 3,
        },
      ],
      call: {
        function: "foo",
        args: [
          {
            type: "string",
            value: "Hello, world!",
          },
        ],
      },
    })
    .broadcast();
}

function testsimpleinvoke(signer) {
  return signer
    .invoke({
      dApp: "3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",
      call: {
        function: "foo",
        args: [
          {
            type: "string",
            value: "Hello, world!",
          },
        ],
      },
    })
    .broadcast();
}

function testInvokeWithPayment(signer) {
  return signer
    .invoke({
      dApp: "3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",
      payment: [
        {
          assetId: "WAVES",
          amount: 1,
        },
      ],
      call: {
        function: "foo",
        args: [
          {
            type: "string",
            value: "Hello, world!",
          },
        ],
      },
    })
    .broadcast();
}

function testInvokeWithTwoPayments(signer) {
  return signer
    .invoke({
      dApp: "3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",
      payment: [
        {
          assetId: "WAVES",
          amount: 1,
        },
        {
          assetId: "DWgwcZTMhSvnyYCoWLRUXXSH1RSkzThXLJhww9gwkqdn",
          amount: 2,
        },
      ],
      call: {
        function: "foo",
        args: [
          {
            type: "string",
            value: "Hello, world!",
          },
        ],
      },
    })
    .broadcast();
}

class SignerLoginElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
    };

    this.login = this.login.bind(this);
  }

  login() {
    var signer = this.props.signer;
    if (signer !== "") {
      testlogin(signer).then((res, rej) => {
        this.setState({
          address: res.address,
        });
      });
    }
  }

  render() {
    if(this.props.signer == null) {
      return (<h4>{this.props.provider} not installed</h4> );
    }
    return (
      <div>
        <h4> Provider {this.props.provider} </h4>
        <div> Address: {this.state.address} </div>
        <div> NODE_URL: {this.props.signer._options.NODE_URL.toString()} </div>
        <div> PROVIDER_URL: {
            this.props.signer.currentProvider._clientUrl ?
            this.props.signer.currentProvider._clientUrl.toString() : ""}
        </div>
        <button onClick={this.login}> Login {this.props.provider} </button>
      </div>
    );
  }
}

class TestButtonsComponent extends React.Component {
  render() {
    if(this.props.signer == null) {
      return;
    }
    return (
      <div>
        <SignButtonComponent
          signer={this.props.signer}
          buttonName="Transfer"
          testFunction={testsend}
        />
        <SignButtonComponent
          signer={this.props.signer}
          buttonName="Transfer BTC"
          testFunction={testsend_btc}
        />
        <SignButtonComponent
          signer={this.props.signer}
          buttonName="Transfer with WAVES as AssetID"
          testFunction={testsend_waves}
        />
        <SignButtonComponent
          signer={this.props.signer}
          buttonName="Invoke"
          testFunction={testinvoke}
        />
        <SignButtonComponent
          signer={this.props.signer}
          buttonName="Invoke with WAVES as AssetID"
          testFunction={testinvoke_waves}
        />
        <SignButtonComponent
          signer={this.props.signer}
          buttonName="Invoke without payments"
          testFunction={testsimpleinvoke}
        />
        <br />
        <SignTransferWithParams
          signer={this.props.signer}
          buttonName="TransferTX"
          testFunction={sendToAddress}
        />
        <br />
        <SignButtonComponent
          signer={this.props.signer}
          buttonName="Invoke with 1 payment (WAVES)"
          testFunction={testInvokeWithPayment}
        />
        <SignButtonComponent
          signer={this.props.signer}
          buttonName="Invoke with 2 payments (WAVES, BTC)"
          testFunction={testInvokeWithTwoPayments}
        />
        <br />
        <SignInvokeWithParams
          signer={this.props.signer}
          buttonName="InvokeTx"
          testFunction={invokeWithParams}
        />
      </div>
    );
  }
}

class SignButtonWithParams extends React.Component {
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  callTestFunction(params) {
    return this.props
      .testFunction(this.props.signer, params)
      .catch((rej) => {
        console.log(rej); // For debugging in console

        this.setState({
          status: rej.message ? rej.message.toString() : rej.toString(),
        });
      })
      .then((res, rej) => {
        if (res) {
          console.log(res); // For debugging in console

          var status_text = "";
          if (Array.isArray(res)) {
            for (var tx of res) {
              status_text += tx.id.toString() + "\n";
            }
          } else {
            status_text = res.id.toString() + "\n";
          }

          this.setState({
            status: status_text,
          });
        }
      });
  }
}

class SignTransferWithParams extends SignButtonWithParams {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      amount: "1",
      address: "3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",
      assetId: "WAVES",
      attachment: "",
    }

    this.clickHandle = this.clickHandle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clickHandle() {
    let params = {
        amount: this.state.amount,
        address: this.state.address,
        assetId: this.state.assetId,
        attachment: this.state.attachment,
      };

    return this.callTestFunction(params);
  }

  render() {
    return (
      <div>
        <div>
          Address:
          <input
            name="address"
            type="text"
            style={{
              width: 300,
            }}
            value={this.state.address}
            onChange={this.handleChange}
          />
        </div>
        <div>
          Amount:
          <input
            name="amount"
            type="text"
            style={{
              width: 300,
            }}
            value={this.state.amount}
            onChange={this.handleChange}
          />
        </div>
        <div>
          AssetId:
          <input
            name="assetId"
            type="text"
            style={{
              width: 300,
            }}
            value={this.state.assetId}
            onChange={this.handleChange}
          />
        </div>
        <div>
          Attachment:
          <input
            name="attachment"
            type="text"
            style={{
              width: 300,
            }}
            value={this.state.attachment}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.clickHandle}> {this.props.buttonName} </button>
        <div> {this.state.status} </div>
      </div>
    );
  }
}

class SignInvokeWithParams extends SignButtonWithParams {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      dapp: "3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",
      call: "{\"function\":\"foo\",\n\"args\":[\n{\"type\":\"string\",\"value\":\"Hello,world!\"}\n]}",
      payment: "[\n{\"assetId\":\"WAVES\",\"amount\":1},\n{\"assetId\":\"DWgwcZTMhSvnyYCoWLRUXXSH1RSkzThXLJhww9gwkqdn\",\"amount\":2}\n]",
    }

    this.clickHandle = this.clickHandle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clickHandle() {
    let params = {
        dapp: this.state.dapp,
        call: JSON.parse(this.state.call),
        payment: JSON.parse(this.state.payment),
      };

    return this.callTestFunction(params);
  }

  render() {
    return (
      <div>
        <div>
          dApp:
          <input
            name="dapp"
            type="text"
            style={{
              width: 300,
            }}
            value={this.state.dapp}
            onChange={this.handleChange}
          />
        </div>
        <div>
          Call:
          <textarea
            name="call"
            type="text"
            style={{
              "width": "350px",
              "height": "100px",
              "overflowWrap": "normal",
              "overflowX": "scroll",
              "whiteSpace": "pre",
            }}
            value={this.state.call}
            onChange={this.handleChange}
          />
        </div>
        <div>
          Payments:
          <textarea
            name="payment"
            type="text"
            style={{
              "width": "350px",
              "height": "100px",
              "overflowWrap": "normal",
              "overflowX": "scroll",
              "whiteSpace": "pre",
            }}
            value={this.state.payment}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.clickHandle}> {this.props.buttonName} </button>
        <div> {this.state.status} </div>
      </div>
    );
  }
}

class SignButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
    };

    this.clickHandle = this.clickHandle.bind(this);
  }

  clickHandle() {
    return this.props
      .testFunction(this.props.signer)
      .catch((rej) => {
        console.log(rej); // For debugging in console

        this.setState({
          status: rej.message ? rej.message.toString() : rej.toString(),
        });
      })
      .then((res, rej) => {
        if (res) {
          console.log(res); // For debugging in console

          var status_text = "";
          if (Array.isArray(res)) {
            for (var tx of res) {
              status_text += tx.id.toString() + "\n";
            }
          } else {
            status_text = res.id.toString() + "\n";
          }

          this.setState({
            status: status_text,
          });
        }
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.clickHandle}> {this.props.buttonName} </button>
        <div> {this.state.status} </div>
      </div>
    );
  }
}

class ConfigElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wxUrl: config.wxUrl,
      nodeUrl: config.nodeUrl,
      currentWxUrl: config.wxUrl,
      currentNodeUrl: config.nodeUrl,
    };

    this.handleChange = this.handleChange.bind(this);
    this.setProviders = this.setProviders.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  setProviders(event) {
    changeProviderUrl(this.state.wxUrl, this.state.nodeUrl);

    this.props.changeSigner();

    this.setState({
      currentWxUrl: this.state.wxUrl,
      currentNodeUrl: this.state.nodeUrl
    });
  }

  render() {
    return (
      <div>
        <h4> Current WX: {this.state.currentWxUrl} </h4>
        <h4> Current Node: {this.state.currentNodeUrl} </h4>
        <div>
          WX URL:
          <input
            name="wxUrl"
            type="text"
            style={{
              width: 300,
            }}
            value={this.state.wxUrl}
            onChange={this.handleChange}
          />
        </div>
        <div>
          NODE URL:
          <input
            name="nodeUrl"
            type="text"
            style={{
              width: 300,
            }}
            value={this.state.nodeUrl}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.setProviders}> Set </button>
      </div>
    );
  }
}
class PackagesComponent extends React.Component {
  render() {
    return(
      <div>
        <div>@waves/signer: {PackagesFile["dependencies"]["@waves/signer"]}</div>
        <div>@waves.exchange/provider-web: {PackagesFile["dependencies"]["@waves.exchange/provider-web"]}</div>
        <div>@waves.exchange/provider-cloud: {PackagesFile["dependencies"]["@waves.exchange/provider-cloud"]}</div>
        <div>@waves/provider-keeper: {PackagesFile["dependencies"]["@waves/provider-keeper"]}</div>
        <div>@waves/provider-ledger: {PackagesFile["dependencies"]["@waves/provider-ledger"]}</div>
        <div>@waves/provider-metamask: {PackagesFile["dependencies"]["@waves/provider-metamask"]}</div>
      </div>
    );
  }
}

class PageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signerWeb: signerWeb,
      signerCloud: signerCloud,
      signerKeeper: signerKeeper,
      signerLedger: signerLedger,
      signerMetamask: signerMetamask,
    };

    this.changeSigner = this.changeSigner.bind(this);
  }

  changeSigner(event) {
    this.setState({
      signerWeb: signerWeb,
      signerCloud: signerCloud,
      signerKeeper: signerKeeper,
      signerLedger: signerLedger,
      signerMetamask: signerMetamask,
    });
  }

  render() {
    return (
      <div>
        <ConfigElement config={config} changeSigner={this.changeSigner} />
        <br />
        <SignerLoginElement
          provider="WEB" 
          signer={this.state.signerWeb}
        />
        <br />
        <TestButtonsComponent signer={this.state.signerWeb} /> <br />
        <SignerLoginElement 
          provider="CLOUD" 
          signer={this.state.signerCloud}
        />
        <br />
        <TestButtonsComponent signer={this.state.signerCloud} /> <br />
        <SignerLoginElement
          provider="KEEPER"
          signer={this.state.signerKeeper}
        />
        <br />
        <TestButtonsComponent signer={this.state.signerKeeper} /> <br />
        <SignerLoginElement
          provider="LEDGER"
          signer={this.state.signerLedger}
        />
        <br />
        <TestButtonsComponent signer={this.state.signerLedger} /> <br />
        <SignerLoginElement
          provider="METAMASK"
          signer={this.state.signerMetamask}
        />
        <br />
        <TestButtonsComponent signer={this.state.signerMetamask} /> <br />
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <PackagesComponent />
      <PageComponent />
    </div>
  );
}

export default App;
