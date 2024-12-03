import { Signer } from "@waves/signer";
import { ProviderWeb } from "@waves.exchange/provider-web";
import { ProviderCloud } from "@waves.exchange/provider-cloud";
import { ProviderKeeper } from "@waves/provider-keeper";
import { ProviderLedger } from "@waves/provider-ledger";
import { ProviderMetamask } from "@waves/provider-metamask";
import { ProviderMailbox } from "@waves.exchange/provider-mailbox";
import PackagesFile from './../package.json';

interface SignerWithName {
    signer: Signer,
    name: string,
}

const CONFIG = {
    wxUrl: "https://testnet.wx.network",
    nodeUrl: "https://nodes-testnet.wavesnodes.com",
};

function getDiv(): HTMLDivElement {
    return document.createElement("div") as HTMLDivElement;
}

const versionsBlock = getDiv();
document.body.appendChild(versionsBlock);

const b64string = PackagesFile.toString().substring(29);
const packages = JSON.parse(atob(b64string));

for (const [k, v] of Object.entries(packages.dependencies)) {
    const line = getDiv()
    line.innerText = `${k}: ${v}`;
    versionsBlock.appendChild(line);
}

const allSignersBlock = getDiv();
document.body.appendChild(allSignersBlock);

function initSigners() {
    const allSigners: SignerWithName[] = [];
    var wxUrlObj = new URL(CONFIG.wxUrl);

    //ProviderWEB
    const signerWeb = new Signer({
        NODE_URL: CONFIG.nodeUrl
    });
    signerWeb.setProvider(new ProviderWeb(wxUrlObj.origin + "/signer"));
    allSigners.push({ signer: signerWeb, name: "WEB" });

    //ProviderCLOUD
    const signerCloud = new Signer({
        NODE_URL: CONFIG.nodeUrl
    });
    signerCloud.setProvider(new ProviderCloud(wxUrlObj.origin + "/signer-cloud" + wxUrlObj.search));
    allSigners.push({ signer: signerCloud, name: "CLOUD(EMAIL)" });



    clearAllSignerBlock();
    for (const signer of allSigners) {
        drawSignerBlock(signer);
    }
}

function clearAllSignerBlock() {
    allSignersBlock.childNodes.forEach((child) => child.remove());
    for (const c of allSignersBlock.children) allSignersBlock.removeChild(c);
}

function drawSignerBlock(s: SignerWithName) {
    const block = getDiv();
    allSignersBlock.appendChild(block);

    const title = document.createElement("h1");
    title.innerText = `Provider ${s.name}`
    block.appendChild(title);

    const loginButton = document.createElement("button") as HTMLButtonElement;
    loginButton.innerText = `Login ${s.name}`;

    block.appendChild(loginButton);
    var userDataBlock: HTMLDivElement;

    loginButton.onclick = () => {
        if(userDataBlock)
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
            })
    }
}

initSigners();