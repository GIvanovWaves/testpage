(this.webpackJsonptestpage=this.webpackJsonptestpage||[]).push([[0],{199:function(e,t,n){"use strict";n.r(t);var r=n(19),s=n.n(r),i=n(99),a=n.n(i),o=n(100),c=n(46),d=n(9),u=n(10),l=n(13),h=n(21),j=n(20),b=n(49),v=n(66),g=n(67),O=n(114),p=n(2),x={wxUrl:"https://wallet-stage2.waves.exchange",nodeUrl:"https://nodes-testnet.wavesnodes.com"},f=new v.a(x.wxUrl+"/signer/"),U=new g.a(x.wxUrl+"/signer-cloud/"),w=new O.ProviderKeeper,y=new b.Signer({NODE_URL:x.nodeUrl}),S=new b.Signer({NODE_URL:x.nodeUrl}),m=new b.Signer({NODE_URL:x.nodeUrl});function k(e){return e.transfer({amount:100,recipient:"alias:T:merry"}).broadcast()}function C(e){return e.transfer({amount:1,assetId:"DWgwcZTMhSvnyYCoWLRUXXSH1RSkzThXLJhww9gwkqdn",recipient:"3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh"}).broadcast()}function X(e){return e.transfer({assetId:"WAVES",amount:101,recipient:"3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",fee:100001,feeAssetId:"WAVES"}).broadcast()}function D(e){return e.invoke({dApp:"3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",payment:[{assetId:null,amount:5},{assetId:"25FEqEjRkqK6yCkiT7Lz6SAYz7gUFCtxfCChnrVFD5AT",amount:4},{assetId:"5Sh9KghfkZyhjwuodovDhB6PghDUGBHiAPZ4MkrPgKtX",amount:3},{assetId:"DWgwcZTMhSvnyYCoWLRUXXSH1RSkzThXLJhww9gwkqdn",amount:2},{assetId:"EmcmfM27TPaemhuREZGD8WLvsuLCdqx8WovMrDQKbXS1",amount:1}],call:{function:"foo",args:[{type:"string",value:"Hello, world!"}]}}).broadcast()}function R(e){return e.invoke({dApp:"3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",fee:500001,feeAssetId:"WAVES",payment:[{assetId:"WAVES",amount:1},{assetId:"25FEqEjRkqK6yCkiT7Lz6SAYz7gUFCtxfCChnrVFD5AT",amount:2},{assetId:"5Sh9KghfkZyhjwuodovDhB6PghDUGBHiAPZ4MkrPgKtX",amount:3}],call:{function:"foo",args:[{type:"string",value:"Hello, world!"}]}}).broadcast()}function A(e){return e.invoke({dApp:"3N4ziXSMRverXyxHDUKKMR9MHXnB3TyU3Yh",call:{function:"foo",args:[{type:"string",value:"Hello, world!"}]}}).broadcast()}y.setProvider(f),S.setProvider(U),m.setProvider(w);var M=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(e){var r;return Object(d.a)(this,n),(r=t.call(this,e)).state={address:""},r.login=r.login.bind(Object(l.a)(r)),r}return Object(u.a)(n,[{key:"login",value:function(){var e=this,t=this.props.signer;""!==t&&function(e){return e.login()}(t).then((function(t,n){e.setState({address:t.address})}))}},{key:"render",value:function(){return Object(p.jsxs)("div",{children:[Object(p.jsxs)("h4",{children:[" Provider ",this.props.provider," "]})," ",Object(p.jsxs)("div",{children:[" Address: ",this.state.address," "]})," ",Object(p.jsxs)("button",{onClick:this.login,children:[" Login ",this.props.provider," "]})," "]})}}]),n}(s.a.Component),P=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object(p.jsxs)("div",{children:[Object(p.jsx)(E,{signer:this.props.signer,buttonName:"Transfer",testFunction:k}),Object(p.jsx)(E,{signer:this.props.signer,buttonName:"Transfer BTC",testFunction:C}),Object(p.jsx)(E,{signer:this.props.signer,buttonName:"Transfer with WAVES as AssetID",testFunction:X}),Object(p.jsx)(E,{signer:this.props.signer,buttonName:"Invoke",testFunction:D}),Object(p.jsx)(E,{signer:this.props.signer,buttonName:"Invoke with WAVES as AssetID",testFunction:R}),Object(p.jsx)(E,{signer:this.props.signer,buttonName:"Invoke without payments",testFunction:A})," "]})}}]),n}(s.a.Component),E=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(e){var r;return Object(d.a)(this,n),(r=t.call(this,e)).state={status:""},r.clickHandle=r.clickHandle.bind(Object(l.a)(r)),r}return Object(u.a)(n,[{key:"clickHandle",value:function(){var e=this;return this.props.testFunction(this.props.signer).catch((function(t){e.setState({status:t.message.toString()})})).then((function(t,n){if(t)if(Array.isArray(t)){var r,s="",i=Object(c.a)(t);try{for(i.s();!(r=i.n()).done;){s=r.value.id.toString()+" ",e.setState({status:s})}}catch(a){i.e(a)}finally{i.f()}}else e.setState({status:t.id.toString()})}))}},{key:"render",value:function(){return Object(p.jsxs)("div",{children:[Object(p.jsxs)("button",{onClick:this.clickHandle,children:[" ",this.props.buttonName," "]})," ",Object(p.jsxs)("div",{children:[" ",this.state.status," "]})," "]})}}]),n}(s.a.Component),H=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(e){var r;return Object(d.a)(this,n),(r=t.call(this,e)).state={wxUrl:x.wxUrl,nodeUrl:x.nodeUrl,currentWxUrl:x.wxUrl,currentNodeUrl:x.nodeUrl},r.handleChange=r.handleChange.bind(Object(l.a)(r)),r.setProviders=r.setProviders.bind(Object(l.a)(r)),r}return Object(u.a)(n,[{key:"handleChange",value:function(e){var t=e.target,n=t.value,r=t.name;this.setState(Object(o.a)({},r,n))}},{key:"setProviders",value:function(e){var t,n;t=this.state.wxUrl,n=this.state.nodeUrl,x.wxUrl=t,x.nodeUrl=n,f=new v.a(t+"/signer"),U=new g.a(t+"/signer-cloud/"),y.setProvider(f),S.setProvider(U),m.setProvider(w),this.setState({currentWxUrl:this.state.wxUrl}),this.setState({currentNodeUrl:this.state.nodeUrl})}},{key:"render",value:function(){return Object(p.jsxs)("div",{children:[Object(p.jsxs)("h4",{children:[" Current WX: ",this.state.currentWxUrl," "]})," ",Object(p.jsxs)("h4",{children:[" Current Node: ",this.state.currentNodeUrl," "]})," ",Object(p.jsxs)("div",{children:["WX URL:",Object(p.jsx)("input",{name:"wxUrl",type:"text",style:{width:300},value:this.state.wxUrl,onChange:this.handleChange})," "]})," ",Object(p.jsxs)("div",{children:["NODE URL:",Object(p.jsx)("input",{name:"nodeUrl",type:"text",style:{width:300},value:this.state.nodeUrl,onChange:this.handleChange})," "]})," ",Object(p.jsx)("button",{onClick:this.setProviders,children:" Set "})," "]})}}]),n}(s.a.Component);var T=function(){return Object(p.jsxs)("div",{children:[Object(p.jsx)(H,{config:x})," ",Object(p.jsx)("br",{}),Object(p.jsx)(M,{provider:"WEB",signer:y}),Object(p.jsx)("br",{}),Object(p.jsx)(P,{signer:y})," ",Object(p.jsx)("br",{}),Object(p.jsx)(M,{provider:"CLOUD",signer:S}),Object(p.jsx)("br",{}),Object(p.jsx)(P,{signer:S})," ",Object(p.jsx)("br",{}),Object(p.jsx)(M,{provider:"KEEPER",signer:m}),Object(p.jsx)("br",{}),Object(p.jsx)(P,{signer:m})," "]})},N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,200)).then((function(t){var n=t.getCLS,r=t.getFID,s=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),r(e),s(e),i(e),a(e)}))};a.a.render(Object(p.jsx)(s.a.StrictMode,{children:Object(p.jsx)(T,{})}),document.getElementById("root")),N()},54:function(e,t){}},[[199,1,2]]]);
//# sourceMappingURL=main.cb4326a2.chunk.js.map