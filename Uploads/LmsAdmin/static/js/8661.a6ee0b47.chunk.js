(self.webpackChunklead_management_system_dashboard=self.webpackChunklead_management_system_dashboard||[]).push([[8661],{1420:function(e,t,r){"use strict";r(47313);t.Z=r.p+"static/media/earning.00f461a5c235604f1375d5e59ee3e093.svg"},71504:function(e,t,r){"use strict";r(47313),r(46417)},29386:function(e,t,r){"use strict";var n=r(73428),i=r(93405),o=r(9019),a=r(84488),u=r(46417);t.Z=function(){return(0,u.jsx)(n.Z,{children:(0,u.jsx)(i.Z,{children:(0,u.jsxs)(o.ZP,{container:!0,direction:"column",children:[(0,u.jsx)(o.ZP,{item:!0,children:(0,u.jsxs)(o.ZP,{container:!0,justifyContent:"space-between",children:[(0,u.jsx)(o.ZP,{item:!0,children:(0,u.jsx)(a.Z,{variant:"rectangular",width:44,height:44})}),(0,u.jsx)(o.ZP,{item:!0,children:(0,u.jsx)(a.Z,{variant:"rectangular",width:34,height:34})})]})}),(0,u.jsx)(o.ZP,{item:!0,children:(0,u.jsx)(a.Z,{variant:"rectangular",sx:{my:2},height:40})}),(0,u.jsx)(o.ZP,{item:!0,children:(0,u.jsx)(a.Z,{variant:"rectangular",height:30})})]})})})}},23557:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return J}});var n=r(29439),i=r(47313),o=r(19860),a=r(24813),u=r(9019),s=r(33497),c=r(34229),l=r.n(c),d=r(4942),f=r(17592),m=(r(29386),r(1420),r(46417)),p=((0,f.ZP)(s.Z)((function(e){var t=e.theme;return{backgroundColor:"#9c60dc",color:"#fff",overflow:"hidden",position:"relative",height:"160px","&:after":(0,d.Z)({content:'""',position:"absolute",width:"80px",height:"80px",background:"#b077f8",borderRadius:"50%",top:"-30px",right:0},t.breakpoints.down("sm"),{top:-105,right:-140}),"&:before":(0,d.Z)({content:'""',position:"absolute",width:"80px",height:"80px",background:"#b681f6",borderRadius:"50%",top:"5px",right:"-30px",opacity:.5},t.breakpoints.down("sm"),{top:-155,right:-70})}})),r(58446),(0,f.ZP)(s.Z)((function(e){e.theme;return{height:"160px"}})),r(45987)),h=r(1413),v=r(66135),g=r(50301),y=r(94469),x=r(33604),b=r(47131),S=r(61113),Z=r(96467),j=r(24631),T=r(15480),w=r(9506),M=r(69099),_=r(85281),P=r(11198),O=r(79429),D=r(3463),F=r(64224),k=r(5866),C=(r(61581),r(86728)),E=(r(42805),r(74031),r(72265)),I=r(28686),R=r(43394),A=r(44948),z=r(89600),V=r(66182),N=["children","onClose"],W=i.forwardRef((function(e,t){return(0,m.jsx)(g.Z,(0,h.Z)({direction:"left",ref:t},e))})),q=(0,f.ZP)(y.Z)((function(e){var t=e.theme;return{"& .MuDialogContent-root":{padding:t.spacing(2)},"& .MuDialogActions-root":{padding:t.spacing(1)}}})),B=function(e){var t=e.children,r=e.onClose,n=(0,p.Z)(e,N);return(0,m.jsxs)(x.Z,(0,h.Z)((0,h.Z)({sx:{m:0,py:1,px:2}},n),{},{children:[t,r?(0,m.jsx)(b.Z,{"aria-label":"close",onClick:r,sx:{position:"absolute",right:10,top:10,color:function(e){return e.palette.grey[500]}},children:(0,m.jsx)(P.Z,{})}):null]}))},H=((0,v.$j)(null,{MonthlyTargetStart:E.A3})((function(e){var t=(0,C.Z)(),r=e.open,o=e.close,a=e.MonthlyTargetStart,s=(0,F.I0)(),c=((0,i.useRef)(null),(0,i.useState)(!1)),d=(0,n.Z)(c,2),f=(d[0],d[1],(0,i.useState)(!1)),p=(0,n.Z)(f,2),v=(p[0],p[1]),g=(0,i.useState)(""),y=(0,n.Z)(g,2),x=(y[0],y[1],(0,i.useState)("")),b=(0,n.Z)(x,2),P=(b[0],b[1],(0,i.useState)(!1)),E=(0,n.Z)(P,2),N=(E[0],E[1],(0,i.useState)([])),H=(0,n.Z)(N,2),J=(H[0],H[1],(0,i.useState)("")),K=(0,n.Z)(J,2),L=(K[0],K[1],(0,i.useState)("")),$=(0,n.Z)(L,2),G=($[0],$[1],(0,i.useState)("")),Q=(0,n.Z)(G,2),U=(Q[0],Q[1],(0,i.useState)("")),X=(0,n.Z)(U,2),Y=(X[0],X[1],(0,i.useState)("")),ee=(0,n.Z)(Y,2),te=(ee[0],ee[1],i.useState(new Date)),re=(0,n.Z)(te,2),ne=re[0],ie=(re[1],{selectedDate:ne||new Date}),oe=D.Ry().shape({selectedDate:D.hT().required("Date is required")}),ae=(0,O.TA)({enableReinitialize:!0,initialValues:ie,validationSchema:oe,onSubmit:function(e,t){var r=t.setSubmitting,n={start_date_of_month:e.selectedDate,current_date_of_month:e.selectedDate};a(n).then((function(e){!0===e.succeeded?(o(),v(!1),r(!1),s((0,k.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(v(!1),r(!1),s((0,k.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))})).catch((function(){r(!1)}))}});return(0,m.jsx)("div",{children:(0,m.jsxs)(q,{open:r,"aria-labelledby":"customized-dialog-title",TransitionComponent:W,maxWidth:"xl",fullWidth:!0,sx:{"& .MuiDialog-paper":{width:"100%",maxWidth:"500px",padding:"0px",top:"-100px"}},children:[(0,m.jsx)(B,{id:"customized-dialog-title",onClose:function(){o()},sx:{background:"#e0f4ff"},children:(0,m.jsx)(S.Z,{variant:"h6",component:"h6",sx:{pl:"10px",fontSize:"1em",color:"#468ccc"},align:"center",children:"New Month Start"})}),(0,m.jsx)(l(),{component:"div",style:{scrollbarWidth:"thin",scrollbarColor:"#b2b3b3 #f1f1f1"},children:(0,m.jsx)(Z.Z,{dividers:!0,sx:{px:0},children:(0,m.jsx)(O.J9,{children:(0,m.jsxs)("form",{noValidate:!0,onSubmit:ae.handleSubmit,children:[(0,m.jsx)(u.ZP,{container:!0,spacing:2,sx:{p:"10px 30px"},children:(0,m.jsxs)(u.ZP,{item:!0,xs:12,sx:{mb:0,py:2,alignItems:"left"},children:[(0,m.jsx)(R._,{dateAdapter:I.H,children:(0,m.jsx)(A.M,{renderInput:function(e){return(0,m.jsx)(j.Z,(0,h.Z)((0,h.Z)({fullWidth:!0},e),{},{helperText:(0,m.jsx)(O.Bc,{name:"selectedDate"}),value:(0,z.Z)(ae.values.selectedDate,"dd-yy-MM",{locale:I.H.dateLocale}),onChange:function(e){ae.setFieldValue("selectedDate",e.target.value)},onKeyDown:function(e){return e.preventDefault()},error:ae.touched.selectedDate&&Boolean(ae.errors.selectedDate)}))},value:ae.values.selectedDate,onChange:function(e){ae.setFieldValue("selectedDate",e)}})}),ae.touched.selectedDate&&ae.errors.selectedDate&&(0,m.jsx)(T.Z,{error:!0,id:"standard-weight-helper-text-password-login",children:ae.errors.selectedDate})]})}),(0,m.jsx)(w.Z,{style:{display:"flex",justifyContent:"center",width:"100%",mt:1},children:(0,m.jsx)(V.Z,{scale:{hover:1.1,tap:.9},children:(0,m.jsx)(M.Z,{variant:"contained",color:"primary",type:"submit",disabled:ae.isSubmitting,sx:{px:5,width:"100%",boxShadow:t.customShadows.primary,":hover":{boxShadow:"none"}},children:ae.isSubmitting?(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(_.Z,{color:"inherit",size:20})}):"Submit"})})})]})})})})]})})})),r(71504),(0,f.ZP)(s.Z)((function(e){e.theme;return{height:"160px"}})),r(27222),r(93355),r(99495),r(42927),r(5242),r(1759),r(5242),r(8324)),J=function(){var e=(0,o.Z)(),t=((0,a.Z)(e.breakpoints.up("lg")),(0,i.useState)(!0)),r=(0,n.Z)(t,2),s=(r[0],r[1]),c=(0,i.useState)("January"),l=(0,n.Z)(c,2);l[0],l[1];(0,i.useEffect)((function(){s(!1)}),[]);return(0,m.jsx)(u.ZP,{container:!0,spacing:2,children:(0,m.jsx)(u.ZP,{item:!0,xs:12,md:12,children:(0,m.jsx)(H.Z,{})})})}},16957:function(e,t,r){"use strict";r.d(t,{Z:function(){return y}});var n=r(63366),i=r(87462),o=r(47313),a=r(83061),u=r(21921),s=r(77342),c=r(17592),l=r(77430),d=r(32298);function f(e){return(0,d.Z)("MuiCardMedia",e)}(0,l.Z)("MuiCardMedia",["root","media","img"]);var m=r(46417),p=["children","className","component","image","src","style"],h=(0,c.ZP)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState,n=r.isMediaComponent,i=r.isImageComponent;return[t.root,n&&t.media,i&&t.img]}})((function(e){var t=e.ownerState;return(0,i.Z)({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},t.isMediaComponent&&{width:"100%"},t.isImageComponent&&{objectFit:"cover"})})),v=["video","audio","picture","iframe","img"],g=["picture","img"],y=o.forwardRef((function(e,t){var r=(0,s.Z)({props:e,name:"MuiCardMedia"}),o=r.children,c=r.className,l=r.component,d=void 0===l?"div":l,y=r.image,x=r.src,b=r.style,S=(0,n.Z)(r,p),Z=-1!==v.indexOf(d),j=!Z&&y?(0,i.Z)({backgroundImage:'url("'.concat(y,'")')},b):b,T=(0,i.Z)({},r,{component:d,isMediaComponent:Z,isImageComponent:-1!==g.indexOf(d)}),w=function(e){var t=e.classes,r={root:["root",e.isMediaComponent&&"media",e.isImageComponent&&"img"]};return(0,u.Z)(r,f,t)}(T);return(0,m.jsx)(h,(0,i.Z)({className:(0,a.Z)(w.root,c),as:d,role:!Z&&y?"img":void 0,ref:t,style:j,ownerState:T,src:Z?y||x:void 0},S,{children:o}))}))},18368:function(e,t,r){var n;"undefined"!=typeof self&&self,e.exports=(n=r(47313),function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t){e.exports=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Validate=t.Time=void 0;var n=o(r(5)),i=o(r(6));function o(e){return e&&e.__esModule?e:{default:e}}t.Time=n.default,t.Validate=i.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useInterval=void 0;var n=function(e){return e&&e.__esModule?e:{default:e}}(r(7));t.useInterval=n.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useTime=t.useStopwatch=t.useTimer=void 0;var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.default=function(e){if((0,i.useEffect)((function(){console.warn("react-timer-hook: default export useTimer is deprecated, use named exports { useTimer, useStopwatch, useTime } instead")}),[]),e.expiryTimestamp){var t=(0,o.default)(e);return n({},t,{startTimer:t.start,stopTimer:t.pause,resetTimer:function(){}})}var r=(0,a.default)(e);return n({},r,{startTimer:r.start,stopTimer:r.pause,resetTimer:r.reset})};var i=r(0),o=s(r(4)),a=s(r(8)),u=s(r(9));function s(e){return e&&e.__esModule?e:{default:e}}t.useTimer=o.default,t.useStopwatch=a.default,t.useTime=u.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(n=(a=u.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{!n&&u.return&&u.return()}finally{if(i)throw o}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};t.default=function(e){var t=e.expiryTimestamp,r=e.onExpire,l=e.autoStart,d=void 0===l||l,f=(0,o.useState)(t),m=i(f,2),p=m[0],h=m[1],v=(0,o.useState)(a.Time.getSecondsFromExpiry(p)),g=i(v,2),y=g[0],x=g[1],b=(0,o.useState)(d),S=i(b,2),Z=S[0],j=S[1],T=(0,o.useState)(d),w=i(T,2),M=w[0],_=w[1],P=(0,o.useState)(c(p)),O=i(P,2),D=O[0],F=O[1];function k(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];F(c(e)),_(t),j(t),h(e),x(a.Time.getSecondsFromExpiry(e))}function C(){var e=new Date;e.setMilliseconds(e.getMilliseconds()+1e3*y),k(e)}return(0,u.useInterval)((function(){D!==s&&F(s);var e=a.Time.getSecondsFromExpiry(p);x(e),e<=0&&(a.Validate.onExpire(r)&&r(),j(!1),F(null))}),Z?D:null),n({},a.Time.getTimeFromSeconds(y),{start:function(){M?(x(a.Time.getSecondsFromExpiry(p)),j(!0)):C()},pause:function(){j(!1)},resume:C,restart:k,isRunning:Z})};var o=r(0),a=r(1),u=r(2),s=1e3;function c(e){if(!a.Validate.expiryTimestamp(e))return null;var t=a.Time.getSecondsFromExpiry(e),r=Math.floor(1e3*(t-Math.floor(t)));return r>0?r:s}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return n(e,null,[{key:"getTimeFromSeconds",value:function(e){var t=Math.ceil(e),r=Math.floor(t/86400),n=Math.floor(t%86400/3600),i=Math.floor(t%3600/60);return{seconds:Math.floor(t%60),minutes:i,hours:n,days:r}}},{key:"getSecondsFromExpiry",value:function(e,t){var r=e-(new Date).getTime();if(r>0){var n=r/1e3;return t?Math.round(n):n}return 0}},{key:"getSecondsFromPrevTime",value:function(e,t){var r=(new Date).getTime()-e;if(r>0){var n=r/1e3;return t?Math.round(n):n}return 0}},{key:"getSecondsFromTimeNow",value:function(){var e=new Date;return e.getTime()/1e3-60*e.getTimezoneOffset()}},{key:"getFormattedTimeFromSeconds",value:function(t,r){var n=e.getTimeFromSeconds(t),i=n.seconds,o=n.minutes,a=n.hours,u="",s=a;return"12-hour"===r&&(u=a>=12?"pm":"am",s=a%12),{seconds:i,minutes:o,hours:s,ampm:u}}}]),e}();t.default=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return n(e,null,[{key:"expiryTimestamp",value:function(e){var t=new Date(e).getTime()>0;return t||console.warn("react-timer-hook: { useTimer } Invalid expiryTimestamp settings",e),t}},{key:"onExpire",value:function(e){var t=e&&"function"==typeof e;return e&&!t&&console.warn("react-timer-hook: { useTimer } Invalid onExpire settings function",e),t}}]),e}();t.default=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=(0,n.useRef)();(0,n.useEffect)((function(){r.current=e})),(0,n.useEffect)((function(){if(!t)return function(){};var e=setInterval((function(){r.current&&r.current()}),t);return function(){return clearInterval(e)}}),[t])};var n=r(0)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(n=(a=u.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{!n&&u.return&&u.return()}finally{if(i)throw o}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};t.default=function(e){var t=e.autoStart,r=e.offsetTimestamp,s=(0,o.useState)(a.Time.getSecondsFromExpiry(r,!0)||0),c=i(s,2),l=c[0],d=c[1],f=(0,o.useState)(new Date),m=i(f,2),p=m[0],h=m[1],v=(0,o.useState)(l+a.Time.getSecondsFromPrevTime(p||0,!0)),g=i(v,2),y=g[0],x=g[1],b=(0,o.useState)(t),S=i(b,2),Z=S[0],j=S[1];return(0,u.useInterval)((function(){x(l+a.Time.getSecondsFromPrevTime(p,!0))}),Z?1e3:null),n({},a.Time.getTimeFromSeconds(y),{start:function(){var e=new Date;h(e),j(!0),x(l+a.Time.getSecondsFromPrevTime(e,!0))},pause:function(){d(y),j(!1)},reset:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=a.Time.getSecondsFromExpiry(e,!0)||0,n=new Date;h(n),d(r),j(t),x(r+a.Time.getSecondsFromPrevTime(n,!0))},isRunning:Z})};var o=r(0),a=r(1),u=r(2)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(n=(a=u.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{!n&&u.return&&u.return()}finally{if(i)throw o}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};t.default=function(e){var t=e.format,r=(0,o.useState)(a.Time.getSecondsFromTimeNow()),s=i(r,2),c=s[0],l=s[1];return(0,u.useInterval)((function(){l(a.Time.getSecondsFromTimeNow())}),1e3),n({},a.Time.getFormattedTimeFromSeconds(c,t))};var o=r(0),a=r(1),u=r(2)}]))}}]);