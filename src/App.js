import React from "react";
import { Signer } from "@waves/signer";
import { ProviderWeb } from "@waves.exchange/provider-web";
import { ProviderCloud } from "@waves.exchange/provider-cloud";
import { ProviderKeeper } from "@waves/provider-keeper";
import { ProviderLedger } from "@waves/provider-ledger";
import { ProviderMetamask} from "@waves/provider-metamask";

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

  currentProviderWeb    = new ProviderWeb(wxUrl + "/signer");
  currentProviderCloud  = new ProviderCloud(wxUrl + "/signer-cloud");
  currentProviderKeeper = new ProviderKeeper();
  currentProviderLedger = new ProviderLedger();
  currentProviderMetamask = new ProviderMetamask({
       wavesConfig: {
           nodeUrl: config.nodeUrl,
           chainId: 'S'.charCodeAt(0)
       }
  });

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

  signerMetamask = new Signer({
    NODE_URL: config.nodeUrl,
  });

  signerWeb.setProvider(currentProviderWeb);
  signerCloud.setProvider(currentProviderCloud);
  signerKeeper.setProvider(currentProviderKeeper);
  signerLedger.setProvider(currentProviderLedger);
  signerMetamask.setProvider(currentProviderMetamask);
}

function testlogin(signer) {
  return signer.login();
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
    return (
      <div>
        <h4> Provider {this.props.provider} </h4>{" "}
        <div> Address: {this.state.address} </div>{" "}
        <div> NODE_URL: {this.props.signer._options.NODE_URL.toString()} </div>{" "}
        <div> PROVIDER_URL: {
            this.props.signer.currentProvider._clientUrl ?
            this.props.signer.currentProvider._clientUrl.toString() : ""}
        </div>{" "}
        <button onClick={this.login}> Login {this.props.provider} </button>{" "}
      </div>
    );
  }
}

class TestButtonsComponent extends React.Component {
  render() {
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
        />{" "}
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
          status: rej.message ? rej.message.toString() : "undefined",
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
        <button onClick={this.clickHandle}> {this.props.buttonName} </button>{" "}
        <div> {this.state.status} </div>{" "}
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
    });
    this.setState({
      currentNodeUrl: this.state.nodeUrl,
    });
  }

  render() {
    return (
      <div>
        <h4> Current WX: {this.state.currentWxUrl} </h4>{" "}
        <h4> Current Node: {this.state.currentNodeUrl} </h4>{" "}
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
          />{" "}
        </div>{" "}
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
          />{" "}
        </div>{" "}
        <button onClick={this.setProviders}> Set </button>{" "}
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
        <ConfigElement config={config} changeSigner={this.changeSigner} />{" "}
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
      <PageComponent />
    </div>
  );
}

export default App;
