import { Signer } from '@waves/signer';
import { ProviderWeb } from '@waves.exchange/provider-web';
import { ProviderCloud } from '@waves.exchange/provider-cloud';

const signerWeb = new Signer({
  NODE_URL: 'https://nodes-testnet.wavesnodes.com'
});
signerWeb.setProvider(new ProviderWeb('https://testnet.waves.exchange/signer/'));

const signerCloud = new Signer({
  NODE_URL: 'https://nodes-testnet.wavesnodes.com'
});
signerCloud.setProvider(new ProviderCloud('https://testnet.waves.exchange/signer-cloud/'));

function testlogin(signer) {
  return signer.login();
};

function testsend(signer) {
  return signer
    .transfer({amount: 100, recipient: 'alias:T:merry'}) // Transfer 1 WAVES to alias merry
    .broadcast(); 
};

function testinvoke(signer) {
  return signer
    .invoke({
  dApp: '3N27HUMt4ddx2X7foQwZRmpFzg5PSzLrUgU',
  payment: [{
    assetId: null,
    amount: 123456,
  }],
  call: {
    function: 'tellme',
    args: [{
      type: 'string',
      value: 'Some text',
    }],
  }
})
    .broadcast();
};

function App() {
  return (
    <div className="TestApp">
    <div>
    <h3>Provider-Web</h3>
    <div>https://testnet.waves.exchange/signer</div>
      <div>
        <button onClick={() => testlogin(signerWeb)}>LOGIN</button>
      </div>
      <div>
        <button onClick={() => testsend(signerWeb)}>TRANSFER</button>
      </div>
      <div>
        <button onClick={() => testinvoke(signerWeb)}>INVOKE</button>
      </div>
    </div>
    <div>
    <h3>Provider-Cloud</h3>
    <div>https://testnet.waves.exchange/signer-cloud</div>
      <div>
        <button onClick={() => testlogin(signerCloud)}>LOGIN</button>
      </div>
      <div>
        <button onClick={() => testsend(signerCloud)}>TRANSFER</button>
      </div>
      <div>
        <button onClick={() => testinvoke(signerCloud)}>INVOKE</button>
      </div>
    </div>
    </div>
  );
}

export default App;
