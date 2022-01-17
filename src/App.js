import { Signer } from '@waves/signer';
import { ProviderWeb } from '@waves.exchange/provider-web';
import { ProviderCloud } from '@waves.exchange/provider-cloud';

const signerWeb = new Signer({
  NODE_URL: 'https://nodes-testnet.wavesnodes.com'
});
signerWeb.setProvider(new ProviderWeb('https://wallet-stage1.waves.exchange/signer/'));

const signerCloud = new Signer({
  NODE_URL: 'https://nodes-testnet.wavesnodes.com'
});
signerCloud.setProvider(new ProviderCloud('https://wallet-stage1.waves.exchange/signer-cloud/'));

function testlogin(signer) {
  return signer.login();
};

function testsend(signer) {
  return signer
    .transfer({amount: 100, recipient: 'alias:T:merry'})
    .broadcast(); 
};

function testsend_waves(signer) {
  return signer
    .transfer({ 
      assetId: 'WAVES', 
      amount: 101, 
      recipient: '3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh',
      fee: 100001,
      feeAssetId: 'WAVES'
    })
    .broadcast(); 
};

function testinvoke(signer) {
  return signer
    .invoke({
  dApp: '3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh',
  payment: [
    {assetId: null, amount: 12345 },
    {assetId: '25FEqEjRkqK6yCkiT7Lz6SAYz7gUFCtxfCChnrVFD5AT', amount: 123 },
    {assetId: '5Sh9KghfkZyhjwuodovDhB6PghDUGBHiAPZ4MkrPgKtX', amount: 234 },
    {assetId: 'DWgwcZTMhSvnyYCoWLRUXXSH1RSkzThXLJhww9gwkqdn', amount: 345 },
    {assetId: 'EmcmfM27TPaemhuREZGD8WLvsuLCdqx8WovMrDQKbXS1', amount: 456 },
  ],
  call: {
    function: 'foo',
    args: [{
      type: 'string',
      value: 'Hello, world!',
    }],
  }
})
    .broadcast();
};

function testinvoke_waves(signer) {
  return signer
    .invoke({
  dApp: '3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh',
  fee: 500001,
  feeAssetId: 'WAVES',
  payment: [
    {assetId: 'WAVES', amount: 12345 },
    {assetId: '25FEqEjRkqK6yCkiT7Lz6SAYz7gUFCtxfCChnrVFD5AT', amount: 123 },
    {assetId: '5Sh9KghfkZyhjwuodovDhB6PghDUGBHiAPZ4MkrPgKtX', amount: 234 }
  ],
  call: {
    function: 'foo',
    args: [{
      type: 'string',
      value: 'Hello, world!',
    }],
  }
})
    .broadcast();
};

function App() {
  return (
    <div className="Signer examples">
    <div>
    <h3>Provider-Web</h3>
    <div>https://wallet-stage1.waves.exchange/signer</div>
      <div>
        <button onClick={() => testlogin(signerWeb)}>LOGIN</button>
      </div>
      <div>
        <button onClick={() => testsend(signerWeb)}>TRANSFER</button>
      </div>
      <div>
        <button onClick={() => testinvoke(signerWeb)}>INVOKE</button>
      </div>
      <div>
        <button onClick={() => testsend_waves(signerWeb)}>TRANSFER (WAVES as id)</button>
      </div>
      <div>
        <button onClick={() => testinvoke_waves(signerWeb)}>INVOKE (WAVES is id)</button>
      </div>
    </div>
    <div>
    <h3>Provider-Cloud</h3>
    <div>https://wallet-stage1.waves.exchange/signer-cloud</div>
      <div>
        <button onClick={() => testlogin(signerCloud)}>LOGIN</button>
      </div>
      <div>
        <button onClick={() => testsend(signerCloud)}>TRANSFER</button>
      </div>
      <div>
        <button onClick={() => testinvoke(signerCloud)}>INVOKE</button>
      </div>
      <div>
        <button onClick={() => testsend_waves(signerCloud)}>TRANSFER (WAVES as id)</button>
      </div>
      <div>
        <button onClick={() => testinvoke_waves(signerCloud)}>INVOKE (WAVES is id)</button>
      </div>
    </div>
    </div>
  );
}

export default App;
