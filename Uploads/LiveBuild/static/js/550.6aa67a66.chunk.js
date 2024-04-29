"use strict";(self.webpackChunklead_management_system_dashboard=self.webpackChunklead_management_system_dashboard||[]).push([[550],{50550:function(e,t,n){n.r(t),n.d(t,{default:function(){return me}});var r=n(1413),i=n(29439),a=n(4942),l=n(47313),o=n(17592),s=n(19860),d=n(70941),c=n(19438),u=n(9019),p=n(35898),x=n(42695),h=n(24631),g=n(83929),m=n(44758),f=n(9506),Z=n(69099),j=n(57632),b=n(48119),v=n(73428),y=n(51629),S=n(66835),C=n(23477),w=n(24076),T=n(57861),_=n(61113),D=n(33497),k=(n(1759),n(22903),n(1834)),F=(n(62831),n(64224)),P=n(66135),M=n(70816),I=n.n(M),R=n(11692),B=(n(56052),n(61689)),z=n(27754),A=(n(36287),n(45987)),W=n(50301),E=n(94469),Y=n(33604),L=n(47131),V=n(96467),O=n(85281),U=n(11198),J=n(79429),q=n(3463),G=n(5866),H=n(34229),K=n.n(H),$=(n(61581),n(86728)),Q=(n(42805),n(74031)),N=n(46417),X=["children","onClose"],ee=l.forwardRef((function(e,t){return(0,N.jsx)(W.Z,(0,r.Z)({direction:"down",ref:t},e))})),te=(0,o.ZP)(E.Z)((function(e){var t=e.theme;return{"& .MuDialogContent-root":{padding:t.spacing(2)},"& .MuDialogActions-root":{padding:t.spacing(1)}}})),ne=function(e){var t=e.children,n=e.onClose,i=(0,A.Z)(e,X);return(0,N.jsxs)(Y.Z,(0,r.Z)((0,r.Z)({sx:{m:0,py:1,px:2}},i),{},{children:[t,n?(0,N.jsx)(L.Z,{"aria-label":"close",onClick:n,sx:{position:"absolute",right:10,top:10,color:function(e){return e.palette.grey[500]}},children:(0,N.jsx)(U.Z,{})}):null]}))},re=((0,P.$j)(null,{UpdateBdTargetsApi:z.QQ})((function(e){(0,$.Z)();var t=e.open,n=e.close,r=e.UpdateBdTargetsApi,a=e.totalTarget,o=e.targetId,s=(0,F.I0)(),d=((0,l.useRef)(null),(0,l.useState)(!1)),c=(0,i.Z)(d,2),p=(c[0],c[1],(0,l.useState)(!1)),x=(0,i.Z)(p,2),g=(x[0],x[1]),m=(0,l.useState)(""),j=(0,i.Z)(m,2),b=(j[0],j[1],(0,l.useState)("")),v=(0,i.Z)(b,2),y=(v[0],v[1],(0,l.useState)(!1)),S=(0,i.Z)(y,2),C=(S[0],S[1],(0,l.useState)([])),w=(0,i.Z)(C,2),T=(w[0],w[1],(0,l.useState)("")),D=(0,i.Z)(T,2),k=(D[0],D[1],(0,l.useState)("")),P=(0,i.Z)(k,2),M=(P[0],P[1],(0,l.useState)("")),I=(0,i.Z)(M,2),R=(I[0],I[1],(0,l.useState)("")),B=(0,i.Z)(R,2),z=(B[0],B[1],(0,l.useState)("")),A=(0,i.Z)(z,2),W=(A[0],A[1],{target_total:a}),E=q.Ry({target_total:q.Z_().required("Targets Field is Required")}),Y=(0,J.TA)({enableReinitialize:!0,initialValues:W,validationSchema:E,onSubmit:function(e,t){var i=t.setSubmitting,a={target_id:o,targets:e.target_total};g(!0),r(a).then((function(e){!0===e.succeeded?(n(),g(!1),i(!1),s((0,G.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(g(!1),i(!1),s((0,G.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))}))}});return(0,N.jsx)("div",{children:(0,N.jsxs)(te,{open:t,"aria-labelledby":"customized-dialog-title",TransitionComponent:ee,maxWidth:"xl",fullWidth:!0,sx:{"& .MuiDialog-paper":{width:"100%",maxWidth:"500px",padding:"0px",top:"-100px"}},children:[(0,N.jsx)(ne,{id:"customized-dialog-title",onClose:function(){n()},sx:{background:"#e0f4ff"},children:(0,N.jsx)(_.Z,{variant:"h6",component:"h6",sx:{pl:"10px",fontSize:"1em",color:"#468ccc"},align:"center",children:"Update Targets"})}),(0,N.jsx)(K(),{component:"div",style:{scrollbarWidth:"thin",scrollbarColor:"#b2b3b3 #f1f1f1"},children:(0,N.jsx)(V.Z,{dividers:!0,sx:{px:0},children:(0,N.jsx)(J.J9,{children:(0,N.jsxs)("form",{noValidate:!0,onSubmit:Y.handleSubmit,children:[(0,N.jsx)(u.ZP,{container:!0,spacing:2,sx:{p:"10px 30px"},children:(0,N.jsxs)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:[(0,N.jsxs)(_.Z,{variant:"h5",sx:{width:"180px"},children:["Target",(0,N.jsx)("span",{style:{color:"red"},children:"*"})]}),(0,N.jsx)(h.Z,{fullWidth:!0,placeholder:"Enter Target",type:"number",InputLabelProps:{shrink:!0},style:{display:"flex",justifyContent:"flex-start",marginBottom:"5px ",marginTop:"5px "},name:"target_total",onKeyDown:Q.JR,value:Y.values.target_total,onChange:Y.handleChange,error:Y.touched.target_total&&Boolean(Y.errors.target_total),helperText:Y.touched.target_total&&Y.errors.target_total,onBlur:Y.handleBlur})]})}),(0,N.jsx)(f.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,N.jsx)(Z.Z,{size:"small",type:"submit",variant:"contained",color:"secondary",disabled:Y.isSubmitting,sx:{pl:2,borderRadius:"10px",width:"20%",color:"#468ccc",background:"#e0f4ff",height:"35px","&:hover":{background:"#468ccc",color:"#e0f4ff"}},children:Y.isSubmitting?(0,N.jsx)(N.Fragment,{children:(0,N.jsx)(O.Z,{color:"inherit",size:20})}):"Update"})})]})})})})]})})})),["children","onClose"]),ie=l.forwardRef((function(e,t){return(0,N.jsx)(W.Z,(0,r.Z)({direction:"down",ref:t},e))})),ae=(0,o.ZP)(E.Z)((function(e){var t=e.theme;return{"& .MuDialogContent-root":{padding:t.spacing(2)},"& .MuDialogActions-root":{padding:t.spacing(1)}}})),le=function(e){var t=e.children,n=e.onClose,i=(0,A.Z)(e,re);return(0,N.jsxs)(Y.Z,(0,r.Z)((0,r.Z)({sx:{m:0,py:1,px:2}},i),{},{children:[t,n?(0,N.jsx)(L.Z,{"aria-label":"close",onClick:n,sx:{position:"absolute",right:10,top:10,color:function(e){return e.palette.grey[500]}},children:(0,N.jsx)(U.Z,{})}):null]}))},oe=((0,P.$j)(null,{UpdateCompleteTargetsApi:z.iH})((function(e){(0,$.Z)();var t=e.open,n=e.close,r=e.UpdateCompleteTargetsApi,a=(e.completeTarget,e.bdId),o=e.targetId,s=(0,F.I0)(),d=((0,l.useRef)(null),(0,l.useState)(!1)),c=(0,i.Z)(d,2),p=(c[0],c[1],(0,l.useState)(!1)),x=(0,i.Z)(p,2),g=(x[0],x[1]),m=(0,l.useState)(""),j=(0,i.Z)(m,2),b=(j[0],j[1],(0,l.useState)("")),v=(0,i.Z)(b,2),y=(v[0],v[1],(0,l.useState)(!1)),S=(0,i.Z)(y,2),C=(S[0],S[1],(0,l.useState)([])),w=(0,i.Z)(C,2),T=(w[0],w[1],(0,l.useState)("")),D=(0,i.Z)(T,2),k=(D[0],D[1],(0,l.useState)("")),P=(0,i.Z)(k,2),M=(P[0],P[1],(0,l.useState)("")),I=(0,i.Z)(M,2),R=(I[0],I[1],(0,l.useState)("")),B=(0,i.Z)(R,2),z=(B[0],B[1],(0,l.useState)("")),A=(0,i.Z)(z,2),W=(A[0],A[1],q.Ry({complete_target:q.Z_().required("Completed Target Field is Required")})),E=(0,J.TA)({enableReinitialize:!0,initialValues:{complete_target:""},validationSchema:W,onSubmit:function(e,t){var i=t.setSubmitting,l={target_id:o,complete_target:e.complete_target,bd_id:a};g(!0),r(l).then((function(e){!0===e.succeeded?(n(),g(!1),i(!1),s((0,G.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(g(!1),i(!1),s((0,G.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))})).catch((function(){i(!1)}))}});return(0,N.jsx)(N.Fragment,{children:(0,N.jsxs)(ae,{open:t,"aria-labelledby":"customized-dialog-title",TransitionComponent:ie,maxWidth:"xl",fullWidth:!0,sx:{"& .MuiDialog-paper":{width:"100%",maxWidth:"500px",padding:"0px",top:"-100px"}},children:[(0,N.jsx)(le,{id:"customized-dialog-title",onClose:function(){n()},sx:{background:"#e0f4ff"},children:(0,N.jsx)(_.Z,{variant:"h6",component:"h6",sx:{pl:"10px",fontSize:"1em",color:"#468ccc"},align:"center",children:"Update Completed Targets"})}),(0,N.jsx)(K(),{component:"div",style:{scrollbarWidth:"thin",scrollbarColor:"#b2b3b3 #f1f1f1"},children:(0,N.jsx)(V.Z,{dividers:!0,sx:{px:0},children:(0,N.jsx)(J.J9,{children:(0,N.jsxs)("form",{noValidate:!0,onSubmit:E.handleSubmit,children:[(0,N.jsx)(u.ZP,{container:!0,spacing:2,sx:{p:"10px 30px"},children:(0,N.jsxs)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:[(0,N.jsxs)(_.Z,{variant:"h5",sx:{width:"180px"},children:["Completed Target",(0,N.jsx)("span",{style:{color:"red"},children:"*"})]}),(0,N.jsx)(h.Z,{fullWidth:!0,placeholder:"Enter Target",type:"number",InputLabelProps:{shrink:!0},style:{display:"flex",justifyContent:"flex-start",marginBottom:"5px ",marginTop:"5px "},name:"complete_target",onKeyDown:Q.JR,value:E.values.complete_target,onChange:E.handleChange,error:E.touched.complete_target&&Boolean(E.errors.complete_target),helperText:E.touched.complete_target&&E.errors.complete_target,onBlur:E.handleBlur})]})}),(0,N.jsx)(f.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,N.jsx)(Z.Z,{size:"small",type:"submit",variant:"contained",color:"secondary",disabled:E.isSubmitting,sx:{pl:2,borderRadius:"10px",width:"20%",color:"#468ccc",background:"#e0f4ff",height:"35px","&:hover":{background:"#468ccc",color:"#e0f4ff"}},children:E.isSubmitting?(0,N.jsx)(N.Fragment,{children:(0,N.jsx)(O.Z,{color:"inherit",size:20})}):"Update"})})]})})})})]})})})),n(28686)),se=n(43394),de=n(44948),ce=n(12401),ue=(n(14694),n(89535),n(1661)),pe=n(34165),xe=n(66182),he=(0,o.ZP)(d.Z)((function(e){var t,n=e.theme;return t={},(0,a.Z)(t,"&.".concat(c.Z.head),{border:"1px solid ".concat(n.palette.grey[400]),borderRadius:"50%"}),(0,a.Z)(t,"&.".concat(c.Z.body),{border:"1px solid ".concat(n.palette.grey[400]),borderRadius:"10px"}),t})),ge=(0,o.ZP)(d.Z)((function(e){var t=e.theme;return(0,a.Z)({},"&.".concat(c.Z.head),{border:"1px solid ".concat(t.palette.grey[400]),borderRadius:"50%",fontSize:"1rem",fontWeight:900})})),me=(0,P.$j)(null,{ClFilterTargetsApi:z.dd})((function(e){var t=e.ClFilterTargetsApi,n=(0,s.Z)(),a=(0,l.useState)(0),o=(0,i.Z)(a,2),d=(o[0],o[1],(0,l.useState)(10)),c=(0,i.Z)(d,2),M=(c[0],c[1],(0,l.useState)(!1)),A=(0,i.Z)(M,2),W=(A[0],A[1],(0,l.useState)("")),E=(0,i.Z)(W,2),Y=(E[0],E[1],(0,P.v9)((function(e){return e.clusterLeadAction}))),L=Y.getFilterTargetDetails,V=Y.getBdeDropdownList,O=Y.getFilterTargetDetailsLoading,U=(0,l.useState)(""),q=(0,i.Z)(U,2),H=(q[0],q[1],(0,P.v9)((function(e){return e.masterAction})).leadStatusList,(0,l.useState)([])),K=(0,i.Z)(H,2),$=(K[0],K[1],(0,l.useState)(!1)),X=(0,i.Z)($,2),ee=X[0],te=X[1];(0,l.useEffect)((function(){(0,F.WI)((0,z.n6)())}),[]);var ne={selectedMonth:[],selectedBDE:[],selectedYear:new Date,isClusterTarg:!1},re=(0,J.TA)({initialValues:ne,onSubmit:function(e,n){var r=n.setSubmitting,i={isClusterTarg:e.isClusterTarg,selectedMonth:e.selectedMonth,selectedBDE:e.selectedBDE,selectedYear:null!==e.selectedYear?I()(null===e||void 0===e?void 0:e.selectedYear).format("YYYY"):new Date};t(i).then((function(e){!0===e.succeeded?(r(!1),(0,F.WI)((0,G.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(r(!1),(0,F.WI)((0,G.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))})).catch((function(){r(!1)}))}});(0,l.useEffect)((function(){var e={isClusterTarg:!1,selectedMonth:re.selectedMonth,selectedBDE:re.selectedBDE,selectedYear:null!==re.selectedYear?re.selectedYear:""};t(e)}),[]);function ie(e,t,n,r,i){return{name:e,calories:t,fat:n,carbs:r,protein:i}}ie("Jan",3500,0,-3500),ie("Fab",7e3,0,-7e3),ie("Marc",10500,0,-10500);return(0,N.jsx)(N.Fragment,{children:(0,N.jsxs)(u.ZP,{container:!0,spacing:2,sx:{"&.MuiGrid-root":{pt:0}},children:[ee?"":(0,N.jsx)(u.ZP,{item:!0,xs:2,sx:{mb:0,alignItems:"left"},children:(0,N.jsx)(D.Z,{content:!1,title:(0,N.jsxs)(p.Z,{direction:"row",children:[(0,N.jsx)(k.wHY,{sx:{mr:2}})," \xa0 Filters"]}),sx:{border:"0px solid",padding:"10px",height:"100vh"},children:(0,N.jsx)("form",{onSubmit:re.handleSubmit,children:(0,N.jsxs)(u.ZP,{container:!0,spacing:ce.dv,sx:{mt:1},children:[(0,N.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,N.jsx)(x.Z,{multiple:!0,fullWidth:!0,options:V,getOptionLabel:function(e){return e.name},value:null===V||void 0===V?void 0:V.filter((function(e){return re.values.selectedBDE.includes(e._id)})),onChange:function(e,t){var n=t?t.map((function(e){return e._id})):[];re.setFieldValue("selectedBDE",n),re.setFieldValue("isClusterTarg",!1)},renderInput:function(e){return(0,N.jsx)(h.Z,(0,r.Z)((0,r.Z)({},e),{},{label:"Select BDE",inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"})}))}})}),(0,N.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,N.jsx)(x.Z,{id:"month-select",fullWidth:!0,multiple:!0,options:Q.e7,getOptionLabel:function(e){return e.label},value:Q.e7.filter((function(e){return re.values.selectedMonth.includes(e.label)})),onChange:function(e,t){var n=t.some((function(e){return"All Months"===e.label}))?Q.e7.slice(1):t.map((function(e){return e.label}));re.setFieldValue("selectedMonth",n)},renderInput:function(e){return(0,N.jsx)(h.Z,(0,r.Z)((0,r.Z)({},e),{},{label:"Select Month",inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"})}))}})}),(0,N.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,N.jsx)(se._,{dateAdapter:oe.H,children:(0,N.jsx)(de.M,{views:["year"],renderInput:function(e){return(0,N.jsx)(h.Z,(0,r.Z)((0,r.Z)({fullWidth:!0},e),{},{inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"}),onKeyDown:function(e){return e.preventDefault()}}))},value:re.values.selectedYear,onChange:function(e){re.setFieldValue("selectedYear",e)},maxDate:new Date,minDate:new Date("2000-01-01")})})}),(0,N.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,N.jsx)(g.Z,{control:(0,N.jsx)(m.Z,{checked:re.values.isClusterTarg,onChange:function(e){re.setFieldValue("isClusterTarg",e.target.checked),re.setFieldValue("selectedBDE",[])}}),label:"Self Target"})}),(0,N.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,N.jsx)(f.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,N.jsx)(xe.Z,{scale:{hover:1.1,tap:.9},children:(0,N.jsx)(Z.Z,{variant:"contained",color:"primary",type:"submit",sx:{px:5,width:"100%",boxShadow:n.customShadows.primary,":hover":{boxShadow:"none"}},children:"Go Filter"})})})})]})})})}),(0,N.jsx)(u.ZP,{item:!0,xs:10,md:ee?12:10,sx:{mb:0,alignItems:"left"},children:(0,N.jsx)(D.Z,{content:!1,title:(0,N.jsxs)(p.Z,{direction:"row",children:[(0,N.jsx)(B.Z,{title:ee?"Collapse Right":"Collapse Left",arrow:!0,disableFocusListener:!0,disableTouchListener:!0,placement:"left-start",TransitionComponent:j.Z,children:(0,N.jsx)(b.Z,{variant:"rounded",sx:(0,r.Z)((0,r.Z)((0,r.Z)({},n.typography.commonAvatar),n.typography.mediumAvatar),{},{transition:"all .2s ease-in-out",border:"2px solid",bgcolor:n.palette.background.default,boxShadow:"2",backgroundColor:"dark"===n.palette.mode?n.palette.dark.main:n.palette.primary.light,'&[aria-controls="menu-list-grow"],&:hover':{boxShadow:"7",background:"".concat(n.palette.primary.main,"!important"),color:n.palette.primary.light}}),color:"inherit",onClick:function(){return te(!ee)},children:ee?(0,N.jsx)(ue.Z,{stroke:1.5,size:"20px"}):(0,N.jsx)(pe.Z,{stroke:1.5,size:"20px"})})})," ","\xa0 BDE Targets"]}),sx:{border:"0px solid",padding:"5px"},children:(0,N.jsx)(u.ZP,{container:!0,spacing:2,sx:{mt:0},children:!O&&(null===L||void 0===L?void 0:L.length)>0?null===L||void 0===L?void 0:L.map((function(e,t){var r,i,a,l,o=null===e||void 0===e||null===(r=e.targData)||void 0===r?void 0:r.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.targets)||0}),0),s=null===e||void 0===e||null===(i=e.targData)||void 0===i?void 0:i.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.completed_target)||0}),0);null===e||void 0===e||null===(a=e.targData)||void 0===a||a.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.remaining_target)||0}),0);return(0,N.jsx)(u.ZP,{item:!0,xs:6,md:6,sx:{mb:0,alignItems:"left"},children:(0,N.jsx)(v.Z,{sx:{p:2,background:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],border:"dark"===n.palette.mode?"1px solid transparent":"1px solid".concat(n.palette.grey[100]),borderColor:n.palette.grey[400],boxShadow:"4","&:hover":{borderColor:n.palette.primary.main,boxShadow:"18"}},children:(0,N.jsx)(y.Z,{children:(0,N.jsxs)(S.Z,{children:[(0,N.jsxs)(C.Z,{children:[(0,N.jsxs)(w.Z,{children:[(0,N.jsx)(he,{children:"Monthly Sales"}),(0,N.jsx)(ge,{colSpan:4,align:"center",children:null===e||void 0===e?void 0:e.name})]}),(0,N.jsxs)(w.Z,{children:[(0,N.jsx)(he,{children:"Month"}),(0,N.jsx)(he,{align:"center",sx:{px:0,py:1},children:"Target"}),(0,N.jsx)(he,{align:"center",sx:{px:0,py:1},children:"Total Target"}),(0,N.jsx)(he,{align:"center",sx:{px:0,py:1},children:"Confirm Business"}),(0,N.jsx)(he,{align:"center",sx:{px:0,py:1},children:"Gap"})]})]}),(0,N.jsxs)(T.Z,{children:[null===e||void 0===e||null===(l=e.targData)||void 0===l?void 0:l.map((function(e,t){return(0,N.jsxs)(w.Z,{children:[(0,N.jsx)(he,{component:"th",scope:"row",children:null===e||void 0===e?void 0:e.target_month}),(0,N.jsx)(he,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.targets}),(0,N.jsx)(he,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.total_target}),(0,N.jsx)(he,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.completed_target}),(0,N.jsx)(he,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.remaining_target})]},t)})),(0,N.jsxs)(w.Z,{children:[(0,N.jsx)(he,{sx:{fontWeight:500},component:"th",scope:"row",children:"Total"}),(0,N.jsx)(he,{align:"center",children:o}),(0,N.jsx)(he,{align:"center",children:"--"}),(0,N.jsx)(he,{align:"center",children:s}),(0,N.jsx)(he,{align:"center",children:o-s})]})]})]})})})},t)})):(0,N.jsx)(N.Fragment,{children:!0===O?(0,N.jsx)(y.Z,{children:(0,N.jsx)(S.Z,{children:(0,N.jsx)(R._A,{rows:5})})}):(0,N.jsx)(u.ZP,{item:!0,xs:12,md:12,sx:{mb:0,alignItems:"left"},children:(0,N.jsxs)(v.Z,{sx:{p:2,background:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],border:"dark"===n.palette.mode?"1px solid transparent":"1px solid".concat(n.palette.grey[100]),"&:hover":{borderColor:n.palette.primary.main}},children:[(0,N.jsx)(_.Z,{sx:{pr:3},align:"center",colSpan:10,children:"FOCUS"}),(0,N.jsx)(_.Z,{sx:{pr:3},align:"center",colSpan:10,children:"If you chase two rabbits, both will escape"})]})})})})})})]})})}))}}]);