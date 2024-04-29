"use strict";(self.webpackChunklead_management_system_dashboard=self.webpackChunklead_management_system_dashboard||[]).push([[550],{50550:function(e,t,n){n.r(t),n.d(t,{default:function(){return me}});var r=n(1413),i=n(29439),a=n(4942),l=n(47313),o=n(17592),s=n(19860),d=n(70941),c=n(19438),u=n(9019),p=n(35898),x=n(42695),h=n(24631),g=n(83929),m=n(44758),f=n(9506),Z=n(69099),b=n(57632),j=n(48119),v=n(73428),y=n(51629),S=n(66835),C=n(23477),w=n(24076),T=n(57861),_=n(61113),k=n(33497),D=(n(1759),n(22903),n(1834)),P=(n(62831),n(64224)),F=n(66135),I=n(70816),M=n.n(I),R=(n(11692),n(56052),n(61689)),B=n(27754),z=(n(36287),n(45987)),A=n(50301),W=n(94469),E=n(33604),Y=n(47131),L=n(96467),V=n(85281),O=n(11198),U=n(79429),J=n(3463),q=n(5866),G=n(34229),H=n.n(G),K=(n(61581),n(86728)),$=(n(42805),n(74031)),Q=n(46417),N=["children","onClose"],X=l.forwardRef((function(e,t){return(0,Q.jsx)(A.Z,(0,r.Z)({direction:"left",ref:t},e))})),ee=(0,o.ZP)(W.Z)((function(e){var t=e.theme;return{"& .MuDialogContent-root":{padding:t.spacing(2)},"& .MuDialogActions-root":{padding:t.spacing(1)}}})),te=function(e){var t=e.children,n=e.onClose,i=(0,z.Z)(e,N);return(0,Q.jsxs)(E.Z,(0,r.Z)((0,r.Z)({sx:{m:0,py:1,px:2}},i),{},{children:[t,n?(0,Q.jsx)(Y.Z,{"aria-label":"close",onClick:n,sx:{position:"absolute",right:10,top:10,color:function(e){return e.palette.grey[500]}},children:(0,Q.jsx)(O.Z,{})}):null]}))},ne=((0,F.$j)(null,{UpdateBdTargetsApi:B.QQ})((function(e){(0,K.Z)();var t=e.open,n=e.close,r=e.UpdateBdTargetsApi,a=e.totalTarget,o=e.targetId,s=(0,P.I0)(),d=((0,l.useRef)(null),(0,l.useState)(!1)),c=(0,i.Z)(d,2),p=(c[0],c[1],(0,l.useState)(!1)),x=(0,i.Z)(p,2),g=(x[0],x[1]),m=(0,l.useState)(""),b=(0,i.Z)(m,2),j=(b[0],b[1],(0,l.useState)("")),v=(0,i.Z)(j,2),y=(v[0],v[1],(0,l.useState)(!1)),S=(0,i.Z)(y,2),C=(S[0],S[1],(0,l.useState)([])),w=(0,i.Z)(C,2),T=(w[0],w[1],(0,l.useState)("")),k=(0,i.Z)(T,2),D=(k[0],k[1],(0,l.useState)("")),F=(0,i.Z)(D,2),I=(F[0],F[1],(0,l.useState)("")),M=(0,i.Z)(I,2),R=(M[0],M[1],(0,l.useState)("")),B=(0,i.Z)(R,2),z=(B[0],B[1],(0,l.useState)("")),A=(0,i.Z)(z,2),W=(A[0],A[1],{target_total:a}),E=J.Ry({target_total:J.Z_().required("Targets Field is Required")}),Y=(0,U.TA)({enableReinitialize:!0,initialValues:W,validationSchema:E,onSubmit:function(e,t){var i=t.setSubmitting,a={target_id:o,targets:e.target_total};g(!0),r(a).then((function(e){!0===e.succeeded?(n(),g(!1),i(!1),s((0,q.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(g(!1),i(!1),s((0,q.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))}))}});return(0,Q.jsx)("div",{children:(0,Q.jsxs)(ee,{open:t,"aria-labelledby":"customized-dialog-title",TransitionComponent:X,maxWidth:"xl",fullWidth:!0,sx:{"& .MuiDialog-paper":{width:"100%",maxWidth:"500px",padding:"0px",top:"-100px"}},children:[(0,Q.jsx)(te,{id:"customized-dialog-title",onClose:function(){n()},sx:{background:"#e0f4ff"},children:(0,Q.jsx)(_.Z,{variant:"h6",component:"h6",sx:{pl:"10px",fontSize:"1em",color:"#468ccc"},align:"center",children:"Update Targets"})}),(0,Q.jsx)(H(),{component:"div",style:{scrollbarWidth:"thin",scrollbarColor:"#b2b3b3 #f1f1f1"},children:(0,Q.jsx)(L.Z,{dividers:!0,sx:{px:0},children:(0,Q.jsx)(U.J9,{children:(0,Q.jsxs)("form",{noValidate:!0,onSubmit:Y.handleSubmit,children:[(0,Q.jsx)(u.ZP,{container:!0,spacing:2,sx:{p:"10px 30px"},children:(0,Q.jsxs)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:[(0,Q.jsxs)(_.Z,{variant:"h5",sx:{width:"180px"},children:["Target",(0,Q.jsx)("span",{style:{color:"red"},children:"*"})]}),(0,Q.jsx)(h.Z,{fullWidth:!0,placeholder:"Enter Target",type:"number",InputLabelProps:{shrink:!0},style:{display:"flex",justifyContent:"flex-start",marginBottom:"5px ",marginTop:"5px "},name:"target_total",onKeyDown:$.JR,value:Y.values.target_total,onChange:Y.handleChange,error:Y.touched.target_total&&Boolean(Y.errors.target_total),helperText:Y.touched.target_total&&Y.errors.target_total,onBlur:Y.handleBlur})]})}),(0,Q.jsx)(f.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,Q.jsx)(Z.Z,{size:"small",type:"submit",variant:"contained",color:"secondary",disabled:Y.isSubmitting,sx:{pl:2,borderRadius:"10px",width:"20%",color:"#468ccc",background:"#e0f4ff",height:"35px","&:hover":{background:"#468ccc",color:"#e0f4ff"}},children:Y.isSubmitting?(0,Q.jsx)(Q.Fragment,{children:(0,Q.jsx)(V.Z,{color:"inherit",size:20})}):"Update"})})]})})})})]})})})),["children","onClose"]),re=l.forwardRef((function(e,t){return(0,Q.jsx)(A.Z,(0,r.Z)({direction:"left",ref:t},e))})),ie=(0,o.ZP)(W.Z)((function(e){var t=e.theme;return{"& .MuDialogContent-root":{padding:t.spacing(2)},"& .MuDialogActions-root":{padding:t.spacing(1)}}})),ae=function(e){var t=e.children,n=e.onClose,i=(0,z.Z)(e,ne);return(0,Q.jsxs)(E.Z,(0,r.Z)((0,r.Z)({sx:{m:0,py:1,px:2}},i),{},{children:[t,n?(0,Q.jsx)(Y.Z,{"aria-label":"close",onClick:n,sx:{position:"absolute",right:10,top:10,color:function(e){return e.palette.grey[500]}},children:(0,Q.jsx)(O.Z,{})}):null]}))},le=((0,F.$j)(null,{UpdateCompleteTargetsApi:B.iH})((function(e){(0,K.Z)();var t=e.open,n=e.close,r=e.UpdateCompleteTargetsApi,a=(e.completeTarget,e.bdId),o=e.targetId,s=(0,P.I0)(),d=((0,l.useRef)(null),(0,l.useState)(!1)),c=(0,i.Z)(d,2),p=(c[0],c[1],(0,l.useState)(!1)),x=(0,i.Z)(p,2),g=(x[0],x[1]),m=(0,l.useState)(""),b=(0,i.Z)(m,2),j=(b[0],b[1],(0,l.useState)("")),v=(0,i.Z)(j,2),y=(v[0],v[1],(0,l.useState)(!1)),S=(0,i.Z)(y,2),C=(S[0],S[1],(0,l.useState)([])),w=(0,i.Z)(C,2),T=(w[0],w[1],(0,l.useState)("")),k=(0,i.Z)(T,2),D=(k[0],k[1],(0,l.useState)("")),F=(0,i.Z)(D,2),I=(F[0],F[1],(0,l.useState)("")),M=(0,i.Z)(I,2),R=(M[0],M[1],(0,l.useState)("")),B=(0,i.Z)(R,2),z=(B[0],B[1],(0,l.useState)("")),A=(0,i.Z)(z,2),W=(A[0],A[1],J.Ry({complete_target:J.Z_().required("Completed Target Field is Required")})),E=(0,U.TA)({enableReinitialize:!0,initialValues:{complete_target:""},validationSchema:W,onSubmit:function(e,t){var i=t.setSubmitting,l={target_id:o,complete_target:e.complete_target,bd_id:a};g(!0),r(l).then((function(e){!0===e.succeeded?(n(),g(!1),i(!1),s((0,q.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(g(!1),i(!1),s((0,q.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))})).catch((function(){i(!1)}))}});return(0,Q.jsx)(Q.Fragment,{children:(0,Q.jsxs)(ie,{open:t,"aria-labelledby":"customized-dialog-title",TransitionComponent:re,maxWidth:"xl",fullWidth:!0,sx:{"& .MuiDialog-paper":{width:"100%",maxWidth:"500px",padding:"0px",top:"-100px"}},children:[(0,Q.jsx)(ae,{id:"customized-dialog-title",onClose:function(){n()},sx:{background:"#e0f4ff"},children:(0,Q.jsx)(_.Z,{variant:"h6",component:"h6",sx:{pl:"10px",fontSize:"1em",color:"#468ccc"},align:"center",children:"Update Completed Targets"})}),(0,Q.jsx)(H(),{component:"div",style:{scrollbarWidth:"thin",scrollbarColor:"#b2b3b3 #f1f1f1"},children:(0,Q.jsx)(L.Z,{dividers:!0,sx:{px:0},children:(0,Q.jsx)(U.J9,{children:(0,Q.jsxs)("form",{noValidate:!0,onSubmit:E.handleSubmit,children:[(0,Q.jsx)(u.ZP,{container:!0,spacing:2,sx:{p:"10px 30px"},children:(0,Q.jsxs)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:[(0,Q.jsxs)(_.Z,{variant:"h5",sx:{width:"180px"},children:["Completed Target",(0,Q.jsx)("span",{style:{color:"red"},children:"*"})]}),(0,Q.jsx)(h.Z,{fullWidth:!0,placeholder:"Enter Target",type:"number",InputLabelProps:{shrink:!0},style:{display:"flex",justifyContent:"flex-start",marginBottom:"5px ",marginTop:"5px "},name:"complete_target",onKeyDown:$.JR,value:E.values.complete_target,onChange:E.handleChange,error:E.touched.complete_target&&Boolean(E.errors.complete_target),helperText:E.touched.complete_target&&E.errors.complete_target,onBlur:E.handleBlur})]})}),(0,Q.jsx)(f.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,Q.jsx)(Z.Z,{size:"small",type:"submit",variant:"contained",color:"secondary",disabled:E.isSubmitting,sx:{pl:2,borderRadius:"10px",width:"20%",color:"#468ccc",background:"#e0f4ff",height:"35px","&:hover":{background:"#468ccc",color:"#e0f4ff"}},children:E.isSubmitting?(0,Q.jsx)(Q.Fragment,{children:(0,Q.jsx)(V.Z,{color:"inherit",size:20})}):"Update"})})]})})})})]})})})),n(28686)),oe=n(43394),se=n(44948),de=n(12401),ce=(n(14694),n(89535),n(1661)),ue=n(34165),pe=n(66182),xe=n(1862),he=(0,o.ZP)(d.Z)((function(e){var t,n=e.theme;return t={},(0,a.Z)(t,"&.".concat(c.Z.head),{border:"1px solid ".concat(n.palette.grey[400]),borderRadius:"50%"}),(0,a.Z)(t,"&.".concat(c.Z.body),{border:"1px solid ".concat(n.palette.grey[400]),borderRadius:"10px"}),t})),ge=(0,o.ZP)(d.Z)((function(e){var t=e.theme;return(0,a.Z)({},"&.".concat(c.Z.head),{border:"1px solid ".concat(t.palette.grey[400]),borderRadius:"50%",fontSize:"1rem",fontWeight:900})})),me=(0,F.$j)(null,{ClFilterTargetsApi:B.dd})((function(e){var t=e.ClFilterTargetsApi,n=(0,s.Z)(),a=(0,l.useState)(0),o=(0,i.Z)(a,2),d=(o[0],o[1],(0,l.useState)(10)),c=(0,i.Z)(d,2),I=(c[0],c[1],(0,l.useState)(!1)),z=(0,i.Z)(I,2),A=(z[0],z[1],(0,l.useState)("")),W=(0,i.Z)(A,2),E=(W[0],W[1],(0,F.v9)((function(e){return e.clusterLeadAction}))),Y=E.getFilterTargetDetails,L=E.getBdeDropdownList,V=E.getFilterTargetDetailsLoading,O=(0,l.useState)(""),J=(0,i.Z)(O,2),G=(J[0],J[1],(0,F.v9)((function(e){return e.masterAction})).leadStatusList,(0,l.useState)([])),H=(0,i.Z)(G,2),K=(H[0],H[1],(0,l.useState)(!1)),N=(0,i.Z)(K,2),X=N[0],ee=N[1];(0,l.useEffect)((function(){(0,P.WI)((0,B.n6)())}),[]);var te={selectedMonth:[],selectedBDE:[],selectedYear:new Date,isClusterTarg:!1},ne=(0,U.TA)({initialValues:te,onSubmit:function(e,n){var r=n.setSubmitting,i={isClusterTarg:e.isClusterTarg,selectedMonth:e.selectedMonth,selectedBDE:e.selectedBDE,selectedYear:null!==e.selectedYear?M()(null===e||void 0===e?void 0:e.selectedYear).format("YYYY"):new Date};t(i).then((function(e){!0===e.succeeded?(r(!1),(0,P.WI)((0,q.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(r(!1),(0,P.WI)((0,q.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))})).catch((function(){r(!1)}))}});(0,l.useEffect)((function(){var e={isClusterTarg:!1,selectedMonth:ne.selectedMonth,selectedBDE:ne.selectedBDE,selectedYear:null!==ne.selectedYear?ne.selectedYear:""};t(e)}),[]);function re(e,t,n,r,i){return{name:e,calories:t,fat:n,carbs:r,protein:i}}re("Jan",3500,0,-3500),re("Fab",7e3,0,-7e3),re("Marc",10500,0,-10500);return(0,Q.jsx)(Q.Fragment,{children:(0,Q.jsxs)(u.ZP,{container:!0,spacing:2,sx:{"&.MuiGrid-root":{pt:0}},children:[X?"":(0,Q.jsx)(u.ZP,{item:!0,xs:2,sx:{mb:0,alignItems:"left"},children:(0,Q.jsx)(k.Z,{content:!1,title:(0,Q.jsxs)(p.Z,{direction:"row",children:[(0,Q.jsx)(D.wHY,{sx:{mr:2}})," \xa0 Filters"]}),sx:{border:"0px solid",padding:"10px",height:"100vh"},children:(0,Q.jsx)("form",{onSubmit:ne.handleSubmit,children:(0,Q.jsxs)(u.ZP,{container:!0,spacing:de.dv,sx:{mt:1},children:[(0,Q.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,Q.jsx)(x.Z,{multiple:!0,fullWidth:!0,options:L,getOptionLabel:function(e){return e.name},value:null===L||void 0===L?void 0:L.filter((function(e){return ne.values.selectedBDE.includes(e._id)})),onChange:function(e,t){var n=t?t.map((function(e){return e._id})):[];ne.setFieldValue("selectedBDE",n),ne.setFieldValue("isClusterTarg",!1)},renderInput:function(e){return(0,Q.jsx)(h.Z,(0,r.Z)((0,r.Z)({},e),{},{label:"Select BDE",inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"})}))}})}),(0,Q.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,Q.jsx)(x.Z,{id:"month-select",fullWidth:!0,multiple:!0,options:$.e7,getOptionLabel:function(e){return e.label},value:$.e7.filter((function(e){return ne.values.selectedMonth.includes(e.label)})),onChange:function(e,t){var n=t.some((function(e){return"All Months"===e.label}))?$.e7.slice(1):t.map((function(e){return e.label}));ne.setFieldValue("selectedMonth",n)},renderInput:function(e){return(0,Q.jsx)(h.Z,(0,r.Z)((0,r.Z)({},e),{},{label:"Select Month",inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"})}))}})}),(0,Q.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,Q.jsx)(oe._,{dateAdapter:le.H,children:(0,Q.jsx)(se.M,{views:["year"],renderInput:function(e){return(0,Q.jsx)(h.Z,(0,r.Z)((0,r.Z)({fullWidth:!0},e),{},{inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"}),onKeyDown:function(e){return e.preventDefault()}}))},value:ne.values.selectedYear,onChange:function(e){ne.setFieldValue("selectedYear",e)},maxDate:new Date,minDate:new Date("2000-01-01")})})}),(0,Q.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,Q.jsx)(g.Z,{control:(0,Q.jsx)(m.Z,{checked:ne.values.isClusterTarg,onChange:function(e){ne.setFieldValue("isClusterTarg",e.target.checked),ne.setFieldValue("selectedBDE",[])}}),label:"Self Target"})}),(0,Q.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,Q.jsx)(f.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,Q.jsx)(pe.Z,{scale:{hover:1.1,tap:.9},children:(0,Q.jsx)(Z.Z,{variant:"contained",color:"primary",type:"submit",sx:{px:5,width:"100%",boxShadow:n.customShadows.primary,":hover":{boxShadow:"none"}},children:"Go Filter"})})})})]})})})}),(0,Q.jsx)(u.ZP,{item:!0,xs:10,md:X?12:10,sx:{mb:0,alignItems:"left"},children:(0,Q.jsx)(k.Z,{content:!1,title:(0,Q.jsxs)(p.Z,{direction:"row",children:[(0,Q.jsx)(R.Z,{title:X?"Collapse Right":"Collapse Left",arrow:!0,disableFocusListener:!0,disableTouchListener:!0,placement:"left-start",TransitionComponent:b.Z,children:(0,Q.jsx)(j.Z,{variant:"rounded",sx:(0,r.Z)((0,r.Z)((0,r.Z)({},n.typography.commonAvatar),n.typography.mediumAvatar),{},{transition:"all .2s ease-in-out",border:"2px solid",bgcolor:n.palette.background.default,boxShadow:"2",backgroundColor:"dark"===n.palette.mode?n.palette.dark.main:n.palette.primary.light,'&[aria-controls="menu-list-grow"],&:hover':{boxShadow:"7",background:"".concat(n.palette.primary.main,"!important"),color:n.palette.primary.light}}),color:"inherit",onClick:function(){return ee(!X)},children:X?(0,Q.jsx)(ce.Z,{stroke:1.5,size:"20px"}):(0,Q.jsx)(ue.Z,{stroke:1.5,size:"20px"})})}),"\xa0 BDE Targets"]}),sx:{border:"0px solid",padding:"5px"},children:(0,Q.jsx)(u.ZP,{container:!0,spacing:2,sx:{mt:0},children:!V&&(null===Y||void 0===Y?void 0:Y.length)>0?null===Y||void 0===Y?void 0:Y.map((function(e,t){var r,i,a,l,o=null===e||void 0===e||null===(r=e.targData)||void 0===r?void 0:r.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.targets)||0}),0),s=null===e||void 0===e||null===(i=e.targData)||void 0===i?void 0:i.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.completed_target)||0}),0);null===e||void 0===e||null===(a=e.targData)||void 0===a||a.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.remaining_target)||0}),0);return(0,Q.jsx)(u.ZP,{item:!0,xs:6,md:6,sx:{mb:0,alignItems:"left"},children:(0,Q.jsx)(v.Z,{sx:{p:2,background:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],border:"dark"===n.palette.mode?"1px solid transparent":"1px solid".concat(n.palette.grey[100]),borderColor:n.palette.grey[400],boxShadow:"4","&:hover":{borderColor:n.palette.primary.main,boxShadow:"18"}},children:(0,Q.jsx)(y.Z,{children:(0,Q.jsxs)(S.Z,{children:[(0,Q.jsxs)(C.Z,{children:[(0,Q.jsxs)(w.Z,{children:[(0,Q.jsx)(he,{children:"Monthly Sales"}),(0,Q.jsx)(ge,{colSpan:4,align:"center",children:null===e||void 0===e?void 0:e.name})]}),(0,Q.jsxs)(w.Z,{children:[(0,Q.jsx)(he,{children:"Month"}),(0,Q.jsx)(he,{align:"center",sx:{px:0,py:1},children:"Target"}),(0,Q.jsx)(he,{align:"center",sx:{px:0,py:1},children:"Total Target"}),(0,Q.jsx)(he,{align:"center",sx:{px:0,py:1},children:"Confirm Business"}),(0,Q.jsx)(he,{align:"center",sx:{px:0,py:1},children:"Gap"})]})]}),(0,Q.jsxs)(T.Z,{children:[null===e||void 0===e||null===(l=e.targData)||void 0===l?void 0:l.map((function(e,t){return(0,Q.jsxs)(w.Z,{children:[(0,Q.jsx)(he,{component:"th",scope:"row",children:null===e||void 0===e?void 0:e.target_month}),(0,Q.jsx)(he,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.targets}),(0,Q.jsx)(he,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.total_target}),(0,Q.jsx)(he,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.completed_target}),(0,Q.jsx)(he,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.remaining_target})]},t)})),(0,Q.jsxs)(w.Z,{children:[(0,Q.jsx)(he,{sx:{fontWeight:500},component:"th",scope:"row",children:"Total"}),(0,Q.jsx)(he,{align:"center",children:o}),(0,Q.jsx)(he,{align:"center",children:"--"}),(0,Q.jsx)(he,{align:"center",children:s}),(0,Q.jsx)(he,{align:"center",children:o-s})]})]})]})})})},t)})):(0,Q.jsx)(Q.Fragment,{children:!0===V?(0,Q.jsx)(u.ZP,{item:!0,xs:6,md:6,sx:{mb:0,alignItems:"left"},children:(0,Q.jsx)(v.Z,{sx:{p:2,background:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],border:"dark"===n.palette.mode?"1px solid transparent":"1px solid".concat(n.palette.grey[100]),borderColor:n.palette.grey[400],boxShadow:"4","&:hover":{borderColor:n.palette.primary.main,boxShadow:"18"}},children:(0,Q.jsx)(y.Z,{children:(0,Q.jsx)(S.Z,{children:(0,Q.jsx)(xe.Aw,{rows:1})})})})}):(0,Q.jsx)(u.ZP,{item:!0,xs:12,md:12,sx:{mb:0,alignItems:"left"},children:(0,Q.jsxs)(v.Z,{sx:{p:2,background:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],border:"dark"===n.palette.mode?"1px solid transparent":"1px solid".concat(n.palette.grey[100]),"&:hover":{borderColor:n.palette.primary.main}},children:[(0,Q.jsx)(_.Z,{sx:{pr:3},align:"center",colSpan:10,children:"FOCUS"}),(0,Q.jsx)(_.Z,{sx:{pr:3},align:"center",colSpan:10,children:"If you chase two rabbits, both will escape"})]})})})})})})]})})}))}}]);