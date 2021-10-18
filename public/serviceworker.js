(function () {
    'use strict';

    function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}function n(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t,n,r){return i(e,t),a(n,"set"),function(e,t,n){if(t.set)t.set.call(e,n);else {if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n;}}(e,n,r),r}function a(e,t){if(void 0===e)throw new TypeError("attempted to "+t+" private static field before its declaration")}function i(e,t){if(e!==t)throw new TypeError("Private static access of wrong provenance")}var s=function(){function t(){e(this,t),r(this,"route",null),r(this,"view",void 0),r(this,"title","untitled"),r(this,"handle",void 0),r(this,"app",void 0);}return n(t,[{key:"initialise",value:function(){this.view.initialise();}},{key:"registerRoute",value:function(e){if(null===this.route)throw new Error("No route set for '".concat(this.title,"' controller."));console.log({route:this.route}),e.on(this.route,this.routeHandler.bind(this),{before:this.beforeRouteHandler?this.beforeRouteHandler.bind(this):null,after:this.afterRouteHandler?this.afterRouteHandler.bind(this):null,leave:this.leaveRouteHandler?this.leaveRouteHandler.bind(this):null,already:this.alreadyRouteHandler?this.alreadyRouteHandler.bind(this):null});}},{key:"routeHandler",value:function(e,t){}}],[{key:"nextHandle",get:function(){var e,n,r;return o(t,t,c,(r=c,i(n=t,t),a(r,"get"),1+(e=+function(e,t){return t.get?t.get.call(e):t.value}(n,r)))),e}}]),t}(),c={writable:!0,value:0},l="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function u(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var d=function(e){return e&&e.Math==Math&&e},f=d("object"==typeof globalThis&&globalThis)||d("object"==typeof window&&window)||d("object"==typeof self&&self)||d("object"==typeof l&&l)||function(){return this}()||Function("return this")(),h={},p=function(e){try{return !!e()}catch(e){return !0}},v=!p((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),S={},y={}.propertyIsEnumerable,N=Object.getOwnPropertyDescriptor,m=N&&!y.call({1:2},1);S.f=m?function(e){var t=N(this,e);return !!t&&t.enumerable}:y;var g,b,T=function(e,t){return {enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}},E={}.toString,w=function(e){return E.call(e).slice(8,-1)},_=w,C="".split,O=p((function(){return !Object("z").propertyIsEnumerable(0)}))?function(e){return "String"==_(e)?C.call(e,""):Object(e)}:Object,R=function(e){if(null==e)throw TypeError("Can't call method on "+e);return e},I=O,M=R,L=function(e){return I(M(e))},x=function(e){return "function"==typeof e},H=x,k=function(e){return "object"==typeof e?null!==e:H(e)},P=f,A=x,D=function(e){return A(e)?e:void 0},F=function(e,t){return arguments.length<2?D(P[e]):P[e]&&P[e][t]},U=F("navigator","userAgent")||"",j=f,J=U,B=j.process,Y=j.Deno,G=B&&B.versions||Y&&Y.version,K=G&&G.v8;K?b=(g=K.split("."))[0]<4?1:g[0]+g[1]:J&&(!(g=J.match(/Edge\/(\d+)/))||g[1]>=74)&&(g=J.match(/Chrome\/(\d+)/))&&(b=g[1]);var V=b&&+b,X=V,q=p,Q=!!Object.getOwnPropertySymbols&&!q((function(){var e=Symbol();return !String(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&X&&X<41})),W=Q&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,Z=x,z=F,ee=W?function(e){return "symbol"==typeof e}:function(e){var t=z("Symbol");return Z(t)&&Object(e)instanceof t},te=function(e){try{return String(e)}catch(e){return "Object"}},ne=x,re=te,oe=function(e){if(ne(e))return e;throw TypeError(re(e)+" is not a function")},ae=oe,ie=function(e,t){var n=e[t];return null==n?void 0:ae(n)},se=x,ce=k,le={exports:{}},ue=f,de=function(e,t){try{Object.defineProperty(ue,e,{value:t,configurable:!0,writable:!0});}catch(n){ue[e]=t;}return t},fe=de,he=f["__core-js_shared__"]||fe("__core-js_shared__",{}),pe=he;(le.exports=function(e,t){return pe[e]||(pe[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.18.2",mode:"global",copyright:"© 2021 Denis Pushkarev (zloirock.ru)"});var ve=R,Se=function(e){return Object(ve(e))},ye=Se,Ne={}.hasOwnProperty,me=Object.hasOwn||function(e,t){return Ne.call(ye(e),t)},ge=0,be=Math.random(),Te=function(e){return "Symbol("+String(void 0===e?"":e)+")_"+(++ge+be).toString(36)},Ee=f,we=le.exports,_e=me,Ce=Te,Oe=Q,Re=W,Ie=we("wks"),Me=Ee.Symbol,Le=Re?Me:Me&&Me.withoutSetter||Ce,xe=function(e){return _e(Ie,e)&&(Oe||"string"==typeof Ie[e])||(Oe&&_e(Me,e)?Ie[e]=Me[e]:Ie[e]=Le("Symbol."+e)),Ie[e]},He=k,ke=ee,Pe=ie,Ae=function(e,t){var n,r;if("string"===t&&se(n=e.toString)&&!ce(r=n.call(e)))return r;if(se(n=e.valueOf)&&!ce(r=n.call(e)))return r;if("string"!==t&&se(n=e.toString)&&!ce(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")},De=xe("toPrimitive"),Fe=function(e,t){if(!He(e)||ke(e))return e;var n,r=Pe(e,De);if(r){if(void 0===t&&(t="default"),n=r.call(e,t),!He(n)||ke(n))return n;throw TypeError("Can't convert object to primitive value")}return void 0===t&&(t="number"),Ae(e,t)},Ue=ee,je=function(e){var t=Fe(e,"string");return Ue(t)?t:String(t)},Je=k,Be=f.document,Ye=Je(Be)&&Je(Be.createElement),Ge=function(e){return Ye?Be.createElement(e):{}},Ke=Ge,Ve=!v&&!p((function(){return 7!=Object.defineProperty(Ke("div"),"a",{get:function(){return 7}}).a})),Xe=v,qe=S,Qe=T,We=L,Ze=je,$e=me,ze=Ve,et=Object.getOwnPropertyDescriptor;h.f=Xe?et:function(e,t){if(e=We(e),t=Ze(t),ze)try{return et(e,t)}catch(e){}if($e(e,t))return Qe(!qe.f.call(e,t),e[t])};var tt={},nt=k,rt=function(e){if(nt(e))return e;throw TypeError(String(e)+" is not an object")},ot=v,at=Ve,it=rt,st=je,ct=Object.defineProperty;tt.f=ot?ct:function(e,t,n){if(it(e),t=st(t),it(n),at)try{return ct(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return "value"in n&&(e[t]=n.value),e};var lt=tt,ut=T,dt=v?function(e,t,n){return lt.f(e,t,ut(1,n))}:function(e,t,n){return e[t]=n,e},ft={exports:{}},ht=x,pt=he,vt=Function.toString;ht(pt.inspectSource)||(pt.inspectSource=function(e){return vt.call(e)});var St,yt,Nt,mt=pt.inspectSource,gt=x,bt=mt,Tt=f.WeakMap,Et=gt(Tt)&&/native code/.test(bt(Tt)),wt=le.exports,_t=Te,Ct=wt("keys"),Ot=function(e){return Ct[e]||(Ct[e]=_t(e))},Rt={},It=Et,Mt=k,Lt=dt,xt=me,Ht=he,kt=Ot,Pt=Rt,At=f.WeakMap;if(It||Ht.state){var Dt=Ht.state||(Ht.state=new At),Ft=Dt.get,Ut=Dt.has,jt=Dt.set;St=function(e,t){if(Ut.call(Dt,e))throw new TypeError("Object already initialized");return t.facade=e,jt.call(Dt,e,t),t},yt=function(e){return Ft.call(Dt,e)||{}},Nt=function(e){return Ut.call(Dt,e)};}else {var Jt=kt("state");Pt[Jt]=!0,St=function(e,t){if(xt(e,Jt))throw new TypeError("Object already initialized");return t.facade=e,Lt(e,Jt,t),t},yt=function(e){return xt(e,Jt)?e[Jt]:{}},Nt=function(e){return xt(e,Jt)};}var Bt={set:St,get:yt,has:Nt,enforce:function(e){return Nt(e)?yt(e):St(e,{})},getterFor:function(e){return function(t){var n;if(!Mt(t)||(n=yt(t)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return n}}},Yt=v,Gt=me,Kt=Function.prototype,Vt=Yt&&Object.getOwnPropertyDescriptor,Xt=Gt(Kt,"name"),qt={EXISTS:Xt,PROPER:Xt&&"something"===function(){}.name,CONFIGURABLE:Xt&&(!Yt||Yt&&Vt(Kt,"name").configurable)},Qt=f,Wt=x,Zt=me,$t=dt,zt=de,en=mt,tn=qt.CONFIGURABLE,nn=Bt.get,rn=Bt.enforce,on=String(String).split("String");(ft.exports=function(e,t,n,r){var o,a=!!r&&!!r.unsafe,i=!!r&&!!r.enumerable,s=!!r&&!!r.noTargetGet,c=r&&void 0!==r.name?r.name:t;Wt(n)&&("Symbol("===String(c).slice(0,7)&&(c="["+String(c).replace(/^Symbol\(([^)]*)\)/,"$1")+"]"),(!Zt(n,"name")||tn&&n.name!==c)&&$t(n,"name",c),(o=rn(n)).source||(o.source=on.join("string"==typeof c?c:""))),e!==Qt?(a?!s&&e[t]&&(i=!0):delete e[t],i?e[t]=n:$t(e,t,n)):i?e[t]=n:zt(t,n);})(Function.prototype,"toString",(function(){return Wt(this)&&nn(this).source||en(this)}));var an={},sn=Math.ceil,cn=Math.floor,ln=function(e){var t=+e;return t!=t||0===t?0:(t>0?cn:sn)(t)},un=ln,dn=Math.max,fn=Math.min,hn=function(e,t){var n=un(e);return n<0?dn(n+t,0):fn(n,t)},pn=ln,vn=Math.min,Sn=function(e){return e>0?vn(pn(e),9007199254740991):0},yn=Sn,Nn=function(e){return yn(e.length)},mn=L,gn=hn,bn=Nn,Tn=function(e){return function(t,n,r){var o,a=mn(t),i=bn(a),s=gn(r,i);if(e&&n!=n){for(;i>s;)if((o=a[s++])!=o)return !0}else for(;i>s;s++)if((e||s in a)&&a[s]===n)return e||s||0;return !e&&-1}},En={includes:Tn(!0),indexOf:Tn(!1)},wn=me,_n=L,Cn=En.indexOf,On=Rt,Rn=function(e,t){var n,r=_n(e),o=0,a=[];for(n in r)!wn(On,n)&&wn(r,n)&&a.push(n);for(;t.length>o;)wn(r,n=t[o++])&&(~Cn(a,n)||a.push(n));return a},In=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],Mn=Rn,Ln=In.concat("length","prototype");an.f=Object.getOwnPropertyNames||function(e){return Mn(e,Ln)};var xn={};xn.f=Object.getOwnPropertySymbols;var Hn=an,kn=xn,Pn=rt,An=F("Reflect","ownKeys")||function(e){var t=Hn.f(Pn(e)),n=kn.f;return n?t.concat(n(e)):t},Dn=me,Fn=An,Un=h,jn=tt,Jn=function(e,t){for(var n=Fn(t),r=jn.f,o=Un.f,a=0;a<n.length;a++){var i=n[a];Dn(e,i)||r(e,i,o(t,i));}},Bn=p,Yn=x,Gn=/#|\.prototype\./,Kn=function(e,t){var n=Xn[Vn(e)];return n==Qn||n!=qn&&(Yn(t)?Bn(t):!!t)},Vn=Kn.normalize=function(e){return String(e).replace(Gn,".").toLowerCase()},Xn=Kn.data={},qn=Kn.NATIVE="N",Qn=Kn.POLYFILL="P",Wn=Kn,Zn=f,$n=h.f,zn=dt,er=ft.exports,tr=de,nr=Jn,rr=Wn,or=function(e,t){var n,r,o,a,i,s=e.target,c=e.global,l=e.stat;if(n=c?Zn:l?Zn[s]||tr(s,{}):(Zn[s]||{}).prototype)for(r in t){if(a=t[r],o=e.noTargetGet?(i=$n(n,r))&&i.value:n[r],!rr(c?r:s+(l?".":"#")+r,e.forced)&&void 0!==o){if(typeof a==typeof o)continue;nr(a,o);}(e.sham||o&&o.sham)&&zn(a,"sham",!0),er(n,r,a,e);}},ar={};ar[xe("toStringTag")]="z";var ir,sr="[object z]"===String(ar),cr=sr,lr=x,ur=w,dr=xe("toStringTag"),fr="Arguments"==ur(function(){return arguments}()),hr=cr?ur:function(e){var t,n,r;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=function(e,t){try{return e[t]}catch(e){}}(t=Object(e),dr))?n:fr?ur(t):"Object"==(r=ur(t))&&lr(t.callee)?"Arguments":r},pr=p,vr=x,Sr=hr,yr=mt,Nr=[],mr=F("Reflect","construct"),gr=/^\s*(?:class|function)\b/,br=gr.exec,Tr=!gr.exec((function(){})),Er=function(e){if(!vr(e))return !1;try{return mr(Object,Nr,e),!0}catch(e){return !1}},wr=!mr||pr((function(){var e;return Er(Er.call)||!Er(Object)||!Er((function(){e=!0;}))||e}))?function(e){if(!vr(e))return !1;switch(Sr(e)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return !1}return Tr||!!br.call(gr,yr(e))}:Er,_r=wr,Cr=te,Or=function(e){if(_r(e))return e;throw TypeError(Cr(e)+" is not a constructor")},Rr=Rn,Ir=In,Mr=Object.keys||function(e){return Rr(e,Ir)},Lr=tt,xr=rt,Hr=Mr,kr=v?Object.defineProperties:function(e,t){xr(e);for(var n,r=Hr(t),o=r.length,a=0;o>a;)Lr.f(e,n=r[a++],t[n]);return e},Pr=F("document","documentElement"),Ar=rt,Dr=kr,Fr=In,Ur=Rt,jr=Pr,Jr=Ge,Br=Ot("IE_PROTO"),Yr=function(){},Gr=function(e){return "<script>"+e+"<\/script>"},Kr=function(e){e.write(Gr("")),e.close();var t=e.parentWindow.Object;return e=null,t},Vr=function(){try{ir=new ActiveXObject("htmlfile");}catch(e){}var e,t;Vr="undefined"!=typeof document?document.domain&&ir?Kr(ir):((t=Jr("iframe")).style.display="none",jr.appendChild(t),t.src=String("javascript:"),(e=t.contentWindow.document).open(),e.write(Gr("document.F=Object")),e.close(),e.F):Kr(ir);for(var n=Fr.length;n--;)delete Vr.prototype[Fr[n]];return Vr()};Ur[Br]=!0;var Xr=Object.create||function(e,t){var n;return null!==e?(Yr.prototype=Ar(e),n=new Yr,Yr.prototype=null,n[Br]=e):n=Vr(),void 0===t?n:Dr(n,t)},qr=oe,Qr=k,Wr=[].slice,Zr={},$r=function(e,t,n){if(!(t in Zr)){for(var r=[],o=0;o<t;o++)r[o]="a["+o+"]";Zr[t]=Function("C,a","return new C("+r.join(",")+")");}return Zr[t](e,n)},zr=Function.bind||function(e){var t=qr(this),n=Wr.call(arguments,1),r=function(){var o=n.concat(Wr.call(arguments));return this instanceof r?$r(t,o.length,o):t.apply(e,o)};return Qr(t.prototype)&&(r.prototype=t.prototype),r},eo=or,to=Or,no=rt,ro=k,oo=Xr,ao=zr,io=p,so=F("Reflect","construct"),co=io((function(){function e(){}return !(so((function(){}),[],e)instanceof e)})),lo=!io((function(){so((function(){}));})),uo=co||lo;function fo(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ho(e,t){return (ho=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function po(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ho(e,t);}function vo(e){return (vo="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function So(e,t){if(t&&("object"===vo(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return fo(e)}function yo(e){return (yo=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function No(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}function mo(e,t,n){return function(e,t,n){if(t.set)t.set.call(e,n);else {if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n;}}(e,No(e,t,"set"),n),n}function go(e,t){return function(e,t){return t.get?t.get.call(e):t.value}(e,No(e,t,"get"))}eo({target:"Reflect",stat:!0,forced:uo,sham:uo},{construct:function(e,t){to(e),no(t);var n=arguments.length<3?e:to(arguments[2]);if(lo&&!co)return so(e,t,n);if(e==n){switch(t.length){case 0:return new e;case 1:return new e(t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3])}var r=[null];return r.push.apply(r,t),new(ao.apply(e,r))}var o=n.prototype,a=oo(ro(o)?o:Object.prototype),i=Function.apply.call(e,a,t);return ro(i)?i:a}});var bo=Xr,To=tt,Eo=xe("unscopables"),wo=Array.prototype;null==wo[Eo]&&To.f(wo,Eo,{configurable:!0,value:bo(null)});var _o,Co,Oo,Ro=function(e){wo[Eo][e]=!0;},Io={},Mo=!p((function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype})),Lo=me,xo=x,Ho=Se,ko=Mo,Po=Ot("IE_PROTO"),Ao=Object.prototype,Do=ko?Object.getPrototypeOf:function(e){var t=Ho(e);if(Lo(t,Po))return t[Po];var n=t.constructor;return xo(n)&&t instanceof n?n.prototype:t instanceof Object?Ao:null},Fo=p,Uo=x,jo=Do,Jo=ft.exports,Bo=xe("iterator"),Yo=!1;[].keys&&("next"in(Oo=[].keys())?(Co=jo(jo(Oo)))!==Object.prototype&&(_o=Co):Yo=!0),(null==_o||Fo((function(){var e={};return _o[Bo].call(e)!==e})))&&(_o={}),Uo(_o[Bo])||Jo(_o,Bo,(function(){return this}));var Go={IteratorPrototype:_o,BUGGY_SAFARI_ITERATORS:Yo},Ko=tt.f,Vo=me,Xo=xe("toStringTag"),qo=function(e,t,n){e&&!Vo(e=n?e:e.prototype,Xo)&&Ko(e,Xo,{configurable:!0,value:t});},Qo=Go.IteratorPrototype,Wo=Xr,Zo=T,$o=qo,zo=Io,ea=function(){return this},ta=function(e,t,n){var r=t+" Iterator";return e.prototype=Wo(Qo,{next:Zo(1,n)}),$o(e,r,!1),zo[r]=ea,e},na=x,ra=rt,oa=function(e){if("object"==typeof e||na(e))return e;throw TypeError("Can't set "+String(e)+" as a prototype")},aa=Object.setPrototypeOf||("__proto__"in{}?function(){var e,t=!1,n={};try{(e=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),t=n instanceof Array;}catch(e){}return function(n,r){return ra(n),oa(r),t?e.call(n,r):n.__proto__=r,n}}():void 0),ia=or,sa=qt,ca=x,la=ta,ua=Do,da=aa,fa=qo,ha=dt,pa=ft.exports,va=Io,Sa=sa.PROPER,ya=sa.CONFIGURABLE,Na=Go.IteratorPrototype,ma=Go.BUGGY_SAFARI_ITERATORS,ga=xe("iterator"),ba=function(){return this},Ta=function(e,t,n,r,o,a,i){la(n,t,r);var s,c,l,u=function(e){if(e===o&&v)return v;if(!ma&&e in h)return h[e];switch(e){case"keys":case"values":case"entries":return function(){return new n(this,e)}}return function(){return new n(this)}},d=t+" Iterator",f=!1,h=e.prototype,p=h[ga]||h["@@iterator"]||o&&h[o],v=!ma&&p||u(o),S="Array"==t&&h.entries||p;if(S&&(s=ua(S.call(new e)))!==Object.prototype&&s.next&&(ua(s)!==Na&&(da?da(s,Na):ca(s[ga])||pa(s,ga,ba)),fa(s,d,!0)),Sa&&"values"==o&&p&&"values"!==p.name&&(ya?ha(h,"name","values"):(f=!0,v=function(){return p.call(this)})),o)if(c={values:u("values"),keys:a?v:u("keys"),entries:u("entries")},i)for(l in c)(ma||f||!(l in h))&&pa(h,l,c[l]);else ia({target:t,proto:!0,forced:ma||f},c);return h[ga]!==v&&pa(h,ga,v,{name:o}),va[t]=v,c},Ea=L,wa=Ro,_a=Io,Ca=Bt,Oa=Ta,Ra=Ca.set,Ia=Ca.getterFor("Array Iterator"),Ma=Oa(Array,"Array",(function(e,t){Ra(this,{type:"Array Iterator",target:Ea(e),index:0,kind:t});}),(function(){var e=Ia(this),t=e.target,n=e.kind,r=e.index++;return !t||r>=t.length?(e.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:r,done:!1}:"values"==n?{value:t[r],done:!1}:{value:[r,t[r]],done:!1}}),"values");_a.Arguments=_a.Array,wa("keys"),wa("values"),wa("entries");var La=hr,xa=sr?{}.toString:function(){return "[object "+La(this)+"]"},Ha=sr,ka=ft.exports,Pa=xa;Ha||ka(Object.prototype,"toString",Pa,{unsafe:!0});var Aa=hr,Da=function(e){if("Symbol"===Aa(e))throw TypeError("Cannot convert a Symbol value to a string");return String(e)},Fa=ln,Ua=Da,ja=R,Ja=function(e){return function(t,n){var r,o,a=Ua(ja(t)),i=Fa(n),s=a.length;return i<0||i>=s?e?"":void 0:(r=a.charCodeAt(i))<55296||r>56319||i+1===s||(o=a.charCodeAt(i+1))<56320||o>57343?e?a.charAt(i):r:e?a.slice(i,i+2):o-56320+(r-55296<<10)+65536}},Ba={codeAt:Ja(!1),charAt:Ja(!0)},Ya=Ba.charAt,Ga=Da,Ka=Bt,Va=Ta,Xa=Ka.set,qa=Ka.getterFor("String Iterator");Va(String,"String",(function(e){Xa(this,{type:"String Iterator",string:Ga(e),index:0});}),(function(){var e,t=qa(this),n=t.string,r=t.index;return r>=n.length?{value:void 0,done:!0}:(e=Ya(n,r),t.index+=e.length,{value:e,done:!1})}));var Qa=ft.exports,Wa=function(e,t,n){for(var r in t)Qa(e,r,t[r],n);return e},Za={exports:{}},$a={},za=L,ei=an.f,ti={}.toString,ni="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];$a.f=function(e){return ni&&"[object Window]"==ti.call(e)?function(e){try{return ei(e)}catch(e){return ni.slice()}}(e):ei(za(e))};var ri=!p((function(){return Object.isExtensible(Object.preventExtensions({}))})),oi=or,ai=Rt,ii=k,si=me,ci=tt.f,li=an,ui=$a,di=ri,fi=!1,hi=Te("meta"),pi=0,vi=Object.isExtensible||function(){return !0},Si=function(e){ci(e,hi,{value:{objectID:"O"+pi++,weakData:{}}});},yi=Za.exports={enable:function(){yi.enable=function(){},fi=!0;var e=li.f,t=[].splice,n={};n[hi]=1,e(n).length&&(li.f=function(n){for(var r=e(n),o=0,a=r.length;o<a;o++)if(r[o]===hi){t.call(r,o,1);break}return r},oi({target:"Object",stat:!0,forced:!0},{getOwnPropertyNames:ui.f}));},fastKey:function(e,t){if(!ii(e))return "symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!si(e,hi)){if(!vi(e))return "F";if(!t)return "E";Si(e);}return e[hi].objectID},getWeakData:function(e,t){if(!si(e,hi)){if(!vi(e))return !0;if(!t)return !1;Si(e);}return e[hi].weakData},onFreeze:function(e){return di&&fi&&vi(e)&&!si(e,hi)&&Si(e),e}};ai[hi]=!0;var Ni=Io,mi=xe("iterator"),gi=Array.prototype,bi=function(e){return void 0!==e&&(Ni.Array===e||gi[mi]===e)},Ti=oe,Ei=function(e,t,n){if(Ti(e),void 0===t)return e;switch(n){case 0:return function(){return e.call(t)};case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)}}return function(){return e.apply(t,arguments)}},wi=hr,_i=ie,Ci=Io,Oi=xe("iterator"),Ri=function(e){if(null!=e)return _i(e,Oi)||_i(e,"@@iterator")||Ci[wi(e)]},Ii=oe,Mi=rt,Li=Ri,xi=function(e,t){var n=arguments.length<2?Li(e):t;if(Ii(n))return Mi(n.call(e));throw TypeError(String(e)+" is not iterable")},Hi=rt,ki=ie,Pi=function(e,t,n){var r,o;Hi(e);try{if(!(r=ki(e,"return"))){if("throw"===t)throw n;return n}r=r.call(e);}catch(e){o=!0,r=e;}if("throw"===t)throw n;if(o)throw r;return Hi(r),n},Ai=rt,Di=bi,Fi=Nn,Ui=Ei,ji=xi,Ji=Ri,Bi=Pi,Yi=function(e,t){this.stopped=e,this.result=t;},Gi=function(e,t,n){var r,o,a,i,s,c,l,u=n&&n.that,d=!(!n||!n.AS_ENTRIES),f=!(!n||!n.IS_ITERATOR),h=!(!n||!n.INTERRUPTED),p=Ui(t,u,1+d+h),v=function(e){return r&&Bi(r,"normal",e),new Yi(!0,e)},S=function(e){return d?(Ai(e),h?p(e[0],e[1],v):p(e[0],e[1])):h?p(e,v):p(e)};if(f)r=e;else {if(!(o=Ji(e)))throw TypeError(String(e)+" is not iterable");if(Di(o)){for(a=0,i=Fi(e);i>a;a++)if((s=S(e[a]))&&s instanceof Yi)return s;return new Yi(!1)}r=ji(e,o);}for(c=r.next;!(l=c.call(r)).done;){try{s=S(l.value);}catch(e){Bi(r,"throw",e);}if("object"==typeof s&&s&&s instanceof Yi)return s}return new Yi(!1)},Ki=function(e,t,n){if(e instanceof t)return e;throw TypeError("Incorrect "+(n?n+" ":"")+"invocation")},Vi=xe("iterator"),Xi=!1;try{var qi=0,Qi={next:function(){return {done:!!qi++}},return:function(){Xi=!0;}};Qi[Vi]=function(){return this},Array.from(Qi,(function(){throw 2}));}catch(e){}var Wi=function(e,t){if(!t&&!Xi)return !1;var n=!1;try{var r={};r[Vi]=function(){return {next:function(){return {done:n=!0}}}},e(r);}catch(e){}return n},Zi=x,$i=k,zi=aa,es=function(e,t,n){var r,o;return zi&&Zi(r=t.constructor)&&r!==n&&$i(o=r.prototype)&&o!==n.prototype&&zi(e,o),e},ts=or,ns=f,rs=Wn,os=ft.exports,as=Za.exports,is=Gi,ss=Ki,cs=x,ls=k,us=p,ds=Wi,fs=qo,hs=es,ps=function(e,t,n){var r=-1!==e.indexOf("Map"),o=-1!==e.indexOf("Weak"),a=r?"set":"add",i=ns[e],s=i&&i.prototype,c=i,l={},u=function(e){var t=s[e];os(s,e,"add"==e?function(e){return t.call(this,0===e?0:e),this}:"delete"==e?function(e){return !(o&&!ls(e))&&t.call(this,0===e?0:e)}:"get"==e?function(e){return o&&!ls(e)?void 0:t.call(this,0===e?0:e)}:"has"==e?function(e){return !(o&&!ls(e))&&t.call(this,0===e?0:e)}:function(e,n){return t.call(this,0===e?0:e,n),this});};if(rs(e,!cs(i)||!(o||s.forEach&&!us((function(){(new i).entries().next();})))))c=n.getConstructor(t,e,r,a),as.enable();else if(rs(e,!0)){var d=new c,f=d[a](o?{}:-0,1)!=d,h=us((function(){d.has(1);})),p=ds((function(e){new i(e);})),v=!o&&us((function(){for(var e=new i,t=5;t--;)e[a](t,t);return !e.has(-0)}));p||((c=t((function(t,n){ss(t,c,e);var o=hs(new i,t,c);return null!=n&&is(n,o[a],{that:o,AS_ENTRIES:r}),o}))).prototype=s,s.constructor=c),(h||v)&&(u("delete"),u("has"),r&&u("get")),(v||f)&&u(a),o&&s.clear&&delete s.clear;}return l[e]=c,ts({global:!0,forced:c!=i},l),fs(c,e),o||n.setStrong(c,e,r),c},vs=w,Ss=Array.isArray||function(e){return "Array"==vs(e)},ys=Ss,Ns=wr,ms=k,gs=xe("species"),bs=function(e){var t;return ys(e)&&(t=e.constructor,(Ns(t)&&(t===Array||ys(t.prototype))||ms(t)&&null===(t=t[gs]))&&(t=void 0)),void 0===t?Array:t},Ts=function(e,t){return new(bs(e))(0===t?0:t)},Es=Ei,ws=O,_s=Se,Cs=Nn,Os=Ts,Rs=[].push,Is=function(e){var t=1==e,n=2==e,r=3==e,o=4==e,a=6==e,i=7==e,s=5==e||a;return function(c,l,u,d){for(var f,h,p=_s(c),v=ws(p),S=Es(l,u,3),y=Cs(v),N=0,m=d||Os,g=t?m(c,y):n||i?m(c,0):void 0;y>N;N++)if((s||N in v)&&(h=S(f=v[N],N,p),e))if(t)g[N]=h;else if(h)switch(e){case 3:return !0;case 5:return f;case 6:return N;case 2:Rs.call(g,f);}else switch(e){case 4:return !1;case 7:Rs.call(g,f);}return a?-1:r||o?o:g}},Ms={forEach:Is(0),map:Is(1),filter:Is(2),some:Is(3),every:Is(4),find:Is(5),findIndex:Is(6),filterReject:Is(7)},Ls=Wa,xs=Za.exports.getWeakData,Hs=rt,ks=k,Ps=Ki,As=Gi,Ds=me,Fs=Bt.set,Us=Bt.getterFor,js=Ms.find,Js=Ms.findIndex,Bs=0,Ys=function(e){return e.frozen||(e.frozen=new Gs)},Gs=function(){this.entries=[];},Ks=function(e,t){return js(e.entries,(function(e){return e[0]===t}))};Gs.prototype={get:function(e){var t=Ks(this,e);if(t)return t[1]},has:function(e){return !!Ks(this,e)},set:function(e,t){var n=Ks(this,e);n?n[1]=t:this.entries.push([e,t]);},delete:function(e){var t=Js(this.entries,(function(t){return t[0]===e}));return ~t&&this.entries.splice(t,1),!!~t}};var Vs,Xs={getConstructor:function(e,t,n,r){var o=e((function(e,a){Ps(e,o,t),Fs(e,{type:t,id:Bs++,frozen:void 0}),null!=a&&As(a,e[r],{that:e,AS_ENTRIES:n});})),a=Us(t),i=function(e,t,n){var r=a(e),o=xs(Hs(t),!0);return !0===o?Ys(r).set(t,n):o[r.id]=n,e};return Ls(o.prototype,{delete:function(e){var t=a(this);if(!ks(e))return !1;var n=xs(e);return !0===n?Ys(t).delete(e):n&&Ds(n,t.id)&&delete n[t.id]},has:function(e){var t=a(this);if(!ks(e))return !1;var n=xs(e);return !0===n?Ys(t).has(e):n&&Ds(n,t.id)}}),Ls(o.prototype,n?{get:function(e){var t=a(this);if(ks(e)){var n=xs(e);return !0===n?Ys(t).get(e):n?n[t.id]:void 0}},set:function(e,t){return i(this,e,t)}}:{add:function(e){return i(this,e,!0)}}),o}},qs=f,Qs=Wa,Ws=Za.exports,Zs=ps,$s=Xs,zs=k,ec=Bt.enforce,tc=Et,nc=!qs.ActiveXObject&&"ActiveXObject"in qs,rc=Object.isExtensible,oc=function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}},ac=Zs("WeakMap",oc,$s);if(tc&&nc){Vs=$s.getConstructor(oc,"WeakMap",!0),Ws.enable();var ic=ac.prototype,sc=ic.delete,cc=ic.has,lc=ic.get,uc=ic.set;Qs(ic,{delete:function(e){if(zs(e)&&!rc(e)){var t=ec(this);return t.frozen||(t.frozen=new Vs),sc.call(this,e)||t.frozen.delete(e)}return sc.call(this,e)},has:function(e){if(zs(e)&&!rc(e)){var t=ec(this);return t.frozen||(t.frozen=new Vs),cc.call(this,e)||t.frozen.has(e)}return cc.call(this,e)},get:function(e){if(zs(e)&&!rc(e)){var t=ec(this);return t.frozen||(t.frozen=new Vs),cc.call(this,e)?lc.call(this,e):t.frozen.get(e)}return lc.call(this,e)},set:function(e,t){if(zs(e)&&!rc(e)){var n=ec(this);n.frozen||(n.frozen=new Vs),cc.call(this,e)?uc.call(this,e,t):n.frozen.set(e,t);}else uc.call(this,e,t);return this}});}var dc={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0},fc=Ge("span").classList,hc=fc&&fc.constructor&&fc.constructor.prototype,pc=hc===Object.prototype?void 0:hc,vc=f,Sc=dc,yc=pc,Nc=Ma,mc=dt,gc=xe,bc=gc("iterator"),Tc=gc("toStringTag"),Ec=Nc.values,wc=function(e,t){if(e){if(e[bc]!==Ec)try{mc(e,bc,Ec);}catch(t){e[bc]=Ec;}if(e[Tc]||mc(e,Tc,t),Sc[t])for(var n in Nc)if(e[n]!==Nc[n])try{mc(e,n,Nc[n]);}catch(t){e[n]=Nc[n];}}};for(var _c in Sc)wc(vc[_c]&&vc[_c].prototype,_c);function Cc(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}function Oc(e,t,n){return (Oc=Cc()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&ho(o,n.prototype),o}).apply(null,arguments)}function Rc(e){var t="function"==typeof Map?new Map:void 0;return (Rc=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r);}function r(){return Oc(e,arguments,yo(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),ho(r,e)})(e)}function Ic(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}wc(yc,"DOMTokenList");var Mc=function(t){po(r,Rc(Error));var n=Ic(r);function r(t){return e(this,r),n.call(this,t)}return r}();function Lc(e,t,n){return (Lc="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=yo(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}var xc=je,Hc=tt,kc=T,Pc=function(e,t,n){var r=xc(t);r in e?Hc.f(e,r,kc(0,n)):e[r]=n;},Ac=p,Dc=V,Fc=xe("species"),Uc=function(e){return Dc>=51||!Ac((function(){var t=[];return (t.constructor={})[Fc]=function(){return {foo:1}},1!==t[e](Boolean).foo}))},jc=or,Jc=p,Bc=Ss,Yc=k,Gc=Se,Kc=Nn,Vc=Pc,Xc=Ts,qc=Uc,Qc=V,Wc=xe("isConcatSpreadable"),Zc=Qc>=51||!Jc((function(){var e=[];return e[Wc]=!1,e.concat()[0]!==e})),$c=qc("concat"),zc=function(e){if(!Yc(e))return !1;var t=e[Wc];return void 0!==t?!!t:Bc(e)};jc({target:"Array",proto:!0,forced:!Zc||!$c},{concat:function(e){var t,n,r,o,a,i=Gc(this),s=Xc(i,0),c=0;for(t=-1,r=arguments.length;t<r;t++)if(zc(a=-1===t?i:arguments[t])){if(c+(o=Kc(a))>9007199254740991)throw TypeError("Maximum allowed index exceeded");for(n=0;n<o;n++,c++)n in a&&Vc(s,c,a[n]);}else {if(c>=9007199254740991)throw TypeError("Maximum allowed index exceeded");Vc(s,c++,a);}return s.length=c,s}});var el=rt,tl=function(){var e=el(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t},nl=qt.PROPER,rl=ft.exports,ol=rt,al=Da,il=p,sl=tl,cl=RegExp.prototype,ll=cl.toString,ul=il((function(){return "/a/b"!=ll.call({source:"a",flags:"b"})})),dl=nl&&"toString"!=ll.name;(ul||dl)&&rl(RegExp.prototype,"toString",(function(){var e=ol(this),t=al(e.source),n=e.flags;return "/"+t+"/"+al(void 0===n&&e instanceof RegExp&&!("flags"in cl)?sl.call(e):n)}),{unsafe:!0});var fl,hl,pl,vl,Sl=f.Promise,yl=F,Nl=tt,ml=v,gl=xe("species"),bl=function(e){var t=yl(e),n=Nl.f;ml&&t&&!t[gl]&&n(t,gl,{configurable:!0,get:function(){return this}});},Tl=rt,El=Or,wl=xe("species"),_l=function(e,t){var n,r=Tl(e).constructor;return void 0===r||null==(n=Tl(r)[wl])?t:El(n)},Cl=/(?:ipad|iphone|ipod).*applewebkit/i.test(U),Ol="process"==w(f.process),Rl=f,Il=x,Ml=p,Ll=Ei,xl=Pr,Hl=Ge,kl=Cl,Pl=Ol,Al=Rl.setImmediate,Dl=Rl.clearImmediate,Fl=Rl.process,Ul=Rl.MessageChannel,jl=Rl.Dispatch,Jl=0,Bl={};try{fl=Rl.location;}catch(e){}var Yl=function(e){if(Bl.hasOwnProperty(e)){var t=Bl[e];delete Bl[e],t();}},Gl=function(e){return function(){Yl(e);}},Kl=function(e){Yl(e.data);},Vl=function(e){Rl.postMessage(String(e),fl.protocol+"//"+fl.host);};Al&&Dl||(Al=function(e){for(var t=[],n=arguments.length,r=1;n>r;)t.push(arguments[r++]);return Bl[++Jl]=function(){(Il(e)?e:Function(e)).apply(void 0,t);},hl(Jl),Jl},Dl=function(e){delete Bl[e];},Pl?hl=function(e){Fl.nextTick(Gl(e));}:jl&&jl.now?hl=function(e){jl.now(Gl(e));}:Ul&&!kl?(vl=(pl=new Ul).port2,pl.port1.onmessage=Kl,hl=Ll(vl.postMessage,vl,1)):Rl.addEventListener&&Il(Rl.postMessage)&&!Rl.importScripts&&fl&&"file:"!==fl.protocol&&!Ml(Vl)?(hl=Vl,Rl.addEventListener("message",Kl,!1)):hl="onreadystatechange"in Hl("script")?function(e){xl.appendChild(Hl("script")).onreadystatechange=function(){xl.removeChild(this),Yl(e);};}:function(e){setTimeout(Gl(e),0);});var Xl,ql,Ql,Wl,Zl,$l,zl,eu,tu={set:Al,clear:Dl},nu=f,ru=/ipad|iphone|ipod/i.test(U)&&void 0!==nu.Pebble,ou=/web0s(?!.*chrome)/i.test(U),au=f,iu=h.f,su=tu.set,cu=Cl,lu=ru,uu=ou,du=Ol,fu=au.MutationObserver||au.WebKitMutationObserver,hu=au.document,pu=au.process,vu=au.Promise,Su=iu(au,"queueMicrotask"),yu=Su&&Su.value;yu||(Xl=function(){var e,t;for(du&&(e=pu.domain)&&e.exit();ql;){t=ql.fn,ql=ql.next;try{t();}catch(e){throw ql?Wl():Ql=void 0,e}}Ql=void 0,e&&e.enter();},cu||du||uu||!fu||!hu?!lu&&vu&&vu.resolve?((zl=vu.resolve(void 0)).constructor=vu,eu=zl.then,Wl=function(){eu.call(zl,Xl);}):Wl=du?function(){pu.nextTick(Xl);}:function(){su.call(au,Xl);}:(Zl=!0,$l=hu.createTextNode(""),new fu(Xl).observe($l,{characterData:!0}),Wl=function(){$l.data=Zl=!Zl;}));var Nu=yu||function(e){var t={fn:e,next:void 0};Ql&&(Ql.next=t),ql||(ql=t,Wl()),Ql=t;},mu={},gu=oe,bu=function(e){var t,n;this.promise=new e((function(e,r){if(void 0!==t||void 0!==n)throw TypeError("Bad Promise constructor");t=e,n=r;})),this.resolve=gu(t),this.reject=gu(n);};mu.f=function(e){return new bu(e)};var Tu,Eu,wu,_u,Cu=rt,Ou=k,Ru=mu,Iu=function(e,t){if(Cu(e),Ou(t)&&t.constructor===e)return t;var n=Ru.f(e);return (0, n.resolve)(t),n.promise},Mu=f,Lu="object"==typeof window,xu=or,Hu=f,ku=F,Pu=Sl,Au=ft.exports,Du=Wa,Fu=aa,Uu=qo,ju=bl,Ju=oe,Bu=x,Yu=k,Gu=Ki,Ku=mt,Vu=Gi,Xu=Wi,qu=_l,Qu=tu.set,Wu=Nu,Zu=Iu,$u=function(e,t){var n=Mu.console;n&&n.error&&(1===arguments.length?n.error(e):n.error(e,t));},zu=mu,ed=function(e){try{return {error:!1,value:e()}}catch(e){return {error:!0,value:e}}},td=Bt,nd=Wn,rd=Lu,od=Ol,ad=V,id$1=xe("species"),sd="Promise",cd=td.get,ld=td.set,ud=td.getterFor(sd),dd=Pu&&Pu.prototype,fd=Pu,hd=dd,pd=Hu.TypeError,vd=Hu.document,Sd=Hu.process,yd=zu.f,Nd=yd,md=!!(vd&&vd.createEvent&&Hu.dispatchEvent),gd=Bu(Hu.PromiseRejectionEvent),bd=!1,Td=nd(sd,(function(){var e=Ku(fd),t=e!==String(fd);if(!t&&66===ad)return !0;if(ad>=51&&/native code/.test(e))return !1;var n=new fd((function(e){e(1);})),r=function(e){e((function(){}),(function(){}));};return (n.constructor={})[id$1]=r,!(bd=n.then((function(){}))instanceof r)||!t&&rd&&!gd})),Ed=Td||!Xu((function(e){fd.all(e).catch((function(){}));})),wd=function(e){var t;return !(!Yu(e)||!Bu(t=e.then))&&t},_d=function(e,t){if(!e.notified){e.notified=!0;var n=e.reactions;Wu((function(){for(var r=e.value,o=1==e.state,a=0;n.length>a;){var i,s,c,l=n[a++],u=o?l.ok:l.fail,d=l.resolve,f=l.reject,h=l.domain;try{u?(o||(2===e.rejection&&Id(e),e.rejection=1),!0===u?i=r:(h&&h.enter(),i=u(r),h&&(h.exit(),c=!0)),i===l.promise?f(pd("Promise-chain cycle")):(s=wd(i))?s.call(i,d,f):d(i)):f(r);}catch(e){h&&!c&&h.exit(),f(e);}}e.reactions=[],e.notified=!1,t&&!e.rejection&&Od(e);}));}},Cd=function(e,t,n){var r,o;md?((r=vd.createEvent("Event")).promise=t,r.reason=n,r.initEvent(e,!1,!0),Hu.dispatchEvent(r)):r={promise:t,reason:n},!gd&&(o=Hu["on"+e])?o(r):"unhandledrejection"===e&&$u("Unhandled promise rejection",n);},Od=function(e){Qu.call(Hu,(function(){var t,n=e.facade,r=e.value;if(Rd(e)&&(t=ed((function(){od?Sd.emit("unhandledRejection",r,n):Cd("unhandledrejection",n,r);})),e.rejection=od||Rd(e)?2:1,t.error))throw t.value}));},Rd=function(e){return 1!==e.rejection&&!e.parent},Id=function(e){Qu.call(Hu,(function(){var t=e.facade;od?Sd.emit("rejectionHandled",t):Cd("rejectionhandled",t,e.value);}));},Md=function(e,t,n){return function(r){e(t,r,n);}},Ld=function(e,t,n){e.done||(e.done=!0,n&&(e=n),e.value=t,e.state=2,_d(e,!0));},xd=function(e,t,n){if(!e.done){e.done=!0,n&&(e=n);try{if(e.facade===t)throw pd("Promise can't be resolved itself");var r=wd(t);r?Wu((function(){var n={done:!1};try{r.call(t,Md(xd,n,e),Md(Ld,n,e));}catch(t){Ld(n,t,e);}})):(e.value=t,e.state=1,_d(e,!1));}catch(t){Ld({done:!1},t,e);}}};if(Td&&(hd=(fd=function(e){Gu(this,fd,sd),Ju(e),Tu.call(this);var t=cd(this);try{e(Md(xd,t),Md(Ld,t));}catch(e){Ld(t,e);}}).prototype,(Tu=function(e){ld(this,{type:sd,done:!1,notified:!1,parent:!1,reactions:[],rejection:!1,state:0,value:void 0});}).prototype=Du(hd,{then:function(e,t){var n=ud(this),r=yd(qu(this,fd));return r.ok=!Bu(e)||e,r.fail=Bu(t)&&t,r.domain=od?Sd.domain:void 0,n.parent=!0,n.reactions.push(r),0!=n.state&&_d(n,!1),r.promise},catch:function(e){return this.then(void 0,e)}}),Eu=function(){var e=new Tu,t=cd(e);this.promise=e,this.resolve=Md(xd,t),this.reject=Md(Ld,t);},zu.f=yd=function(e){return e===fd||e===wu?new Eu(e):Nd(e)},Bu(Pu)&&dd!==Object.prototype)){_u=dd.then,bd||(Au(dd,"then",(function(e,t){var n=this;return new fd((function(e,t){_u.call(n,e,t);})).then(e,t)}),{unsafe:!0}),Au(dd,"catch",hd.catch,{unsafe:!0}));try{delete dd.constructor;}catch(e){}Fu&&Fu(dd,hd);}xu({global:!0,wrap:!0,forced:Td},{Promise:fd}),Uu(fd,sd,!1),ju(sd),wu=ku(sd),xu({target:sd,stat:!0,forced:Td},{reject:function(e){var t=yd(this);return t.reject.call(void 0,e),t.promise}}),xu({target:sd,stat:!0,forced:Td},{resolve:function(e){return Zu(this,e)}}),xu({target:sd,stat:!0,forced:Ed},{all:function(e){var t=this,n=yd(t),r=n.resolve,o=n.reject,a=ed((function(){var n=Ju(t.resolve),a=[],i=0,s=1;Vu(e,(function(e){var c=i++,l=!1;a.push(void 0),s++,n.call(t,e).then((function(e){l||(l=!0,a[c]=e,--s||r(a));}),o);})),--s||r(a);}));return a.error&&o(a.value),n.promise},race:function(e){var t=this,n=yd(t),r=n.reject,o=ed((function(){var o=Ju(t.resolve);Vu(e,(function(e){o.call(t,e).then(n.resolve,r);}));}));return o.error&&r(o.value),n.promise}});var Hd={},kd=p,Pd=f.RegExp;Hd.UNSUPPORTED_Y=kd((function(){var e=Pd("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),Hd.BROKEN_CARET=kd((function(){var e=Pd("^r","gy");return e.lastIndex=2,null!=e.exec("str")}));var Ad=p,Dd=f.RegExp,Fd=Ad((function(){var e=Dd(".","s");return !(e.dotAll&&e.exec("\n")&&"s"===e.flags)})),Ud=p,jd=f.RegExp,Jd=Ud((function(){var e=jd("(?<a>b)","g");return "b"!==e.exec("b").groups.a||"bc"!=="b".replace(e,"$<a>c")})),Bd=Da,Yd=tl,Gd=Hd,Kd=le.exports,Vd=Xr,Xd=Bt.get,qd=Fd,Qd=Jd,Wd=RegExp.prototype.exec,Zd=Kd("native-string-replace",String.prototype.replace),$d=Wd,zd=function(){var e=/a/,t=/b*/g;return Wd.call(e,"a"),Wd.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),ef=Gd.UNSUPPORTED_Y||Gd.BROKEN_CARET,tf=void 0!==/()??/.exec("")[1];(zd||tf||ef||qd||Qd)&&($d=function(e){var t,n,r,o,a,i,s,c=this,l=Xd(c),u=Bd(e),d=l.raw;if(d)return d.lastIndex=c.lastIndex,t=$d.call(d,u),c.lastIndex=d.lastIndex,t;var f=l.groups,h=ef&&c.sticky,p=Yd.call(c),v=c.source,S=0,y=u;if(h&&(-1===(p=p.replace("y","")).indexOf("g")&&(p+="g"),y=u.slice(c.lastIndex),c.lastIndex>0&&(!c.multiline||c.multiline&&"\n"!==u.charAt(c.lastIndex-1))&&(v="(?: "+v+")",y=" "+y,S++),n=new RegExp("^(?:"+v+")",p)),tf&&(n=new RegExp("^"+v+"$(?!\\s)",p)),zd&&(r=c.lastIndex),o=Wd.call(h?n:c,y),h?o?(o.input=o.input.slice(S),o[0]=o[0].slice(S),o.index=c.lastIndex,c.lastIndex+=o[0].length):c.lastIndex=0:zd&&o&&(c.lastIndex=c.global?o.index+o[0].length:r),tf&&o&&o.length>1&&Zd.call(o[0],n,(function(){for(a=1;a<arguments.length-2;a++)void 0===arguments[a]&&(o[a]=void 0);})),o&&f)for(o.groups=i=Vd(null),a=0;a<f.length;a++)i[(s=f[a])[0]]=o[s[1]];return o});var nf=$d;or({target:"RegExp",proto:!0,forced:/./.exec!==nf},{exec:nf});var rf=ft.exports,of=nf,af=p,sf=xe,cf=dt,lf=sf("species"),uf=RegExp.prototype,df=function(e,t,n,r){var o=sf(e),a=!af((function(){var t={};return t[o]=function(){return 7},7!=""[e](t)})),i=a&&!af((function(){var t=!1,n=/a/;return "split"===e&&((n={}).constructor={},n.constructor[lf]=function(){return n},n.flags="",n[o]=/./[o]),n.exec=function(){return t=!0,null},n[o](""),!t}));if(!a||!i||n){var s=/./[o],c=t(o,""[e],(function(e,t,n,r,o){var i=t.exec;return i===of||i===uf.exec?a&&!o?{done:!0,value:s.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}));rf(String.prototype,e,c[0]),rf(uf,o,c[1]);}r&&cf(uf[o],"sham",!0);},ff=Ba.charAt,hf=function(e,t,n){return t+(n?ff(e,t).length:1)},pf=Se,vf=Math.floor,Sf="".replace,yf=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,Nf=/\$([$&'`]|\d{1,2})/g,mf=rt,gf=x,bf=w,Tf=nf,Ef=function(e,t){var n=e.exec;if(gf(n)){var r=n.call(e,t);return null!==r&&mf(r),r}if("RegExp"===bf(e))return Tf.call(e,t);throw TypeError("RegExp#exec called on incompatible receiver")},wf=df,_f=p,Cf=rt,Of=x,Rf=ln,If=Sn,Mf=Da,Lf=R,xf=hf,Hf=ie,kf=function(e,t,n,r,o,a){var i=n+e.length,s=r.length,c=Nf;return void 0!==o&&(o=pf(o),c=yf),Sf.call(a,c,(function(a,c){var l;switch(c.charAt(0)){case"$":return "$";case"&":return e;case"`":return t.slice(0,n);case"'":return t.slice(i);case"<":l=o[c.slice(1,-1)];break;default:var u=+c;if(0===u)return a;if(u>s){var d=vf(u/10);return 0===d?a:d<=s?void 0===r[d-1]?c.charAt(1):r[d-1]+c.charAt(1):a}l=r[u-1];}return void 0===l?"":l}))},Pf=Ef,Af=xe("replace"),Df=Math.max,Ff=Math.min,Uf="$0"==="a".replace(/./,"$0"),jf=!!/./[Af]&&""===/./[Af]("a","$0");wf("replace",(function(e,t,n){var r=jf?"$":"$0";return [function(e,n){var r=Lf(this),o=null==e?void 0:Hf(e,Af);return o?o.call(e,r,n):t.call(Mf(r),e,n)},function(e,o){var a=Cf(this),i=Mf(e);if("string"==typeof o&&-1===o.indexOf(r)&&-1===o.indexOf("$<")){var s=n(t,a,i,o);if(s.done)return s.value}var c=Of(o);c||(o=Mf(o));var l=a.global;if(l){var u=a.unicode;a.lastIndex=0;}for(var d=[];;){var f=Pf(a,i);if(null===f)break;if(d.push(f),!l)break;""===Mf(f[0])&&(a.lastIndex=xf(i,If(a.lastIndex),u));}for(var h,p="",v=0,S=0;S<d.length;S++){f=d[S];for(var y=Mf(f[0]),N=Df(Ff(Rf(f.index),i.length),0),m=[],g=1;g<f.length;g++)m.push(void 0===(h=f[g])?h:String(h));var b=f.groups;if(c){var T=[y].concat(m,N,i);void 0!==b&&T.push(b);var E=Mf(o.apply(void 0,T));}else E=kf(y,i,N,m,b,o);N>=v&&(p+=i.slice(v,N)+E,v=N+y.length);}return p+i.slice(v)}]}),!!_f((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}))||!Uf||jf);var Jf=or,Bf=Sl,Yf=p,Gf=F,Kf=x,Vf=_l,Xf=Iu,qf=ft.exports;if(Jf({target:"Promise",proto:!0,real:!0,forced:!!Bf&&Yf((function(){Bf.prototype.finally.call({then:function(){}},(function(){}));}))},{finally:function(e){var t=Vf(this,Gf("Promise")),n=Kf(e);return this.then(n?function(n){return Xf(t,e()).then((function(){return n}))}:e,n?function(n){return Xf(t,e()).then((function(){throw n}))}:e)}}),Kf(Bf)){var Qf=Gf("Promise").prototype.finally;Bf.prototype.finally!==Qf&&qf(Bf.prototype,"finally",Qf,{unsafe:!0});}var Wf=Se,Zf=Mr;or({target:"Object",stat:!0,forced:p((function(){Zf(1);}))},{keys:function(e){return Zf(Wf(e))}});var $f={},zf=xe;$f.f=zf;var eh=f,th=me,nh=$f,rh=tt.f,oh=function(e){var t=eh.Symbol||(eh.Symbol={});th(t,e)||rh(t,e,{value:nh.f(e)});},ah=or,ih=f,sh=F,ch=v,lh=Q,uh=p,dh=me,fh=Ss,hh=x,ph=k,vh=ee,Sh=rt,yh=Se,Nh=L,mh=je,gh=Da,bh=T,Th=Xr,Eh=Mr,wh=an,_h=$a,Ch=xn,Oh=h,Rh=tt,Ih=S,Mh=ft.exports,Lh=le.exports,xh=Rt,Hh=Te,kh=xe,Ph=$f,Ah=oh,Dh=qo,Fh=Bt,Uh=Ms.forEach,jh=Ot("hidden"),Jh=kh("toPrimitive"),Bh=Fh.set,Yh=Fh.getterFor("Symbol"),Gh=Object.prototype,Kh=ih.Symbol,Vh=sh("JSON","stringify"),Xh=Oh.f,qh=Rh.f,Qh=_h.f,Wh=Ih.f,Zh=Lh("symbols"),$h=Lh("op-symbols"),zh=Lh("string-to-symbol-registry"),ep=Lh("symbol-to-string-registry"),tp=Lh("wks"),np=ih.QObject,rp=!np||!np.prototype||!np.prototype.findChild,op=ch&&uh((function(){return 7!=Th(qh({},"a",{get:function(){return qh(this,"a",{value:7}).a}})).a}))?function(e,t,n){var r=Xh(Gh,t);r&&delete Gh[t],qh(e,t,n),r&&e!==Gh&&qh(Gh,t,r);}:qh,ap=function(e,t){var n=Zh[e]=Th(Kh.prototype);return Bh(n,{type:"Symbol",tag:e,description:t}),ch||(n.description=t),n},ip=function(e,t,n){e===Gh&&ip($h,t,n),Sh(e);var r=mh(t);return Sh(n),dh(Zh,r)?(n.enumerable?(dh(e,jh)&&e[jh][r]&&(e[jh][r]=!1),n=Th(n,{enumerable:bh(0,!1)})):(dh(e,jh)||qh(e,jh,bh(1,{})),e[jh][r]=!0),op(e,r,n)):qh(e,r,n)},sp=function(e,t){Sh(e);var n=Nh(t),r=Eh(n).concat(dp(n));return Uh(r,(function(t){ch&&!cp.call(n,t)||ip(e,t,n[t]);})),e},cp=function(e){var t=mh(e),n=Wh.call(this,t);return !(this===Gh&&dh(Zh,t)&&!dh($h,t))&&(!(n||!dh(this,t)||!dh(Zh,t)||dh(this,jh)&&this[jh][t])||n)},lp=function(e,t){var n=Nh(e),r=mh(t);if(n!==Gh||!dh(Zh,r)||dh($h,r)){var o=Xh(n,r);return !o||!dh(Zh,r)||dh(n,jh)&&n[jh][r]||(o.enumerable=!0),o}},up=function(e){var t=Qh(Nh(e)),n=[];return Uh(t,(function(e){dh(Zh,e)||dh(xh,e)||n.push(e);})),n},dp=function(e){var t=e===Gh,n=Qh(t?$h:Nh(e)),r=[];return Uh(n,(function(e){!dh(Zh,e)||t&&!dh(Gh,e)||r.push(Zh[e]);})),r};(lh||(Mh((Kh=function(){if(this instanceof Kh)throw TypeError("Symbol is not a constructor");var e=arguments.length&&void 0!==arguments[0]?gh(arguments[0]):void 0,t=Hh(e),n=function(e){this===Gh&&n.call($h,e),dh(this,jh)&&dh(this[jh],t)&&(this[jh][t]=!1),op(this,t,bh(1,e));};return ch&&rp&&op(Gh,t,{configurable:!0,set:n}),ap(t,e)}).prototype,"toString",(function(){return Yh(this).tag})),Mh(Kh,"withoutSetter",(function(e){return ap(Hh(e),e)})),Ih.f=cp,Rh.f=ip,Oh.f=lp,wh.f=_h.f=up,Ch.f=dp,Ph.f=function(e){return ap(kh(e),e)},ch&&(qh(Kh.prototype,"description",{configurable:!0,get:function(){return Yh(this).description}}),Mh(Gh,"propertyIsEnumerable",cp,{unsafe:!0}))),ah({global:!0,wrap:!0,forced:!lh,sham:!lh},{Symbol:Kh}),Uh(Eh(tp),(function(e){Ah(e);})),ah({target:"Symbol",stat:!0,forced:!lh},{for:function(e){var t=gh(e);if(dh(zh,t))return zh[t];var n=Kh(t);return zh[t]=n,ep[n]=t,n},keyFor:function(e){if(!vh(e))throw TypeError(e+" is not a symbol");if(dh(ep,e))return ep[e]},useSetter:function(){rp=!0;},useSimple:function(){rp=!1;}}),ah({target:"Object",stat:!0,forced:!lh,sham:!ch},{create:function(e,t){return void 0===t?Th(e):sp(Th(e),t)},defineProperty:ip,defineProperties:sp,getOwnPropertyDescriptor:lp}),ah({target:"Object",stat:!0,forced:!lh},{getOwnPropertyNames:up,getOwnPropertySymbols:dp}),ah({target:"Object",stat:!0,forced:uh((function(){Ch.f(1);}))},{getOwnPropertySymbols:function(e){return Ch.f(yh(e))}}),Vh)&&ah({target:"JSON",stat:!0,forced:!lh||uh((function(){var e=Kh();return "[null]"!=Vh([e])||"{}"!=Vh({a:e})||"{}"!=Vh(Object(e))}))},{stringify:function(e,t,n){for(var r,o=[e],a=1;arguments.length>a;)o.push(arguments[a++]);if(r=t,(ph(t)||void 0!==e)&&!vh(e))return fh(t)||(t=function(e,t){if(hh(r)&&(t=r.call(this,e,t)),!vh(t))return t}),o[1]=t,Vh.apply(null,o)}});if(!Kh.prototype[Jh]){var fp=Kh.prototype.valueOf;Mh(Kh.prototype,Jh,(function(){return fp.apply(this,arguments)}));}Dh(Kh,"Symbol"),xh[jh]=!0;var hp=Ms.filter;or({target:"Array",proto:!0,forced:!Uc("filter")},{filter:function(e){return hp(this,e,arguments.length>1?arguments[1]:void 0)}});var pp=or,vp=p,Sp=L,yp=h.f,Np=v,mp=vp((function(){yp(1);}));pp({target:"Object",stat:!0,forced:!Np||mp,sham:!Np},{getOwnPropertyDescriptor:function(e,t){return yp(Sp(e),t)}});var gp=p,bp=function(e,t){var n=[][e];return !!n&&gp((function(){n.call(null,t||function(){throw 1},1);}))},Tp=Ms.forEach,Ep=f,wp=dc,_p=pc,Cp=bp("forEach")?[].forEach:function(e){return Tp(this,e,arguments.length>1?arguments[1]:void 0)},Op=dt,Rp=function(e){if(e&&e.forEach!==Cp)try{Op(e,"forEach",Cp);}catch(t){e.forEach=Cp;}};for(var Ip in wp)wp[Ip]&&Rp(Ep[Ip]&&Ep[Ip].prototype);Rp(_p);var Mp=An,Lp=L,xp=h,Hp=Pc;function kp(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r);}return n}function Pp(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?kp(Object(n),!0).forEach((function(t){r(e,t,n[t]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):kp(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t));}));}return e}function Ap(e,t,n){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,n);}or({target:"Object",stat:!0,sham:!v},{getOwnPropertyDescriptors:function(e){for(var t,n,r=Lp(e),o=xp.f,a=Mp(r),i={},s=0;a.length>s;)void 0!==(n=o(r,t=a[s++]))&&Hp(i,t,n);return i}});var Dp=new WeakMap,Fp=function(){function t(){e(this,t),Ap(this,Dp,{writable:!0,value:[]});}return n(t,[{key:"bindListener",value:function(e,t,n,r){mo(this,Dp,go(this,Dp)||[]);var o=function(e,o,a){return n.call(t,e,o,a,r)};return go(this,Dp)[e]?go(this,Dp)[e].push(o)-1:(go(this,Dp)[e]=[o],0)}},{key:"addListener",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};mo(this,Dp,go(this,Dp)||[]);var r=function(e,r){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return t(Pp(Pp({context:e,eventName:r},o),n))};return go(this,Dp)[e]?go(this,Dp)[e].push(r)-1:(go(this,Dp)[e]=[r],0)}},{key:"removeListener",value:function(e,t){go(this,Dp)[e]&&go(this,Dp)[e][t]?delete go(this,Dp)[e][t]:console.log("trying to remove non-existent event handler, event = "+e+" handle = "+t);}},{key:"destructor",value:function(){mo(this,Dp,null);}},{key:"fireEvent",value:function(e,n){if(go(this,Dp))for(var r in go(this,Dp)[e])if(go(this,Dp)[e].hasOwnProperty(r)&&go(this,Dp)[e][r](this,e,arguments[1])===t.STOP_PROPAGATION)break}}]),t}();r(Fp,"STOP_PROPAGATION","STOP_PROPAGATION");var jp=function e(t,n,r){function o(i,s){if(!n[i]){if(!t[i]){if(!s&&u)return u(i);if(a)return a(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[i]={exports:{}};t[i][0].call(l.exports,(function(e){var n=t[i][1][e];return o(n||e)}),l,l.exports,e,t,n,r);}return n[i].exports}for(var a=u,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(e,t,n){(function(e){var n,r,o=e.MutationObserver||e.WebKitMutationObserver;if(o){var a=0,i=new o(u),s=e.document.createTextNode("");i.observe(s,{characterData:!0}),n=function(){s.data=a=++a%2;};}else if(e.setImmediate||void 0===e.MessageChannel)n="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script");t.onreadystatechange=function(){u(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null;},e.document.documentElement.appendChild(t);}:function(){setTimeout(u,0);};else {var c=new e.MessageChannel;c.port1.onmessage=u,n=function(){c.port2.postMessage(0);};}var l=[];function u(){var e,t;r=!0;for(var n=l.length;n;){for(t=l,l=[],e=-1;++e<n;)t[e]();n=l.length;}r=!1;}t.exports=function(e){1!==l.push(e)||r||n();};}).call(this,void 0!==l?l:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}],2:[function(e,t,n){var r=e(1);function o(){}var a={},i=["REJECTED"],s=["FULFILLED"],c=["PENDING"];function l(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=c,this.queue=[],this.outcome=void 0,e!==o&&h(this,e);}function u(e,t,n){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof n&&(this.onRejected=n,this.callRejected=this.otherCallRejected);}function d(e,t,n){r((function(){var r;try{r=t(n);}catch(t){return a.reject(e,t)}r===e?a.reject(e,new TypeError("Cannot resolve promise with itself")):a.resolve(e,r);}));}function f(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments);}}function h(e,t){var n=!1;function r(t){n||(n=!0,a.reject(e,t));}function o(t){n||(n=!0,a.resolve(e,t));}var i=p((function(){t(o,r);}));"error"===i.status&&r(i.value);}function p(e,t){var n={};try{n.value=e(t),n.status="success";}catch(e){n.status="error",n.value=e;}return n}t.exports=l,l.prototype.catch=function(e){return this.then(null,e)},l.prototype.then=function(e,t){if("function"!=typeof e&&this.state===s||"function"!=typeof t&&this.state===i)return this;var n=new this.constructor(o);return this.state!==c?d(n,this.state===s?e:t,this.outcome):this.queue.push(new u(n,e,t)),n},u.prototype.callFulfilled=function(e){a.resolve(this.promise,e);},u.prototype.otherCallFulfilled=function(e){d(this.promise,this.onFulfilled,e);},u.prototype.callRejected=function(e){a.reject(this.promise,e);},u.prototype.otherCallRejected=function(e){d(this.promise,this.onRejected,e);},a.resolve=function(e,t){var n=p(f,t);if("error"===n.status)return a.reject(e,n.value);var r=n.value;if(r)h(e,r);else {e.state=s,e.outcome=t;for(var o=-1,i=e.queue.length;++o<i;)e.queue[o].callFulfilled(t);}return e},a.reject=function(e,t){e.state=i,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e},l.resolve=function(e){return e instanceof this?e:a.resolve(new this(o),e)},l.reject=function(e){var t=new this(o);return a.reject(t,e)},l.all=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,r=!1;if(!n)return this.resolve([]);for(var i=new Array(n),s=0,c=-1,l=new this(o);++c<n;)u(e[c],c);return l;function u(e,o){t.resolve(e).then((function(e){i[o]=e,++s!==n||r||(r=!0,a.resolve(l,i));}),(function(e){r||(r=!0,a.reject(l,e));}));}},l.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,r=!1;if(!n)return this.resolve([]);for(var i,s=-1,c=new this(o);++s<n;)i=e[s],t.resolve(i).then((function(e){r||(r=!0,a.resolve(c,e));}),(function(e){r||(r=!0,a.reject(c,e));}));return c};},{1:1}],3:[function(e,t,n){(function(t){"function"!=typeof t.Promise&&(t.Promise=e(2));}).call(this,void 0!==l?l:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{2:2}],4:[function(e,t,n){var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(e){return}}();function a(e,t){e=e||[],t=t||{};try{return new Blob(e,t)}catch(o){if("TypeError"!==o.name)throw o;for(var n=new("undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder),r=0;r<e.length;r+=1)n.append(e[r]);return n.getBlob(t.type)}}"undefined"==typeof Promise&&e(3);var i=Promise;function s(e,t){t&&e.then((function(e){t(null,e);}),(function(e){t(e);}));}function c(e,t,n){"function"==typeof t&&e.then(t),"function"==typeof n&&e.catch(n);}function l(e){return "string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e)),e}function u(){if(arguments.length&&"function"==typeof arguments[arguments.length-1])return arguments[arguments.length-1]}var d=void 0,f={},h=Object.prototype.toString;function p(e){return "boolean"==typeof d?i.resolve(d):function(e){return new i((function(t){var n=e.transaction("local-forage-detect-blob-support","readwrite"),r=a([""]);n.objectStore("local-forage-detect-blob-support").put(r,"key"),n.onabort=function(e){e.preventDefault(),e.stopPropagation(),t(!1);},n.oncomplete=function(){var e=navigator.userAgent.match(/Chrome\/(\d+)/),n=navigator.userAgent.match(/Edge\//);t(n||!e||parseInt(e[1],10)>=43);};})).catch((function(){return !1}))}(e).then((function(e){return d=e}))}function v(e){var t=f[e.name],n={};n.promise=new i((function(e,t){n.resolve=e,n.reject=t;})),t.deferredOperations.push(n),t.dbReady?t.dbReady=t.dbReady.then((function(){return n.promise})):t.dbReady=n.promise;}function S(e){var t=f[e.name].deferredOperations.pop();if(t)return t.resolve(),t.promise}function y(e,t){var n=f[e.name].deferredOperations.pop();if(n)return n.reject(t),n.promise}function N(e,t){return new i((function(n,r){if(f[e.name]=f[e.name]||{forages:[],db:null,dbReady:null,deferredOperations:[]},e.db){if(!t)return n(e.db);v(e),e.db.close();}var a=[e.name];t&&a.push(e.version);var i=o.open.apply(o,a);t&&(i.onupgradeneeded=function(t){var n=i.result;try{n.createObjectStore(e.storeName),t.oldVersion<=1&&n.createObjectStore("local-forage-detect-blob-support");}catch(n){if("ConstraintError"!==n.name)throw n;console.warn('The database "'+e.name+'" has been upgraded from version '+t.oldVersion+" to version "+t.newVersion+', but the storage "'+e.storeName+'" already exists.');}}),i.onerror=function(e){e.preventDefault(),r(i.error);},i.onsuccess=function(){var t=i.result;t.onversionchange=function(e){e.target.close();},n(t),S(e);};}))}function m(e){return N(e,!1)}function g(e){return N(e,!0)}function b(e,t){if(!e.db)return !0;var n=!e.db.objectStoreNames.contains(e.storeName),r=e.version<e.db.version,o=e.version>e.db.version;if(r&&(e.version!==t&&console.warn('The database "'+e.name+"\" can't be downgraded from version "+e.db.version+" to version "+e.version+"."),e.version=e.db.version),o||n){if(n){var a=e.db.version+1;a>e.version&&(e.version=a);}return !0}return !1}function T(e){return a([function(e){for(var t=e.length,n=new ArrayBuffer(t),r=new Uint8Array(n),o=0;o<t;o++)r[o]=e.charCodeAt(o);return n}(atob(e.data))],{type:e.type})}function E(e){return e&&e.__local_forage_encoded_blob}function w(e){var t=this,n=t._initReady().then((function(){var e=f[t._dbInfo.name];if(e&&e.dbReady)return e.dbReady}));return c(n,e,e),n}function _(e,t,n,r){void 0===r&&(r=1);try{var o=e.db.transaction(e.storeName,t);n(null,o);}catch(o){if(r>0&&(!e.db||"InvalidStateError"===o.name||"NotFoundError"===o.name))return i.resolve().then((function(){if(!e.db||"NotFoundError"===o.name&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),g(e)})).then((function(){return function(e){v(e);for(var t=f[e.name],n=t.forages,r=0;r<n.length;r++){var o=n[r];o._dbInfo.db&&(o._dbInfo.db.close(),o._dbInfo.db=null);}return e.db=null,m(e).then((function(t){return e.db=t,b(e)?g(e):t})).then((function(r){e.db=t.db=r;for(var o=0;o<n.length;o++)n[o]._dbInfo.db=r;})).catch((function(t){throw y(e,t),t}))}(e).then((function(){_(e,t,n,r-1);}))})).catch(n);n(o);}}var C={_driver:"asyncStorage",_initStorage:function(e){var t=this,n={db:null};if(e)for(var r in e)n[r]=e[r];var o=f[n.name];o||(o={forages:[],db:null,dbReady:null,deferredOperations:[]},f[n.name]=o),o.forages.push(t),t._initReady||(t._initReady=t.ready,t.ready=w);var a=[];function s(){return i.resolve()}for(var c=0;c<o.forages.length;c++){var l=o.forages[c];l!==t&&a.push(l._initReady().catch(s));}var u=o.forages.slice(0);return i.all(a).then((function(){return n.db=o.db,m(n)})).then((function(e){return n.db=e,b(n,t._defaultConfig.version)?g(n):e})).then((function(e){n.db=o.db=e,t._dbInfo=n;for(var r=0;r<u.length;r++){var a=u[r];a!==t&&(a._dbInfo.db=n.db,a._dbInfo.version=n.version);}}))},_support:function(){try{if(!o||!o.open)return !1;var e="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),t="function"==typeof fetch&&-1!==fetch.toString().indexOf("[native code");return (!e||t)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(e){return !1}}(),iterate:function(e,t){var n=this,r=new i((function(t,r){n.ready().then((function(){_(n._dbInfo,"readonly",(function(o,a){if(o)return r(o);try{var i=a.objectStore(n._dbInfo.storeName).openCursor(),s=1;i.onsuccess=function(){var n=i.result;if(n){var r=n.value;E(r)&&(r=T(r));var o=e(r,n.key,s++);void 0!==o?t(o):n.continue();}else t();},i.onerror=function(){r(i.error);};}catch(e){r(e);}}));})).catch(r);}));return s(r,t),r},getItem:function(e,t){var n=this;e=l(e);var r=new i((function(t,r){n.ready().then((function(){_(n._dbInfo,"readonly",(function(o,a){if(o)return r(o);try{var i=a.objectStore(n._dbInfo.storeName).get(e);i.onsuccess=function(){var e=i.result;void 0===e&&(e=null),E(e)&&(e=T(e)),t(e);},i.onerror=function(){r(i.error);};}catch(e){r(e);}}));})).catch(r);}));return s(r,t),r},setItem:function(e,t,n){var r=this;e=l(e);var o=new i((function(n,o){var a;r.ready().then((function(){return a=r._dbInfo,"[object Blob]"===h.call(t)?p(a.db).then((function(e){return e?t:(n=t,new i((function(e,t){var r=new FileReader;r.onerror=t,r.onloadend=function(t){var r=btoa(t.target.result||"");e({__local_forage_encoded_blob:!0,data:r,type:n.type});},r.readAsBinaryString(n);})));var n;})):t})).then((function(t){_(r._dbInfo,"readwrite",(function(a,i){if(a)return o(a);try{var s=i.objectStore(r._dbInfo.storeName);null===t&&(t=void 0);var c=s.put(t,e);i.oncomplete=function(){void 0===t&&(t=null),n(t);},i.onabort=i.onerror=function(){var e=c.error?c.error:c.transaction.error;o(e);};}catch(e){o(e);}}));})).catch(o);}));return s(o,n),o},removeItem:function(e,t){var n=this;e=l(e);var r=new i((function(t,r){n.ready().then((function(){_(n._dbInfo,"readwrite",(function(o,a){if(o)return r(o);try{var i=a.objectStore(n._dbInfo.storeName).delete(e);a.oncomplete=function(){t();},a.onerror=function(){r(i.error);},a.onabort=function(){var e=i.error?i.error:i.transaction.error;r(e);};}catch(e){r(e);}}));})).catch(r);}));return s(r,t),r},clear:function(e){var t=this,n=new i((function(e,n){t.ready().then((function(){_(t._dbInfo,"readwrite",(function(r,o){if(r)return n(r);try{var a=o.objectStore(t._dbInfo.storeName).clear();o.oncomplete=function(){e();},o.onabort=o.onerror=function(){var e=a.error?a.error:a.transaction.error;n(e);};}catch(e){n(e);}}));})).catch(n);}));return s(n,e),n},length:function(e){var t=this,n=new i((function(e,n){t.ready().then((function(){_(t._dbInfo,"readonly",(function(r,o){if(r)return n(r);try{var a=o.objectStore(t._dbInfo.storeName).count();a.onsuccess=function(){e(a.result);},a.onerror=function(){n(a.error);};}catch(e){n(e);}}));})).catch(n);}));return s(n,e),n},key:function(e,t){var n=this,r=new i((function(t,r){e<0?t(null):n.ready().then((function(){_(n._dbInfo,"readonly",(function(o,a){if(o)return r(o);try{var i=a.objectStore(n._dbInfo.storeName),s=!1,c=i.openKeyCursor();c.onsuccess=function(){var n=c.result;n?0===e||s?t(n.key):(s=!0,n.advance(e)):t(null);},c.onerror=function(){r(c.error);};}catch(e){r(e);}}));})).catch(r);}));return s(r,t),r},keys:function(e){var t=this,n=new i((function(e,n){t.ready().then((function(){_(t._dbInfo,"readonly",(function(r,o){if(r)return n(r);try{var a=o.objectStore(t._dbInfo.storeName).openKeyCursor(),i=[];a.onsuccess=function(){var t=a.result;t?(i.push(t.key),t.continue()):e(i);},a.onerror=function(){n(a.error);};}catch(e){n(e);}}));})).catch(n);}));return s(n,e),n},dropInstance:function(e,t){t=u.apply(this,arguments);var n=this.config();(e="function"!=typeof e&&e||{}).name||(e.name=e.name||n.name,e.storeName=e.storeName||n.storeName);var r,a=this;if(e.name){var c=e.name===n.name&&a._dbInfo.db,l=c?i.resolve(a._dbInfo.db):m(e).then((function(t){var n=f[e.name],r=n.forages;n.db=t;for(var o=0;o<r.length;o++)r[o]._dbInfo.db=t;return t}));r=e.storeName?l.then((function(t){if(t.objectStoreNames.contains(e.storeName)){var n=t.version+1;v(e);var r=f[e.name],a=r.forages;t.close();for(var s=0;s<a.length;s++){var c=a[s];c._dbInfo.db=null,c._dbInfo.version=n;}return new i((function(t,r){var a=o.open(e.name,n);a.onerror=function(e){a.result.close(),r(e);},a.onupgradeneeded=function(){a.result.deleteObjectStore(e.storeName);},a.onsuccess=function(){var e=a.result;e.close(),t(e);};})).then((function(e){r.db=e;for(var t=0;t<a.length;t++){var n=a[t];n._dbInfo.db=e,S(n._dbInfo);}})).catch((function(t){throw (y(e,t)||i.resolve()).catch((function(){})),t}))}})):l.then((function(t){v(e);var n=f[e.name],r=n.forages;t.close();for(var a=0;a<r.length;a++)r[a]._dbInfo.db=null;return new i((function(t,n){var r=o.deleteDatabase(e.name);r.onerror=function(){var e=r.result;e&&e.close(),n(r.error);},r.onblocked=function(){console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed');},r.onsuccess=function(){var e=r.result;e&&e.close(),t(e);};})).then((function(e){n.db=e;for(var t=0;t<r.length;t++)S(r[t]._dbInfo);})).catch((function(t){throw (y(e,t)||i.resolve()).catch((function(){})),t}))}));}else r=i.reject("Invalid arguments");return s(r,t),r}},O="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",R=/^~~local_forage_type~([^~]+)~/,I="__lfsc__:".length,M=I+"arbf".length,L=Object.prototype.toString;function x(e){var t,n,r,o,a,i=.75*e.length,s=e.length,c=0;"="===e[e.length-1]&&(i--,"="===e[e.length-2]&&i--);var l=new ArrayBuffer(i),u=new Uint8Array(l);for(t=0;t<s;t+=4)n=O.indexOf(e[t]),r=O.indexOf(e[t+1]),o=O.indexOf(e[t+2]),a=O.indexOf(e[t+3]),u[c++]=n<<2|r>>4,u[c++]=(15&r)<<4|o>>2,u[c++]=(3&o)<<6|63&a;return l}function H(e){var t,n=new Uint8Array(e),r="";for(t=0;t<n.length;t+=3)r+=O[n[t]>>2],r+=O[(3&n[t])<<4|n[t+1]>>4],r+=O[(15&n[t+1])<<2|n[t+2]>>6],r+=O[63&n[t+2]];return n.length%3==2?r=r.substring(0,r.length-1)+"=":n.length%3==1&&(r=r.substring(0,r.length-2)+"=="),r}var k={serialize:function(e,t){var n="";if(e&&(n=L.call(e)),e&&("[object ArrayBuffer]"===n||e.buffer&&"[object ArrayBuffer]"===L.call(e.buffer))){var r,o="__lfsc__:";e instanceof ArrayBuffer?(r=e,o+="arbf"):(r=e.buffer,"[object Int8Array]"===n?o+="si08":"[object Uint8Array]"===n?o+="ui08":"[object Uint8ClampedArray]"===n?o+="uic8":"[object Int16Array]"===n?o+="si16":"[object Uint16Array]"===n?o+="ur16":"[object Int32Array]"===n?o+="si32":"[object Uint32Array]"===n?o+="ui32":"[object Float32Array]"===n?o+="fl32":"[object Float64Array]"===n?o+="fl64":t(new Error("Failed to get type for BinaryArray"))),t(o+H(r));}else if("[object Blob]"===n){var a=new FileReader;a.onload=function(){var n="~~local_forage_type~"+e.type+"~"+H(this.result);t("__lfsc__:blob"+n);},a.readAsArrayBuffer(e);}else try{t(JSON.stringify(e));}catch(n){console.error("Couldn't convert value into a JSON string: ",e),t(null,n);}},deserialize:function(e){if("__lfsc__:"!==e.substring(0,I))return JSON.parse(e);var t,n=e.substring(M),r=e.substring(I,M);if("blob"===r&&R.test(n)){var o=n.match(R);t=o[1],n=n.substring(o[0].length);}var i=x(n);switch(r){case"arbf":return i;case"blob":return a([i],{type:t});case"si08":return new Int8Array(i);case"ui08":return new Uint8Array(i);case"uic8":return new Uint8ClampedArray(i);case"si16":return new Int16Array(i);case"ur16":return new Uint16Array(i);case"si32":return new Int32Array(i);case"ui32":return new Uint32Array(i);case"fl32":return new Float32Array(i);case"fl64":return new Float64Array(i);default:throw new Error("Unkown type: "+r)}},stringToBuffer:x,bufferToString:H};function P(e,t,n,r){e.executeSql("CREATE TABLE IF NOT EXISTS "+t.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],n,r);}function A(e,t,n,r,o,a){e.executeSql(n,r,o,(function(e,i){i.code===i.SYNTAX_ERR?e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[t.storeName],(function(e,s){s.rows.length?a(e,i):P(e,t,(function(){e.executeSql(n,r,o,a);}),a);}),a):a(e,i);}),a);}function D(e,t,n,r){var o=this;e=l(e);var a=new i((function(a,i){o.ready().then((function(){void 0===t&&(t=null);var s=t,c=o._dbInfo;c.serializer.serialize(t,(function(t,l){l?i(l):c.db.transaction((function(n){A(n,c,"INSERT OR REPLACE INTO "+c.storeName+" (key, value) VALUES (?, ?)",[e,t],(function(){a(s);}),(function(e,t){i(t);}));}),(function(t){if(t.code===t.QUOTA_ERR){if(r>0)return void a(D.apply(o,[e,s,n,r-1]));i(t);}}));}));})).catch(i);}));return s(a,n),a}function F(e){return new i((function(t,n){e.transaction((function(r){r.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],(function(n,r){for(var o=[],a=0;a<r.rows.length;a++)o.push(r.rows.item(a).name);t({db:e,storeNames:o});}),(function(e,t){n(t);}));}),(function(e){n(e);}));}))}var U={_driver:"webSQLStorage",_initStorage:function(e){var t=this,n={db:null};if(e)for(var r in e)n[r]="string"!=typeof e[r]?e[r].toString():e[r];var o=new i((function(e,r){try{n.db=openDatabase(n.name,String(n.version),n.description,n.size);}catch(e){return r(e)}n.db.transaction((function(o){P(o,n,(function(){t._dbInfo=n,e();}),(function(e,t){r(t);}));}),r);}));return n.serializer=k,o},_support:"function"==typeof openDatabase,iterate:function(e,t){var n=this,r=new i((function(t,r){n.ready().then((function(){var o=n._dbInfo;o.db.transaction((function(n){A(n,o,"SELECT * FROM "+o.storeName,[],(function(n,r){for(var a=r.rows,i=a.length,s=0;s<i;s++){var c=a.item(s),l=c.value;if(l&&(l=o.serializer.deserialize(l)),void 0!==(l=e(l,c.key,s+1)))return void t(l)}t();}),(function(e,t){r(t);}));}));})).catch(r);}));return s(r,t),r},getItem:function(e,t){var n=this;e=l(e);var r=new i((function(t,r){n.ready().then((function(){var o=n._dbInfo;o.db.transaction((function(n){A(n,o,"SELECT * FROM "+o.storeName+" WHERE key = ? LIMIT 1",[e],(function(e,n){var r=n.rows.length?n.rows.item(0).value:null;r&&(r=o.serializer.deserialize(r)),t(r);}),(function(e,t){r(t);}));}));})).catch(r);}));return s(r,t),r},setItem:function(e,t,n){return D.apply(this,[e,t,n,1])},removeItem:function(e,t){var n=this;e=l(e);var r=new i((function(t,r){n.ready().then((function(){var o=n._dbInfo;o.db.transaction((function(n){A(n,o,"DELETE FROM "+o.storeName+" WHERE key = ?",[e],(function(){t();}),(function(e,t){r(t);}));}));})).catch(r);}));return s(r,t),r},clear:function(e){var t=this,n=new i((function(e,n){t.ready().then((function(){var r=t._dbInfo;r.db.transaction((function(t){A(t,r,"DELETE FROM "+r.storeName,[],(function(){e();}),(function(e,t){n(t);}));}));})).catch(n);}));return s(n,e),n},length:function(e){var t=this,n=new i((function(e,n){t.ready().then((function(){var r=t._dbInfo;r.db.transaction((function(t){A(t,r,"SELECT COUNT(key) as c FROM "+r.storeName,[],(function(t,n){var r=n.rows.item(0).c;e(r);}),(function(e,t){n(t);}));}));})).catch(n);}));return s(n,e),n},key:function(e,t){var n=this,r=new i((function(t,r){n.ready().then((function(){var o=n._dbInfo;o.db.transaction((function(n){A(n,o,"SELECT key FROM "+o.storeName+" WHERE id = ? LIMIT 1",[e+1],(function(e,n){var r=n.rows.length?n.rows.item(0).key:null;t(r);}),(function(e,t){r(t);}));}));})).catch(r);}));return s(r,t),r},keys:function(e){var t=this,n=new i((function(e,n){t.ready().then((function(){var r=t._dbInfo;r.db.transaction((function(t){A(t,r,"SELECT key FROM "+r.storeName,[],(function(t,n){for(var r=[],o=0;o<n.rows.length;o++)r.push(n.rows.item(o).key);e(r);}),(function(e,t){n(t);}));}));})).catch(n);}));return s(n,e),n},dropInstance:function(e,t){t=u.apply(this,arguments);var n=this.config();(e="function"!=typeof e&&e||{}).name||(e.name=e.name||n.name,e.storeName=e.storeName||n.storeName);var r,o=this;return s(r=e.name?new i((function(t){var r;r=e.name===n.name?o._dbInfo.db:openDatabase(e.name,"","",0),e.storeName?t({db:r,storeNames:[e.storeName]}):t(F(r));})).then((function(e){return new i((function(t,n){e.db.transaction((function(r){function o(e){return new i((function(t,n){r.executeSql("DROP TABLE IF EXISTS "+e,[],(function(){t();}),(function(e,t){n(t);}));}))}for(var a=[],s=0,c=e.storeNames.length;s<c;s++)a.push(o(e.storeNames[s]));i.all(a).then((function(){t();})).catch((function(e){n(e);}));}),(function(e){n(e);}));}))})):i.reject("Invalid arguments"),t),r}};function j(e,t){var n=e.name+"/";return e.storeName!==t.storeName&&(n+=e.storeName+"/"),n}function J(){return !function(){try{return localStorage.setItem("_localforage_support_test",!0),localStorage.removeItem("_localforage_support_test"),!1}catch(e){return !0}}()||localStorage.length>0}var B={_driver:"localStorageWrapper",_initStorage:function(e){var t={};if(e)for(var n in e)t[n]=e[n];return t.keyPrefix=j(e,this._defaultConfig),J()?(this._dbInfo=t,t.serializer=k,i.resolve()):i.reject()},_support:function(){try{return "undefined"!=typeof localStorage&&"setItem"in localStorage&&!!localStorage.setItem}catch(e){return !1}}(),iterate:function(e,t){var n=this,r=n.ready().then((function(){for(var t=n._dbInfo,r=t.keyPrefix,o=r.length,a=localStorage.length,i=1,s=0;s<a;s++){var c=localStorage.key(s);if(0===c.indexOf(r)){var l=localStorage.getItem(c);if(l&&(l=t.serializer.deserialize(l)),void 0!==(l=e(l,c.substring(o),i++)))return l}}}));return s(r,t),r},getItem:function(e,t){var n=this;e=l(e);var r=n.ready().then((function(){var t=n._dbInfo,r=localStorage.getItem(t.keyPrefix+e);return r&&(r=t.serializer.deserialize(r)),r}));return s(r,t),r},setItem:function(e,t,n){var r=this;e=l(e);var o=r.ready().then((function(){void 0===t&&(t=null);var n=t;return new i((function(o,a){var i=r._dbInfo;i.serializer.serialize(t,(function(t,r){if(r)a(r);else try{localStorage.setItem(i.keyPrefix+e,t),o(n);}catch(e){"QuotaExceededError"!==e.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==e.name||a(e),a(e);}}));}))}));return s(o,n),o},removeItem:function(e,t){var n=this;e=l(e);var r=n.ready().then((function(){var t=n._dbInfo;localStorage.removeItem(t.keyPrefix+e);}));return s(r,t),r},clear:function(e){var t=this,n=t.ready().then((function(){for(var e=t._dbInfo.keyPrefix,n=localStorage.length-1;n>=0;n--){var r=localStorage.key(n);0===r.indexOf(e)&&localStorage.removeItem(r);}}));return s(n,e),n},length:function(e){var t=this.keys().then((function(e){return e.length}));return s(t,e),t},key:function(e,t){var n=this,r=n.ready().then((function(){var t,r=n._dbInfo;try{t=localStorage.key(e);}catch(e){t=null;}return t&&(t=t.substring(r.keyPrefix.length)),t}));return s(r,t),r},keys:function(e){var t=this,n=t.ready().then((function(){for(var e=t._dbInfo,n=localStorage.length,r=[],o=0;o<n;o++){var a=localStorage.key(o);0===a.indexOf(e.keyPrefix)&&r.push(a.substring(e.keyPrefix.length));}return r}));return s(n,e),n},dropInstance:function(e,t){if(t=u.apply(this,arguments),!(e="function"!=typeof e&&e||{}).name){var n=this.config();e.name=e.name||n.name,e.storeName=e.storeName||n.storeName;}var r,o=this;return s(r=e.name?new i((function(t){e.storeName?t(j(e,o._defaultConfig)):t(e.name+"/");})).then((function(e){for(var t=localStorage.length-1;t>=0;t--){var n=localStorage.key(t);0===n.indexOf(e)&&localStorage.removeItem(n);}})):i.reject("Invalid arguments"),t),r}},Y=function(e,t){for(var n,r,o=e.length,a=0;a<o;){if((n=e[a])===(r=t)||"number"==typeof n&&"number"==typeof r&&isNaN(n)&&isNaN(r))return !0;a++;}return !1},G=Array.isArray||function(e){return "[object Array]"===Object.prototype.toString.call(e)},K={},V={},X={INDEXEDDB:C,WEBSQL:U,LOCALSTORAGE:B},q=[X.INDEXEDDB._driver,X.WEBSQL._driver,X.LOCALSTORAGE._driver],Q=["dropInstance"],W=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(Q),Z={description:"",driver:q.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function $(e,t){e[t]=function(){var n=arguments;return e.ready().then((function(){return e[t].apply(e,n)}))};}function z(){for(var e=1;e<arguments.length;e++){var t=arguments[e];if(t)for(var n in t)t.hasOwnProperty(n)&&(G(t[n])?arguments[0][n]=t[n].slice():arguments[0][n]=t[n]);}return arguments[0]}var ee=new(function(){function e(t){for(var n in function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),X)if(X.hasOwnProperty(n)){var r=X[n],o=r._driver;this[n]=o,K[o]||this.defineDriver(r);}this._defaultConfig=z({},Z),this._config=z({},this._defaultConfig,t),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch((function(){}));}return e.prototype.config=function(e){if("object"===(void 0===e?"undefined":r(e))){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var t in e){if("storeName"===t&&(e[t]=e[t].replace(/\W/g,"_")),"version"===t&&"number"!=typeof e[t])return new Error("Database version must be a number.");this._config[t]=e[t];}return !("driver"in e)||!e.driver||this.setDriver(this._config.driver)}return "string"==typeof e?this._config[e]:this._config},e.prototype.defineDriver=function(e,t,n){var r=new i((function(t,n){try{var r=e._driver,o=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!e._driver)return void n(o);for(var a=W.concat("_initStorage"),c=0,l=a.length;c<l;c++){var u=a[c];if((!Y(Q,u)||e[u])&&"function"!=typeof e[u])return void n(o)}!function(){for(var t=function(e){return function(){var t=new Error("Method "+e+" is not implemented by the current driver"),n=i.reject(t);return s(n,arguments[arguments.length-1]),n}},n=0,r=Q.length;n<r;n++){var o=Q[n];e[o]||(e[o]=t(o));}}();var d=function(n){K[r]&&console.info("Redefining LocalForage driver: "+r),K[r]=e,V[r]=n,t();};"_support"in e?e._support&&"function"==typeof e._support?e._support().then(d,n):d(!!e._support):d(!0);}catch(e){n(e);}}));return c(r,t,n),r},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(e,t,n){var r=K[e]?i.resolve(K[e]):i.reject(new Error("Driver not found."));return c(r,t,n),r},e.prototype.getSerializer=function(e){var t=i.resolve(k);return c(t,e),t},e.prototype.ready=function(e){var t=this,n=t._driverSet.then((function(){return null===t._ready&&(t._ready=t._initDriver()),t._ready}));return c(n,e,e),n},e.prototype.setDriver=function(e,t,n){var r=this;G(e)||(e=[e]);var o=this._getSupportedDrivers(e);function a(){r._config.driver=r.driver();}function s(e){return r._extend(e),a(),r._ready=r._initStorage(r._config),r._ready}var l=null!==this._driverSet?this._driverSet.catch((function(){return i.resolve()})):i.resolve();return this._driverSet=l.then((function(){var e=o[0];return r._dbInfo=null,r._ready=null,r.getDriver(e).then((function(e){r._driver=e._driver,a(),r._wrapLibraryMethodsWithReady(),r._initDriver=function(e){return function(){var t=0;return function n(){for(;t<e.length;){var o=e[t];return t++,r._dbInfo=null,r._ready=null,r.getDriver(o).then(s).catch(n)}a();var c=new Error("No available storage method found.");return r._driverSet=i.reject(c),r._driverSet}()}}(o);}))})).catch((function(){a();var e=new Error("No available storage method found.");return r._driverSet=i.reject(e),r._driverSet})),c(this._driverSet,t,n),this._driverSet},e.prototype.supports=function(e){return !!V[e]},e.prototype._extend=function(e){z(this,e);},e.prototype._getSupportedDrivers=function(e){for(var t=[],n=0,r=e.length;n<r;n++){var o=e[n];this.supports(o)&&t.push(o);}return t},e.prototype._wrapLibraryMethodsWithReady=function(){for(var e=0,t=W.length;e<t;e++)$(this,W[e]);},e.prototype.createInstance=function(t){return new e(t)},e}());t.exports=ee;},{3:3}]},{},[4])(4);
    /*!
        localForage -- Offline Storage, Improved
        Version 1.10.0
        https://localforage.github.io/localForage
        (c) 2013-2017 Mozilla, Apache License 2.0
    */function Jp(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}function Bp(e){return e?(e^16*Math.random()>>e/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,Bp)}var Yp=/^[a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12}$/,Gp=function(t){po(a,Fp);var o=Jp(a);function a(){var t;return e(this,a),r(fo(t=o.call(this)),"_id",void 0),r(fo(t),"_savedRemotely",!1),r(fo(t),"_savedLocally",!1),r(fo(t),"deleted",!1),r(fo(t),"createdStamp",void 0),r(fo(t),"modifiedStamp",void 0),r(fo(t),"projectId",void 0),r(fo(t),"isPristine",!1),t.createdStamp=Math.floor(Date.now()/1e3),t}return n(a,[{key:"unsaved",value:function(){return !(this._savedLocally&&this._savedRemotely)}},{key:"id",get:function(){return this._id||(this._id=Bp()),this._id},set:function(e){if(this._id&&e!==this._id)throw new Error("Occurrence id has already been set, when trying to set new id '".concat(e,"'."));this._id=e;}},{key:"queuePost",value:function(e){var t=this;return new Promise((function(n,r){var o=function(){return console.log({"posting form data":e}),t.post(e).then(n,r)};a._tasks.push(o),a._tasks.length>1?console.log("Added post request to the queue."):(console.log("No pending tasks, starting post request immediately."),o().finally(a._next));}))}},{key:"post",value:function(e){var t=this;return fetch(this.SAVE_ENDPOINT,{method:"POST",body:e}).then((function(e){return e.ok?e.clone().json().then((function(n){switch(console.log({"returned to client after save":n}),n.saveState){case"SAVED_TO_SERVER":t._savedLocally=!0,t._savedRemotely=!0;break;case"SAVED_LOCALLY":t._savedLocally=!0,t._savedRemotely=!1;break;default:console.log("Unrecognised save state '".concat(n.saveState,"'"));}return t.createdStamp=parseInt(n.created,10),t.modifiedStamp=parseInt(n.modified,10),e.json()})):(console.log("Save failed, presumably service worker is missing and there is no network connection. Should write to IndexedDb here."),Promise.reject("IndexedDb storage not yet implemented"))}))}},{key:"_parseDescriptor",value:function(e){this._parseAttributes(e.attributes),this._parseSavedState(e.saveState),this.deleted=!0===e.deleted||"true"===e.deleted,this.createdStamp=parseInt(e.created,10),this.modifiedStamp=e.modified?parseInt(e.modified,10):0,this.projectId=parseInt(e.projectId,10);}},{key:"_parseAttributes",value:function(e){"string"==typeof e&&(e=JSON.parse(e)),Array.isArray(e)?(console.log("Attributes were spuriously represented as an array rather than as an empty object"),this.attributes={}):this.attributes=e;}},{key:"_parseSavedState",value:function(e){switch(e){case"SAVED_LOCALLY":this._savedRemotely=!1,this._savedLocally=!0;break;case"SAVED_TO_SERVER":this._savedRemotely=!0,this._savedLocally=!0;break;default:throw new Error("Unrecognised saved state '".concat(e))}}},{key:"touch",value:function(){this.modifiedStamp=Math.floor(Date.now()/1e3),this.isPristine&&(this.isPristine=!1,this.createdStamp=this.modifiedStamp),this._savedLocally=!1,this._savedRemotely=!1;}},{key:"evaluateCompletionStatus",value:function(e){var t={},n=!0;for(var r in e)if(e.hasOwnProperty(r)){var o=e[r];t[r]=o.validator?o.validator(r,o,this.attributes):o.field.isValid(r,o,this.attributes),null!==t[r]&&(n=n&&t[r]);}return {requiredFieldsPresent:n,validity:t}}}],[{key:"_next",value:function(){if(a._tasks.shift(),a._tasks.length)return console.log("Running the next task."),a._tasks[0]().finally(a._next)}},{key:"retrieveFromLocal",value:function(e,t){return jp.getItem("".concat(t.TYPE,".").concat(e)).then((function(n){return n?(t.id=e,t._parseDescriptor(n),t):Promise.reject("Failed to retrieve ".concat(t.TYPE,".").concat(e," locally"))}))}}]),a}();function Kp(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}r(Gp,"_tasks",[]);var Vp=function(t){po(r,Rc(Error));var n=Kp(r);function r(){return e(this,r),n.apply(this,arguments)}return r}();function Xp(e){try{var t=document.createElement("textarea");return t.innerHTML=e,t.innerHTML.replace(/"/g,"&quot;")}catch(t){var n=document.createElement("pre");return n.appendChild(document.createTextNode(e)),n.innerHTML.replace(/"/g,"&quot;")}}var qp=function(){function t(){e(this,t),r(this,"id",void 0),r(this,"nameString",""),r(this,"canonical",""),r(this,"hybridCanonical",""),r(this,"acceptedEntityId",""),r(this,"qualifier",""),r(this,"authority",""),r(this,"vernacular",""),r(this,"vernacularRoot",""),r(this,"used",void 0),r(this,"sortOrder",void 0),r(this,"parentIds",[]);}return n(t,[{key:"formattedHTML",value:function(e){var n;return this.id!==this.acceptedEntityId&&(n=t.fromId(this.acceptedEntityId)),t.showVernacular?e?n?"<q><b>".concat(Xp(this.vernacular),'</b></q> <span class="italictaxon">').concat(this.nameString).concat(this.qualifier?" <b>".concat(this.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(Xp(this.authority),"</span>")+' = <span class="italictaxon">'.concat(n.nameString).concat(n.qualifier?" <b>".concat(n.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(Xp(n.authority),"</span>"):"<q><b>".concat(Xp(this.vernacular),'</b></q> <span class="italictaxon">').concat(this.nameString).concat(this.qualifier?" <b>".concat(this.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(Xp(this.authority),"</span>"):n?'<span class="italictaxon">'.concat(this.nameString).concat(this.qualifier?" <b>".concat(this.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(this.authority,"</span>").concat(this.vernacular?" <q><b>".concat(Xp(this.vernacular),"</b></q>"):"",' = <span class="italictaxon">').concat(n.nameString).concat(n.qualifier?" <b>".concat(n.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(Xp(n.authority),"</span>"):'<span class="italictaxon">'.concat(this.nameString).concat(this.qualifier?" <b>".concat(this.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(Xp(this.authority),"</span>").concat(this.vernacular?" <q><b>".concat(Xp(this.vernacular),"</b></q>"):""):n?'<span class="italictaxon">'.concat(this.nameString).concat(this.qualifier?" <b>".concat(this.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(this.authority,"</span>")+' = <span class="italictaxon">'.concat(n.nameString).concat(n.qualifier?" <b>".concat(n.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(Xp(n.authority),"</span>"):'<span class="italictaxon">'.concat(this.nameString).concat(this.qualifier?" <b>".concat(this.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(Xp(this.authority),"</span>")}}],[{key:"fromId",value:function(e){if(!t.rawTaxa){if(!BsbiDb.TaxonNames)throw new Vp("Taxon.fromId() called before taxon list has loaded.");t.rawTaxa=BsbiDb.TaxonNames;}if(!t.rawTaxa.hasOwnProperty(e))throw new Vp("Taxon id '".concat(e,"' not found."));var n=t.rawTaxa[e],r=new t;return r.id=e,r.nameString=n[0],r.canonical=n[1]||n[0],r.hybridCanonical=n[2]||r.canonical,r.acceptedEntityId=n[3]||e,r.qualifier=n[4],r.authority=n[5],r.vernacular=n[6],r.vernacularRoot=n[7],r.used=n[8],r.sortOrder=n[9],r.parentIds=n[10],r}}]),t}();r(qp,"rawTaxa",void 0),r(qp,"showVernacular",!0);var Qp=R,Wp=Da,Zp="[\t\n\v\f\r                　\u2028\u2029\ufeff]",$p=RegExp("^"+Zp+Zp+"*"),zp=RegExp(Zp+Zp+"*$"),ev=function(e){return function(t){var n=Wp(Qp(t));return 1&e&&(n=n.replace($p,"")),2&e&&(n=n.replace(zp,"")),n}},tv={start:ev(1),end:ev(2),trim:ev(3)},nv=qt.PROPER,rv=p,ov="\t\n\v\f\r                　\u2028\u2029\ufeff",av=function(e){return rv((function(){return !!ov[e]()||"​᠎"!=="​᠎"[e]()||nv&&ov[e].name!==e}))},iv=tv.trim;function sv(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}function cv(e,t,n,r){return uv(e,t),lv(n,"set"),function(e,t,n){if(t.set)t.set.call(e,n);else {if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n;}}(e,n,r),r}function lv(e,t){if(void 0===e)throw new TypeError("attempted to "+t+" private static field before its declaration")}function uv(e,t){if(e!==t)throw new TypeError("Private static access of wrong provenance")}or({target:"String",proto:!0,forced:av("trim")},{trim:function(){return iv(this)}});var dv=function(t){po(a,Fp);var o=sv(a);function a(t){var n;return e(this,a),r(fo(n=o.call(this)),"_value",void 0),r(fo(n),"_fieldEl",void 0),r(fo(n),"label","field label"),r(fo(n),"helpText",""),r(fo(n),"validationMessage",""),r(fo(n),"completion",a.COMPLETION_OPTIONAL),r(fo(n),"parentForm",void 0),r(fo(n),"attributeName",void 0),t&&(t.label&&(n.label=t.label),t.helpText&&(n.helpText=t.helpText),t.validationMessage&&(n.validationMessage=t.validationMessage),t.completion&&(n.completion=t.completion)),n}return n(a,[{key:"value",get:function(){return this._value},set:function(e){}},{key:"fieldElement",get:function(){return this._fieldEl||this.buildField(),this._fieldEl}},{key:"addField",value:function(){this.parentForm.formElement.appendChild(this.fieldElement);}},{key:"markValidity",value:function(e){}}],[{key:"nextId",get:function(){var e,t,n;return "field".concat((cv(a,a,fv,(n=fv,uv(t=a,a),lv(n,"get"),1+(e=+function(e,t){return t.get?t.get.call(e):t.value}(t,n)))),e))}},{key:"cleanRawInput",value:function(e){return e.value.trim().replace(/\s\s+/g," ")}},{key:"cleanRawString",value:function(e){return e.trim().replace(/\s\s+/g," ")}},{key:"isEmpty",value:function(e){return ""===e}},{key:"isValid",value:function(e,t,n){return !t.attributes.completion||t.attributes.completion!==a.COMPLETION_COMPULSORY&&t.attributes.completion!==a.COMPLETION_DESIRED?null:!(!n.hasOwnProperty(e)||t.field.isEmpty(n[e]))}},{key:"summarise",value:function(e,t,n){return !t.summary||t.summary.hasOwnProperty("summarise")&&!0!==t.summary.summarise?"":t.field.summariseImpl(e,t,n)}},{key:"summariseImpl",value:function(e,t,n){return ""}}]),a}();r(dv,"COMPLETION_COMPULSORY","compulsory"),r(dv,"COMPLETION_DESIRED","desired"),r(dv,"COMPLETION_OPTIONAL","optional");var fv={writable:!0,value:1};function hv(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}function pv(e,t,n){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,n);}function vv(e,t,n,r){return Nv(e,t),yv(n,"set"),function(e,t,n){if(t.set)t.set.call(e,n);else {if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n;}}(e,n,r),r}function Sv(e,t,n){return Nv(e,t),yv(n,"get"),function(e,t){if(t.get)return t.get.call(e);return t.value}(e,n)}function yv(e,t){if(void 0===e)throw new TypeError("attempted to "+t+" private static field before its declaration")}function Nv(e,t){if(e!==t)throw new TypeError("Private static access of wrong provenance")}r(dv,"EVENT_CHANGE","fieldChange");var mv=new WeakMap,gv=function(t){po(a,Fp);var o=hv(a);function a(){var t;e(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return pv(fo(t=o.call.apply(o,[this].concat(i))),mv,{writable:!0,value:void 0}),r(fo(t),"_formId",void 0),r(fo(t),"_formContentContainer",void 0),r(fo(t),"fields",void 0),r(fo(t),"liveValidation",!1),r(fo(t),"isValid",null),r(fo(t),"_formFieldsBuilt",!1),t}return n(a,[{key:"formElement",get:function(){var e,t=this;go(this,mv)||(mo(this,mv,document.createElement("form")),go(this,mv).id=this._formId="form".concat((vv(a,a,bv,1+(e=+Sv(a,a,bv))),e)),go(this,mv).noValidate=!0,this.liveValidation&&(go(this,mv).className="needs-validation"),this.buildContentContainer(go(this,mv)),go(this,mv).addEventListener("change",(function(e){t.changeHandler(e);}),{capture:!1}));return go(this,mv)}},{key:"buildContentContainer",value:function(e){return this._formContentContainer=e,this._formContentContainer}},{key:"changeHandler",value:function(e){console.log({"form change event":e});}},{key:"destructor",value:function(){Lc(yo(a.prototype),"destructor",this).call(this),mo(this,mv,null);}},{key:"buildFormFields",value:function(){for(var e in this.initialiseFormFields(),this.fields)if(this.fields.hasOwnProperty(e)){var t=this.fields[e];t.parentForm=this,t.attributeName=e,this._formContentContainer.appendChild(t.fieldElement),t.addListener(dv.EVENT_CHANGE,this.changeHandler.bind(this));}this._formFieldsBuilt=!0;}},{key:"conditionallyValidateForm",value:function(){this.liveValidation&&this.validateForm();}},{key:"validateForm",value:function(){this.liveValidation=!0,this.formElement.classList.add("needs-validation");var e=this.model.evaluateCompletionStatus(this.getFormSectionProperties());for(var t in this.fields){if(this.fields.hasOwnProperty(t))this.fields[t].markValidity(e.validity[t]);}return this.isValid!==e.requiredFieldsPresent&&(this.isValid=e.requiredFieldsPresent,this.fireEvent(a.EVENT_VALIDATION_STATE_CHANGE,{isValid:this.isValid})),e.requiredFieldsPresent}},{key:"populateFormContent",value:function(){if(this._formFieldsBuilt){var e=this.model;for(var t in this.fields){if(this.fields.hasOwnProperty(t))this.fields[t].value=e.attributes[t];}this.conditionallyValidateForm();}}}],[{key:"nextId",get:function(){var e;return "id".concat((vv(a,a,Tv,1+(e=+Sv(a,a,Tv))),e))}}]),a}();r(gv,"CHANGE_EVENT","change");var bv={writable:!0,value:0};r(gv,"EVENT_VALIDATION_STATE_CHANGE","validationstatechange");var Tv={writable:!0,value:0};function Ev(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}r(gv,"COMPLETION_STATUS_UNSTARTED","unstarted"),r(gv,"COMPLETION_STATUS_COMPLETE","complete"),r(gv,"COMPLETION_STATUS_IN_PROGRESS","inProgress");var wv=function(t){po(a,Gp);var o=Ev(a);function a(){var t;e(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return r(fo(t=o.call.apply(o,[this].concat(i))),"attributes",{}),r(fo(t),"_savedRemotely",!1),r(fo(t),"_savedLocally",!1),r(fo(t),"SAVE_ENDPOINT","/saveoccurrence.php"),r(fo(t),"TYPE","occurrence"),r(fo(t),"isNew",!1),t}return n(a,[{key:"taxon",get:function(){return this.attributes.taxon&&this.attributes.taxon.taxonId?qp.fromId(this.attributes.taxon.taxonId):null}},{key:"setForm",value:function(e){return this.isNew||(e.liveValidation=!0),e.addListener(gv.CHANGE_EVENT,this.formChangedHandler.bind(this)),e}},{key:"formChangedHandler",value:function(e){console.log("Occurrence change handler invoked."),e.form.updateModelFromContent(),e.form.conditionallyValidateForm(),this.touch(),this.fireEvent(a.EVENT_MODIFIED,{occurrenceId:this.id});}},{key:"delete",value:function(){this.deleted||(this.touch(),this.deleted=!0,this.fireEvent(a.EVENT_MODIFIED,{occurrenceId:this.id}));}},{key:"save",value:function(e){if(this._savedRemotely)return Promise.reject("".concat(this.id," has already been saved."));var t=new FormData;return !e&&this.surveyId&&(e=this.surveyId),t.append("type",this.TYPE),t.append("surveyId",e),t.append("occurrenceId",this.id),t.append("id",this.id),t.append("projectId",this.projectId.toString()),t.append("attributes",JSON.stringify(this.attributes)),t.append("deleted",this.deleted.toString()),t.append("created",this.createdStamp.toString()),console.log("queueing occurrence post"),this.queuePost(t)}},{key:"_parseDescriptor",value:function(e){Lc(yo(a.prototype),"_parseDescriptor",this).call(this,e),this.surveyId=e.surveyId;}}]),a}();function _v(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}r(wv,"EVENT_MODIFIED","modified");var Cv=function(t){po(r,Rc(Error));var n=_v(r);function r(){return e(this,r),n.apply(this,arguments)}return r}();function Ov(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}function Rv(e,t,n){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,n);}var Iv=new WeakMap,Mv=function(t){po(a,s);var o=Ov(a);function a(t){var n;return e(this,a),r(fo(n=o.call(this)),"route","/list/:action/:id"),r(fo(n),"title","App homepage"),r(fo(n),"app",void 0),r(fo(n),"view",void 0),Rv(fo(n),Iv,{writable:!0,value:""}),r(fo(n),"needsFullRefresh",!0),r(fo(n),"needRightPanelRefresh",!0),r(fo(n),"viewSubcontext",""),r(fo(n),"surveySection",void 0),r(fo(n),"leftPanelBaseRoute",""),r(fo(n),"viewContexts",{record:function(e){this.surveySection=null,e?go(this,Iv)!==e.id?(this.needRightPanelRefresh=!0,this.currentOccurrenceId=e.id?e.id:""):this.needRightPanelRefresh=!1:(this.currentOccurrenceId="",this.needRightPanelRefresh=!0),this.leftPanelBaseRoute="/list/record";},survey:function(e){console.log("in survey section ".concat(e.section)),this.currentOccurrenceId="",this.needRightPanelRefresh=!0,this.surveySection=e.section,this.leftPanelBaseRoute="/list/survey/".concat(e.section);}}),n.view=t,t.controller=fo(n),n.handle=s.nextHandle,t.addListener(a.EVENT_SELECT_OCCURRENCE,n.occurrenceSelectionHandler.bind(fo(n))),t.addListener(a.EVENT_SELECT_SURVEY_SECTION,n.surveyPartSelectionHandler.bind(fo(n))),t.addListener(a.EVENT_NEW_RECORD,n.newRecordHandler.bind(fo(n))),t.addListener(a.EVENT_DELETE_OCCURRENCE,n.deleteOccurrenceHandler.bind(fo(n))),t.addListener(a.EVENT_BACK,n.backHandler.bind(fo(n))),t.addListener(a.EVENT_NEXT_TO_RECORDS,n.nextTransitionToRecordsHandler.bind(fo(n))),n}return n(a,[{key:"occurrences",get:function(){return this.app.occurrences}},{key:"currentOccurrence",get:function(){if(go(this,Iv)){if(this.app.occurrences.has(go(this,Iv)))return this.app.occurrences.get(go(this,Iv));throw new Mc("Record id '".concat(go(this,Iv),"' was not found."))}return null}},{key:"currentOccurrenceId",get:function(){return go(this,Iv)},set:function(e){mo(this,Iv,e);}},{key:"survey",get:function(){return this.app.currentSurvey}},{key:"nextTransitionToRecordsHandler",value:function(){console.log("in nextTransitionToRecordsHandler()"),this.app.haveExtantOccurrences()?this.app.router.navigate("/list/record/"):this.newRecordHandler();}},{key:"deleteOccurrenceHandler",value:function(e){console.log({deleting:e.occurrenceId});var t=this.app.occurrences.get(e.occurrenceId);if(!t)throw new Cv("Occurrence id '".concat(e.occurrenceId,"' not found when trying to delete."));t.delete(),this.currentOccurrenceId===e.occurrenceId&&this.app.router.navigate("/list/record/");}},{key:"surveyPartSelectionHandler",value:function(e){console.log({"In surveyPartSelectionHandler":e}),"record"===e.sectionKey?this.app.router.navigate("/list/record/"):e.sectionKey?this.app.router.navigate("/list/survey/".concat(e.sectionKey)):this.app.router.navigate("/list/");}},{key:"newRecordHandler",value:function(){var e=this.app.addNewOccurrence();this.app.router.navigate("/list/record/".concat(e.id));}},{key:"occurrenceSelectionHandler",value:function(e){console.log({"In occurrenceSelectionHandler":e}),this.currentOccurrenceId&&e.occurrenceId&&this.currentOccurrenceId===e.occurrenceId?console.log("ignoring spurious navigation event for '".concat(e.occurrenceId,"'")):this.app.router.navigate("/list/record/".concat(e.occurrenceId));}},{key:"registerRoute",value:function(e){e.on("/list",this.mainRouteHandler.bind(this,"list","",""),{before:this.beforeRouteHandler?this.beforeRouteHandler.bind(this):null,after:this.afterRouteHandler?this.afterRouteHandler.bind(this):null,leave:this.leaveRouteHandler?this.leaveRouteHandler.bind(this):null,already:this.alreadyRouteHandler?this.alreadyRouteHandler.bind(this):null}),e.on("/list/help",this.mainRouteHandler.bind(this,"list","","help")),e.on("/list/record/",this.mainRouteHandler.bind(this,"list","record",""),{before:this.beforeRouteHandler?this.beforeRouteHandler.bind(this):null,after:this.afterRouteHandler?this.afterRouteHandler.bind(this):null,leave:this.leaveRouteHandler?this.leaveRouteHandler.bind(this):null,already:this.alreadyRouteHandler?this.alreadyRouteHandler.bind(this):null}),e.on("/list/record/help",this.mainRouteHandler.bind(this,"list","record","help")),e.on("/list/record/:id",this.mainRouteHandler.bind(this,"list","record","form"),{before:this.beforeRouteHandler?this.beforeRouteHandler.bind(this):null,after:this.afterRouteHandler?this.afterRouteHandler.bind(this):null,leave:this.leaveRouteHandler?this.leaveRouteHandler.bind(this):null,already:this.alreadyRouteHandler?this.alreadyRouteHandler.bind(this):null}),e.on("/list/survey/:section",this.mainRouteHandler.bind(this,"list","survey",""),{before:this.beforeRouteHandler?this.beforeRouteHandler.bind(this):null,after:this.afterRouteHandler?this.afterRouteHandler.bind(this):null,leave:this.leaveRouteHandler?this.leaveRouteHandler.bind(this):null,already:this.alreadyRouteHandler?this.alreadyRouteHandler.bind(this):null}),e.on("/list/survey/:section/help",this.mainRouteHandler.bind(this,"list","survey","help"));}},{key:"mainRouteHandler",value:function(e,t,n,r){console.log("reached special route handler for MainController.js"),console.log({context:e,params:t,query:r}),this.app.saveRoute();try{this.viewSubcontext=t,t&&this.viewContexts[t].call(this,r),this.app.currentControllerHandle!==this.handle&&(this.needsFullRefresh=!0,this.needRightPanelRefresh=!0,this.app.currentControllerHandle=this.handle),this.view.panelKey=n,this.view.display(),this.needsFullRefresh=!1;}catch(e){this.error=e,console.log({error:e});try{this.needsFullRefresh=!0,this.view.display();}catch(e){console.log({rethrownError:e}),document.body.innerHTML="<h2>Internal error</h2><p>Please report this problem:</p><p>".concat(e.message,"</p>");}}}},{key:"backHandler",value:function(){this.app.routeHistory.length>=2&&this.app.routeHistory[this.app.routeHistory.length-2].url===this.leftPanelBaseRoute?(this.app.routeHistory.length-=1,console.log("using standard back navigation"),window.history.back()):(console.log("navigating back using base address '".concat(this.leftPanelBaseRoute,"'")),this.app.router.navigate(this.leftPanelBaseRoute));}}]),a}();function Lv(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}r(Mv,"EVENT_SELECT_OCCURRENCE","selectoccurrence"),r(Mv,"EVENT_SELECT_SURVEY_SECTION","selectsurveysection"),r(Mv,"EVENT_NEW_RECORD","newrecord"),r(Mv,"EVENT_DELETE_OCCURRENCE","deleteoccurrence"),r(Mv,"EVENT_BACK","back"),r(Mv,"EVENT_NEXT_TO_RECORDS","nexttorecords");(function(t){po(a,s);var o=Lv(a);function a(t,n){var i;return e(this,a),r(fo(i=o.call(this)),"route",void 0),i.view=t,i.route=n,i.handle=s.nextHandle,i}return n(a,[{key:"routeHandler",value:function(e,t){this.app.currentControllerHandle=this.handle,this.view.display();}}]),a})();var Hv=rt,kv=Sn,Pv=Da,Av=R,Dv=ie,Fv=hf,Uv=Ef;df("match",(function(e,t,n){return [function(t){var n=Av(this),r=null==t?void 0:Dv(t,e);return r?r.call(t,n):new RegExp(t)[e](Pv(n))},function(e){var r=Hv(this),o=Pv(e),a=n(t,r,o);if(a.done)return a.value;if(!r.global)return Uv(r,o);var i=r.unicode;r.lastIndex=0;for(var s,c=[],l=0;null!==(s=Uv(r,o));){var u=Pv(s[0]);c[l]=u,""===u&&(r.lastIndex=Fv(o,kv(r.lastIndex),i)),l++;}return 0===l?null:c}]}));var jv=or,Jv=Ss,Bv=wr,Yv=k,Gv=hn,Kv=Nn,Vv=L,Xv=Pc,qv=xe,Qv=Uc("slice"),Wv=qv("species"),Zv=[].slice,$v=Math.max;jv({target:"Array",proto:!0,forced:!Qv},{slice:function(e,t){var n,r,o,a=Vv(this),i=Kv(a),s=Gv(e,i),c=Gv(void 0===t?i:t,i);if(Jv(a)&&(n=a.constructor,(Bv(n)&&(n===Array||Jv(n.prototype))||Yv(n)&&null===(n=n[Wv]))&&(n=void 0),n===Array||void 0===n))return Zv.call(a,s,c);for(r=new(void 0===n?Array:n)($v(c-s,0)),o=0;s<c;s++,o++)s in a&&Xv(r,o,a[s]);return r.length=o,r}});var zv=v,eS=qt.EXISTS,tS=tt.f,nS=Function.prototype,rS=nS.toString,oS=/^\s*function ([^ (]*)/;zv&&!eS&&tS(nS,"name",{configurable:!0,get:function(){try{return rS.call(this).match(oS)[1]}catch(e){return ""}}});var aS=rt,iS=Pi,sS=Ei,cS=Se,lS=function(e,t,n,r){try{return r?t(aS(n)[0],n[1]):t(n)}catch(t){iS(e,"throw",t);}},uS=bi,dS=wr,fS=Nn,hS=Pc,pS=xi,vS=Ri,SS=function(e){var t=cS(e),n=dS(this),r=arguments.length,o=r>1?arguments[1]:void 0,a=void 0!==o;a&&(o=sS(o,r>2?arguments[2]:void 0,2));var i,s,c,l,u,d,f=vS(t),h=0;if(!f||this==Array&&uS(f))for(i=fS(t),s=n?new this(i):Array(i);i>h;h++)d=a?o(t[h],h):t[h],hS(s,h,d);else for(u=(l=pS(t,f)).next,s=n?new this:[];!(c=u.call(l)).done;h++)d=a?lS(l,o,[c.value,h],!0):c.value,hS(s,h,d);return s.length=h,s};or({target:"Array",stat:!0,forced:!Wi((function(e){Array.from(e);}))},{from:SS});var yS=or,NS=v,mS=f,gS=me,bS=x,TS=k,ES=tt.f,wS=Jn,_S=mS.Symbol;if(NS&&bS(_S)&&(!("description"in _S.prototype)||void 0!==_S().description)){var CS={},OS=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof OS?new _S(e):void 0===e?_S():_S(e);return ""===e&&(CS[t]=!0),t};wS(OS,_S);var RS=OS.prototype=_S.prototype;RS.constructor=OS;var IS=RS.toString,MS="Symbol(test)"==String(_S("test")),LS=/^Symbol\((.*)\)[^)]+$/;ES(RS,"description",{configurable:!0,get:function(){var e=TS(this)?this.valueOf():this,t=IS.call(e);if(gS(CS,e))return "";var n=MS?t.slice(7,-1):t.replace(LS,"$1");return ""===n?void 0:n}}),yS({global:!0,forced:!0},{Symbol:OS});}oh("iterator");var xS=or,HS=L,kS=[].join,PS=O!=Object,AS=bp("join",",");xS({target:"Array",proto:!0,forced:PS||!AS},{join:function(e){return kS.call(HS(this),void 0===e?",":e)}});function DS(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function FS(e,t){if(e){if("string"==typeof e)return DS(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return "Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?DS(e,t):void 0}}function US(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],i=!0,s=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);i=!0);}catch(e){s=!0,o=e;}finally{try{i||null==n.return||n.return();}finally{if(s)throw o}}return a}}(e,t)||FS(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var jS=tt.f,JS=Xr,BS=Wa,YS=Ei,GS=Ki,KS=Gi,VS=Ta,XS=bl,qS=v,QS=Za.exports.fastKey,WS=Bt.set,ZS=Bt.getterFor;ps("Map",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),{getConstructor:function(e,t,n,r){var o=e((function(e,a){GS(e,o,t),WS(e,{type:t,index:JS(null),first:void 0,last:void 0,size:0}),qS||(e.size=0),null!=a&&KS(a,e[r],{that:e,AS_ENTRIES:n});})),a=ZS(t),i=function(e,t,n){var r,o,i=a(e),c=s(e,t);return c?c.value=n:(i.last=c={index:o=QS(t,!0),key:t,value:n,previous:r=i.last,next:void 0,removed:!1},i.first||(i.first=c),r&&(r.next=c),qS?i.size++:e.size++,"F"!==o&&(i.index[o]=c)),e},s=function(e,t){var n,r=a(e),o=QS(t);if("F"!==o)return r.index[o];for(n=r.first;n;n=n.next)if(n.key==t)return n};return BS(o.prototype,{clear:function(){for(var e=a(this),t=e.index,n=e.first;n;)n.removed=!0,n.previous&&(n.previous=n.previous.next=void 0),delete t[n.index],n=n.next;e.first=e.last=void 0,qS?e.size=0:this.size=0;},delete:function(e){var t=a(this),n=s(this,e);if(n){var r=n.next,o=n.previous;delete t.index[n.index],n.removed=!0,o&&(o.next=r),r&&(r.previous=o),t.first==n&&(t.first=r),t.last==n&&(t.last=o),qS?t.size--:this.size--;}return !!n},forEach:function(e){for(var t,n=a(this),r=YS(e,arguments.length>1?arguments[1]:void 0,3);t=t?t.next:n.first;)for(r(t.value,t.key,this);t&&t.removed;)t=t.previous;},has:function(e){return !!s(this,e)}}),BS(o.prototype,n?{get:function(e){var t=s(this,e);return t&&t.value},set:function(e,t){return i(this,0===e?0:e,t)}}:{add:function(e){return i(this,e=0===e?0:e,e)}}),qS&&jS(o.prototype,"size",{get:function(){return a(this).size}}),o},setStrong:function(e,t,n){var r=t+" Iterator",o=ZS(t),a=ZS(r);VS(e,t,(function(e,t){WS(this,{type:r,target:e,state:o(e),kind:t,last:void 0});}),(function(){for(var e=a(this),t=e.kind,n=e.last;n&&n.removed;)n=n.previous;return e.target&&(e.last=n=n?n.next:e.state.first)?"keys"==t?{value:n.key,done:!1}:"values"==t?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(e.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),XS(t);}});var $S=En.includes,zS=Ro;or({target:"Array",proto:!0},{includes:function(e){return $S(this,e,arguments.length>1?arguments[1]:void 0)}}),zS("includes");var ey=k,ty=w,ny=xe("match"),ry=function(e){var t;return ey(e)&&(void 0!==(t=e[ny])?!!t:"RegExp"==ty(e))},oy=ry,ay=xe("match"),iy=function(e){if(oy(e))throw TypeError("The method doesn't accept regular expressions");return e},sy=R,cy=Da;or({target:"String",proto:!0,forced:!function(e){var t=/./;try{"/./"[e](t);}catch(n){try{return t[ay]=!1,"/./"[e](t)}catch(e){}}return !1}("includes")},{includes:function(e){return !!~cy(sy(this)).indexOf(cy(iy(e)),arguments.length>1?arguments[1]:void 0)}});var ly=df,uy=ry,dy=rt,fy=R,hy=_l,py=hf,vy=Sn,Sy=Da,yy=ie,Ny=Ef,my=nf,gy=p,by=Hd.UNSUPPORTED_Y,Ty=[].push,Ey=Math.min;function wy(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}ly("split",(function(e,t,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var r=Sy(fy(this)),o=void 0===n?4294967295:n>>>0;if(0===o)return [];if(void 0===e)return [r];if(!uy(e))return t.call(r,e,o);for(var a,i,s,c=[],l=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),u=0,d=new RegExp(e.source,l+"g");(a=my.call(d,r))&&!((i=d.lastIndex)>u&&(c.push(r.slice(u,a.index)),a.length>1&&a.index<r.length&&Ty.apply(c,a.slice(1)),s=a[0].length,u=i,c.length>=o));)d.lastIndex===a.index&&d.lastIndex++;return u===r.length?!s&&d.test("")||c.push(""):c.push(r.slice(u)),c.length>o?c.slice(0,o):c}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:t.call(this,e,n)}:t,[function(t,n){var o=fy(this),a=null==t?void 0:yy(t,e);return a?a.call(t,o,n):r.call(Sy(o),t,n)},function(e,o){var a=dy(this),i=Sy(e),s=n(r,a,i,o,r!==t);if(s.done)return s.value;var c=hy(a,RegExp),l=a.unicode,u=(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.unicode?"u":"")+(by?"g":"y"),d=new c(by?"^(?:"+a.source+")":a,u),f=void 0===o?4294967295:o>>>0;if(0===f)return [];if(0===i.length)return null===Ny(d,i)?[i]:[];for(var h=0,p=0,v=[];p<i.length;){d.lastIndex=by?0:p;var S,y=Ny(d,by?i.slice(p):i);if(null===y||(S=Ey(vy(d.lastIndex+(by?p:0)),i.length))===h)p=py(i,p,l);else {if(v.push(i.slice(h,p)),v.length===f)return v;for(var N=1;N<=y.length-1;N++)if(v.push(y[N]),v.length===f)return v;p=h=S;}}return v.push(i.slice(h)),v}]}),!!gy((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]})),by);var _y=function(t){po(a,Fp);var o=wy(a);function a(){var t;e(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return r(fo(t=o.call.apply(o,[this].concat(i))),"controller",void 0),t}return n(a,[{key:"initialise",value:function(){}},{key:"display",value:function(){console.log("got to view display"),this.refreshHeader(),this.body();}},{key:"refreshHeader",value:function(){}},{key:"body",value:function(){}},{key:"card",value:function(e){var t=document.createElement("div");t.id=e.cardId,t.className="card";var n=t.appendChild(document.createElement("div"));n.className="card-header pointer",e.cardHeadingId&&(n.id=e.cardHeadingId),n.setAttribute("data-toggle","collapse"),n.setAttribute("data-target","#".concat(e.cardDescriptionId));var r=n.appendChild(document.createElement("h2"));r.className="mb-0";var o=r.appendChild(document.createElement("button"));if(o.className="btn btn-link".concat(e.collapsed?" collapsed":""),e.headingButtonId&&(o.id=e.headingButtonId),o.type="button",o.setAttribute("data-toggle","collapse"),e.buttonStyleString&&(o.style.cssText=e.buttonStyleString),e.cardDescriptionId&&(o.setAttribute("data-target","#".concat(e.cardDescriptionId)),o.setAttribute("aria-controls",e.cardDescriptionId)),o.setAttribute("aria-expanded",e.collapsed?"false":"true"),o.innerHTML=e.headingHTML,e.headingNonbuttonHTML){var a=r.appendChild(document.createElement("span"));a.style.display="inline-block",a.innerHTML=e.headingNonbuttonHTML;}if(e.headingValidationWarningHTML){var i=n.appendChild(document.createElement("div"));i.className="card-invalid-feedback",i.innerHTML="<small>".concat(e.headingValidationWarningHTML,"</small>");}var s=t.appendChild(document.createElement("div"));if(e.cardDescriptionId&&(s.id=e.cardDescriptionId),s.className="collapse".concat(e.collapsed?"":" show"),e.cardHeadingId&&s.setAttribute("aria-labelledby",e.cardHeadingId),s.setAttribute("data-parent","#".concat(e.parentContainerId)),e.dataAttributes)for(var c in e.dataAttributes)e.dataAttributes.hasOwnProperty(c)&&s.setAttribute("data-".concat(c),e.dataAttributes[c]);var l=s.appendChild(document.createElement("div"));return l.className="card-body pl-2 pr-2 pl-md-3 pr-md-3",l.appendChild(e.bodyContentElement),t}}]),a}();function Cy(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}var Oy=function(t){po(o,_y);var r=Cy(o);function o(){return e(this,o),r.apply(this,arguments)}return n(o,[{key:"body",value:function(){document.getElementById("body").innerHTML='<h2>Page not found</h2><p><a href="/app/list">Return to the homepage.</a>';}}]),o}();function Ry(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}var Iy=function(t){po(a,gv);var o=Ry(a);function a(t){var n;return e(this,a),r(fo(n=o.call(this)),"_survey",void 0),r(fo(n),"section",void 0),n.section=t,n}return n(a,[{key:"formElement",get:function(){var e=Lc(yo(a.prototype),"formElement",this);return this._formFieldsBuilt||this.buildFormFields(),e}},{key:"updateModelFromContent",value:function(){for(var e in console.log("updating survey from SurveyForm content"),this.fields)if(this.fields.hasOwnProperty(e)){var t=this.fields[e];this._survey.attributes[e]=t.value;}console.log({survey:this._survey});}},{key:"model",get:function(){return this._survey},set:function(e){this._survey=e,this.populateFormContent();}},{key:"changeHandler",value:function(e){console.log("survey form change event"),console.log({event:e}),this.fireEvent(gv.CHANGE_EVENT,{form:this});}},{key:"destructor",value:function(){Lc(yo(a.prototype),"destructor",this).call(this),this._survey=null;}},{key:"initialiseFormFields",value:function(){var e=this.section.properties;for(var t in this.fields={},e)e.hasOwnProperty(t)&&(this.fields[t]=new e[t].field(e[t].attributes));}},{key:"getFormSectionProperties",value:function(){return this.section.properties}}],[{key:"registerSection",value:function(e){a.sections[e.sectionSortOrder]=e,a.sectionsByKey[e.sectionNavigationKey]=e;}}]),a}();function My(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}r(Iy,"sections",[]),r(Iy,"sectionsByKey",{});var Ly=function(t){po(a,Gp);var o=My(a);function a(){var t;e(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return r(fo(t=o.call.apply(o,[this].concat(i))),"SAVE_ENDPOINT","/savesurvey.php"),r(fo(t),"TYPE","survey"),r(fo(t),"attributes",{}),t}return n(a,[{key:"formChangedHandler",value:function(e){console.log("Survey change handler invoked."),e.form.updateModelFromContent(),e.form.conditionallyValidateForm(),this.touch(),this.fireEvent(a.EVENT_MODIFIED,{surveyId:this.id});}},{key:"registerForm",value:function(e){e.model=this,e.addListener(gv.CHANGE_EVENT,this.formChangedHandler.bind(this));}},{key:"save",value:function(){if(this._savedRemotely)return Promise.reject("".concat(this.id," has already been saved."));var e=new FormData;return e.append("type",this.TYPE),e.append("surveyId",this.id),e.append("id",this.id),e.append("projectId",this.projectId.toString()),e.append("attributes",JSON.stringify(this.attributes)),e.append("deleted",this.deleted.toString()),e.append("created",this.createdStamp.toString()),console.log("queueing survey post"),this.queuePost(e)}},{key:"generateSurveyName",value:function(){var e,t=(this.attributes.place||this.attributes.georef||"(unlocalised)").trim(),n=new Date(1e3*this.createdStamp);try{e=n.toLocaleString("default",{year:"numeric",month:"long",day:"numeric"});}catch(t){e=n.toLocaleString("en-GB",{year:"numeric",month:"long",day:"numeric"});}return "".concat(Xp(t)," ").concat(e)}}]),a}();function xy(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}r(Ly,"EVENT_MODIFIED","modified");var Hy=function(t){po(a,Gp);var o=xy(a);function a(){var t;e(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return r(fo(t=o.call.apply(o,[this].concat(i))),"file",void 0),r(fo(t),"TYPE","image"),r(fo(t),"SAVE_ENDPOINT","/saveimage.php"),t}return n(a,[{key:"getUrl",value:function(){}},{key:"save",value:function(e,t,n){if(this._savedRemotely)return Promise.reject("".concat(this.id," has already been saved."));var r=new FormData;return r.append("type",this.TYPE),r.append("surveyId",e||""),r.append("occurrenceId",t||this.occurrenceId),r.append("projectId",n?n.toString():""),r.append("imageId",this.id),r.append("id",this.id),r.append("image",this.file),r.append("deleted",this.deleted.toString()),console.log("queueing image post, image id ".concat(this.id)),this.queuePost(r)}},{key:"_parseDescriptor",value:function(e){Lc(yo(a.prototype),"_parseDescriptor",this).call(this,e),this.surveyId=e.surveyId,this.occurrenceId=e.occurrenceId,this.file=e.image;}}],[{key:"fromFile",value:function(e){var t=new a;return t.file=e,t}},{key:"placeholder",value:function(e){var t=new a;return t._id=e,a.imageCache.set(e,t),t}},{key:"imageLink",value:function(e,t,n,r){t=t||0,n=n||0;var o="";r.className&&(o+=' class="'.concat(r.className,'"'));var a=t>n?'width="'.concat(t,'"'):'height="'.concat(n,'"');return '<picture><source srcset="/image.php?imageid='.concat(e,'&amp;height=128&amp;format=webp" type="image/webp"><img').concat(o,' src="/image.php?imageid=').concat(e,"&amp;width=").concat(t,"&amp;height=").concat(n,'&amp;format=jpeg" ').concat(a,' alt="photo"></picture>')}}]),a}();function ky(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return Py(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Py(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return {s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return {s:function(){n=n.call(e);},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,a=e;},f:function(){try{i||null==n.return||n.return();}finally{if(s)throw a}}}}function Py(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Ay(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}function Dy(e,t,n){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,n);}r(Hy,"imageCache",new Map),r(Hy,"EVENT_MODIFIED","modified");var Fy=new WeakMap,Uy=new WeakMap,jy=function(t){po(a,Fp);var o=Ay(a);function a(){var t;return e(this,a),Dy(fo(t=o.call(this)),Fy,{writable:!0,value:void 0}),Dy(fo(t),Uy,{writable:!0,value:void 0}),r(fo(t),"controllers",[]),r(fo(t),"currentControllerHandle",!1),r(fo(t),"routeHistory",[]),r(fo(t),"occurrences",void 0),r(fo(t),"surveys",void 0),r(fo(t),"currentSurvey",void 0),r(fo(t),"layout",void 0),t.reset(),t}return n(a,[{key:"reset",value:function(){this.surveys=new Map,this.clearCurrentSurvey();}},{key:"clearCurrentSurvey",value:function(){this.occurrences=new Map,this.currentSurvey=null;}},{key:"router",get:function(){return go(this,Fy)},set:function(e){mo(this,Fy,e);}},{key:"containerId",set:function(e){var t=document.getElementById(e);if(!t)throw new Error("App container '".concat(e,"' not found."));mo(this,Uy,t);}},{key:"container",get:function(){return go(this,Uy)}},{key:"registerController",value:function(e){e.handle=this.controllers.length,this.controllers[this.controllers.length]=e,e.app=this,e.registerRoute(go(this,Fy));}},{key:"initialise",value:function(){var e=this;this.layout.initialise(),go(this,Fy).notFound((function(e){console.log("no route found for '".concat(e,"'")),(new Oy).display();})),go(this,Fy).on((function(){console.log("redirecting from '/' to '/list'"),go(e,Fy).pause(),e.currentSurvey&&e.currentSurvey.isPristine?go(e,Fy).navigate("/list/survey/welcome").resume():go(e,Fy).navigate("/list").resume(),go(e,Fy).resolve();}));var t,n=ky(this.controllers);try{for(n.s();!(t=n.n()).done;){t.value.initialise();}}catch(e){n.e(e);}finally{n.f();}}},{key:"display",value:function(){console.log("App display"),go(this,Fy).resolve();}},{key:"saveRoute",value:function(){var e=go(this,Fy).lastRouteResolved();this.routeHistory.length?this.routeHistory[this.routeHistory.length-1]!==e&&(this.routeHistory[this.routeHistory.length]=e):this.routeHistory[0]=e;}},{key:"markAllNotPristine",value:function(){var e,t=ky(this.occurrences);try{for(t.s();!(e=t.n()).done;){e.value[1].isPristine=!1;}}catch(e){t.e(e);}finally{t.f();}}},{key:"setLayout",value:function(e){this.layout=e,e.setApp(this);}},{key:"addSurvey",value:function(e){var t=this;if(e.projectId!==this.projectId)throw new Error("Survey project id '".concat(e.projectId," does not match with current project ('").concat(this.projectId,"')"));this.surveys.has(e.id)||(console.log("setting survey's modified/save handler"),e.addListener(Ly.EVENT_MODIFIED,(function(){return t.fireEvent(a.EVENT_SURVEYS_CHANGED),e.save()}))),this.surveys.set(e.id,e),this.fireEvent(a.EVENT_SURVEYS_CHANGED);}},{key:"haveExtantOccurrences",value:function(){var e,t=ky(this.occurrences);try{for(t.s();!(e=t.n()).done;){if(!e.value.deleted)return !0}}catch(e){t.e(e);}finally{t.f();}return !1}},{key:"addOccurrence",value:function(e){var t=this;if(!e.surveyId)throw new Cv("Survey id must set prior to registering occurrence.");0===this.occurrences.size&&(this.surveys.get(e.surveyId).createdStamp=e.createdStamp);console.log("in addOccurrence setting id '".concat(e.id,"'")),this.occurrences.set(e.id,e),e.addListener(wv.EVENT_MODIFIED,(function(){var n=t.surveys.get(e.surveyId);if(!n)throw new Error("Failed to look up survey id ".concat(e.surveyId));n.isPristine=!1,n.unsaved()&&n.save(),e.save(n.id);}));}},{key:"refreshFromServer",value:function(e){var t,n=this,r=new FormData,o=0,a=ky(e);try{for(a.s();!(t=a.n()).done;){var i=t.value;r.append("surveyId[".concat(o++,"]"),i);}}catch(e){a.e(e);}finally{a.f();}return fetch(ExampleApp.LOAD_SURVEYS_ENDPOINT,{method:"POST",body:r}).then((function(e){return e.ok?e.json():Promise.reject("Invalid response from server when refreshing survey ids")})).then((function(e){console.log({"refresh from server json response":e});var t=[];for(var r in e)if(e.hasOwnProperty(r)){var o,a=ky(e[r]);try{for(a.s();!(o=a.n()).done;){var i=o.value;t.push(n._conditionallyReplaceObject(i));}}catch(e){a.e(e);}finally{a.f();}}return Promise.all(t)}))}},{key:"_conditionallyReplaceObject",value:function(e){var t=e.type,n=e.id,r="".concat(t,".").concat(n);return jp.getItem(r).then((function(t){return t&&!e.deleted&&t.modified>=e.modified?(console.log("Local copy of ".concat(r," is the same or newer than the server copy. (").concat(t.modified," >= ").concat(e.modified,") ")),Promise.resolve()):(console.log("Adding or replacing local copy of ".concat(r)),jp.setItem(r,e))}))}},{key:"seekKeys",value:function(e){return jp.keys().then((function(t){var n,r=ky(t);try{for(r.s();!(n=r.n()).done;){var o,a,i=n.value,s=US(i.split(".",2),2);o=s[0],a=s[1],e.hasOwnProperty(o)?e[o].includes(a)||e[o].push(a):console.log("Unrecognised stored key type '".concat(o,"."));}}catch(e){r.e(e);}finally{r.f();}return e}))}},{key:"syncAll",value:function(){var e=this;return this.seekKeys({survey:[],occurrence:[],image:[]}).then((function(t){return e._syncLocalUnsaved(t)}),(function(e){return console.log("Failed to sync all: ".concat(e)),!1}))}},{key:"_syncLocalUnsaved",value:function(e){var t,n=[],r=ky(e.survey);try{for(r.s();!(t=r.n()).done;){var o=t.value;n.push(Ly.retrieveFromLocal(o,new Ly).then((function(e){if(e.unsaved())return e.save()})));}}catch(e){r.e(e);}finally{r.f();}var a,i=ky(e.occurrence);try{for(i.s();!(a=i.n()).done;){var s=a.value;n.push(wv.retrieveFromLocal(s,new wv).then((function(e){if(e.unsaved())return e.save()})));}}catch(e){i.e(e);}finally{i.f();}var c,l=ky(e.image);try{for(l.s();!(c=l.n()).done;){var u=c.value;n.push(Hy.retrieveFromLocal(u,new Hy).then((function(e){if(e.unsaved())return e.save()})));}}catch(e){l.e(e);}finally{l.f();}return Promise.all(n).catch((function(e){console.log("Save failure: ".concat(e));}))}},{key:"restoreOccurrences",value:function(e){var t=this;if(this.surveys.has(e)){var n=this.surveys.get(e);if(n.isPristine)return this.clearCurrentSurvey(),this.currentSurvey=n,this.fireEvent(a.EVENT_SURVEYS_CHANGED),Promise.resolve()}var r={survey:[],occurrence:[],image:[]};return e&&(r.survey[0]=e),console.log("pre-seek keys"),console.log(r),this.seekKeys(r).then((function(e){return e.survey.length?t.refreshFromServer(e.survey).finally((function(){return t.seekKeys(e)})):null})).finally((function(){return r.survey.length?t._restoreSurveyFromLocal(r.survey[0],r).finally((function(){return t.currentSurvey=t.surveys.get(r.survey[0]),t.currentSurvey?(t.currentSurvey.deleted?t.setNewSurvey():t.fireEvent(a.EVENT_SURVEYS_CHANGED),Promise.resolve()):(console.log("Failed to retrieve survey id '".concat(e,"'")),Promise.reject(new Error("Failed to retrieve survey id '".concat(e,"'"))))})):(t.setNewSurvey(),Promise.resolve())}))}},{key:"setNewSurvey",value:function(){this.currentSurvey=new Ly,this.currentSurvey.projectId=this.projectId,this.currentSurvey.isPristine=!0,this.addSurvey(this.currentSurvey);}},{key:"addNewOccurrence",value:function(){var e=new wv;return e.surveyId=this.currentSurvey.id,e.projectId=this.projectId,e.isNew=!0,e.isPristine=!0,this.addOccurrence(e),this.fireEvent(ExampleApp.EVENT_OCCURRENCE_ADDED,{occurrenceId:e.id,surveyId:e.surveyId}),e}},{key:"_restoreSurveyFromLocal",value:function(e,t){var n=this;return Ly.retrieveFromLocal(e,new Ly).then((function(r){n.clearCurrentSurvey(),n.addSurvey(r);var o,a=[],i=ky(t.occurrence);try{var s=function(){var t=o.value;a.push(wv.retrieveFromLocal(t,new wv).then((function(r){r.surveyId===e&&(console.log("adding occurrence ".concat(t)),n.addOccurrence(r));})));};for(i.s();!(o=i.n()).done;)s();}catch(e){i.e(e);}finally{i.f();}return Promise.all(a)})).finally((function(){var n,r=[],o=ky(t.image);try{var a=function(){var t=n.value;r.push(Hy.retrieveFromLocal(t,new Hy).then((function(n){console.log("restoring image id '".concat(t,"'")),n.surveyId===e&&Hy.imageCache.set(t,n);}),(function(e){console.log("Failed to retrieve an image: ".concat(e));})));};for(o.s();!(n=o.n()).done;)a();}catch(e){o.e(e);}finally{o.f();}return Promise.all(r)}))}},{key:"clearLocalForage",value:function(){return jp.clear()}}]),a}();function Jy(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return By(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return By(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return {s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return {s:function(){n=n.call(e);},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,a=e;},f:function(){try{i||null==n.return||n.return();}finally{if(s)throw a}}}}function By(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Yy(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}r(jy,"EVENT_ADD_SURVEY_USER_REQUEST","useraddsurveyrequest"),r(jy,"EVENT_RESET_SURVEYS","userresetsurveys"),r(jy,"LOAD_SURVEYS_ENDPOINT","/loadsurveys.php"),r(jy,"EVENT_OCCURRENCE_ADDED","occurrenceadded"),r(jy,"EVENT_SURVEYS_CHANGED","surveyschanged"),r(jy,"devMode",!1);var Gy=function(t){po(a,Fp);var o=Yy(a);function a(){var t;e(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return r(fo(t=o.call.apply(o,[this].concat(i))),"app",void 0),r(fo(t),"surveysMenuId",void 0),t}return n(a,[{key:"setApp",value:function(e){var t=this;this.app=e,e.addListener(jy.EVENT_SURVEYS_CHANGED,(function(){t.refreshSurveysMenu();}));}},{key:"initialise",value:function(){var e=this;this.refreshSurveysMenu();var t=document.createElement("div");t.innerHTML='\x3c!-- begin: templates/newSurveyModal.html --\x3e\r\n<div class="modal fade" id="newsurveymodal" tabindex="-1" role="dialog" aria-labelledby="newsurveymodalTitle" aria-hidden="true">\r\n    <div class="modal-dialog modal-dialog-centered" role="document">\r\n        <div class="modal-content">\r\n            <div class="modal-header">\r\n                <h5 class="modal-title" id="newsurveymodalTitle">Start a new survey?</h5>\r\n                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\r\n                    <span aria-hidden="true">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class="modal-body">\r\n                Please confirm that you wish to start a new survey. You only need to do this if you wish to send a set of records from a different locality, otherwise please add more records to your current report.\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button" class="btn btn-secondary" data-dismiss="modal">Back</button>\r\n                <button type="button" class="btn btn-danger" data-dismiss="modal" id="newsurveymodalconfirmed">New survey</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\x3c!-- end: templates/newSurveyModal.html --\x3e\r\n',document.body.appendChild(t.getElementsByTagName("div")[0]),(t=document.createElement("div")).innerHTML='\x3c!-- begin: templates/resetModal.html --\x3e\r\n<div class="modal fade" id="resetmodal" tabindex="-1" role="dialog" aria-labelledby="resetmodalTitle" aria-hidden="true">\r\n    <div class="modal-dialog modal-dialog-centered" role="document">\r\n        <div class="modal-content">\r\n            <div class="modal-header">\r\n                <h5 class="modal-title" id="resetmodalTitle">Reset?</h5>\r\n                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\r\n                    <span aria-hidden="true">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class="modal-body">\r\n                Please confirm that you wish to clear out your survey data.\r\n                <p>Warning: any unsaved changes will be lost.</p>\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button" class="btn btn-secondary" data-dismiss="modal">Back</button>\r\n                <button type="button" class="btn btn-danger" data-dismiss="modal" id="resetmodalconfirmed">Reset</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\x3c!-- end: templates/resetModal.html --\x3e\r\n',document.body.appendChild(t.getElementsByTagName("div")[0]),(t=document.createElement("div")).innerHTML='\x3c!-- begin: templates/syncSuccessModal.html --\x3e\r\n<div class="modal fade" id="saveallsuccess" tabindex="-1" role="dialog" aria-labelledby="saveallsuccessTitle" aria-hidden="true">\r\n    <div class="modal-dialog modal-dialog-centered" role="document">\r\n        <div class="modal-content">\r\n            <div class="modal-header">\r\n                <h5 class="modal-title" id="saveallsuccessTitle">All records sent</h5>\r\n                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\r\n                    <span aria-hidden="true">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class="modal-body">\r\n                Your data has been synchronised with the server.\r\n                <p>Thank you.</p>\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\x3c!-- end: templates/syncSuccessModal.html --\x3e\r\n',document.body.appendChild(t.getElementsByTagName("div")[0]),(t=document.createElement("div")).innerHTML='\x3c!-- begin: templates/syncFailureModal.html --\x3e\r\n<div class="modal fade" id="saveallfailure" tabindex="-1" role="dialog" aria-labelledby="saveallfailureTitle" aria-hidden="true">\r\n    <div class="modal-dialog modal-dialog-centered" role="document">\r\n        <div class="modal-content">\r\n            <div class="modal-header">\r\n                <h5 class="modal-title" id="saveallfailureTitle">One or more records could not be saved</h5>\r\n                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\r\n                    <span aria-hidden="true">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class="modal-body">\r\n                Please check your connection to the network and try again.\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\x3c!-- end: templates/syncFailureModal.html --\x3e\r\n',document.body.appendChild(t.getElementsByTagName("div")[0]),setTimeout((function(){document.getElementById("".concat(a.NEW_SURVEY_MODAL_ID,"confirmed")).addEventListener("click",(function(t){e.app.fireEvent(jy.EVENT_ADD_SURVEY_USER_REQUEST);})),document.getElementById("".concat(a.RESET_MODAL_ID,"confirmed")).addEventListener("click",(function(t){e.app.fireEvent(jy.EVENT_RESET_SURVEYS);}));}),100);}},{key:"refreshSurveysMenu",value:function(){var e,t=document.getElementById(this.surveysMenuId),n=[],r=this.app.currentSurvey?this.app.currentSurvey.id:null,o=Jy(this.app.surveys);try{for(o.s();!(e=o.n()).done;){var a=e.value,i=a[1].generateSurveyName()+(a[0]===r?' <span style="color: green">●</span>':"");n[n.length]='<a class="dropdown-item" href="/app/survey/add/'.concat(a[0],'" data-navigo="survey/add/').concat(a[0],'">').concat(i,"</a>");}}catch(e){o.e(e);}finally{o.f();}t.innerHTML='<a class="dropdown-item" href="/app/survey/save" data-navigo="survey/save">save all</a>\n    <div class="dropdown-divider"></div>\n    '.concat(n.join(""),'\n    <div class="dropdown-divider"></div>\n    <a class="dropdown-item" href="/app/survey/new" data-navigo="survey/new">new survey</a>\n    <a class="dropdown-item" href="/app/survey/reset" data-navigo="survey/reset">reset</a>'),this.app.router.updatePageLinks();}}]),a}();function Ky(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}r(Gy,"NEW_SURVEY_MODAL_ID","newsurveymodal"),r(Gy,"RESET_MODAL_ID","resetmodal"),r(Gy,"SAVE_ALL_SUCCESS_MODAL_ID","saveallsuccess"),r(Gy,"SAVE_ALL_FAILURE_MODAL_ID","saveallfailure");var Vy=function(t){po(a,s);var o=Ky(a);function a(t){var n;return e(this,a),r(fo(n=o.call(this)),"route","/survey/:action/:id"),r(fo(n),"title","Survey picker"),r(fo(n),"app",void 0),r(fo(n),"view",void 0),n.view=t,t.controller=fo(n),n.handle=s.nextHandle,n}return n(a,[{key:"survey",get:function(){return this.app.currentSurvey}},{key:"registerRoute",value:function(e){e.on("/survey",this.mainRouteHandler.bind(this,"survey","",""),{}),e.on("/survey/new",this.newSurveyHandler.bind(this,"survey","new",""),{before:this.beforeNewHandler.bind(this)}),e.on("/survey/reset",this.mainRouteHandler.bind(this,"survey","reset",""),{before:this.beforeResetHandler.bind(this)}),e.on("/survey/save",this.mainRouteHandler.bind(this,"survey","save",""),{before:this.beforeSaveAllHandler.bind(this)}),e.on("/survey/add/:surveyId",this.addSurveyHandler.bind(this,"survey","add","")),this.app.addListener(jy.EVENT_ADD_SURVEY_USER_REQUEST,this.addNewSurveyHandler.bind(this)),this.app.addListener(jy.EVENT_RESET_SURVEYS,this.resetSurveysHandler.bind(this));}},{key:"beforeNewHandler",value:function(e){$("#".concat(Gy.NEW_SURVEY_MODAL_ID)).modal(),this.app.router.pause(),window.history.back(),this.app.router.resume(),e(!1);}},{key:"beforeResetHandler",value:function(e){$("#".concat(Gy.RESET_MODAL_ID)).modal(),this.app.router.pause(),window.history.back(),this.app.router.resume(),e(!1);}},{key:"beforeSaveAllHandler",value:function(e){this.app.syncAll().then((function(e){console.log("In save all handler, success result: ".concat(e)),Array.isArray(e)?$("#".concat(Gy.SAVE_ALL_SUCCESS_MODAL_ID)).modal():$("#".concat(Gy.SAVE_ALL_FAILURE_MODAL_ID)).modal();}),(function(e){console.log("In save all handler, failure result: ".concat(e)),$("#".concat(Gy.SAVE_ALL_FAILURE_MODAL_ID)).modal();})).finally((function(){})),this.app.router.pause(),window.history.back(),this.app.router.resume(),e(!1);}},{key:"newSurveyHandler",value:function(e,t,n,r){}},{key:"addNewSurveyHandler",value:function(){console.log("reached addNewSurveyHandler"),this.app.currentControllerHandle=this.handle,this.app.clearCurrentSurvey(),this.app.setNewSurvey(),this.app.router.pause(),this.app.router.navigate("/list/survey/welcome").resume(),this.app.router.resolve();}},{key:"resetSurveysHandler",value:function(){var e=this;this.app.clearLocalForage().then((function(){e.app.reset(),e.addNewSurveyHandler();}));}},{key:"addSurveyHandler",value:function(e,t,n,r){var o=this;console.log("reached addSurveyHandler"),console.log({context:e,params:t,query:r}),this.app.currentControllerHandle=this.handle;var a=r.surveyId;if(!a||!a.match(Yp))throw new Mc("Failed to match survey id '".concat(a,"', the id format appears to be incorrect"));a=a.toLowerCase(),this.app.restoreOccurrences(a).then((function(){o.app.markAllNotPristine(),o.app.router.pause(),o.app.router.navigate("/list").resume(),o.app.router.resolve();}),(function(e){console.log({"failed survey restoration":e});}));}},{key:"mainRouteHandler",value:function(e,t,n,r){console.log("reached special route handler for SurveyPickerController.js"),console.log({context:e,params:t,query:r});}}]),a}();r(Vy,"EVENT_BACK","back");var Xy=or,qy=ta,Qy=R,Wy=Sn,Zy=Da,$y=rt,zy=ry,eN=tl,tN=ie,nN=ft.exports,rN=p,oN=_l,aN=hf,iN=Ef,sN=Bt,cN=xe("matchAll"),lN=sN.set,uN=sN.getterFor("RegExp String Iterator"),dN=RegExp.prototype,fN="".matchAll,hN=!!fN&&!rN((function(){"a".matchAll(/./);})),pN=qy((function(e,t,n,r){lN(this,{type:"RegExp String Iterator",regexp:e,string:t,global:n,unicode:r,done:!1});}),"RegExp String",(function(){var e=uN(this);if(e.done)return {value:void 0,done:!0};var t=e.regexp,n=e.string,r=iN(t,n);return null===r?{value:void 0,done:e.done=!0}:e.global?(""===Zy(r[0])&&(t.lastIndex=aN(n,Wy(t.lastIndex),e.unicode)),{value:r,done:!1}):(e.done=!0,{value:r,done:!1})})),vN=function(e){var t,n,r,o,a,i,s=$y(this),c=Zy(e);return t=oN(s,RegExp),void 0===(n=s.flags)&&s instanceof RegExp&&!("flags"in dN)&&(n=eN.call(s)),r=void 0===n?"":Zy(n),o=new t(t===RegExp?s.source:s,r),a=!!~r.indexOf("g"),i=!!~r.indexOf("u"),o.lastIndex=Wy(s.lastIndex),new pN(o,c,a,i)};Xy({target:"String",proto:!0,forced:hN},{matchAll:function(e){var t,n,r=Qy(this);if(null!=e){if(zy(e)&&!~Zy(Qy("flags"in dN?e.flags:eN.call(e))).indexOf("g"))throw TypeError("`.matchAll` does not allow non-global regexes");if(hN)return fN.apply(r,arguments);if(n=tN(e,cN))return n.call(e,r)}else if(hN)return fN.apply(r,arguments);return t=Zy(r),new RegExp(e,"g")[cN](t)}}),cN in dN||nN(dN,cN,vN);var SN=Ms.map;function yN(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return NN(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return NN(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return {s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return {s:function(){n=n.call(e);},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,a=e;},f:function(){try{i||null==n.return||n.return();}finally{if(s)throw a}}}}function NN(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}or({target:"Array",proto:!0,forced:!Uc("map")},{map:function(e){return SN(this,e,arguments.length>1?arguments[1]:void 0)}});var mN=function(){function t(){e(this,t);}return n(t,null,[{key:"fromPostedData",value:function(e){var n,r={saveState:"SAVED_LOCALLY"},o=yN(e.entries());try{for(o.s();!(n=o.n()).done;){var a=n.value;r[a[0]]=a[1];}}catch(e){o.e(e);}finally{o.f();}if(!r.type)throw new Error("Missing type in form data.");if(t.responses.hasOwnProperty(r.type))return new t.responses[r.type](r,{});throw new Error("Unrecognised post type '".concat(r.type,"'"))}},{key:"fromPostResponse",value:function(e){if(!e)throw new Error("Invalid empty post response.");if(!e.type)throw new Error("Missing type in returned response.");if(t.responses.hasOwnProperty(e.type))return console.log("in fromPostResponse returning a ".concat(e.type)),new t.responses[e.type]({},e);throw new Error("Unrecognised post type '".concat(e.type,"'"))}}]),t}();function gN(e){var t=new Headers;return t.set("Content-Type","application/json"),new Response(JSON.stringify(e),{status:e.error?500:200,headers:t})}r(mN,"responses",{});var bN=function(){function t(n,o){e(this,t),r(this,"toSaveLocally",void 0),r(this,"returnedToClient",void 0),r(this,"prebuiltResponse",void 0),r(this,"failureErrorMessage","Failed to save a local copy on your device."),r(this,"failureErrorHelp","Your internet connection may have failed (or there could be a problem with the server). It wasn't possible to save a temporary copy on your device. Perhaps there is insufficient space? Please try to re-establish a network connection and try again."),this.toSaveLocally=n,this.returnedToClient=o;}return n(t,[{key:"setPrebuiltResponse",value:function(e){return this.prebuiltResponse=e,this}},{key:"storeLocally",value:function(){var e=this;return jp.setItem(this.localKey(),this.toSaveLocally).then((function(){return console.log("Stored object ".concat(e.localKey()," locally")),e.prebuiltResponse?e.prebuiltResponse:gN(e.returnedToClient)}),(function(t){return console.log("Failed to store object ".concat(e.localKey()," locally")),console.log({reason:t}),e.returnedToClient.error=e.failureErrorMessage,e.returnedToClient.errorHelp=e.failureErrorHelp,gN(e.returnedToClient)}))}},{key:"localKey",value:function(){throw new Error("LocalKey must be implemented in a subclass for ".concat(this.toSaveLocally.type))}}]),t}();function TN(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}var EN=function(t){po(a,bN);var o=TN(a);function a(){var t;e(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return r(fo(t=o.call.apply(o,[this].concat(i))),"failureErrorMessage","Failed to store image."),r(fo(t),"failureErrorHelp","Your internet connection may have failed (or there could be a problem with the server). It wasn't possible to save a temporary copy on your device. Perhaps there is insufficient space? Please try to re-establish a network connection and try again."),t}return n(a,[{key:"populateClientResponse",value:function(){return this.returnedToClient.id=this.toSaveLocally.imageId?this.toSaveLocally.imageId:this.toSaveLocally.id,this.returnedToClient.imageId=this.toSaveLocally.imageId?this.toSaveLocally.imageId:this.toSaveLocally.id,this.returnedToClient.type="image",this.returnedToClient.surveyId=this.toSaveLocally.surveyId,this.returnedToClient.occurrenceId=this.toSaveLocally.occurrenceId,this.returnedToClient.created=parseInt(this.toSaveLocally.created,10),this.returnedToClient.modified=parseInt(this.toSaveLocally.modified,10),this.returnedToClient.saveState="SAVED_LOCALLY",this.returnedToClient.deleted=this.toSaveLocally.deleted,this.returnedToClient.projectId=parseInt(this.toSaveLocally.projectId,10),this}},{key:"populateLocalSave",value:function(){return this.toSaveLocally.surveyId=this.returnedToClient.surveyId,this.toSaveLocally.type="image",this.toSaveLocally.occurrenceId=this.returnedToClient.occurrenceId,this.toSaveLocally.imageId=this.returnedToClient.id?this.returnedToClient.id:this.returnedToClient.imageId,this.toSaveLocally.id=this.returnedToClient.id?this.returnedToClient.id:this.returnedToClient.imageId,this.toSaveLocally.created=parseInt(this.returnedToClient.created,10),this.toSaveLocally.modified=parseInt(this.returnedToClient.modified,10),this.toSaveLocally.saveState="SAVED_TO_SERVER",this.toSaveLocally.deleted=!0===this.returnedToClient.deleted||"true"===this.returnedToClient.deleted,this.toSaveLocally.projectId=parseInt(this.returnedToClient.projectId,10),this}},{key:"localKey",value:function(){return "image.".concat(this.toSaveLocally.imageId)}}],[{key:"register",value:function(){mN.responses.image=a;}}]),a}();function wN(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}var _N=function(t){po(a,bN);var o=wN(a);function a(){var t;e(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return r(fo(t=o.call.apply(o,[this].concat(i))),"failureErrorMessage","Failed to store survey."),r(fo(t),"failureErrorHelp","Your internet connection may have failed (or there could be a problem with the server). It wasn't possible to save a temporary copy on your device. Perhaps there is insufficient space? Please try to re-establish a network connection and try again."),t}return n(a,[{key:"populateClientResponse",value:function(){return this.toSaveLocally.surveyId=this.returnedToClient.id?this.returnedToClient.id:this.returnedToClient.surveyId,this.toSaveLocally.id=this.returnedToClient.id?this.returnedToClient.id:this.returnedToClient.surveyId,this.returnedToClient.type="survey",this.returnedToClient.attributes=this.toSaveLocally.attributes,this.returnedToClient.created=this.toSaveLocally.created,this.returnedToClient.modified=this.toSaveLocally.modified,this.returnedToClient.saveState="SAVED_LOCALLY",this.returnedToClient.deleted=this.toSaveLocally.deleted,this.returnedToClient.projectId=this.toSaveLocally.projectId,this}},{key:"populateLocalSave",value:function(){return this.toSaveLocally.surveyId=this.returnedToClient.id?this.returnedToClient.id:this.returnedToClient.surveyId,this.toSaveLocally.id=this.returnedToClient.id?this.returnedToClient.id:this.returnedToClient.surveyId,this.toSaveLocally.type="survey",this.toSaveLocally.attributes=this.returnedToClient.attributes,this.toSaveLocally.created=parseInt(this.returnedToClient.created,10),this.toSaveLocally.modified=parseInt(this.returnedToClient.modified,10),this.toSaveLocally.saveState="SAVED_TO_SERVER",this.toSaveLocally.deleted=this.returnedToClient.deleted,this.toSaveLocally.projectId=parseInt(this.returnedToClient.projectId,10),this}},{key:"localKey",value:function(){return "survey.".concat(this.toSaveLocally.surveyId)}}],[{key:"register",value:function(){mN.responses.survey=a;}}]),a}();function CN(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}var ON=function(t){po(a,bN);var o=CN(a);function a(){var t;e(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return r(fo(t=o.call.apply(o,[this].concat(i))),"failureErrorMessage","Failed to store occurrence."),r(fo(t),"failureErrorHelp","Your internet connection may have failed (or there could be a problem with the server). It wasn't possible to save a temporary copy on your device. Perhaps there is insufficient space? Please try to re-establish a network connection and try again."),t}return n(a,[{key:"populateClientResponse",value:function(){return this.returnedToClient.id=this.toSaveLocally.occurrenceId?this.toSaveLocally.occurrenceId:this.toSaveLocally.id,this.returnedToClient.occurrenceId=this.toSaveLocally.occurrenceId?this.toSaveLocally.occurrenceId:this.toSaveLocally.id,this.returnedToClient.type="occurrence",this.returnedToClient.surveyId=this.toSaveLocally.surveyId,this.returnedToClient.attributes=this.toSaveLocally.attributes,this.returnedToClient.created=parseInt(this.toSaveLocally.created,10),this.returnedToClient.modified=parseInt(this.toSaveLocally.modified,10),this.returnedToClient.saveState="SAVED_LOCALLY",this.returnedToClient.deleted=this.toSaveLocally.deleted,this.returnedToClient.projectId=parseInt(this.toSaveLocally.projectId,10),this}},{key:"populateLocalSave",value:function(){return this.toSaveLocally.occurrenceId=this.returnedToClient.id?this.returnedToClient.id:this.returnedToClient.occurrenceId,this.toSaveLocally.id=this.returnedToClient.id?this.returnedToClient.id:this.returnedToClient.occurrenceId,this.toSaveLocally.type="occurrence",this.toSaveLocally.surveyId=this.returnedToClient.surveyId,this.toSaveLocally.attributes=this.returnedToClient.attributes,this.toSaveLocally.created=parseInt(this.returnedToClient.created,10),this.toSaveLocally.modified=parseInt(this.returnedToClient.modified,10),this.toSaveLocally.saveState="SAVED_TO_SERVER",this.toSaveLocally.deleted=!0===this.returnedToClient.deleted||"true"===this.returnedToClient.deleted,this.toSaveLocally.projectId=parseInt(this.returnedToClient.projectId,10),this}},{key:"localKey",value:function(){return "occurrence.".concat(this.toSaveLocally.occurrenceId)}}],[{key:"register",value:function(){mN.responses.occurrence=a;}}]),a}(),RN=function(){function t(){e(this,t),r(this,"URL_CACHE_SET",void 0);}return n(t,[{key:"initialise",value:function(e){var t=this;Promise.prototype.finally||(Promise.prototype.finally=function(e){return this.then(e).catch(e)}),EN.register(),_N.register(),ON.register(),this.CACHE_VERSION="version-1.0.2.1634554032-".concat(e.version);var n=e.postPassThroughWhitelist,r=e.postImageUrlMatch,o=e.getImageUrlMatch,a=e.interceptUrlMatches,i=e.ignoreUrlMatches,s=e.indexUrl;this.URL_CACHE_SET=e.urlCacheSet,jp.config({name:e.forageName}),self.addEventListener("install",(function(e){console.log("BSBI app service worker is being installed."),self.skipWaiting(),e.waitUntil(t.precache().then((function(){return self.skipWaiting()})));})),self.addEventListener("activate",(function(e){e.waitUntil(self.clients.matchAll({includeUncontrolled:!0}).then((function(e){var t=e.map((function(e){return e.url}));console.log("[ServiceWorker] Matching clients:",t.join(", "));})).then((function(){return caches.keys()})).then((function(e){return Promise.all(e.map((function(e){if(e!==t.CACHE_VERSION)return console.log("[ServiceWorker] Deleting old cache:",e),caches.delete(e)})))})).then((function(){return console.log("[ServiceWorker] Claiming clients for version",t.CACHE_VERSION),self.clients.claim()})));})),self.addEventListener("fetch",(function(e){if(console.log("The service worker is serving: '".concat(e.request.url,"'")),e.preventDefault(),"POST"===e.request.method)console.log("Got a post request"),e.request.url.match(n)?(console.log("Passing through whitelisted post request for: ".concat(e.request.url)),e.respondWith(fetch(e.request))):e.request.url.match(r)?t.handle_image_post(e):t.handle_post(e);else if(a.test(e.request.url)&&!i.test(e.request.url)){console.log("redirecting to the root of the SPA");var c=new Request(s);e.respondWith(t.fromCache(c)),e.waitUntil(t.update(c));}else e.request.url.match(o)?(console.log("request is for an image '".concat(e.request.url,"'")),t.handleImageFetch(e)):(console.log("request is for non-image '".concat(e.request.url,"'")),e.respondWith(t.fromCache(e.request)),e.waitUntil(t.update(e.request)));}));}},{key:"handle_post",value:function(e){var t;try{t=e.request.clone();}catch(e){console.log("Failed to clone request."),console.log({"Cloning error":e});}e.respondWith(fetch(e.request).then((function(e){return e.ok?Promise.resolve(e).then((function(e){return e.clone().json()})).then((function(t){return console.log("Following successful remote post about to save locally."),mN.fromPostResponse(t).setPrebuiltResponse(e).populateLocalSave().storeLocally()})).catch((function(t){return console.log({error:t}),Promise.resolve(e)})):(console.log("Failed to save, moving on to attempt IndexedDb"),Promise.reject("Failed to save to server."))})).catch((function(e){return console.log("post fetch failed (probably no network), (reason: ".concat(e,")")),t.formData().then((function(e){return console.log("got to form data handler"),mN.fromPostedData(e).populateClientResponse().storeLocally()}),(function(e){console.log("failed to read form data locally"),console.log({reason:e});return gN({error:"Failed to process posted response data. (internal error)",errorHelp:"Your internet connection may have failed (or there could be a problem with the server). It wasn't possible to save a temporary copy on your device. (an unexpected error occurred) Please try to re-establish a network connection and try again."})}))})));}},{key:"handle_image_post",value:function(e){var t;console.log("posting image");try{t=e.request.clone();}catch(e){console.log("Failed to clone request."),console.log({"Cloning error":e});}e.respondWith(t.formData().then((function(e){return console.log("got to form data handler"),mN.fromPostedData(e).populateClientResponse().storeLocally()}),(function(e){console.log("failed to read form data locally"),console.log({reason:e});return gN({error:"Failed to process posted response data. (internal error)",errorHelp:"Your internet connection may have failed (or there could be a problem with the server). It wasn't possible to save a temporary copy on your device. (an unexpected error occurred) Please try to re-establish a network connection and try again."})}))),e.waitUntil(fetch(e.request).then((function(e){if(console.log("posted image to server in waitUntil part of fetch cycle"),e.ok)return console.log("posted image to server in waitUntil part of fetch cycle: got OK response"),Promise.resolve(e).then((function(e){return e.clone().json()})).then((function(t){return mN.fromPostResponse(t).setPrebuiltResponse(e).populateLocalSave().storeLocally()})).catch((function(t){return console.log({error:t}),Promise.resolve(e)}));return gN({error:"Failed to save posted response data. (internal error)",errorHelp:"Your internet connection may have failed (or there could be a problem with the server). It wasn't possible to save a temporary copy on your device. (an unexpected error occurred) Please try to re-establish a network connection and try again."})})));}},{key:"precache",value:function(){var e=this;return caches.open(this.CACHE_VERSION).then((function(t){return t.addAll(e.URL_CACHE_SET)}))}},{key:"fromCache",value:function(e){var t=this;return console.log("attempting fromCache response"),caches.open(this.CACHE_VERSION).then((function(n){return console.log("cache is open"),n.match(e).then((function(n){return console.log(n?"cache matched ".concat(e.url):"no cache match for ".concat(e.url)),n||t.update(e)}))}))}},{key:"handleImageFetch",value:function(e){var t=this;e.respondWith(this.fromCache(e.request).then((function(n){if(console.log("In handleImageFetch promise"),n&&n.ok)return console.log("Responding with image from cache (or remotely if no cache)."),n;var r=e.request.url;console.log("Attempting image match for '".concat(r,"'"));var o=r.match(/imageid=([a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12})/);if(o){var a=o[1];return console.log("Returning image match for '".concat(r,"' from local database")),t.imageFromLocalDatabase(a)}console.log("Failed to match image id in url '".concat(r,"'"));})).catch((function(n){var r=e.request.url;console.log(n),console.log("caught ".concat(n)),console.log("In catch following failed network fetch, attempting image match for '".concat(r,"'"));var o=r.match(/imageid=([a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12})/);if(o){var a=o[1];return console.log("(via catch) Returning image match for '".concat(r,"' from local database")),t.imageFromLocalDatabase(a)}console.log("(via catch) Failed to match image id in url '".concat(r,"'"));})));}},{key:"imageFromLocalDatabase",value:function(e){var t=new Hy;return console.log("attempting retrieval of image data from local database"),Gp.retrieveFromLocal(e,t).then((function(t){if(console.log("Retrieved image '".concat(e,"' from indexeddb.")),t.file)return (new Headers).append("Content-Type",t.file.type),new Response(t.file,{status:200,statusText:"OK image response from IndexedDb"});console.log("No local file object associated with retrieved image '".concat(e,"' from indexeddb."));}))}},{key:"update",value:function(e){return e=new Request(e,{mode:"cors",credentials:"omit"}),console.log("Attempting fetch and cache update of ".concat(e.url)),caches.open(this.CACHE_VERSION).then((function(t){return fetch(e,{cache:"no-cache"}).then((function(n){return n.ok?(console.log("(re-)caching ".concat(e.url)),t.put(e,n).then((function(){return t.match(e)}))):(console.log("Request during cache update failed for ".concat(e.url)),console.log({"failed cache response":n}),Promise.reject("Request during cache update failed, not caching."))})).catch((function(t){console.log("Cache attempt failed for ".concat(e.url,": error was ").concat(t));}))}))}}]),t}(),IN="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function MN(){return !("undefined"==typeof window||!window.history||!window.history.pushState)}function LN(e,t,n){this.root=null,this._routes=[],this._useHash=t,this._hash=void 0===n?"#":n,this._paused=!1,this._destroyed=!1,this._lastRouteResolved=null,this._notFoundHandler=null,this._defaultHandler=null,this._usePushState=!t&&MN(),this._onLocationChange=this._onLocationChange.bind(this),this._genericHooks=null,this._historyAPIUpdateMethod="pushState",e?this.root=t?e.replace(/\/$/,"/"+this._hash):e.replace(/\/$/,""):t&&(this.root=this._cLoc().split(this._hash)[0].replace(/\/$/,"/"+this._hash)),this._listen(),this.updatePageLinks();}function xN(e){return e instanceof RegExp?e:e.replace(/\/+$/,"").replace(/^\/+/,"^/")}function HN(e,t){return 0===t.length?null:e?e.slice(1,e.length).reduce((function(e,n,r){return null===e&&(e={}),e[t[r]]=decodeURIComponent(n),e}),null):null}function kN(e){var t=[];return {regexp:e instanceof RegExp?e:new RegExp(e.replace(LN.PARAMETER_REGEXP,(function(e,n,r){return t.push(r),LN.REPLACE_VARIABLE_REGEXP})).replace(LN.WILDCARD_REGEXP,LN.REPLACE_WILDCARD)+LN.FOLLOWED_BY_SLASH_REGEXP,LN.MATCH_REGEXP_FLAGS),paramNames:t}}function PN(e){return e.replace(/\/$/,"").split("/").length}function AN(e,t){return PN(t)-PN(e)}function DN(e,t){return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return t.map((function(t){var n=kN(xN(t.route)),r=n.regexp,o=n.paramNames,a=e.replace(/^\/+/,"/").match(r),i=HN(a,o);return !!a&&{match:a,route:t,params:i}})).filter((function(e){return e}))}(e,t)[0]||!1}function FN(e,t){var n=t.map((function(t){return ""===t.route||"*"===t.route?e:e.split(new RegExp(t.route+"($|/)"))[0]})),r=xN(e);return n.length>1?n.reduce((function(e,t){return e.length>t.length&&(e=t),e}),n[0]):1===n.length?n[0]:r}function UN(e,t,n){var r,o=function(e){return e.split(/\?(.*)?$/)[0]};return void 0===n&&(n="#"),MN()&&!t?o(e).split(n)[0]:(r=e.split(n)).length>1?o(r[1]):o(r[0])}function jN(e,t,n){if(t&&"object"===(void 0===t?"undefined":IN(t))){if(t.before)return void t.before((function(){var r=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];r&&(e(),t.after&&t.after(n));}),n);if(t.after)return e(),void(t.after&&t.after(n))}e();}function JN(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}LN.prototype={helpers:{match:DN,root:FN,clean:xN,getOnlyURL:UN},navigate:function(e,t){var n;return e=e||"",this._usePushState?(n=(n=(t?"":this._getRoot()+"/")+e.replace(/^\/+/,"/")).replace(/([^:])(\/{2,})/g,"$1/"),history[this._historyAPIUpdateMethod]({},"",n),this.resolve()):"undefined"!=typeof window&&(e=e.replace(new RegExp("^"+this._hash),""),window.location.href=window.location.href.replace(/#$/,"").replace(new RegExp(this._hash+".*$"),"")+this._hash+e),this},on:function(){for(var e=this,t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];if("function"==typeof n[0])this._defaultHandler={handler:n[0],hooks:n[1]};else if(n.length>=2)if("/"===n[0]){var o=n[1];"object"===IN(n[1])&&(o=n[1].uses),this._defaultHandler={handler:o,hooks:n[2]};}else this._add(n[0],n[1],n[2]);else if("object"===IN(n[0])){var a=Object.keys(n[0]).sort(AN);a.forEach((function(t){e.on(t,n[0][t]);}));}return this},off:function(e){return null!==this._defaultHandler&&e===this._defaultHandler.handler?this._defaultHandler=null:null!==this._notFoundHandler&&e===this._notFoundHandler.handler&&(this._notFoundHandler=null),this._routes=this._routes.reduce((function(t,n){return n.handler!==e&&t.push(n),t}),[]),this},notFound:function(e,t){return this._notFoundHandler={handler:e,hooks:t},this},resolve:function(e){var t,n,r=this,o=(e||this._cLoc()).replace(this._getRoot(),"");this._useHash&&(o=o.replace(new RegExp("^/"+this._hash),"/"));var a=function(e){return e.split(/\?(.*)?$/).slice(1).join("")}(e||this._cLoc()),i=UN(o,this._useHash,this._hash);return !this._paused&&(this._lastRouteResolved&&i===this._lastRouteResolved.url&&a===this._lastRouteResolved.query?(this._lastRouteResolved.hooks&&this._lastRouteResolved.hooks.already&&this._lastRouteResolved.hooks.already(this._lastRouteResolved.params),!1):(n=DN(i,this._routes))?(this._callLeave(),this._lastRouteResolved={url:i,query:a,hooks:n.route.hooks,params:n.params,name:n.route.name},t=n.route.handler,jN((function(){jN((function(){n.route.route instanceof RegExp?t.apply(void 0,n.match.slice(1,n.match.length)):t(n.params,a);}),n.route.hooks,n.params,r._genericHooks);}),this._genericHooks,n.params),n):this._defaultHandler&&(""===i||"/"===i||i===this._hash||function(e,t,n){if(MN()&&!t)return !1;if(!e.match(n))return !1;var r=e.split(n);return r.length<2||""===r[1]}(i,this._useHash,this._hash))?(jN((function(){jN((function(){r._callLeave(),r._lastRouteResolved={url:i,query:a,hooks:r._defaultHandler.hooks},r._defaultHandler.handler(a);}),r._defaultHandler.hooks);}),this._genericHooks),!0):(this._notFoundHandler&&jN((function(){jN((function(){r._callLeave(),r._lastRouteResolved={url:i,query:a,hooks:r._notFoundHandler.hooks},r._notFoundHandler.handler(a);}),r._notFoundHandler.hooks);}),this._genericHooks),!1))},destroy:function(){this._routes=[],this._destroyed=!0,this._lastRouteResolved=null,this._genericHooks=null,clearTimeout(this._listeningInterval),"undefined"!=typeof window&&(window.removeEventListener("popstate",this._onLocationChange),window.removeEventListener("hashchange",this._onLocationChange));},updatePageLinks:function(){var e=this;"undefined"!=typeof document&&this._findLinks().forEach((function(t){t.hasListenerAttached||(t.addEventListener("click",(function(n){if((n.ctrlKey||n.metaKey)&&"a"==n.target.tagName.toLowerCase())return !1;var r=e.getLinkPath(t);e._destroyed||(n.preventDefault(),e.navigate(r.replace(/\/+$/,"").replace(/^\/+/,"/")));})),t.hasListenerAttached=!0);}));},generate:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this._routes.reduce((function(n,r){var o;if(r.name===e)for(o in n=r.route,t)n=n.toString().replace(":"+o,t[o]);return n}),"");return this._useHash?this._hash+n:n},link:function(e){return this._getRoot()+e},pause:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this._paused=e,this._historyAPIUpdateMethod=e?"replaceState":"pushState";},resume:function(){this.pause(!1);},historyAPIUpdateMethod:function(e){return void 0===e?this._historyAPIUpdateMethod:(this._historyAPIUpdateMethod=e,e)},disableIfAPINotAvailable:function(){MN()||this.destroy();},lastRouteResolved:function(){return this._lastRouteResolved},getLinkPath:function(e){return e.getAttribute("href")},hooks:function(e){this._genericHooks=e;},_add:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return "string"==typeof e&&(e=encodeURI(e)),this._routes.push("object"===(void 0===t?"undefined":IN(t))?{route:e,handler:t.uses,name:t.as,hooks:n||t.hooks}:{route:e,handler:t,hooks:n}),this._add},_getRoot:function(){return null!==this.root||(this.root=FN(this._cLoc().split("?")[0],this._routes)),this.root},_listen:function(){var e=this;if(this._usePushState)window.addEventListener("popstate",this._onLocationChange);else if("undefined"!=typeof window&&"onhashchange"in window)window.addEventListener("hashchange",this._onLocationChange);else {var t=this._cLoc(),n=void 0,r=void 0;(r=function(){n=e._cLoc(),t!==n&&(t=n,e.resolve()),e._listeningInterval=setTimeout(r,200);})();}},_cLoc:function(){return "undefined"!=typeof window?void 0!==window.__NAVIGO_WINDOW_LOCATION_MOCK__?window.__NAVIGO_WINDOW_LOCATION_MOCK__:xN(window.location.href):""},_findLinks:function(){return [].slice.call(document.querySelectorAll("[data-navigo]"))},_onLocationChange:function(){this.resolve();},_callLeave:function(){var e=this._lastRouteResolved;e&&e.hooks&&e.hooks.leave&&e.hooks.leave(e.params);}},LN.PARAMETER_REGEXP=/([:*])(\w+)/g,LN.WILDCARD_REGEXP=/\*/g,LN.REPLACE_VARIABLE_REGEXP="([^/]+)",LN.REPLACE_WILDCARD="(?:.*)",LN.FOLLOWED_BY_SLASH_REGEXP="(?:/$|$)",LN.MATCH_REGEXP_FLAGS="";(function(t){po(o,LN);var r=JN(o);function o(){return e(this,o),r.apply(this,arguments)}return n(o,[{key:"updatePageLinks",value:function(){var e=this;if("undefined"!=typeof document){var t=document.createElement("a");t.href=this.root;var n=t.pathname;this._findLinks().forEach((function(t){t.hasListenerAttached||(t.addEventListener("click",(function(r){if((r.ctrlKey||r.metaKey)&&"a"==r.target.tagName.toLowerCase())return !1;if(!e._destroyed){var o=t.pathname.replace(n,"");r.preventDefault(),e.navigate(o);}})),t.hasListenerAttached=!0);}));}}}]),o})();var YN=v,GN=f,KN=Wn,VN=es,XN=dt,qN=tt.f,QN=an.f,WN=ry,ZN=Da,$N=tl,zN=Hd,em=ft.exports,tm=p,nm=me,rm=Bt.enforce,om=bl,am=Fd,im=Jd,sm=xe("match"),cm=GN.RegExp,lm=cm.prototype,um=/^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/,dm=/a/g,fm=/a/g,hm=new cm(dm)!==dm,pm=zN.UNSUPPORTED_Y,vm=YN&&(!hm||pm||am||im||tm((function(){return fm[sm]=!1,cm(dm)!=dm||cm(fm)==fm||"/a/i"!=cm(dm,"i")})));if(KN("RegExp",vm)){for(var Sm=function(e,t){var n,r,o,a,i,s,c=this instanceof Sm,l=WN(e),u=void 0===t,d=[],f=e;if(!c&&l&&u&&e.constructor===Sm)return e;if((l||e instanceof Sm)&&(e=e.source,u&&(t="flags"in f?f.flags:$N.call(f))),e=void 0===e?"":ZN(e),t=void 0===t?"":ZN(t),f=e,am&&"dotAll"in dm&&(r=!!t&&t.indexOf("s")>-1)&&(t=t.replace(/s/g,"")),n=t,pm&&"sticky"in dm&&(o=!!t&&t.indexOf("y")>-1)&&(t=t.replace(/y/g,"")),im&&(e=(a=function(e){for(var t,n=e.length,r=0,o="",a=[],i={},s=!1,c=!1,l=0,u="";r<=n;r++){if("\\"===(t=e.charAt(r)))t+=e.charAt(++r);else if("]"===t)s=!1;else if(!s)switch(!0){case"["===t:s=!0;break;case"("===t:um.test(e.slice(r+1))&&(r+=2,c=!0),o+=t,l++;continue;case">"===t&&c:if(""===u||nm(i,u))throw new SyntaxError("Invalid capture group name");i[u]=!0,a.push([u,l]),c=!1,u="";continue}c?u+=t:o+=t;}return [o,a]}(e))[0],d=a[1]),i=VN(cm(e,t),c?this:lm,Sm),(r||o||d.length)&&(s=rm(i),r&&(s.dotAll=!0,s.raw=Sm(function(e){for(var t,n=e.length,r=0,o="",a=!1;r<=n;r++)"\\"!==(t=e.charAt(r))?a||"."!==t?("["===t?a=!0:"]"===t&&(a=!1),o+=t):o+="[\\s\\S]":o+=t+e.charAt(++r);return o}(e),n)),o&&(s.sticky=!0),d.length&&(s.groups=d)),e!==f)try{XN(i,"source",""===f?"(?:)":f);}catch(e){}return i},ym=function(e){e in Sm||qN(Sm,e,{configurable:!0,get:function(){return cm[e]},set:function(t){cm[e]=t;}});},Nm=QN(cm),mm=0;Nm.length>mm;)ym(Nm[mm++]);lm.constructor=Sm,Sm.prototype=lm,em(GN,"RegExp",Sm);}om("RegExp");var gm=Math.floor,bm=function(e,t){var n=e.length,r=gm(n/2);return n<8?Tm(e,t):Em(bm(e.slice(0,r),t),bm(e.slice(r),t),t)},Tm=function(e,t){for(var n,r,o=e.length,a=1;a<o;){for(r=a,n=e[a];r&&t(e[r-1],n)>0;)e[r]=e[--r];r!==a++&&(e[r]=n);}return e},Em=function(e,t,n){for(var r=e.length,o=t.length,a=0,i=0,s=[];a<r||i<o;)a<r&&i<o?s.push(n(e[a],t[i])<=0?e[a++]:t[i++]):s.push(a<r?e[a++]:t[i++]);return s},wm=bm,_m=U.match(/firefox\/(\d+)/i),Cm=!!_m&&+_m[1],Om=/MSIE|Trident/.test(U),Rm=U.match(/AppleWebKit\/(\d+)\./),Im=!!Rm&&+Rm[1],Mm=or,Lm=oe,xm=Se,Hm=Nn,km=Da,Pm=p,Am=wm,Dm=bp,Fm=Cm,Um=Om,jm=V,Jm=Im,Bm=[],Ym=Bm.sort,Gm=Pm((function(){Bm.sort(void 0);})),Km=Pm((function(){Bm.sort(null);})),Vm=Dm("sort"),Xm=!Pm((function(){if(jm)return jm<70;if(!(Fm&&Fm>3)){if(Um)return !0;if(Jm)return Jm<603;var e,t,n,r,o="";for(e=65;e<76;e++){switch(t=String.fromCharCode(e),e){case 66:case 69:case 70:case 72:n=3;break;case 68:case 71:n=4;break;default:n=2;}for(r=0;r<47;r++)Bm.push({k:t+r,v:n});}for(Bm.sort((function(e,t){return t.v-e.v})),r=0;r<Bm.length;r++)t=Bm[r].k.charAt(0),o.charAt(o.length-1)!==t&&(o+=t);return "DGBEFHACIJK"!==o}}));Mm({target:"Array",proto:!0,forced:Gm||!Km||!Vm||!Xm},{sort:function(e){void 0!==e&&Lm(e);var t=xm(this);if(Xm)return void 0===e?Ym.call(t):Ym.call(t,e);var n,r,o=[],a=Hm(t);for(r=0;r<a;r++)r in t&&o.push(t[r]);for(n=(o=Am(o,function(e){return function(t,n){return void 0===n?-1:void 0===t?1:void 0!==e?+e(t,n)||0:km(t)>km(n)?1:-1}}(e))).length,r=0;r<n;)t[r]=o[r++];for(;r<a;)delete t[r++];return t}});var qm=or,Qm=hn,Wm=ln,Zm=Nn,$m=Se,zm=Ts,eg=Pc,tg=Uc("splice"),ng=Math.max,rg=Math.min;qm({target:"Array",proto:!0,forced:!tg},{splice:function(e,t){var n,r,o,a,i,s,c=$m(this),l=Zm(c),u=Qm(e,l),d=arguments.length;if(0===d?n=r=0:1===d?(n=0,r=l-u):(n=d-2,r=rg(ng(Wm(t),0),l-u)),l+n-r>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(o=zm(c,r),a=0;a<r;a++)(i=u+a)in c&&eg(o,a,c[i]);if(o.length=r,n<r){for(a=u;a<l-r;a++)s=a+n,(i=a+r)in c?c[s]=c[i]:delete c[s];for(a=l;a>l-r+n;a--)delete c[a-1];}else if(n>r)for(a=l-r;a>u;a--)s=a+n-1,(i=a+r-1)in c?c[s]=c[i]:delete c[s];for(a=0;a<n;a++)c[a+u]=arguments[a+2];return c.length=l-r+n,o}});var og=function(){function t(){if(e(this,t),r(this,"minimumRankSort",null),r(this,"requireExtantDDbRecords",!1),r(this,"skipJunk",!0),!qp.rawTaxa&&(qp.rawTaxa=BsbiDb.TaxonNames,!qp.rawTaxa))throw new Error("Taxon list has failed to load in TaxonSearch")}return n(t,[{key:"lookup",value:function(e){var n,r,o,a,i={};if(r=t.normaliseTaxonName(decodeURIComponent(e).trim()).replace(/\s+x$/i,""),a=/ x\b/.test(r),""!==r){var s=r.match(t.abbreviatedGenusRegex);if(s){var c,l;for(var u in "X"===s[2]||"x"===s[2]?l=c=new RegExp("^(X\\s|X[a-z]+\\s+)(x )?\\b".concat(t.generate_hybrid_combinations_regex(s[3]),".*"),"i"):(c=new RegExp("^(X )?".concat(t.escapeRegExp(s[2]),"[a-z]+ (x )?.*\\b").concat(t.generate_hybrid_combinations_regex(s[3]),".*"),"i"),l=new RegExp("^(X )?".concat(t.escapeRegExp(s[2]),"[a-z]+ (x )?\\b").concat(t.generate_hybrid_combinations_regex(s[3]),".*"),"i")),qp.rawTaxa){var d=qp.rawTaxa[u];o=0===d[t.canonicalColumn]?d[t.nameStringColumn]:d[t.canonicalColumn],(c.test(o)||""!==d[t.hybridCanonicalColumn]&&c.test(d[t.hybridCanonicalColumn]))&&(i[u]={exact:d[t.nameStringColumn]===r,near:l.test(d[t.nameStringColumn])});}n=this.compile_results(i,a);}else {var f,h,p=t.escapeRegExp(r);-1!==r.indexOf(" ")?(f="".concat(t.escapeRegExp(r.substr(0,r.indexOf(" ")))," (x )?.*\\b").concat(t.generate_hybrid_combinations_regex(r.substr(r.indexOf(" ")+1)),".*"),h=new RegExp("^(?:Xs+)?".concat(t.escapeRegExp(r.substr(0,r.indexOf(" ")))," (x )?\\b").concat(t.generate_hybrid_combinations_regex(r.substr(r.indexOf(" ")+1)),".*"),"i")):(f="".concat(p,".*"),h=new RegExp("^".concat(p,".*")));var v="^".concat(p,".*"),S=new RegExp("^(?:Xs+)?".concat(f),"i");if(t.showVernacular){var y=new RegExp(v,"i");for(var N in qp.rawTaxa){var m=qp.rawTaxa[N];o=0===m[t.canonicalColumn]?m[t.nameStringColumn]:m[t.canonicalColumn],S.test(m[t.nameStringColumn])||o!==m[t.nameStringColumn]&&S.test(o)?i[N]={exact:m[t.nameStringColumn]===r,near:h.test(m[t.nameStringColumn])||h.test(o)}:(y.test(m[t.vernacularColumn])||y.test(m[t.vernacularRootColumn]))&&(i[N]={exact:m[t.vernacularColumn]===r,vernacular:!0});}if((n=this.compile_results(i,a)).length<5){var g=new RegExp("\\b".concat(p,".*"),"i");for(var b in qp.rawTaxa)if(!i.hasOwnProperty(b)){var T=qp.rawTaxa[b];g.test(T[t.nameStringColumn])?i[b]={exact:T[t.nameStringColumn]===r}:(0!==T[t.canonicalColumn]&&g.test(T[t.canonicalColumn])||g.test(T[t.vernacularColumn]))&&(i[b]={exact:T[t.nameStringColumn]===r,vernacular:!0});}n=this.compile_results(i,a);}}else {for(var E in qp.rawTaxa){var w=qp.rawTaxa[E];o=0===w[t.canonicalColumn]?w[t.nameStringColumn]:w[t.canonicalColumn],(S.test(w[t.nameStringColumn])||o!==w[t.nameStringColumn]&&S.test(o))&&(i[E]={exact:w[t.nameStringColumn]===r});}n=this.compile_results(i,a);}}}else n=[];return n}},{key:"compile_results",value:function(e,n){var r=[];for(var o in e)if(e.hasOwnProperty(o)){var a=qp.rawTaxa[o];if((!this.requireExtantDDbRecords||this.requireExtantDDbRecords&&1===a[t.usedColumn])&&(!this.minimumRankSort||this.minimumRankSort>0&&a[t.minRankColumn]>=this.minimumRankSort)){var i=a[t.nameStringColumn]+(a[t.qualifierColumn]?" ".concat(a[t.qualifierColumn]):""),s={entityId:o,vernacular:a[t.vernacularColumn],qname:i,name:i,qualifier:a[t.qualifierColumn],authority:a[t.authorityColumn],uname:a[t.nameStringColumn],vernacularMatched:e[o].hasOwnProperty("vernacular"),exact:e[o].hasOwnProperty("exact")&&e[o].exact,near:e[o].hasOwnProperty("near")&&e[o].near};if(s.formatted=t.formatter(s),a[t.acceptedEntityIdColumn]){var c=qp.rawTaxa[a[t.acceptedEntityIdColumn]];if(!c)throw qp.rawTaxa?new Error("Failed to find taxon for accepted entity id ".concat(a[t.acceptedEntityIdColumn])):new Error("Taxon.rawTaxa set is undefined, when trying to find taxon for accepted entity id ".concat(a[t.acceptedEntityIdColumn]));s.acceptedEntityId=a[t.acceptedEntityIdColumn],s.acceptedNameString=c[t.nameStringColumn],s.acceptedQualifier=c[t.qualifierColumn],s.acceptedAuthority=c[t.authorityColumn];}r.push(s);}}return r.length&&(r.sort((function(e,t){if(e.exact)return t.exact?e.acceptedEntityId?1:0:-1;if(t.exact)return 1;if(e.near){if(!t.near)return -1}else if(t.near)return 1;var r=null!==e.uname.match(/\bx\b/i),o=null!==t.uname.match(/\bx\b/i);if(r)return o?e.uname===t.uname?e.acceptedEntityId?1:0:e.qname<t.qname?-1:1:n?-1:1;if(o)return n?1:-1;if(e.uname===t.uname){if(!e.acceptedEntityId&&!t.acceptedEntityId||e.acceptedEntityId&&t.acceptedEntityId){var a=["s.s.","",null,"s.l.","agg."].indexOf(e.qualifier),i=["s.s.","",null,"s.l.","agg."].indexOf(t.qualifier);return a===i?0:a<i?1:-1}return e.acceptedEntityId?1:-1}return e.uname<t.uname?-1:1})),r.length>t.MAXIMUM_RESULTS&&(r.length=t.MAXIMUM_RESULTS)),r}}],[{key:"formatter",value:function(e){return t.showVernacular?e.vernacularMatched?e.acceptedEntityId?"<q><b>".concat(e.vernacular,'</b></q> <span class="italictaxon">').concat(e.uname).concat(e.qualifier?" <b>".concat(e.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(e.authority,"</span>")+' = <span class="italictaxon">'.concat(e.acceptedNameString).concat(e.acceptedQualifier?" <b>".concat(e.acceptedQualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(e.acceptedAuthority,"</span>"):"<q><b>".concat(e.vernacular,'</b></q> <span class="italictaxon">').concat(e.uname).concat(e.qualifier?" <b>".concat(e.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(e.authority,"</span>"):e.acceptedEntityId?'<span class="italictaxon">'.concat(e.uname).concat(e.qualifier?" <b>".concat(e.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(e.authority,"</span>").concat(e.vernacular?" <q><b>".concat(e.vernacular,"</b></q>"):"",' = <span class="italictaxon">').concat(e.acceptedNameString).concat(e.acceptedQualifier?" <b>".concat(e.acceptedQualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(e.acceptedAuthority,"</span>"):'<span class="italictaxon">'.concat(e.uname).concat(e.qualifier?" <b>".concat(e.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(e.authority,"</span>").concat(e.vernacular?" <q><b>".concat(e.vernacular,"</b></q>"):""):e.acceptedEntityId?'<span class="italictaxon">'.concat(e.uname).concat(e.qualifier?" <b>".concat(e.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(e.authority,"</span>")+' = <span class="italictaxon">'.concat(e.acceptedNameString).concat(e.acceptedQualifier?" <b>".concat(e.acceptedQualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(e.acceptedAuthority,"</span>"):'<span class="italictaxon">'.concat(e.uname).concat(e.qualifier?" <b>".concat(e.qualifier,"</b>"):"",'</span> <span class="taxauthority">').concat(e.authority,"</span>")}},{key:"normaliseTaxonName",value:function(e){for(var n=0,r=t.taxonRankNameSearchRegex.length;n<r;n++)e=e.replace(t.taxonRankNameSearchRegex[n],t.taxonRankNameReplacement[n]);for(var o=0,a=t.taxonQualifierSearchRegex.length;o<a;o++)e=e.replace(t.taxonQualifierSearchRegex[o],t.taxonQualifierReplacement[o]);return e}},{key:"escapeRegExp",value:function(e){return e.replace(t.cleanRegex,"\\$&")}},{key:"generate_hybrid_combinations_regex",value:function(e){var n=t.escapeRegExp(e).split(/\s+x\s+/i);if(n.length<2)return n[0];var r=[];return function e(t,n){if(0===t.length)r[r.length]=n.join("[a-zA-Z]* x ");else for(var o=t.length-1;o>=0;--o){var a=t.slice(0),i=n.slice(0);i.unshift(a.splice(o,1)[0]),e(a,i);}}(n,[]),"(?:".concat(r.join("|"),")")}}]),t}();r(og,"showVernacular",!0),r(og,"MIN_SEARCH_LENGTH",2),r(og,"MAXIMUM_RESULTS",25),r(og,"abbreviatedGenusRegex",/^(X\s+)?([a-z])[.\s]+(.*?)$/i),r(og,"nameStringColumn",0),r(og,"canonicalColumn",1),r(og,"hybridCanonicalColumn",2),r(og,"acceptedEntityIdColumn",3),r(og,"qualifierColumn",4),r(og,"authorityColumn",5),r(og,"vernacularColumn",6),r(og,"vernacularRootColumn",7),r(og,"usedColumn",8),r(og,"minRankColumn",9),r(og,"taxonRankNameSearchRegex",[/\s+sub-?g(?:en(?:us)?)?[.\s]+/i,/\s+sect(?:ion)?[.\s]+/i,/\s+subsect(?:ion)?[.\s]+/i,/\s+ser(?:ies)?[.\s]+/i,/\s+gp[.\s]+/i,/\s+s(?:ub)?-?sp(?:ecies)?[.\s]+/i,/\s+morphotype\s+/i,/\s+var[.\s]+/i,/\s+cv[.\s]+/i,/\s+n(?:otho)?v(?:ar)?[.\s]+/i,/\s+f[.\s]+|\s+forma?\s+/i,/\s+n(?:otho)?ssp[.\s]+/i]),r(og,"taxonRankNameReplacement",[" subg. "," sect. "," subsect. "," ser. "," group "," subsp. "," morph. "," var. "," cv. "," nothovar. "," f. "," nothosubsp. "]),r(og,"cleanRankNamesRegex",/\s(subfam\.|subg\.|sect\.|subsect\.|ser\.|subser\.|subsp\.|nothosubsp\.|microsp\.|praesp\.|agsp\.|race|convar\.|nm\.|microgene|f\.|subvar\.|var\.|nothovar\.|cv\.|sublusus|taxon|morph\.|group|sp\.)\s/),r(og,"taxonQualifierSearchRegex",[/\s*\(?\bf\s*x\s*m or m\s*x\s*f\)?\s*$/i,/\s*\(?\bm\s*x\s*f or f\s*x\s*m\)?\s*$/i,/\s*\(?\bf\s*x\s*m\)?\s*$/i,/\s*\(?\bm\s*x\s*f\)?\s*$/i,/\s*\(?\bfemale\s*x\s*male\)?\s*$/i,/\s*\(?\bmale\s*x\s*female\)?\s*$/i,/\s*'male'\s*$/i,/\s*'female'\s*$/i,/\b\s*sens\.?\s*lat[.\s]+/i,/\b\s*s\.\s*lat\.?\s*\b/i,/\b\s*s\.?\s*l\.?\s+\b/i,/\b\s*sensu\s*lato\s+\b|\(\s*sensu\s*lato\s*\)/i,/\b\s*sensu\s*stricto\s+\b|\(\s*sensu\s*stricto\s*\)/i,/\b\s*sens\.?\s*strict[.\s]+/i,/\b\s*sens\.?\s*str\.?\s*(?=\))|\b\s*sens\.?\s*str[.\s]+/i,/\b\s*s\.\s*str[.\s]+/i,/\b\s*s\.?\s*s\.?\s+\b/i,/\b\s*sens\.?\s*lat\.?\s*$/i,/\b\s*s\.\s*lat\.?\s*$/i,/\b\s*s\.?\s*l\.?\s*$/i,/\b\s*sensu\s*lato\s*$/i,/\b\s*sensu\s*stricto\s*$/i,/\b\s*sens\.?\s*strict\.?\s*$/i,/\b\s*sens\.?\s*str\.?\s*$/i,/\b\s*s\.\s*str\.?\s*$/i,/\b\s*s\.?\s*s\.?\s*$/i,/\b\s*agg\.?\s*$/i,/\b\s*aggregate\s*$/i,/\b\s*sp\.?\s*cultivar\s*$/i,/\b\s*sp\.?\s*cv\.?\s*$/i,/\b\s*cultivars?\s*$/i,/\b\s*cv\s+$/i,/\b\s*cv$/i,/\b\s*cf\s*$/i,/\b\s*aff\s*$/i,/\b\s*s\.?n\.?\s*$/i,/\b\s*sp\.?\s*nov\.?\s*$/i,/\b\s*auct[.\s]*$/i,/\b\s*ined[.\s]*$/i,/\b\s*nom\.?\snud[.\s]*$/i,/\b\s*p\.p[.\s?]*$/i,/\b\s*spp?\.?[\s?]*$/i,/\b\s*species\s*$/i,/\b\s*spp?\.?\s*\(/i,/\b\s*species\s*\(/i]),r(og,"taxonQualifierReplacement",[" "," "," (f x m)"," (m x f)"," (f x m)"," (m x f)"," male"," female"," s.l. "," s.l. "," s.l. "," s.l. "," s.s. "," s.s. "," s.s. "," s.s. "," s.s. "," s.l."," s.l."," s.l."," s.l."," s.s."," s.s."," s.s."," s.s."," s.s."," agg."," agg."," cv. "," cv. "," cv. "," cv. "," cv. "," cf."," aff."," sp.nov."," sp.nov."," auct."," ined."," nom. nud."," pro parte","",""," ("," ("]),r(og,"cleanRegex",/[.*+?^${}()|[\]\\]/g);var ag=function(){function t(){e(this,t);}return n(t,null,[{key:"taxaLoadedEntryPoint",value:function(){for(qp.rawTaxa=BsbiDb.TaxonNames;t.callbackStack.length;){var e=t.callbackStack.shift();try{e();}catch(e){console.log({"Exception after taxon load":e});}}}},{key:"onceTaxaLoaded",value:function(){return BsbiDb.hasOwnProperty("TaxonNames")?Promise.resolve():(BsbiDb.taxonNamesLoadedEntryPoint||(BsbiDb.taxonNamesLoadedEntryPoint=t.taxaLoadedEntryPoint),new Promise((function(e){t.callbackStack.push(e);})))}}]),t}();function ig(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}function sg(e,t,n){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,n);}r(ag,"callbackStack",[]),or({target:"URL",proto:!0,enumerable:!0},{toJSON:function(){return URL.prototype.toString.call(this)}});var cg=new WeakMap,lg=new WeakMap;(function(t){po(a,dv);var o=ig(a);function a(t){var n;return e(this,a),sg(fo(n=o.call(this,t)),cg,{writable:!0,value:void 0}),sg(fo(n),lg,{writable:!0,value:void 0}),r(fo(n),"_value",""),r(fo(n),"_inputType","date"),r(fo(n),"_autocomplete",""),n._value=(new Date).toJSON().slice(0,10),t&&(t.placeholder&&(n.placeholder=t.placeholder),t.autocomplete&&(n._autocomplete=t.autocomplete)),n}return n(a,[{key:"value",get:function(){return this._value},set:function(e){this._value=void 0===e||null==e?(new Date).toJSON().slice(0,10):e.trim(),this.updateView();}},{key:"updateView",value:function(){this._fieldEl&&(document.getElementById(go(this,cg)).value=dv.cleanRawString(this._value));}},{key:"buildField",value:function(){var e=document.createElement("div");e.className="form-group",mo(this,lg,e.id=dv.nextId),mo(this,cg,dv.nextId);var t=e.appendChild(document.createElement("label"));t.htmlFor=go(this,cg),t.textContent=this.label;var n=e.appendChild(document.createElement("input"));n.className="form-control",n.id=go(this,cg);try{n.type=this._inputType;}catch(e){console.log("Failed to set type '".concat(this._inputType,"'"));}if(this.placeholder&&(n.placeholder=this.placeholder),this._autocomplete&&(n.autocomplete=this._autocomplete,"off"===this._autocomplete&&(n.name=Bp())),this.completion===dv.COMPLETION_COMPULSORY&&(n.required=!0),this.validationMessage){var r=e.appendChild(document.createElement("div"));r.className="invalid-feedback",r.innerHTML=this.validationMessage;}this.helpText&&(e.appendChild(document.createElement("small")).innerHTML=this.helpText);n.addEventListener("change",this.inputChangeHandler.bind(this)),this._fieldEl=e;}},{key:"markValidity",value:function(e){var t=document.getElementById(go(this,cg));null===e?t.classList.remove("is-invalid","is-valid"):(t.classList.remove(e?"is-invalid":"is-valid"),t.classList.add(e?"is-valid":"is-invalid"));}},{key:"inputChangeHandler",value:function(e){e.stopPropagation(),console.log("got date field change event"),this.value=dv.cleanRawString(document.getElementById(go(this,cg)).value),this.fireEvent(dv.EVENT_CHANGE);}}],[{key:"summariseImpl",value:function(e,t,n){return ""!==n[e]&&null!==n[e]&&void 0!==n[e]?Xp(n[e].trim()):""}}]),a})();function dg(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return fg(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return fg(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return {s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return {s:function(){n=n.call(e);},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,a=e;},f:function(){try{i||null==n.return||n.return();}finally{if(s)throw a}}}}function fg(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function hg(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}function pg(e,t){Sg(e,t),t.add(e);}function vg(e,t,n){Sg(e,t),t.set(e,n);}function Sg(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function yg(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}ps("WeakSet",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),Xs);var Tg=new WeakMap,Eg=new WeakMap,wg=new WeakMap,_g=new WeakSet,Cg=new WeakSet,Og=function(t){po(a,dv);var o=hg(a);function a(t){var n;return e(this,a),pg(fo(n=o.call(this,t)),Cg),pg(fo(n),_g),vg(fo(n),Tg,{writable:!0,value:void 0}),vg(fo(n),Eg,{writable:!0,value:void 0}),vg(fo(n),wg,{writable:!0,value:void 0}),r(fo(n),"parentForm",void 0),r(fo(n),"_value",{images:[]}),r(fo(n),"includeCamera",!0),r(fo(n),"placeholder",""),t&&(t.hasOwnProperty("includeCamera")&&(n.includeCamera=t.includeCamera),t.placeholder&&(n.placeholder=t.placeholder)),n}return n(a,[{key:"value",get:function(){var e=[];if(this._value&&this._value.images){var t,n=dg(this._value.images);try{for(n.s();!(t=n.n()).done;){var r=t.value;e[e.length]=r.id;}}catch(e){n.e(e);}finally{n.f();}}return e},set:function(e){if(this._value={images:[]},e){var t,n=dg(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;Hy.imageCache.has(r)?this._value.images.push(Hy.imageCache.get(r)):(console.log("Creating placeholder image object '".concat(r,"'")),this._value.images.push(Hy.placeholder(r)));}}catch(e){n.e(e);}finally{n.f();}}this.updateView();}},{key:"updateView",value:function(){if(this._fieldEl){var e,t=[],n=dg(this._value.images);try{for(n.s();!(e=n.n()).done;){var r=e.value;t.push('<picture style="cursor: pointer;" data-imageid="'.concat(r.id,'"><source srcset="/image.php?imageid=').concat(r.id,'&amp;height=128&amp;format=webp" type="image/webp"><img data-imageid="').concat(r.id,'" src="/image.php?imageid=').concat(r.id,'&amp;height=128&amp;format=jpeg" height="128" alt="photo"></picture>'));}}catch(e){n.e(e);}finally{n.f();}document.getElementById(go(this,wg)).innerHTML=t.join("\n");}}},{key:"buildField",value:function(){var e=document.createElement("div");e.className="form-group",mo(this,Eg,e.id=dv.nextId),mo(this,Tg,dv.nextId);var t=e.appendChild(document.createElement("label"));t.htmlFor=go(this,Tg),t.textContent=this.label;var n=e.appendChild(document.createElement("div"));n.className="input-group";var r=document.createElement("div");r.className="custom-file",n.appendChild(r);var o=r.appendChild(document.createElement("input"));if(o.type="file",o.className="custom-file-input",o.id=go(this,Tg),o.accept=".jpeg, .jpg, image/png, image/jpeg",o.multiple=!0,this.placeholder){var a=r.appendChild(document.createElement("label"));a.className="custom-file-label",a.htmlFor=go(this,Tg),a.textContent=this.placeholder;}if(this.includeCamera){var i=document.createElement("div");i.className="input-group-append";var s=i.appendChild(document.createElement("span"));s.className="input-group-text";var c=s.appendChild(document.createElement("label"));c.className="pl-0 pr-0 ml-0 mr-0 mt-0 mb-0 pt-0 pb-0 material-icons";var l=c.appendChild(document.createElement("i"));l.className="material-icons pl-0 pr-0 ml-0 mr-0 mt-0 mb-0 pt-0 pb-0",l.textContent="add_a_photo";var u=c.appendChild(document.createElement("input"));u.type="file",u.capture="environment",u.accept="image/*",u.style.display="none",u.id=dv.nextId,n.appendChild(i),u.addEventListener("change",this.inputChangeHandler.bind(this,u.id));}this.helpText&&(e.appendChild(document.createElement("small")).innerHTML=this.helpText);var d=e.appendChild(document.createElement("p"));if(mo(this,wg,d.id=dv.nextId),d.addEventListener("click",this.imageClickHandler.bind(this)),this.validationMessage){var f=e.appendChild(document.createElement("div"));f.className="invalid-feedback",f.innerHTML=this.validationMessage;}o.addEventListener("change",this.inputChangeHandler.bind(this,o.id)),this._fieldEl=e,this.parentForm.addListener("deleteimage",this.deleteImageHandler.bind(this));}},{key:"deleteImageHandler",value:function(e){var t;for(var n in console.log("delete image ".concat(e.imageId)),this._value.images)if(this._value.images.hasOwnProperty(n)&&this._value.images[n].id===e.imageId){t=this._value.images.splice(n,1)[0];break}t?(this.updateView(),this.fireEvent(dv.EVENT_CHANGE)):console.log("Failed to find image id ".concat(e.imageId));}},{key:"imageClickHandler",value:function(e){var t=e.target.closest("picture");t||(t=e.target.closest("img")),console.log({"clicked image":t});var n=t.getAttribute("data-imageid");n&&(document.getElementById("imagemodal").getElementsByTagName("picture")[0].innerHTML='<source srcset="/image.php?imageid='.concat(n,"&amp;width=").concat(window.innerWidth,'&amp;format=webp" type="image/webp">\n                <img src="/image.php?imageid=').concat(n,"&amp;width=").concat(window.innerWidth,'&amp;format=jpeg" width="auto" style="max-height: 48vh; max-width: 100%;" alt="photo">'),document.getElementById("imagemodaldelete").setAttribute("data-imageid",n),$("#".concat("imagemodal")).modal({}));}},{key:"inputChangeHandler",value:function(e,t){var n=this;t.stopPropagation(),console.log("got image field input change event");var r=document.getElementById(e);r.files.length?yg(this,_g,Rg).call(this,r.files).then((function(){n.fireEvent(dv.EVENT_CHANGE);})):this.fireEvent(dv.EVENT_CHANGE);}}],[{key:"isEmpty",value:function(e){return !e||0===e.length}},{key:"licenseModal",value:function(){var e=document.createElement("div");return e.innerHTML='<div class="modal fade" id="'.concat(a.LICENSE_MODAL,'" tabindex="-1" role="dialog" aria-labelledby="').concat(a.LICENSE_MODAL,'Title" aria-hidden="true">\n  <div class="modal-dialog modal-dialog-centered" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h5 class="modal-title" id="').concat(a.LICENSE_MODAL,'Title">Image licensing</h5>\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n          <span aria-hidden="true">&times;</span>\n        </button>\n      </div>\n      <div class="modal-body">\n        <p>By choosing to submit images with your Garden Wildflower Hunt records you agree to license the image under the terms of the Creative Common Attribution 4.0 International license (CC BY 4.0).</p>\n        <p>The following is a summary of (and not a substitute for) the <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">license</a>.</p>\n        <p>Licensees are free to:</p>\n        <ul class="license-properties">\n<li>\n<strong>Share</strong> — copy and redistribute the material in any medium or format\n</li>\n<li>\n<strong>Adapt</strong> — remix, transform, and build upon the material for any purpose, even commercially.\n</li>\n</ul>\n<p>Licensees are most follow these term:</p>\n<ul>\n<li>\n<p>\n<strong>Attribution</strong> — licensees must give appropriate credit, provide a link to the license, and indicate if changes were made.\n</p>\n</li>\n</ul>\n<p>Full details of the license are here: <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0 license</a></p>\n\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n      </div>\n    </div>\n  </div>\n</div>'),e.firstChild}}]),a}();function Rg(e){this.parentForm.pingOccurrence();var t,n=[],r=dg(e);try{for(r.s();!(t=r.n()).done;){var o=t.value;n.push(Hy.fromFile(o));}}catch(e){r.e(e);}finally{r.f();}return yg(this,Cg,Ig).call(this,n)}function Ig(e){var t=this;if(e.length){var n=e.shift();return n.save(this.parentForm.surveyId,this.parentForm.occurrenceId,this.parentForm.projectId).then((function(e){console.log("Added image '".concat(n.id,"'")),console.log({jsonDescription:e}),t._value.images.push(n),t.updateView();}),(function(e){console.log("Failed to add image ".concat(n.id)),console.log({"Failure reason":e});})).finally((function(){return yg(t,Cg,Ig).call(t,e)}))}return Promise.resolve()}function Mg(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}function Lg(e,t,n){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,n);}r(Og,"LICENSE_MODAL","imagelicensemodal");var xg=new WeakMap,Hg=new WeakMap;(function(t){po(a,dv);var o=Mg(a);function a(t){var n;return e(this,a),Lg(fo(n=o.call(this,t)),xg,{writable:!0,value:void 0}),Lg(fo(n),Hg,{writable:!0,value:void 0}),r(fo(n),"_value",""),r(fo(n),"_inputType","text"),r(fo(n),"_autocomplete",""),t&&(t.type&&(n._inputType=t.type),t.placeholder&&(n.placeholder=t.placeholder),t.autocomplete&&(n._autocomplete=t.autocomplete)),n}return n(a,[{key:"value",get:function(){return this._value},set:function(e){this._value=void 0===e||null==e?"":e.trim(),this.updateView();}},{key:"updateView",value:function(){this._fieldEl&&(document.getElementById(go(this,xg)).value=dv.cleanRawString(this._value));}},{key:"buildField",value:function(){var e=document.createElement("div");e.className="form-group",mo(this,Hg,e.id=dv.nextId),mo(this,xg,dv.nextId);var t=e.appendChild(document.createElement("label"));t.htmlFor=go(this,xg),t.textContent=this.label;var n=e.appendChild(document.createElement("input"));n.className="form-control",n.id=go(this,xg);try{n.type=this._inputType;}catch(e){console.log("Failed to set type '".concat(this._inputType,"'"));}if(this.placeholder&&(n.placeholder=this.placeholder),this._autocomplete&&(n.autocomplete=this._autocomplete,"off"===this._autocomplete&&(n.name=Bp())),this.completion===dv.COMPLETION_COMPULSORY&&(n.required=!0),this.validationMessage){var r=e.appendChild(document.createElement("div"));r.className="invalid-feedback",r.innerHTML=this.validationMessage;}this.helpText&&(e.appendChild(document.createElement("small")).innerHTML=this.helpText);n.addEventListener("change",this.inputChangeHandler.bind(this)),this._fieldEl=e;}},{key:"markValidity",value:function(e){var t=document.getElementById(go(this,xg));null===e?t.classList.remove("is-invalid","is-valid"):(t.classList.remove(e?"is-invalid":"is-valid"),t.classList.add(e?"is-valid":"is-invalid"));}},{key:"inputChangeHandler",value:function(e){e.stopPropagation(),console.log("got input field change event"),this.value=dv.cleanRawString(document.getElementById(go(this,xg)).value),this.fireEvent(dv.EVENT_CHANGE);}}],[{key:"summariseImpl",value:function(e,t,n){return ""!==n[e]&&null!==n[e]&&void 0!==n[e]?Xp(n[e].trim()):""}}]),a})();function Pg(e,t,n){if(n.length>2){var r=n.pop();return "".concat(n.join(e+" ")," ").concat(t," ").concat(r)}return n.join(" ".concat(t," "))}function Ag(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return Dg(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Dg(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return {s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return {s:function(){n=n.call(e);},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,a=e;},f:function(){try{i||null==n.return||n.return();}finally{if(s)throw a}}}}function Dg(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Fg(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}function Ug(e,t,n){jg(e,t),t.set(e,n);}function jg(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function Jg(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}function Bg(e,t,n){return function(e,t){if(e!==t)throw new TypeError("Private static access of wrong provenance")}(e,t),function(e,t){if(void 0===e)throw new TypeError("attempted to "+t+" private static field before its declaration")}(n,"get"),function(e,t){if(t.get)return t.get.call(e);return t.value}(e,n)}var Yg=new WeakMap,Gg=new WeakMap,Kg=new WeakSet,Vg=function(t){po(a,dv);var o=Fg(a);function a(t){var n,i,s;return e(this,a),n=o.call(this,t),jg(i=fo(n),s=Kg),s.add(i),Ug(fo(n),Yg,{writable:!0,value:void 0}),Ug(fo(n),Gg,{writable:!0,value:void 0}),r(fo(n),"options",{}),r(fo(n),"includeOtherFreeText",!0),r(fo(n),"_value",{selection:[],other:null}),t&&(t.options&&(n.options=t.options),t.hasOwnProperty("includeOtherFreeText")&&(n.includeOtherFreeText=t.includeOtherFreeText)),n}return n(a,[{key:"value",get:function(){return this._value},set:function(e){this._value=e||{selection:[],other:null},this.updateView();}},{key:"updateView",value:function(){if(this._fieldEl){var e,t=Ag(document.querySelectorAll("".concat(Bg(a,a,qg),"#").concat(go(this,Yg),' input[type="checkbox"]')));try{for(t.s();!(e=t.n()).done;){var n=e.value,r=n.checked=this._value.selection.includes(n.name);if(n.name===a.KEY_OTHER&&go(this,Gg)){var o=document.getElementById(go(this,Gg));o.style.display=r?"block":"none",o.value=null===this._value.other?"":this._value.other.trim();}}}catch(e){t.e(e);}finally{t.f();}}}},{key:"buildField",value:function(){if(!this.options)throw new Error("Options have not been set before call to buildField()");var e=document.createElement(Bg(a,a,qg));e.className="form-group",mo(this,Yg,e.id=dv.nextId);var t=e.appendChild(document.createElement("label"));(t.style.display="block",t.textContent=this.label,this.helpText)&&(e.appendChild(document.createElement("small")).innerHTML=this.helpText);for(var n in this.options)this.options.hasOwnProperty(n)&&Jg(this,Kg,Xg).call(this,e,n,this.options[n]);if(this.validationMessage){var r=e.appendChild(document.createElement("div"));r.className="invalid-feedback",r.innerHTML=this.validationMessage;}e.addEventListener("change",this.inputChangeHandler.bind(this)),this._fieldEl=e;}},{key:"inputChangeHandler",value:function(e){e.stopPropagation();var t,n={selection:[],other:null};go(this,Gg)&&(t=document.getElementById(go(this,Gg)));var r,o=Ag(document.querySelectorAll("".concat(Bg(a,a,qg),"#").concat(go(this,Yg),' input[type="checkbox"]:checked')));try{for(o.s();!(r=o.n()).done;){var i=r.value;n.selection[n.selection.length]=i.name,i.name===a.KEY_OTHER&&go(this,Gg)&&(n.other=dv.cleanRawInput(t),!0);}}catch(e){o.e(e);}finally{o.f();}this.value=n,this.fireEvent(dv.EVENT_CHANGE);}}],[{key:"summariseImpl",value:function(e,t,n){var r=t.summary,o=[];if(n[e].selection.length){var a,i=Ag(n[e].selection);try{for(i.s();!(a=i.n()).done;){var s=a.value;"other"===s&&n[e].other?o[o.length]="".concat(t.attributes.options[s].summary||t.attributes.options[s].label," (").concat(n[e].other,")"):o[o.length]=t.attributes.options[s].summary||t.attributes.options[s].label;}}catch(e){i.e(e);}finally{i.f();}return Xp("".concat(r.summaryPrefix," ").concat(Pg(",","or",o)))}return ""}}]),a}();function Xg(e,t,n){var r=e.appendChild(document.createElement("div"));r.className="form-check";var o=r.appendChild(document.createElement("input"));o.type="checkbox",o.className="form-check-input",o.id=dv.nextId,o.name=t;var a=r.appendChild(document.createElement("label"));if(a.htmlFor=o.id,a.className="form-check-label",a.textContent=n.label,Vg.KEY_OTHER===t&&this.includeOtherFreeText){var i=r.appendChild(document.createElement("input"));i.id=mo(this,Gg,dv.nextId),i.className="form-control",i.style.display="none";}}r(Vg,"KEY_OTHER","other");var qg={writable:!0,value:"fieldset"};function Qg(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return Wg(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Wg(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return {s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return {s:function(){n=n.call(e);},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,a=e;},f:function(){try{i||null==n.return||n.return();}finally{if(s)throw a}}}}function Wg(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Zg(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}function $g(e,t,n){zg(e,t),t.set(e,n);}function zg(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function eb(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}function tb(e,t,n){return function(e,t){if(e!==t)throw new TypeError("Private static access of wrong provenance")}(e,t),function(e,t){if(void 0===e)throw new TypeError("attempted to "+t+" private static field before its declaration")}(n,"get"),function(e,t){if(t.get)return t.get.call(e);return t.value}(e,n)}var nb=new WeakMap,rb=new WeakMap,ob=new WeakMap,ab=new WeakSet;(function(t){po(a,dv);var o=Zg(a);function a(t){var n,i,s;return e(this,a),n=o.call(this,t),zg(i=fo(n),s=ab),s.add(i),$g(fo(n),nb,{writable:!0,value:void 0}),$g(fo(n),rb,{writable:!0,value:void 0}),$g(fo(n),ob,{writable:!0,value:void 0}),r(fo(n),"options",{}),r(fo(n),"placeholder",""),r(fo(n),"includeOtherFreeText",!0),r(fo(n),"_value",{selection:[],other:null}),t&&(t.options&&(n.options=t.options),t.hasOwnProperty("includeOtherFreeText")&&(n.includeOtherFreeText=t.includeOtherFreeText),t.placeholder&&(n.placeholder=t.placeholder)),n}return n(a,[{key:"value",get:function(){return this._value},set:function(e){this._value=e||{selection:[],other:null},this.updateView();}},{key:"markValidity",value:function(e){var t=document.getElementById(go(this,rb));null===e?t.classList.remove("is-invalid","is-valid"):(t.classList.remove(e?"is-invalid":"is-valid"),t.classList.add(e?"is-valid":"is-invalid"));}},{key:"updateView",value:function(){if(this._fieldEl){var e,t=Qg(document.querySelectorAll("select#".concat(go(this,rb)," option")));try{for(t.s();!(e=t.n()).done;){var n=e.value;if(""!==n.value){var r=n.selected=this._value.selection.includes(n.value);if(n.value===Vg.KEY_OTHER&&go(this,ob)){var o=document.getElementById(go(this,ob));o.style.display=r?"block":"none",o.value=null===this._value.other?"":this._value.other.trim();}}else n.selected=0===this._value.selection.length;}}catch(e){t.e(e);}finally{t.f();}}}},{key:"buildField",value:function(){if(!this.options)throw new Error("Options have not been set before call to buildField()");var e=document.createElement(tb(a,a,cb));e.className="form-group",mo(this,nb,e.id=dv.nextId),mo(this,rb,dv.nextId);var t=e.appendChild(document.createElement("label"));t.htmlFor=go(this,rb),t.style.display="block",t.innerHTML=this.label;var n=document.createElement("select");(n.id=go(this,rb),n.className="custom-select",this.helpText)&&(e.appendChild(document.createElement("small")).innerHTML=this.helpText);for(var r in this.placeholder&&eb(this,ab,sb).call(this,e,n,"",{label:this.placeholder}),this.options)this.options.hasOwnProperty(r)&&eb(this,ab,sb).call(this,e,n,r,this.options[r]);if(e.appendChild(n),this.validationMessage){var o=e.appendChild(document.createElement("div"));o.className="invalid-feedback",o.innerHTML=this.validationMessage;}e.addEventListener("change",this.inputChangeHandler.bind(this)),this._fieldEl=e;}},{key:"inputChangeHandler",value:function(e){e.stopPropagation();var t,n={selection:[],other:null};go(this,ob)&&(t=document.getElementById(go(this,ob)));var r,o=Qg(document.querySelectorAll("select#".concat(go(this,rb)," option:checked")));try{for(o.s();!(r=o.n()).done;){var a=r.value;""!==a.value&&(n.selection[n.selection.length]=a.value,a.name===Vg.KEY_OTHER&&go(this,ob)&&(n.other=dv.cleanRawInput(t),!0));}}catch(e){o.e(e);}finally{o.f();}this.value=n,this.fireEvent(dv.EVENT_CHANGE);}}],[{key:"isEmpty",value:function(e){return 0===e.selection.length||""===e.selection[0]}},{key:"summariseImpl",value:function(e,t,n){var r=t.summary,o=[];if(n[e].selection.length){var a,i=Qg(n[e].selection);try{for(i.s();!(a=i.n()).done;){var s=a.value;"other"===s&&n[e].other?o[o.length]="".concat(t.attributes.options[s].summary||t.attributes.options[s].label," (").concat(n[e].other,")"):o[o.length]=t.attributes.options[s].summary||t.attributes.options[s].label;}}catch(e){i.e(e);}finally{i.f();}return Xp("".concat(r.summaryPrefix," ").concat(Pg(",","or",o)))}return ""}}]),a})();function sb(e,t,n,r){var o=t.appendChild(document.createElement("option"));if(o.value=n,o.innerText=r.label,Vg.KEY_OTHER===n&&this.includeOtherFreeText){var a=e.appendChild(document.createElement("input"));a.id=mo(this,ob,dv.nextId),a.className="form-control";}}var cb={writable:!0,value:"fieldset"},lb=or,ub=tv.start,db=av("trimStart"),fb=db?function(){return ub(this)}:"".trimStart;lb({target:"String",proto:!0,name:"trimStart",forced:db},{trimStart:fb,trimLeft:fb});var hb=or,pb=Ms.find,vb=Ro,Sb=!0;function yb(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return Nb(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Nb(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return {s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return {s:function(){n=n.call(e);},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,a=e;},f:function(){try{i||null==n.return||n.return();}finally{if(s)throw a}}}}function Nb(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function mb(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}function gb(e,t,n){bb(e,t),t.set(e,n);}function bb(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function Tb(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}"find"in[]&&Array(1).find((function(){Sb=!1;})),hb({target:"Array",proto:!0,forced:Sb},{find:function(e){return pb(this,e,arguments.length>1?arguments[1]:void 0)}}),vb("find");var Eb=new WeakMap,wb=new WeakMap,_b=new WeakMap,Cb=new WeakMap,Ob=new WeakMap,Rb=new WeakMap,Ib=new WeakMap,Mb=new WeakMap,Lb=new WeakSet,xb=function(t){po(a,dv);var o=mb(a);function a(t){var n,i,s;return e(this,a),n=o.call(this,t),bb(i=fo(n),s=Lb),s.add(i),r(fo(n),"taxonSearch",void 0),gb(fo(n),Eb,{writable:!0,value:void 0}),gb(fo(n),wb,{writable:!0,value:void 0}),gb(fo(n),_b,{writable:!0,value:void 0}),gb(fo(n),Cb,{writable:!0,value:void 0}),gb(fo(n),Ob,{writable:!0,value:null}),gb(fo(n),Rb,{writable:!0,value:null}),gb(fo(n),Ib,{writable:!0,value:null}),r(fo(n),"_lastInputValue",""),gb(fo(n),Mb,{writable:!0,value:[]}),r(fo(n),"_value",{taxonId:"",taxonName:"",vernacularMatch:!1}),n.taxonSearch=new og,n}return n(a,[{key:"value",get:function(){return this._value},set:function(e){var t;e&&e.taxonId?(t=qp.fromId(e.taxonId),this._value={taxonId:t.id,taxonName:e.vernacularMatch?t.vernacular:t.nameString,vernacularMatch:e.vernacularMatch}):this._value={taxonId:"",taxonName:e&&e.taxonName?e.taxonName:"",vernacularMatch:null},this.updateView();}},{key:"updateView",value:function(){this._fieldEl&&(document.getElementById(go(this,Eb)).value=this._value.taxonName,this._lastInputValue=this._value.taxonName);}},{key:"markValidity",value:function(e){var t=document.getElementById(go(this,Eb));null===e?t.classList.remove("is-invalid","is-valid"):(t.classList.remove(e?"is-invalid":"is-valid"),t.classList.add(e?"is-valid":"is-invalid"));}},{key:"buildField",value:function(){var e=document.createElement("div");e.className="form-group",mo(this,Cb,e.id=dv.nextId),mo(this,Eb,dv.nextId);var t=e.appendChild(document.createElement("label"));t.htmlFor=go(this,Eb),t.textContent=this.label;var n=e.appendChild(document.createElement("div"));n.className="dropdown-wrapper";var r=n.appendChild(document.createElement("input"));if(r.className="form-control dropdown-input",r.id=go(this,Eb),r.autocomplete="off",r.spellcheck=!1,this.validationMessage){var o=n.appendChild(document.createElement("div"));o.className="invalid-feedback",o.innerHTML=this.validationMessage;}var a=n.appendChild(document.createElement("div"));(a.className="dropdown-list",mo(this,wb,a.id=dv.nextId),mo(this,_b,dv.nextId),this.helpText)&&(e.appendChild(document.createElement("small")).innerHTML=this.helpText);r.addEventListener("keydown",this.keydownHandler.bind(this)),r.addEventListener("input",this.inputHandler.bind(this)),r.addEventListener("change",this.inputChangeHandler.bind(this)),e.addEventListener("focusin",this.focusHandler.bind(this)),e.addEventListener("focusout",this.blurHandler.bind(this)),a.addEventListener("click",this.dropboxClickHandler.bind(this)),this._fieldEl=e;}},{key:"keydownHandler",value:function(e){switch(this._lastInputValue=e.target.value.trimLeft(),e.key){case"Enter":case"ArrowUp":case"ArrowDown":e.preventDefault();}}},{key:"inputHandler",value:function(e){e.target.value.trimLeft()!==this._lastInputValue&&Tb(this,Lb,Hb).call(this,e.target);}},{key:"keyupHandler",value:function(e){!e.key||1!==e.key.length&&"Backspace"!==e.key&&"Delete"!==e.key||Tb(this,Lb,Hb).call(this,e.target);}},{key:"focusHandler",value:function(e){console.log("focused");var t=document.getElementById(go(this,wb));if(!t.classList.contains("dropdown-focused")){var n=document.getElementById(go(this,Eb));Tb(this,Lb,Hb).call(this,n),t.classList.add("dropdown-focused");}}},{key:"blurHandler",value:function(e){var t=this;go(this,Ob)&&(clearTimeout(go(this,Ob)),mo(this,Ob,null)),setTimeout((function(){document.getElementById(go(t,wb)).classList.remove("dropdown-focused");}),500);}},{key:"refreshSearchResultsList",value:function(){var e=document.getElementById(go(this,wb));if(go(this,Mb).length){var t,n=[],r=0,o=yb(go(this,Mb));try{for(o.s();!(t=o.n()).done;){var a=t.value;n[n.length]='<a class="list-group-item list-group-item-action" href="#" data-occurrenceId="'.concat(a.entityId,'" data-resultnumber="').concat(r,'">').concat(og.formatter(a),"</a>"),++r;}}catch(e){o.e(e);}finally{o.f();}e.innerHTML='<div class="list-group" id="'.concat(go(this,_b),'">').concat(n.join(""),"</div>");}else e.innerHTML="";mo(this,Ib,null);}},{key:"dropboxClickHandler",value:function(e){console.log("click handler"),console.log(e);var t=e.target.closest("a");if(console.log(t),go(this,Rb)&&(clearTimeout(go(this,Rb)),mo(this,Rb,null),console.log("cleared a pending change event")),t&&t.dataset.occurrenceid){e.preventDefault(),console.log("got target ".concat(t.dataset.occurrenceid));var n=go(this,Mb)[t.dataset.resultnumber];this.value={taxonId:n.entityId,taxonName:n.vernacularMatched?n.vernacular:n.qname,vernacularMatch:n.vernacularMatched},this.fireEvent(dv.EVENT_CHANGE);}}},{key:"inputChangeHandler",value:function(e){var t=this;e.stopPropagation(),console.log("got taxon field input change event"),go(this,Rb)&&clearTimeout(go(this,Rb)),mo(this,Rb,setTimeout((function(){console.log("processing taxon field input change event");var e=go(t,Mb).find((function(e){return e.exact}));e?(console.log("exact match"),t.value={taxonId:e.entityId,taxonName:e.vernacularMatched?e.vernacular:e.qname,vernacularMatch:e.vernacularMatched}):(console.log("no match"),t.value={taxonId:"",taxonName:document.getElementById(go(t,Eb)).value.trim(),vernacularMatch:null}),console.log(t._value),t.fireEvent(dv.EVENT_CHANGE);}),500));}}],[{key:"isEmpty",value:function(e){return !e||e&&!e.taxonName}},{key:"cleanRawInput",value:function(e){return e.value.trim().replace(/\s\s+/g," ")}}]),a}();function Hb(e){var t=this,n=dv.cleanRawInput(e);go(this,Ob)&&clearTimeout(go(this,Ob)),n.length>=og.MIN_SEARCH_LENGTH?mo(this,Ob,setTimeout((function(){mo(t,Mb,t.taxonSearch.lookup(dv.cleanRawInput(document.getElementById(go(t,Eb))))),console.log(go(t,Mb)),t.refreshSearchResultsList(),mo(t,Ob,null);}),xb.timeoutDelay)):(mo(this,Mb,[]),this.refreshSearchResultsList());}function kb(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}function Pb(e,t,n){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,n);}r(xb,"timeoutDelay",50);var Ab=new WeakMap,Db=new WeakMap;(function(t){po(a,dv);var o=kb(a);function a(t){var n;return e(this,a),Pb(fo(n=o.call(this,t)),Ab,{writable:!0,value:void 0}),Pb(fo(n),Db,{writable:!0,value:void 0}),r(fo(n),"_value",""),r(fo(n),"_autocomplete",""),t&&(t.options&&(n.options=t.options),t.placeholder&&(n.placeholder=t.placeholder),t.autocomplete&&(n._autocomplete=t.autocomplete)),n}return n(a,[{key:"value",get:function(){return this._value},set:function(e){this._value=void 0===e||null==e?"":e.trim(),this.updateView();}},{key:"updateView",value:function(){this._fieldEl&&(document.getElementById(go(this,Ab)).value=dv.cleanRawString(this._value));}},{key:"buildField",value:function(){var e=document.createElement("div");e.className="form-group",mo(this,Db,e.id=dv.nextId),mo(this,Ab,dv.nextId);var t=e.appendChild(document.createElement("label"));t.htmlFor=go(this,Ab),t.textContent=this.label;var n=e.appendChild(document.createElement("textarea"));(n.className="form-control",n.id=go(this,Ab),this.helpText)&&(e.appendChild(document.createElement("small")).innerHTML=this.helpText);if(this._autocomplete&&(n.autocomplete=this._autocomplete,"off"===this._autocomplete&&(n.name=Bp())),this.validationMessage){var r=e.appendChild(document.createElement("div"));r.className="invalid-feedback",r.innerHTML=this.validationMessage;}n.addEventListener("change",this.inputChangeHandler.bind(this)),this._fieldEl=e;}},{key:"inputChangeHandler",value:function(e){e.stopPropagation(),console.log("got text area field input change event"),this.value=dv.cleanRawString(document.getElementById(go(this,Ab)).value),this.fireEvent(dv.EVENT_CHANGE);}}],[{key:"summariseImpl",value:function(e,t,n){return ""!==n[e]&&null!==n[e]&&void 0!==n[e]?Xp(n[e].trim()):""}}]),a})();var Ub=function(){var e=function(){};return e.tetradOffsets={E:[0,8e3],J:[2e3,8e3],P:[4e3,8e3],U:[6e3,8e3],Z:[8e3,8e3],D:[0,6e3],I:[2e3,6e3],N:[4e3,6e3],T:[6e3,6e3],Y:[8e3,6e3],C:[0,4e3],H:[2e3,4e3],M:[4e3,4e3],S:[6e3,4e3],X:[8e3,4e3],B:[0,2e3],G:[2e3,2e3],L:[4e3,2e3],R:[6e3,2e3],W:[8e3,2e3],A:[0,0],F:[2e3,0],K:[4e3,0],Q:[6e3,0],V:[8e3,0]},e.quadrantOffsets={NW:[0,5e3],NE:[5e3,5e3],SW:[0,0],SE:[5e3,0]},e.letterMapping={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,J:8,K:9,L:10,M:11,N:12,O:13,P:14,Q:15,R:16,S:17,T:18,U:19,V:20,W:21,X:22,Y:23,Z:24},e.tetradLetters="ABCDEFGHIJKLMNPQRSTUVWXYZ",e.prototype.preciseGridRef="",e.prototype.length=0,e.prototype.hectad="",e.prototype.tetrad="",e.prototype.tetradLetter="",e.prototype.quadrant="",e.prototype.quadrantCode="",e.prototype.set_tetrad=function(){if(this.tetradLetter=e.tetradLetters.substr(5*(Math.floor(this.gridCoords.x%1e4/1e3)>>1)+(Math.floor(this.gridCoords.y%1e4/1e3)>>1),1),!this.tetradLetter)throw new Error("Failed to get tetrad letter when processing '"+this.preciseGridRef+"', easting="+this.gridCoords.x+" northing="+this.gridCoords.y);this.tetrad=this.hectad+this.tetradLetter;},e.get_normalized_precision=function(e,t){return e>2e3?1e4:e>1e3?2e3:e>100?1e3:e>10?100:e>1?10:t||1},e}(),jb=function(e,t){this.lat=e,this.lng=t;},Jb=Math.PI/180,Bb=180/Math.PI,Yb=function(e,t){this.lat=e,this.lng=t;};Yb.prototype.to_WGS84=function(){var e=6377563.396,t=.00667054007,n=this.lat*Jb,r=Math.sin(n),o=this.lng*Jb,a=e/Math.sqrt(1-t*(r*r)),i=a*Math.cos(n)*Math.cos(o),s=a*Math.cos(n)*Math.sin(o),c=(1-t)*a*r,l=-204894e-10,u=7.28190110241429e-7,d=119748977294801e-20,f=446.448+i*(1+l)+-u*s+d*c,h=408261589226812e-20*i-124.157+s*(1+l)+-u*c,p=542.06+-d*i+u*s+c*(1+l);e=6378137,t=.00669438003;for(var v=Math.sqrt(f*f+h*h),S=Math.atan(p/(v*(1-t))),y=1;y<10;++y){var N=Math.sin(S);S=Math.atan((p+t*(e/Math.sqrt(1-t*(N*N)))*N)/v);}return new jb(Bb*S,Bb*Math.atan(h/f))},Yb.from_wgs84=function(e){var t=e.lat*Jb,n=e.lng*Jb,r=.00669438037928458,o=.0066705397616,a=20.4894*1e-6,i=6378137/Math.sqrt(1-r*Math.sin(t)*Math.sin(t)),s=(i+0)*Math.cos(t)*Math.cos(n),c=(i+0)*Math.cos(t)*Math.sin(n),l=((1-r)*i+0)*Math.sin(t),u=-.1502/3600*Jb,d=-.247/3600*Jb,f=-.8421/3600*Jb,h=s+s*a-c*f+l*d-446.448,p=s*f+c+c*a-l*u+125.157,v=-1*s*d+c*u+l+l*a+-542.06,S=Math.atan(p/h),y=Math.sqrt(h*h+p*p),N=Math.atan(v/(y*(1-o)));i=6377563.396/Math.sqrt(1-o*(Math.sin(N)*Math.sin(N)));for(var m=1,g=0;m>.001;)g=Math.atan((v+o*i*Math.sin(N))/y),m=Math.abs(g-N),N=g;return new Yb(N*Bb,S*Bb)};var Gb=function(){var e=function(e,t){this.lat=e,this.lng=t;};return e._transform=function(t,n,r,o,a,i,s,c,l,u,d,f,h,p){var v=1e-6*p,S=r/Math.sqrt(1-o*(Math.sin(t)*Math.sin(t))),y=(S+a)*Math.cos(t)*Math.cos(n),N=(S+a)*Math.cos(t)*Math.sin(n),m=((1-o)*S+a)*Math.sin(t),g=d/3600*Jb,b=f/3600*Jb,T=h/3600*Jb,E=y+y*v-N*T+m*b+c,w=y*T+N+N*v-m*g+l,_=-1*y*b+N*g+m+m*v+u;n=Math.atan(w/E);var C=Math.sqrt(E*E+w*w);t=Math.atan(_/(C*(1-s))),S=i/Math.sqrt(1-s*(Math.sin(t)*Math.sin(t)));for(var O=1,R=0;O>.001;)R=Math.atan((_+s*S*Math.sin(t))/C),O=Math.abs(R-t),t=R;return new e(t,n)},e._Marc=function(e,t,n,r){return e*((1+t+5/4*(t*t)+5/4*(t*t*t))*(r-n)-(3*t+t*t*3+21/8*(t*t*t))*Math.sin(r-n)*Math.cos(r+n)+(15/8*(t*t)+15/8*(t*t*t))*Math.sin(2*(r-n))*Math.cos(2*(r+n))-35/24*(t*t*t)*Math.sin(3*(r-n))*Math.cos(3*(r+n)))},e}(),Kb=function(){var e=function(e,t){this.lat=e,this.lng=t;};return e.from_wgs84=function(t){var n=t.lat*Jb,r=t.lng*Jb,o=Gb._transform(n,r,6378137,.00669438037928458,0,6378388,.0067226700223333,83.901,98.127,118.635,0,0,0,0);return new e(o.lat*Bb,o.lng*Bb)},e}(),Vb=function(e,t){this.lat=e,this.lng=t;};Vb.prototype.to_WGS84=function(){var e=Gb._transform(this.lat*Jb,this.lng*Jb,6377340.189,.00667054015,0,6378137,.00669438037928458,482.53,-130.596,564.557,-1.042,-.214,-.631,-8.15);return new jb(e.lat*Bb,e.lng*Bb)},Vb.from_wgs84=function(e){var t=e.lat*Jb,n=e.lng*Jb,r=Gb._transform(t,n,6378137,.00669438037928458,0,6377340.189,.00667054015,-482.53,130.596,-564.557,1.042,.214,.631,8.15);return new Vb(r.lat*Bb,r.lng*Bb)};var Xb=function(){};Xb.tetradLetters="ABCDEFGHIJKLMNPQRSTUVWXYZ",Xb.tetradLettersRowFirst="AFKQVBGLRWCHMSXDINTYEJPUZ",Xb.from_latlng=function(e,t){if(t>=-8.74&&e>49.88){var n=new Yb.from_wgs84(new jb(e,t)).to_os_coords();if(n.x>=0&&n.is_gb_hectad())return n}if(t<-5.3&&e>51.34&&t>-11&&e<55.73){var r=new Vb.from_wgs84(new jb(e,t)).to_os_coords();return r.x<0||r.y<0?null:r}var o=new Kb.from_wgs84(new jb(e,t)).to_os_coords();return o.x>=5e5&&o.x<6e5&&o.y>=54e5&&o.y<56e5?o:null},Xb.calculate_tetrad=function(e,t){return e>=0&&t>=0?Xb.tetradLetters.charAt(5*Math.floor(e%1e4/2e3)+Math.floor(t%1e4/2e3)):""},Xb.prototype.toString=function(){return this.x+","+this.y};var qb=function(e,t,n,r){var o="00000"+Math.floor(t),a="00000"+Math.floor(n);if(2e3===r)return e+o.charAt(o.length-5)+a.charAt(a.length-5)+Xb.calculate_tetrad(t,n);if(1e5===r)return e;5e3===r&&(r=1e4);var i=Math.round(Math.log10(r));return e+(i?o.slice(-5,-i)+a.slice(-5,-i):o.slice(-5)+a.slice(-5))},Qb=function(e,t){this.x=e,this.y=t;};(Qb.prototype=new Xb).constructor=Qb,Qb.prototype.country="CI",Qb.prototype.to_latLng=function(){var e=.0067226700223333,t=6375836.6448,n=6354369.181221601,r=this.x-5e5,o=Wb(this.y,0,t,0,.0016863406508729017,n),a=t/Math.sqrt(1-e*(Math.sin(o)*Math.sin(o))),i=a*(1-e)/(1-e*Math.sin(o)*Math.sin(o)),s=a/i-1,c=Math.tan(o)*Math.tan(o),l=Math.pow(Math.tan(o),4),u=Math.pow(Math.tan(o),6),d=Math.pow(Math.cos(o),-1),f=Math.tan(o)/(2*i*a),h=Math.tan(o)/(24*i*(a*a*a))*(5+3*c+s-9*s*c),p=Math.tan(o)/(720*i*Math.pow(a,5))*(61+90*c+45*l),v=o-r*r*f+Math.pow(r,4)*h-Math.pow(r,6)*p,S=Math.pow(Math.cos(o),-1)/a,y=d/(a*a*a*6)*(a/i+2*c),N=d/(120*Math.pow(a,5))*(5+28*c+24*l),m=d/(5040*Math.pow(a,7))*(61+662*c+1320*l+720*u),g=r*S-.0523598775598-r*r*r*y+Math.pow(r,5)*N-Math.pow(r,7)*m,b=Qb.convert_to_wgs(v,g);return new jb(b.lat*Bb,b.lng*Bb)};var Wb=function(e,t,n,r,o,a){for(var i=(e-t)/n+r,s=Qb.marc(a,o,r,i),c=(e-t-s)/n+i,l=0;Math.abs(e-t-s)>1e-5&&l<20;)l+=1,c=(e-t-s)/n+i,s=Gb._Marc(a,o,r,c),i=c;return c};Qb.prototype.to_gridref=function(e){return this.y>=55e5?qb("WA",this.x-5e5,this.y-55e5,e||1):this.y<55e5?qb("WV",this.x-5e5,this.y-54e5,e||1):null},Qb.prototype.to_hectad=function(){return this.y>55e5?"WA"+this.x.toString().substring(1,2)+this.y.toString().substring(2,3):this.y<55e5?"WV"+this.x.toString().substring(1,2)+this.y.toString().substring(2,3):null};var Zb=function(){var e=function(){};return (e.prototype=new Ub).constructor=e,e.prototype.country="CI",e.prototype.GridCoords=Qb,e.prototype.from_string=function(t){var n,r=t.replace(/[\[\]\s\t\.\/-]+/g,"").toUpperCase(),o="";/[ABCDEFGHIJKLMNPQRSTUVWXYZ]$/.test(r)&&(Ub.quadrantOffsets.hasOwnProperty(r.substr(r.length-2))?(this.quadrantCode=r.substr(r.length-2),r=r.substr(0,r.length-2)):(o=r.substr(r.length-1),r=r.substr(0,r.length-1))),/^(W[AV](?:\d\d){1,5})$/.test(r)?(n=e.gridref_string_to_e_n_l(r))?(this.length=n.length,this.gridCoords=new Qb(n.e,n.n),this.hectad=this.gridCoords.to_gridref(1e4),1e4===this.length&&(o||this.quadrantCode)?o?(this.preciseGridRef=r+o,this.tetrad=this.hectad+o,this.tetradLetter=o,this.length=2e3,this.gridCoords.x+=Ub.tetradOffsets[o][0],this.gridCoords.y+=Ub.tetradOffsets[o][1]):(this.preciseGridRef=r+this.quadrantCode,this.tetradLetter="",this.tetrad="",this.quadrant=this.preciseGridRef,this.length=5e3,this.gridCoords.x+=Ub.quadrantOffsets[this.quadrantCode][0],this.gridCoords.y+=Ub.quadrantOffsets[this.quadrantCode][1]):(this.preciseGridRef=r,this.length<=1e3&&this.set_tetrad())):(this.error=!0,this.errorMessage="Grid reference format not understood (odd length)."):(this.error=!0,this.errorMessage="Channel Island grid reference format not understood. ('"+t+"')");},e.prototype.parse_well_formed=e.prototype.from_string,e.gridref_string_to_e_n_l=function(e){var t,n,r,o,a=e.substr(0,2);if("WA"===a)t=55e5;else {if("WV"!==a)return Logger("Bad Channel Island grid letters: '"+a+"'"),!1;t=54e5;}var i=e.substr(2);switch(i.length){case 2:n=1e4*i.charAt(0),r=1e4*i.charAt(1),o=1e4;break;case 4:n=1e3*i.substr(0,2),r=1e3*i.substr(2),o=1e3;break;case 6:n=100*i.substr(0,3),r=100*i.substr(3),o=100;break;case 8:n=10*i.substr(0,4),r=10*i.substr(4),o=10;break;case 10:n=parseInt(i.substr(0,5),10),r=parseInt(i.substr(5),10),o=1;break;default:return Logger("Bad length for Channel Island grid ref '"+e+"'"),!1}return {e:n+5e5,n:r+t,length:o}},e}(),$b=function(e,t){this.x=e,this.y=t;};($b.prototype=new Xb).constructor=$b,$b.prototype.country="GB",$b.gbHectads="SV80SV81SV90SV91SW32SW33SW42SW43SW44SW52SW53SW54SW61SW62SW63SW64SW65SW71SW72SW73SW74SW75SW76SW81SW82SW83SW84SW85SW86SW87SW95SW96SW97SS10SS11SS20SS21SS30SW83SW84SW85SW93SW94SW95SW96SW97SW98SX03SX04SX05SX06SX07SX08SX09SX14SX15SX16SX17SX18SX19SX25SX26SX27SX28SX29SX35SX36SX37SX38SX39SX44SX45SX46SX47SS70SS80SS81SS90SS91ST00ST01ST10ST11ST20ST21ST30SX37SX44SX45SX46SX47SX48SX54SX55SX56SX57SX58SX63SX64SX65SX66SX67SX68SX69SX73SX74SX75SX76SX77SX78SX79SX83SX84SX85SX86SX87SX88SX89SX94SX95SX96SX97SX98SX99SY07SY08SY09SY18SY19SY28SY29SY38SY39SS14SS20SS21SS22SS30SS31SS32SS40SS41SS42SS43SS44SS50SS51SS52SS53SS54SS60SS61SS62SS63SS64SS70SS71SS72SS73SS74SS75SS80SS81SS82SS83SS91SS92ST01ST02SX28SX29SX37SX38SX39SX48SX49SX58SX59SX68SX69SX79SS73SS74SS82SS83SS84SS92SS93SS94ST01ST02ST03ST04ST11ST12ST13ST14ST20ST21ST22ST23ST24ST25ST30ST31ST32ST33ST34ST40ST41ST42ST50ST51ST52ST61ST62ST71ST72ST24ST25ST26ST32ST33ST34ST35ST36ST37ST42ST43ST44ST45ST46ST47ST52ST53ST54ST55ST56ST57ST62ST63ST64ST65ST66ST67ST72ST73ST74ST75ST76ST77ST83ST84ST85ST86SP00SP10ST76ST77ST85ST86ST87ST88ST89ST96ST97ST98ST99SU06SU07SU08SU09SU16SU17SU18SU19SU26SU27SU28SU29SU36SU37ST73ST74ST75ST76ST82ST83ST84ST85ST86ST91ST92ST93ST94ST95ST96SU01SU02SU03SU04SU05SU06SU11SU12SU13SU14SU15SU16SU21SU22SU23SU24SU25SU26SU31SU32SU34SU35SU36ST20ST30ST40ST50ST51ST60ST61ST70ST71ST72ST73ST80ST81ST82ST83ST90ST91ST92SU00SU01SU02SU10SU11SY39SY48SY49SY58SY59SY66SY67SY68SY69SY77SY78SY79SY87SY88SY89SY97SY98SY99SZ07SZ08SZ09SZ28SZ38SZ39SZ47SZ48SZ49SZ57SZ58SZ59SZ68SZ69SU00SU01SU02SU10SU11SU12SU20SU21SU22SU23SU30SU31SU32SU33SU40SU41SU42SU43SU50SU51SU52SU60SU61SU62SU70SU71SU72SZ08SZ09SZ19SZ29SZ38SZ39SZ49SZ59SZ69SZ79SU23SU24SU25SU33SU34SU35SU36SU42SU43SU44SU45SU46SU52SU53SU54SU55SU56SU62SU63SU64SU65SU66SU72SU73SU74SU75SU76SU82SU83SU84SU85SU86SU70SU71SU72SU80SU81SU82SU83SU90SU91SU92SU93SZ79SZ89SZ99TQ00TQ01TQ02TQ03TQ10TQ11TQ12TQ13TQ20TQ21TQ22TQ23TQ30TQ31TQ32TQ20TQ21TQ22TQ23TQ30TQ31TQ32TQ33TQ40TQ41TQ42TQ43TQ44TQ50TQ51TQ52TQ53TQ54TQ60TQ61TQ62TQ63TQ70TQ71TQ72TQ80TQ81TQ82TQ91TQ92TV49TV59TV69TQ65TQ72TQ73TQ74TQ75TQ76TQ77TQ82TQ83TQ84TQ85TQ86TQ87TQ91TQ92TQ93TQ94TQ95TQ96TQ97TR01TR02TR03TR04TR05TR06TR07TR12TR13TR14TR15TR16TR23TR24TR25TR26TR27TR33TR34TR35TR36TR37TR46TR47TQ35TQ36TQ37TQ38TQ43TQ44TQ45TQ46TQ47TQ48TQ53TQ54TQ55TQ56TQ57TQ58TQ63TQ64TQ65TQ66TQ67TQ72TQ73TQ74TQ75TQ76TQ77TQ78TQ87TQ88TQ97SU83SU84SU85SU86SU93SU94SU95SU96SU97TQ03TQ04TQ05TQ06TQ07TQ13TQ14TQ15TQ16TQ17TQ23TQ24TQ25TQ26TQ27TQ33TQ34TQ35TQ36TQ37TQ38TQ43TQ44TQ45TL30TL40TL50TL60TL70TL80TL90TM00TQ38TQ39TQ47TQ48TQ49TQ57TQ58TQ59TQ67TQ68TQ69TQ77TQ78TQ79TQ88TQ89TQ98TQ99TR08TR09TR19TL30TL31TL34TL40TL41TL42TL43TL44TL50TL51TL52TL53TL54TL60TL61TL62TL63TL64TL70TL71TL72TL73TL74TL80TL81TL82TL83TL84TL90TL91TL92TL93TM01TM02TM03TM11TM12TM13TM21TM22TM23TQ49SP81SP90SP91TL00TL01TL02TL10TL11TL12TL13TL20TL21TL22TL23TL24TL30TL31TL32TL33TL34TL41TL42TL43TL44TL51TL52TQ09TQ19TQ29TQ39TL20TL30TQ06TQ07TQ08TQ09TQ16TQ17TQ18TQ19TQ27TQ28TQ29TQ37TQ38TQ39SP20SP30SP40SP41SP50SU19SU26SU27SU28SU29SU36SU37SU38SU39SU46SU47SU48SU49SU56SU57SU58SU59SU66SU67SU68SU69SU76SU77SU78SU86SU87SU88SU96SU97SU98SP10SP20SP21SP22SP23SP30SP31SP32SP33SP34SP40SP41SP42SP43SP44SP45SP50SP51SP52SP53SP54SP60SP61SP62SP63SP70SU29SU39SU49SU57SU58SU59SU67SU68SU69SU77SU78SU79SP51SP53SP60SP61SP62SP63SP64SP70SP71SP72SP73SP74SP80SP81SP82SP83SP84SP85SP90SP91SP92SP93SP94SP95SU78SU79SU88SU89SU97SU98SU99TL00TL01TQ07TQ08TQ09TG40TG50TM03TM04TM05TM06TM07TM13TM14TM15TM16TM17TM23TM24TM25TM26TM27TM28TM33TM34TM35TM36TM37TM38TM39TM44TM45TM46TM47TM48TM49TM57TM58TM59TL64TL65TL66TL67TL68TL74TL75TL76TL77TL78TL83TL84TL85TL86TL87TL88TL93TL94TL95TL96TL97TL98TM03TM04TM05TM06TM07TM08TG00TG01TG02TG03TG04TG10TG11TG12TG13TG14TG20TG21TG22TG23TG24TG30TG31TG32TG33TG40TG41TG42TG50TG51TM07TM08TM09TM17TM18TM19TM27TM28TM29TM38TM39TM49TM59TF40TF41TF42TF50TF51TF52TF53TF60TF61TF62TF63TF64TF70TF71TF72TF73TF74TF80TF81TF82TF83TF84TF90TF91TF92TF93TF94TG00TG01TG02TG03TG04TL49TL59TL68TL69TL78TL79TL87TL88TL89TL98TL99TM07TM08TM09TF20TF30TF31TF40TF41TF50TL15TL19TL23TL24TL25TL26TL28TL29TL33TL34TL35TL36TL37TL38TL39TL44TL45TL46TL47TL48TL49TL54TL55TL56TL57TL58TL59TL63TL64TL65TL66TL67TL68TL69TL75TL76SP91SP92SP93SP94SP95SP96TL01TL02TL03TL04TL05TL06TL07TL11TL12TL13TL14TL15TL16TL23TL24TL25TL06TL07TL08TL09TL15TL16TL17TL18TL19TL25TL26TL27TL28TL29TL36TL37TL38TL39SK90SP43SP44SP45SP46SP53SP54SP55SP56SP57SP58SP63SP64SP65SP66SP67SP68SP73SP74SP75SP76SP77SP78SP79SP84SP85SP86SP87SP88SP89SP95SP96SP97SP98SP99TF00TF10TF20TL06TL07TL08TL09TL18TL19TL29SO70SO71SO80SO81SO82SO83SO90SO91SO92SO93SO94SP00SP01SP02SP03SP04SP10SP11SP12SP13SP14SP15SP20SP21SP22SP23SP24SP25ST99SU09SU19SU29SO50SO51SO60SO61SO62SO63SO70SO71SO72SO73SO80SO81SO82SO83SO90ST57ST58ST59ST66ST67ST68ST69ST76ST77ST78ST79ST87ST88ST89ST98ST99SO10SO11SO20SO21SO22SO23SO30SO31SO32SO40SO41SO42SO50SO51ST18ST19ST27ST28ST29ST37ST38ST39ST47ST48ST49ST58ST59SO22SO23SO24SO25SO26SO32SO33SO34SO35SO36SO37SO41SO42SO43SO44SO45SO46SO47SO51SO52SO53SO54SO55SO56SO57SO61SO62SO63SO64SO65SO66SO73SO74SO75SO76SO56SO64SO65SO66SO67SO72SO73SO74SO75SO76SO77SO78SO82SO83SO84SO85SO86SO87SO88SO93SO94SO95SO96SO97SO98SO99SP03SP04SP05SP06SP07SP08SP13SP14SP16SP17SP18SK10SK20SK30SP04SP05SP06SP07SP08SP09SP14SP15SP16SP17SP18SP19SP22SP23SP24SP25SP26SP27SP28SP29SP33SP34SP35SP36SP37SP38SP39SP44SP45SP46SP47SP48SP49SP55SP56SP57SP58SJ63SJ70SJ71SJ72SJ73SJ74SJ75SJ80SJ81SJ82SJ83SJ84SJ85SJ86SJ90SJ91SJ92SJ93SJ94SJ95SJ96SK00SK01SK02SK03SK04SK05SK06SK10SK11SK12SK13SK14SK15SK16SK20SK21SK22SO77SO78SO79SO88SO89SO98SO99SP08SP09SP19SP29SJ20SJ21SJ22SJ23SJ30SJ31SJ32SJ33SJ34SJ40SJ41SJ42SJ43SJ50SJ51SJ52SJ53SJ54SJ60SJ61SJ62SJ63SJ64SJ70SJ71SJ72SJ73SJ74SJ80SO17SO18SO27SO28SO29SO37SO38SO39SO46SO47SO48SO49SO56SO57SO58SO59SO66SO67SO68SO69SO77SO78SO79SO88SO89SN50SN60SN61SN70SN71SN80SN81SN90SO00SO01SO10SO11SS38SS39SS48SS49SS58SS59SS68SS69SS77SS78SS79SS87SS88SS89SS96SS97SS98SS99ST06ST07ST08ST09ST16ST17ST18ST19ST26ST27ST28SN70SN71SN74SN80SN81SN82SN83SN84SN85SN86SN90SN91SN92SN93SN94SN95SN96SO00SO01SO02SO03SO04SO05SO06SO10SO11SO12SO13SO14SO21SO22SO23SO24SN86SN87SN96SN97SO04SO05SO06SO07SO08SO13SO14SO15SO16SO17SO18SO24SO25SO26SO27SO36SO37SN01SN02SN10SN11SN12SN20SN21SN22SN23SN24SN30SN31SN32SN33SN34SN40SN41SN42SN43SN44SN50SN51SN52SN53SN54SN60SN61SN62SN63SN64SN65SN71SN72SN73SN74SN75SN81SN82SN83SN84SS39SS49SS59SM50SM62SM70SM71SM72SM73SM80SM81SM82SM83SM84SM90SM91SM92SM93SM94SN00SN01SN02SN03SN04SN10SN11SN12SN13SN14SN22SN23SN24SR89SR99SS09SS19SN14SN15SN24SN25SN33SN34SN35SN36SN44SN45SN46SN54SN55SN56SN57SN58SN64SN65SN66SN67SN68SN69SN74SN75SN76SN77SN78SN79SN84SN85SN86SN87SN88SN89SH70SH71SH80SH81SH90SH91SH92SJ00SJ01SJ02SJ03SJ10SJ11SJ12SJ20SJ21SJ22SJ31SN69SN78SN79SN87SN88SN89SN97SN98SN99SO07SO08SO09SO18SO19SO28SO29SO39SH50SH51SH52SH53SH54SH60SH61SH62SH63SH64SH70SH71SH72SH73SH74SH80SH81SH82SH83SH84SH91SH92SH93SH94SH95SJ03SJ04SJ05SJ13SJ14SN59SN69SN79SH12SH13SH22SH23SH24SH32SH33SH34SH43SH44SH45SH46SH53SH54SH55SH56SH57SH64SH65SH66SH67SH74SH75SH76SH77SH78SH84SH85SH86SH87SH88SH74SH75SH76SH77SH84SH85SH86SH87SH88SH94SH95SH96SH97SH98SJ02SJ03SJ04SJ05SJ06SJ07SJ08SJ12SJ13SJ14SJ15SJ16SJ17SJ22SJ23SJ24SJ25SJ26SJ33SJ34SJ35SJ43SJ44SJ45SJ53SJ54SH97SH98SJ06SJ07SJ08SJ15SJ16SJ17SJ18SJ25SJ26SJ27SJ35SJ36SJ37SH27SH28SH29SH36SH37SH38SH39SH46SH47SH48SH49SH56SH57SH58SH59SH67SH68SK81SK82SK83SK84SK85SK86SK87SK90SK91SK92SK93SK94SK95SK96SK97TF00TF01TF02TF03TF04TF05TF06TF07TF10TF11TF12TF13TF14TF15TF16TF17TF20TF21TF22TF23TF24TF25TF30TF31TF32TF33TF34TF41TF42TF43TF44TF52SE60SE70SE71SE80SE81SE82SE90SE91SE92SK78SK79SK87SK88SK89SK97SK98SK99TA00TA01TA02TA10TA11TA12TA20TA21TA30TA31TA40TF07TF08TF09TF15TF16TF17TF18TF19TF24TF25TF26TF27TF28TF29TF33TF34TF35TF36TF37TF38TF39TF43TF44TF45TF46TF47TF48TF49TF54TF55TF56TF57TF58SK20SK21SK30SK31SK32SK40SK41SK42SK43SK50SK51SK52SK60SK61SK62SK70SK71SK72SK73SK74SK80SK81SK82SK83SK84SK90SK91SP39SP48SP49SP57SP58SP59SP68SP69SP78SP79SP89SP99TF00TF01SE60SE70SK42SK43SK44SK45SK46SK52SK53SK54SK55SK56SK57SK58SK59SK62SK63SK64SK65SK66SK67SK68SK69SK72SK73SK74SK75SK76SK77SK78SK79SK84SK85SK86SK87SK88SK89SK97SJ98SJ99SK03SK06SK07SK08SK09SK11SK12SK13SK14SK15SK16SK17SK18SK19SK21SK22SK23SK24SK25SK26SK27SK28SK31SK32SK33SK34SK35SK36SK37SK38SK42SK43SK44SK45SK46SK47SK48SK53SK56SK57SD90SE00SE10SJ18SJ19SJ27SJ28SJ29SJ35SJ36SJ37SJ38SJ39SJ44SJ45SJ46SJ47SJ48SJ54SJ55SJ56SJ57SJ58SJ63SJ64SJ65SJ66SJ67SJ68SJ69SJ74SJ75SJ76SJ77SJ78SJ79SJ85SJ86SJ87SJ88SJ89SJ96SJ97SJ98SJ99SK06SK07SK08SK09SK19SD20SD21SD22SD30SD31SD32SD40SD41SD42SD50SD51SD52SD53SD60SD61SD62SD63SD70SD71SD72SD73SD74SD80SD81SD82SD83SD84SD90SD91SD92SD93SD94SJ29SJ38SJ39SJ48SJ49SJ58SJ59SJ68SJ69SJ79SJ88SJ89SJ99SD22SD23SD32SD33SD34SD35SD36SD42SD43SD44SD45SD46SD47SD52SD53SD54SD55SD56SD57SD63SD64SD65SD66SD67SD68SD73SD78SE53SE54SE62SE63SE64SE65SE72SE73SE74SE75SE76SE82SE83SE84SE85SE86SE87SE92SE93SE94SE95SE96SE97SE98TA02TA03TA04TA05TA06TA07TA08TA12TA13TA14TA15TA16TA17TA18TA21TA22TA23TA24TA26TA27TA31TA32TA33TA41TA42NZ30NZ31NZ40NZ41NZ42NZ50NZ51NZ52NZ60NZ61NZ62NZ70NZ71NZ72NZ80NZ81NZ90NZ91SE37SE38SE39SE46SE47SE48SE49SE55SE56SE57SE58SE59SE64SE65SE66SE67SE68SE69SE75SE76SE77SE78SE79SE86SE87SE88SE89SE97SE98SE99TA08TA09TA18SD84SD90SD91SD92SD93SD94SD95SE00SE01SE02SE03SE04SE10SE11SE12SE13SE14SE20SE21SE22SE23SE30SE31SE32SE33SE40SE41SE42SE50SE51SE52SE60SE61SE62SE70SE71SE72SE81SE82SK18SK19SK28SK29SK38SK39SK47SK48SK49SK57SK58SK59SK69SD54SD55SD64SD65SD66SD67SD68SD73SD74SD75SD76SD77SD78SD84SD85SD86SD87SD88SD94SD95SD96SD97SD98SE04SE05SE06SE07SE13SE14SE15SE16SE17SE23SE24SE25SE26SE27SE32SE33SE34SE35SE36SE37SE42SE43SE44SE45SE46SE52SE53SE54SE55SE56SE62SE63SE64SE65SE72NY72NY80NY81NY82NY90NY91NY92NZ00NZ01NZ02NZ10NZ11NZ20NZ21NZ30NZ31SD68SD69SD78SD79SD88SD89SD97SD98SD99SE07SE08SE09SE17SE18SE19SE27SE28SE29SE36SE37SE38SE39SE46SE47NY73NY74NY82NY83NY84NY92NY93NY94NY95NZ01NZ02NZ03NZ04NZ05NZ11NZ12NZ13NZ14NZ15NZ16NZ20NZ21NZ22NZ23NZ24NZ25NZ26NZ30NZ31NZ32NZ33NZ34NZ35NZ36NZ41NZ42NZ43NZ44NZ45NZ46NZ52NZ53NT60NT70NT80NT90NU00NU10NU20NY58NY59NY64NY65NY66NY67NY68NY69NY74NY75NY76NY77NY78NY79NY84NY85NY86NY87NY88NY89NY94NY95NY96NY97NY98NY99NZ04NZ05NZ06NZ07NZ08NZ09NZ15NZ16NZ17NZ18NZ19NZ26NZ27NZ28NZ29NZ36NZ37NZ38NZ39NT70NT71NT73NT80NT81NT82NT83NT84NT90NT91NT92NT93NT94NT95NU00NU01NU02NU03NU04NU05NU10NU11NU12NU13NU14NU20NU21NU22NU23NZ09NZ19NY20NY21NY30NY31NY40NY41NY42NY50NY51NY52NY53NY60NY61NY62NY63NY70NY71NY72NY73NY80NY81NY82NY83SD16SD17SD18SD19SD26SD27SD28SD29SD36SD37SD38SD39SD46SD47SD48SD49SD57SD58SD59SD67SD68SD69SD78SD79SD89NX90NX91NX92NX93NY00NY01NY02NY03NY04NY05NY10NY11NY12NY13NY14NY15NY16NY20NY21NY22NY23NY24NY25NY26NY31NY32NY33NY34NY35NY36NY37NY41NY42NY43NY44NY45NY46NY47NY48NY52NY53NY54NY55NY56NY57NY58NY62NY63NY64NY65NY66NY67NY68NY73NY74NY75NY84SD08SD09SD17SD18SD19SD28SD29NX30NX40SC16SC17SC26SC27SC28SC36SC37SC38SC39SC47SC48SC49NS60NS61NS70NS71NS72NS80NS81NS90NT00NT01NT10NT11NT20NT21NT30NX69NX78NX79NX88NX89NX96NX97NX98NX99NY05NY06NY07NY08NY09NY16NY17NY18NY19NY26NY27NY28NY29NY36NY37NY38NY39NY47NY48NY49NS50NS60NX36NX37NX38NX45NX46NX47NX48NX49NX54NX55NX56NX57NX58NX59NX64NX65NX66NX67NX68NX69NX74NX75NX76NX77NX78NX79NX84NX85NX86NX87NX88NX95NX96NX97NX98NY05NY06NW95NW96NW97NX03NX04NX05NX06NX07NX13NX14NX15NX16NX17NX24NX25NX26NX27NX33NX34NX35NX36NX37NX43NX44NX45NX46NS00NS10NS14NS15NS16NS20NS21NS23NS24NS25NS26NS30NS31NS32NS33NS34NS35NS36NS40NS41NS42NS43NS44NS45NS50NS51NS52NS53NS54NS55NS60NS61NS62NS63NS64NS71NS72NS73NX07NX08NX09NX17NX18NX19NX27NX28NX29NX37NX38NX39NX48NX49NX59NS16NS17NS26NS27NS35NS36NS37NS44NS45NS46NS47NS54NS55NS56NS64NS65NS66NS53NS54NS55NS56NS57NS63NS64NS65NS66NS67NS71NS72NS73NS74NS75NS76NS77NS80NS81NS82NS83NS84NS85NS86NS87NS90NS91NS92NS93NS94NS95NS96NT00NT01NT02NT03NT04NT05NT14NT01NT02NT03NT04NT05NT11NT12NT13NT14NT15NT21NT22NT23NT24NT25NT32NT33NT34NT10NT11NT20NT21NT22NT23NT30NT31NT32NT33NT34NT41NT42NT43NT44NT53NT20NT30NT31NT40NT41NT42NT43NT44NT50NT51NT52NT53NT54NT60NT61NT62NT63NT64NT70NT71NT72NT73NT74NT81NT82NT83NY39NY47NY48NY49NY58NY59NY69NT44NT45NT46NT53NT54NT55NT56NT63NT64NT65NT66NT73NT74NT75NT76NT77NT83NT84NT85NT86NT87NT94NT95NT96NT36NT37NT45NT46NT47NT48NT55NT56NT57NT58NT65NT66NT67NT68NT76NT77NS95NS96NT05NT06NT15NT16NT17NT24NT25NT26NT27NT34NT35NT36NT37NT43NT44NT45NT46NS86NS87NS95NS96NS97NS98NT06NT07NT08NT16NT17NO00NO01NO10NO11NO20NO21NO22NO30NO31NO32NO40NO41NO42NO50NO51NO52NO60NO61NS99NT08NT09NT18NT19NT28NT29NT39NT49NT59NT69NN30NN31NN40NN41NS38NS39NS47NS48NS49NS57NS58NS59NS67NS68NS69NS77NS78NS79NS86NS87NS88NS89NS97NS98NN21NN22NN30NN31NN32NN40NN41NN42NN50NN51NN52NN60NN61NN70NN71NN80NN81NN90NN91NO00NS49NS59NS69NS79NS88NS89NS98NS99NT08NT09NN22NN23NN32NN33NN34NN35NN42NN43NN44NN45NN46NN47NN51NN52NN53NN54NN55NN56NN57NN61NN62NN63NN64NN65NN66NN67NN71NN72NN73NN74NN75NN76NN77NN81NN82NN83NN84NN85NN86NN90NN91NN92NN93NN94NN95NN96NO00NO01NO02NO03NO04NO11NO12NO13NO21NN56NN57NN66NN67NN68NN76NN77NN78NN86NN87NN88NN94NN95NN96NN97NN98NO02NO03NO04NO05NO06NO07NO08NO11NO12NO13NO14NO15NO16NO17NO21NO22NO23NO24NO25NO32NO33NO34NO15NO16NO17NO23NO24NO25NO26NO27NO28NO32NO33NO34NO35NO36NO37NO38NO42NO43NO44NO45NO46NO47NO48NO53NO54NO55NO56NO57NO58NO63NO64NO65NO66NO67NO74NO75NO76NJ60NJ70NJ80NJ90NO57NO58NO66NO67NO68NO69NO76NO77NO78NO79NO86NO87NO88NO89NO99NH90NJ00NJ10NJ11NJ20NJ21NJ30NJ31NJ32NJ40NJ41NJ42NJ50NJ51NJ52NJ60NJ61NJ62NJ70NJ71NJ72NJ80NJ81NJ82NJ90NJ91NJ92NK02NN98NN99NO07NO08NO09NO17NO18NO19NO27NO28NO29NO37NO38NO39NO48NO49NO58NO59NO68NO69NO79NO89NJ31NJ32NJ33NJ34NJ42NJ43NJ44NJ52NJ53NJ54NJ55NJ62NJ63NJ64NJ65NJ72NJ73NJ74NJ75NJ76NJ82NJ83NJ84NJ85NJ86NJ92NJ93NJ94NJ95NJ96NK02NK03NK04NK05NK06NK13NK14NK15NH90NJ00NJ01NJ10NJ11NJ12NJ13NJ14NJ21NJ22NJ23NJ24NJ25NJ32NJ33NJ34NJ35NJ36NJ42NJ43NJ44NJ45NJ46NJ54NJ55NJ56NJ64NJ65NJ66NJ74NJ75NJ76NJ86NN99NH72NH81NH82NH91NH92NH93NH94NH95NH96NJ00NJ01NJ02NJ03NJ04NJ05NJ06NJ11NJ12NJ13NJ14NJ15NJ16NJ17NJ23NJ24NJ25NJ26NJ27NJ34NJ35NJ36NJ45NH01NH02NH10NH11NH12NH13NH14NH20NH21NH22NH23NH24NH30NH31NH32NH33NH34NH40NH41NH42NH43NH44NH50NH51NH52NH53NH54NH60NH61NH62NH63NH64NH70NH71NH72NH73NH74NH75NH80NH81NH82NH83NH84NH85NH90NH91NH92NH93NH94NH95NH96NJ00NJ01NN39NN46NN47NN48NN49NN56NN57NN58NN59NN67NN68NN69NN77NN78NN79NN88NN89NN98NN99NG60NG70NG71NG72NG80NG81NG82NG90NG91NH00NH01NH10NH20NH30NM46NM47NM54NM55NM56NM57NM64NM65NM66NM67NM68NM69NM74NM75NM76NM77NM78NM79NM84NM85NM86NM87NM88NM89NM95NM96NM97NM98NM99NN05NN06NN07NN08NN09NN16NN17NN18NN19NN26NN27NN28NN29NN35NN36NN37NN38NN39NN46NN47NN48NN49NN57NN58NN59NM70NM71NM72NM73NM80NM81NM82NM83NM84NM90NM91NM92NM93NM94NM95NN00NN01NN02NN03NN04NN05NN10NN11NN12NN13NN14NN15NN16NN20NN21NN22NN23NN24NN25NN26NN30NN33NN34NN35NN36NN44NN45NN46NR79NR88NR89NR96NR97NR98NR99NS06NS07NS08NS09NS16NS17NS18NS19NS28NS29NN20NN21NN30NN31NS28NS29NS37NS38NS39NS46NS47NS48NS56NS57NR82NR83NR84NR92NR93NR94NR95NR96NR97NS01NS02NS03NS04NS05NS06NS07NS15NS16NR50NR51NR60NR61NR62NR63NR64NR65NR67NR68NR70NR71NR72NR73NR74NR75NR76NR77NR78NR79NR83NR84NR85NR86NR87NR88NR89NR95NR96NM40NM60NM61NM70NM71NR15NR16NR24NR25NR26NR27NR34NR35NR36NR37NR38NR39NR44NR45NR46NR47NR48NR49NR56NR57NR58NR59NR67NR68NR69NR79NL93NL94NM04NM05NM15NM16NM21NM22NM23NM24NM25NM26NM31NM32NM33NM34NM35NM41NM42NM43NM44NM45NM51NM52NM53NM54NM55NM61NM62NM63NM64NM72NM73NG13NG14NG15NG20NG23NG24NG25NG26NG30NG31NG32NG33NG34NG35NG36NG37NG38NG40NG41NG42NG43NG44NG45NG46NG47NG50NG51NG52NG53NG54NG55NG56NG60NG61NG62NG63NG64NG65NG66NG71NG72NG82NM19NM29NM37NM38NM39NM47NM48NM49NM59NB90NB91NC00NC01NC10NC11NC20NC21NG63NG64NG65NG72NG73NG74NG75NG76NG77NG78NG79NG82NG83NG84NG85NG86NG87NG88NG89NG91NG92NG93NG94NG95NG96NG97NG98NG99NH00NH01NH02NH03NH04NH05NH06NH07NH08NH09NH10NH11NH15NH16NH17NH18NH19NH27NH28NH29NC10NC20NC21NC30NC31NC40NH02NH03NH04NH05NH06NH07NH12NH13NH14NH15NH16NH17NH19NH23NH24NH25NH26NH27NH28NH29NH34NH35NH36NH37NH38NH39NH44NH45NH46NH47NH48NH49NH54NH55NH56NH57NH58NH59NH64NH65NH66NH67NH68NH69NH75NH76NH77NH78NH86NH87NH88NH97NH98NC22NC30NC31NC32NC33NC40NC41NC42NC43NC50NC51NC52NC60NC61NC62NC63NC70NC71NC72NC73NC74NC80NC81NC82NC83NC84NC90NC91NC92NC93ND01ND02NH49NH59NH68NH69NH78NH79NH88NH89NC01NC02NC03NC10NC11NC12NC13NC14NC15NC16NC20NC21NC22NC23NC24NC25NC26NC27NC31NC32NC33NC34NC35NC36NC37NC42NC43NC44NC45NC46NC52NC53NC54NC55NC56NC62NC63NC64NC65NC66NC73NC74NC75NC76NC83NC84NC85NC86NC93NC94NC95NC96NC92NC93NC94NC95NC96ND01ND02ND03ND04ND05ND06ND07ND12ND13ND14ND15ND16ND17ND23ND24ND25ND26ND27ND33ND34ND35ND36ND37ND47HW63HW83HX62NA00NA10NA64NA74NA81NA90NA91NA92NA93NB00NB01NB02NB03NB10NB11NB12NB13NB14NB20NB21NB22NB23NB24NB30NB31NB32NB33NB34NB35NB40NB41NB42NB43NB44NB45NB46NB52NB53NB54NB55NB56NF09NF19NF56NF58NF60NF61NF66NF67NF68NF70NF71NF72NF73NF74NF75NF76NF77NF80NF81NF82NF83NF84NF85NF86NF87NF88NF89NF95NF96NF97NF98NF99NG07NG08NG09NG18NG19NG29NG49NL57NL58NL68NL69NL79HY10HY20HY21HY22HY23HY30HY31HY32HY33HY34HY35HY40HY41HY42HY43HY44HY45HY50HY51HY52HY53HY54HY55HY60HY61HY62HY63HY64HY73HY74HY75ND19ND28ND29ND38ND39ND47ND48ND49ND59HP40HP50HP51HP60HP61HT93HT94HU14HU15HU16HU24HU25HU26HU27HU28HU30HU31HU32HU33HU34HU35HU36HU37HU38HU39HU40HU41HU42HU43HU44HU45HU46HU47HU48HU49HU53HU54HU55HU56HU57HU58HU59HU66HU67HU68HU69HZ16HZ17HZ26HZ27",$b.prototype.to_gridref=function(e){var t=this.x/1e5|0,n=this.y/1e5|0,r="";r=n<5?t<5?"S":"T":n<10?t<5?"N":"O":t<5?"H":"J";var o=65+5*(4-n%5)+t%5;o>=73&&o++;var a=String.fromCharCode(o);return qb(r+a,this.x-1e5*t,this.y-1e5*n,e||1)},$b.prototype.to_hectad=function(){var e=this.x/1e5|0,t=this.y/1e5|0,n=65+5*(4-t%5)+e%5;return n>=73&&n++,(t<5?e<5?"S":"T":t<10?e<5?"N":"O":e<5?"H":"J")+String.fromCharCode(n)+((this.x-1e5*e)/1e4|0)+((this.y-1e5*t)/1e4|0)},$b.prototype.is_gb_hectad=function(){return -1!==$b.gbHectads.indexOf(this.to_hectad())},$b.prototype.to_latLng=function(){var e,t=4e5,n=.85521133347722,r=6377563.396,o=this.x,a=this.y,i=.0016732203289875,s=(a+1e5)/(.9996012717*r)+n;do{s+=(e=a+1e5-6353722.489*(1.0016767257674*(s-n)-.00502807228247412*Math.sin(s-n)*Math.cos(s+n)+5258157614724887e-21*Math.sin(2*(s-n))*Math.cos(2*(s+n))-35/24*i*i*i*Math.sin(3*(s-n))*Math.cos(3*(s+n))))/6375020.48098897;}while(e>=.001);var c=Math.sin(s)*Math.sin(s),l=Math.tan(s)*Math.tan(s),u=1/Math.cos(s),d=.9996012717*r*Math.pow(1-.00667054007*c,-.5),f=6332495.651423464*Math.pow(1-.00667054007*c,-1.5),h=d/f-1,p=Math.tan(s)/(2*f*d),v=Math.tan(s)/(24*f*Math.pow(d,3))*(5+3*l+h-9*l*h),S=Math.tan(s)/(720*f*Math.pow(d,5))*(61+90*l+45*l*l),y=u/d,N=u/(6*d*d*d)*(d/f+2*l),m=u/(120*Math.pow(d,5))*(5+28*l+24*l*l),g=u/(5040*Math.pow(d,7))*(61+662*l+1320*l*l+720*l*l*l),b=s-p*Math.pow(o-t,2)+v*Math.pow(o-t,4)-S*Math.pow(o-t,6),T=y*(o-t)-.034906585039887-N*Math.pow(o-t,3)+m*Math.pow(o-t,5)-g*Math.pow(o-t,7);return new Yb(Bb*b,Bb*T).to_WGS84()};var zb=function(){var e=function(){};return (e.prototype=new Ub).constructor=e,e.prototype.country="GB",e.prototype.GridCoords=$b,e.prototype.parse_well_formed=function(e){e.length>=5&&/^[A-Z]/.test(e.charAt(4))&&(Ub.quadrantOffsets.hasOwnProperty(e.substr(e.length-2))?this.quadrantCode=e.substr(e.length-2):this.tetradLetter=e.charAt(4),e=e.substr(0,4)),this.parse_wellformed_gb_gr_string_no_tetrads(e),this.tetradLetter||this.quadrantCode?this.tetradLetter?(this.preciseGridRef=this.tetrad=this.hectad+this.tetradLetter,this.length=2e3,this.gridCoords.x+=Ub.tetradOffsets[this.tetradLetter][0],this.gridCoords.y+=Ub.tetradOffsets[this.tetradLetter][1]):(this.preciseGridRef=this.quadrant=e+this.quadrantCode,this.length=5e3,this.gridCoords.x+=Ub.quadrantOffsets[this.quadrantCode][0],this.gridCoords.y+=Ub.quadrantOffsets[this.quadrantCode][1]):(this.preciseGridRef=e,this.length<=1e3&&this.set_tetrad());},e.prototype.from_string=function(e){var t,n=e.replace(/[\[\]\s\t\.-]+/g,"").toUpperCase(),r="";if(/[ABCDEFGHIJKLMNPQRSTUVWXYZ]$/.test(n)&&(Ub.quadrantOffsets.hasOwnProperty(n.substr(n.length-2))?(this.quadrantCode=n.substr(n.length-2),n=n.substr(0,n.length-2)):(r=n.substr(n.length-1),n=n.substr(0,n.length-1))),n===parseInt(n,10).toString()?n=n.substr(0,2)+"/"+n.substr(2):n.length>3&&"/"===n.charAt(2)&&/^[A-Z]{2}$/.test(n.substr(0,2))&&(n=n.replace("/","")),"VC"===n.substr(0,2))this.error=!0,this.errorMessage="Misplaced vice-county code in grid-reference field. ('"+n+"')",this.gridCoords=null,this.length=0;else if(null!==(t=n.match(/^([A-Z]{2}(?:\d\d){1,5})$/)))n=t[0],this.parse_wellformed_gb_gr_string_no_tetrads(n),this.length>0?1e4===this.length&&(r||this.quadrantCode)?r?(this.preciseGridRef=n+r,this.tetradLetter=r,this.tetrad=this.hectad+r,this.length=2e3,this.gridCoords.x+=Ub.tetradOffsets[r][0],this.gridCoords.y+=Ub.tetradOffsets[r][1]):(this.preciseGridRef=n+this.quadrantCode,this.tetradLetter="",this.tetrad="",this.quadrant=this.preciseGridRef,this.length=5e3,this.gridCoords.x+=Ub.quadrantOffsets[this.quadrantCode][0],this.gridCoords.y+=Ub.quadrantOffsets[this.quadrantCode][1]):(this.preciseGridRef=n,this.length<=1e3&&this.set_tetrad()):(this.error=!0,this.errorMessage="GB grid reference format not understood (strange length).");else if(/^([\d]{2})\/((?:\d\d){1,5})$/.test(n)){switch(this.parse_gr_string_without_tetrads(n),this.length){case 1e4:n=this.gridCoords.to_gridref(1e4),this.hectad=n,r?(n+=r,this.tetradLetter=r,this.tetrad=this.hectad+r,this.length=2e3,this.gridCoords.x+=Ub.tetradOffsets[r][0],this.gridCoords.y+=Ub.tetradOffsets[r][1]):this.quadrantCode&&(n+=this.quadrantCode,this.quadrant=n,this.length=5e3,this.gridCoords.x+=Ub.quadrantOffsets[this.quadrantCode][0],this.gridCoords.y+=Ub.quadrantOffsets[this.quadrantCode][1]);break;case 1e3:case 100:case 10:case 1:n=this.gridCoords.to_gridref(this.length),this.hectad=this.gridCoords.to_gridref(1e4),this.set_tetrad();break;default:this.error=!0,this.errorMessage="Bad grid square dimension ("+this.length+" m).",this.gridCoords=null,this.length=0;}this.preciseGridRef=n;}else this.gridCoords=null,this.length=0,this.error=!0,this.errorMessage="Grid reference format not understood. ('"+e+"')";},e.prototype.parse_gr_string_without_tetrads=function(e){var t,n,r,o;if(null!==(t=e.match(/^(\d{2})\/((?:\d\d){1,5})$/))){switch(t[1]){case"57":n=3e5,r=1e6;break;case"67":n=4e5,r=1e6;break;case"58":n=3e5,r=11e5;break;case"68":n=4e5,r=11e5;break;case"69":n=4e5,r=12e5;break;default:n=1e5*e.charAt(0),r=1e5*e.charAt(1);}o=t[2];}else {if(!Ub.letterMapping.hasOwnProperty(e.charAt(0))||!Ub.letterMapping.hasOwnProperty(e.charAt(1)))return this.length=0,void(this.gridCoords=null);var a=Ub.letterMapping[e.charAt(0)],i=Ub.letterMapping[e.charAt(1)];o=e.substr(2),n=a%5*5e5+i%5*1e5-1e6,r=5e5*-Math.floor(a/5)-1e5*Math.floor(i/5)+19e5;}switch(o.length){case 2:this.gridCoords=new $b(n+1e4*o.charAt(0),r+1e4*o.charAt(1)),this.length=1e4;break;case 4:this.gridCoords=new $b(n+1e3*Math.floor(o/100),r+o%100*1e3),this.length=1e3;break;case 6:this.gridCoords=new $b(n+100*Math.floor(o/1e3),r+o%1e3*100),this.length=100;break;case 8:this.gridCoords=new $b(n+10*Math.floor(o/1e4),r+o%1e4*10),this.length=10;break;case 10:this.gridCoords=new $b(n+Math.floor(o/1e5),r+o%1e5),this.length=1;break;default:Logger("Bad grid ref length, ref="+e),this.gridCoords=null,this.length=0;}},e.prototype.parse_wellformed_gb_gr_string_no_tetrads=function(e){var t,n,r,o,a;switch(t=Ub.letterMapping[e.charAt(0)],n=Ub.letterMapping[e.charAt(1)],r=e.substr(2),o=t%5*5e5+n%5*1e5-1e6,a=5e5*-Math.floor(t/5)-1e5*Math.floor(n/5)+19e5,r.length){case 2:this.gridCoords=new $b(o+1e4*r.charAt(0),a+1e4*r.charAt(1)),this.length=1e4,this.hectad=e;break;case 4:this.gridCoords=new $b(o+1e3*Math.floor(r/100),a+r%100*1e3),this.length=1e3,this.hectad=e.substr(0,3)+e.substr(4,1);break;case 6:this.gridCoords=new $b(o+100*Math.floor(r/1e3),a+r%1e3*100),this.length=100,this.hectad=e.substr(0,3)+e.substr(5,1);break;case 8:this.gridCoords=new $b(o+10*Math.floor(r/1e4),a+r%1e4*10),this.length=10,this.hectad=e.substr(0,3)+e.substr(6,1);break;case 10:this.gridCoords=new $b(o+Math.floor(r/1e5),a+r%1e5),this.length=1,this.hectad=e.substr(0,3)+e.substr(7,1);break;default:throw this.gridCoords=null,new Error("Bad grid ref length when parsing supposedly well-formed ref, ref='"+e+"'")}},e}(),eT=function(){var e=function(e,t){this.x=e,this.y=t;};return (e.prototype=new Xb).constructor=e,e.prototype.country="IE",e.irishGrid={0:["V","Q","L","F","A"],1:["W","R","M","G","B"],2:["X","S","N","H","C"],3:["Y","T","O","J","D"]},e.prototype.to_latLng=function(){var e=6377340.189,t=.0066705402933363,n=.0016732203841521,r=this.x-2e5,o=(5929615.3530033+(this.y-25e4)/1.000035)/6366691.7742864415,a=o+.002509826623715886*Math.sin(2*o)+36745487490091978e-22*Math.sin(4*o)+151*n*n*n/96*Math.sin(6*o),i=e/Math.sqrt(1-t*Math.sin(a)*Math.sin(a)),s=Math.tan(a)*Math.tan(a),c=.0067153352074207*Math.cos(a)*Math.cos(a),l=e*(1-t)/Math.pow(1-t*Math.sin(a)*Math.sin(a),1.5),u=r/(1.000035*i),d=a-i*Math.tan(a)/l*(u*u/2-(5+3*s+10*c-4*c*c-.0604380168667863)*u*u*u*u/24+(61+90*s+298*c+45*s*s-1.6922644722700164-3*c*c)*u*u*u*u*u*u/720);d*=Bb;var f=(u-(1+2*s+c)*u*u*u/6+(5-2*c+28*s-3*c*c+.0537226816593656+24*s*s)*u*u*u*u*u/120)/Math.cos(a);return new Vb(d,f=f*Bb-8).to_WGS84()},e.prototype.to_gridref=function(t){var n=Math.floor(this.x/1e5),r=Math.floor(this.y/1e5);return e.irishGrid[n]&&e.irishGrid[n][r]?qb(e.irishGrid[n][r],this.x-1e5*n,this.y-1e5*r,t||1):null},e.prototype.to_hectad=function(){var t=Math.floor(this.x/1e5),n=Math.floor(this.y/1e5);return e.irishGrid[t]&&e.irishGrid[t][n]?e.irishGrid[t][n]+Math.floor(this.x%1e5/1e4)+Math.floor(this.y%1e5/1e4):""},e}(),tT=function(){var e=function(){};return (e.prototype=new Ub).constructor=e,e.prototype.country="IE",e.prototype.GridCoords=eT,e.gridLetter={A:[0,4],B:[1,4],C:[2,4],D:[3,4],F:[0,3],G:[1,3],H:[2,3],J:[3,3],L:[0,2],M:[1,2],N:[2,2],O:[3,2],Q:[0,1],R:[1,1],S:[2,1],T:[3,1],V:[0,0],W:[1,0],X:[2,0],Y:[3,0]},e.prototype.from_string=function(t){var n=t.replace(/[\[\]\s\t\.-]+/g,"").toUpperCase();/[ABCDEFGHIJKLMNPQRSTUVWXYZ]$/.test(n)&&(e.quadrantOffsets.hasOwnProperty(n.substr(n.length-2))?(this.quadrantCode=n.substr(n.length-2),n=n.substr(0,n.length-2)):(this.tetradLetter=n.substr(n.length-1),n=n.substr(0,n.length-1))),this.parse_gr_string_without_tetrads(n),this.length>0?this.tetradLetter||this.quadrantCode?this.tetradLetter?(this.preciseGridRef=this.hectad+this.tetradLetter,this.tetrad=this.preciseGridRef,this.length=2e3,this.gridCoords.x+=e.tetradOffsets[this.tetradLetter][0],this.gridCoords.y+=e.tetradOffsets[this.tetradLetter][1]):(this.preciseGridRef=this.hectad+this.quadrantCode,this.quadrant=this.preciseGridRef,this.length=5e3,this.gridCoords.x+=e.quadrantOffsets[this.quadrantCode][0],this.gridCoords.y+=e.quadrantOffsets[this.quadrantCode][1]):(this.preciseGridRef=n,this.length<=1e3&&this.set_tetrad()):(this.error=!0,this.errorMessage="Irish grid reference format not understood. ('"+t+"')");},e.prototype.parse_well_formed=e.prototype.from_string,e._IE_GRID_LETTERS="VQLFAWRMGBXSNHCYTOJD",e.prototype.parse_gr_string_without_tetrads=function(t){var n,r,o,a;if(/^\d{2}\/(?:\d\d){1,5}$/.test(t)){if(n=parseInt(t.charAt(0),10),r=parseInt(t.charAt(1),10),n>3||r>4)return Logger("bad grid square, ref='"+t+"' (Ireland)"),this.length=0,!1;o=t.substr(3),a=e._IE_GRID_LETTERS.charAt(5*n+r),n*=1e5,r*=1e5;}else {if(t=t.replace("/",""),!/^[ABCDFGHJLMNOQRSTVWXY](?:\d\d){1,5}$/.test(t))return this.length=0,this.gridCoords=null,!1;if(!t)return Logger("Bad (empty) Irish grid ref"),this.length=0,this.gridCoords=null,!1;a=t.charAt(0);var i=e._IE_GRID_LETTERS.indexOf(a);if(-1===i)return Logger("Bad grid ref grid-letter, ref='"+t+"' (Ireland)"),this.length=0,this.gridCoords=null,!1;n=1e5*Math.floor(i/5),r=i%5*1e5,o=t.substr(1);}switch(o.length){case 2:this.gridCoords=new eT(n+1e4*o.charAt(0),r+1e4*o.charAt(1)),this.length=1e4,this.hectad=a+o;break;case 4:this.gridCoords=new eT(n+1e3*Math.floor(o/100),r+o%100*1e3),this.length=1e3,this.hectad=a+o.charAt(0)+o.charAt(2);break;case 6:this.gridCoords=new eT(n+100*Math.floor(o/1e3),r+o%1e3*100),this.length=100,this.hectad=a+o.charAt(0)+o.charAt(3);break;case 8:this.gridCoords=new eT(n+10*Math.floor(o/1e4),r+o%1e4*10),this.length=10,this.hectad=a+o.charAt(0)+o.charAt(4);break;case 10:this.gridCoords=new eT(n+Math.floor(o/1e5),r+o%1e5),this.length=1,this.hectad=a+o.charAt(0)+o.charAt(5);break;default:return Logger("Bad grid ref length, ref='"+t+"' (Ireland)"),this.length=0,this.gridCoords=null,!1}return !0},e}();Ub.from_string=function(e){var t,n=e.replace(/\s+/g,"").toUpperCase();if(!n)return !1;if(/^[A-Z]{1,2}\d{2}(?:[A-Z]|[NS][EW]|(?:\d{2}){0,4})?$/.test(n))return (t=/^.\d/.test(n)?new Ub.GridRefIE:"W"===n.charAt(0)?new Zb:new zb).parse_well_formed(n),!(!t.length||t.error)&&t;if((t=new zb).from_string(n),t.length&&!t.error)return t;if("W"===n.charAt(0)){if((t=new Zb).from_string(n),t.length&&!t.error)return t}else if((t=new tT).from_string(n),t.length&&!t.error)return t;return !1};var nT=$b;Yb.prototype.to_os_coords=function(){var e=this.lat*Jb,t=this.lng*Jb,n=.9996012717,r=.0066705397616,o=6377563.396*n,a=6356256.91*n,i=Math.sin(e)*Math.sin(e),s=o/Math.sqrt(1-r*i),c=s*(1-r)/(1-r*i),l=s/c-1,u=t- -.03490658503988659,d=s*Math.cos(e),f=Math.pow(Math.cos(e),3),h=Math.tan(e)*Math.tan(e),p=s/6*f*(s/c-h),v=Math.pow(Math.cos(e),5),S=Math.pow(Math.tan(e),4),y=s/120*v*(5-18*h+S+14*l-58*h*l),N=4e5+u*d+Math.pow(u,3)*p+Math.pow(u,5)*y,m=Gb._Marc(a,.0016732202503250907,.8552113334772214,e)+-1e5,g=s/2*Math.sin(e)*Math.cos(e),b=s/24*Math.sin(e)*Math.pow(Math.cos(e),3)*(5-Math.pow(Math.tan(e),2)+9*l),T=s/720*Math.sin(e)*v*(61-58*h+S),E=m+u*u*g+Math.pow(u,4)*b+Math.pow(u,6)*T;return new nT(Math.round(N),Math.round(E))};var rT=eT;Vb.prototype.to_os_coords=function(){var e=this.lat*Jb,t=this.lng*Jb,n=.00667054015,r=6377563.395906615,o=6356256.908205645,a=Math.sin(e)*Math.sin(e),i=r/Math.sqrt(1-n*a),s=i*(1-n)/(1-n*a),c=i/s-1,l=t- -.13962634015954636,u=i*Math.cos(e),d=Math.pow(Math.cos(e),3),f=Math.tan(e)*Math.tan(e),h=i/6*d*(i/s-f),p=Math.pow(Math.cos(e),5),v=Math.pow(Math.tan(e),4),S=i/120*p*(5-18*f+v+14*c-58*f*c),y=2e5+l*u+Math.pow(l,3)*h+Math.pow(l,5)*S,N=Gb._Marc(o,.0016732203841520518,.9337511498169663,e)+25e4,m=i/2*Math.sin(e)*Math.cos(e),g=i/24*Math.sin(e)*Math.pow(Math.cos(e),3)*(5-Math.pow(Math.tan(e),2)+9*c),b=i/720*Math.sin(e)*p*(61-58*f+v),T=N+l*l*m+Math.pow(l,4)*g+Math.pow(l,6)*b;return new rT(Math.round(y),Math.round(T))};var oT=Qb;function aT(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}function iT(e,t,n){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,n);}Kb.prototype.to_os_coords=function(){var e=this.lat*Jb,t=this.lng*Jb,n=.0067226700223333,r=6375836.6448,o=6354369.181221601,a=Math.sin(e)*Math.sin(e),i=r/Math.sqrt(1-n*a),s=i*(1-n)/(1-n*a),c=i/s-1,l=t- -.0523598775598,u=i*Math.cos(e),d=Math.pow(Math.cos(e),3),f=Math.tan(e)*Math.tan(e),h=i/6*d*(i/s-f),p=Math.pow(Math.cos(e),5),v=Math.pow(Math.tan(e),4),S=i/120*p*(5-18*f+v+14*c-58*f*c),y=5e5+l*u+Math.pow(l,3)*h+Math.pow(l,5)*S,N=Gb._Marc(o,.0016863406508729017,0,e)+0,m=i/2*Math.sin(e)*Math.cos(e),g=i/24*Math.sin(e)*Math.pow(Math.cos(e),3)*(5-Math.pow(Math.tan(e),2)+9*c),b=i/720*Math.sin(e)*p*(61-58*f+v),T=N+l*l*m+Math.pow(l,4)*g+Math.pow(l,6)*b;return new oT(Math.round(y),Math.round(T))};var sT=new WeakMap,cT=new WeakMap;(function(t){po(a,dv);var o=aT(a);function a(t){var n;return e(this,a),iT(fo(n=o.call(this,t)),sT,{writable:!0,value:void 0}),iT(fo(n),cT,{writable:!0,value:void 0}),r(fo(n),"_value",""),r(fo(n),"_inputType","text"),r(fo(n),"_autocomplete",""),t&&(t.type&&(n._inputType=t.type),t.placeholder&&(n.placeholder=t.placeholder),t.autocomplete&&(n._autocomplete=t.autocomplete)),n}return n(a,[{key:"value",get:function(){return this._value},set:function(e){this._value=void 0===e||null==e?"":e.trim(),this.updateView();}},{key:"updateView",value:function(){this._fieldEl&&(document.getElementById(go(this,sT)).value=dv.cleanRawString(this._value));}},{key:"buildField",value:function(){var e=document.createElement("div");e.className="form-group",mo(this,cT,e.id=dv.nextId),mo(this,sT,dv.nextId);var t=e.appendChild(document.createElement("label"));t.htmlFor=go(this,sT),t.textContent=this.label;var n=e.appendChild(document.createElement("div"));n.className="input-group";var r=n.appendChild(document.createElement("input"));r.className="form-control",r.id=go(this,sT),r.type="text",this.placeholder&&(r.placeholder=this.placeholder),this._autocomplete&&(r.autocomplete=this._autocomplete,"off"===this._autocomplete&&(r.name=Bp()));var o=n.appendChild(document.createElement("span"));if(o.className="input-group-btn",navigator.geolocation){var a=o.appendChild(document.createElement("button"));a.id=dv.nextId,a.type="button",a.className="btn btn-outline-secondary btn-sm",a.title="use GPS";var i=a.appendChild(document.createElement("span"));i.className="material-icons",i.innerText="gps_not_fixed",a.addEventListener("click",this.gpsButtonClickHandler.bind(this));}if(this.completion===dv.COMPLETION_COMPULSORY&&(r.required=!0),this.validationMessage){var s=e.appendChild(document.createElement("div"));s.className="invalid-feedback",s.innerHTML=this.validationMessage;}this.helpText&&(e.appendChild(document.createElement("small")).innerHTML=this.helpText);r.addEventListener("change",this.inputChangeHandler.bind(this)),this._fieldEl=e;}},{key:"markValidity",value:function(e){var t=document.getElementById(go(this,sT));null===e?t.classList.remove("is-invalid","is-valid"):(t.classList.remove(e?"is-invalid":"is-valid"),t.classList.add(e?"is-valid":"is-invalid"));}},{key:"inputChangeHandler",value:function(e){e.stopPropagation(),console.log("got input field change event"),this.value=dv.cleanRawString(document.getElementById(go(this,sT)).value),this.fireEvent(dv.EVENT_CHANGE);}},{key:"gpsButtonClickHandler",value:function(e){var t=this;console.log("got gps button click event"),navigator.geolocation.getCurrentPosition((function(e){var n=e.coords.latitude,r=e.coords.longitude;console.log("Got GPS fix ".concat(n," , ").concat(r));var o=Xb.from_latlng(n,r).to_gridref(1e3);console.log("Got grid-ref: ".concat(o)),t.value=o,t.fireEvent(dv.EVENT_CHANGE);}),(function(e){console.log("gps look-up failed"),console.log(e);}));}}],[{key:"summariseImpl",value:function(e,t,n){return ""!==n[e]&&null!==n[e]&&void 0!==n[e]?Xp(n[e].trim()):""}}]),a})();function uT(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}var dT=function(t){po(a,gv);var o=uT(a);function a(t){var n;if(e(this,a),r(fo(n=o.call(this)),"_occurrence",void 0),r(fo(n),"surveyId",""),(this instanceof a?this.constructor:void 0)===a)throw new TypeError("Cannot construct OccurrenceForm instances directly, class should be overridden.");return t&&(n.model=t),n}return n(a,[{key:"formElement",get:function(){var e=arguments,t=Lc(yo(a.prototype),"formElement",this);return this._formFieldsBuilt||(this.buildFormFields(),t.addEventListener("change",(function(){console.log("occurrence form change event"),console.log(e);}),{capture:!1})),t}},{key:"buildContentContainer",value:function(e){var t=e.appendChild(document.createElement("div"));t.className="card mt-3 ml-0 mr-0 mb-3";var n=t.appendChild(document.createElement("div"));return n.className="card-header",n.textContent=a.sectionTitle,this._formContentContainer=t.appendChild(document.createElement("div")),this._formContentContainer.className="card-body",this._formContentContainer}},{key:"occurrenceId",get:function(){return this._occurrence?this._occurrence.id:null}},{key:"projectId",get:function(){return this._occurrence?this._occurrence.projectId:null}},{key:"initialiseFormFields",value:function(){var e=a.properties;for(var t in this.fields={},e)e.hasOwnProperty(t)&&(this.fields[t]=new e[t].field(e[t].attributes));}},{key:"updateModelFromContent",value:function(){for(var e in console.log("updating occurrence from OccurrenceForm content"),this.fields)if(this.fields.hasOwnProperty(e)){var t=this.fields[e];this._occurrence.attributes[e]=t.value;}console.log({occurrence:this._occurrence});}},{key:"model",get:function(){return this._occurrence},set:function(e){this._occurrence=e,this.populateFormContent();}},{key:"changeHandler",value:function(e){console.log("occurrence form change event"),console.log({event:e}),this.fireEvent(gv.CHANGE_EVENT,{form:this});}},{key:"pingOccurrence",value:function(){this._occurrence.unsaved()&&this.fireEvent(gv.CHANGE_EVENT,{form:this});}},{key:"destructor",value:function(){this._occurrence=null,Lc(yo(a.prototype),"destructor",this).call(this);}},{key:"getFormSectionProperties",value:function(){return a.properties}}]),a}();r(dT,"properties",void 0),r(dT,"sectionTitle","Occurrence form"),r(dT,"help","Records help text, should normally be initialised with an imported html template");var fT=function t(){e(this,t);};function hT(e){return function(e){if(Array.isArray(e))return DS(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||FS(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r(fT,"sectionTitle",void 0),r(fT,"sectionSortOrder",void 0),r(fT,"sectionNavigationKey",void 0),r(fT,"help",""),r(fT,"properties",void 0);function pT(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return vT(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return vT(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return {s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return {s:function(){n=n.call(e);},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,a=e;},f:function(){try{i||null==n.return||n.return();}finally{if(s)throw a}}}}function vT(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ST(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var n,r=yo(e);if(t){var o=yo(this).constructor;n=Reflect.construct(r,arguments,o);}else n=r.apply(this,arguments);return So(this,n)}}function yT(e,t){mT(e,t),t.add(e);}function NT(e,t,n){mT(e,t),t.set(e,n);}function mT(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function gT(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}var bT=new WeakMap,TT=new WeakMap,ET=new WeakMap,wT=new WeakSet,_T=new WeakSet,CT=new WeakSet,OT=new WeakSet,RT=new WeakSet,IT=new WeakSet,MT=new WeakSet,LT$1=new WeakSet,xT=new WeakSet,HT=new WeakSet,kT=new WeakSet,PT=new WeakSet,AT=function(t){po(a,_y);var o=ST(a);function a(){var t;e(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return yT(fo(t=o.call.apply(o,[this].concat(i))),PT),yT(fo(t),kT),yT(fo(t),HT),yT(fo(t),xT),yT(fo(t),LT$1),yT(fo(t),MT),yT(fo(t),IT),yT(fo(t),RT),yT(fo(t),OT),yT(fo(t),CT),yT(fo(t),_T),yT(fo(t),wT),r(fo(t),"controller",void 0),NT(fo(t),bT,{writable:!0,value:{}}),NT(fo(t),TT,{writable:!0,value:void 0}),NT(fo(t),ET,{writable:!0,value:{}}),r(fo(t),"panelKey",""),r(fo(t),"OCCURRENCES_ARE_LAST_SECTION",!0),r(fo(t),"occurrenceSummaryText","Placeholder occurrence summary text in MainView.js"),r(fo(t),"welcomeContent","Placeholder welcome text in MainView.js"),r(fo(t),"defaultRightHandSideHelp","Default right-hand side help text in MainView.js"),t}return n(a,[{key:"initialise",value:function(){this.controller.app.addListener(jy.EVENT_OCCURRENCE_ADDED,this.occurrenceAddedHandler.bind(this));}},{key:"setLayout",value:function(){var e=this;document.getElementById("body").innerHTML='\r\n<div class="container-fluid">\r\n    <div class="row" style="height: 90vh;">\r\n        <div class="col d-md-block pr-md-0 pt-3" id="col1panel" style="overflow-y: auto; max-height: calc(100vh - 5rem);">\r\n        </div>\r\n        <div class="col d-md-none pl-0 pr-0" id="ctrlpanel" style="background-color: aliceblue; width: 28px; max-width: 28px; overflow-y: hidden; ">\r\n            <button class="navbar-light navbar-toggler pl-0 pr-0" type="button" aria-label="Back" id="right-panel-back">\r\n                <i class="material-icons-round" style="color: gray;">view_list</i>\r\n            </button>\r\n        </div>\r\n        <div class="col d-md-block pr-md-0" id="col2panel" style="overflow-y: auto; height: 100%;">\r\n        </div>\r\n    </div>\r\n</div>\r\n',document.getElementById("right-panel-back").addEventListener("click",(function(t){t.stopPropagation(),t.preventDefault(),e.fireEvent(Mv.EVENT_BACK);}));}},{key:"refreshLeftPanelAccordionState",value:function(){var e,t=document.querySelectorAll("div#".concat(this.leftPanelAccordionId,' div[data-parent="#').concat(this.leftPanelAccordionId,'"].collapse'));e=this.controller.viewSubcontext?"record"===this.controller.viewSubcontext?"record":this.controller.surveySection:"";var n,r=pT(t);try{for(r.s();!(n=r.n()).done;){var o=n.value;o.getAttribute("data-sectionkey")===e?o.classList.add("show"):o.classList.remove("show");}}catch(e){r.e(e);}finally{r.f();}this._refreshOccurrenceAccordionState();}},{key:"_refreshOccurrenceAccordionState",value:function(){var e,t=document.querySelectorAll("div#".concat("occurrencelistcontainer",' div[data-parent="#').concat("occurrencelistcontainer",'"].collapse')),n=this.controller.currentOccurrenceId,r=pT(t);try{for(r.s();!(e=r.n()).done;){var o=e.value;o.getAttribute("data-occurrenceid")===n?o.classList.add("show"):o.classList.remove("show");}}catch(e){r.e(e);}finally{r.f();}}},{key:"display",value:function(){if(this.controller.needsFullRefresh?(console.log("Full refresh triggered."),this.setLayout(),gT(this,RT,JT).call(this)):this.refreshLeftPanelAccordionState(),this.controller.needRightPanelRefresh)switch(this.controller.viewSubcontext){case"record":gT(this,_T,FT).call(this);break;case"survey":gT(this,wT,DT).call(this);break;default:gT(this,CT,UT).call(this);}this.setResponsivePanel(""===this.panelKey?"left":"right");}},{key:"refreshOccurrenceFooterControls",value:function(e){var t=this,n=e.appendChild(document.createElement("div")),r=n.appendChild(document.createElement("button"));if(r.className="btn btn-secondary btn-md-lg mt-2 mb-3 mr-2",r.type="button",r.textContent="back to list",r.setAttribute("data-buttonaction","back"),this.occurrenceIsMostRecent(this.controller.currentOccurrence)){var o=n.appendChild(document.createElement("button"));o.className="btn btn-primary btn-md-lg mt-2 mb-3 mr-2",o.type="button",o.textContent="add another",o.setAttribute("data-buttonaction","new");}if(this.OCCURRENCES_ARE_LAST_SECTION){var a=n.appendChild(document.createElement("button"));a.className="btn btn-primary btn-md-lg mt-2 mb-3",a.type="button",a.textContent="finish",a.setAttribute("data-buttonaction","finish");}else {var i=Iy.sections[1],s=n.appendChild(document.createElement("button"));s.className="btn btn-primary btn-md-lg mt-2 mb-3",s.type="button",s.textContent="next »",s.setAttribute("data-buttonaction","next"),s.title=i.sectionTitle;}n.addEventListener("click",(function(e){var n=e.target.closest("button");if(n&&n.hasAttribute("data-buttonaction"))switch(n.getAttribute("data-buttonaction")){case"new":t.fireEvent(Mv.EVENT_NEW_RECORD);break;case"back":t.controller.app.router.navigate("/list/record/");break;case"finish":t.controller.app.router.navigate("/list/record/"),$("#".concat("finishmodal")).modal();break;case"next":t.controller.app.router.navigate("/list/survey/".concat(nextSection.sectionNavigationKey));break;default:throw new Error("Unrecognised button action ".concat(n.getAttribute("data-buttonaction")))}}));}},{key:"occurrenceIsMostRecent",value:function(e){var t,n=pT(this.controller.occurrences.entries());try{for(n.s();!(t=n.n()).done;){var r=t.value;if(r[1].createdStamp>e.createdStamp&&!r[1].deleted)return !1}}catch(e){n.e(e);}finally{n.f();}return !0}},{key:"newButtonClickHandler",value:function(e){e.preventDefault(),e.stopPropagation(),this.fireEvent(Mv.EVENT_NEW_RECORD);}},{key:"occurrenceAddedHandler",value:function(e){var t=document.getElementById("occurrencelistcontainer");if(t){var n=this.controller.occurrences.get(e.occurrenceId),r=document.createElement("div");r.className="card",r.id="card_".concat(n.id),r.innerHTML=gT(this,PT,qT).call(this,n),go(this,ET)[n.id]=n.addListener(wv.EVENT_MODIFIED,this.occurrenceChangeHandler.bind(this),{occurrenceId:n.id}),t.insertBefore(r,t.firstChild);}}},{key:"refreshOccurrenceValiditySummary",value:function(e){var t=document.getElementById("card_".concat(e.id));t&&(e.evaluateCompletionStatus(dT.properties).requiredFieldsPresent?t.classList.remove("is-invalid"):t.classList.add("is-invalid"));}},{key:"occurrenceChangeHandler",value:function(e){var t=this.controller.occurrences.get(e.occurrenceId),n=document.getElementById("card_".concat(e.occurrenceId));n&&(t.deleted?(n.parentElement.removeChild(n),go(this,ET)[e.occurrenceId]&&(t.removeListener(wv.EVENT_MODIFIED,go(this,ET)[e.occurrenceId]),go(this,ET)[e.occurrenceId]=null)):(n.innerHTML=gT(this,PT,qT).call(this,t),this.refreshOccurrenceValiditySummary(t)));}},{key:"occurrenceSummaryBodyHTML",value:function(e){var t="";for(var n in e.attributes)if(e.attributes.hasOwnProperty(n)&&dT.properties.hasOwnProperty(n)&&!dT.properties[n].field.isEmpty(e.attributes[n])){var r=dT.properties[n].field.summarise(n,dT.properties[n],e.attributes);r&&(t+='<p class="ellipsed-line mb-0">'.concat(r,"</p>"));}return jy.devMode&&(t+='<p class="mb-0">(<i>id '.concat(e.id,"</i>)</p>")),t}},{key:"occurrenceSummaryHeadingHTML",value:function(e){var t="";if(e.attributes.hasOwnProperty("images")&&e.attributes.images.length){var n=e.attributes.images[0];t+=Hy.imageLink(n,48,48,{className:"mr-1"});}return e.attributes.taxon&&e.attributes.taxon.taxonId?t+=e.taxon.formattedHTML(e.attributes.taxon.vernacularMatch):e.attributes.taxon&&e.attributes.taxon.taxonName?t+=Xp(e.attributes.taxon.taxonName):t+="<span>(unnamed plant)</span>",t}},{key:"setResponsivePanel",value:function(e){var t=document.getElementById("col2panel"),n=document.getElementById("col1panel"),r=document.getElementById("ctrlpanel");switch(e){case"left":n.classList.remove("d-none"),n.classList.add("d-block"),t.classList.remove("d-block"),t.classList.add("d-none"),r.classList.remove("d-md-none"),r.classList.add("d-none");break;case"right":n.classList.remove("d-block"),n.classList.add("d-none"),t.classList.remove("d-none"),t.classList.add("d-block"),r.classList.remove("d-none"),r.classList.add("d-md-none");break;default:throw new Error("Unrecognised panel value '".concat(e))}}}]),a}();function DT(){var e=document.getElementById("col2panel"),t=this.controller.surveySection,n=Iy.sectionsByKey[t]?Iy.sectionsByKey[t].help:"";e.innerHTML=n||("welcome"===t?this.defaultRightHandSideHelp:"<p>placeholder survey help content for '".concat(t,"'</p>"));}function FT(){try{var e=this.controller.currentOccurrence,t=document.getElementById("col2panel");if(e){go(this,TT)&&go(this,TT).occurrenceId===e.id||(go(this,TT)&&go(this,TT).destructor(),mo(this,TT,e.setForm(new dT(e))),go(this,TT).surveyId=this.controller.app.currentSurvey.id,t.scrollTop=0),t.innerHTML="";var n=go(this,TT).formElement;t.appendChild(n),go(this,TT).populateFormContent(),this.refreshOccurrenceFooterControls(t),$("#description_".concat(e.id)).collapse("show");}else gT(this,CT,UT).call(this,dT.help);}catch(e){console.log({error:e});var r=document.getElementById("col2panel");r?r.innerHTML="<p>".concat(e.message,"</p>"):document.body.innerHTML="<h2>Internal error</h2><p>Please report this problem:</p><p>".concat(e.message,"</p>");}}function UT(e){document.getElementById("col2panel").innerHTML=e||this.defaultRightHandSideHelp;}function jT(){for(var e in go(this,ET)){var t=this.controller.occurrences.get[e];t&&t.removeListener(wv.EVENT_MODIFIED,go(this,ET)[e]);}mo(this,ET,{});}function JT(){var e=this,t=document.getElementById("col1panel").appendChild(document.createElement("div"));t.className="accordion",this.leftPanelAccordionId=t.id=gv.nextId,gT(this,LT$1,GT$1).call(this),gT(this,xT,KT).call(this,0,t,AT.NEXT_RECORDS),gT(this,HT,VT).call(this),gT(this,kT,XT).call(this),t.addEventListener("click",(function(t){var n=t.target.closest("a");n&&n.hasAttribute("data-help-link")&&(t.preventDefault(),t.stopPropagation(),e.controller.app.router.navigate(n.getAttribute("data-help-link")));})),gT(this,MT,YT).call(this),gT(this,IT,BT).call(this);}function BT(){var e=this,t=document.body,n='<div class="modal fade" id="'.concat("deleteoccurrencemodal",'" tabindex="-1" role="dialog" aria-labelledby="').concat("deleteoccurrencemodal",'Title" aria-hidden="true">\n  <div class="modal-dialog modal-dialog-centered" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h5 class="modal-title" id="').concat("deleteoccurrencemodal",'Title">Delete record?</h5>\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n          <span aria-hidden="true">&times;</span>\n        </button>\n      </div>\n      <div class="modal-body">\n        Please confirm that you wish to delete the record.\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-secondary" data-dismiss="modal">Back</button>\n        <button type="button" class="btn btn-danger" data-dismiss="modal" id="').concat("deleteoccurrencemodal",'confirmed">Delete record</button>\n      </div>\n    </div>\n  </div>\n</div>'),r=document.createElement("div");r.innerHTML=n,t.appendChild(r.firstChild),$("#".concat("deleteoccurrencemodal")).on("show.bs.modal",(function(e){var t=$(e.relatedTarget);if(t&&t.data("occurrenceid")){var n=t.data("occurrenceid");document.getElementById("".concat("deleteoccurrencemodal","confirmed")).setAttribute("data-occurrenceid",n);}})),document.getElementById("".concat("deleteoccurrencemodal","confirmed")).addEventListener("click",(function(t){var n=t.target.closest("button");if(n&&n.hasAttribute("data-occurrenceid")){var r=n.getAttribute("data-occurrenceid");console.log("Deleting occurrence ".concat(r,".")),e.fireEvent(Mv.EVENT_DELETE_OCCURRENCE,{occurrenceId:r});}}));var o=document.createElement("div");o.innerHTML='<div class="modal fade" id="'.concat("finishmodal",'" tabindex="-1" role="dialog" aria-labelledby="').concat("finishmodal",'Title" aria-hidden="true">\n  <div class="modal-dialog modal-dialog-centered" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h5 class="modal-title" id="').concat("finishmodal",'Title">Thank you</h5>\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n          <span aria-hidden="true">&times;</span>\n        </button>\n      </div>\n      <div class="modal-body">\n        <p>Thank you! Your form responses have been sent. If you wish, you can continue to make changes and edit or add further records.</p>\n        <p>If you provided an email address, then we will send you a message with a link to this form, so that you can return to it later if needed.</p>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n      </div>\n    </div>\n  </div>\n</div>'),t.appendChild(o.firstChild),t.appendChild(Og.licenseModal());var a=document.createElement("div");a.innerHTML='<div class="modal fade" id="'.concat("imagemodal",'" tabindex="-1" role="dialog" aria-labelledby="').concat("imagemodal",'Title" aria-hidden="true">\n  <div class="modal-dialog modal-dialog-centered" role="document">\n    <div class="modal-content">\n      <div class="modal-header d-none d-md-flex">\n        <h5 class="modal-title" id="').concat("imagemodal",'Title">Photo</h5>\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n          <span aria-hidden="true">&times;</span>\n        </button>\n      </div>\n      <div class="modal-body" style="position: relative;">\n        <picture>\n        </picture>\n      </div>\n      <div class="modal-footer">\n        <button type="button" id="').concat("imagemodaldelete",'" class="btn btn-outline-danger delete-occurrence-button mr-3" data-toggle="modal" data-target="#').concat("deleteimagemodal",'" data-imageid=""><i class="material-icons">delete</i></button>\n        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n      </div>\n    </div>\n  </div>\n</div>'),t.appendChild(a.firstChild),document.getElementById("imagemodaldelete").addEventListener("click",(function(t){var n=t.target.closest("button");if(n&&n.hasAttribute("data-imageid")){var r=n.getAttribute("data-imageid");go(e,TT).fireEvent("deleteimage",{imageId:r}),$("#".concat("imagemodal")).modal("hide");}}));}function YT(){var e=this;$("#".concat("col1panel")).on("show.bs.collapse",(function(t){t.target.dataset.occurrenceid?(console.log({"left panel accordion show event (with occ id)":t}),e.fireEvent(Mv.EVENT_SELECT_OCCURRENCE,{occurrenceId:t.target.dataset.occurrenceid})):t.target.dataset.sectionkey?(console.log({"left panel accordion show event (with section key)":t}),e.fireEvent(Mv.EVENT_SELECT_SURVEY_SECTION,{sectionKey:t.target.dataset.sectionkey})):console.log({"left panel accordion show event (other)":t});})).on("hidden.bs.collapse",(function(t){if(console.log({"left panel accordion hide event":t}),t.target.dataset.occurrenceid){var n=e.controller.occurrences.get(t.target.dataset.occurrenceid);n.isNew&&!n.isPristine&&(n.isNew=!1,e.refreshOccurrenceValiditySummary(n)),e.controller.currentOccurrenceId===t.target.dataset.occurrenceid&&e.fireEvent(Mv.EVENT_SELECT_OCCURRENCE,{occurrenceId:""});}else if(t.target.dataset.sectionkey)if("record"===t.target.dataset.sectionkey)"record"===e.controller.viewSubcontext&&e.fireEvent(Mv.EVENT_SELECT_SURVEY_SECTION,{sectionKey:""});else if(go(e,bT)[t.target.dataset.sectionkey]){var r=go(e,bT)[t.target.dataset.sectionkey].validateForm();console.log({"survey section validity":r}),e.controller.surveySection===t.target.dataset.sectionkey&&e.fireEvent(Mv.EVENT_SELECT_SURVEY_SECTION,{sectionKey:""});}}));}function GT$1(){var e=document.getElementById(this.leftPanelAccordionId),t=document.createElement("button");t.className="btn btn-primary",t.type="button",t.textContent="get started »",t.setAttribute("data-toggle","collapse"),t.setAttribute("data-target","#survey-0-about");var n=gv.nextId,r=document.createElement("div");r.innerHTML=this.welcomeContent,r.appendChild(t);var o=document.createElement("span");o.className="d-md-none pl-2",o.innerHTML='(<a href="/app/list/survey/welcome/help" data-navigo="list/survey/welcome/help">more info</a>)',r.appendChild(o),e.appendChild(this.card({cardId:n,cardHeadingId:gv.nextId,collapsed:"welcome"!==this.controller.surveySection,headingButtonId:gv.nextId,headingHTML:'<img src="/img/BSBIlong.png" alt="" style="float:right; max-width: 40%; max-height: 48px;"><div style="float: left;">Welcome</div>',buttonStyleString:"width: 100%",headingNonbuttonHTML:"",headingValidationWarningHTML:"",cardDescriptionId:"survey-welcome",parentContainerId:e.id,bodyContentElement:r,dataAttributes:{sectionkey:"welcome"}}));}function KT(e,t,n){var r=this,o=Iy.sections[e],a=new Iy(o);go(this,bT)[o.sectionNavigationKey]=a;var i=a.formElement,s=document.createElement("button");switch(s.className="btn btn-primary",s.type="button",s.textContent="next »",n){case AT.NEXT_RECORDS:s.addEventListener("click",(function(e){e.preventDefault(),e.stopPropagation(),r.fireEvent(Mv.EVENT_NEXT_TO_RECORDS);}));break;case AT.NEXT_SURVEY_SECTION:var c=Iy.sections[e+1];s.setAttribute("data-toggle","collapse"),s.setAttribute("data-target","#survey-".concat(e+1,"-").concat(c.sectionNavigationKey)),s.title=c.sectionTitle;break;case AT.NEXT_IS_FINAL:s.textContent="finish",s.className="btn btn-primary btn-md-lg mt-2 mb-3",s.type="button",s.addEventListener("click",(function(){r.controller.app.router.navigate("/list/"),$("#".concat("finishmodal")).modal();}));break;default:throw new Error("Unrecognized next section keyword '".concat(n,"'"))}i.appendChild(s);var l=gv.nextId;t.appendChild(this.card({cardId:l,cardHeadingId:gv.nextId,collapsed:this.controller.surveySection!==o.sectionNavigationKey,headingButtonId:gv.nextId,headingHTML:o.sectionTitle,headingNonbuttonHTML:'<small class="btn d-md-none" style="margin: 0; padding: 0;">(<a href="/app/list/survey/'.concat(o.sectionNavigationKey,'/help" data-help-link="/list/survey/').concat(o.sectionNavigationKey,'/help">help</a>)</small>'),headingValidationWarningHTML:"Please check the form for some missing responses.",cardDescriptionId:"survey-".concat(e,"-").concat(o.sectionNavigationKey),parentContainerId:t.id,bodyContentElement:i,dataAttributes:{sectionkey:o.sectionNavigationKey}})),this.controller.survey.registerForm(a),a.addListener(Iy.EVENT_VALIDATION_STATE_CHANGE,(function(e){var t=document.getElementById(l);e.isValid?t.classList.remove("is-invalid"):t.classList.add("is-invalid");}));}function VT(){var e=document.getElementById(this.leftPanelAccordionId),t=document.createDocumentFragment();t.appendChild(document.createElement("p")).innerHTML="".concat(this.occurrenceSummaryText,'<small class="d-block d-md-none"><a href="/app/list/record/help">(help)</a></small>');var n=t.appendChild(document.createElement("button"));n.type="button",n.className="btn btn-primary btn-lg mb-2",n.innerText="Add a plant record.",n.addEventListener("click",this.newButtonClickHandler.bind(this)),t.appendChild(document.createElement("div")).id="occurrencelistcontainer",e.appendChild(this.card({cardId:gv.nextId,cardHeadingId:gv.nextId,collapsed:"record"!==this.controller.viewSubcontext,headingButtonId:gv.nextId,headingHTML:"Your plant records",cardDescriptionId:gv.nextId,parentContainerId:e.id,bodyContentElement:t,dataAttributes:{sectionkey:"record"}}));}function XT(){var e=document.getElementById("occurrencelistcontainer");if(!e)throw new Cv("Failed to find list container.");gT(this,OT,jT).call(this);var t,n=[],r=pT(hT(this.controller.occurrences.entries()).sort((function(e,t){return t[1].createdStamp-e[1].createdStamp})));try{for(r.s();!(t=r.n()).done;){var o=t.value[1];if(console.log("displaying '".concat(o.id,"'")),!o.deleted){var a=o.isNew||o.evaluateCompletionStatus(dT.properties).requiredFieldsPresent;n.push('<div class="card'.concat(a?"":" is-invalid",'" id="card_').concat(o.id,'">\n    ').concat(gT(this,PT,qT).call(this,o),"\n</div>")),go(this,ET)[o.id]=o.addListener(wv.EVENT_MODIFIED,this.occurrenceChangeHandler.bind(this),{occurrenceId:o.id});}}}catch(e){r.e(e);}finally{r.f();}e.className="accordion",e.innerHTML=n.join(""),e.addEventListener("click",(function(e){var t=e.target.closest("button");t&&t.hasAttribute("data-toggle")&&"modal"===t.getAttribute("data-toggle")&&(document.getElementById("".concat("deleteoccurrencemodal","confirmed")).setAttribute("data-occurrenceid",t.getAttribute("data-occurrenceid")),$(t.getAttribute("data-target")).modal(),e.preventDefault(),e.stopPropagation());}));}function qT(e){return '<div class="card-header pointer pl-2 pr-2 pt-2 pb-2" id="heading_'.concat(e.id,'" data-toggle="collapse" data-target="#description_').concat(e.id,'">\n    <div class="float-right">\n        <button type="button" class="btn btn-outline-danger delete-occurrence-button" data-toggle="modal" data-target="#').concat("deleteoccurrencemodal",'" data-occurrenceid="').concat(e.id,'"><i class="material-icons">delete</i></button>\n    </div>\n    <h2 class="mb-0 pb-0 mt-0 pt-0 pl-0 ml-0">\n        <button class="btn btn-link').concat(this.controller.currentOccurrenceId===e.id?"":" collapsed",' pt-0 pb-0 pl-0" id="headingbutton_').concat(e.id,'" type="button" data-toggle="collapse" data-target="#description_').concat(e.id,'" aria-expanded="').concat(this.controller.currentOccurrenceId===e.id?"true":"false",'" aria-controls="description_').concat(e.id,'">\n          ').concat(this.occurrenceSummaryHeadingHTML(e),'\n        </button>\n    </h2>\n    <div class="card-invalid-feedback">\n        <small>Please check for errors or missing details.</small>\n    </div>\n</div>\n<div id="description_').concat(e.id,'" class="collapse').concat(this.controller.currentOccurrenceId===e.id?" show":"",'" aria-labelledby="heading_').concat(e.id,'" data-parent="#').concat("occurrencelistcontainer",'" data-occurrenceid="').concat(e.id,'">\n  <div class="card-body">\n    ').concat(this.occurrenceSummaryBodyHTML(e),"\n  </div>\n</div>")}r(AT,"NEXT_RECORDS","records"),r(AT,"NEXT_SURVEY_SECTION","survey"),r(AT,"NEXT_IS_FINAL","last");

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;

      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }

      return _assertThisInitialized(self);
    }

    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();

      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result;

        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;

          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }

        return _possibleConstructorReturn(this, result);
      };
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;

      var _s, _e;

      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it) o = it;
          var i = 0;

          var F = function () {};

          return {
            s: F,
            n: function () {
              if (i >= o.length) return {
                done: true
              };
              return {
                done: false,
                value: o[i++]
              };
            },
            e: function (e) {
              throw e;
            },
            f: F
          };
        }

        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      var normalCompletion = true,
          didErr = false,
          err;
      return {
        s: function () {
          it = it.call(o);
        },
        n: function () {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        },
        e: function (e) {
          didErr = true;
          err = e;
        },
        f: function () {
          try {
            if (!normalCompletion && it.return != null) it.return();
          } finally {
            if (didErr) throw err;
          }
        }
      };
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function commonjsRequire (path) {
    	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
    }

    var check = function (it) {
      return it && it.Math == Math && it;
    };

    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global$m =
      // eslint-disable-next-line es/no-global-this -- safe
      check(typeof globalThis == 'object' && globalThis) ||
      check(typeof window == 'object' && window) ||
      // eslint-disable-next-line no-restricted-globals -- safe
      check(typeof self == 'object' && self) ||
      check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
      // eslint-disable-next-line no-new-func -- fallback
      (function () { return this; })() || Function('return this')();

    var objectGetOwnPropertyDescriptor = {};

    var fails$h = function (exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };

    var fails$g = fails$h;

    // Detect IE8's incomplete defineProperty implementation
    var descriptors = !fails$g(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
    });

    var objectPropertyIsEnumerable = {};

    var $propertyIsEnumerable = {}.propertyIsEnumerable;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

    // Nashorn ~ JDK8 bug
    var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

    // `Object.prototype.propertyIsEnumerable` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
    objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor$2(this, V);
      return !!descriptor && descriptor.enumerable;
    } : $propertyIsEnumerable;

    var createPropertyDescriptor$4 = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };

    var toString$7 = {}.toString;

    var classofRaw$1 = function (it) {
      return toString$7.call(it).slice(8, -1);
    };

    var fails$f = fails$h;
    var classof$9 = classofRaw$1;

    var split = ''.split;

    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    var indexedObject = fails$f(function () {
      // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
      // eslint-disable-next-line no-prototype-builtins -- safe
      return !Object('z').propertyIsEnumerable(0);
    }) ? function (it) {
      return classof$9(it) == 'String' ? split.call(it, '') : Object(it);
    } : Object;

    // `RequireObjectCoercible` abstract operation
    // https://tc39.es/ecma262/#sec-requireobjectcoercible
    var requireObjectCoercible$5 = function (it) {
      if (it == undefined) throw TypeError("Can't call method on " + it);
      return it;
    };

    // toObject with fallback for non-array-like ES3 strings
    var IndexedObject = indexedObject;
    var requireObjectCoercible$4 = requireObjectCoercible$5;

    var toIndexedObject$4 = function (it) {
      return IndexedObject(requireObjectCoercible$4(it));
    };

    // `IsCallable` abstract operation
    // https://tc39.es/ecma262/#sec-iscallable
    var isCallable$j = function (argument) {
      return typeof argument === 'function';
    };

    var isCallable$i = isCallable$j;

    var isObject$a = function (it) {
      return typeof it === 'object' ? it !== null : isCallable$i(it);
    };

    var global$l = global$m;
    var isCallable$h = isCallable$j;

    var aFunction = function (argument) {
      return isCallable$h(argument) ? argument : undefined;
    };

    var getBuiltIn$8 = function (namespace, method) {
      return arguments.length < 2 ? aFunction(global$l[namespace]) : global$l[namespace] && global$l[namespace][method];
    };

    var getBuiltIn$7 = getBuiltIn$8;

    var engineUserAgent = getBuiltIn$7('navigator', 'userAgent') || '';

    var global$k = global$m;
    var userAgent$3 = engineUserAgent;

    var process$3 = global$k.process;
    var Deno = global$k.Deno;
    var versions = process$3 && process$3.versions || Deno && Deno.version;
    var v8 = versions && versions.v8;
    var match, version;

    if (v8) {
      match = v8.split('.');
      version = match[0] < 4 ? 1 : match[0] + match[1];
    } else if (userAgent$3) {
      match = userAgent$3.match(/Edge\/(\d+)/);
      if (!match || match[1] >= 74) {
        match = userAgent$3.match(/Chrome\/(\d+)/);
        if (match) version = match[1];
      }
    }

    var engineV8Version = version && +version;

    /* eslint-disable es/no-symbol -- required for testing */

    var V8_VERSION$3 = engineV8Version;
    var fails$e = fails$h;

    // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
    var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$e(function () {
      var symbol = Symbol();
      // Chrome 38 Symbol has incorrect toString conversion
      // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
      return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
        // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
    });

    /* eslint-disable es/no-symbol -- required for testing */

    var NATIVE_SYMBOL$1 = nativeSymbol;

    var useSymbolAsUid = NATIVE_SYMBOL$1
      && !Symbol.sham
      && typeof Symbol.iterator == 'symbol';

    var isCallable$g = isCallable$j;
    var getBuiltIn$6 = getBuiltIn$8;
    var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

    var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
      return typeof it == 'symbol';
    } : function (it) {
      var $Symbol = getBuiltIn$6('Symbol');
      return isCallable$g($Symbol) && Object(it) instanceof $Symbol;
    };

    var tryToString$2 = function (argument) {
      try {
        return String(argument);
      } catch (error) {
        return 'Object';
      }
    };

    var isCallable$f = isCallable$j;
    var tryToString$1 = tryToString$2;

    // `Assert: IsCallable(argument) is true`
    var aCallable$5 = function (argument) {
      if (isCallable$f(argument)) return argument;
      throw TypeError(tryToString$1(argument) + ' is not a function');
    };

    var aCallable$4 = aCallable$5;

    // `GetMethod` abstract operation
    // https://tc39.es/ecma262/#sec-getmethod
    var getMethod$4 = function (V, P) {
      var func = V[P];
      return func == null ? undefined : aCallable$4(func);
    };

    var isCallable$e = isCallable$j;
    var isObject$9 = isObject$a;

    // `OrdinaryToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-ordinarytoprimitive
    var ordinaryToPrimitive$1 = function (input, pref) {
      var fn, val;
      if (pref === 'string' && isCallable$e(fn = input.toString) && !isObject$9(val = fn.call(input))) return val;
      if (isCallable$e(fn = input.valueOf) && !isObject$9(val = fn.call(input))) return val;
      if (pref !== 'string' && isCallable$e(fn = input.toString) && !isObject$9(val = fn.call(input))) return val;
      throw TypeError("Can't convert object to primitive value");
    };

    var shared$4 = {exports: {}};

    var global$j = global$m;

    var setGlobal$3 = function (key, value) {
      try {
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        Object.defineProperty(global$j, key, { value: value, configurable: true, writable: true });
      } catch (error) {
        global$j[key] = value;
      } return value;
    };

    var global$i = global$m;
    var setGlobal$2 = setGlobal$3;

    var SHARED = '__core-js_shared__';
    var store$3 = global$i[SHARED] || setGlobal$2(SHARED, {});

    var sharedStore = store$3;

    var store$2 = sharedStore;

    (shared$4.exports = function (key, value) {
      return store$2[key] || (store$2[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.18.3',
      mode: 'global',
      copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
    });

    var requireObjectCoercible$3 = requireObjectCoercible$5;

    // `ToObject` abstract operation
    // https://tc39.es/ecma262/#sec-toobject
    var toObject$3 = function (argument) {
      return Object(requireObjectCoercible$3(argument));
    };

    var toObject$2 = toObject$3;

    var hasOwnProperty = {}.hasOwnProperty;

    // `HasOwnProperty` abstract operation
    // https://tc39.es/ecma262/#sec-hasownproperty
    var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
      return hasOwnProperty.call(toObject$2(it), key);
    };

    var id = 0;
    var postfix = Math.random();

    var uid$2 = function (key) {
      return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
    };

    var global$h = global$m;
    var shared$3 = shared$4.exports;
    var hasOwn$8 = hasOwnProperty_1;
    var uid$1 = uid$2;
    var NATIVE_SYMBOL = nativeSymbol;
    var USE_SYMBOL_AS_UID = useSymbolAsUid;

    var WellKnownSymbolsStore = shared$3('wks');
    var Symbol$1 = global$h.Symbol;
    var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

    var wellKnownSymbol$k = function (name) {
      if (!hasOwn$8(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
        if (NATIVE_SYMBOL && hasOwn$8(Symbol$1, name)) {
          WellKnownSymbolsStore[name] = Symbol$1[name];
        } else {
          WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
        }
      } return WellKnownSymbolsStore[name];
    };

    var isObject$8 = isObject$a;
    var isSymbol$1 = isSymbol$2;
    var getMethod$3 = getMethod$4;
    var ordinaryToPrimitive = ordinaryToPrimitive$1;
    var wellKnownSymbol$j = wellKnownSymbol$k;

    var TO_PRIMITIVE = wellKnownSymbol$j('toPrimitive');

    // `ToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-toprimitive
    var toPrimitive$1 = function (input, pref) {
      if (!isObject$8(input) || isSymbol$1(input)) return input;
      var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
      var result;
      if (exoticToPrim) {
        if (pref === undefined) pref = 'default';
        result = exoticToPrim.call(input, pref);
        if (!isObject$8(result) || isSymbol$1(result)) return result;
        throw TypeError("Can't convert object to primitive value");
      }
      if (pref === undefined) pref = 'number';
      return ordinaryToPrimitive(input, pref);
    };

    var toPrimitive = toPrimitive$1;
    var isSymbol = isSymbol$2;

    // `ToPropertyKey` abstract operation
    // https://tc39.es/ecma262/#sec-topropertykey
    var toPropertyKey$3 = function (argument) {
      var key = toPrimitive(argument, 'string');
      return isSymbol(key) ? key : String(key);
    };

    var global$g = global$m;
    var isObject$7 = isObject$a;

    var document$3 = global$g.document;
    // typeof document.createElement is 'object' in old IE
    var EXISTS$1 = isObject$7(document$3) && isObject$7(document$3.createElement);

    var documentCreateElement$2 = function (it) {
      return EXISTS$1 ? document$3.createElement(it) : {};
    };

    var DESCRIPTORS$6 = descriptors;
    var fails$d = fails$h;
    var createElement$1 = documentCreateElement$2;

    // Thank's IE8 for his funny defineProperty
    var ie8DomDefine = !DESCRIPTORS$6 && !fails$d(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
      return Object.defineProperty(createElement$1('div'), 'a', {
        get: function () { return 7; }
      }).a != 7;
    });

    var DESCRIPTORS$5 = descriptors;
    var propertyIsEnumerableModule = objectPropertyIsEnumerable;
    var createPropertyDescriptor$3 = createPropertyDescriptor$4;
    var toIndexedObject$3 = toIndexedObject$4;
    var toPropertyKey$2 = toPropertyKey$3;
    var hasOwn$7 = hasOwnProperty_1;
    var IE8_DOM_DEFINE$1 = ie8DomDefine;

    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    objectGetOwnPropertyDescriptor.f = DESCRIPTORS$5 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$3(O);
      P = toPropertyKey$2(P);
      if (IE8_DOM_DEFINE$1) try {
        return $getOwnPropertyDescriptor(O, P);
      } catch (error) { /* empty */ }
      if (hasOwn$7(O, P)) return createPropertyDescriptor$3(!propertyIsEnumerableModule.f.call(O, P), O[P]);
    };

    var objectDefineProperty = {};

    var isObject$6 = isObject$a;

    // `Assert: Type(argument) is Object`
    var anObject$d = function (argument) {
      if (isObject$6(argument)) return argument;
      throw TypeError(String(argument) + ' is not an object');
    };

    var DESCRIPTORS$4 = descriptors;
    var IE8_DOM_DEFINE = ie8DomDefine;
    var anObject$c = anObject$d;
    var toPropertyKey$1 = toPropertyKey$3;

    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var $defineProperty = Object.defineProperty;

    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    objectDefineProperty.f = DESCRIPTORS$4 ? $defineProperty : function defineProperty(O, P, Attributes) {
      anObject$c(O);
      P = toPropertyKey$1(P);
      anObject$c(Attributes);
      if (IE8_DOM_DEFINE) try {
        return $defineProperty(O, P, Attributes);
      } catch (error) { /* empty */ }
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };

    var DESCRIPTORS$3 = descriptors;
    var definePropertyModule$5 = objectDefineProperty;
    var createPropertyDescriptor$2 = createPropertyDescriptor$4;

    var createNonEnumerableProperty$6 = DESCRIPTORS$3 ? function (object, key, value) {
      return definePropertyModule$5.f(object, key, createPropertyDescriptor$2(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };

    var redefine$8 = {exports: {}};

    var isCallable$d = isCallable$j;
    var store$1 = sharedStore;

    var functionToString = Function.toString;

    // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
    if (!isCallable$d(store$1.inspectSource)) {
      store$1.inspectSource = function (it) {
        return functionToString.call(it);
      };
    }

    var inspectSource$4 = store$1.inspectSource;

    var global$f = global$m;
    var isCallable$c = isCallable$j;
    var inspectSource$3 = inspectSource$4;

    var WeakMap$2 = global$f.WeakMap;

    var nativeWeakMap = isCallable$c(WeakMap$2) && /native code/.test(inspectSource$3(WeakMap$2));

    var shared$2 = shared$4.exports;
    var uid = uid$2;

    var keys = shared$2('keys');

    var sharedKey$3 = function (key) {
      return keys[key] || (keys[key] = uid(key));
    };

    var hiddenKeys$4 = {};

    var NATIVE_WEAK_MAP = nativeWeakMap;
    var global$e = global$m;
    var isObject$5 = isObject$a;
    var createNonEnumerableProperty$5 = createNonEnumerableProperty$6;
    var hasOwn$6 = hasOwnProperty_1;
    var shared$1 = sharedStore;
    var sharedKey$2 = sharedKey$3;
    var hiddenKeys$3 = hiddenKeys$4;

    var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
    var WeakMap$1 = global$e.WeakMap;
    var set$1, get, has;

    var enforce = function (it) {
      return has(it) ? get(it) : set$1(it, {});
    };

    var getterFor = function (TYPE) {
      return function (it) {
        var state;
        if (!isObject$5(it) || (state = get(it)).type !== TYPE) {
          throw TypeError('Incompatible receiver, ' + TYPE + ' required');
        } return state;
      };
    };

    if (NATIVE_WEAK_MAP || shared$1.state) {
      var store = shared$1.state || (shared$1.state = new WeakMap$1());
      var wmget = store.get;
      var wmhas = store.has;
      var wmset = store.set;
      set$1 = function (it, metadata) {
        if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        wmset.call(store, it, metadata);
        return metadata;
      };
      get = function (it) {
        return wmget.call(store, it) || {};
      };
      has = function (it) {
        return wmhas.call(store, it);
      };
    } else {
      var STATE = sharedKey$2('state');
      hiddenKeys$3[STATE] = true;
      set$1 = function (it, metadata) {
        if (hasOwn$6(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty$5(it, STATE, metadata);
        return metadata;
      };
      get = function (it) {
        return hasOwn$6(it, STATE) ? it[STATE] : {};
      };
      has = function (it) {
        return hasOwn$6(it, STATE);
      };
    }

    var internalState = {
      set: set$1,
      get: get,
      has: has,
      enforce: enforce,
      getterFor: getterFor
    };

    var DESCRIPTORS$2 = descriptors;
    var hasOwn$5 = hasOwnProperty_1;

    var FunctionPrototype = Function.prototype;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getDescriptor = DESCRIPTORS$2 && Object.getOwnPropertyDescriptor;

    var EXISTS = hasOwn$5(FunctionPrototype, 'name');
    // additional protection from minified / mangled / dropped function names
    var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
    var CONFIGURABLE = EXISTS && (!DESCRIPTORS$2 || (DESCRIPTORS$2 && getDescriptor(FunctionPrototype, 'name').configurable));

    var functionName = {
      EXISTS: EXISTS,
      PROPER: PROPER,
      CONFIGURABLE: CONFIGURABLE
    };

    var global$d = global$m;
    var isCallable$b = isCallable$j;
    var hasOwn$4 = hasOwnProperty_1;
    var createNonEnumerableProperty$4 = createNonEnumerableProperty$6;
    var setGlobal$1 = setGlobal$3;
    var inspectSource$2 = inspectSource$4;
    var InternalStateModule$3 = internalState;
    var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;

    var getInternalState$4 = InternalStateModule$3.get;
    var enforceInternalState = InternalStateModule$3.enforce;
    var TEMPLATE = String(String).split('String');

    (redefine$8.exports = function (O, key, value, options) {
      var unsafe = options ? !!options.unsafe : false;
      var simple = options ? !!options.enumerable : false;
      var noTargetGet = options ? !!options.noTargetGet : false;
      var name = options && options.name !== undefined ? options.name : key;
      var state;
      if (isCallable$b(value)) {
        if (String(name).slice(0, 7) === 'Symbol(') {
          name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
        }
        if (!hasOwn$4(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
          createNonEnumerableProperty$4(value, 'name', name);
        }
        state = enforceInternalState(value);
        if (!state.source) {
          state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
        }
      }
      if (O === global$d) {
        if (simple) O[key] = value;
        else setGlobal$1(key, value);
        return;
      } else if (!unsafe) {
        delete O[key];
      } else if (!noTargetGet && O[key]) {
        simple = true;
      }
      if (simple) O[key] = value;
      else createNonEnumerableProperty$4(O, key, value);
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, 'toString', function toString() {
      return isCallable$b(this) && getInternalState$4(this).source || inspectSource$2(this);
    });

    var objectGetOwnPropertyNames = {};

    var ceil = Math.ceil;
    var floor = Math.floor;

    // `ToIntegerOrInfinity` abstract operation
    // https://tc39.es/ecma262/#sec-tointegerorinfinity
    var toIntegerOrInfinity$3 = function (argument) {
      var number = +argument;
      // eslint-disable-next-line no-self-compare -- safe
      return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
    };

    var toIntegerOrInfinity$2 = toIntegerOrInfinity$3;

    var max = Math.max;
    var min$2 = Math.min;

    // Helper for a popular repeating case of the spec:
    // Let integer be ? ToInteger(index).
    // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
    var toAbsoluteIndex$1 = function (index, length) {
      var integer = toIntegerOrInfinity$2(index);
      return integer < 0 ? max(integer + length, 0) : min$2(integer, length);
    };

    var toIntegerOrInfinity$1 = toIntegerOrInfinity$3;

    var min$1 = Math.min;

    // `ToLength` abstract operation
    // https://tc39.es/ecma262/#sec-tolength
    var toLength$2 = function (argument) {
      return argument > 0 ? min$1(toIntegerOrInfinity$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
    };

    var toLength$1 = toLength$2;

    // `LengthOfArrayLike` abstract operation
    // https://tc39.es/ecma262/#sec-lengthofarraylike
    var lengthOfArrayLike$3 = function (obj) {
      return toLength$1(obj.length);
    };

    var toIndexedObject$2 = toIndexedObject$4;
    var toAbsoluteIndex = toAbsoluteIndex$1;
    var lengthOfArrayLike$2 = lengthOfArrayLike$3;

    // `Array.prototype.{ indexOf, includes }` methods implementation
    var createMethod$1 = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIndexedObject$2($this);
        var length = lengthOfArrayLike$2(O);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare -- NaN check
        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare -- NaN check
          if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        } else for (;length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        } return !IS_INCLUDES && -1;
      };
    };

    var arrayIncludes = {
      // `Array.prototype.includes` method
      // https://tc39.es/ecma262/#sec-array.prototype.includes
      includes: createMethod$1(true),
      // `Array.prototype.indexOf` method
      // https://tc39.es/ecma262/#sec-array.prototype.indexof
      indexOf: createMethod$1(false)
    };

    var hasOwn$3 = hasOwnProperty_1;
    var toIndexedObject$1 = toIndexedObject$4;
    var indexOf = arrayIncludes.indexOf;
    var hiddenKeys$2 = hiddenKeys$4;

    var objectKeysInternal = function (object, names) {
      var O = toIndexedObject$1(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O) !hasOwn$3(hiddenKeys$2, key) && hasOwn$3(O, key) && result.push(key);
      // Don't enum bug & hidden keys
      while (names.length > i) if (hasOwn$3(O, key = names[i++])) {
        ~indexOf(result, key) || result.push(key);
      }
      return result;
    };

    // IE8- don't enum bug keys
    var enumBugKeys$3 = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ];

    var internalObjectKeys$1 = objectKeysInternal;
    var enumBugKeys$2 = enumBugKeys$3;

    var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    // eslint-disable-next-line es/no-object-getownpropertynames -- safe
    objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return internalObjectKeys$1(O, hiddenKeys$1);
    };

    var objectGetOwnPropertySymbols = {};

    // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
    objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

    var getBuiltIn$5 = getBuiltIn$8;
    var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
    var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
    var anObject$b = anObject$d;

    // all object keys, includes non-enumerable and symbols
    var ownKeys$1 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
      var keys = getOwnPropertyNamesModule.f(anObject$b(it));
      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
    };

    var hasOwn$2 = hasOwnProperty_1;
    var ownKeys = ownKeys$1;
    var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
    var definePropertyModule$4 = objectDefineProperty;

    var copyConstructorProperties$1 = function (target, source) {
      var keys = ownKeys(source);
      var defineProperty = definePropertyModule$4.f;
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!hasOwn$2(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    };

    var fails$c = fails$h;
    var isCallable$a = isCallable$j;

    var replacement = /#|\.prototype\./;

    var isForced$2 = function (feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? true
        : value == NATIVE ? false
        : isCallable$a(detection) ? fails$c(detection)
        : !!detection;
    };

    var normalize = isForced$2.normalize = function (string) {
      return String(string).replace(replacement, '.').toLowerCase();
    };

    var data = isForced$2.data = {};
    var NATIVE = isForced$2.NATIVE = 'N';
    var POLYFILL = isForced$2.POLYFILL = 'P';

    var isForced_1 = isForced$2;

    var global$c = global$m;
    var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
    var createNonEnumerableProperty$3 = createNonEnumerableProperty$6;
    var redefine$7 = redefine$8.exports;
    var setGlobal = setGlobal$3;
    var copyConstructorProperties = copyConstructorProperties$1;
    var isForced$1 = isForced_1;

    /*
      options.target      - name of the target object
      options.global      - target is the global object
      options.stat        - export as static methods of target
      options.proto       - export as prototype methods of target
      options.real        - real prototype method for the `pure` version
      options.forced      - export even if the native feature is available
      options.bind        - bind methods to the target, required for the `pure` version
      options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
      options.unsafe      - use the simple assignment of property instead of delete + defineProperty
      options.sham        - add a flag to not completely full polyfills
      options.enumerable  - export as enumerable property
      options.noTargetGet - prevent calling a getter on target
      options.name        - the .name of the function if it does not match the key
    */
    var _export = function (options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var FORCED, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL) {
        target = global$c;
      } else if (STATIC) {
        target = global$c[TARGET] || setGlobal(TARGET, {});
      } else {
        target = (global$c[TARGET] || {}).prototype;
      }
      if (target) for (key in source) {
        sourceProperty = source[key];
        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor$1(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty === typeof targetProperty) continue;
          copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || (targetProperty && targetProperty.sham)) {
          createNonEnumerableProperty$3(sourceProperty, 'sham', true);
        }
        // extend global
        redefine$7(target, key, sourceProperty, options);
      }
    };

    var classof$8 = classofRaw$1;

    // `IsArray` abstract operation
    // https://tc39.es/ecma262/#sec-isarray
    // eslint-disable-next-line es/no-array-isarray -- safe
    var isArray$2 = Array.isArray || function isArray(argument) {
      return classof$8(argument) == 'Array';
    };

    var toPropertyKey = toPropertyKey$3;
    var definePropertyModule$3 = objectDefineProperty;
    var createPropertyDescriptor$1 = createPropertyDescriptor$4;

    var createProperty$1 = function (object, key, value) {
      var propertyKey = toPropertyKey(key);
      if (propertyKey in object) definePropertyModule$3.f(object, propertyKey, createPropertyDescriptor$1(0, value));
      else object[propertyKey] = value;
    };

    var wellKnownSymbol$i = wellKnownSymbol$k;

    var TO_STRING_TAG$3 = wellKnownSymbol$i('toStringTag');
    var test = {};

    test[TO_STRING_TAG$3] = 'z';

    var toStringTagSupport = String(test) === '[object z]';

    var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
    var isCallable$9 = isCallable$j;
    var classofRaw = classofRaw$1;
    var wellKnownSymbol$h = wellKnownSymbol$k;

    var TO_STRING_TAG$2 = wellKnownSymbol$h('toStringTag');
    // ES3 wrong here
    var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

    // fallback for IE11 Script Access Denied error
    var tryGet = function (it, key) {
      try {
        return it[key];
      } catch (error) { /* empty */ }
    };

    // getting tag from ES6+ `Object.prototype.toString`
    var classof$7 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
      var O, tag, result;
      return it === undefined ? 'Undefined' : it === null ? 'Null'
        // @@toStringTag case
        : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
        // builtinTag case
        : CORRECT_ARGUMENTS ? classofRaw(O)
        // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && isCallable$9(O.callee) ? 'Arguments' : result;
    };

    var fails$b = fails$h;
    var isCallable$8 = isCallable$j;
    var classof$6 = classof$7;
    var getBuiltIn$4 = getBuiltIn$8;
    var inspectSource$1 = inspectSource$4;

    var empty = [];
    var construct = getBuiltIn$4('Reflect', 'construct');
    var constructorRegExp = /^\s*(?:class|function)\b/;
    var exec$1 = constructorRegExp.exec;
    var INCORRECT_TO_STRING = !constructorRegExp.exec(function () { /* empty */ });

    var isConstructorModern = function (argument) {
      if (!isCallable$8(argument)) return false;
      try {
        construct(Object, empty, argument);
        return true;
      } catch (error) {
        return false;
      }
    };

    var isConstructorLegacy = function (argument) {
      if (!isCallable$8(argument)) return false;
      switch (classof$6(argument)) {
        case 'AsyncFunction':
        case 'GeneratorFunction':
        case 'AsyncGeneratorFunction': return false;
        // we can't check .prototype since constructors produced by .bind haven't it
      } return INCORRECT_TO_STRING || !!exec$1.call(constructorRegExp, inspectSource$1(argument));
    };

    // `IsConstructor` abstract operation
    // https://tc39.es/ecma262/#sec-isconstructor
    var isConstructor$2 = !construct || fails$b(function () {
      var called;
      return isConstructorModern(isConstructorModern.call)
        || !isConstructorModern(Object)
        || !isConstructorModern(function () { called = true; })
        || called;
    }) ? isConstructorLegacy : isConstructorModern;

    var isArray$1 = isArray$2;
    var isConstructor$1 = isConstructor$2;
    var isObject$4 = isObject$a;
    var wellKnownSymbol$g = wellKnownSymbol$k;

    var SPECIES$5 = wellKnownSymbol$g('species');

    // a part of `ArraySpeciesCreate` abstract operation
    // https://tc39.es/ecma262/#sec-arrayspeciescreate
    var arraySpeciesConstructor$1 = function (originalArray) {
      var C;
      if (isArray$1(originalArray)) {
        C = originalArray.constructor;
        // cross-realm fallback
        if (isConstructor$1(C) && (C === Array || isArray$1(C.prototype))) C = undefined;
        else if (isObject$4(C)) {
          C = C[SPECIES$5];
          if (C === null) C = undefined;
        }
      } return C === undefined ? Array : C;
    };

    var arraySpeciesConstructor = arraySpeciesConstructor$1;

    // `ArraySpeciesCreate` abstract operation
    // https://tc39.es/ecma262/#sec-arrayspeciescreate
    var arraySpeciesCreate$1 = function (originalArray, length) {
      return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
    };

    var fails$a = fails$h;
    var wellKnownSymbol$f = wellKnownSymbol$k;
    var V8_VERSION$2 = engineV8Version;

    var SPECIES$4 = wellKnownSymbol$f('species');

    var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
      // We can't use this feature detection in V8 since it causes
      // deoptimization and serious performance degradation
      // https://github.com/zloirock/core-js/issues/677
      return V8_VERSION$2 >= 51 || !fails$a(function () {
        var array = [];
        var constructor = array.constructor = {};
        constructor[SPECIES$4] = function () {
          return { foo: 1 };
        };
        return array[METHOD_NAME](Boolean).foo !== 1;
      });
    };

    var $$7 = _export;
    var fails$9 = fails$h;
    var isArray = isArray$2;
    var isObject$3 = isObject$a;
    var toObject$1 = toObject$3;
    var lengthOfArrayLike$1 = lengthOfArrayLike$3;
    var createProperty = createProperty$1;
    var arraySpeciesCreate = arraySpeciesCreate$1;
    var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;
    var wellKnownSymbol$e = wellKnownSymbol$k;
    var V8_VERSION$1 = engineV8Version;

    var IS_CONCAT_SPREADABLE = wellKnownSymbol$e('isConcatSpreadable');
    var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
    var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/679
    var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION$1 >= 51 || !fails$9(function () {
      var array = [];
      array[IS_CONCAT_SPREADABLE] = false;
      return array.concat()[0] !== array;
    });

    var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

    var isConcatSpreadable = function (O) {
      if (!isObject$3(O)) return false;
      var spreadable = O[IS_CONCAT_SPREADABLE];
      return spreadable !== undefined ? !!spreadable : isArray(O);
    };

    var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

    // `Array.prototype.concat` method
    // https://tc39.es/ecma262/#sec-array.prototype.concat
    // with adding support of @@isConcatSpreadable and @@species
    $$7({ target: 'Array', proto: true, forced: FORCED$1 }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      concat: function concat(arg) {
        var O = toObject$1(this);
        var A = arraySpeciesCreate(O, 0);
        var n = 0;
        var i, k, length, len, E;
        for (i = -1, length = arguments.length; i < length; i++) {
          E = i === -1 ? O : arguments[i];
          if (isConcatSpreadable(E)) {
            len = lengthOfArrayLike$1(E);
            if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
            for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
          } else {
            if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
            createProperty(A, n++, E);
          }
        }
        A.length = n;
        return A;
      }
    });

    var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
    var classof$5 = classof$7;

    // `Object.prototype.toString` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.tostring
    var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
      return '[object ' + classof$5(this) + ']';
    };

    var TO_STRING_TAG_SUPPORT = toStringTagSupport;
    var redefine$6 = redefine$8.exports;
    var toString$6 = objectToString;

    // `Object.prototype.toString` method
    // https://tc39.es/ecma262/#sec-object.prototype.tostring
    if (!TO_STRING_TAG_SUPPORT) {
      redefine$6(Object.prototype, 'toString', toString$6, { unsafe: true });
    }

    var global$b = global$m;

    var nativePromiseConstructor = global$b.Promise;

    var redefine$5 = redefine$8.exports;

    var redefineAll$1 = function (target, src, options) {
      for (var key in src) redefine$5(target, key, src[key], options);
      return target;
    };

    var isCallable$7 = isCallable$j;

    var aPossiblePrototype$1 = function (argument) {
      if (typeof argument === 'object' || isCallable$7(argument)) return argument;
      throw TypeError("Can't set " + String(argument) + ' as a prototype');
    };

    /* eslint-disable no-proto -- safe */

    var anObject$a = anObject$d;
    var aPossiblePrototype = aPossiblePrototype$1;

    // `Object.setPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.setprototypeof
    // Works with __proto__ only. Old v8 can't work with null proto objects.
    // eslint-disable-next-line es/no-object-setprototypeof -- safe
    var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
      var CORRECT_SETTER = false;
      var test = {};
      var setter;
      try {
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
        setter.call(test, []);
        CORRECT_SETTER = test instanceof Array;
      } catch (error) { /* empty */ }
      return function setPrototypeOf(O, proto) {
        anObject$a(O);
        aPossiblePrototype(proto);
        if (CORRECT_SETTER) setter.call(O, proto);
        else O.__proto__ = proto;
        return O;
      };
    }() : undefined);

    var defineProperty = objectDefineProperty.f;
    var hasOwn$1 = hasOwnProperty_1;
    var wellKnownSymbol$d = wellKnownSymbol$k;

    var TO_STRING_TAG$1 = wellKnownSymbol$d('toStringTag');

    var setToStringTag$3 = function (it, TAG, STATIC) {
      if (it && !hasOwn$1(it = STATIC ? it : it.prototype, TO_STRING_TAG$1)) {
        defineProperty(it, TO_STRING_TAG$1, { configurable: true, value: TAG });
      }
    };

    var getBuiltIn$3 = getBuiltIn$8;
    var definePropertyModule$2 = objectDefineProperty;
    var wellKnownSymbol$c = wellKnownSymbol$k;
    var DESCRIPTORS$1 = descriptors;

    var SPECIES$3 = wellKnownSymbol$c('species');

    var setSpecies$1 = function (CONSTRUCTOR_NAME) {
      var Constructor = getBuiltIn$3(CONSTRUCTOR_NAME);
      var defineProperty = definePropertyModule$2.f;

      if (DESCRIPTORS$1 && Constructor && !Constructor[SPECIES$3]) {
        defineProperty(Constructor, SPECIES$3, {
          configurable: true,
          get: function () { return this; }
        });
      }
    };

    var anInstance$1 = function (it, Constructor, name) {
      if (it instanceof Constructor) return it;
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    };

    var iterators = {};

    var wellKnownSymbol$b = wellKnownSymbol$k;
    var Iterators$4 = iterators;

    var ITERATOR$5 = wellKnownSymbol$b('iterator');
    var ArrayPrototype$1 = Array.prototype;

    // check on default Array iterator
    var isArrayIteratorMethod$1 = function (it) {
      return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$5] === it);
    };

    var aCallable$3 = aCallable$5;

    // optional / simple context binding
    var functionBindContext = function (fn, that, length) {
      aCallable$3(fn);
      if (that === undefined) return fn;
      switch (length) {
        case 0: return function () {
          return fn.call(that);
        };
        case 1: return function (a) {
          return fn.call(that, a);
        };
        case 2: return function (a, b) {
          return fn.call(that, a, b);
        };
        case 3: return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
      }
      return function (/* ...args */) {
        return fn.apply(that, arguments);
      };
    };

    var classof$4 = classof$7;
    var getMethod$2 = getMethod$4;
    var Iterators$3 = iterators;
    var wellKnownSymbol$a = wellKnownSymbol$k;

    var ITERATOR$4 = wellKnownSymbol$a('iterator');

    var getIteratorMethod$2 = function (it) {
      if (it != undefined) return getMethod$2(it, ITERATOR$4)
        || getMethod$2(it, '@@iterator')
        || Iterators$3[classof$4(it)];
    };

    var aCallable$2 = aCallable$5;
    var anObject$9 = anObject$d;
    var getIteratorMethod$1 = getIteratorMethod$2;

    var getIterator$1 = function (argument, usingIterator) {
      var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
      if (aCallable$2(iteratorMethod)) return anObject$9(iteratorMethod.call(argument));
      throw TypeError(String(argument) + ' is not iterable');
    };

    var anObject$8 = anObject$d;
    var getMethod$1 = getMethod$4;

    var iteratorClose$1 = function (iterator, kind, value) {
      var innerResult, innerError;
      anObject$8(iterator);
      try {
        innerResult = getMethod$1(iterator, 'return');
        if (!innerResult) {
          if (kind === 'throw') throw value;
          return value;
        }
        innerResult = innerResult.call(iterator);
      } catch (error) {
        innerError = true;
        innerResult = error;
      }
      if (kind === 'throw') throw value;
      if (innerError) throw innerResult;
      anObject$8(innerResult);
      return value;
    };

    var anObject$7 = anObject$d;
    var isArrayIteratorMethod = isArrayIteratorMethod$1;
    var lengthOfArrayLike = lengthOfArrayLike$3;
    var bind$2 = functionBindContext;
    var getIterator = getIterator$1;
    var getIteratorMethod = getIteratorMethod$2;
    var iteratorClose = iteratorClose$1;

    var Result = function (stopped, result) {
      this.stopped = stopped;
      this.result = result;
    };

    var iterate$1 = function (iterable, unboundFunction, options) {
      var that = options && options.that;
      var AS_ENTRIES = !!(options && options.AS_ENTRIES);
      var IS_ITERATOR = !!(options && options.IS_ITERATOR);
      var INTERRUPTED = !!(options && options.INTERRUPTED);
      var fn = bind$2(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
      var iterator, iterFn, index, length, result, next, step;

      var stop = function (condition) {
        if (iterator) iteratorClose(iterator, 'normal', condition);
        return new Result(true, condition);
      };

      var callFn = function (value) {
        if (AS_ENTRIES) {
          anObject$7(value);
          return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
        } return INTERRUPTED ? fn(value, stop) : fn(value);
      };

      if (IS_ITERATOR) {
        iterator = iterable;
      } else {
        iterFn = getIteratorMethod(iterable);
        if (!iterFn) throw TypeError(String(iterable) + ' is not iterable');
        // optimisation for array iterators
        if (isArrayIteratorMethod(iterFn)) {
          for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
            result = callFn(iterable[index]);
            if (result && result instanceof Result) return result;
          } return new Result(false);
        }
        iterator = getIterator(iterable, iterFn);
      }

      next = iterator.next;
      while (!(step = next.call(iterator)).done) {
        try {
          result = callFn(step.value);
        } catch (error) {
          iteratorClose(iterator, 'throw', error);
        }
        if (typeof result == 'object' && result && result instanceof Result) return result;
      } return new Result(false);
    };

    var wellKnownSymbol$9 = wellKnownSymbol$k;

    var ITERATOR$3 = wellKnownSymbol$9('iterator');
    var SAFE_CLOSING = false;

    try {
      var called = 0;
      var iteratorWithReturn = {
        next: function () {
          return { done: !!called++ };
        },
        'return': function () {
          SAFE_CLOSING = true;
        }
      };
      iteratorWithReturn[ITERATOR$3] = function () {
        return this;
      };
      // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
      Array.from(iteratorWithReturn, function () { throw 2; });
    } catch (error) { /* empty */ }

    var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
      if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
      var ITERATION_SUPPORT = false;
      try {
        var object = {};
        object[ITERATOR$3] = function () {
          return {
            next: function () {
              return { done: ITERATION_SUPPORT = true };
            }
          };
        };
        exec(object);
      } catch (error) { /* empty */ }
      return ITERATION_SUPPORT;
    };

    var isConstructor = isConstructor$2;
    var tryToString = tryToString$2;

    // `Assert: IsConstructor(argument) is true`
    var aConstructor$1 = function (argument) {
      if (isConstructor(argument)) return argument;
      throw TypeError(tryToString(argument) + ' is not a constructor');
    };

    var anObject$6 = anObject$d;
    var aConstructor = aConstructor$1;
    var wellKnownSymbol$8 = wellKnownSymbol$k;

    var SPECIES$2 = wellKnownSymbol$8('species');

    // `SpeciesConstructor` abstract operation
    // https://tc39.es/ecma262/#sec-speciesconstructor
    var speciesConstructor$3 = function (O, defaultConstructor) {
      var C = anObject$6(O).constructor;
      var S;
      return C === undefined || (S = anObject$6(C)[SPECIES$2]) == undefined ? defaultConstructor : aConstructor(S);
    };

    var getBuiltIn$2 = getBuiltIn$8;

    var html$2 = getBuiltIn$2('document', 'documentElement');

    var userAgent$2 = engineUserAgent;

    var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

    var classof$3 = classofRaw$1;
    var global$a = global$m;

    var engineIsNode = classof$3(global$a.process) == 'process';

    var global$9 = global$m;
    var isCallable$6 = isCallable$j;
    var fails$8 = fails$h;
    var bind$1 = functionBindContext;
    var html$1 = html$2;
    var createElement = documentCreateElement$2;
    var IS_IOS$1 = engineIsIos;
    var IS_NODE$2 = engineIsNode;

    var set = global$9.setImmediate;
    var clear = global$9.clearImmediate;
    var process$2 = global$9.process;
    var MessageChannel = global$9.MessageChannel;
    var Dispatch = global$9.Dispatch;
    var counter = 0;
    var queue = {};
    var ONREADYSTATECHANGE = 'onreadystatechange';
    var location, defer, channel, port;

    try {
      // Deno throws a ReferenceError on `location` access without `--location` flag
      location = global$9.location;
    } catch (error) { /* empty */ }

    var run = function (id) {
      // eslint-disable-next-line no-prototype-builtins -- safe
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };

    var runner = function (id) {
      return function () {
        run(id);
      };
    };

    var listener = function (event) {
      run(event.data);
    };

    var post = function (id) {
      // old engines have not location.origin
      global$9.postMessage(String(id), location.protocol + '//' + location.host);
    };

    // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
    if (!set || !clear) {
      set = function setImmediate(fn) {
        var args = [];
        var argumentsLength = arguments.length;
        var i = 1;
        while (argumentsLength > i) args.push(arguments[i++]);
        queue[++counter] = function () {
          // eslint-disable-next-line no-new-func -- spec requirement
          (isCallable$6(fn) ? fn : Function(fn)).apply(undefined, args);
        };
        defer(counter);
        return counter;
      };
      clear = function clearImmediate(id) {
        delete queue[id];
      };
      // Node.js 0.8-
      if (IS_NODE$2) {
        defer = function (id) {
          process$2.nextTick(runner(id));
        };
      // Sphere (JS game engine) Dispatch API
      } else if (Dispatch && Dispatch.now) {
        defer = function (id) {
          Dispatch.now(runner(id));
        };
      // Browsers with MessageChannel, includes WebWorkers
      // except iOS - https://github.com/zloirock/core-js/issues/624
      } else if (MessageChannel && !IS_IOS$1) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = listener;
        defer = bind$1(port.postMessage, port, 1);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
      } else if (
        global$9.addEventListener &&
        isCallable$6(global$9.postMessage) &&
        !global$9.importScripts &&
        location && location.protocol !== 'file:' &&
        !fails$8(post)
      ) {
        defer = post;
        global$9.addEventListener('message', listener, false);
      // IE8-
      } else if (ONREADYSTATECHANGE in createElement('script')) {
        defer = function (id) {
          html$1.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
            html$1.removeChild(this);
            run(id);
          };
        };
      // Rest old browsers
      } else {
        defer = function (id) {
          setTimeout(runner(id), 0);
        };
      }
    }

    var task$1 = {
      set: set,
      clear: clear
    };

    var userAgent$1 = engineUserAgent;
    var global$8 = global$m;

    var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && global$8.Pebble !== undefined;

    var userAgent = engineUserAgent;

    var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

    var global$7 = global$m;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    var macrotask = task$1.set;
    var IS_IOS = engineIsIos;
    var IS_IOS_PEBBLE = engineIsIosPebble;
    var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
    var IS_NODE$1 = engineIsNode;

    var MutationObserver = global$7.MutationObserver || global$7.WebKitMutationObserver;
    var document$2 = global$7.document;
    var process$1 = global$7.process;
    var Promise$1 = global$7.Promise;
    // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
    var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$7, 'queueMicrotask');
    var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

    var flush, head, last, notify$1, toggle, node, promise, then;

    // modern engines have queueMicrotask method
    if (!queueMicrotask) {
      flush = function () {
        var parent, fn;
        if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();
        while (head) {
          fn = head.fn;
          head = head.next;
          try {
            fn();
          } catch (error) {
            if (head) notify$1();
            else last = undefined;
            throw error;
          }
        } last = undefined;
        if (parent) parent.enter();
      };

      // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
      // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
      if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
        toggle = true;
        node = document$2.createTextNode('');
        new MutationObserver(flush).observe(node, { characterData: true });
        notify$1 = function () {
          node.data = toggle = !toggle;
        };
      // environments with maybe non-completely correct, but existent Promise
      } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
        // Promise.resolve without an argument throws an error in LG WebOS 2
        promise = Promise$1.resolve(undefined);
        // workaround of WebKit ~ iOS Safari 10.1 bug
        promise.constructor = Promise$1;
        then = promise.then;
        notify$1 = function () {
          then.call(promise, flush);
        };
      // Node.js without promises
      } else if (IS_NODE$1) {
        notify$1 = function () {
          process$1.nextTick(flush);
        };
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout
      } else {
        notify$1 = function () {
          // strange IE + webpack dev server bug - use .call(global)
          macrotask.call(global$7, flush);
        };
      }
    }

    var microtask$1 = queueMicrotask || function (fn) {
      var task = { fn: fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify$1();
      } last = task;
    };

    var newPromiseCapability$2 = {};

    var aCallable$1 = aCallable$5;

    var PromiseCapability = function (C) {
      var resolve, reject;
      this.promise = new C(function ($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aCallable$1(resolve);
      this.reject = aCallable$1(reject);
    };

    // `NewPromiseCapability` abstract operation
    // https://tc39.es/ecma262/#sec-newpromisecapability
    newPromiseCapability$2.f = function (C) {
      return new PromiseCapability(C);
    };

    var anObject$5 = anObject$d;
    var isObject$2 = isObject$a;
    var newPromiseCapability$1 = newPromiseCapability$2;

    var promiseResolve$2 = function (C, x) {
      anObject$5(C);
      if (isObject$2(x) && x.constructor === C) return x;
      var promiseCapability = newPromiseCapability$1.f(C);
      var resolve = promiseCapability.resolve;
      resolve(x);
      return promiseCapability.promise;
    };

    var global$6 = global$m;

    var hostReportErrors$1 = function (a, b) {
      var console = global$6.console;
      if (console && console.error) {
        arguments.length === 1 ? console.error(a) : console.error(a, b);
      }
    };

    var perform$1 = function (exec) {
      try {
        return { error: false, value: exec() };
      } catch (error) {
        return { error: true, value: error };
      }
    };

    var engineIsBrowser = typeof window == 'object';

    var $$6 = _export;
    var global$5 = global$m;
    var getBuiltIn$1 = getBuiltIn$8;
    var NativePromise$1 = nativePromiseConstructor;
    var redefine$4 = redefine$8.exports;
    var redefineAll = redefineAll$1;
    var setPrototypeOf$1 = objectSetPrototypeOf;
    var setToStringTag$2 = setToStringTag$3;
    var setSpecies = setSpecies$1;
    var aCallable = aCallable$5;
    var isCallable$5 = isCallable$j;
    var isObject$1 = isObject$a;
    var anInstance = anInstance$1;
    var inspectSource = inspectSource$4;
    var iterate = iterate$1;
    var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
    var speciesConstructor$2 = speciesConstructor$3;
    var task = task$1.set;
    var microtask = microtask$1;
    var promiseResolve$1 = promiseResolve$2;
    var hostReportErrors = hostReportErrors$1;
    var newPromiseCapabilityModule = newPromiseCapability$2;
    var perform = perform$1;
    var InternalStateModule$2 = internalState;
    var isForced = isForced_1;
    var wellKnownSymbol$7 = wellKnownSymbol$k;
    var IS_BROWSER = engineIsBrowser;
    var IS_NODE = engineIsNode;
    var V8_VERSION = engineV8Version;

    var SPECIES$1 = wellKnownSymbol$7('species');
    var PROMISE = 'Promise';
    var getInternalState$3 = InternalStateModule$2.get;
    var setInternalState$2 = InternalStateModule$2.set;
    var getInternalPromiseState = InternalStateModule$2.getterFor(PROMISE);
    var NativePromisePrototype = NativePromise$1 && NativePromise$1.prototype;
    var PromiseConstructor = NativePromise$1;
    var PromiseConstructorPrototype = NativePromisePrototype;
    var TypeError$1 = global$5.TypeError;
    var document$1 = global$5.document;
    var process = global$5.process;
    var newPromiseCapability = newPromiseCapabilityModule.f;
    var newGenericPromiseCapability = newPromiseCapability;
    var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$5.dispatchEvent);
    var NATIVE_REJECTION_EVENT = isCallable$5(global$5.PromiseRejectionEvent);
    var UNHANDLED_REJECTION = 'unhandledrejection';
    var REJECTION_HANDLED = 'rejectionhandled';
    var PENDING = 0;
    var FULFILLED = 1;
    var REJECTED = 2;
    var HANDLED = 1;
    var UNHANDLED = 2;
    var SUBCLASSING = false;
    var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

    var FORCED = isForced(PROMISE, function () {
      var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
      var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
      // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // We can't detect it synchronously, so just check versions
      if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
      // We can't use @@species feature detection in V8 since it causes
      // deoptimization and performance degradation
      // https://github.com/zloirock/core-js/issues/679
      if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
      // Detect correctness of subclassing with @@species support
      var promise = new PromiseConstructor(function (resolve) { resolve(1); });
      var FakePromise = function (exec) {
        exec(function () { /* empty */ }, function () { /* empty */ });
      };
      var constructor = promise.constructor = {};
      constructor[SPECIES$1] = FakePromise;
      SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
      if (!SUBCLASSING) return true;
      // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
    });

    var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
      PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
    });

    // helpers
    var isThenable = function (it) {
      var then;
      return isObject$1(it) && isCallable$5(then = it.then) ? then : false;
    };

    var notify = function (state, isReject) {
      if (state.notified) return;
      state.notified = true;
      var chain = state.reactions;
      microtask(function () {
        var value = state.value;
        var ok = state.state == FULFILLED;
        var index = 0;
        // variable length - can't use forEach
        while (chain.length > index) {
          var reaction = chain[index++];
          var handler = ok ? reaction.ok : reaction.fail;
          var resolve = reaction.resolve;
          var reject = reaction.reject;
          var domain = reaction.domain;
          var result, then, exited;
          try {
            if (handler) {
              if (!ok) {
                if (state.rejection === UNHANDLED) onHandleUnhandled(state);
                state.rejection = HANDLED;
              }
              if (handler === true) result = value;
              else {
                if (domain) domain.enter();
                result = handler(value); // can throw
                if (domain) {
                  domain.exit();
                  exited = true;
                }
              }
              if (result === reaction.promise) {
                reject(TypeError$1('Promise-chain cycle'));
              } else if (then = isThenable(result)) {
                then.call(result, resolve, reject);
              } else resolve(result);
            } else reject(value);
          } catch (error) {
            if (domain && !exited) domain.exit();
            reject(error);
          }
        }
        state.reactions = [];
        state.notified = false;
        if (isReject && !state.rejection) onUnhandled(state);
      });
    };

    var dispatchEvent = function (name, promise, reason) {
      var event, handler;
      if (DISPATCH_EVENT) {
        event = document$1.createEvent('Event');
        event.promise = promise;
        event.reason = reason;
        event.initEvent(name, false, true);
        global$5.dispatchEvent(event);
      } else event = { promise: promise, reason: reason };
      if (!NATIVE_REJECTION_EVENT && (handler = global$5['on' + name])) handler(event);
      else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
    };

    var onUnhandled = function (state) {
      task.call(global$5, function () {
        var promise = state.facade;
        var value = state.value;
        var IS_UNHANDLED = isUnhandled(state);
        var result;
        if (IS_UNHANDLED) {
          result = perform(function () {
            if (IS_NODE) {
              process.emit('unhandledRejection', value, promise);
            } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
          });
          // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
          state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
          if (result.error) throw result.value;
        }
      });
    };

    var isUnhandled = function (state) {
      return state.rejection !== HANDLED && !state.parent;
    };

    var onHandleUnhandled = function (state) {
      task.call(global$5, function () {
        var promise = state.facade;
        if (IS_NODE) {
          process.emit('rejectionHandled', promise);
        } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
      });
    };

    var bind = function (fn, state, unwrap) {
      return function (value) {
        fn(state, value, unwrap);
      };
    };

    var internalReject = function (state, value, unwrap) {
      if (state.done) return;
      state.done = true;
      if (unwrap) state = unwrap;
      state.value = value;
      state.state = REJECTED;
      notify(state, true);
    };

    var internalResolve = function (state, value, unwrap) {
      if (state.done) return;
      state.done = true;
      if (unwrap) state = unwrap;
      try {
        if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
        var then = isThenable(value);
        if (then) {
          microtask(function () {
            var wrapper = { done: false };
            try {
              then.call(value,
                bind(internalResolve, wrapper, state),
                bind(internalReject, wrapper, state)
              );
            } catch (error) {
              internalReject(wrapper, error, state);
            }
          });
        } else {
          state.value = value;
          state.state = FULFILLED;
          notify(state, false);
        }
      } catch (error) {
        internalReject({ done: false }, error, state);
      }
    };

    // constructor polyfill
    if (FORCED) {
      // 25.4.3.1 Promise(executor)
      PromiseConstructor = function Promise(executor) {
        anInstance(this, PromiseConstructor, PROMISE);
        aCallable(executor);
        Internal.call(this);
        var state = getInternalState$3(this);
        try {
          executor(bind(internalResolve, state), bind(internalReject, state));
        } catch (error) {
          internalReject(state, error);
        }
      };
      PromiseConstructorPrototype = PromiseConstructor.prototype;
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      Internal = function Promise(executor) {
        setInternalState$2(this, {
          type: PROMISE,
          done: false,
          notified: false,
          parent: false,
          reactions: [],
          rejection: false,
          state: PENDING,
          value: undefined
        });
      };
      Internal.prototype = redefineAll(PromiseConstructorPrototype, {
        // `Promise.prototype.then` method
        // https://tc39.es/ecma262/#sec-promise.prototype.then
        then: function then(onFulfilled, onRejected) {
          var state = getInternalPromiseState(this);
          var reaction = newPromiseCapability(speciesConstructor$2(this, PromiseConstructor));
          reaction.ok = isCallable$5(onFulfilled) ? onFulfilled : true;
          reaction.fail = isCallable$5(onRejected) && onRejected;
          reaction.domain = IS_NODE ? process.domain : undefined;
          state.parent = true;
          state.reactions.push(reaction);
          if (state.state != PENDING) notify(state, false);
          return reaction.promise;
        },
        // `Promise.prototype.catch` method
        // https://tc39.es/ecma262/#sec-promise.prototype.catch
        'catch': function (onRejected) {
          return this.then(undefined, onRejected);
        }
      });
      OwnPromiseCapability = function () {
        var promise = new Internal();
        var state = getInternalState$3(promise);
        this.promise = promise;
        this.resolve = bind(internalResolve, state);
        this.reject = bind(internalReject, state);
      };
      newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
        return C === PromiseConstructor || C === PromiseWrapper
          ? new OwnPromiseCapability(C)
          : newGenericPromiseCapability(C);
      };

      if (isCallable$5(NativePromise$1) && NativePromisePrototype !== Object.prototype) {
        nativeThen = NativePromisePrototype.then;

        if (!SUBCLASSING) {
          // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
          redefine$4(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
            var that = this;
            return new PromiseConstructor(function (resolve, reject) {
              nativeThen.call(that, resolve, reject);
            }).then(onFulfilled, onRejected);
          // https://github.com/zloirock/core-js/issues/640
          }, { unsafe: true });

          // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
          redefine$4(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
        }

        // make `.constructor === Promise` work for native promise-based APIs
        try {
          delete NativePromisePrototype.constructor;
        } catch (error) { /* empty */ }

        // make `instanceof Promise` work for native promise-based APIs
        if (setPrototypeOf$1) {
          setPrototypeOf$1(NativePromisePrototype, PromiseConstructorPrototype);
        }
      }
    }

    $$6({ global: true, wrap: true, forced: FORCED }, {
      Promise: PromiseConstructor
    });

    setToStringTag$2(PromiseConstructor, PROMISE, false);
    setSpecies(PROMISE);

    PromiseWrapper = getBuiltIn$1(PROMISE);

    // statics
    $$6({ target: PROMISE, stat: true, forced: FORCED }, {
      // `Promise.reject` method
      // https://tc39.es/ecma262/#sec-promise.reject
      reject: function reject(r) {
        var capability = newPromiseCapability(this);
        capability.reject.call(undefined, r);
        return capability.promise;
      }
    });

    $$6({ target: PROMISE, stat: true, forced: FORCED }, {
      // `Promise.resolve` method
      // https://tc39.es/ecma262/#sec-promise.resolve
      resolve: function resolve(x) {
        return promiseResolve$1(this, x);
      }
    });

    $$6({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
      // `Promise.all` method
      // https://tc39.es/ecma262/#sec-promise.all
      all: function all(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aCallable(C.resolve);
          var values = [];
          var counter = 0;
          var remaining = 1;
          iterate(iterable, function (promise) {
            var index = counter++;
            var alreadyCalled = false;
            values.push(undefined);
            remaining++;
            $promiseResolve.call(C, promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[index] = value;
              --remaining || resolve(values);
            }, reject);
          });
          --remaining || resolve(values);
        });
        if (result.error) reject(result.value);
        return capability.promise;
      },
      // `Promise.race` method
      // https://tc39.es/ecma262/#sec-promise.race
      race: function race(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aCallable(C.resolve);
          iterate(iterable, function (promise) {
            $promiseResolve.call(C, promise).then(capability.resolve, reject);
          });
        });
        if (result.error) reject(result.value);
        return capability.promise;
      }
    });

    var internalObjectKeys = objectKeysInternal;
    var enumBugKeys$1 = enumBugKeys$3;

    // `Object.keys` method
    // https://tc39.es/ecma262/#sec-object.keys
    // eslint-disable-next-line es/no-object-keys -- safe
    var objectKeys$1 = Object.keys || function keys(O) {
      return internalObjectKeys(O, enumBugKeys$1);
    };

    var DESCRIPTORS = descriptors;
    var definePropertyModule$1 = objectDefineProperty;
    var anObject$4 = anObject$d;
    var objectKeys = objectKeys$1;

    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    // eslint-disable-next-line es/no-object-defineproperties -- safe
    var objectDefineProperties = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject$4(O);
      var keys = objectKeys(Properties);
      var length = keys.length;
      var index = 0;
      var key;
      while (length > index) definePropertyModule$1.f(O, key = keys[index++], Properties[key]);
      return O;
    };

    /* global ActiveXObject -- old IE, WSH */

    var anObject$3 = anObject$d;
    var defineProperties = objectDefineProperties;
    var enumBugKeys = enumBugKeys$3;
    var hiddenKeys = hiddenKeys$4;
    var html = html$2;
    var documentCreateElement$1 = documentCreateElement$2;
    var sharedKey$1 = sharedKey$3;

    var GT = '>';
    var LT = '<';
    var PROTOTYPE = 'prototype';
    var SCRIPT = 'script';
    var IE_PROTO$1 = sharedKey$1('IE_PROTO');

    var EmptyConstructor = function () { /* empty */ };

    var scriptTag = function (content) {
      return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
    };

    // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
    var NullProtoObjectViaActiveX = function (activeXDocument) {
      activeXDocument.write(scriptTag(''));
      activeXDocument.close();
      var temp = activeXDocument.parentWindow.Object;
      activeXDocument = null; // avoid memory leak
      return temp;
    };

    // Create object with fake `null` prototype: use iframe Object with cleared prototype
    var NullProtoObjectViaIFrame = function () {
      // Thrash, waste and sodomy: IE GC bug
      var iframe = documentCreateElement$1('iframe');
      var JS = 'java' + SCRIPT + ':';
      var iframeDocument;
      iframe.style.display = 'none';
      html.appendChild(iframe);
      // https://github.com/zloirock/core-js/issues/475
      iframe.src = String(JS);
      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(scriptTag('document.F=Object'));
      iframeDocument.close();
      return iframeDocument.F;
    };

    // Check for document.domain and active x support
    // No need to use active x approach when document.domain is not set
    // see https://github.com/es-shims/es5-shim/issues/150
    // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
    // avoid IE GC bug
    var activeXDocument;
    var NullProtoObject = function () {
      try {
        activeXDocument = new ActiveXObject('htmlfile');
      } catch (error) { /* ignore */ }
      NullProtoObject = typeof document != 'undefined'
        ? document.domain && activeXDocument
          ? NullProtoObjectViaActiveX(activeXDocument) // old IE
          : NullProtoObjectViaIFrame()
        : NullProtoObjectViaActiveX(activeXDocument); // WSH
      var length = enumBugKeys.length;
      while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
      return NullProtoObject();
    };

    hiddenKeys[IE_PROTO$1] = true;

    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    var objectCreate = Object.create || function create(O, Properties) {
      var result;
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject$3(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO$1] = O;
      } else result = NullProtoObject();
      return Properties === undefined ? result : defineProperties(result, Properties);
    };

    var wellKnownSymbol$6 = wellKnownSymbol$k;
    var create$2 = objectCreate;
    var definePropertyModule = objectDefineProperty;

    var UNSCOPABLES = wellKnownSymbol$6('unscopables');
    var ArrayPrototype = Array.prototype;

    // Array.prototype[@@unscopables]
    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    if (ArrayPrototype[UNSCOPABLES] == undefined) {
      definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
        configurable: true,
        value: create$2(null)
      });
    }

    // add a key to Array.prototype[@@unscopables]
    var addToUnscopables$2 = function (key) {
      ArrayPrototype[UNSCOPABLES][key] = true;
    };

    var fails$7 = fails$h;

    var correctPrototypeGetter = !fails$7(function () {
      function F() { /* empty */ }
      F.prototype.constructor = null;
      // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
      return Object.getPrototypeOf(new F()) !== F.prototype;
    });

    var hasOwn = hasOwnProperty_1;
    var isCallable$4 = isCallable$j;
    var toObject = toObject$3;
    var sharedKey = sharedKey$3;
    var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

    var IE_PROTO = sharedKey('IE_PROTO');
    var ObjectPrototype = Object.prototype;

    // `Object.getPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.getprototypeof
    // eslint-disable-next-line es/no-object-getprototypeof -- safe
    var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
      var object = toObject(O);
      if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
      var constructor = object.constructor;
      if (isCallable$4(constructor) && object instanceof constructor) {
        return constructor.prototype;
      } return object instanceof Object ? ObjectPrototype : null;
    };

    var fails$6 = fails$h;
    var isCallable$3 = isCallable$j;
    var getPrototypeOf$1 = objectGetPrototypeOf;
    var redefine$3 = redefine$8.exports;
    var wellKnownSymbol$5 = wellKnownSymbol$k;

    var ITERATOR$2 = wellKnownSymbol$5('iterator');
    var BUGGY_SAFARI_ITERATORS$1 = false;

    // `%IteratorPrototype%` object
    // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
    var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

    /* eslint-disable es/no-array-prototype-keys -- safe */
    if ([].keys) {
      arrayIterator = [].keys();
      // Safari 8 has buggy iterators w/o `next`
      if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
      else {
        PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
        if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
      }
    }

    var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$6(function () {
      var test = {};
      // FF44- legacy iterators case
      return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
    });

    if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

    // `%IteratorPrototype%[@@iterator]()` method
    // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
    if (!isCallable$3(IteratorPrototype$2[ITERATOR$2])) {
      redefine$3(IteratorPrototype$2, ITERATOR$2, function () {
        return this;
      });
    }

    var iteratorsCore = {
      IteratorPrototype: IteratorPrototype$2,
      BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
    };

    var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
    var create$1 = objectCreate;
    var createPropertyDescriptor = createPropertyDescriptor$4;
    var setToStringTag$1 = setToStringTag$3;
    var Iterators$2 = iterators;

    var returnThis$1 = function () { return this; };

    var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
      var TO_STRING_TAG = NAME + ' Iterator';
      IteratorConstructor.prototype = create$1(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
      setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false);
      Iterators$2[TO_STRING_TAG] = returnThis$1;
      return IteratorConstructor;
    };

    var $$5 = _export;
    var FunctionName = functionName;
    var isCallable$2 = isCallable$j;
    var createIteratorConstructor = createIteratorConstructor$1;
    var getPrototypeOf = objectGetPrototypeOf;
    var setPrototypeOf = objectSetPrototypeOf;
    var setToStringTag = setToStringTag$3;
    var createNonEnumerableProperty$2 = createNonEnumerableProperty$6;
    var redefine$2 = redefine$8.exports;
    var wellKnownSymbol$4 = wellKnownSymbol$k;
    var Iterators$1 = iterators;
    var IteratorsCore = iteratorsCore;

    var PROPER_FUNCTION_NAME = FunctionName.PROPER;
    var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
    var IteratorPrototype = IteratorsCore.IteratorPrototype;
    var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
    var ITERATOR$1 = wellKnownSymbol$4('iterator');
    var KEYS = 'keys';
    var VALUES = 'values';
    var ENTRIES = 'entries';

    var returnThis = function () { return this; };

    var defineIterator$2 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
      createIteratorConstructor(IteratorConstructor, NAME, next);

      var getIterationMethod = function (KIND) {
        if (KIND === DEFAULT && defaultIterator) return defaultIterator;
        if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
        switch (KIND) {
          case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
          case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
          case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
        } return function () { return new IteratorConstructor(this); };
      };

      var TO_STRING_TAG = NAME + ' Iterator';
      var INCORRECT_VALUES_NAME = false;
      var IterablePrototype = Iterable.prototype;
      var nativeIterator = IterablePrototype[ITERATOR$1]
        || IterablePrototype['@@iterator']
        || DEFAULT && IterablePrototype[DEFAULT];
      var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
      var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
      var CurrentIteratorPrototype, methods, KEY;

      // fix native
      if (anyNativeIterator) {
        CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
        if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
          if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
            if (setPrototypeOf) {
              setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
            } else if (!isCallable$2(CurrentIteratorPrototype[ITERATOR$1])) {
              redefine$2(CurrentIteratorPrototype, ITERATOR$1, returnThis);
            }
          }
          // Set @@toStringTag to native iterators
          setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
        }
      }

      // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
      if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
        if (CONFIGURABLE_FUNCTION_NAME) {
          createNonEnumerableProperty$2(IterablePrototype, 'name', VALUES);
        } else {
          INCORRECT_VALUES_NAME = true;
          defaultIterator = function values() { return nativeIterator.call(this); };
        }
      }

      // export additional methods
      if (DEFAULT) {
        methods = {
          values: getIterationMethod(VALUES),
          keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
          entries: getIterationMethod(ENTRIES)
        };
        if (FORCED) for (KEY in methods) {
          if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
            redefine$2(IterablePrototype, KEY, methods[KEY]);
          }
        } else $$5({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
      }

      // define iterator
      if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
        redefine$2(IterablePrototype, ITERATOR$1, defaultIterator, { name: DEFAULT });
      }
      Iterators$1[NAME] = defaultIterator;

      return methods;
    };

    var toIndexedObject = toIndexedObject$4;
    var addToUnscopables$1 = addToUnscopables$2;
    var Iterators = iterators;
    var InternalStateModule$1 = internalState;
    var defineIterator$1 = defineIterator$2;

    var ARRAY_ITERATOR = 'Array Iterator';
    var setInternalState$1 = InternalStateModule$1.set;
    var getInternalState$2 = InternalStateModule$1.getterFor(ARRAY_ITERATOR);

    // `Array.prototype.entries` method
    // https://tc39.es/ecma262/#sec-array.prototype.entries
    // `Array.prototype.keys` method
    // https://tc39.es/ecma262/#sec-array.prototype.keys
    // `Array.prototype.values` method
    // https://tc39.es/ecma262/#sec-array.prototype.values
    // `Array.prototype[@@iterator]` method
    // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
    // `CreateArrayIterator` internal method
    // https://tc39.es/ecma262/#sec-createarrayiterator
    var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
      setInternalState$1(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated), // target
        index: 0,                          // next index
        kind: kind                         // kind
      });
    // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
    }, function () {
      var state = getInternalState$2(this);
      var target = state.target;
      var kind = state.kind;
      var index = state.index++;
      if (!target || index >= target.length) {
        state.target = undefined;
        return { value: undefined, done: true };
      }
      if (kind == 'keys') return { value: index, done: false };
      if (kind == 'values') return { value: target[index], done: false };
      return { value: [index, target[index]], done: false };
    }, 'values');

    // argumentsList[@@iterator] is %ArrayProto_values%
    // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
    // https://tc39.es/ecma262/#sec-createmappedargumentsobject
    Iterators.Arguments = Iterators.Array;

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables$1('keys');
    addToUnscopables$1('values');
    addToUnscopables$1('entries');

    var classof$2 = classof$7;

    var toString$5 = function (argument) {
      if (classof$2(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
      return String(argument);
    };

    var toIntegerOrInfinity = toIntegerOrInfinity$3;
    var toString$4 = toString$5;
    var requireObjectCoercible$2 = requireObjectCoercible$5;

    var createMethod = function (CONVERT_TO_STRING) {
      return function ($this, pos) {
        var S = toString$4(requireObjectCoercible$2($this));
        var position = toIntegerOrInfinity(pos);
        var size = S.length;
        var first, second;
        if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
        first = S.charCodeAt(position);
        return first < 0xD800 || first > 0xDBFF || position + 1 === size
          || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
            ? CONVERT_TO_STRING ? S.charAt(position) : first
            : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
      };
    };

    var stringMultibyte = {
      // `String.prototype.codePointAt` method
      // https://tc39.es/ecma262/#sec-string.prototype.codepointat
      codeAt: createMethod(false),
      // `String.prototype.at` method
      // https://github.com/mathiasbynens/String.prototype.at
      charAt: createMethod(true)
    };

    var charAt$1 = stringMultibyte.charAt;
    var toString$3 = toString$5;
    var InternalStateModule = internalState;
    var defineIterator = defineIterator$2;

    var STRING_ITERATOR = 'String Iterator';
    var setInternalState = InternalStateModule.set;
    var getInternalState$1 = InternalStateModule.getterFor(STRING_ITERATOR);

    // `String.prototype[@@iterator]` method
    // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
    defineIterator(String, 'String', function (iterated) {
      setInternalState(this, {
        type: STRING_ITERATOR,
        string: toString$3(iterated),
        index: 0
      });
    // `%StringIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
    }, function next() {
      var state = getInternalState$1(this);
      var string = state.string;
      var index = state.index;
      var point;
      if (index >= string.length) return { value: undefined, done: true };
      point = charAt$1(string, index);
      state.index += point.length;
      return { value: point, done: false };
    });

    // iterable DOM collections
    // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
    var domIterables = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0
    };

    // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
    var documentCreateElement = documentCreateElement$2;

    var classList = documentCreateElement('span').classList;
    var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

    var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

    var global$4 = global$m;
    var DOMIterables = domIterables;
    var DOMTokenListPrototype = domTokenListPrototype;
    var ArrayIteratorMethods = es_array_iterator;
    var createNonEnumerableProperty$1 = createNonEnumerableProperty$6;
    var wellKnownSymbol$3 = wellKnownSymbol$k;

    var ITERATOR = wellKnownSymbol$3('iterator');
    var TO_STRING_TAG = wellKnownSymbol$3('toStringTag');
    var ArrayValues = ArrayIteratorMethods.values;

    var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
      if (CollectionPrototype) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
          createNonEnumerableProperty$1(CollectionPrototype, ITERATOR, ArrayValues);
        } catch (error) {
          CollectionPrototype[ITERATOR] = ArrayValues;
        }
        if (!CollectionPrototype[TO_STRING_TAG]) {
          createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
        }
        if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
          // some Chrome versions have non-configurable methods on DOMTokenList
          if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
            createNonEnumerableProperty$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
          } catch (error) {
            CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
          }
        }
      }
    };

    for (var COLLECTION_NAME in DOMIterables) {
      handlePrototype(global$4[COLLECTION_NAME] && global$4[COLLECTION_NAME].prototype, COLLECTION_NAME);
    }

    handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

    var $$4 = _export;
    var $includes = arrayIncludes.includes;
    var addToUnscopables = addToUnscopables$2;

    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    $$4({ target: 'Array', proto: true }, {
      includes: function includes(el /* , fromIndex = 0 */) {
        return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables('includes');

    var isObject = isObject$a;
    var classof$1 = classofRaw$1;
    var wellKnownSymbol$2 = wellKnownSymbol$k;

    var MATCH$1 = wellKnownSymbol$2('match');

    // `IsRegExp` abstract operation
    // https://tc39.es/ecma262/#sec-isregexp
    var isRegexp = function (it) {
      var isRegExp;
      return isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$1(it) == 'RegExp');
    };

    var isRegExp$1 = isRegexp;

    var notARegexp = function (it) {
      if (isRegExp$1(it)) {
        throw TypeError("The method doesn't accept regular expressions");
      } return it;
    };

    var wellKnownSymbol$1 = wellKnownSymbol$k;

    var MATCH = wellKnownSymbol$1('match');

    var correctIsRegexpLogic = function (METHOD_NAME) {
      var regexp = /./;
      try {
        '/./'[METHOD_NAME](regexp);
      } catch (error1) {
        try {
          regexp[MATCH] = false;
          return '/./'[METHOD_NAME](regexp);
        } catch (error2) { /* empty */ }
      } return false;
    };

    var $$3 = _export;
    var notARegExp = notARegexp;
    var requireObjectCoercible$1 = requireObjectCoercible$5;
    var toString$2 = toString$5;
    var correctIsRegExpLogic = correctIsRegexpLogic;

    // `String.prototype.includes` method
    // https://tc39.es/ecma262/#sec-string.prototype.includes
    $$3({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
      includes: function includes(searchString /* , position = 0 */) {
        return !!~toString$2(requireObjectCoercible$1(this))
          .indexOf(toString$2(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var anObject$2 = anObject$d;

    // `RegExp.prototype.flags` getter implementation
    // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
    var regexpFlags$1 = function () {
      var that = anObject$2(this);
      var result = '';
      if (that.global) result += 'g';
      if (that.ignoreCase) result += 'i';
      if (that.multiline) result += 'm';
      if (that.dotAll) result += 's';
      if (that.unicode) result += 'u';
      if (that.sticky) result += 'y';
      return result;
    };

    var regexpStickyHelpers = {};

    var fails$5 = fails$h;
    var global$3 = global$m;

    // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
    var $RegExp$2 = global$3.RegExp;

    regexpStickyHelpers.UNSUPPORTED_Y = fails$5(function () {
      var re = $RegExp$2('a', 'y');
      re.lastIndex = 2;
      return re.exec('abcd') != null;
    });

    regexpStickyHelpers.BROKEN_CARET = fails$5(function () {
      // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
      var re = $RegExp$2('^r', 'gy');
      re.lastIndex = 2;
      return re.exec('str') != null;
    });

    var fails$4 = fails$h;
    var global$2 = global$m;

    // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
    var $RegExp$1 = global$2.RegExp;

    var regexpUnsupportedDotAll = fails$4(function () {
      var re = $RegExp$1('.', 's');
      return !(re.dotAll && re.exec('\n') && re.flags === 's');
    });

    var fails$3 = fails$h;
    var global$1 = global$m;

    // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
    var $RegExp = global$1.RegExp;

    var regexpUnsupportedNcg = fails$3(function () {
      var re = $RegExp('(?<a>b)', 'g');
      return re.exec('b').groups.a !== 'b' ||
        'b'.replace(re, '$<a>c') !== 'bc';
    });

    /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
    /* eslint-disable regexp/no-useless-quantifier -- testing */
    var toString$1 = toString$5;
    var regexpFlags = regexpFlags$1;
    var stickyHelpers$1 = regexpStickyHelpers;
    var shared = shared$4.exports;
    var create = objectCreate;
    var getInternalState = internalState.get;
    var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
    var UNSUPPORTED_NCG = regexpUnsupportedNcg;

    var nativeExec = RegExp.prototype.exec;
    var nativeReplace = shared('native-string-replace', String.prototype.replace);

    var patchedExec = nativeExec;

    var UPDATES_LAST_INDEX_WRONG = (function () {
      var re1 = /a/;
      var re2 = /b*/g;
      nativeExec.call(re1, 'a');
      nativeExec.call(re2, 'a');
      return re1.lastIndex !== 0 || re2.lastIndex !== 0;
    })();

    var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y || stickyHelpers$1.BROKEN_CARET;

    // nonparticipating capturing group, copied from es5-shim's String#split patch.
    var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

    var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

    if (PATCH) {
      // eslint-disable-next-line max-statements -- TODO
      patchedExec = function exec(string) {
        var re = this;
        var state = getInternalState(re);
        var str = toString$1(string);
        var raw = state.raw;
        var result, reCopy, lastIndex, match, i, object, group;

        if (raw) {
          raw.lastIndex = re.lastIndex;
          result = patchedExec.call(raw, str);
          re.lastIndex = raw.lastIndex;
          return result;
        }

        var groups = state.groups;
        var sticky = UNSUPPORTED_Y$1 && re.sticky;
        var flags = regexpFlags.call(re);
        var source = re.source;
        var charsAdded = 0;
        var strCopy = str;

        if (sticky) {
          flags = flags.replace('y', '');
          if (flags.indexOf('g') === -1) {
            flags += 'g';
          }

          strCopy = str.slice(re.lastIndex);
          // Support anchored sticky behavior.
          if (re.lastIndex > 0 && (!re.multiline || re.multiline && str.charAt(re.lastIndex - 1) !== '\n')) {
            source = '(?: ' + source + ')';
            strCopy = ' ' + strCopy;
            charsAdded++;
          }
          // ^(? + rx + ) is needed, in combination with some str slicing, to
          // simulate the 'y' flag.
          reCopy = new RegExp('^(?:' + source + ')', flags);
        }

        if (NPCG_INCLUDED) {
          reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
        }
        if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

        match = nativeExec.call(sticky ? reCopy : re, strCopy);

        if (sticky) {
          if (match) {
            match.input = match.input.slice(charsAdded);
            match[0] = match[0].slice(charsAdded);
            match.index = re.lastIndex;
            re.lastIndex += match[0].length;
          } else re.lastIndex = 0;
        } else if (UPDATES_LAST_INDEX_WRONG && match) {
          re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
        }
        if (NPCG_INCLUDED && match && match.length > 1) {
          // Fix browsers whose `exec` methods don't consistently return `undefined`
          // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
          nativeReplace.call(match[0], reCopy, function () {
            for (i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undefined) match[i] = undefined;
            }
          });
        }

        if (match && groups) {
          match.groups = object = create(null);
          for (i = 0; i < groups.length; i++) {
            group = groups[i];
            object[group[0]] = match[group[1]];
          }
        }

        return match;
      };
    }

    var regexpExec$3 = patchedExec;

    var $$2 = _export;
    var exec = regexpExec$3;

    // `RegExp.prototype.exec` method
    // https://tc39.es/ecma262/#sec-regexp.prototype.exec
    $$2({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
      exec: exec
    });

    // TODO: Remove from `core-js@4` since it's moved to entry points

    var redefine$1 = redefine$8.exports;
    var regexpExec$2 = regexpExec$3;
    var fails$2 = fails$h;
    var wellKnownSymbol = wellKnownSymbol$k;
    var createNonEnumerableProperty = createNonEnumerableProperty$6;

    var SPECIES = wellKnownSymbol('species');
    var RegExpPrototype = RegExp.prototype;

    var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
      var SYMBOL = wellKnownSymbol(KEY);

      var DELEGATES_TO_SYMBOL = !fails$2(function () {
        // String methods call symbol-named RegEp methods
        var O = {};
        O[SYMBOL] = function () { return 7; };
        return ''[KEY](O) != 7;
      });

      var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$2(function () {
        // Symbol-named RegExp methods call .exec
        var execCalled = false;
        var re = /a/;

        if (KEY === 'split') {
          // We can't use real regex here since it causes deoptimization
          // and serious performance degradation in V8
          // https://github.com/zloirock/core-js/issues/306
          re = {};
          // RegExp[@@split] doesn't call the regex's exec method, but first creates
          // a new one. We need to return the patched regex when creating the new one.
          re.constructor = {};
          re.constructor[SPECIES] = function () { return re; };
          re.flags = '';
          re[SYMBOL] = /./[SYMBOL];
        }

        re.exec = function () { execCalled = true; return null; };

        re[SYMBOL]('');
        return !execCalled;
      });

      if (
        !DELEGATES_TO_SYMBOL ||
        !DELEGATES_TO_EXEC ||
        FORCED
      ) {
        var nativeRegExpMethod = /./[SYMBOL];
        var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
          var $exec = regexp.exec;
          if ($exec === regexpExec$2 || $exec === RegExpPrototype.exec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
            }
            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
          }
          return { done: false };
        });

        redefine$1(String.prototype, KEY, methods[0]);
        redefine$1(RegExpPrototype, SYMBOL, methods[1]);
      }

      if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
    };

    var charAt = stringMultibyte.charAt;

    // `AdvanceStringIndex` abstract operation
    // https://tc39.es/ecma262/#sec-advancestringindex
    var advanceStringIndex$1 = function (S, index, unicode) {
      return index + (unicode ? charAt(S, index).length : 1);
    };

    var anObject$1 = anObject$d;
    var isCallable$1 = isCallable$j;
    var classof = classofRaw$1;
    var regexpExec$1 = regexpExec$3;

    // `RegExpExec` abstract operation
    // https://tc39.es/ecma262/#sec-regexpexec
    var regexpExecAbstract = function (R, S) {
      var exec = R.exec;
      if (isCallable$1(exec)) {
        var result = exec.call(R, S);
        if (result !== null) anObject$1(result);
        return result;
      }
      if (classof(R) === 'RegExp') return regexpExec$1.call(R, S);
      throw TypeError('RegExp#exec called on incompatible receiver');
    };

    var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
    var isRegExp = isRegexp;
    var anObject = anObject$d;
    var requireObjectCoercible = requireObjectCoercible$5;
    var speciesConstructor$1 = speciesConstructor$3;
    var advanceStringIndex = advanceStringIndex$1;
    var toLength = toLength$2;
    var toString = toString$5;
    var getMethod = getMethod$4;
    var callRegExpExec = regexpExecAbstract;
    var regexpExec = regexpExec$3;
    var stickyHelpers = regexpStickyHelpers;
    var fails$1 = fails$h;

    var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
    var arrayPush = [].push;
    var min = Math.min;
    var MAX_UINT32 = 0xFFFFFFFF;

    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    // Weex JS has frozen built-in prototypes, so use try / catch wrapper
    var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$1(function () {
      // eslint-disable-next-line regexp/no-empty-group -- required for testing
      var re = /(?:)/;
      var originalExec = re.exec;
      re.exec = function () { return originalExec.apply(this, arguments); };
      var result = 'ab'.split(re);
      return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
    });

    // @@split logic
    fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
      var internalSplit;
      if (
        'abbc'.split(/(b)*/)[1] == 'c' ||
        // eslint-disable-next-line regexp/no-empty-group -- required for testing
        'test'.split(/(?:)/, -1).length != 4 ||
        'ab'.split(/(?:ab)*/).length != 2 ||
        '.'.split(/(.?)(.?)/).length != 4 ||
        // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
        '.'.split(/()()/).length > 1 ||
        ''.split(/.?/).length
      ) {
        // based on es5-shim implementation, need to rework it
        internalSplit = function (separator, limit) {
          var string = toString(requireObjectCoercible(this));
          var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
          if (lim === 0) return [];
          if (separator === undefined) return [string];
          // If `separator` is not a regex, use native split
          if (!isRegExp(separator)) {
            return nativeSplit.call(string, separator, lim);
          }
          var output = [];
          var flags = (separator.ignoreCase ? 'i' : '') +
                      (separator.multiline ? 'm' : '') +
                      (separator.unicode ? 'u' : '') +
                      (separator.sticky ? 'y' : '');
          var lastLastIndex = 0;
          // Make `global` and avoid `lastIndex` issues by working with a copy
          var separatorCopy = new RegExp(separator.source, flags + 'g');
          var match, lastIndex, lastLength;
          while (match = regexpExec.call(separatorCopy, string)) {
            lastIndex = separatorCopy.lastIndex;
            if (lastIndex > lastLastIndex) {
              output.push(string.slice(lastLastIndex, match.index));
              if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
              lastLength = match[0].length;
              lastLastIndex = lastIndex;
              if (output.length >= lim) break;
            }
            if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
          }
          if (lastLastIndex === string.length) {
            if (lastLength || !separatorCopy.test('')) output.push('');
          } else output.push(string.slice(lastLastIndex));
          return output.length > lim ? output.slice(0, lim) : output;
        };
      // Chakra, V8
      } else if ('0'.split(undefined, 0).length) {
        internalSplit = function (separator, limit) {
          return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
        };
      } else internalSplit = nativeSplit;

      return [
        // `String.prototype.split` method
        // https://tc39.es/ecma262/#sec-string.prototype.split
        function split(separator, limit) {
          var O = requireObjectCoercible(this);
          var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
          return splitter
            ? splitter.call(separator, O, limit)
            : internalSplit.call(toString(O), separator, limit);
        },
        // `RegExp.prototype[@@split]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
        //
        // NOTE: This cannot be properly polyfilled in engines that don't support
        // the 'y' flag.
        function (string, limit) {
          var rx = anObject(this);
          var S = toString(string);
          var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

          if (res.done) return res.value;

          var C = speciesConstructor$1(rx, RegExp);

          var unicodeMatching = rx.unicode;
          var flags = (rx.ignoreCase ? 'i' : '') +
                      (rx.multiline ? 'm' : '') +
                      (rx.unicode ? 'u' : '') +
                      (UNSUPPORTED_Y ? 'g' : 'y');

          // ^(? + rx + ) is needed, in combination with some S slicing, to
          // simulate the 'y' flag.
          var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
          var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
          if (lim === 0) return [];
          if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
          var p = 0;
          var q = 0;
          var A = [];
          while (q < S.length) {
            splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
            var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
            var e;
            if (
              z === null ||
              (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
            ) {
              q = advanceStringIndex(S, q, unicodeMatching);
            } else {
              A.push(S.slice(p, q));
              if (A.length === lim) return A;
              for (var i = 1; i <= z.length - 1; i++) {
                A.push(z[i]);
                if (A.length === lim) return A;
              }
              q = p = e;
            }
          }
          A.push(S.slice(p));
          return A;
        }
      ];
    }, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

    var $$1 = _export;
    var NativePromise = nativePromiseConstructor;
    var fails = fails$h;
    var getBuiltIn = getBuiltIn$8;
    var isCallable = isCallable$j;
    var speciesConstructor = speciesConstructor$3;
    var promiseResolve = promiseResolve$2;
    var redefine = redefine$8.exports;

    // Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
    var NON_GENERIC = !!NativePromise && fails(function () {
      NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
    });

    // `Promise.prototype.finally` method
    // https://tc39.es/ecma262/#sec-promise.prototype.finally
    $$1({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
      'finally': function (onFinally) {
        var C = speciesConstructor(this, getBuiltIn('Promise'));
        var isFunction = isCallable(onFinally);
        return this.then(
          isFunction ? function (x) {
            return promiseResolve(C, onFinally()).then(function () { return x; });
          } : onFinally,
          isFunction ? function (e) {
            return promiseResolve(C, onFinally()).then(function () { throw e; });
          } : onFinally
        );
      }
    });

    // makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
    if (isCallable(NativePromise)) {
      var method = getBuiltIn('Promise').prototype['finally'];
      if (NativePromise.prototype['finally'] !== method) {
        redefine(NativePromise.prototype, 'finally', method, { unsafe: true });
      }
    }

    var localforage$1 = {exports: {}};

    /*!
        localForage -- Offline Storage, Improved
        Version 1.10.0
        https://localforage.github.io/localForage
        (c) 2013-2017 Mozilla, Apache License 2.0
    */

    (function (module, exports) {
    (function(f){{module.exports=f();}})(function(){return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
    (function (global){
    var Mutation = global.MutationObserver || global.WebKitMutationObserver;

    var scheduleDrain;

    {
      if (Mutation) {
        var called = 0;
        var observer = new Mutation(nextTick);
        var element = global.document.createTextNode('');
        observer.observe(element, {
          characterData: true
        });
        scheduleDrain = function () {
          element.data = (called = ++called % 2);
        };
      } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
        var channel = new global.MessageChannel();
        channel.port1.onmessage = nextTick;
        scheduleDrain = function () {
          channel.port2.postMessage(0);
        };
      } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
        scheduleDrain = function () {

          // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
          // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
          var scriptEl = global.document.createElement('script');
          scriptEl.onreadystatechange = function () {
            nextTick();

            scriptEl.onreadystatechange = null;
            scriptEl.parentNode.removeChild(scriptEl);
            scriptEl = null;
          };
          global.document.documentElement.appendChild(scriptEl);
        };
      } else {
        scheduleDrain = function () {
          setTimeout(nextTick, 0);
        };
      }
    }

    var draining;
    var queue = [];
    //named nextTick for less confusing stack traces
    function nextTick() {
      draining = true;
      var i, oldQueue;
      var len = queue.length;
      while (len) {
        oldQueue = queue;
        queue = [];
        i = -1;
        while (++i < len) {
          oldQueue[i]();
        }
        len = queue.length;
      }
      draining = false;
    }

    module.exports = immediate;
    function immediate(task) {
      if (queue.push(task) === 1 && !draining) {
        scheduleDrain();
      }
    }

    }).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    },{}],2:[function(_dereq_,module,exports){
    var immediate = _dereq_(1);

    /* istanbul ignore next */
    function INTERNAL() {}

    var handlers = {};

    var REJECTED = ['REJECTED'];
    var FULFILLED = ['FULFILLED'];
    var PENDING = ['PENDING'];

    module.exports = Promise;

    function Promise(resolver) {
      if (typeof resolver !== 'function') {
        throw new TypeError('resolver must be a function');
      }
      this.state = PENDING;
      this.queue = [];
      this.outcome = void 0;
      if (resolver !== INTERNAL) {
        safelyResolveThenable(this, resolver);
      }
    }

    Promise.prototype["catch"] = function (onRejected) {
      return this.then(null, onRejected);
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
      if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
        typeof onRejected !== 'function' && this.state === REJECTED) {
        return this;
      }
      var promise = new this.constructor(INTERNAL);
      if (this.state !== PENDING) {
        var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
        unwrap(promise, resolver, this.outcome);
      } else {
        this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
      }

      return promise;
    };
    function QueueItem(promise, onFulfilled, onRejected) {
      this.promise = promise;
      if (typeof onFulfilled === 'function') {
        this.onFulfilled = onFulfilled;
        this.callFulfilled = this.otherCallFulfilled;
      }
      if (typeof onRejected === 'function') {
        this.onRejected = onRejected;
        this.callRejected = this.otherCallRejected;
      }
    }
    QueueItem.prototype.callFulfilled = function (value) {
      handlers.resolve(this.promise, value);
    };
    QueueItem.prototype.otherCallFulfilled = function (value) {
      unwrap(this.promise, this.onFulfilled, value);
    };
    QueueItem.prototype.callRejected = function (value) {
      handlers.reject(this.promise, value);
    };
    QueueItem.prototype.otherCallRejected = function (value) {
      unwrap(this.promise, this.onRejected, value);
    };

    function unwrap(promise, func, value) {
      immediate(function () {
        var returnValue;
        try {
          returnValue = func(value);
        } catch (e) {
          return handlers.reject(promise, e);
        }
        if (returnValue === promise) {
          handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
        } else {
          handlers.resolve(promise, returnValue);
        }
      });
    }

    handlers.resolve = function (self, value) {
      var result = tryCatch(getThen, value);
      if (result.status === 'error') {
        return handlers.reject(self, result.value);
      }
      var thenable = result.value;

      if (thenable) {
        safelyResolveThenable(self, thenable);
      } else {
        self.state = FULFILLED;
        self.outcome = value;
        var i = -1;
        var len = self.queue.length;
        while (++i < len) {
          self.queue[i].callFulfilled(value);
        }
      }
      return self;
    };
    handlers.reject = function (self, error) {
      self.state = REJECTED;
      self.outcome = error;
      var i = -1;
      var len = self.queue.length;
      while (++i < len) {
        self.queue[i].callRejected(error);
      }
      return self;
    };

    function getThen(obj) {
      // Make sure we only access the accessor once as required by the spec
      var then = obj && obj.then;
      if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
        return function appyThen() {
          then.apply(obj, arguments);
        };
      }
    }

    function safelyResolveThenable(self, thenable) {
      // Either fulfill, reject or reject with error
      var called = false;
      function onError(value) {
        if (called) {
          return;
        }
        called = true;
        handlers.reject(self, value);
      }

      function onSuccess(value) {
        if (called) {
          return;
        }
        called = true;
        handlers.resolve(self, value);
      }

      function tryToUnwrap() {
        thenable(onSuccess, onError);
      }

      var result = tryCatch(tryToUnwrap);
      if (result.status === 'error') {
        onError(result.value);
      }
    }

    function tryCatch(func, value) {
      var out = {};
      try {
        out.value = func(value);
        out.status = 'success';
      } catch (e) {
        out.status = 'error';
        out.value = e;
      }
      return out;
    }

    Promise.resolve = resolve;
    function resolve(value) {
      if (value instanceof this) {
        return value;
      }
      return handlers.resolve(new this(INTERNAL), value);
    }

    Promise.reject = reject;
    function reject(reason) {
      var promise = new this(INTERNAL);
      return handlers.reject(promise, reason);
    }

    Promise.all = all;
    function all(iterable) {
      var self = this;
      if (Object.prototype.toString.call(iterable) !== '[object Array]') {
        return this.reject(new TypeError('must be an array'));
      }

      var len = iterable.length;
      var called = false;
      if (!len) {
        return this.resolve([]);
      }

      var values = new Array(len);
      var resolved = 0;
      var i = -1;
      var promise = new this(INTERNAL);

      while (++i < len) {
        allResolver(iterable[i], i);
      }
      return promise;
      function allResolver(value, i) {
        self.resolve(value).then(resolveFromAll, function (error) {
          if (!called) {
            called = true;
            handlers.reject(promise, error);
          }
        });
        function resolveFromAll(outValue) {
          values[i] = outValue;
          if (++resolved === len && !called) {
            called = true;
            handlers.resolve(promise, values);
          }
        }
      }
    }

    Promise.race = race;
    function race(iterable) {
      var self = this;
      if (Object.prototype.toString.call(iterable) !== '[object Array]') {
        return this.reject(new TypeError('must be an array'));
      }

      var len = iterable.length;
      var called = false;
      if (!len) {
        return this.resolve([]);
      }

      var i = -1;
      var promise = new this(INTERNAL);

      while (++i < len) {
        resolver(iterable[i]);
      }
      return promise;
      function resolver(value) {
        self.resolve(value).then(function (response) {
          if (!called) {
            called = true;
            handlers.resolve(promise, response);
          }
        }, function (error) {
          if (!called) {
            called = true;
            handlers.reject(promise, error);
          }
        });
      }
    }

    },{"1":1}],3:[function(_dereq_,module,exports){
    (function (global){
    if (typeof global.Promise !== 'function') {
      global.Promise = _dereq_(2);
    }

    }).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    },{"2":2}],4:[function(_dereq_,module,exports){

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function getIDB() {
        /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
        try {
            if (typeof indexedDB !== 'undefined') {
                return indexedDB;
            }
            if (typeof webkitIndexedDB !== 'undefined') {
                return webkitIndexedDB;
            }
            if (typeof mozIndexedDB !== 'undefined') {
                return mozIndexedDB;
            }
            if (typeof OIndexedDB !== 'undefined') {
                return OIndexedDB;
            }
            if (typeof msIndexedDB !== 'undefined') {
                return msIndexedDB;
            }
        } catch (e) {
            return;
        }
    }

    var idb = getIDB();

    function isIndexedDBValid() {
        try {
            // Initialize IndexedDB; fall back to vendor-prefixed versions
            // if needed.
            if (!idb || !idb.open) {
                return false;
            }
            // We mimic PouchDB here;
            //
            // We test for openDatabase because IE Mobile identifies itself
            // as Safari. Oh the lulz...
            var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

            var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

            // Safari <10.1 does not meet our requirements for IDB support
            // (see: https://github.com/pouchdb/pouchdb/issues/5572).
            // Safari 10.1 shipped with fetch, we can use that to detect it.
            // Note: this creates issues with `window.fetch` polyfills and
            // overrides; see:
            // https://github.com/localForage/localForage/issues/856
            return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
            // some outdated implementations of IDB that appear on Samsung
            // and HTC Android devices <4.4 are missing IDBKeyRange
            // See: https://github.com/mozilla/localForage/issues/128
            // See: https://github.com/mozilla/localForage/issues/272
            typeof IDBKeyRange !== 'undefined';
        } catch (e) {
            return false;
        }
    }

    // Abstracts constructing a Blob object, so it also works in older
    // browsers that don't support the native Blob constructor. (i.e.
    // old QtWebKit versions, at least).
    // Abstracts constructing a Blob object, so it also works in older
    // browsers that don't support the native Blob constructor. (i.e.
    // old QtWebKit versions, at least).
    function createBlob(parts, properties) {
        /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
        parts = parts || [];
        properties = properties || {};
        try {
            return new Blob(parts, properties);
        } catch (e) {
            if (e.name !== 'TypeError') {
                throw e;
            }
            var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
            var builder = new Builder();
            for (var i = 0; i < parts.length; i += 1) {
                builder.append(parts[i]);
            }
            return builder.getBlob(properties.type);
        }
    }

    // This is CommonJS because lie is an external dependency, so Rollup
    // can just ignore it.
    if (typeof Promise === 'undefined') {
        // In the "nopromises" build this will just throw if you don't have
        // a global promise object, but it would throw anyway later.
        _dereq_(3);
    }
    var Promise$1 = Promise;

    function executeCallback(promise, callback) {
        if (callback) {
            promise.then(function (result) {
                callback(null, result);
            }, function (error) {
                callback(error);
            });
        }
    }

    function executeTwoCallbacks(promise, callback, errorCallback) {
        if (typeof callback === 'function') {
            promise.then(callback);
        }

        if (typeof errorCallback === 'function') {
            promise["catch"](errorCallback);
        }
    }

    function normalizeKey(key) {
        // Cast the key to a string, as that's all we can set as a key.
        if (typeof key !== 'string') {
            console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
        }

        return key;
    }

    function getCallback() {
        if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
            return arguments[arguments.length - 1];
        }
    }

    // Some code originally from async_storage.js in
    // [Gaia](https://github.com/mozilla-b2g/gaia).

    var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
    var supportsBlobs = void 0;
    var dbContexts = {};
    var toString = Object.prototype.toString;

    // Transaction Modes
    var READ_ONLY = 'readonly';
    var READ_WRITE = 'readwrite';

    // Transform a binary string to an array buffer, because otherwise
    // weird stuff happens when you try to work with the binary string directly.
    // It is known.
    // From http://stackoverflow.com/questions/14967647/ (continues on next line)
    // encode-decode-image-with-base64-breaks-image (2013-04-21)
    function _binStringToArrayBuffer(bin) {
        var length = bin.length;
        var buf = new ArrayBuffer(length);
        var arr = new Uint8Array(buf);
        for (var i = 0; i < length; i++) {
            arr[i] = bin.charCodeAt(i);
        }
        return buf;
    }

    //
    // Blobs are not supported in all versions of IndexedDB, notably
    // Chrome <37 and Android <5. In those versions, storing a blob will throw.
    //
    // Various other blob bugs exist in Chrome v37-42 (inclusive).
    // Detecting them is expensive and confusing to users, and Chrome 37-42
    // is at very low usage worldwide, so we do a hacky userAgent check instead.
    //
    // content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
    // 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
    // FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
    //
    // Code borrowed from PouchDB. See:
    // https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
    //
    function _checkBlobSupportWithoutCaching(idb) {
        return new Promise$1(function (resolve) {
            var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
            var blob = createBlob(['']);
            txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

            txn.onabort = function (e) {
                // If the transaction aborts now its due to not being able to
                // write to the database, likely due to the disk being full
                e.preventDefault();
                e.stopPropagation();
                resolve(false);
            };

            txn.oncomplete = function () {
                var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
                var matchedEdge = navigator.userAgent.match(/Edge\//);
                // MS Edge pretends to be Chrome 42:
                // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
                resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
            };
        })["catch"](function () {
            return false; // error, so assume unsupported
        });
    }

    function _checkBlobSupport(idb) {
        if (typeof supportsBlobs === 'boolean') {
            return Promise$1.resolve(supportsBlobs);
        }
        return _checkBlobSupportWithoutCaching(idb).then(function (value) {
            supportsBlobs = value;
            return supportsBlobs;
        });
    }

    function _deferReadiness(dbInfo) {
        var dbContext = dbContexts[dbInfo.name];

        // Create a deferred object representing the current database operation.
        var deferredOperation = {};

        deferredOperation.promise = new Promise$1(function (resolve, reject) {
            deferredOperation.resolve = resolve;
            deferredOperation.reject = reject;
        });

        // Enqueue the deferred operation.
        dbContext.deferredOperations.push(deferredOperation);

        // Chain its promise to the database readiness.
        if (!dbContext.dbReady) {
            dbContext.dbReady = deferredOperation.promise;
        } else {
            dbContext.dbReady = dbContext.dbReady.then(function () {
                return deferredOperation.promise;
            });
        }
    }

    function _advanceReadiness(dbInfo) {
        var dbContext = dbContexts[dbInfo.name];

        // Dequeue a deferred operation.
        var deferredOperation = dbContext.deferredOperations.pop();

        // Resolve its promise (which is part of the database readiness
        // chain of promises).
        if (deferredOperation) {
            deferredOperation.resolve();
            return deferredOperation.promise;
        }
    }

    function _rejectReadiness(dbInfo, err) {
        var dbContext = dbContexts[dbInfo.name];

        // Dequeue a deferred operation.
        var deferredOperation = dbContext.deferredOperations.pop();

        // Reject its promise (which is part of the database readiness
        // chain of promises).
        if (deferredOperation) {
            deferredOperation.reject(err);
            return deferredOperation.promise;
        }
    }

    function _getConnection(dbInfo, upgradeNeeded) {
        return new Promise$1(function (resolve, reject) {
            dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

            if (dbInfo.db) {
                if (upgradeNeeded) {
                    _deferReadiness(dbInfo);
                    dbInfo.db.close();
                } else {
                    return resolve(dbInfo.db);
                }
            }

            var dbArgs = [dbInfo.name];

            if (upgradeNeeded) {
                dbArgs.push(dbInfo.version);
            }

            var openreq = idb.open.apply(idb, dbArgs);

            if (upgradeNeeded) {
                openreq.onupgradeneeded = function (e) {
                    var db = openreq.result;
                    try {
                        db.createObjectStore(dbInfo.storeName);
                        if (e.oldVersion <= 1) {
                            // Added when support for blob shims was added
                            db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                        }
                    } catch (ex) {
                        if (ex.name === 'ConstraintError') {
                            console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                        } else {
                            throw ex;
                        }
                    }
                };
            }

            openreq.onerror = function (e) {
                e.preventDefault();
                reject(openreq.error);
            };

            openreq.onsuccess = function () {
                var db = openreq.result;
                db.onversionchange = function (e) {
                    // Triggered when the database is modified (e.g. adding an objectStore) or
                    // deleted (even when initiated by other sessions in different tabs).
                    // Closing the connection here prevents those operations from being blocked.
                    // If the database is accessed again later by this instance, the connection
                    // will be reopened or the database recreated as needed.
                    e.target.close();
                };
                resolve(db);
                _advanceReadiness(dbInfo);
            };
        });
    }

    function _getOriginalConnection(dbInfo) {
        return _getConnection(dbInfo, false);
    }

    function _getUpgradedConnection(dbInfo) {
        return _getConnection(dbInfo, true);
    }

    function _isUpgradeNeeded(dbInfo, defaultVersion) {
        if (!dbInfo.db) {
            return true;
        }

        var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
        var isDowngrade = dbInfo.version < dbInfo.db.version;
        var isUpgrade = dbInfo.version > dbInfo.db.version;

        if (isDowngrade) {
            // If the version is not the default one
            // then warn for impossible downgrade.
            if (dbInfo.version !== defaultVersion) {
                console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
            }
            // Align the versions to prevent errors.
            dbInfo.version = dbInfo.db.version;
        }

        if (isUpgrade || isNewStore) {
            // If the store is new then increment the version (if needed).
            // This will trigger an "upgradeneeded" event which is required
            // for creating a store.
            if (isNewStore) {
                var incVersion = dbInfo.db.version + 1;
                if (incVersion > dbInfo.version) {
                    dbInfo.version = incVersion;
                }
            }

            return true;
        }

        return false;
    }

    // encode a blob for indexeddb engines that don't support blobs
    function _encodeBlob(blob) {
        return new Promise$1(function (resolve, reject) {
            var reader = new FileReader();
            reader.onerror = reject;
            reader.onloadend = function (e) {
                var base64 = btoa(e.target.result || '');
                resolve({
                    __local_forage_encoded_blob: true,
                    data: base64,
                    type: blob.type
                });
            };
            reader.readAsBinaryString(blob);
        });
    }

    // decode an encoded blob
    function _decodeBlob(encodedBlob) {
        var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
        return createBlob([arrayBuff], { type: encodedBlob.type });
    }

    // is this one of our fancy encoded blobs?
    function _isEncodedBlob(value) {
        return value && value.__local_forage_encoded_blob;
    }

    // Specialize the default `ready()` function by making it dependent
    // on the current database operations. Thus, the driver will be actually
    // ready when it's been initialized (default) *and* there are no pending
    // operations on the database (initiated by some other instances).
    function _fullyReady(callback) {
        var self = this;

        var promise = self._initReady().then(function () {
            var dbContext = dbContexts[self._dbInfo.name];

            if (dbContext && dbContext.dbReady) {
                return dbContext.dbReady;
            }
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    }

    // Try to establish a new db connection to replace the
    // current one which is broken (i.e. experiencing
    // InvalidStateError while creating a transaction).
    function _tryReconnect(dbInfo) {
        _deferReadiness(dbInfo);

        var dbContext = dbContexts[dbInfo.name];
        var forages = dbContext.forages;

        for (var i = 0; i < forages.length; i++) {
            var forage = forages[i];
            if (forage._dbInfo.db) {
                forage._dbInfo.db.close();
                forage._dbInfo.db = null;
            }
        }
        dbInfo.db = null;

        return _getOriginalConnection(dbInfo).then(function (db) {
            dbInfo.db = db;
            if (_isUpgradeNeeded(dbInfo)) {
                // Reopen the database for upgrading.
                return _getUpgradedConnection(dbInfo);
            }
            return db;
        }).then(function (db) {
            // store the latest db reference
            // in case the db was upgraded
            dbInfo.db = dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
            }
        })["catch"](function (err) {
            _rejectReadiness(dbInfo, err);
            throw err;
        });
    }

    // FF doesn't like Promises (micro-tasks) and IDDB store operations,
    // so we have to do it with callbacks
    function createTransaction(dbInfo, mode, callback, retries) {
        if (retries === undefined) {
            retries = 1;
        }

        try {
            var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
            callback(null, tx);
        } catch (err) {
            if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
                return Promise$1.resolve().then(function () {
                    if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                        // increase the db version, to create the new ObjectStore
                        if (dbInfo.db) {
                            dbInfo.version = dbInfo.db.version + 1;
                        }
                        // Reopen the database for upgrading.
                        return _getUpgradedConnection(dbInfo);
                    }
                }).then(function () {
                    return _tryReconnect(dbInfo).then(function () {
                        createTransaction(dbInfo, mode, callback, retries - 1);
                    });
                })["catch"](callback);
            }

            callback(err);
        }
    }

    function createDbContext() {
        return {
            // Running localForages sharing a database.
            forages: [],
            // Shared database.
            db: null,
            // Database readiness (promise).
            dbReady: null,
            // Deferred operations on the database.
            deferredOperations: []
        };
    }

    // Open the IndexedDB database (automatically creates one if one didn't
    // previously exist), using any options set in the config.
    function _initStorage(options) {
        var self = this;
        var dbInfo = {
            db: null
        };

        if (options) {
            for (var i in options) {
                dbInfo[i] = options[i];
            }
        }

        // Get the current context of the database;
        var dbContext = dbContexts[dbInfo.name];

        // ...or create a new context.
        if (!dbContext) {
            dbContext = createDbContext();
            // Register the new context in the global container.
            dbContexts[dbInfo.name] = dbContext;
        }

        // Register itself as a running localForage in the current context.
        dbContext.forages.push(self);

        // Replace the default `ready()` function with the specialized one.
        if (!self._initReady) {
            self._initReady = self.ready;
            self.ready = _fullyReady;
        }

        // Create an array of initialization states of the related localForages.
        var initPromises = [];

        function ignoreErrors() {
            // Don't handle errors here,
            // just makes sure related localForages aren't pending.
            return Promise$1.resolve();
        }

        for (var j = 0; j < dbContext.forages.length; j++) {
            var forage = dbContext.forages[j];
            if (forage !== self) {
                // Don't wait for itself...
                initPromises.push(forage._initReady()["catch"](ignoreErrors));
            }
        }

        // Take a snapshot of the related localForages.
        var forages = dbContext.forages.slice(0);

        // Initialize the connection process only when
        // all the related localForages aren't pending.
        return Promise$1.all(initPromises).then(function () {
            dbInfo.db = dbContext.db;
            // Get the connection or open a new one without upgrade.
            return _getOriginalConnection(dbInfo);
        }).then(function (db) {
            dbInfo.db = db;
            if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
                // Reopen the database for upgrading.
                return _getUpgradedConnection(dbInfo);
            }
            return db;
        }).then(function (db) {
            dbInfo.db = dbContext.db = db;
            self._dbInfo = dbInfo;
            // Share the final connection amongst related localForages.
            for (var k = 0; k < forages.length; k++) {
                var forage = forages[k];
                if (forage !== self) {
                    // Self is already up-to-date.
                    forage._dbInfo.db = dbInfo.db;
                    forage._dbInfo.version = dbInfo.version;
                }
            }
        });
    }

    function getItem(key, callback) {
        var self = this;

        key = normalizeKey(key);

        var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                    if (err) {
                        return reject(err);
                    }

                    try {
                        var store = transaction.objectStore(self._dbInfo.storeName);
                        var req = store.get(key);

                        req.onsuccess = function () {
                            var value = req.result;
                            if (value === undefined) {
                                value = null;
                            }
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            resolve(value);
                        };

                        req.onerror = function () {
                            reject(req.error);
                        };
                    } catch (e) {
                        reject(e);
                    }
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Iterate over all items stored in database.
    function iterate(iterator, callback) {
        var self = this;

        var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                    if (err) {
                        return reject(err);
                    }

                    try {
                        var store = transaction.objectStore(self._dbInfo.storeName);
                        var req = store.openCursor();
                        var iterationNumber = 1;

                        req.onsuccess = function () {
                            var cursor = req.result;

                            if (cursor) {
                                var value = cursor.value;
                                if (_isEncodedBlob(value)) {
                                    value = _decodeBlob(value);
                                }
                                var result = iterator(value, cursor.key, iterationNumber++);

                                // when the iterator callback returns any
                                // (non-`undefined`) value, then we stop
                                // the iteration immediately
                                if (result !== void 0) {
                                    resolve(result);
                                } else {
                                    cursor["continue"]();
                                }
                            } else {
                                resolve();
                            }
                        };

                        req.onerror = function () {
                            reject(req.error);
                        };
                    } catch (e) {
                        reject(e);
                    }
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);

        return promise;
    }

    function setItem(key, value, callback) {
        var self = this;

        key = normalizeKey(key);

        var promise = new Promise$1(function (resolve, reject) {
            var dbInfo;
            self.ready().then(function () {
                dbInfo = self._dbInfo;
                if (toString.call(value) === '[object Blob]') {
                    return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                        if (blobSupport) {
                            return value;
                        }
                        return _encodeBlob(value);
                    });
                }
                return value;
            }).then(function (value) {
                createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                    if (err) {
                        return reject(err);
                    }

                    try {
                        var store = transaction.objectStore(self._dbInfo.storeName);

                        // The reason we don't _save_ null is because IE 10 does
                        // not support saving the `null` type in IndexedDB. How
                        // ironic, given the bug below!
                        // See: https://github.com/mozilla/localForage/issues/161
                        if (value === null) {
                            value = undefined;
                        }

                        var req = store.put(value, key);

                        transaction.oncomplete = function () {
                            // Cast to undefined so the value passed to
                            // callback/promise is the same as what one would get out
                            // of `getItem()` later. This leads to some weirdness
                            // (setItem('foo', undefined) will return `null`), but
                            // it's not my fault localStorage is our baseline and that
                            // it's weird.
                            if (value === undefined) {
                                value = null;
                            }

                            resolve(value);
                        };
                        transaction.onabort = transaction.onerror = function () {
                            var err = req.error ? req.error : req.transaction.error;
                            reject(err);
                        };
                    } catch (e) {
                        reject(e);
                    }
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function removeItem(key, callback) {
        var self = this;

        key = normalizeKey(key);

        var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
                createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                    if (err) {
                        return reject(err);
                    }

                    try {
                        var store = transaction.objectStore(self._dbInfo.storeName);
                        // We use a Grunt task to make this safe for IE and some
                        // versions of Android (including those used by Cordova).
                        // Normally IE won't like `.delete()` and will insist on
                        // using `['delete']()`, but we have a build step that
                        // fixes this for us now.
                        var req = store["delete"](key);
                        transaction.oncomplete = function () {
                            resolve();
                        };

                        transaction.onerror = function () {
                            reject(req.error);
                        };

                        // The request will be also be aborted if we've exceeded our storage
                        // space.
                        transaction.onabort = function () {
                            var err = req.error ? req.error : req.transaction.error;
                            reject(err);
                        };
                    } catch (e) {
                        reject(e);
                    }
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function clear(callback) {
        var self = this;

        var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
                createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                    if (err) {
                        return reject(err);
                    }

                    try {
                        var store = transaction.objectStore(self._dbInfo.storeName);
                        var req = store.clear();

                        transaction.oncomplete = function () {
                            resolve();
                        };

                        transaction.onabort = transaction.onerror = function () {
                            var err = req.error ? req.error : req.transaction.error;
                            reject(err);
                        };
                    } catch (e) {
                        reject(e);
                    }
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function length(callback) {
        var self = this;

        var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                    if (err) {
                        return reject(err);
                    }

                    try {
                        var store = transaction.objectStore(self._dbInfo.storeName);
                        var req = store.count();

                        req.onsuccess = function () {
                            resolve(req.result);
                        };

                        req.onerror = function () {
                            reject(req.error);
                        };
                    } catch (e) {
                        reject(e);
                    }
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function key(n, callback) {
        var self = this;

        var promise = new Promise$1(function (resolve, reject) {
            if (n < 0) {
                resolve(null);

                return;
            }

            self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                    if (err) {
                        return reject(err);
                    }

                    try {
                        var store = transaction.objectStore(self._dbInfo.storeName);
                        var advanced = false;
                        var req = store.openKeyCursor();

                        req.onsuccess = function () {
                            var cursor = req.result;
                            if (!cursor) {
                                // this means there weren't enough keys
                                resolve(null);

                                return;
                            }

                            if (n === 0) {
                                // We have the first key, return it if that's what they
                                // wanted.
                                resolve(cursor.key);
                            } else {
                                if (!advanced) {
                                    // Otherwise, ask the cursor to skip ahead n
                                    // records.
                                    advanced = true;
                                    cursor.advance(n);
                                } else {
                                    // When we get here, we've got the nth key.
                                    resolve(cursor.key);
                                }
                            }
                        };

                        req.onerror = function () {
                            reject(req.error);
                        };
                    } catch (e) {
                        reject(e);
                    }
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function keys(callback) {
        var self = this;

        var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                    if (err) {
                        return reject(err);
                    }

                    try {
                        var store = transaction.objectStore(self._dbInfo.storeName);
                        var req = store.openKeyCursor();
                        var keys = [];

                        req.onsuccess = function () {
                            var cursor = req.result;

                            if (!cursor) {
                                resolve(keys);
                                return;
                            }

                            keys.push(cursor.key);
                            cursor["continue"]();
                        };

                        req.onerror = function () {
                            reject(req.error);
                        };
                    } catch (e) {
                        reject(e);
                    }
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function dropInstance(options, callback) {
        callback = getCallback.apply(this, arguments);

        var currentConfig = this.config();
        options = typeof options !== 'function' && options || {};
        if (!options.name) {
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
        }

        var self = this;
        var promise;
        if (!options.name) {
            promise = Promise$1.reject('Invalid arguments');
        } else {
            var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

            var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                dbContext.db = db;
                for (var i = 0; i < forages.length; i++) {
                    forages[i]._dbInfo.db = db;
                }
                return db;
            });

            if (!options.storeName) {
                promise = dbPromise.then(function (db) {
                    _deferReadiness(options);

                    var dbContext = dbContexts[options.name];
                    var forages = dbContext.forages;

                    db.close();
                    for (var i = 0; i < forages.length; i++) {
                        var forage = forages[i];
                        forage._dbInfo.db = null;
                    }

                    var dropDBPromise = new Promise$1(function (resolve, reject) {
                        var req = idb.deleteDatabase(options.name);

                        req.onerror = function () {
                            var db = req.result;
                            if (db) {
                                db.close();
                            }
                            reject(req.error);
                        };

                        req.onblocked = function () {
                            // Closing all open connections in onversionchange handler should prevent this situation, but if
                            // we do get here, it just means the request remains pending - eventually it will succeed or error
                            console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                        };

                        req.onsuccess = function () {
                            var db = req.result;
                            if (db) {
                                db.close();
                            }
                            resolve(db);
                        };
                    });

                    return dropDBPromise.then(function (db) {
                        dbContext.db = db;
                        for (var i = 0; i < forages.length; i++) {
                            var _forage = forages[i];
                            _advanceReadiness(_forage._dbInfo);
                        }
                    })["catch"](function (err) {
                        (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                        throw err;
                    });
                });
            } else {
                promise = dbPromise.then(function (db) {
                    if (!db.objectStoreNames.contains(options.storeName)) {
                        return;
                    }

                    var newVersion = db.version + 1;

                    _deferReadiness(options);

                    var dbContext = dbContexts[options.name];
                    var forages = dbContext.forages;

                    db.close();
                    for (var i = 0; i < forages.length; i++) {
                        var forage = forages[i];
                        forage._dbInfo.db = null;
                        forage._dbInfo.version = newVersion;
                    }

                    var dropObjectPromise = new Promise$1(function (resolve, reject) {
                        var req = idb.open(options.name, newVersion);

                        req.onerror = function (err) {
                            var db = req.result;
                            db.close();
                            reject(err);
                        };

                        req.onupgradeneeded = function () {
                            var db = req.result;
                            db.deleteObjectStore(options.storeName);
                        };

                        req.onsuccess = function () {
                            var db = req.result;
                            db.close();
                            resolve(db);
                        };
                    });

                    return dropObjectPromise.then(function (db) {
                        dbContext.db = db;
                        for (var j = 0; j < forages.length; j++) {
                            var _forage2 = forages[j];
                            _forage2._dbInfo.db = db;
                            _advanceReadiness(_forage2._dbInfo);
                        }
                    })["catch"](function (err) {
                        (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                        throw err;
                    });
                });
            }
        }

        executeCallback(promise, callback);
        return promise;
    }

    var asyncStorage = {
        _driver: 'asyncStorage',
        _initStorage: _initStorage,
        _support: isIndexedDBValid(),
        iterate: iterate,
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        clear: clear,
        length: length,
        key: key,
        keys: keys,
        dropInstance: dropInstance
    };

    function isWebSQLValid() {
        return typeof openDatabase === 'function';
    }

    // Sadly, the best way to save binary data in WebSQL/localStorage is serializing
    // it to Base64, so this is how we store it to prevent very strange errors with less
    // verbose ways of binary <-> string data storage.
    var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    var BLOB_TYPE_PREFIX = '~~local_forage_type~';
    var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

    var SERIALIZED_MARKER = '__lfsc__:';
    var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

    // OMG the serializations!
    var TYPE_ARRAYBUFFER = 'arbf';
    var TYPE_BLOB = 'blob';
    var TYPE_INT8ARRAY = 'si08';
    var TYPE_UINT8ARRAY = 'ui08';
    var TYPE_UINT8CLAMPEDARRAY = 'uic8';
    var TYPE_INT16ARRAY = 'si16';
    var TYPE_INT32ARRAY = 'si32';
    var TYPE_UINT16ARRAY = 'ur16';
    var TYPE_UINT32ARRAY = 'ui32';
    var TYPE_FLOAT32ARRAY = 'fl32';
    var TYPE_FLOAT64ARRAY = 'fl64';
    var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

    var toString$1 = Object.prototype.toString;

    function stringToBuffer(serializedString) {
        // Fill the string into a ArrayBuffer.
        var bufferLength = serializedString.length * 0.75;
        var len = serializedString.length;
        var i;
        var p = 0;
        var encoded1, encoded2, encoded3, encoded4;

        if (serializedString[serializedString.length - 1] === '=') {
            bufferLength--;
            if (serializedString[serializedString.length - 2] === '=') {
                bufferLength--;
            }
        }

        var buffer = new ArrayBuffer(bufferLength);
        var bytes = new Uint8Array(buffer);

        for (i = 0; i < len; i += 4) {
            encoded1 = BASE_CHARS.indexOf(serializedString[i]);
            encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
            encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
            encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

            /*jslint bitwise: true */
            bytes[p++] = encoded1 << 2 | encoded2 >> 4;
            bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
            bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
        }
        return buffer;
    }

    // Converts a buffer to a string to store, serialized, in the backend
    // storage library.
    function bufferToString(buffer) {
        // base64-arraybuffer
        var bytes = new Uint8Array(buffer);
        var base64String = '';
        var i;

        for (i = 0; i < bytes.length; i += 3) {
            /*jslint bitwise: true */
            base64String += BASE_CHARS[bytes[i] >> 2];
            base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
            base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
            base64String += BASE_CHARS[bytes[i + 2] & 63];
        }

        if (bytes.length % 3 === 2) {
            base64String = base64String.substring(0, base64String.length - 1) + '=';
        } else if (bytes.length % 3 === 1) {
            base64String = base64String.substring(0, base64String.length - 2) + '==';
        }

        return base64String;
    }

    // Serialize a value, afterwards executing a callback (which usually
    // instructs the `setItem()` callback/promise to be executed). This is how
    // we store binary data with localStorage.
    function serialize(value, callback) {
        var valueType = '';
        if (value) {
            valueType = toString$1.call(value);
        }

        // Cannot use `value instanceof ArrayBuffer` or such here, as these
        // checks fail when running the tests using casper.js...
        //
        // TODO: See why those tests fail and use a better solution.
        if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
            // Convert binary arrays to a string and prefix the string with
            // a special marker.
            var buffer;
            var marker = SERIALIZED_MARKER;

            if (value instanceof ArrayBuffer) {
                buffer = value;
                marker += TYPE_ARRAYBUFFER;
            } else {
                buffer = value.buffer;

                if (valueType === '[object Int8Array]') {
                    marker += TYPE_INT8ARRAY;
                } else if (valueType === '[object Uint8Array]') {
                    marker += TYPE_UINT8ARRAY;
                } else if (valueType === '[object Uint8ClampedArray]') {
                    marker += TYPE_UINT8CLAMPEDARRAY;
                } else if (valueType === '[object Int16Array]') {
                    marker += TYPE_INT16ARRAY;
                } else if (valueType === '[object Uint16Array]') {
                    marker += TYPE_UINT16ARRAY;
                } else if (valueType === '[object Int32Array]') {
                    marker += TYPE_INT32ARRAY;
                } else if (valueType === '[object Uint32Array]') {
                    marker += TYPE_UINT32ARRAY;
                } else if (valueType === '[object Float32Array]') {
                    marker += TYPE_FLOAT32ARRAY;
                } else if (valueType === '[object Float64Array]') {
                    marker += TYPE_FLOAT64ARRAY;
                } else {
                    callback(new Error('Failed to get type for BinaryArray'));
                }
            }

            callback(marker + bufferToString(buffer));
        } else if (valueType === '[object Blob]') {
            // Conver the blob to a binaryArray and then to a string.
            var fileReader = new FileReader();

            fileReader.onload = function () {
                // Backwards-compatible prefix for the blob type.
                var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

                callback(SERIALIZED_MARKER + TYPE_BLOB + str);
            };

            fileReader.readAsArrayBuffer(value);
        } else {
            try {
                callback(JSON.stringify(value));
            } catch (e) {
                console.error("Couldn't convert value into a JSON string: ", value);

                callback(null, e);
            }
        }
    }

    // Deserialize data we've inserted into a value column/field. We place
    // special markers into our strings to mark them as encoded; this isn't
    // as nice as a meta field, but it's the only sane thing we can do whilst
    // keeping localStorage support intact.
    //
    // Oftentimes this will just deserialize JSON content, but if we have a
    // special marker (SERIALIZED_MARKER, defined above), we will extract
    // some kind of arraybuffer/binary data/typed array out of the string.
    function deserialize(value) {
        // If we haven't marked this string as being specially serialized (i.e.
        // something other than serialized JSON), we can just return it and be
        // done with it.
        if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
            return JSON.parse(value);
        }

        // The following code deals with deserializing some kind of Blob or
        // TypedArray. First we separate out the type of data we're dealing
        // with from the data itself.
        var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
        var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

        var blobType;
        // Backwards-compatible blob type serialization strategy.
        // DBs created with older versions of localForage will simply not have the blob type.
        if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
            var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
            blobType = matcher[1];
            serializedString = serializedString.substring(matcher[0].length);
        }
        var buffer = stringToBuffer(serializedString);

        // Return the right type based on the code/type set during
        // serialization.
        switch (type) {
            case TYPE_ARRAYBUFFER:
                return buffer;
            case TYPE_BLOB:
                return createBlob([buffer], { type: blobType });
            case TYPE_INT8ARRAY:
                return new Int8Array(buffer);
            case TYPE_UINT8ARRAY:
                return new Uint8Array(buffer);
            case TYPE_UINT8CLAMPEDARRAY:
                return new Uint8ClampedArray(buffer);
            case TYPE_INT16ARRAY:
                return new Int16Array(buffer);
            case TYPE_UINT16ARRAY:
                return new Uint16Array(buffer);
            case TYPE_INT32ARRAY:
                return new Int32Array(buffer);
            case TYPE_UINT32ARRAY:
                return new Uint32Array(buffer);
            case TYPE_FLOAT32ARRAY:
                return new Float32Array(buffer);
            case TYPE_FLOAT64ARRAY:
                return new Float64Array(buffer);
            default:
                throw new Error('Unkown type: ' + type);
        }
    }

    var localforageSerializer = {
        serialize: serialize,
        deserialize: deserialize,
        stringToBuffer: stringToBuffer,
        bufferToString: bufferToString
    };

    /*
     * Includes code from:
     *
     * base64-arraybuffer
     * https://github.com/niklasvh/base64-arraybuffer
     *
     * Copyright (c) 2012 Niklas von Hertzen
     * Licensed under the MIT license.
     */

    function createDbTable(t, dbInfo, callback, errorCallback) {
        t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
    }

    // Open the WebSQL database (automatically creates one if one didn't
    // previously exist), using any options set in the config.
    function _initStorage$1(options) {
        var self = this;
        var dbInfo = {
            db: null
        };

        if (options) {
            for (var i in options) {
                dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
            }
        }

        var dbInfoPromise = new Promise$1(function (resolve, reject) {
            // Open the database; the openDatabase API will automatically
            // create it for us if it doesn't exist.
            try {
                dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
            } catch (e) {
                return reject(e);
            }

            // Create our key/value table if it doesn't exist.
            dbInfo.db.transaction(function (t) {
                createDbTable(t, dbInfo, function () {
                    self._dbInfo = dbInfo;
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            }, reject);
        });

        dbInfo.serializer = localforageSerializer;
        return dbInfoPromise;
    }

    function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
        t.executeSql(sqlStatement, args, callback, function (t, error) {
            if (error.code === error.SYNTAX_ERR) {
                t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                    if (!results.rows.length) {
                        // if the table is missing (was deleted)
                        // re-create it table and retry
                        createDbTable(t, dbInfo, function () {
                            t.executeSql(sqlStatement, args, callback, errorCallback);
                        }, errorCallback);
                    } else {
                        errorCallback(t, error);
                    }
                }, errorCallback);
            } else {
                errorCallback(t, error);
            }
        }, errorCallback);
    }

    function getItem$1(key, callback) {
        var self = this;

        key = normalizeKey(key);

        var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                    tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                        var result = results.rows.length ? results.rows.item(0).value : null;

                        // Check to see if this is serialized content we need to
                        // unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        resolve(result);
                    }, function (t, error) {
                        reject(error);
                    });
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function iterate$1(iterator, callback) {
        var self = this;

        var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
                var dbInfo = self._dbInfo;

                dbInfo.db.transaction(function (t) {
                    tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                        var rows = results.rows;
                        var length = rows.length;

                        for (var i = 0; i < length; i++) {
                            var item = rows.item(i);
                            var result = item.value;

                            // Check to see if this is serialized content
                            // we need to unpack.
                            if (result) {
                                result = dbInfo.serializer.deserialize(result);
                            }

                            result = iterator(result, item.key, i + 1);

                            // void(0) prevents problems with redefinition
                            // of `undefined`.
                            if (result !== void 0) {
                                resolve(result);
                                return;
                            }
                        }

                        resolve();
                    }, function (t, error) {
                        reject(error);
                    });
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function _setItem(key, value, callback, retriesLeft) {
        var self = this;

        key = normalizeKey(key);

        var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
                // The localStorage API doesn't return undefined values in an
                // "expected" way, so undefined is always cast to null in all
                // drivers. See: https://github.com/mozilla/localForage/pull/42
                if (value === undefined) {
                    value = null;
                }

                // Save the original value to pass to the callback.
                var originalValue = value;

                var dbInfo = self._dbInfo;
                dbInfo.serializer.serialize(value, function (value, error) {
                    if (error) {
                        reject(error);
                    } else {
                        dbInfo.db.transaction(function (t) {
                            tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                                resolve(originalValue);
                            }, function (t, error) {
                                reject(error);
                            });
                        }, function (sqlError) {
                            // The transaction failed; check
                            // to see if it's a quota error.
                            if (sqlError.code === sqlError.QUOTA_ERR) {
                                // We reject the callback outright for now, but
                                // it's worth trying to re-run the transaction.
                                // Even if the user accepts the prompt to use
                                // more storage on Safari, this error will
                                // be called.
                                //
                                // Try to re-run the transaction.
                                if (retriesLeft > 0) {
                                    resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                    return;
                                }
                                reject(sqlError);
                            }
                        });
                    }
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function setItem$1(key, value, callback) {
        return _setItem.apply(this, [key, value, callback, 1]);
    }

    function removeItem$1(key, callback) {
        var self = this;

        key = normalizeKey(key);

        var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                    tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                        resolve();
                    }, function (t, error) {
                        reject(error);
                    });
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Deletes every item in the table.
    // TODO: Find out if this resets the AUTO_INCREMENT number.
    function clear$1(callback) {
        var self = this;

        var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                    tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                        resolve();
                    }, function (t, error) {
                        reject(error);
                    });
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Does a simple `COUNT(key)` to get the number of items stored in
    // localForage.
    function length$1(callback) {
        var self = this;

        var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                    // Ahhh, SQL makes this one soooooo easy.
                    tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                        var result = results.rows.item(0).c;
                        resolve(result);
                    }, function (t, error) {
                        reject(error);
                    });
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Return the key located at key index X; essentially gets the key from a
    // `WHERE id = ?`. This is the most efficient way I can think to implement
    // this rarely-used (in my experience) part of the API, but it can seem
    // inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
    // the ID of each key will change every time it's updated. Perhaps a stored
    // procedure for the `setItem()` SQL would solve this problem?
    // TODO: Don't change ID on `setItem()`.
    function key$1(n, callback) {
        var self = this;

        var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                    tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                        var result = results.rows.length ? results.rows.item(0).key : null;
                        resolve(result);
                    }, function (t, error) {
                        reject(error);
                    });
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    function keys$1(callback) {
        var self = this;

        var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                    tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                        var keys = [];

                        for (var i = 0; i < results.rows.length; i++) {
                            keys.push(results.rows.item(i).key);
                        }

                        resolve(keys);
                    }, function (t, error) {
                        reject(error);
                    });
                });
            })["catch"](reject);
        });

        executeCallback(promise, callback);
        return promise;
    }

    // https://www.w3.org/TR/webdatabase/#databases
    // > There is no way to enumerate or delete the databases available for an origin from this API.
    function getAllStoreNames(db) {
        return new Promise$1(function (resolve, reject) {
            db.transaction(function (t) {
                t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                    var storeNames = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        storeNames.push(results.rows.item(i).name);
                    }

                    resolve({
                        db: db,
                        storeNames: storeNames
                    });
                }, function (t, error) {
                    reject(error);
                });
            }, function (sqlError) {
                reject(sqlError);
            });
        });
    }

    function dropInstance$1(options, callback) {
        callback = getCallback.apply(this, arguments);

        var currentConfig = this.config();
        options = typeof options !== 'function' && options || {};
        if (!options.name) {
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
        }

        var self = this;
        var promise;
        if (!options.name) {
            promise = Promise$1.reject('Invalid arguments');
        } else {
            promise = new Promise$1(function (resolve) {
                var db;
                if (options.name === currentConfig.name) {
                    // use the db reference of the current instance
                    db = self._dbInfo.db;
                } else {
                    db = openDatabase(options.name, '', '', 0);
                }

                if (!options.storeName) {
                    // drop all database tables
                    resolve(getAllStoreNames(db));
                } else {
                    resolve({
                        db: db,
                        storeNames: [options.storeName]
                    });
                }
            }).then(function (operationInfo) {
                return new Promise$1(function (resolve, reject) {
                    operationInfo.db.transaction(function (t) {
                        function dropTable(storeName) {
                            return new Promise$1(function (resolve, reject) {
                                t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                                    resolve();
                                }, function (t, error) {
                                    reject(error);
                                });
                            });
                        }

                        var operations = [];
                        for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                            operations.push(dropTable(operationInfo.storeNames[i]));
                        }

                        Promise$1.all(operations).then(function () {
                            resolve();
                        })["catch"](function (e) {
                            reject(e);
                        });
                    }, function (sqlError) {
                        reject(sqlError);
                    });
                });
            });
        }

        executeCallback(promise, callback);
        return promise;
    }

    var webSQLStorage = {
        _driver: 'webSQLStorage',
        _initStorage: _initStorage$1,
        _support: isWebSQLValid(),
        iterate: iterate$1,
        getItem: getItem$1,
        setItem: setItem$1,
        removeItem: removeItem$1,
        clear: clear$1,
        length: length$1,
        key: key$1,
        keys: keys$1,
        dropInstance: dropInstance$1
    };

    function isLocalStorageValid() {
        try {
            return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
            // in IE8 typeof localStorage.setItem === 'object'
            !!localStorage.setItem;
        } catch (e) {
            return false;
        }
    }

    function _getKeyPrefix(options, defaultConfig) {
        var keyPrefix = options.name + '/';

        if (options.storeName !== defaultConfig.storeName) {
            keyPrefix += options.storeName + '/';
        }
        return keyPrefix;
    }

    // Check if localStorage throws when saving an item
    function checkIfLocalStorageThrows() {
        var localStorageTestKey = '_localforage_support_test';

        try {
            localStorage.setItem(localStorageTestKey, true);
            localStorage.removeItem(localStorageTestKey);

            return false;
        } catch (e) {
            return true;
        }
    }

    // Check if localStorage is usable and allows to save an item
    // This method checks if localStorage is usable in Safari Private Browsing
    // mode, or in any other case where the available quota for localStorage
    // is 0 and there wasn't any saved items yet.
    function _isLocalStorageUsable() {
        return !checkIfLocalStorageThrows() || localStorage.length > 0;
    }

    // Config the localStorage backend, using options set in the config.
    function _initStorage$2(options) {
        var self = this;
        var dbInfo = {};
        if (options) {
            for (var i in options) {
                dbInfo[i] = options[i];
            }
        }

        dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

        if (!_isLocalStorageUsable()) {
            return Promise$1.reject();
        }

        self._dbInfo = dbInfo;
        dbInfo.serializer = localforageSerializer;

        return Promise$1.resolve();
    }

    // Remove all keys from the datastore, effectively destroying all data in
    // the app's key/value store!
    function clear$2(callback) {
        var self = this;
        var promise = self.ready().then(function () {
            var keyPrefix = self._dbInfo.keyPrefix;

            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                }
            }
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Retrieve an item from the store. Unlike the original async_storage
    // library in Gaia, we don't modify return values at all. If a key's value
    // is `undefined`, we pass that value to the callback function.
    function getItem$2(key, callback) {
        var self = this;

        key = normalizeKey(key);

        var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var result = localStorage.getItem(dbInfo.keyPrefix + key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the key
            // is likely undefined and we'll pass it straight to the
            // callback.
            if (result) {
                result = dbInfo.serializer.deserialize(result);
            }

            return result;
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Iterate over all items in the store.
    function iterate$2(iterator, callback) {
        var self = this;

        var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var keyPrefix = dbInfo.keyPrefix;
            var keyPrefixLength = keyPrefix.length;
            var length = localStorage.length;

            // We use a dedicated iterator instead of the `i` variable below
            // so other keys we fetch in localStorage aren't counted in
            // the `iterationNumber` argument passed to the `iterate()`
            // callback.
            //
            // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
            var iterationNumber = 1;

            for (var i = 0; i < length; i++) {
                var key = localStorage.key(i);
                if (key.indexOf(keyPrefix) !== 0) {
                    continue;
                }
                var value = localStorage.getItem(key);

                // If a result was found, parse it from the serialized
                // string into a JS object. If result isn't truthy, the
                // key is likely undefined and we'll pass it straight
                // to the iterator.
                if (value) {
                    value = dbInfo.serializer.deserialize(value);
                }

                value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

                if (value !== void 0) {
                    return value;
                }
            }
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Same as localStorage's key() method, except takes a callback.
    function key$2(n, callback) {
        var self = this;
        var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var result;
            try {
                result = localStorage.key(n);
            } catch (error) {
                result = null;
            }

            // Remove the prefix from the key, if a key is found.
            if (result) {
                result = result.substring(dbInfo.keyPrefix.length);
            }

            return result;
        });

        executeCallback(promise, callback);
        return promise;
    }

    function keys$2(callback) {
        var self = this;
        var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var length = localStorage.length;
            var keys = [];

            for (var i = 0; i < length; i++) {
                var itemKey = localStorage.key(i);
                if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                    keys.push(itemKey.substring(dbInfo.keyPrefix.length));
                }
            }

            return keys;
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Supply the number of keys in the datastore to the callback function.
    function length$2(callback) {
        var self = this;
        var promise = self.keys().then(function (keys) {
            return keys.length;
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Remove an item from the store, nice and simple.
    function removeItem$2(key, callback) {
        var self = this;

        key = normalizeKey(key);

        var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            localStorage.removeItem(dbInfo.keyPrefix + key);
        });

        executeCallback(promise, callback);
        return promise;
    }

    // Set a key's value and run an optional callback once the value is set.
    // Unlike Gaia's implementation, the callback function is passed the value,
    // in case you want to operate on that value only after you're sure it
    // saved, or something like that.
    function setItem$2(key, value, callback) {
        var self = this;

        key = normalizeKey(key);

        var promise = self.ready().then(function () {
            // Convert undefined values to null.
            // https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            return new Promise$1(function (resolve, reject) {
                var dbInfo = self._dbInfo;
                dbInfo.serializer.serialize(value, function (value, error) {
                    if (error) {
                        reject(error);
                    } else {
                        try {
                            localStorage.setItem(dbInfo.keyPrefix + key, value);
                            resolve(originalValue);
                        } catch (e) {
                            // localStorage capacity exceeded.
                            // TODO: Make this a specific error/event.
                            if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                                reject(e);
                            }
                            reject(e);
                        }
                    }
                });
            });
        });

        executeCallback(promise, callback);
        return promise;
    }

    function dropInstance$2(options, callback) {
        callback = getCallback.apply(this, arguments);

        options = typeof options !== 'function' && options || {};
        if (!options.name) {
            var currentConfig = this.config();
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
        }

        var self = this;
        var promise;
        if (!options.name) {
            promise = Promise$1.reject('Invalid arguments');
        } else {
            promise = new Promise$1(function (resolve) {
                if (!options.storeName) {
                    resolve(options.name + '/');
                } else {
                    resolve(_getKeyPrefix(options, self._defaultConfig));
                }
            }).then(function (keyPrefix) {
                for (var i = localStorage.length - 1; i >= 0; i--) {
                    var key = localStorage.key(i);

                    if (key.indexOf(keyPrefix) === 0) {
                        localStorage.removeItem(key);
                    }
                }
            });
        }

        executeCallback(promise, callback);
        return promise;
    }

    var localStorageWrapper = {
        _driver: 'localStorageWrapper',
        _initStorage: _initStorage$2,
        _support: isLocalStorageValid(),
        iterate: iterate$2,
        getItem: getItem$2,
        setItem: setItem$2,
        removeItem: removeItem$2,
        clear: clear$2,
        length: length$2,
        key: key$2,
        keys: keys$2,
        dropInstance: dropInstance$2
    };

    var sameValue = function sameValue(x, y) {
        return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
    };

    var includes = function includes(array, searchElement) {
        var len = array.length;
        var i = 0;
        while (i < len) {
            if (sameValue(array[i], searchElement)) {
                return true;
            }
            i++;
        }

        return false;
    };

    var isArray = Array.isArray || function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };

    // Drivers are stored here when `defineDriver()` is called.
    // They are shared across all instances of localForage.
    var DefinedDrivers = {};

    var DriverSupport = {};

    var DefaultDrivers = {
        INDEXEDDB: asyncStorage,
        WEBSQL: webSQLStorage,
        LOCALSTORAGE: localStorageWrapper
    };

    var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

    var OptionalDriverMethods = ['dropInstance'];

    var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

    var DefaultConfig = {
        description: '',
        driver: DefaultDriverOrder.slice(),
        name: 'localforage',
        // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
        // we can use without a prompt.
        size: 4980736,
        storeName: 'keyvaluepairs',
        version: 1.0
    };

    function callWhenReady(localForageInstance, libraryMethod) {
        localForageInstance[libraryMethod] = function () {
            var _args = arguments;
            return localForageInstance.ready().then(function () {
                return localForageInstance[libraryMethod].apply(localForageInstance, _args);
            });
        };
    }

    function extend() {
        for (var i = 1; i < arguments.length; i++) {
            var arg = arguments[i];

            if (arg) {
                for (var _key in arg) {
                    if (arg.hasOwnProperty(_key)) {
                        if (isArray(arg[_key])) {
                            arguments[0][_key] = arg[_key].slice();
                        } else {
                            arguments[0][_key] = arg[_key];
                        }
                    }
                }
            }
        }

        return arguments[0];
    }

    var LocalForage = function () {
        function LocalForage(options) {
            _classCallCheck(this, LocalForage);

            for (var driverTypeKey in DefaultDrivers) {
                if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                    var driver = DefaultDrivers[driverTypeKey];
                    var driverName = driver._driver;
                    this[driverTypeKey] = driverName;

                    if (!DefinedDrivers[driverName]) {
                        // we don't need to wait for the promise,
                        // since the default drivers can be defined
                        // in a blocking manner
                        this.defineDriver(driver);
                    }
                }
            }

            this._defaultConfig = extend({}, DefaultConfig);
            this._config = extend({}, this._defaultConfig, options);
            this._driverSet = null;
            this._initDriver = null;
            this._ready = false;
            this._dbInfo = null;

            this._wrapLibraryMethodsWithReady();
            this.setDriver(this._config.driver)["catch"](function () {});
        }

        // Set any config values for localForage; can be called anytime before
        // the first API call (e.g. `getItem`, `setItem`).
        // We loop through options so we don't overwrite existing config
        // values.


        LocalForage.prototype.config = function config(options) {
            // If the options argument is an object, we use it to set values.
            // Otherwise, we return either a specified config value or all
            // config values.
            if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
                // If localforage is ready and fully initialized, we can't set
                // any new configuration values. Instead, we return an error.
                if (this._ready) {
                    return new Error("Can't call config() after localforage " + 'has been used.');
                }

                for (var i in options) {
                    if (i === 'storeName') {
                        options[i] = options[i].replace(/\W/g, '_');
                    }

                    if (i === 'version' && typeof options[i] !== 'number') {
                        return new Error('Database version must be a number.');
                    }

                    this._config[i] = options[i];
                }

                // after all config options are set and
                // the driver option is used, try setting it
                if ('driver' in options && options.driver) {
                    return this.setDriver(this._config.driver);
                }

                return true;
            } else if (typeof options === 'string') {
                return this._config[options];
            } else {
                return this._config;
            }
        };

        // Used to define a custom driver, shared across all instances of
        // localForage.


        LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
            var promise = new Promise$1(function (resolve, reject) {
                try {
                    var driverName = driverObject._driver;
                    var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                    // A driver name should be defined and not overlap with the
                    // library-defined, default drivers.
                    if (!driverObject._driver) {
                        reject(complianceError);
                        return;
                    }

                    var driverMethods = LibraryMethods.concat('_initStorage');
                    for (var i = 0, len = driverMethods.length; i < len; i++) {
                        var driverMethodName = driverMethods[i];

                        // when the property is there,
                        // it should be a method even when optional
                        var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                        if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                            reject(complianceError);
                            return;
                        }
                    }

                    var configureMissingMethods = function configureMissingMethods() {
                        var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                            return function () {
                                var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                                var promise = Promise$1.reject(error);
                                executeCallback(promise, arguments[arguments.length - 1]);
                                return promise;
                            };
                        };

                        for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                            var optionalDriverMethod = OptionalDriverMethods[_i];
                            if (!driverObject[optionalDriverMethod]) {
                                driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                            }
                        }
                    };

                    configureMissingMethods();

                    var setDriverSupport = function setDriverSupport(support) {
                        if (DefinedDrivers[driverName]) {
                            console.info('Redefining LocalForage driver: ' + driverName);
                        }
                        DefinedDrivers[driverName] = driverObject;
                        DriverSupport[driverName] = support;
                        // don't use a then, so that we can define
                        // drivers that have simple _support methods
                        // in a blocking manner
                        resolve();
                    };

                    if ('_support' in driverObject) {
                        if (driverObject._support && typeof driverObject._support === 'function') {
                            driverObject._support().then(setDriverSupport, reject);
                        } else {
                            setDriverSupport(!!driverObject._support);
                        }
                    } else {
                        setDriverSupport(true);
                    }
                } catch (e) {
                    reject(e);
                }
            });

            executeTwoCallbacks(promise, callback, errorCallback);
            return promise;
        };

        LocalForage.prototype.driver = function driver() {
            return this._driver || null;
        };

        LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
            var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

            executeTwoCallbacks(getDriverPromise, callback, errorCallback);
            return getDriverPromise;
        };

        LocalForage.prototype.getSerializer = function getSerializer(callback) {
            var serializerPromise = Promise$1.resolve(localforageSerializer);
            executeTwoCallbacks(serializerPromise, callback);
            return serializerPromise;
        };

        LocalForage.prototype.ready = function ready(callback) {
            var self = this;

            var promise = self._driverSet.then(function () {
                if (self._ready === null) {
                    self._ready = self._initDriver();
                }

                return self._ready;
            });

            executeTwoCallbacks(promise, callback, callback);
            return promise;
        };

        LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
            var self = this;

            if (!isArray(drivers)) {
                drivers = [drivers];
            }

            var supportedDrivers = this._getSupportedDrivers(drivers);

            function setDriverToConfig() {
                self._config.driver = self.driver();
            }

            function extendSelfWithDriver(driver) {
                self._extend(driver);
                setDriverToConfig();

                self._ready = self._initStorage(self._config);
                return self._ready;
            }

            function initDriver(supportedDrivers) {
                return function () {
                    var currentDriverIndex = 0;

                    function driverPromiseLoop() {
                        while (currentDriverIndex < supportedDrivers.length) {
                            var driverName = supportedDrivers[currentDriverIndex];
                            currentDriverIndex++;

                            self._dbInfo = null;
                            self._ready = null;

                            return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                        }

                        setDriverToConfig();
                        var error = new Error('No available storage method found.');
                        self._driverSet = Promise$1.reject(error);
                        return self._driverSet;
                    }

                    return driverPromiseLoop();
                };
            }

            // There might be a driver initialization in progress
            // so wait for it to finish in order to avoid a possible
            // race condition to set _dbInfo
            var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
                return Promise$1.resolve();
            }) : Promise$1.resolve();

            this._driverSet = oldDriverSetDone.then(function () {
                var driverName = supportedDrivers[0];
                self._dbInfo = null;
                self._ready = null;

                return self.getDriver(driverName).then(function (driver) {
                    self._driver = driver._driver;
                    setDriverToConfig();
                    self._wrapLibraryMethodsWithReady();
                    self._initDriver = initDriver(supportedDrivers);
                });
            })["catch"](function () {
                setDriverToConfig();
                var error = new Error('No available storage method found.');
                self._driverSet = Promise$1.reject(error);
                return self._driverSet;
            });

            executeTwoCallbacks(this._driverSet, callback, errorCallback);
            return this._driverSet;
        };

        LocalForage.prototype.supports = function supports(driverName) {
            return !!DriverSupport[driverName];
        };

        LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
            extend(this, libraryMethodsAndProperties);
        };

        LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
            var supportedDrivers = [];
            for (var i = 0, len = drivers.length; i < len; i++) {
                var driverName = drivers[i];
                if (this.supports(driverName)) {
                    supportedDrivers.push(driverName);
                }
            }
            return supportedDrivers;
        };

        LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
            // Add a stub for each driver API method that delays the call to the
            // corresponding driver method until localForage is ready. These stubs
            // will be replaced by the driver methods as soon as the driver is
            // loaded, so there is no performance impact.
            for (var i = 0, len = LibraryMethods.length; i < len; i++) {
                callWhenReady(this, LibraryMethods[i]);
            }
        };

        LocalForage.prototype.createInstance = function createInstance(options) {
            return new LocalForage(options);
        };

        return LocalForage;
    }();

    // The actual localForage object that we expose as a module or via a
    // global. It's extended by pulling in one of our other libraries.


    var localforage_js = new LocalForage();

    module.exports = localforage_js;

    },{"3":3}]},{},[4])(4)
    });
    }(localforage$1));

    var localforage = localforage$1.exports;

    var PROJECT_ID_NYPH = 2;
    var NyphApp = /*#__PURE__*/function (_App) {
      _inherits(NyphApp, _App);

      var _super = _createSuper(NyphApp);

      function NyphApp() {
        var _this;

        _classCallCheck(this, NyphApp);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));

        _defineProperty(_assertThisInitialized(_this), "projectId", PROJECT_ID_NYPH);

        return _this;
      }

      _createClass(NyphApp, [{
        key: "addSurvey",
        value:
        /**
         *
         * @param {Survey} survey
         */
        function addSurvey(survey) {
          var _this2 = this;

          if (survey.projectId !== this.projectId) {
            throw new Error("Survey project id '".concat(survey.projectId, " does not match with current project ('").concat(this.projectId, "')"));
          }

          if (!this.surveys.has(survey.id)) {
            console.log("setting survey's modified/save handler");
            survey.addListener(Ly.EVENT_MODIFIED, this, function (survey) {
              _this2.fireEvent(jy.EVENT_SURVEYS_CHANGED);

              return survey.save();
            });
          }

          this.surveys.set(survey.id, survey);
          this.fireEvent(jy.EVENT_SURVEYS_CHANGED);
        }
        /**
         * tests whether occurrences have been defined, excluding any that have been deleted
         *
         * @returns {boolean}
         */

      }, {
        key: "haveExtantOccurrences",
        value: function haveExtantOccurrences() {
          var _iterator = _createForOfIteratorHelper(this.occurrences),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var occurrence = _step.value;

              if (!occurrence.deleted) {
                return true;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          return false;
        }
        /**
         *
         * @param {Occurrence} occurrence
         */

      }, {
        key: "addOccurrence",
        value: function addOccurrence(occurrence) {
          var _this3 = this;

          if (!occurrence.surveyId) {
            throw new Cv('Survey id must set prior to registering occurrence.');
          }

          if (this.occurrences.size === 0) {
            // this is the first occurrence added, set the survey creation stamp to match
            // this avoids anomalies where a 'stale' survey created when the form was first opened but not used sits around
            // for a protracted period
            var survey = this.surveys.get(occurrence.surveyId);
            survey.createdStamp = occurrence.createdStamp;
          }

          this.occurrences.set(occurrence.id, occurrence);
          occurrence.addListener(wv.EVENT_MODIFIED, this, function (occurrence) {
            var survey = _this3.surveys.get(occurrence.surveyId);

            if (!survey) {
              throw new Error("Failed to look up survey id ".concat(occurrence.surveyId));
            } else {
              // need to ensure that currentSurvey is saved before occurrence
              // rather than using a promise chain here, instead rely on enforced queuing of post requests in Model
              // otherwise there are problems with queue-jumping (e.g. when an image needs to be saved after both previous requests)
              if (survey.unsaved()) {
                survey.save();
              }

              occurrence.save(survey.id);
            }
          });
        }
        /**
         * attempts to refresh the state of local storage for the specified survey ids
         * if fetch fails then return a failed promise
         *
         * updates local copy of surveys and occurrences
         *
         * no service worker interception of this call - passed through and not cached
         *
         * @param {Array.<string>} surveyIds
         * @return {Promise}
         */

      }, {
        key: "refreshFromServer",
        value: function refreshFromServer(surveyIds) {
          var _this4 = this;

          var formData = new FormData();
          var n = 0;

          var _iterator2 = _createForOfIteratorHelper(surveyIds),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var key = _step2.value;
              formData.append("surveyId[".concat(n++, "]"), key);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          return fetch(NyphApp.LOAD_SURVEYS_ENDPOINT, {
            method: 'POST',
            body: formData
          }).then(function (response) {
            if (response.ok) {
              return response.json();
            } else {
              return Promise.reject("Invalid response from server when refreshing survey ids");
            }
          }).then(function (jsonResponse) {
            /** @param {{survey : Array.<object>, occurrence: Array.<object>, image: Array.<object>}} jsonResponse */
            console.log({
              'refresh from server json response': jsonResponse
            }); // if external objects newer than local version then place in local storage

            var promises = [];

            for (var type in jsonResponse) {
              if (jsonResponse.hasOwnProperty(type)) {
                var _iterator3 = _createForOfIteratorHelper(jsonResponse[type]),
                    _step3;

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    var object = _step3.value;
                    promises.push(_this4._conditionallyReplaceObject(object));
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              }
            }

            return Promise.all(promises);
          });
        }
        /**
         * compare modified stamp of indexeddb and external objects and write external version locally if more recent
         *
         * @param {{id : string, type : string, modified : number, created : number, saveState : string, deleted : boolean}} externalVersion
         * @returns {Promise}
         * @private
         */

      }, {
        key: "_conditionallyReplaceObject",
        value: function _conditionallyReplaceObject(externalVersion) {
          var objectType = externalVersion.type;
          var id = externalVersion.id;
          var key = "".concat(objectType, ".").concat(id);
          return localforage.getItem(key).then(function (localVersion) {
            if (localVersion) {
              // compare stamps
              // if (externalVersion.deleted) {
              //     // if the external copy is deleted then remove the local copy
              //     return localforage.removeItem(key);
              // }
              if (!externalVersion.deleted && localVersion.modified >= externalVersion.modified) {
                console.log("Local copy of ".concat(key, " is the same or newer than the server copy. (").concat(localVersion.modified, " >= ").concat(externalVersion.modified, ") "));
                return Promise.resolve();
              }
            } // no local copy or stale copy
            // so store response locally


            console.log("Adding or replacing local copy of ".concat(key));
            return localforage.setItem(key, externalVersion);
          });
        }
        /**
         * retrieve the full set of keys from local storage (IndexedDb)
         *
         * @param {{survey: Array.<string>, occurrence : Array.<string>, image: Array.<string>}} storedObjectKeys
         * @returns {Promise}
         */

      }, {
        key: "seekKeys",
        value: function seekKeys(storedObjectKeys) {
          return localforage.keys().then(function (keys) {
            var _iterator4 = _createForOfIteratorHelper(keys),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var key = _step4.value;
                var type = void 0,
                    id = void 0;

                var _key$split = key.split('.', 2);

                var _key$split2 = _slicedToArray(_key$split, 2);

                type = _key$split2[0];
                id = _key$split2[1];

                if (storedObjectKeys.hasOwnProperty(type)) {
                  if (!storedObjectKeys[type].includes(id)) {
                    storedObjectKeys[type].push(id);
                  }
                } else {
                  console.log("Unrecognised stored key type '".concat(type, "."));
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }

            return storedObjectKeys;
          });
        }
        /**
         * @returns {Promise}
         */

      }, {
        key: "syncAll",
        value: function syncAll() {
          var _this5 = this;

          var storedObjectKeys = {
            survey: [],
            occurrence: [],
            image: []
          };
          return this.seekKeys(storedObjectKeys).then(function (storedObjectKeys) {
            return _this5._syncLocalUnsaved(storedObjectKeys);
          }, function (failedResult) {
            console.log("Failed to sync all: ".concat(failedResult));
          });
        }
        /**
         *
         * @param storedObjectKeys
         * @returns {Promise}
         * @private
         */

      }, {
        key: "_syncLocalUnsaved",
        value: function _syncLocalUnsaved(storedObjectKeys) {
          // syncs surveys first, then occurrences, then images from indexedDb
          var promises = [];

          var _iterator5 = _createForOfIteratorHelper(storedObjectKeys.survey),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var surveyKey = _step5.value;
              promises.push(Ly.retrieveFromLocal(surveyKey, new Ly()).then(function (survey) {
                if (survey.unsaved()) {
                  return survey.save();
                }
              }));
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          var _iterator6 = _createForOfIteratorHelper(storedObjectKeys.occurrence),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var occurrenceKey = _step6.value;
              promises.push(wv.retrieveFromLocal(occurrenceKey, new wv()).then(function (occurrence) {
                if (occurrence.unsaved()) {
                  return occurrence.save();
                }
              }));
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          var _iterator7 = _createForOfIteratorHelper(storedObjectKeys.image),
              _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var imageKey = _step7.value;
              promises.push(Hy.retrieveFromLocal(imageKey, new Hy()).then(function (image) {
                if (image.unsaved()) {
                  return image.save();
                }
              }));
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }

          return Promise.all(promises).catch(function (result) {
            console.log("Save failure: ".concat(result));
          });
        }
        /**
         * restore previous state, pulling back from local and external store
         * @todo this needs a save phase, so that local changes are saved back to the server
         *
         * @param {string} [targetSurveyId] if specified then select this id as the current survey
         * @return {Promise}
         */

      }, {
        key: "restoreOccurrences",
        value: function restoreOccurrences(targetSurveyId) {
          var _this6 = this;

          // need to check for a special case where restoring a survey that has never been saved even locally
          // i.e. new and unmodified
          // only present in current App.surveys
          // this occurs if user creates a new survey, makes no changes, switches away from it then switches back
          if (this.surveys.has(targetSurveyId)) {
            var localSurvey = this.surveys.get(targetSurveyId);

            if (localSurvey.isPristine) {
              this.currentSurvey = localSurvey;
              this.fireEvent(jy.EVENT_SURVEYS_CHANGED); // current survey should be set now, so menu needs refresh

              return Promise.resolve();
            }
          }

          var storedObjectKeys = {
            survey: [],
            occurrence: [],
            image: []
          };

          if (targetSurveyId) {
            storedObjectKeys.survey[0] = targetSurveyId;
          }

          return this.seekKeys(storedObjectKeys).then(function (storedObjectKeys) {
            if (storedObjectKeys.survey.length) {
              return _this6.refreshFromServer(storedObjectKeys.survey).finally(function () {
                // re-seek keys from indexed db, to take account of any new occurrences received from the server
                return _this6.seekKeys(storedObjectKeys);
              });
            } else {
              return null;
            }
          }).finally(function () {
            // called regardless of whether a server refresh was successful
            // storedObjectKeys and indexed db should be as up-to-date as possible
            if (storedObjectKeys.survey.length) {
              // arbitrarily set first survey key as current
              // this will be the specified targetSurveyId if that was set
              return _this6._restoreSurveyFromLocal(storedObjectKeys.survey[0], storedObjectKeys).finally(function () {
                _this6.currentSurvey = _this6.surveys.get(storedObjectKeys.survey[0]);

                if (!_this6.currentSurvey) {
                  // survey doesn't actually exist
                  // this could have happened in an invalid survey id was provided as a targetSurveyId
                  console.log("Failed to retrieve survey id '".concat(targetSurveyId, "'"));
                  return Promise.reject(new Error("Failed to retrieve survey id '".concat(targetSurveyId, "'")));
                }

                if (_this6.currentSurvey.deleted) {
                  // unusual case where survey is deleted
                  // substitute a new one
                  // this should probably never happen, as items deleted on the server ought to have been
                  // removed locally
                  _this6.setNewSurvey();
                } else {
                  _this6.fireEvent(jy.EVENT_SURVEYS_CHANGED); // current survey should be set now, so menu needs refresh

                }

                return Promise.resolve();
              });
            } else {
              // no pre-existing surveys, so create a new one
              _this6.setNewSurvey();

              return Promise.resolve();
            }
          });
        }
      }, {
        key: "setNewSurvey",
        value: function setNewSurvey() {
          this.currentSurvey = new Ly();
          this.currentSurvey.projectId = this.projectId;
          this.currentSurvey.isPristine = true;
          this.addSurvey(this.currentSurvey);
        }
        /**
         * @return {Occurrence}
         */

      }, {
        key: "addNewOccurrence",
        value: function addNewOccurrence() {
          var occurrence = new wv();
          occurrence.surveyId = this.currentSurvey.id;
          occurrence.projectId = this.projectId;
          occurrence.isNew = true;
          occurrence.isPristine = true;
          this.addOccurrence(occurrence);
          this.fireEvent(NyphApp.EVENT_OCCURRENCE_ADDED, {
            occurrenceId: occurrence.id,
            surveyId: occurrence.surveyId
          });
          return occurrence;
        }
        /**
         *
         * @param surveyId
         * @param storedObjectKeys
         * @returns {Promise}
         * @private
         */

      }, {
        key: "_restoreSurveyFromLocal",
        value: function _restoreSurveyFromLocal(surveyId, storedObjectKeys) {
          var _this7 = this;

          // retrieve surveys first, then occurrences, then images from indexedDb
          return Ly.retrieveFromLocal(surveyId, new Ly()).then(function (survey) {
            // the apps occurrences should only relate to the current survey
            // (the reset are remote or in IndexedDb)
            _this7.clearCurrentSurvey();

            _this7.addSurvey(survey);

            var occurrenceFetchingPromises = [];

            var _iterator8 = _createForOfIteratorHelper(storedObjectKeys.occurrence),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var occurrenceKey = _step8.value;
                occurrenceFetchingPromises.push(wv.retrieveFromLocal(occurrenceKey, new wv()).then(function (occurrence) {
                  if (occurrence.surveyId === surveyId) {
                    _this7.addOccurrence(occurrence);
                  }
                }));
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }

            return Promise.all(occurrenceFetchingPromises);
          }).finally(function () {
            //console.log('Reached image fetching part');
            var imageFetchingPromises = [];

            var _iterator9 = _createForOfIteratorHelper(storedObjectKeys.image),
                _step9;

            try {
              var _loop = function _loop() {
                var occurrenceImageKey = _step9.value;
                imageFetchingPromises.push(Hy.retrieveFromLocal(occurrenceImageKey, new Hy()).then(function (occurrenceImage) {
                  if (occurrenceImage.surveyId === surveyId) {
                    Hy.imageCache.set(occurrenceImageKey, occurrenceImage);
                  }
                }, function (reason) {
                  console.log("Failed to retrieve an image: ".concat(reason));
                }));
              };

              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                _loop();
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }

            return Promise.all(imageFetchingPromises);
          });
        }
        /**
         *
         * @returns {Promise<void>}
         */

      }, {
        key: "clearLocalForage",
        value: function clearLocalForage() {
          return localforage.clear();
        }
      }]);

      return NyphApp;
    }(jy);

    _defineProperty(NyphApp, "forageName", 'Nyph App');

    _defineProperty(NyphApp, "LOAD_SURVEYS_ENDPOINT", '/loadsurveys.php');

    _defineProperty(NyphApp, "EVENT_OCCURRENCE_ADDED", 'occurrenceadded');

    _defineProperty(NyphApp, "EVENT_SURVEYS_CHANGED", 'surveyschanged');

    _defineProperty(NyphApp, "devMode", false);

    // service worker for Nyph app
    var serviceWorker = new RN();
    serviceWorker.initialise({
      forageName: NyphApp.forageName,
      postPassThroughWhitelist: /^https:\/\/nyphtest\.bsbi\.org\/loadsurveys.php/,
      postImageUrlMatch: /^https:\/\/nyphtest\.bsbi\.org\/saveimage.php/,
      getImageUrlMatch: /^https:\/\/nyphtest\.bsbi\.org\/image\.php/,
      interceptUrlMatches: /(?:^https:\/\/nyphtest\.bsbi\.org\/app\/|^https:\/\/nyphtest\.bsbi\.org\/app$)/,
      ignoreUrlMatches: /(?:^https:\/\/nyphtest\.bsbi\.org\/app\/app\.js|^https:\/\/nyphtest\.bsbi\.org\/app\/serviceworker\.js|^https:\/\/nyphtest\.bsbi\.org\/app\/manifest\.webmanifest|^https:\/\/nyphtest\.bsbi\.org\/app\/index\.html)/,
      indexUrl: 'https://nyphtest.bsbi.org/app/index.html',
      urlCacheSet: ['./index.html', './manifest.webmanifest', '/appcss/app.css', // note no leading '.' - this is an absolute path
      '/appcss/theme.css', //'/img/gwh_logo1_tsp.png',
      //'/img/icons/favicon-32x32.png',
      //'/img/icons/favicon-16x16.png',
      //'/img/icons/android-icon-192x192.png',
      //'/img/icons/gwh_logo1_tsp-512x512.png',
      '/img/BSBIlong.png', 'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css', 'https://database.bsbi.org/js/taxonnames.js.php', 'https://code.jquery.com/jquery-3.3.1.slim.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js', 'https://fonts.googleapis.com/css2?family=Gentium+Basic&display=swap'],
      version: '1.0.1.1634556679'
    }); // // currently based around the 'Cache and update' recipe along with many modifications
    // // see https://serviceworke.rs
    //
    //
    // import localforage from 'localforage';
    // import {ResponseFactory} from "./responses/ResponseFactory";
    // import {ImageResponse} from "./responses/ImageResponse";
    // import {packageClientResponse} from "./packageClientResponse";
    // import {SurveyResponse} from "./responses/SurveyResponse";
    // import {OccurrenceResponse} from "./responses/OccurrenceResponse";
    // import {OccurrenceImage} from "../models/OccurrenceImage";
    // import {Model} from "../models/Model";
    //
    // //import {1.0.1.1634556679} from "rollup";
    //
    // if (!Promise.prototype.finally) {
    //     Promise.prototype.finally = function(callback) {
    //         return this.then(callback)
    //             .catch(callback);
    //     };
    // }
    //
    // ImageResponse.register();
    // SurveyResponse.register();
    // OccurrenceResponse.register();
    //
    // const CACHE_VERSION = `version-1.0.1.1634556679`;
    //
    // const POST_PASS_THROUGH_WHITELIST = /^https:\/\/nyphtest\.bsbi\.org\/loadsurveys.php/;
    //
    // localforage.config({
    //     name: 'NYPH App'
    // });
    //
    // // On install, cache some resources.
    // self.addEventListener('install', function(evt) {
    //     console.log('The service worker is being installed.');
    //
    //     self.skipWaiting();
    //
    //     // Ask the service worker to keep installing until the returning promise
    //     // resolves.
    //     evt.waitUntil(
    //         precache()
    //             // see https://serviceworke.rs/immediate-claim_service-worker_doc.html
    //             .then(() => self.skipWaiting()));
    // });
    //
    // self.addEventListener('activate', function(event) {
    //     self.clients.matchAll({
    //         includeUncontrolled: true
    //     }).then(function(clientList) {
    //         const urls = clientList.map(function(client) {
    //             return client.url;
    //         });
    //         console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    //     });
    //
    //     event.waitUntil(caches.keys().then(function(cacheNames) {
    //         return Promise.all(
    //             cacheNames.map(function(cacheName) {
    //                 if (cacheName !== CACHE_VERSION) {
    //                     console.log('[ServiceWorker] Deleting old cache:', cacheName);
    //                     return caches.delete(cacheName);
    //                 }
    //             })
    //         );
    //     }).then(function() {
    //             console.log('[ServiceWorker] Claiming clients for version', CACHE_VERSION);
    //             return self.clients.claim();
    //         })
    //     );
    // });
    //
    //
    // // // see https://davidwalsh.name/background-sync
    // // // https://developers.google.com/web/updates/2015/12/background-sync
    // // self.addEventListener('sync', function(event) {
    // //
    // // });
    //
    // // On fetch, use cache but update the entry with the latest contents
    // // from the server.
    // self.addEventListener('fetch', /** @param {FetchEvent} evt */ function (evt) {
    //     console.log(`The service worker is serving: '${evt.request.url}'`);
    //
    //     evt.preventDefault();
    //
    //     if (evt.request.method === 'POST') {
    //         console.log(`Got a post request`);
    //
    //         if (evt.request.url.match(POST_PASS_THROUGH_WHITELIST)) {
    //             console.log(`Passing through whitelisted post request for: ${evt.request.url}`);
    //             evt.respondWith(fetch(evt.request));
    //         } else {
    //             let clonedRequest;
    //             try {
    //                 clonedRequest = evt.request.clone();
    //             } catch (e) {
    //                 console.log('Failed to clone request.');
    //                 console.log({'Cloning error' : e});
    //             }
    //
    //             evt.respondWith(fetch(evt.request).then((response) => {
    //                 // would get here if the server responds at all, but need to check that the response is ok (not a server error)
    //                 if (response.ok) {
    //                     return Promise.resolve(response)
    //                         .then((response) => {
    //                             // save the response locally
    //                             // before returning it to the client
    //
    //                             return response.clone().json();
    //                         })
    //                         .then((jsonResponseData) => {
    //                             return ResponseFactory
    //                                 .fromPostResponse(jsonResponseData)
    //                                 .setPrebuiltResponse(response)
    //                                 .populateLocalSave()
    //                                 .storeLocally();
    //                         })
    //                         .catch((error) => {
    //                             // for some reason local storage failed, after a successful server save
    //                             console.log({error});
    //
    //                             return Promise.resolve(response); // pass through the server response
    //                         });
    //                 } else {
    //                     console.log(`Failed to save, moving on to attempt IndexedDb`);
    //                     return Promise.reject('Failed to save to server.');
    //                 }
    //             })
    //             .catch((reason) => {
    //                 // would get here if the network is down
    //                 // or if got invalid response from the server
    //
    //                 console.log(`post fetch failed (probably no network), (reason: ${reason})`);
    //                 //console.log({'post failure reason' : reason});
    //
    //                 // /**
    //                 //  * simulated result of post, returned as JSON body
    //                 //  * @type {{surveyId: string, occurrenceId: string, imageId: string, saveState: string, [error]: string, [errorHelp]: string}}
    //                 //  */
    //                 // let returnedToClient = {};
    //
    //                 return clonedRequest.formData()
    //                     .then((formData) => {
    //                             //console.log('got to form data handler');
    //                             //console.log({formData});
    //
    //                             return ResponseFactory
    //                                 .fromPostedData(formData)
    //                                 .populateClientResponse()
    //                                 .storeLocally();
    //                         }, reason => {
    //                             console.log('failed to read form data locally');
    //                             console.log({reason});
    //
    //                             /**
    //                              * simulated result of post, returned as JSON body
    //                              * @type {{[surveyId]: string, [occurrenceId]: string, [imageId]: string, [saveState]: string, [error]: string, [errorHelp]: string}}
    //                              */
    //                             let returnedToClient = {
    //                                 error: 'Failed to process posted response data. (internal error)',
    //                                 errorHelp: 'Your internet connection may have failed (or there could be a problem with the server). ' +
    //                                     'It wasn\'t possible to save a temporary copy on your device. (an unexpected error occurred) ' +
    //                                     'Please try to re-establish a network connection and try again.'
    //                             };
    //
    //                             return packageClientResponse(returnedToClient);
    //                         }
    //                     );
    //             }));
    //         }
    //     } else {
    //         // test whether this is a direct link in to a page that should be substituted by
    //         // the single page app
    //         if (evt.request.url.match(/^https:\/\/nyphtest\.bsbi\.org\/app\//) &&
    //             evt.request.url.match(/^https:\/\/nyphtest\.bsbi\.org\/app$/) &&
    //             !evt.request.url.match(/^https:\/\/nyphtest\.bsbi\.org\/app\/nyph\.js/) &&
    //             !evt.request.url.match(/^https:\/\/nyphtest\.bsbi\.org\/app\/serviceworker\.js/) &&
    //             !evt.request.url.match(/^https:\/\/nyphtest\.bsbi\.org\/app\/manifest\.webmanifest/) &&
    //             !evt.request.url.match(/^https:\/\/nyphtest\.bsbi\.org\/app\/index\.html/)
    //         ) {
    //             // serving single page app instead
    //             console.log('redirecting to the root of the SPA');
    //             let spaRequest = new Request('https://nyphtest.bsbi.org/app/index.html');
    //             evt.respondWith(fromCache(spaRequest));
    //             evt.waitUntil(update(spaRequest));
    //         } else if (evt.request.url.match(/^https:\/\/nyphtest\.bsbi\.org\/image\.php/)) {
    //             handleImageFetch(evt);
    //         } else {
    //
    //             // You can use `respondWith()` to answer immediately, without waiting for the
    //             // network response to reach the service worker...
    //             evt.respondWith(fromCache(evt.request));
    //             // ...and `waitUntil()` to prevent the worker from being killed until the
    //             // cache is updated.
    //             evt.waitUntil(update(evt.request));
    //         }
    //     }
    // });
    //
    // // Open a cache and use `addAll()` with an array of assets to add all of them
    // // to the cache. Return a promise resolving when all the assets are added.
    // function precache() {
    //     return caches.open(CACHE_VERSION).then(function (cache) {
    //         return cache.addAll([
    //             './index.html',
    //             './manifest.webmanifest',
    //             //'./app.js',
    //             '/appcss/app.css', // note no leading '.' - this is an absolute path
    //             '/img/nyph_final@2x.png',
    //             //'/img/NyphLogo_900x431.png',
    //             //'/img/icons/favicon-32x32.png',
    //             //'/img/icons/favicon-16x16.png',
    //             //'/img/icons/favicon-196x196.png',
    //             'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round',
    //             'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
    //             'https://database.bsbi.org/js/taxonnames.js.php',
    //             'https://code.jquery.com/jquery-3.3.1.slim.min.js',
    //             'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
    //             'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js'
    //         ]);
    //     });
    // }
    //
    // // Open the cache where the assets were stored and search for the requested
    // // resource. Notice that in case of no matching, the promise still resolves
    // // but it does with `undefined` as value.
    // function fromCache(request) {
    //     // @todo need to serve index.html in place of all navigo-served pages
    //     // (an issue if someone returns to a bookmarked page within the app)
    //
    //     return caches.open(CACHE_VERSION).then(function (cache) {
    //         return cache.match(request).then(function (matching) {
    //             console.log(matching ?
    //                 `matched ${request.url}`
    //                 :
    //                 `no match for ${request.url}`);
    //
    //             return matching || fetch(request); // return cache match or if not cached then go out to network
    //         });
    //     });
    // }
    //
    // /**
    //  * Special case response for images
    //  * attempt to serve from local cache first,
    //  * if that fails then go out to network
    //  * finally see if there is an image in indexeddb
    //  *
    //  * @param {FetchEvent} evt
    //  */
    // function handleImageFetch(evt) {
    //     evt.respondWith(fromCache(evt.request).then((response) => {
    //         if (response) {
    //             return response;
    //         } else {
    //             // not cached and no network access
    //             // try to respond from local storage
    //
    //             const url = evt.request.url;
    //             const matches = url.match(/imageid=([a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12})/);
    //
    //             if (matches) {
    //                 const imageId = matches[1];
    //
    //                 return imageFromLocalDatabase(imageId);
    //             } else {
    //                 console.log(`Failed to match image id in url '${url}'`);
    //             }
    //         }
    //     }));
    // }
    //
    // /**
    //  *
    //  * @param {string} imageId
    //  * @returns {Promise}
    //  */
    // function imageFromLocalDatabase(imageId) {
    //     const image = new OccurrenceImage();
    //
    //     console.log('attempting retrieval of image data from local database');
    //
    //     return Model.retrieveFromLocal(imageId, image).then((image) => {
    //         console.log(`Retrieved image '${imageId}' from indexeddb.`);
    //         if (image.file) {
    //             const headers = new Headers();
    //             headers.append('Content-Type', image.file.type);
    //
    //             return new Response(image.file, {
    //                 "status" : 200 ,
    //                 "statusText" : "OK image response from IndexedDb"
    //             });
    //         } else {
    //             console.log(`No local file object associated with retrieved image '${imageId}' from indexeddb.`);
    //         }
    //     });
    // }
    //
    // // Update consists in opening the cache, performing a network request and
    // // storing the new response data.
    // function update(request) {
    //     request = new Request(request, {mode: 'cors', credentials: 'omit'});
    //
    //     return caches.open(CACHE_VERSION).then(function (cache) {
    //         return fetch(request, {cache: "no-cache"}).then(function (response) {
    //             if (response.ok) {
    //                 return cache.put(request, response);
    //             } else {
    //                 console.log(`Request during cache update failed for ${request.url}`);
    //                 console.log({'failed cache response' : response});
    //                 return Promise.reject('Request during cache update failed, not caching.');
    //             }
    //         }).catch((error) => {
    //             console.log(`Cache attempt failed for ${request.url}: error was ${error}`);
    //         });
    //     });
    // }

})();
//# sourceMappingURL=serviceworker.js.map
