"use strict";(self.webpackChunklms_admin=self.webpackChunklms_admin||[]).push([[202],{202:function(e,t,n){n.r(t),n.d(t,{default:function(){return xe}});var r=n(1413),i=n(4942),a=n(29439),l=n(47313),o=n(17592),s=n(19860),d=n(49914),c=n(48119),u=n(9019),p=n(35898),h=n(42695),x=n(24631),g=n(83929),m=n(44758),f=n(9506),Z=n(69099),j=n(57632),v=n(73428),b=n(51629),y=n(66835),S=n(23477),C=n(24076),k=n(70941),w=n(57861),T=n(61113),_=n(33497),P=(n(1759),n(22903),n(1834)),D=(n(62831),n(64224)),F=n(66135),M=n(70816),I=n.n(M),R=n(11692),z=(n(56052),n(61689)),B=n(36541),A=n(27754),W=(n(36287),n(45987)),E=n(50301),L=n(94469),Y=n(33604),V=n(47131),O=n(96467),U=n(85281),J=n(11198),q=n(79429),H=n(3463),K=n(5866),$=n(34229),G=n.n($),Q=(n(61581),n(86728)),N=(n(42805),n(74031)),X=n(46417),ee=["children","onClose"],te=l.forwardRef((function(e,t){return(0,X.jsx)(E.Z,(0,r.Z)({direction:"down",ref:t},e))})),ne=(0,o.ZP)(L.Z)((function(e){var t=e.theme;return{"& .MuDialogContent-root":{padding:t.spacing(2)},"& .MuDialogActions-root":{padding:t.spacing(1)}}})),re=function(e){var t=e.children,n=e.onClose,i=(0,W.Z)(e,ee);return(0,X.jsxs)(Y.Z,(0,r.Z)((0,r.Z)({sx:{m:0,py:1,px:2}},i),{},{children:[t,n?(0,X.jsx)(V.Z,{"aria-label":"close",onClick:n,sx:{position:"absolute",right:10,top:10,color:function(e){return e.palette.grey[500]}},children:(0,X.jsx)(J.Z,{})}):null]}))},ie=((0,F.$j)(null,{UpdateBdTargetsApi:A.QQ})((function(e){(0,Q.Z)();var t=e.open,n=e.close,r=e.UpdateBdTargetsApi,i=e.totalTarget,o=e.targetId,s=(0,D.I0)(),d=((0,l.useRef)(null),(0,l.useState)(!1)),c=(0,a.Z)(d,2),p=(c[0],c[1],(0,l.useState)(!1)),h=(0,a.Z)(p,2),g=(h[0],h[1]),m=(0,l.useState)(""),j=(0,a.Z)(m,2),v=(j[0],j[1],(0,l.useState)("")),b=(0,a.Z)(v,2),y=(b[0],b[1],(0,l.useState)(!1)),S=(0,a.Z)(y,2),C=(S[0],S[1],(0,l.useState)([])),k=(0,a.Z)(C,2),w=(k[0],k[1],(0,l.useState)("")),_=(0,a.Z)(w,2),P=(_[0],_[1],(0,l.useState)("")),F=(0,a.Z)(P,2),M=(F[0],F[1],(0,l.useState)("")),I=(0,a.Z)(M,2),R=(I[0],I[1],(0,l.useState)("")),z=(0,a.Z)(R,2),B=(z[0],z[1],(0,l.useState)("")),A=(0,a.Z)(B,2),W=(A[0],A[1],{target_total:i}),E=H.Ry({target_total:H.Z_().required("Targets Field is Required")}),L=(0,q.TA)({enableReinitialize:!0,initialValues:W,validationSchema:E,onSubmit:function(e,t){var i=t.setSubmitting,a={target_id:o,targets:e.target_total};g(!0),r(a).then((function(e){!0===e.succeeded?(n(),g(!1),i(!1),s((0,K.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(g(!1),i(!1),s((0,K.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))}))}});return(0,X.jsx)("div",{children:(0,X.jsxs)(ne,{open:t,"aria-labelledby":"customized-dialog-title",TransitionComponent:te,maxWidth:"xl",fullWidth:!0,sx:{"& .MuiDialog-paper":{width:"100%",maxWidth:"500px",padding:"0px",top:"-100px"}},children:[(0,X.jsx)(re,{id:"customized-dialog-title",onClose:function(){n()},sx:{background:"#e0f4ff"},children:(0,X.jsx)(T.Z,{variant:"h6",component:"h6",sx:{pl:"10px",fontSize:"1em",color:"#468ccc"},align:"center",children:"Edit Targets"})}),(0,X.jsx)(G(),{component:"div",style:{scrollbarWidth:"thin",scrollbarColor:"#ff0000 #f1f1f1"},children:(0,X.jsx)(O.Z,{dividers:!0,sx:{px:0},children:(0,X.jsx)(q.J9,{children:(0,X.jsxs)("form",{noValidate:!0,onSubmit:L.handleSubmit,children:[(0,X.jsx)(u.ZP,{container:!0,spacing:2,sx:{p:"10px 30px"},children:(0,X.jsxs)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:[(0,X.jsxs)(T.Z,{variant:"h5",sx:{width:"180px"},children:["Target",(0,X.jsx)("span",{style:{color:"red"},children:"*"})]}),(0,X.jsx)(x.Z,{fullWidth:!0,placeholder:"Enter Target",type:"number",InputLabelProps:{shrink:!0},style:{display:"flex",justifyContent:"flex-start",marginBottom:"5px ",marginTop:"5px "},name:"target_total",onKeyDown:N.JR,value:L.values.target_total,onChange:L.handleChange,error:L.touched.target_total&&Boolean(L.errors.target_total),helperText:L.touched.target_total&&L.errors.target_total,onBlur:L.handleBlur})]})}),(0,X.jsx)(f.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,X.jsx)(Z.Z,{size:"small",type:"submit",variant:"contained",color:"secondary",disabled:L.isSubmitting,sx:{pl:2,borderRadius:"10px",width:"20%",color:"#468ccc",background:"#e0f4ff",height:"35px","&:hover":{background:"#468ccc",color:"#e0f4ff"}},children:L.isSubmitting?(0,X.jsx)(X.Fragment,{children:(0,X.jsx)(U.Z,{color:"inherit",size:20})}):"Update"})})]})})})})]})})})),["children","onClose"]),ae=l.forwardRef((function(e,t){return(0,X.jsx)(E.Z,(0,r.Z)({direction:"down",ref:t},e))})),le=(0,o.ZP)(L.Z)((function(e){var t=e.theme;return{"& .MuDialogContent-root":{padding:t.spacing(2)},"& .MuDialogActions-root":{padding:t.spacing(1)}}})),oe=function(e){var t=e.children,n=e.onClose,i=(0,W.Z)(e,ie);return(0,X.jsxs)(Y.Z,(0,r.Z)((0,r.Z)({sx:{m:0,py:1,px:2}},i),{},{children:[t,n?(0,X.jsx)(V.Z,{"aria-label":"close",onClick:n,sx:{position:"absolute",right:10,top:10,color:function(e){return e.palette.grey[500]}},children:(0,X.jsx)(J.Z,{})}):null]}))},se=((0,F.$j)(null,{UpdateCompleteTargetsApi:A.iH})((function(e){(0,Q.Z)();var t=e.open,n=e.close,r=e.UpdateCompleteTargetsApi,i=(e.completeTarget,e.bdId),o=e.targetId,s=(0,D.I0)(),d=((0,l.useRef)(null),(0,l.useState)(!1)),c=(0,a.Z)(d,2),p=(c[0],c[1],(0,l.useState)(!1)),h=(0,a.Z)(p,2),g=(h[0],h[1]),m=(0,l.useState)(""),j=(0,a.Z)(m,2),v=(j[0],j[1],(0,l.useState)("")),b=(0,a.Z)(v,2),y=(b[0],b[1],(0,l.useState)(!1)),S=(0,a.Z)(y,2),C=(S[0],S[1],(0,l.useState)([])),k=(0,a.Z)(C,2),w=(k[0],k[1],(0,l.useState)("")),_=(0,a.Z)(w,2),P=(_[0],_[1],(0,l.useState)("")),F=(0,a.Z)(P,2),M=(F[0],F[1],(0,l.useState)("")),I=(0,a.Z)(M,2),R=(I[0],I[1],(0,l.useState)("")),z=(0,a.Z)(R,2),B=(z[0],z[1],(0,l.useState)("")),A=(0,a.Z)(B,2),W=(A[0],A[1],H.Ry({complete_target:H.Z_().required("Completed Target Field is Required")})),E=(0,q.TA)({enableReinitialize:!0,initialValues:{complete_target:""},validationSchema:W,onSubmit:function(e,t){var a=t.setSubmitting,l={target_id:o,complete_target:e.complete_target,bd_id:i};g(!0),r(l).then((function(e){!0===e.succeeded?(n(),g(!1),a(!1),s((0,K.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(g(!1),a(!1),s((0,K.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))})).catch((function(){a(!1)}))}});return(0,X.jsx)(X.Fragment,{children:(0,X.jsxs)(le,{open:t,"aria-labelledby":"customized-dialog-title",TransitionComponent:ae,maxWidth:"xl",fullWidth:!0,sx:{"& .MuiDialog-paper":{width:"100%",maxWidth:"500px",padding:"0px",top:"-100px"}},children:[(0,X.jsx)(oe,{id:"customized-dialog-title",onClose:function(){n()},sx:{background:"#e0f4ff"},children:(0,X.jsx)(T.Z,{variant:"h6",component:"h6",sx:{pl:"10px",fontSize:"1em",color:"#468ccc"},align:"center",children:"Edit Completed Targets"})}),(0,X.jsx)(G(),{component:"div",style:{scrollbarWidth:"thin",scrollbarColor:"#ff0000 #f1f1f1"},children:(0,X.jsx)(O.Z,{dividers:!0,sx:{px:0},children:(0,X.jsx)(q.J9,{children:(0,X.jsxs)("form",{noValidate:!0,onSubmit:E.handleSubmit,children:[(0,X.jsx)(u.ZP,{container:!0,spacing:2,sx:{p:"10px 30px"},children:(0,X.jsxs)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:[(0,X.jsxs)(T.Z,{variant:"h5",sx:{width:"180px"},children:["Completed Target",(0,X.jsx)("span",{style:{color:"red"},children:"*"})]}),(0,X.jsx)(x.Z,{fullWidth:!0,placeholder:"Enter Target",type:"number",InputLabelProps:{shrink:!0},style:{display:"flex",justifyContent:"flex-start",marginBottom:"5px ",marginTop:"5px "},name:"complete_target",onKeyDown:N.JR,value:E.values.complete_target,onChange:E.handleChange,error:E.touched.complete_target&&Boolean(E.errors.complete_target),helperText:E.touched.complete_target&&E.errors.complete_target,onBlur:E.handleBlur})]})}),(0,X.jsx)(f.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,X.jsx)(Z.Z,{size:"small",type:"submit",variant:"contained",color:"secondary",disabled:E.isSubmitting,sx:{pl:2,borderRadius:"10px",width:"20%",color:"#468ccc",background:"#e0f4ff",height:"35px","&:hover":{background:"#468ccc",color:"#e0f4ff"}},children:E.isSubmitting?(0,X.jsx)(X.Fragment,{children:(0,X.jsx)(U.Z,{color:"inherit",size:20})}):"Update"})})]})})})})]})})})),n(28686)),de=n(43394),ce=n(44948),ue=n(12401),pe=(n(89535),n(5242),n(1661)),he=n(34165);(0,o.ZP)(d.Z,{shouldForwardProp:B.x9})((function(e){var t,n=e.theme;return t={width:290,marginLeft:16,height:"45px",padding:"27px 16px","& input":{background:"transparent !important",paddingLeft:"4px !important"}},(0,i.Z)(t,n.breakpoints.down("lg"),{width:250}),(0,i.Z)(t,n.breakpoints.down("md"),{width:"100%",marginLeft:4,background:"dark"===n.palette.mode?n.palette.dark[800]:"#fff"}),t})),(0,o.ZP)(c.Z,{shouldForwardProp:B.x9})((function(e){var t=e.theme;return(0,r.Z)((0,r.Z)((0,r.Z)({},t.typography.commonAvatar),t.typography.mediumAvatar),{},{background:"transparent",color:"#3e7dc3","&:hover":{color:"black"}})}));var xe=(0,F.$j)(null,{ClFilterTargetsApi:A.dd})((function(e){var t=e.ClFilterTargetsApi,n=(0,s.Z)(),i=(0,l.useState)(0),o=(0,a.Z)(i,2),d=(o[0],o[1],(0,l.useState)(10)),M=(0,a.Z)(d,2),B=(M[0],M[1],(0,l.useState)(!1)),W=(0,a.Z)(B,2),E=(W[0],W[1],(0,l.useState)("")),L=(0,a.Z)(E,2),Y=(L[0],L[1],(0,F.v9)((function(e){return e.clusterLeadAction}))),V=Y.getFilterTargetDetails,O=Y.getBdeDropdownList,U=Y.getFilterTargetDetailsLoading,J=(0,l.useState)(""),H=(0,a.Z)(J,2),$=(H[0],H[1],(0,F.v9)((function(e){return e.masterAction})).leadStatusList,(0,l.useState)([])),G=(0,a.Z)($,2),Q=(G[0],G[1],(0,l.useState)(!1)),ee=(0,a.Z)(Q,2),te=ee[0],ne=ee[1];(0,l.useEffect)((function(){(0,D.WI)((0,A.n6)())}),[]);var re=(0,q.TA)({initialValues:{selectedMonth:[],selectedBDE:[],selectedYear:null,isClusterTarg:!1},onSubmit:function(e,n){var r=n.setSubmitting,i={isClusterTarg:e.isClusterTarg,selectedMonth:e.selectedMonth,selectedBDE:e.selectedBDE,selectedYear:null!==e.selectedYear?I()(null===e||void 0===e?void 0:e.selectedYear).format("YYYY"):""};t(i).then((function(e){!0===e.succeeded?(r(!1),(0,D.WI)((0,K.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(r(!1),(0,D.WI)((0,K.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))})).catch((function(){r(!1)}))}});(0,l.useEffect)((function(){var e={isClusterTarg:!1,selectedMonth:re.selectedMonth,selectedBDE:re.selectedBDE,selectedYear:null!==re.selectedYear?re.selectedYear:""};t(e)}),[]);function ie(e,t,n,r,i){return{name:e,calories:t,fat:n,carbs:r,protein:i}}console.log("\ud83d\ude80formik",O);ie("Jan",3500,0,-3500),ie("Fab",7e3,0,-7e3),ie("Marc",10500,0,-10500);return(0,X.jsx)(X.Fragment,{children:(0,X.jsxs)(u.ZP,{container:!0,spacing:2,sx:{mt:0},children:[te?"":(0,X.jsx)(u.ZP,{item:!0,xs:3,sx:{mb:0,alignItems:"left"},children:(0,X.jsx)(_.Z,{content:!1,title:(0,X.jsxs)(p.Z,{direction:"row",children:[(0,X.jsx)(P.wHY,{sx:{mr:2}})," \xa0 Filters"]}),sx:{border:"0px solid",padding:"10px",height:"100vh"},children:(0,X.jsx)("form",{onSubmit:re.handleSubmit,children:(0,X.jsxs)(u.ZP,{container:!0,spacing:ue.dv,sx:{mt:1},children:[(0,X.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,X.jsx)(h.Z,{multiple:!0,fullWidth:!0,options:O,getOptionLabel:function(e){return e.name},value:null===O||void 0===O?void 0:O.filter((function(e){return re.values.selectedBDE.includes(e._id)})),onChange:function(e,t){var n=t?t.map((function(e){return e._id})):[];re.setFieldValue("selectedBDE",n)},renderInput:function(e){return(0,X.jsx)(x.Z,(0,r.Z)((0,r.Z)({},e),{},{label:"Select BDE",inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"})}))}})}),(0,X.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,X.jsx)(h.Z,{id:"month-select",fullWidth:!0,multiple:!0,options:N.e7,getOptionLabel:function(e){return e.label},value:N.e7.filter((function(e){return re.values.selectedMonth.includes(e.label)})),onChange:function(e,t){var n=t.some((function(e){return"All Months"===e.label}))?N.e7.slice(1):t.map((function(e){return e.label}));re.setFieldValue("selectedMonth",n)},renderInput:function(e){return(0,X.jsx)(x.Z,(0,r.Z)((0,r.Z)({},e),{},{label:"Select Month",inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"})}))}})}),(0,X.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,X.jsx)(de._,{dateAdapter:se.H,children:(0,X.jsx)(ce.M,{views:["year"],renderInput:function(e){return(0,X.jsx)(x.Z,(0,r.Z)((0,r.Z)({fullWidth:!0},e),{},{inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"}),onKeyDown:function(e){return e.preventDefault()}}))},value:re.values.selectedYear,onChange:function(e){re.setFieldValue("selectedYear",e)},maxDate:new Date,minDate:new Date("2000-01-01")})})}),(0,X.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,X.jsx)(g.Z,{control:(0,X.jsx)(m.Z,{checked:re.values.isClusterTarg,onChange:function(e){return re.setFieldValue("isClusterTarg",e.target.checked)}}),label:"Self Target"})}),(0,X.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,X.jsx)(f.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,X.jsx)(Z.Z,{size:"small",type:"submit",variant:"contained",color:"secondary",sx:{pl:2,borderRadius:"10px",width:"50%",color:"#468ccc",background:"#e0f4ff",height:"35px",boxShadow:"4","&:hover":{background:"#468ccc",color:"#e0f4ff",boxShadow:"16"}},children:"Go Filter"})})})]})})})}),(0,X.jsx)(u.ZP,{item:!0,xs:9,md:te?12:9,sx:{mb:0,alignItems:"left"},children:(0,X.jsx)(_.Z,{content:!1,title:(0,X.jsxs)(p.Z,{direction:"row",children:[(0,X.jsx)(z.Z,{title:te?"Collapse Right":"Collapse Left",arrow:!0,disableFocusListener:!0,disableTouchListener:!0,placement:"left-start",TransitionComponent:j.Z,children:(0,X.jsx)(c.Z,{variant:"rounded",sx:(0,r.Z)((0,r.Z)((0,r.Z)({},n.typography.commonAvatar),n.typography.mediumAvatar),{},{transition:"all .2s ease-in-out",border:"2px solid",bgcolor:n.palette.background.default,boxShadow:"2",backgroundColor:"dark"===n.palette.mode?n.palette.dark.main:n.palette.primary.light,'&[aria-controls="menu-list-grow"],&:hover':{boxShadow:"7",background:"".concat(n.palette.primary.main,"!important"),color:n.palette.primary.light}}),color:"inherit",onClick:function(){return ne(!te)},children:te?(0,X.jsx)(pe.Z,{stroke:1.5,size:"20px"}):(0,X.jsx)(he.Z,{stroke:1.5,size:"20px"})})})," ","\xa0 BDE Targets"]}),sx:{border:"0px solid",padding:"5px"},children:(0,X.jsx)(u.ZP,{container:!0,spacing:2,sx:{mt:0},children:!U&&(null===V||void 0===V?void 0:V.length)>0?null===V||void 0===V?void 0:V.map((function(e,t){var r,i,a,l,o=null===e||void 0===e||null===(r=e.targData)||void 0===r?void 0:r.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.targets)||0}),0),s=null===e||void 0===e||null===(i=e.targData)||void 0===i?void 0:i.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.completed_target)||0}),0),d=null===e||void 0===e||null===(a=e.targData)||void 0===a?void 0:a.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.remaining_target)||0}),0);return(0,X.jsx)(u.ZP,{item:!0,xs:6,md:te?4:6,sx:{mb:0,alignItems:"left"},children:(0,X.jsx)(v.Z,{sx:{p:2,background:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],border:"dark"===n.palette.mode?"1px solid transparent":"1px solid".concat(n.palette.grey[100]),"&:hover":{borderColor:n.palette.primary.main}},children:(0,X.jsx)(b.Z,{children:(0,X.jsxs)(y.Z,{children:[(0,X.jsxs)(S.Z,{children:[(0,X.jsxs)(C.Z,{children:[(0,X.jsx)(k.Z,{sx:{pl:0},children:"Monthly Sales Projection"}),(0,X.jsx)(k.Z,{colSpan:3,align:"center",children:null===e||void 0===e?void 0:e.name})]}),(0,X.jsxs)(C.Z,{children:[(0,X.jsx)(k.Z,{sx:{p:0},children:"Month"}),(0,X.jsx)(k.Z,{align:"center",sx:{px:0,py:1},children:"Target"}),(0,X.jsx)(k.Z,{align:"center",sx:{px:0,py:1},children:"Confirm Business"}),(0,X.jsx)(k.Z,{align:"center",sx:{px:0,py:1},children:"Gap"})]})]}),(0,X.jsxs)(w.Z,{children:[null===e||void 0===e||null===(l=e.targData)||void 0===l?void 0:l.map((function(e,t){return(0,X.jsxs)(C.Z,{hover:!0,children:[(0,X.jsx)(k.Z,{sx:{p:0},component:"th",scope:"row",children:null===e||void 0===e?void 0:e.target_month}),(0,X.jsx)(k.Z,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.total_target}),(0,X.jsx)(k.Z,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.completed_target}),(0,X.jsx)(k.Z,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.remaining_target})]},t)})),(0,X.jsxs)(C.Z,{hover:!0,children:[(0,X.jsx)(k.Z,{sx:{pl:0,fontWeight:500},component:"th",scope:"row",children:"Total"}),(0,X.jsx)(k.Z,{align:"center",children:o}),(0,X.jsx)(k.Z,{align:"center",children:s}),(0,X.jsx)(k.Z,{align:"center",children:d})]})]})]})})})},t)})):(0,X.jsx)(X.Fragment,{children:!0===U?(0,X.jsx)(b.Z,{children:(0,X.jsx)(y.Z,{children:(0,X.jsx)(R._A,{rows:10})})}):(0,X.jsx)(u.ZP,{item:!0,xs:12,md:12,sx:{mb:0,alignItems:"left"},children:(0,X.jsx)(v.Z,{sx:{p:2,background:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],border:"dark"===n.palette.mode?"1px solid transparent":"1px solid".concat(n.palette.grey[100]),"&:hover":{borderColor:n.palette.primary.main}},children:(0,X.jsx)(T.Z,{sx:{pr:3},align:"center",colSpan:10,children:"Targts Not Found"})})})})})})})]})})}))}}]);