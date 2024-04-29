"use strict";(self.webpackChunklead_management_system_dashboard=self.webpackChunklead_management_system_dashboard||[]).push([[550],{50550:function(e,t,n){n.r(t),n.d(t,{default:function(){return ue}});var r=n(1413),i=n(29439),l=n(47313),a=n(19860),s=n(9019),o=n(35898),d=n(42695),c=n(24631),u=n(83929),p=n(44758),x=n(9506),h=n(69099),g=n(57632),m=n(48119),f=n(73428),Z=n(51629),j=n(66835),v=n(23477),b=n(24076),y=n(67478),S=n(57861),C=n(61113),T=n(33497),_=(n(1759),n(22903),n(1834)),w=(n(62831),n(64224)),k=n(66135),D=n(70816),F=n.n(D),M=n(11692),P=(n(56052),n(61689)),I=n(27754),B=(n(36287),n(45987)),R=n(17592),z=n(50301),A=n(94469),W=n(33604),E=n(47131),Y=n(96467),L=n(85281),V=n(11198),O=n(79429),U=n(3463),J=n(5866),q=n(34229),G=n.n(q),H=(n(61581),n(86728)),K=(n(42805),n(74031)),$=n(46417),Q=["children","onClose"],N=l.forwardRef((function(e,t){return(0,$.jsx)(z.Z,(0,r.Z)({direction:"down",ref:t},e))})),X=(0,R.ZP)(A.Z)((function(e){var t=e.theme;return{"& .MuDialogContent-root":{padding:t.spacing(2)},"& .MuDialogActions-root":{padding:t.spacing(1)}}})),ee=function(e){var t=e.children,n=e.onClose,i=(0,B.Z)(e,Q);return(0,$.jsxs)(W.Z,(0,r.Z)((0,r.Z)({sx:{m:0,py:1,px:2}},i),{},{children:[t,n?(0,$.jsx)(E.Z,{"aria-label":"close",onClick:n,sx:{position:"absolute",right:10,top:10,color:function(e){return e.palette.grey[500]}},children:(0,$.jsx)(V.Z,{})}):null]}))},te=((0,k.$j)(null,{UpdateBdTargetsApi:I.QQ})((function(e){(0,H.Z)();var t=e.open,n=e.close,r=e.UpdateBdTargetsApi,a=e.totalTarget,o=e.targetId,d=(0,w.I0)(),u=((0,l.useRef)(null),(0,l.useState)(!1)),p=(0,i.Z)(u,2),g=(p[0],p[1],(0,l.useState)(!1)),m=(0,i.Z)(g,2),f=(m[0],m[1]),Z=(0,l.useState)(""),j=(0,i.Z)(Z,2),v=(j[0],j[1],(0,l.useState)("")),b=(0,i.Z)(v,2),y=(b[0],b[1],(0,l.useState)(!1)),S=(0,i.Z)(y,2),T=(S[0],S[1],(0,l.useState)([])),_=(0,i.Z)(T,2),k=(_[0],_[1],(0,l.useState)("")),D=(0,i.Z)(k,2),F=(D[0],D[1],(0,l.useState)("")),M=(0,i.Z)(F,2),P=(M[0],M[1],(0,l.useState)("")),I=(0,i.Z)(P,2),B=(I[0],I[1],(0,l.useState)("")),R=(0,i.Z)(B,2),z=(R[0],R[1],(0,l.useState)("")),A=(0,i.Z)(z,2),W=(A[0],A[1],{target_total:a}),E=U.Ry({target_total:U.Z_().required("Targets Field is Required")}),V=(0,O.TA)({enableReinitialize:!0,initialValues:W,validationSchema:E,onSubmit:function(e,t){var i=t.setSubmitting,l={target_id:o,targets:e.target_total};f(!0),r(l).then((function(e){!0===e.succeeded?(n(),f(!1),i(!1),d((0,J.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(f(!1),i(!1),d((0,J.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))}))}});return(0,$.jsx)("div",{children:(0,$.jsxs)(X,{open:t,"aria-labelledby":"customized-dialog-title",TransitionComponent:N,maxWidth:"xl",fullWidth:!0,sx:{"& .MuiDialog-paper":{width:"100%",maxWidth:"500px",padding:"0px",top:"-100px"}},children:[(0,$.jsx)(ee,{id:"customized-dialog-title",onClose:function(){n()},sx:{background:"#e0f4ff"},children:(0,$.jsx)(C.Z,{variant:"h6",component:"h6",sx:{pl:"10px",fontSize:"1em",color:"#468ccc"},align:"center",children:"Edit Targets"})}),(0,$.jsx)(G(),{component:"div",style:{scrollbarWidth:"thin",scrollbarColor:"#ff0000 #f1f1f1"},children:(0,$.jsx)(Y.Z,{dividers:!0,sx:{px:0},children:(0,$.jsx)(O.J9,{children:(0,$.jsxs)("form",{noValidate:!0,onSubmit:V.handleSubmit,children:[(0,$.jsx)(s.ZP,{container:!0,spacing:2,sx:{p:"10px 30px"},children:(0,$.jsxs)(s.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:[(0,$.jsxs)(C.Z,{variant:"h5",sx:{width:"180px"},children:["Target",(0,$.jsx)("span",{style:{color:"red"},children:"*"})]}),(0,$.jsx)(c.Z,{fullWidth:!0,placeholder:"Enter Target",type:"number",InputLabelProps:{shrink:!0},style:{display:"flex",justifyContent:"flex-start",marginBottom:"5px ",marginTop:"5px "},name:"target_total",onKeyDown:K.JR,value:V.values.target_total,onChange:V.handleChange,error:V.touched.target_total&&Boolean(V.errors.target_total),helperText:V.touched.target_total&&V.errors.target_total,onBlur:V.handleBlur})]})}),(0,$.jsx)(x.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,$.jsx)(h.Z,{size:"small",type:"submit",variant:"contained",color:"secondary",disabled:V.isSubmitting,sx:{pl:2,borderRadius:"10px",width:"20%",color:"#468ccc",background:"#e0f4ff",height:"35px","&:hover":{background:"#468ccc",color:"#e0f4ff"}},children:V.isSubmitting?(0,$.jsx)($.Fragment,{children:(0,$.jsx)(L.Z,{color:"inherit",size:20})}):"Update"})})]})})})})]})})})),["children","onClose"]),ne=l.forwardRef((function(e,t){return(0,$.jsx)(z.Z,(0,r.Z)({direction:"down",ref:t},e))})),re=(0,R.ZP)(A.Z)((function(e){var t=e.theme;return{"& .MuDialogContent-root":{padding:t.spacing(2)},"& .MuDialogActions-root":{padding:t.spacing(1)}}})),ie=function(e){var t=e.children,n=e.onClose,i=(0,B.Z)(e,te);return(0,$.jsxs)(W.Z,(0,r.Z)((0,r.Z)({sx:{m:0,py:1,px:2}},i),{},{children:[t,n?(0,$.jsx)(E.Z,{"aria-label":"close",onClick:n,sx:{position:"absolute",right:10,top:10,color:function(e){return e.palette.grey[500]}},children:(0,$.jsx)(V.Z,{})}):null]}))},le=((0,k.$j)(null,{UpdateCompleteTargetsApi:I.iH})((function(e){(0,H.Z)();var t=e.open,n=e.close,r=e.UpdateCompleteTargetsApi,a=(e.completeTarget,e.bdId),o=e.targetId,d=(0,w.I0)(),u=((0,l.useRef)(null),(0,l.useState)(!1)),p=(0,i.Z)(u,2),g=(p[0],p[1],(0,l.useState)(!1)),m=(0,i.Z)(g,2),f=(m[0],m[1]),Z=(0,l.useState)(""),j=(0,i.Z)(Z,2),v=(j[0],j[1],(0,l.useState)("")),b=(0,i.Z)(v,2),y=(b[0],b[1],(0,l.useState)(!1)),S=(0,i.Z)(y,2),T=(S[0],S[1],(0,l.useState)([])),_=(0,i.Z)(T,2),k=(_[0],_[1],(0,l.useState)("")),D=(0,i.Z)(k,2),F=(D[0],D[1],(0,l.useState)("")),M=(0,i.Z)(F,2),P=(M[0],M[1],(0,l.useState)("")),I=(0,i.Z)(P,2),B=(I[0],I[1],(0,l.useState)("")),R=(0,i.Z)(B,2),z=(R[0],R[1],(0,l.useState)("")),A=(0,i.Z)(z,2),W=(A[0],A[1],U.Ry({complete_target:U.Z_().required("Completed Target Field is Required")})),E=(0,O.TA)({enableReinitialize:!0,initialValues:{complete_target:""},validationSchema:W,onSubmit:function(e,t){var i=t.setSubmitting,l={target_id:o,complete_target:e.complete_target,bd_id:a};f(!0),r(l).then((function(e){!0===e.succeeded?(n(),f(!1),i(!1),d((0,J.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(f(!1),i(!1),d((0,J.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))})).catch((function(){i(!1)}))}});return(0,$.jsx)($.Fragment,{children:(0,$.jsxs)(re,{open:t,"aria-labelledby":"customized-dialog-title",TransitionComponent:ne,maxWidth:"xl",fullWidth:!0,sx:{"& .MuiDialog-paper":{width:"100%",maxWidth:"500px",padding:"0px",top:"-100px"}},children:[(0,$.jsx)(ie,{id:"customized-dialog-title",onClose:function(){n()},sx:{background:"#e0f4ff"},children:(0,$.jsx)(C.Z,{variant:"h6",component:"h6",sx:{pl:"10px",fontSize:"1em",color:"#468ccc"},align:"center",children:"Edit Completed Targets"})}),(0,$.jsx)(G(),{component:"div",style:{scrollbarWidth:"thin",scrollbarColor:"#ff0000 #f1f1f1"},children:(0,$.jsx)(Y.Z,{dividers:!0,sx:{px:0},children:(0,$.jsx)(O.J9,{children:(0,$.jsxs)("form",{noValidate:!0,onSubmit:E.handleSubmit,children:[(0,$.jsx)(s.ZP,{container:!0,spacing:2,sx:{p:"10px 30px"},children:(0,$.jsxs)(s.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:[(0,$.jsxs)(C.Z,{variant:"h5",sx:{width:"180px"},children:["Completed Target",(0,$.jsx)("span",{style:{color:"red"},children:"*"})]}),(0,$.jsx)(c.Z,{fullWidth:!0,placeholder:"Enter Target",type:"number",InputLabelProps:{shrink:!0},style:{display:"flex",justifyContent:"flex-start",marginBottom:"5px ",marginTop:"5px "},name:"complete_target",onKeyDown:K.JR,value:E.values.complete_target,onChange:E.handleChange,error:E.touched.complete_target&&Boolean(E.errors.complete_target),helperText:E.touched.complete_target&&E.errors.complete_target,onBlur:E.handleBlur})]})}),(0,$.jsx)(x.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,$.jsx)(h.Z,{size:"small",type:"submit",variant:"contained",color:"secondary",disabled:E.isSubmitting,sx:{pl:2,borderRadius:"10px",width:"20%",color:"#468ccc",background:"#e0f4ff",height:"35px","&:hover":{background:"#468ccc",color:"#e0f4ff"}},children:E.isSubmitting?(0,$.jsx)($.Fragment,{children:(0,$.jsx)(L.Z,{color:"inherit",size:20})}):"Update"})})]})})})})]})})})),n(28686)),ae=n(43394),se=n(44948),oe=n(12401),de=(n(14694),n(89535),n(1661)),ce=n(34165),ue=(0,k.$j)(null,{ClFilterTargetsApi:I.dd})((function(e){var t=e.ClFilterTargetsApi,n=(0,a.Z)(),D=(0,l.useState)(0),B=(0,i.Z)(D,2),R=(B[0],B[1],(0,l.useState)(10)),z=(0,i.Z)(R,2),A=(z[0],z[1],(0,l.useState)(!1)),W=(0,i.Z)(A,2),E=(W[0],W[1],(0,l.useState)("")),Y=(0,i.Z)(E,2),L=(Y[0],Y[1],(0,k.v9)((function(e){return e.clusterLeadAction}))),V=L.getFilterTargetDetails,U=L.getBdeDropdownList,q=L.getFilterTargetDetailsLoading,G=(0,l.useState)(""),H=(0,i.Z)(G,2),Q=(H[0],H[1],(0,k.v9)((function(e){return e.masterAction})).leadStatusList,(0,l.useState)([])),N=(0,i.Z)(Q,2),X=(N[0],N[1],(0,l.useState)(!1)),ee=(0,i.Z)(X,2),te=ee[0],ne=ee[1];(0,l.useEffect)((function(){(0,w.WI)((0,I.n6)())}),[]);var re={selectedMonth:[],selectedBDE:[],selectedYear:new Date,isClusterTarg:!1},ie=(0,O.TA)({initialValues:re,onSubmit:function(e,n){var r=n.setSubmitting,i={isClusterTarg:e.isClusterTarg,selectedMonth:e.selectedMonth,selectedBDE:e.selectedBDE,selectedYear:null!==e.selectedYear?F()(null===e||void 0===e?void 0:e.selectedYear).format("YYYY"):new Date};t(i).then((function(e){!0===e.succeeded?(r(!1),(0,w.WI)((0,J.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(r(!1),(0,w.WI)((0,J.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))})).catch((function(){r(!1)}))}});(0,l.useEffect)((function(){var e={isClusterTarg:!1,selectedMonth:ie.selectedMonth,selectedBDE:ie.selectedBDE,selectedYear:null!==ie.selectedYear?ie.selectedYear:""};t(e)}),[]);function ue(e,t,n,r,i){return{name:e,calories:t,fat:n,carbs:r,protein:i}}console.log("\ud83d\ude80formik",U);ue("Jan",3500,0,-3500),ue("Fab",7e3,0,-7e3),ue("Marc",10500,0,-10500);return(0,$.jsx)($.Fragment,{children:(0,$.jsxs)(s.ZP,{container:!0,spacing:2,sx:{"&.MuiGrid-root":{pt:0}},children:[te?"":(0,$.jsx)(s.ZP,{item:!0,xs:3,sx:{mb:0,alignItems:"left"},children:(0,$.jsx)(T.Z,{content:!1,title:(0,$.jsxs)(o.Z,{direction:"row",children:[(0,$.jsx)(_.wHY,{sx:{mr:2}})," \xa0 Filters"]}),sx:{border:"0px solid",padding:"10px",height:"100vh"},children:(0,$.jsx)("form",{onSubmit:ie.handleSubmit,children:(0,$.jsxs)(s.ZP,{container:!0,spacing:oe.dv,sx:{mt:1},children:[(0,$.jsx)(s.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,$.jsx)(d.Z,{multiple:!0,fullWidth:!0,options:U,getOptionLabel:function(e){return e.name},value:null===U||void 0===U?void 0:U.filter((function(e){return ie.values.selectedBDE.includes(e._id)})),onChange:function(e,t){var n=t?t.map((function(e){return e._id})):[];ie.setFieldValue("selectedBDE",n),ie.setFieldValue("isClusterTarg",!1)},renderInput:function(e){return(0,$.jsx)(c.Z,(0,r.Z)((0,r.Z)({},e),{},{label:"Select BDE",inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"})}))}})}),(0,$.jsx)(s.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,$.jsx)(d.Z,{id:"month-select",fullWidth:!0,multiple:!0,options:K.e7,getOptionLabel:function(e){return e.label},value:K.e7.filter((function(e){return ie.values.selectedMonth.includes(e.label)})),onChange:function(e,t){var n=t.some((function(e){return"All Months"===e.label}))?K.e7.slice(1):t.map((function(e){return e.label}));ie.setFieldValue("selectedMonth",n)},renderInput:function(e){return(0,$.jsx)(c.Z,(0,r.Z)((0,r.Z)({},e),{},{label:"Select Month",inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"})}))}})}),(0,$.jsx)(s.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,$.jsx)(ae._,{dateAdapter:le.H,children:(0,$.jsx)(se.M,{views:["year"],renderInput:function(e){return(0,$.jsx)(c.Z,(0,r.Z)((0,r.Z)({fullWidth:!0},e),{},{inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"}),onKeyDown:function(e){return e.preventDefault()}}))},value:ie.values.selectedYear,onChange:function(e){ie.setFieldValue("selectedYear",e)},maxDate:new Date,minDate:new Date("2000-01-01")})})}),(0,$.jsx)(s.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,$.jsx)(u.Z,{control:(0,$.jsx)(p.Z,{checked:ie.values.isClusterTarg,onChange:function(e){ie.setFieldValue("isClusterTarg",e.target.checked),ie.setFieldValue("selectedBDE",[])}}),label:"Self Target"})}),(0,$.jsx)(s.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,$.jsx)(x.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,$.jsx)(h.Z,{size:"small",type:"submit",variant:"contained",color:"secondary",sx:{pl:2,borderRadius:"10px",width:"50%",color:"#468ccc",background:"#e0f4ff",height:"35px",boxShadow:"4","&:hover":{background:"#468ccc",color:"#e0f4ff",boxShadow:"16"}},children:"Go Filter"})})})]})})})}),(0,$.jsx)(s.ZP,{item:!0,xs:9,md:te?12:9,sx:{mb:0,alignItems:"left"},children:(0,$.jsx)(T.Z,{content:!1,title:(0,$.jsxs)(o.Z,{direction:"row",children:[(0,$.jsx)(P.Z,{title:te?"Collapse Right":"Collapse Left",arrow:!0,disableFocusListener:!0,disableTouchListener:!0,placement:"left-start",TransitionComponent:g.Z,children:(0,$.jsx)(m.Z,{variant:"rounded",sx:(0,r.Z)((0,r.Z)((0,r.Z)({},n.typography.commonAvatar),n.typography.mediumAvatar),{},{transition:"all .2s ease-in-out",border:"2px solid",bgcolor:n.palette.background.default,boxShadow:"2",backgroundColor:"dark"===n.palette.mode?n.palette.dark.main:n.palette.primary.light,'&[aria-controls="menu-list-grow"],&:hover':{boxShadow:"7",background:"".concat(n.palette.primary.main,"!important"),color:n.palette.primary.light}}),color:"inherit",onClick:function(){return ne(!te)},children:te?(0,$.jsx)(de.Z,{stroke:1.5,size:"20px"}):(0,$.jsx)(ce.Z,{stroke:1.5,size:"20px"})})})," ","\xa0 BDE Targets"]}),sx:{border:"0px solid",padding:"5px"},children:(0,$.jsx)(s.ZP,{container:!0,spacing:2,sx:{mt:0},children:!q&&(null===V||void 0===V?void 0:V.length)>0?null===V||void 0===V?void 0:V.map((function(e,t){var r,i,l,a,o=null===e||void 0===e||null===(r=e.targData)||void 0===r?void 0:r.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.targets)||0}),0),d=null===e||void 0===e||null===(i=e.targData)||void 0===i?void 0:i.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.completed_target)||0}),0);null===e||void 0===e||null===(l=e.targData)||void 0===l||l.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.remaining_target)||0}),0);return(0,$.jsx)(s.ZP,{item:!0,xs:6,md:te?4:6,sx:{mb:0,alignItems:"left"},children:(0,$.jsx)(f.Z,{sx:{p:2,background:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],border:"dark"===n.palette.mode?"1px solid transparent":"1px solid".concat(n.palette.grey[100]),"&:hover":{borderColor:n.palette.primary.main}},children:(0,$.jsx)(Z.Z,{children:(0,$.jsxs)(j.Z,{children:[(0,$.jsxs)(v.Z,{children:[(0,$.jsxs)(b.Z,{children:[(0,$.jsx)(y.Z,{sx:{pl:0},children:"Monthly Sales"}),(0,$.jsx)(y.Z,{colSpan:4,align:"center",children:null===e||void 0===e?void 0:e.name})]}),(0,$.jsxs)(b.Z,{children:[(0,$.jsx)(y.Z,{sx:{p:0},children:"Month"}),(0,$.jsx)(y.Z,{align:"center",sx:{px:0,py:1},children:"Target"}),(0,$.jsx)(y.Z,{align:"center",sx:{px:0,py:1},children:"Total Target"}),(0,$.jsx)(y.Z,{align:"center",sx:{px:0,py:1},children:"Confirm Business"}),(0,$.jsx)(y.Z,{align:"center",sx:{px:0,py:1},children:"Gap"})]})]}),(0,$.jsxs)(S.Z,{children:[null===e||void 0===e||null===(a=e.targData)||void 0===a?void 0:a.map((function(e,t){return(0,$.jsxs)(b.Z,{hover:!0,children:[(0,$.jsx)(y.Z,{sx:{p:0},component:"th",scope:"row",children:null===e||void 0===e?void 0:e.target_month}),(0,$.jsx)(y.Z,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.targets}),(0,$.jsx)(y.Z,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.total_target}),(0,$.jsx)(y.Z,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.completed_target}),(0,$.jsx)(y.Z,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.remaining_target})]},t)})),(0,$.jsxs)(b.Z,{hover:!0,children:[(0,$.jsx)(y.Z,{sx:{pl:0,fontWeight:500},component:"th",scope:"row",children:"Total"}),(0,$.jsx)(y.Z,{align:"center",children:o}),(0,$.jsx)(y.Z,{align:"center",children:"--"}),(0,$.jsx)(y.Z,{align:"center",children:d}),(0,$.jsx)(y.Z,{align:"center",children:o-d})]})]})]})})})},t)})):(0,$.jsx)($.Fragment,{children:!0===q?(0,$.jsx)(Z.Z,{children:(0,$.jsx)(j.Z,{children:(0,$.jsx)(M._A,{rows:5})})}):(0,$.jsx)(s.ZP,{item:!0,xs:12,md:12,sx:{mb:0,alignItems:"left"},children:(0,$.jsxs)(f.Z,{sx:{p:2,background:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],border:"dark"===n.palette.mode?"1px solid transparent":"1px solid".concat(n.palette.grey[100]),"&:hover":{borderColor:n.palette.primary.main}},children:[(0,$.jsx)(C.Z,{sx:{pr:3},align:"center",colSpan:10,children:"FOCUS"}),(0,$.jsx)(C.Z,{sx:{pr:3},align:"center",colSpan:10,children:"If you chase two rabbits, both will escape"})]})})})})})})]})})}))}}]);