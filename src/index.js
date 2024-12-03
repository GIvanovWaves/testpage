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
};
function getDiv() {
    return document.createElement("div");
}
const versionsBlock = getDiv();
document.body.appendChild(versionsBlock);
const b64string = package_json_1.default.toString().substring(29);
const packages = JSON.parse(atob(b64string));
for (const [k, v] of Object.entries(packages.dependencies)) {
    const line = getDiv();
    line.innerText = `${k}: ${v}`;
    versionsBlock.appendChild(line);
}
const allSignersBlock = getDiv();
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
        NODE_URL: CONFIG.nodeUrl,
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
        drawSignerBlock(signer);
    }
}
function clearAllSignerBlock() {
    allSignersBlock.childNodes.forEach((child) => child.remove());
    for (const c of allSignersBlock.children)
        allSignersBlock.removeChild(c);
}
function drawSignerBlock(s) {
    const block = getDiv();
    allSignersBlock.appendChild(block);
    const title = document.createElement("h1");
    title.innerText = `Provider ${s.name}`;
    block.appendChild(title);
    if (!s.signer.currentProvider) {
        const err = getDiv();
        err.style.color = "red";
        err.innerText = `provider ${s.name} not found`;
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
    const loginButton = document.createElement("button");
    loginButton.innerText = `Login ${s.name}`;
    block.appendChild(loginButton);
    var userDataBlock;
    loginButton.onclick = () => {
        if (userDataBlock)
            userDataBlock.remove();
        userDataBlock = getDiv();
        block.appendChild(userDataBlock);
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
}
initSigners();
