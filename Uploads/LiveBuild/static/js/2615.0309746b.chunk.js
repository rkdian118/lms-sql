"use strict";(self.webpackChunklead_management_system_dashboard=self.webpackChunklead_management_system_dashboard||[]).push([[2615],{62615:function(e,t,n){n.r(t);var r=n(1413),l=n(29439),a=n(4942),i=n(47313),s=n(17592),o=n(19860),d=n(70941),c=n(19438),u=n(9019),p=n(35898),x=n(83929),h=n(44758),g=n(42695),m=n(24631),f=n(9506),v=n(69099),Z=n(57632),j=n(48119),b=n(73428),C=n(51629),y=n(66835),T=n(23477),B=n(24076),S=n(57861),w=n(61113),F=n(33497),k=(n(1759),n(22903),n(1834)),D=(n(62831),n(64224)),P=n(66135),L=n(70816),I=n.n(L),Y=(n(11692),n(56052),n(61689)),V=n(72265),_=(n(36287),n(4048),n(15646),n(74031)),M=n(28686),E=n(43394),W=n(44948),A=n(79429),O=n(12401),R=(n(14694),n(89535),n(1661)),z=n(34165),H=n(5866),G=(n(1862),n(66182)),U=n(57139),J=n(46417),K=(0,s.ZP)(d.Z)((function(e){var t,n=e.theme;return t={},(0,a.Z)(t,"&.".concat(c.Z.head),{border:"1px solid ".concat(n.palette.grey[400]),borderRadius:"50%"}),(0,a.Z)(t,"&.".concat(c.Z.body),{border:"1px solid ".concat(n.palette.grey[400]),borderRadius:"10px"}),t})),X=(0,s.ZP)(d.Z)((function(e){var t=e.theme;return(0,a.Z)({},"&.".concat(c.Z.head),{border:"1px solid ".concat(t.palette.grey[400]),borderRadius:"50%",fontSize:"1rem",fontWeight:900})}));t.default=(0,P.$j)(null,{FilterTargetsApi:V.UI})((function(e){var t=e.FilterTargetsApi,n=(0,o.Z)(),a=(0,i.useState)(0),s=(0,l.Z)(a,2),d=(s[0],s[1],(0,i.useState)(10)),c=(0,l.Z)(d,2),L=(c[0],c[1],(0,i.useState)(!1)),$=(0,l.Z)(L,2),q=($[0],$[1],(0,i.useState)("")),N=(0,l.Z)(q,2),Q=(N[0],N[1],(0,P.v9)((function(e){return e.adminAction}))),ee=Q.getFilterTargetDetails,te=Q.getFilterTargetDetailsLoading,ne=Q.getBranchDropdownSelectedList,re=Q.getBdeDropdownSelectedList,le=Q.getClDropdownSelectedList,ae=(0,i.useState)(""),ie=(0,l.Z)(ae,2),se=(ie[0],ie[1],(0,P.v9)((function(e){return e.masterAction})).leadStatusList,(0,i.useState)([])),oe=(0,l.Z)(se,2),de=(oe[0],oe[1],(0,i.useState)(!1)),ce=(0,l.Z)(de,2),ue=ce[0],pe=ce[1];n.palette.mode;(0,i.useEffect)((function(){}),[]);var xe={selectedMonth:[],selectedBDE:[],selectedCL:[],selectedBranch:[],selectedYear:new Date,isClusterTarg:!1,isBranchTarg:!0,isBdeTarg:!1},he=(0,A.TA)({initialValues:xe,onSubmit:function(e,n){var r=n.setSubmitting,l={isCLTarget:e.isClusterTarg,isBranchTarget:e.isBranchTarg,selectedMonth:e.selectedMonth,selectedCLs:e.selectedCL,selectedBDE:e.selectedBDE,selectedYear:null!==e.selectedYear?I()(null===e||void 0===e?void 0:e.selectedYear).format("YYYY"):""};t(l).then((function(e){!0===e.succeeded?(r(!1),(0,D.WI)((0,H.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(r(!1),(0,D.WI)((0,H.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))})).catch((function(){r(!1)}))}});(0,i.useEffect)((function(){var e={isCLTarget:he.values.isClusterTarg,isBranchTarget:he.values.isBranchTarg,selectedBDE:he.values.selectedBDE,selectedCLs:he.values.selectedCL,selectedMonth:he.values.selectedMonth,selectedYear:null!==he.values.selectedYear?I()(he.values.selectedYear).format("YYYY"):I()().format("YYYY")};t(e)}),[]);var ge=function(e,t){var n=t?t.map((function(e){return e._id})):[];he.setFieldValue("selectedCL",n),(0,D.WI)((0,V.kX)(n))};function me(e,t,n,r,l){return{name:e,calories:t,fat:n,carbs:r,protein:l}}me("Jan",3500,0,-3500),me("Fab",7e3,0,-7e3),me("Marc",10500,0,-10500);return(0,J.jsx)(J.Fragment,{children:(0,J.jsxs)(u.ZP,{container:!0,spacing:2,sx:{"&.MuiGrid-root":{pt:0}},children:[ue?"":(0,J.jsx)(u.ZP,{item:!0,xs:2,sx:{pb:2,alignItems:"left"},children:(0,J.jsx)(F.Z,{content:!1,title:(0,J.jsxs)(p.Z,{direction:"row",children:[(0,J.jsx)(k.wHY,{sx:{mr:2}})," \xa0 Filters"]}),sx:{border:"0px solid",padding:"10px",height:"100vh"},children:(0,J.jsx)("form",{onSubmit:he.handleSubmit,children:(0,J.jsxs)(u.ZP,{container:!0,spacing:O.dv,sx:{mt:1},children:[(0,J.jsxs)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:[(0,J.jsx)(x.Z,{control:(0,J.jsx)(h.Z,{checked:he.values.isBranchTarg,onChange:function(e){he.setFieldValue("isBranchTarg",e.target.checked),he.setFieldValue("isClusterTarg",!1),he.setFieldValue("isBdeTarg",!1),he.setFieldValue("selectedBDE",[]),he.setFieldValue("selectedCL",[])}}),label:"BH Target"}),(0,J.jsx)(x.Z,{control:(0,J.jsx)(h.Z,{checked:he.values.isClusterTarg,onChange:function(e){he.setFieldValue("isClusterTarg",e.target.checked),he.setFieldValue("selectedBDE",[]),he.setFieldValue("isBranchTarg",!1),he.setFieldValue("isBdeTarg",!1)}}),label:"CL Target"}),(0,J.jsx)(x.Z,{control:(0,J.jsx)(h.Z,{checked:he.values.isBdeTarg,onChange:function(e){he.setFieldValue("isBdeTarg",e.target.checked),he.setFieldValue("isClusterTarg",!1),he.setFieldValue("isBranchTarg",!1),he.setFieldValue("selectedBDE",[]),he.setFieldValue("selectedCL",[])}}),label:"BDE Target"})]}),(0,J.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,J.jsx)(g.Z,{multiple:!0,fullWidth:!0,options:ne,getOptionLabel:function(e){return e.name},value:null===ne||void 0===ne?void 0:ne.filter((function(e){return he.values.selectedBranch.includes(e._id)})),onChange:ge,renderInput:function(e){return(0,J.jsx)(m.Z,(0,r.Z)((0,r.Z)({},e),{},{label:"Select Branch Head",inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"})}))}})}),(0,J.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,J.jsx)(g.Z,{multiple:!0,fullWidth:!0,options:le,getOptionLabel:function(e){return e.name},value:null===le||void 0===le?void 0:le.filter((function(e){return he.values.selectedCL.includes(e._id)})),onChange:ge,renderInput:function(e){return(0,J.jsx)(m.Z,(0,r.Z)((0,r.Z)({},e),{},{label:"Select Cluster Lead",inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"})}))},disabled:he.values.isBranchTarg})}),(0,J.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,J.jsx)(g.Z,{multiple:!0,fullWidth:!0,disabled:he.values.isClusterTarg||he.values.isBranchTarg,options:re,getOptionLabel:function(e){return e.name},value:null===re||void 0===re?void 0:re.filter((function(e){return he.values.selectedBDE.includes(e._id)})),onChange:function(e,t){var n=t?t.map((function(e){return e._id})):[];he.setFieldValue("selectedBDE",n),he.setFieldValue("isClusterTarg",!1)},renderInput:function(e){return(0,J.jsx)(m.Z,(0,r.Z)((0,r.Z)({},e),{},{label:"Select BDE",inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"})}))}})}),(0,J.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,J.jsx)(g.Z,{id:"month-select",fullWidth:!0,multiple:!0,options:_.e7,getOptionLabel:function(e){return e.label},value:_.e7.filter((function(e){return he.values.selectedMonth.includes(e.label)})),onChange:function(e,t){var n=t.some((function(e){return"All Months"===e.label}))?_.e7.slice(1):t.map((function(e){return e.label}));he.setFieldValue("selectedMonth",n)},renderInput:function(e){return(0,J.jsx)(m.Z,(0,r.Z)((0,r.Z)({},e),{},{label:"Select Month",inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"})}))}})}),(0,J.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,J.jsx)(E._,{dateAdapter:M.H,children:(0,J.jsx)(W.M,{views:["year"],renderInput:function(e){return(0,J.jsx)(m.Z,(0,r.Z)((0,r.Z)({fullWidth:!0},e),{},{inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"}),onKeyDown:function(e){return e.preventDefault()}}))},value:he.values.selectedYear,onChange:function(e){he.setFieldValue("selectedYear",e)},maxDate:new Date,minDate:new Date("2000-01-01")})})}),(0,J.jsx)(u.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,J.jsx)(f.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,J.jsx)(G.Z,{scale:{hover:1.1,tap:.9},children:(0,J.jsx)(v.Z,{variant:"contained",color:"primary",type:"submit",sx:{px:5,width:"100%",boxShadow:n.customShadows.primary,":hover":{boxShadow:"none"}},children:"Go Filter"})})})})]})})})}),(0,J.jsx)(u.ZP,{item:!0,xs:9,md:ue?12:10,sx:{alignItems:"left",pb:2},children:(0,J.jsx)(F.Z,{content:!1,title:(0,J.jsxs)(p.Z,{direction:"row",children:[(0,J.jsx)(Y.Z,{title:ue?"Collapse Right":"Collapse Left",arrow:!0,disableFocusListener:!0,disableTouchListener:!0,placement:"left-start",TransitionComponent:Z.Z,children:(0,J.jsx)(j.Z,{variant:"rounded",sx:(0,r.Z)((0,r.Z)((0,r.Z)({},n.typography.commonAvatar),n.typography.mediumAvatar),{},{transition:"all .2s ease-in-out",border:"2px solid",bgcolor:n.palette.background.default,boxShadow:"2",backgroundColor:"dark"===n.palette.mode?n.palette.dark.main:n.palette.primary.light,'&[aria-controls="menu-list-grow"],&:hover':{boxShadow:"7",background:"".concat(n.palette.primary.main,"!important"),color:n.palette.primary.light}}),color:"inherit",onClick:function(){return pe(!ue)},children:ue?(0,J.jsx)(R.Z,{stroke:1.5,size:"20px"}):(0,J.jsx)(z.Z,{stroke:1.5,size:"20px"})})}),"\xa0 View Targets"]}),sx:{border:"0px solid",padding:"5px 15px 15px 15px"},children:(0,J.jsx)(u.ZP,{container:!0,spacing:2,sx:{mt:0},children:!te&&(null===ee||void 0===ee?void 0:ee.length)>0?null===ee||void 0===ee?void 0:ee.map((function(e,t){var r,l,a,i,s=null===e||void 0===e||null===(r=e.targData)||void 0===r?void 0:r.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.targets)||0}),0),o=null===e||void 0===e||null===(l=e.targData)||void 0===l?void 0:l.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.completed_target)||0}),0);null===e||void 0===e||null===(a=e.targData)||void 0===a||a.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.remaining_target)||0}),0);return(0,J.jsx)(u.ZP,{item:!0,xs:6,md:6,sx:{mb:0,alignItems:"left"},children:(0,J.jsx)(b.Z,{sx:{p:2,background:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],border:"dark"===n.palette.mode?"1px solid transparent":"1px solid".concat(n.palette.grey[100]),borderColor:n.palette.grey[400],boxShadow:"4","&:hover":{borderColor:n.palette.primary.main,boxShadow:"18"}},children:(0,J.jsx)(C.Z,{children:(0,J.jsxs)(y.Z,{children:[(0,J.jsxs)(T.Z,{children:[(0,J.jsxs)(B.Z,{children:[(0,J.jsx)(K,{children:"Monthly Sales"}),(0,J.jsx)(X,{colSpan:5,align:"center",children:null===e||void 0===e?void 0:e.name})]}),(0,J.jsxs)(B.Z,{children:[(0,J.jsx)(K,{children:"Month"}),(0,J.jsx)(K,{align:"center",sx:{px:0,py:1},children:"Target"}),(0,J.jsx)(K,{align:"center",sx:{px:0,py:1},children:"Total"}),(0,J.jsx)(K,{align:"center",sx:{px:0,py:1},children:"Upfront"}),(0,J.jsx)(K,{align:"center",sx:{px:0,py:1},children:"Confirm Business"}),(0,J.jsx)(K,{align:"center",sx:{px:0,py:1},children:"Gap"})]})]}),(0,J.jsxs)(S.Z,{children:[null===e||void 0===e||null===(i=e.targData)||void 0===i?void 0:i.map((function(e,t){return(0,J.jsxs)(B.Z,{children:[(0,J.jsx)(K,{component:"th",scope:"row",children:null===e||void 0===e?void 0:e.target_month}),(0,J.jsx)(K,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.targets}),(0,J.jsx)(K,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.total_target}),(0,J.jsx)(K,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.completed_target}),(0,J.jsx)(K,{align:"center",sx:{px:0,py:1},children:null!==e&&void 0!==e&&e.confirm_business?null===e||void 0===e?void 0:e.confirm_business:0}),(0,J.jsx)(K,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.remaining_target})]},t)})),(0,J.jsxs)(B.Z,{children:[(0,J.jsx)(K,{sx:{fontWeight:500},component:"th",scope:"row",children:"Total"}),(0,J.jsx)(K,{align:"center",children:s}),(0,J.jsx)(K,{align:"center",children:"--"}),(0,J.jsx)(K,{align:"center",children:"--"}),(0,J.jsx)(K,{align:"center",children:o}),(0,J.jsx)(K,{align:"center",children:s-o})]})]})]})})})},t)})):(0,J.jsx)(J.Fragment,{children:!0===te?(0,J.jsx)(u.ZP,{item:!0,xs:6,md:12,sx:{mb:0,alignItems:"left"},children:(0,J.jsx)(b.Z,{sx:{p:2,background:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],border:"dark"===n.palette.mode?"1px solid transparent":"1px solid".concat(n.palette.grey[100]),borderColor:n.palette.grey[400],boxShadow:"4","&:hover":{borderColor:n.palette.primary.main,boxShadow:"18"}},children:(0,J.jsx)(C.Z,{children:(0,J.jsx)(y.Z,{children:(0,J.jsx)(U.dE,{rows:1})})})})}):(0,J.jsx)(u.ZP,{item:!0,xs:12,md:12,sx:{mb:0,alignItems:"left"},children:(0,J.jsxs)(b.Z,{sx:{p:2,background:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],border:"dark"===n.palette.mode?"1px solid transparent":"1px solid".concat(n.palette.grey[100]),"&:hover":{borderColor:n.palette.primary.main}},children:[(0,J.jsx)(w.Z,{sx:{pr:3},align:"center",colSpan:10,children:"FOCUS"}),(0,J.jsx)(w.Z,{sx:{pr:3},align:"center",colSpan:10,children:"If you chase two rabbits, both will escape"})]})})})})})})]})})}))}}]);