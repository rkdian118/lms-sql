"use strict";(self.webpackChunklead_management_system_dashboard=self.webpackChunklead_management_system_dashboard||[]).push([[9e3],{19e3:function(e,t,n){n.r(t);var l=n(1413),r=n(29439),s=n(47313),i=n(19860),a=n(9019),o=n(35898),d=n(83929),c=n(44758),u=n(42695),p=n(24631),x=n(9506),h=n(69099),g=n(57632),m=n(48119),Z=n(73428),f=n(51629),v=n(66835),j=n(23477),b=n(24076),C=n(67478),T=n(57861),y=n(61113),B=n(33497),F=(n(1759),n(22903),n(1834)),D=(n(62831),n(64224)),k=n(66135),w=n(70816),S=n.n(w),Y=n(11692),L=(n(56052),n(61689)),P=(n(27754),n(56406)),V=(n(36287),n(10709),n(93940),n(74031)),I=n(28686),_=n(43394),M=n(44948),E=n(79429),A=n(12401),W=(n(14694),n(89535),n(1661)),H=n(34165),O=n(5866),z=(n(1862),n(46417));t.default=(0,k.$j)(null,{BHFilterTargetsApi:P.D8})((function(e){var t=e.BHFilterTargetsApi,n=(0,i.Z)(),w=(0,s.useState)(0),R=(0,r.Z)(w,2),G=(R[0],R[1],(0,s.useState)(10)),K=(0,r.Z)(G,2),U=(K[0],K[1],(0,s.useState)(!1)),J=(0,r.Z)(U,2),$=(J[0],J[1],(0,s.useState)("")),q=(0,r.Z)($,2),N=(q[0],q[1],(0,k.v9)((function(e){return e.clusterAction}))),Q=N.getSelectedBDEDropdownTargetList,X=N.getClDropdownTargetList,ee=N.getFilterTargetDetails,te=N.getFilterTargetDetailsLoading,ne=(0,s.useState)(""),le=(0,r.Z)(ne,2),re=(le[0],le[1],(0,k.v9)((function(e){return e.masterAction})).leadStatusList,(0,s.useState)([])),se=(0,r.Z)(re,2),ie=(se[0],se[1],(0,s.useState)(!1)),ae=(0,r.Z)(ie,2),oe=ae[0],de=ae[1];n.palette.mode;(0,s.useEffect)((function(){(0,D.WI)((0,P.KU)()),(0,D.WI)((0,P.Y_)([]))}),[]);var ce={selectedMonth:[],selectedBDE:[],selectedCL:[],selectedYear:new Date,isClusterTarg:!1,isBranchTarg:!1,isBdeTarg:!0},ue=(0,E.TA)({initialValues:ce,onSubmit:function(e,n){var l=n.setSubmitting,r={isCLTarget:e.isClusterTarg,isBHTarget:e.isBranchTarg,selectedMonth:e.selectedMonth,selectedCLs:e.selectedCL,selectedBDE:e.selectedBDE,selectedYear:null!==e.selectedYear?S()(null===e||void 0===e?void 0:e.selectedYear).format("YYYY"):""};t(r).then((function(e){!0===e.succeeded?(l(!1),(0,D.WI)((0,O.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):(l(!1),(0,D.WI)((0,O.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}})))})).catch((function(){l(!1)}))}});(0,s.useEffect)((function(){var e={isCLTarget:!1,isBHTarget:!1,selectedBDE:ue.values.selectedBDE,selectedCLs:ue.values.selectedCL,selectedMonth:ue.values.selectedMonth,selectedYear:null!==ue.values.selectedYear?S()(ue.values.selectedYear).format("YYYY"):S()().format("YYYY")};t(e)}),[]);function pe(e,t,n,l,r){return{name:e,calories:t,fat:n,carbs:l,protein:r}}pe("Jan",3500,0,-3500),pe("Fab",7e3,0,-7e3),pe("Marc",10500,0,-10500);return(0,z.jsx)(z.Fragment,{children:(0,z.jsxs)(a.ZP,{container:!0,spacing:2,sx:{"&.MuiGrid-root":{pt:0}},children:[oe?"":(0,z.jsx)(a.ZP,{item:!0,xs:3,sx:{mb:0,alignItems:"left"},children:(0,z.jsx)(B.Z,{content:!1,title:(0,z.jsxs)(o.Z,{direction:"row",children:[(0,z.jsx)(F.wHY,{sx:{mr:2}})," \xa0 Filters"]}),sx:{border:"0px solid",padding:"10px",height:"100vh"},children:(0,z.jsx)("form",{onSubmit:ue.handleSubmit,children:(0,z.jsxs)(a.ZP,{container:!0,spacing:A.dv,sx:{mt:1},children:[(0,z.jsxs)(a.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:[(0,z.jsx)(d.Z,{control:(0,z.jsx)(c.Z,{checked:ue.values.isBdeTarg,onChange:function(e){ue.setFieldValue("isBdeTarg",e.target.checked),ue.setFieldValue("isClusterTarg",!1),ue.setFieldValue("isBranchTarg",!1),ue.setFieldValue("selectedBDE",[]),ue.setFieldValue("selectedCL",[])}}),label:"BDE Target"}),(0,z.jsx)(d.Z,{control:(0,z.jsx)(c.Z,{checked:ue.values.isClusterTarg,onChange:function(e){ue.setFieldValue("isClusterTarg",e.target.checked),ue.setFieldValue("selectedBDE",[]),ue.setFieldValue("isBranchTarg",!1),ue.setFieldValue("isBdeTarg",!1)}}),label:"CL Target"}),(0,z.jsx)(d.Z,{control:(0,z.jsx)(c.Z,{checked:ue.values.isBranchTarg,onChange:function(e){ue.setFieldValue("isBranchTarg",e.target.checked),ue.setFieldValue("isClusterTarg",!1),ue.setFieldValue("isBdeTarg",!1),ue.setFieldValue("selectedBDE",[]),ue.setFieldValue("selectedCL",[])}}),label:"BH Target"})]}),(0,z.jsx)(a.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,z.jsx)(u.Z,{multiple:!0,fullWidth:!0,options:X,getOptionLabel:function(e){return e.name},value:null===X||void 0===X?void 0:X.filter((function(e){return ue.values.selectedCL.includes(e._id)})),onChange:function(e,t){var n=t?t.map((function(e){return e._id})):[];ue.setFieldValue("selectedCL",n),(0,D.WI)((0,P.Y_)(n))},renderInput:function(e){return(0,z.jsx)(p.Z,(0,l.Z)((0,l.Z)({},e),{},{label:"Select Cluster Lead",inputProps:(0,l.Z)((0,l.Z)({},e.inputProps),{},{autoComplete:"off"})}))},disabled:ue.values.isBranchTarg})}),(0,z.jsx)(a.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,z.jsx)(u.Z,{multiple:!0,fullWidth:!0,disabled:ue.values.isClusterTarg||ue.values.isBranchTarg,options:Q,getOptionLabel:function(e){return e.name},value:null===Q||void 0===Q?void 0:Q.filter((function(e){return ue.values.selectedBDE.includes(e._id)})),onChange:function(e,t){var n=t?t.map((function(e){return e._id})):[];ue.setFieldValue("selectedBDE",n),ue.setFieldValue("isClusterTarg",!1)},renderInput:function(e){return(0,z.jsx)(p.Z,(0,l.Z)((0,l.Z)({},e),{},{label:"Select BDE",inputProps:(0,l.Z)((0,l.Z)({},e.inputProps),{},{autoComplete:"off"})}))}})}),(0,z.jsx)(a.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,z.jsx)(u.Z,{id:"month-select",fullWidth:!0,multiple:!0,options:V.e7,getOptionLabel:function(e){return e.label},value:V.e7.filter((function(e){return ue.values.selectedMonth.includes(e.label)})),onChange:function(e,t){var n=t.some((function(e){return"All Months"===e.label}))?V.e7.slice(1):t.map((function(e){return e.label}));ue.setFieldValue("selectedMonth",n)},renderInput:function(e){return(0,z.jsx)(p.Z,(0,l.Z)((0,l.Z)({},e),{},{label:"Select Month",inputProps:(0,l.Z)((0,l.Z)({},e.inputProps),{},{autoComplete:"off"})}))}})}),(0,z.jsx)(a.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,z.jsx)(_._,{dateAdapter:I.H,children:(0,z.jsx)(M.M,{views:["year"],renderInput:function(e){return(0,z.jsx)(p.Z,(0,l.Z)((0,l.Z)({fullWidth:!0},e),{},{inputProps:(0,l.Z)((0,l.Z)({},e.inputProps),{},{autoComplete:"off"}),onKeyDown:function(e){return e.preventDefault()}}))},value:ue.values.selectedYear,onChange:function(e){ue.setFieldValue("selectedYear",e)},maxDate:new Date,minDate:new Date("2000-01-01")})})}),(0,z.jsx)(a.ZP,{item:!0,xs:12,sx:{mb:0,alignItems:"left"},children:(0,z.jsx)(x.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,z.jsx)(h.Z,{size:"small",type:"submit",variant:"contained",color:"secondary",sx:{pl:2,borderRadius:"10px",width:"50%",color:"#468ccc",background:"#e0f4ff",height:"35px",boxShadow:"4","&:hover":{background:"#468ccc",color:"#e0f4ff",boxShadow:"16"}},children:"Go Filter"})})})]})})})}),(0,z.jsx)(a.ZP,{item:!0,xs:9,md:oe?12:9,sx:{mb:0,alignItems:"left"},children:(0,z.jsx)(B.Z,{content:!1,title:(0,z.jsxs)(o.Z,{direction:"row",children:[(0,z.jsx)(L.Z,{title:oe?"Collapse Right":"Collapse Left",arrow:!0,disableFocusListener:!0,disableTouchListener:!0,placement:"left-start",TransitionComponent:g.Z,children:(0,z.jsx)(m.Z,{variant:"rounded",sx:(0,l.Z)((0,l.Z)((0,l.Z)({},n.typography.commonAvatar),n.typography.mediumAvatar),{},{transition:"all .2s ease-in-out",border:"2px solid",bgcolor:n.palette.background.default,boxShadow:"2",backgroundColor:"dark"===n.palette.mode?n.palette.dark.main:n.palette.primary.light,'&[aria-controls="menu-list-grow"],&:hover':{boxShadow:"7",background:"".concat(n.palette.primary.main,"!important"),color:n.palette.primary.light}}),color:"inherit",onClick:function(){return de(!oe)},children:oe?(0,z.jsx)(W.Z,{stroke:1.5,size:"20px"}):(0,z.jsx)(H.Z,{stroke:1.5,size:"20px"})})})," ","\xa0 View Targets"]}),sx:{border:"0px solid",padding:"5px"},children:(0,z.jsx)(a.ZP,{container:!0,spacing:2,sx:{mt:0},children:!te&&(null===ee||void 0===ee?void 0:ee.length)>0?null===ee||void 0===ee?void 0:ee.map((function(e,t){var l,r,s,i,o=null===e||void 0===e||null===(l=e.targData)||void 0===l?void 0:l.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.targets)||0}),0),d=null===e||void 0===e||null===(r=e.targData)||void 0===r?void 0:r.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.completed_target)||0}),0);null===e||void 0===e||null===(s=e.targData)||void 0===s||s.reduce((function(e,t){return e+(null===t||void 0===t?void 0:t.remaining_target)||0}),0);return(0,z.jsx)(a.ZP,{item:!0,xs:6,md:oe?4:6,sx:{mb:0,alignItems:"left"},children:(0,z.jsx)(Z.Z,{sx:{p:2,background:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],border:"dark"===n.palette.mode?"1px solid transparent":"1px solid".concat(n.palette.grey[100]),"&:hover":{borderColor:n.palette.primary.main}},children:(0,z.jsx)(f.Z,{children:(0,z.jsxs)(v.Z,{children:[(0,z.jsxs)(j.Z,{children:[(0,z.jsxs)(b.Z,{children:[(0,z.jsx)(C.Z,{sx:{pl:0},children:"Monthly Sales"}),(0,z.jsx)(C.Z,{colSpan:4,align:"center",children:null===e||void 0===e?void 0:e.name})]}),(0,z.jsxs)(b.Z,{children:[(0,z.jsx)(C.Z,{sx:{p:0},children:"Month"}),(0,z.jsx)(C.Z,{align:"center",sx:{px:0,py:1},children:"Target"}),(0,z.jsx)(C.Z,{align:"center",sx:{px:0,py:1},children:"Total Target"}),(0,z.jsx)(C.Z,{align:"center",sx:{px:0,py:1},children:"Confirm Business"}),(0,z.jsx)(C.Z,{align:"center",sx:{px:0,py:1},children:"Gap"})]})]}),(0,z.jsxs)(T.Z,{children:[null===e||void 0===e||null===(i=e.targData)||void 0===i?void 0:i.map((function(e,t){return(0,z.jsxs)(b.Z,{hover:!0,children:[(0,z.jsx)(C.Z,{sx:{p:0},component:"th",scope:"row",children:null===e||void 0===e?void 0:e.target_month}),(0,z.jsx)(C.Z,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.targets}),(0,z.jsx)(C.Z,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.total_target}),(0,z.jsx)(C.Z,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.completed_target}),(0,z.jsx)(C.Z,{align:"center",sx:{px:0,py:1},children:null===e||void 0===e?void 0:e.remaining_target})]},t)})),(0,z.jsxs)(b.Z,{hover:!0,children:[(0,z.jsx)(C.Z,{sx:{pl:0,fontWeight:500},component:"th",scope:"row",children:"Total"}),(0,z.jsx)(C.Z,{align:"center",children:o}),(0,z.jsx)(C.Z,{align:"center",children:"--"}),(0,z.jsx)(C.Z,{align:"center",children:d}),(0,z.jsx)(C.Z,{align:"center",children:o-d})]})]})]})})})},t)})):(0,z.jsx)(z.Fragment,{children:!0===te?(0,z.jsx)(f.Z,{children:(0,z.jsx)(v.Z,{children:(0,z.jsx)(Y._A,{rows:5})})}):(0,z.jsx)(a.ZP,{item:!0,xs:12,md:12,sx:{mb:0,alignItems:"left"},children:(0,z.jsxs)(Z.Z,{sx:{p:2,background:"dark"===n.palette.mode?n.palette.dark.main:n.palette.grey[50],border:"dark"===n.palette.mode?"1px solid transparent":"1px solid".concat(n.palette.grey[100]),"&:hover":{borderColor:n.palette.primary.main}},children:[(0,z.jsx)(y.Z,{sx:{pr:3},align:"center",colSpan:10,children:"FOCUS"}),(0,z.jsx)(y.Z,{sx:{pr:3},align:"center",colSpan:10,children:"If you chase two rabbits, both will escape"})]})})})})})})]})})}))}}]);