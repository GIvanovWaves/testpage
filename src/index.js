"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signer_1 = require("@waves/signer");
const provider_web_1 = require("@waves.exchange/provider-web");
const provider_cloud_1 = require("@waves.exchange/provider-cloud");
const provider_keeper_1 = require("@waves/provider-keeper");
const provider_ledger_1 = require("@waves/provider-ledger");
const provider_metamask_1 = require("@waves/provider-metamask");
const provider_mailbox_1 = require("@waves.exchange/provider-mailbox");
const package_json_1 = __importDefault(require("./../package.json"));
const CONFIG = {
    wxUrl: "https://testnet.wx.network",
    nodeUrl: "https://nodes-testnet.wavesnodes.com",
    keeperNodeUrl: "https://nodes-testnet.wavesnodes.com",
};
function getDiv() {
    return document.createElement("div");
}
const versionsBlock = document.getElementById("versions-block");
for (const [k, v] of Object.entries(package_json_1.default.dependencies)) {
    const line = getDiv();
    line.innerText = `${k}: ${v}`;
    versionsBlock.appendChild(line);
}
const configBlock = document.getElementById("config-block");
configBlock.style.margin = "15px";
const wxUrlInput = document.getElementById("wx-url-input");
const nodeUrlInput = document.getElementById("node-url-input");
const keeperNodeUrlInput = document.getElementById("keeper-node-url-input");
wxUrlInput.value = CONFIG.wxUrl;
nodeUrlInput.value = CONFIG.nodeUrl;
keeperNodeUrlInput.value = CONFIG.keeperNodeUrl;
const setConfigButton = document.getElementById("set-config-button");
setConfigButton.onclick = () => {
    CONFIG.wxUrl = wxUrlInput.value;
    CONFIG.nodeUrl = nodeUrlInput.value;
    CONFIG.keeperNodeUrl = keeperNodeUrlInput.value;
    initSigners();
};
var allSignersBlock = getDiv();
document.body.appendChild(allSignersBlock);
function initSigners() {
    const allSigners = [];
    var wxUrlObj = new URL(CONFIG.wxUrl);
    //ProviderWEB
    const signerWeb = new signer_1.Signer({
        NODE_URL: CONFIG.nodeUrl,
    });
    signerWeb.setProvider(new provider_web_1.ProviderWeb(wxUrlObj.origin + "/signer"));
    allSigners.push({ signer: signerWeb, name: "WEB" });
    //ProviderCLOUD
    const signerCloud = new signer_1.Signer({
        NODE_URL: CONFIG.nodeUrl,
    });
    signerCloud.setProvider(new provider_cloud_1.ProviderCloud(wxUrlObj.origin + "/signer-cloud" + wxUrlObj.search));
    allSigners.push({ signer: signerCloud, name: "CLOUD(EMAIL)" });
    //ProviderKeeper
    const signerKeeper = new signer_1.Signer({
        NODE_URL: CONFIG.keeperNodeUrl,
    });
    signerKeeper.setProvider(new provider_keeper_1.ProviderKeeper());
    allSigners.push({ signer: signerKeeper, name: "KEEPER" });
    //ProviderLedger
    const signerLedger = new signer_1.Signer({
        NODE_URL: CONFIG.nodeUrl,
    });
    signerLedger.setProvider(new provider_ledger_1.ProviderLedger());
    allSigners.push({ signer: signerLedger, name: "LEDGER" });
    //ProviderMetamask
    const signerMetamask = new signer_1.Signer({
        NODE_URL: CONFIG.nodeUrl,
    });
    try {
        const metamaskProvider = new provider_metamask_1.ProviderMetamask();
        signerMetamask.setProvider(metamaskProvider);
    }
    catch (_a) {
        console.error("METAMASK not found");
    }
    allSigners.push({ signer: signerMetamask, name: "METAMASK" });
    //ProviderMailbox
    const signerMailbox = new signer_1.Signer({
        NODE_URL: CONFIG.nodeUrl,
    });
    signerMailbox.setProvider(new provider_mailbox_1.ProviderMailbox(wxUrlObj.origin + "/signer-mailbox"));
    allSigners.push({ signer: signerMailbox, name: "MAILBOX" });
    //Draw provider blocks
    clearAllSignerBlock();
    for (const signer of allSigners) {
        drawSignerBlock(allSignersBlock, signer);
    }
}
function clearAllSignerBlock() {
    allSignersBlock.remove();
    allSignersBlock = getDiv();
    document.body.appendChild(allSignersBlock);
}
function getSignerButton(label, callback) {
    const block = getDiv();
    block.style.padding = "5px";
    const button = document.createElement("button");
    button.innerText = label;
    block.appendChild(button);
    const output = getDiv();
    block.appendChild(output);
    button.onclick = () => {
        callback()
            .then((res) => {
            output.style.color = "";
            var status_text = "";
            if (Array.isArray(res)) {
                for (var tx of res) {
                    status_text += tx.id.toString() + "\n";
                }
            }
            else {
                status_text = res.id.toString() + "\n";
            }
            output.innerText = status_text;
        })
            .catch((rej) => {
            output.style.color = "red";
            output.innerText = rej.message ? rej.message.toString() : rej.toString();
        });
    };
    return block;
}
function drawSignerBlock(allSignersBlock, s) {
    const block = getDiv();
    allSignersBlock.appendChild(block);
    const title = document.createElement("h1");
    title.innerText = `Provider ${s.name}`;
    block.appendChild(title);
    if (!s.signer.currentProvider) {
        const err = getDiv();
        err.style.color = "red";
        err.innerText = `${s.name} not found`;
        block.appendChild(err);
        return;
    }
    const nodeUrl = getDiv();
    nodeUrl.innerText = `NODE_URL: ${s.signer._options.NODE_URL}`;
    block.appendChild(nodeUrl);
    if (s.signer && s.signer.currentProvider && s.signer.currentProvider._clientUrl) {
        const providerUrl = getDiv();
        providerUrl.innerText = `PROVIDER_URL: ${s.signer.currentProvider._clientUrl}`;
        block.appendChild(providerUrl);
    }
    const loginBlock = getDiv();
    loginBlock.style.margin = "5px";
    loginBlock.style.padding = "5px";
    loginBlock.style.border = "solid";
    block.appendChild(loginBlock);
    const loginButton = document.createElement("button");
    loginButton.innerText = `Login ${s.name}`;
    loginBlock.appendChild(loginButton);
    var userDataBlock;
    loginButton.onclick = () => {
        if (userDataBlock)
            userDataBlock.remove();
        userDataBlock = getDiv();
        loginBlock.appendChild(userDataBlock);
        s.signer.login()
            .then((userData) => {
            const address = getDiv();
            const publicKey = getDiv();
            address.innerText = `Address: ${userData.address}`;
            publicKey.innerText = `Public Key: ${userData.publicKey}`;
            userDataBlock.appendChild(address);
            userDataBlock.appendChild(publicKey);
        })
            .catch((error) => {
            const err = getDiv();
            err.style.color = "red";
            err.innerText = error;
            userDataBlock.appendChild(err);
        });
    };
    const transferBlock = getDiv();
    transferBlock.style.margin = "5px";
    transferBlock.style.padding = "5px";
    transferBlock.style.border = "solid";
    block.appendChild(transferBlock);
    const transferDefaultParams = {
        assetId: "DWgwcZTMhSvnyYCoWLRUXXSH1RSkzThXLJhww9gwkqdn",
        amount: 101,
        recipient: "3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",
        fee: 100001,
        feeAssetId: null,
    };
    const transferParamsField = document.createElement("textarea");
    transferParamsField.style.width = "300px";
    transferParamsField.style.height = "150px";
    transferBlock.appendChild(transferParamsField);
    transferParamsField.value = JSON.stringify(transferDefaultParams);
    transferBlock.appendChild(getSignerButton("Transfer (type 4)", () => s.signer.transfer(JSON.parse(transferParamsField.value)).broadcast()));
    const transferWithAttachmentParams = {
        amount: 202,
        recipient: "3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",
        attachment: "SQHFQMRT97NTco3",
    };
    const transferWithAttachmentBlock = getDiv();
    transferWithAttachmentBlock.style.margin = "5px";
    transferWithAttachmentBlock.style.padding = "5px";
    transferWithAttachmentBlock.style.border = "solid";
    block.appendChild(transferWithAttachmentBlock);
    transferWithAttachmentBlock.appendChild(getSignerButton("Transfer (with attachement)", () => s.signer.transfer(transferWithAttachmentParams).broadcast()));
    const invokeBlock = getDiv();
    invokeBlock.style.margin = "5px";
    invokeBlock.style.padding = "5px";
    invokeBlock.style.border = "solid";
    block.appendChild(invokeBlock);
    const invokeDefaultParams = {
        dApp: "3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",
        fee: 500001,
        feeAssetId: null,
        payment: [
            {
                assetId: null,
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
    };
    const invokeParamField = document.createElement("textarea");
    invokeParamField.style.width = "300px";
    invokeParamField.style.height = "150px";
    invokeParamField.value = JSON.stringify(invokeDefaultParams);
    invokeBlock.appendChild(invokeParamField);
    invokeBlock.appendChild(getSignerButton("Invoke (type 16)", () => s.signer.invoke(JSON.parse(invokeParamField.value)).broadcast()));
}
initSigners();
