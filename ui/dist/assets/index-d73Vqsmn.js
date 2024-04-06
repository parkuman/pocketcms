var ze=Object.defineProperty;var Ue=(t,e,n)=>e in t?ze(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var re=(t,e,n)=>(Ue(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function k(){}function K(t,e){for(const n in e)t[n]=e[n];return t}function Pe(t){return t()}function me(){return Object.create(null)}function q(t){t.forEach(Pe)}function te(t){return typeof t=="function"}function M(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function We(t){return Object.keys(t).length===0}function Ke(t,...e){if(t==null){for(const r of e)r(void 0);return k}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function ie(t,e,n,r){if(t){const o=je(t,e,n,r);return t[0](o)}}function je(t,e,n,r){return t[1]&&r?K(n.ctx.slice(),t[1](r(e))):n.ctx}function le(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if(e.dirty===void 0)return o;if(typeof o=="object"){const i=[],c=Math.max(e.dirty.length,o.length);for(let s=0;s<c;s+=1)i[s]=e.dirty[s]|o[s];return i}return e.dirty|o}return e.dirty}function ce(t,e,n,r,o,i){if(o){const c=je(e,n,r,i);t.p(c,o)}}function ae(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function U(t){return t&&te(t.destroy)?t.destroy:k}function w(t,e){t.appendChild(e)}function C(t,e,n){t.insertBefore(e,n||null)}function E(t){t.parentNode&&t.parentNode.removeChild(t)}function $(t){return document.createElement(t)}function Ne(t){return document.createTextNode(t)}function j(){return Ne(" ")}function de(){return Ne("")}function h(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Ve(t){return Array.from(t.childNodes)}function ge(t,e,n){t.classList.toggle(e,!!n)}function Ge(t,e,{bubbles:n=!1,cancelable:r=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:r})}function Q(t,e){return new t(e)}let V;function W(t){V=t}function pe(){if(!V)throw new Error("Function called outside component initialization");return V}function Je(t){pe().$$.after_update.push(t)}function Qe(t){pe().$$.on_destroy.push(t)}function Ze(){const t=pe();return(e,n,{cancelable:r=!1}={})=>{const o=t.$$.callbacks[e];if(o){const i=Ge(e,n,{cancelable:r});return o.slice().forEach(c=>{c.call(t,i)}),!i.defaultPrevented}return!0}}function be(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(r=>r.call(this,e))}const F=[],ye=[];let X=[];const we=[],De=Promise.resolve();let ue=!1;function Ie(){ue||(ue=!0,De.then(Te))}function Re(){return Ie(),De}function fe(t){X.push(t)}const oe=new Set;let H=0;function Te(){if(H!==0)return;const t=V;do{try{for(;H<F.length;){const e=F[H];H++,W(e),et(e.$$)}}catch(e){throw F.length=0,H=0,e}for(W(null),F.length=0,H=0;ye.length;)ye.pop()();for(let e=0;e<X.length;e+=1){const n=X[e];oe.has(n)||(oe.add(n),n())}X.length=0}while(F.length);for(;we.length;)we.pop()();ue=!1,oe.clear(),W(t)}function et(t){if(t.fragment!==null){t.update(),q(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(fe)}}function tt(t){const e=[],n=[];X.forEach(r=>t.indexOf(r)===-1?e.push(r):n.push(r)),n.forEach(r=>r()),X=e}const G=new Set;let R;function he(){R={r:0,c:[],p:R}}function _e(){R.r||q(R.c),R=R.p}function O(t,e){t&&t.i&&(G.delete(t),t.i(e))}function S(t,e,n,r){if(t&&t.o){if(G.has(t))return;G.add(t),R.c.push(()=>{G.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}function Z(t,e){const n={},r={},o={$$scope:1};let i=t.length;for(;i--;){const c=t[i],s=e[i];if(s){for(const l in c)l in s||(r[l]=1);for(const l in s)o[l]||(n[l]=s[l],o[l]=1);t[i]=s}else for(const l in c)o[l]=1}for(const c in r)c in n||(n[c]=void 0);return n}function ee(t){return typeof t=="object"&&t!==null?t:{}}function T(t){t&&t.c()}function D(t,e,n){const{fragment:r,after_update:o}=t.$$;r&&r.m(e,n),fe(()=>{const i=t.$$.on_mount.map(Pe).filter(te);t.$$.on_destroy?t.$$.on_destroy.push(...i):q(i),t.$$.on_mount=[]}),o.forEach(fe)}function I(t,e){const n=t.$$;n.fragment!==null&&(tt(n.after_update),q(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function nt(t,e){t.$$.dirty[0]===-1&&(F.push(t),Ie(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Y(t,e,n,r,o,i,c=null,s=[-1]){const l=V;W(t);const a=t.$$={fragment:null,ctx:[],props:i,update:k,not_equal:o,bound:me(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:me(),dirty:s,skip_bound:!1,root:e.target||l.$$.root};c&&c(a.root);let u=!1;if(a.ctx=n?n(t,e.props||{},(m,b,...L)=>{const _=L.length?L[0]:b;return a.ctx&&o(a.ctx[m],a.ctx[m]=_)&&(!a.skip_bound&&a.bound[m]&&a.bound[m](_),u&&nt(t,m)),b}):[],a.update(),u=!0,q(a.before_update),a.fragment=r?r(a.ctx):!1,e.target){if(e.hydrate){const m=Ve(e.target);a.fragment&&a.fragment.l(m),m.forEach(E)}else a.fragment&&a.fragment.c();e.intro&&O(t.$$.fragment),D(t,e.target,e.anchor),Te()}W(l)}class z{constructor(){re(this,"$$");re(this,"$$set")}$destroy(){I(this,1),this.$destroy=k}$on(e,n){if(!te(n))return k;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const o=r.indexOf(n);o!==-1&&r.splice(o,1)}}$set(e){this.$$set&&!We(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const rt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(rt);const B=[];function qe(t,e){return{subscribe:Me(t,e).subscribe}}function Me(t,e=k){let n;const r=new Set;function o(s){if(M(t,s)&&(t=s,n)){const l=!B.length;for(const a of r)a[1](),B.push(a,t);if(l){for(let a=0;a<B.length;a+=2)B[a][0](B[a+1]);B.length=0}}}function i(s){o(s(t))}function c(s,l=k){const a=[s,l];return r.add(a),r.size===1&&(n=e(o,i)||k),s(t),()=>{r.delete(a),r.size===0&&n&&(n(),n=null)}}return{set:o,update:i,subscribe:c}}function He(t,e,n){const r=!Array.isArray(t),o=r?[t]:t;if(!o.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const i=e.length<2;return qe(n,(c,s)=>{let l=!1;const a=[];let u=0,m=k;const b=()=>{if(u)return;m();const _=e(r?a[0]:a,c,s);i?c(_):m=te(_)?_:k},L=o.map((_,A)=>Ke(_,y=>{a[A]=y,u&=~(1<<A),l&&b()},()=>{u|=1<<A}));return l=!0,b(),function(){q(L),m(),l=!1}})}function Be(t,e){if(t instanceof RegExp)return{keys:!1,pattern:t};var n,r,o,i,c=[],s="",l=t.split("/");for(l[0]||l.shift();o=l.shift();)n=o[0],n==="*"?(c.push("wild"),s+="/(.*)"):n===":"?(r=o.indexOf("?",1),i=o.indexOf(".",1),c.push(o.substring(1,~r?r:~i?i:o.length)),s+=~r&&!~i?"(?:/([^/]+?))?":"/([^/]+?)",~i&&(s+=(~r?"?":"")+"\\"+o.substring(i))):s+="/"+o;return{keys:c,pattern:new RegExp("^"+s+(e?"(?=$|/)":"/?$"),"i")}}function ot(t){let e,n,r;const o=[t[2]];var i=t[0];function c(s,l){let a={};for(let u=0;u<o.length;u+=1)a=K(a,o[u]);return l!==void 0&&l&4&&(a=K(a,Z(o,[ee(s[2])]))),{props:a}}return i&&(e=Q(i,c(t)),e.$on("routeEvent",t[7])),{c(){e&&T(e.$$.fragment),n=de()},m(s,l){e&&D(e,s,l),C(s,n,l),r=!0},p(s,l){if(l&1&&i!==(i=s[0])){if(e){he();const a=e;S(a.$$.fragment,1,0,()=>{I(a,1)}),_e()}i?(e=Q(i,c(s,l)),e.$on("routeEvent",s[7]),T(e.$$.fragment),O(e.$$.fragment,1),D(e,n.parentNode,n)):e=null}else if(i){const a=l&4?Z(o,[ee(s[2])]):{};e.$set(a)}},i(s){r||(e&&O(e.$$.fragment,s),r=!0)},o(s){e&&S(e.$$.fragment,s),r=!1},d(s){s&&E(n),e&&I(e,s)}}}function st(t){let e,n,r;const o=[{params:t[1]},t[2]];var i=t[0];function c(s,l){let a={};for(let u=0;u<o.length;u+=1)a=K(a,o[u]);return l!==void 0&&l&6&&(a=K(a,Z(o,[l&2&&{params:s[1]},l&4&&ee(s[2])]))),{props:a}}return i&&(e=Q(i,c(t)),e.$on("routeEvent",t[6])),{c(){e&&T(e.$$.fragment),n=de()},m(s,l){e&&D(e,s,l),C(s,n,l),r=!0},p(s,l){if(l&1&&i!==(i=s[0])){if(e){he();const a=e;S(a.$$.fragment,1,0,()=>{I(a,1)}),_e()}i?(e=Q(i,c(s,l)),e.$on("routeEvent",s[6]),T(e.$$.fragment),O(e.$$.fragment,1),D(e,n.parentNode,n)):e=null}else if(i){const a=l&6?Z(o,[l&2&&{params:s[1]},l&4&&ee(s[2])]):{};e.$set(a)}},i(s){r||(e&&O(e.$$.fragment,s),r=!0)},o(s){e&&S(e.$$.fragment,s),r=!1},d(s){s&&E(n),e&&I(e,s)}}}function it(t){let e,n,r,o;const i=[st,ot],c=[];function s(l,a){return l[1]?0:1}return e=s(t),n=c[e]=i[e](t),{c(){n.c(),r=de()},m(l,a){c[e].m(l,a),C(l,r,a),o=!0},p(l,[a]){let u=e;e=s(l),e===u?c[e].p(l,a):(he(),S(c[u],1,1,()=>{c[u]=null}),_e(),n=c[e],n?n.p(l,a):(n=c[e]=i[e](l),n.c()),O(n,1),n.m(r.parentNode,r))},i(l){o||(O(n),o=!0)},o(l){S(n),o=!1},d(l){l&&E(r),c[e].d(l)}}}function $e(){const t=window.location.href.indexOf("#/");let e=t>-1?window.location.href.substr(t+1):"/";const n=e.indexOf("?");let r="";return n>-1&&(r=e.substr(n+1),e=e.substr(0,n)),{location:e,querystring:r}}const ne=qe(null,function(e){e($e());const n=()=>{e($e())};return window.addEventListener("hashchange",n,!1),function(){window.removeEventListener("hashchange",n,!1)}});He(ne,t=>t.location);He(ne,t=>t.querystring);const ve=Me(void 0);async function lt(t){if(!t||t.length<1||t.charAt(0)!="/"&&t.indexOf("#/")!==0)throw Error("Invalid parameter location");await Re();const e=(t.charAt(0)=="#"?"":"#")+t;try{const n={...history.state};delete n.__svelte_spa_router_scrollX,delete n.__svelte_spa_router_scrollY,window.history.replaceState(n,void 0,e)}catch{console.warn("Caught exception while replacing the current page. If you're running this in the Svelte REPL, please note that the `replace` method might not work in this environment.")}window.dispatchEvent(new Event("hashchange"))}function se(t,e){if(e=Ee(e),!t||!t.tagName||t.tagName.toLowerCase()!="a")throw Error('Action "link" can only be used with <a> tags');return ke(t,e),{update(n){n=Ee(n),ke(t,n)}}}function ct(t){t?window.scrollTo(t.__svelte_spa_router_scrollX,t.__svelte_spa_router_scrollY):window.scrollTo(0,0)}function ke(t,e){let n=e.href||t.getAttribute("href");if(n&&n.charAt(0)=="/")n="#"+n;else if(!n||n.length<2||n.slice(0,2)!="#/")throw Error('Invalid value for "href" attribute: '+n);t.setAttribute("href",n),t.addEventListener("click",r=>{r.preventDefault(),e.disabled||at(r.currentTarget.getAttribute("href"))})}function Ee(t){return t&&typeof t=="string"?{href:t}:t||{}}function at(t){history.replaceState({...history.state,__svelte_spa_router_scrollX:window.scrollX,__svelte_spa_router_scrollY:window.scrollY},void 0),window.location.hash=t}function ut(t,e,n){let{routes:r={}}=e,{prefix:o=""}=e,{restoreScrollState:i=!1}=e;class c{constructor(f,p){if(!p||typeof p!="function"&&(typeof p!="object"||p._sveltesparouter!==!0))throw Error("Invalid component object");if(!f||typeof f=="string"&&(f.length<1||f.charAt(0)!="/"&&f.charAt(0)!="*")||typeof f=="object"&&!(f instanceof RegExp))throw Error('Invalid value for "path" argument - strings must start with / or *');const{pattern:x,keys:v}=Be(f);this.path=f,typeof p=="object"&&p._sveltesparouter===!0?(this.component=p.component,this.conditions=p.conditions||[],this.userData=p.userData,this.props=p.props||{}):(this.component=()=>Promise.resolve(p),this.conditions=[],this.props={}),this._pattern=x,this._keys=v}match(f){if(o){if(typeof o=="string")if(f.startsWith(o))f=f.substr(o.length)||"/";else return null;else if(o instanceof RegExp){const N=f.match(o);if(N&&N[0])f=f.substr(N[0].length)||"/";else return null}}const p=this._pattern.exec(f);if(p===null)return null;if(this._keys===!1)return p;const x={};let v=0;for(;v<this._keys.length;){try{x[this._keys[v]]=decodeURIComponent(p[v+1]||"")||null}catch{x[this._keys[v]]=null}v++}return x}async checkConditions(f){for(let p=0;p<this.conditions.length;p++)if(!await this.conditions[p](f))return!1;return!0}}const s=[];r instanceof Map?r.forEach((d,f)=>{s.push(new c(f,d))}):Object.keys(r).forEach(d=>{s.push(new c(d,r[d]))});let l=null,a=null,u={};const m=Ze();async function b(d,f){await Re(),m(d,f)}let L=null,_=null;i&&(_=d=>{d.state&&(d.state.__svelte_spa_router_scrollY||d.state.__svelte_spa_router_scrollX)?L=d.state:L=null},window.addEventListener("popstate",_),Je(()=>{ct(L)}));let A=null,y=null;const g=ne.subscribe(async d=>{A=d;let f=0;for(;f<s.length;){const p=s[f].match(d.location);if(!p){f++;continue}const x={route:s[f].path,location:d.location,querystring:d.querystring,userData:s[f].userData,params:p&&typeof p=="object"&&Object.keys(p).length?p:null};if(!await s[f].checkConditions(x)){n(0,l=null),y=null,b("conditionsFailed",x);return}b("routeLoading",Object.assign({},x));const v=s[f].component;if(y!=v){v.loading?(n(0,l=v.loading),y=v,n(1,a=v.loadingParams),n(2,u={}),b("routeLoaded",Object.assign({},x,{component:l,name:l.name,params:a}))):(n(0,l=null),y=null);const N=await v();if(d!=A)return;n(0,l=N&&N.default||N),y=v}p&&typeof p=="object"&&Object.keys(p).length?n(1,a=p):n(1,a=null),n(2,u=s[f].props),b("routeLoaded",Object.assign({},x,{component:l,name:l.name,params:a})).then(()=>{ve.set(a)});return}n(0,l=null),y=null,ve.set(void 0)});Qe(()=>{g(),_&&window.removeEventListener("popstate",_)});function P(d){be.call(this,t,d)}function Ye(d){be.call(this,t,d)}return t.$$set=d=>{"routes"in d&&n(3,r=d.routes),"prefix"in d&&n(4,o=d.prefix),"restoreScrollState"in d&&n(5,i=d.restoreScrollState)},t.$$.update=()=>{t.$$.dirty&32&&(history.scrollRestoration=i?"manual":"auto")},[l,a,u,r,o,i,P,Ye]}class ft extends z{constructor(e){super(),Y(this,e,ut,it,M,{routes:3,prefix:4,restoreScrollState:5})}}const J=[];let Fe;function Xe(t){const e=t.pattern.test(Fe);Ce(t,t.className,e),Ce(t,t.inactiveClassName,!e)}function Ce(t,e,n){(e||"").split(" ").forEach(r=>{r&&(t.node.classList.remove(r),n&&t.node.classList.add(r))})}ne.subscribe(t=>{Fe=t.location+(t.querystring?"?"+t.querystring:""),J.map(Xe)});function Oe(t,e){if(e&&(typeof e=="string"||typeof e=="object"&&e instanceof RegExp)?e={path:e}:e=e||{},!e.path&&t.hasAttribute("href")&&(e.path=t.getAttribute("href"),e.path&&e.path.length>1&&e.path.charAt(0)=="#"&&(e.path=e.path.substring(1))),e.className||(e.className="active"),!e.path||typeof e.path=="string"&&(e.path.length<1||e.path.charAt(0)!="/"&&e.path.charAt(0)!="*"))throw Error('Invalid value for "path" argument');const{pattern:n}=typeof e.path=="string"?Be(e.path):{pattern:e.path},r={node:t,className:e.className,inactiveClassName:e.inactiveClassName,pattern:n};return J.push(r),Xe(r),{destroy(){J.splice(J.indexOf(r),1)}}}function Le(t){if(!t)throw Error("Parameter args is required");if(!t.component==!t.asyncComponent)throw Error("One and only one of component and asyncComponent is required");if(t.component&&(t.asyncComponent=()=>Promise.resolve(t.component)),typeof t.asyncComponent!="function")throw Error("Parameter asyncComponent must be a function");if(t.conditions){Array.isArray(t.conditions)||(t.conditions=[t.conditions]);for(let n=0;n<t.conditions.length;n++)if(!t.conditions[n]||typeof t.conditions[n]!="function")throw Error("Invalid parameter conditions["+n+"]")}return t.loadingComponent&&(t.asyncComponent.loading=t.loadingComponent,t.asyncComponent.loadingParams=t.loadingParams||void 0),{component:t.asyncComponent,userData:t.userData,conditions:t.conditions&&t.conditions.length?t.conditions:void 0,props:t.props&&Object.keys(t.props).length?t.props:{},_sveltesparouter:!0}}function dt(t){let e;return{c(){e=$("p"),e.textContent="hello"},m(n,r){C(n,e,r)},p:k,i:k,o:k,d(n){n&&E(e)}}}class pt extends z{constructor(e){super(),Y(this,e,null,dt,M,{})}}const ht=t=>({}),Se=t=>({});function _t(t){let e,n,r,o,i,c,s,l,a,u,m,b;const L=t[3].default,_=ie(L,t,t[2],null),A=t[3].footer,y=ie(A,t,t[2],Se);return{c(){e=$("div"),n=$("main"),_&&_.c(),r=j(),o=$("footer"),y&&y.c(),i=j(),c=$("a"),c.innerHTML='<i class="ri-book-open-line txt-sm"></i> <span class="txt">TODO</span>',s=j(),l=$("span"),l.textContent="|",a=j(),u=$("a"),u.innerHTML='<span class="txt">TODO</span>',h(n,"class","page-content"),h(c,"href","/"),h(c,"target","_blank"),h(c,"rel","noopener noreferrer"),h(l,"class","delimiter"),h(u,"href","/"),h(u,"target","_blank"),h(u,"rel","noopener noreferrer"),h(u,"title","Releases"),h(o,"class","page-footer"),h(e,"class",m="page-wrapper "+t[1]),ge(e,"center-content",t[0])},m(g,P){C(g,e,P),w(e,n),_&&_.m(n,null),w(e,r),w(e,o),y&&y.m(o,null),w(o,i),w(o,c),w(o,s),w(o,l),w(o,a),w(o,u),b=!0},p(g,[P]){_&&_.p&&(!b||P&4)&&ce(_,L,g,g[2],b?le(L,g[2],P,null):ae(g[2]),null),y&&y.p&&(!b||P&4)&&ce(y,A,g,g[2],b?le(A,g[2],P,ht):ae(g[2]),Se),(!b||P&2&&m!==(m="page-wrapper "+g[1]))&&h(e,"class",m),(!b||P&3)&&ge(e,"center-content",g[0])},i(g){b||(O(_,g),O(y,g),b=!0)},o(g){S(_,g),S(y,g),b=!1},d(g){g&&E(e),_&&_.d(g),y&&y.d(g)}}}function mt(t,e,n){let{$$slots:r={},$$scope:o}=e,{center:i=!1}=e,{class:c=""}=e;return t.$$set=s=>{"center"in s&&n(0,i=s.center),"class"in s&&n(1,c=s.class),"$$scope"in s&&n(2,o=s.$$scope)},[i,c,o,r]}class gt extends z{constructor(e){super(),Y(this,e,mt,_t,M,{center:0,class:1})}}function xe(t){let e,n,r;return{c(){e=$("div"),e.innerHTML='<figure class="logo"><img src="./images/logo.svg" alt="PocketBase logo" width="40" height="40"/> <span class="txt">Pocket<strong>CMS</strong></span></figure>',n=j(),r=$("div"),h(e,"class","block txt-center m-b-lg"),h(r,"class","clearfix")},m(o,i){C(o,e,i),C(o,n,i),C(o,r,i)},d(o){o&&(E(e),E(n),E(r))}}}function bt(t){let e,n,r,o=!t[0]&&xe();const i=t[1].default,c=ie(i,t,t[2],null);return{c(){e=$("div"),o&&o.c(),n=j(),c&&c.c(),h(e,"class","wrapper wrapper-sm m-b-xl panel-wrapper svelte-lxxzfu")},m(s,l){C(s,e,l),o&&o.m(e,null),w(e,n),c&&c.m(e,null),r=!0},p(s,l){s[0]?o&&(o.d(1),o=null):o||(o=xe(),o.c(),o.m(e,n)),c&&c.p&&(!r||l&4)&&ce(c,i,s,s[2],r?le(i,s[2],l,null):ae(s[2]),null)},i(s){r||(O(c,s),r=!0)},o(s){S(c,s),r=!1},d(s){s&&E(e),o&&o.d(),c&&c.d(s)}}}function yt(t){let e,n;return e=new gt({props:{class:"full-page",center:!0,$$slots:{default:[bt]},$$scope:{ctx:t}}}),{c(){T(e.$$.fragment)},m(r,o){D(e,r,o),n=!0},p(r,[o]){const i={};o&5&&(i.$$scope={dirty:o,ctx:r}),e.$set(i)},i(r){n||(O(e.$$.fragment,r),n=!0)},o(r){S(e.$$.fragment,r),n=!1},d(r){I(e,r)}}}function wt(t,e,n){let{$$slots:r={},$$scope:o}=e,{nobranding:i=!1}=e;return t.$$set=c=>{"nobranding"in c&&n(0,i=c.nobranding),"$$scope"in c&&n(2,o=c.$$scope)},[i,r,o]}class $t extends z{constructor(e){super(),Y(this,e,wt,yt,M,{nobranding:0})}}function vt(t){let e;return{c(){e=$("p"),e.textContent="collections page!"},m(n,r){C(n,e,r)},p:k,d(n){n&&E(e)}}}function kt(t){let e,n;return e=new $t({props:{$$slots:{default:[vt]},$$scope:{ctx:t}}}),{c(){T(e.$$.fragment)},m(r,o){D(e,r,o),n=!0},p(r,[o]){const i={};o&1&&(i.$$scope={dirty:o,ctx:r}),e.$set(i)},i(r){n||(O(e.$$.fragment,r),n=!0)},o(r){S(e.$$.fragment,r),n=!1},d(r){I(e,r)}}}class Et extends z{constructor(e){super(),Y(this,e,null,kt,M,{})}}const Ct={"/collections":Le({component:Et,userData:{showAppSidebar:!0}}),"*":Le({component:pt,userData:{showAppSidebar:!0}})};function Ae(t){let e,n,r,o,i,c,s,l,a;return{c(){e=$("aside"),n=$("a"),n.innerHTML='<img src="./images/logo.svg" alt="PocketBase logo" width="40" height="40"/>',r=j(),o=$("nav"),i=$("a"),i.innerHTML='<i class="ri-database-2-line"></i>',c=j(),s=$("a"),s.innerHTML='<i class="ri-tools-line"></i>',h(n,"href","/"),h(n,"class","logo logo-sm"),h(i,"href","/collections"),h(i,"class","menu-item"),h(i,"aria-label","Collections"),h(s,"href","/settings"),h(s,"class","menu-item"),h(s,"aria-label","Settings"),h(o,"class","main-menu"),h(e,"class","app-sidebar")},m(u,m){C(u,e,m),w(e,n),w(e,r),w(e,o),w(o,i),w(o,c),w(o,s),l||(a=[U(se.call(null,n)),U(se.call(null,i)),U(Oe.call(null,i,{path:"/collections/?.*",className:"current-route"})),U(se.call(null,s)),U(Oe.call(null,s,{path:"/settings/?.*",className:"current-route"}))],l=!0)},d(u){u&&E(e),l=!1,q(a)}}}function Ot(t){let e,n,r,o,i,c,s=t[0]&&Ae();return i=new ft({props:{routes:Ct}}),i.$on("routeLoading",t[1]),i.$on("conditionsFailed",t[2]),{c(){e=j(),n=$("div"),s&&s.c(),r=j(),o=$("div"),T(i.$$.fragment),document.title="PocketCMS",h(o,"class","app-body"),h(n,"class","app-layout")},m(l,a){C(l,e,a),C(l,n,a),s&&s.m(n,null),w(n,r),w(n,o),D(i,o,null),c=!0},p(l,[a]){l[0]?s||(s=Ae(),s.c(),s.m(n,r)):s&&(s.d(1),s=null)},i(l){c||(O(i.$$.fragment,l),c=!0)},o(l){S(i.$$.fragment,l),c=!1},d(l){l&&(E(e),E(n)),s&&s.d(),I(i)}}}function Lt(t,e,n){let r=!1,o;function i(s){var l,a,u,m;((l=s==null?void 0:s.detail)==null?void 0:l.location)!==o&&(n(0,r=!!((u=(a=s==null?void 0:s.detail)==null?void 0:a.userData)!=null&&u.showAppSidebar)),o=(m=s==null?void 0:s.detail)==null?void 0:m.location)}function c(){lt("/")}return[r,i,c]}class St extends z{constructor(e){super(),Y(this,e,Lt,Ot,M,{})}}new St({target:document.getElementById("app")});
