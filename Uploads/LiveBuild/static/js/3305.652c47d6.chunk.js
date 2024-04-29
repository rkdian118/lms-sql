"use strict";(self.webpackChunklms_admin=self.webpackChunklms_admin||[]).push([[3305],{46180:function(e,n,i){i.r(n),i.d(n,{default:function(){return ye}});var t=i(47313),o=i(9019),r=i(12401),s=i(74165),d=i(15861),l=i(1413),a=i(29439),c=i(4942),u=i(17592),x=i(19860),p=i(70941),v=i(19438),m=i(24076),h=i(49914),f=i(48119),Z=i(35898),g=i(42695),j=i(24631),b=i(51629),y=i(66835),P=i(23477),w=i(57861),_=i(91034),D=i(33497),M=(i(1759),i(22903),i(1834)),S=i(27754),I=i(64224),Y=i(66135),k=i(70816),C=i.n(k),O=i(11692),L=(i(56052),i(61689)),N=i(36541),R=i(91210),W=(i(45352),i(45987)),A=i(50301),z=i(94469),F=i(33604),B=i(47131),Q=i(93405),U=i(61113),E=i(96467),T=i(69099),V=i(91215),K=(i(61581),i(40364),i(11198)),G=i(93066),q=i(34229),H=i.n(q),J=i(39236),X=i(65954),$=(i(5866),i(46417)),ee=["children","onClose"],ne=t.forwardRef((function(e,n){return(0,$.jsx)(A.Z,(0,l.Z)({direction:"up",ref:n},e))})),ie=(0,V.Z)(z.Z)((function(e){var n=e.theme;return{"& .MuDialogContent-root":{padding:n.spacing(2)},"& .MuDialogActions-root":{padding:n.spacing(1)}}})),te=function(e){var n=e.children,i=e.onClose,t=(0,W.Z)(e,ee);return(0,$.jsxs)(F.Z,(0,l.Z)((0,l.Z)({sx:{m:0,py:1,px:2}},t),{},{children:[n,i?(0,$.jsx)(B.Z,{"aria-label":"close",onClick:i,sx:{position:"absolute",right:10,top:10,color:function(e){return e.palette.grey[500]}},children:(0,$.jsx)(K.Z,{})}):null]}))},oe=function(e){var n=e.title,i=e.count,t=(e.iconPrimary,e.messages);return(0,$.jsx)(Q.Z,{sx:{padding:"16px 24px"},children:(0,$.jsx)(o.ZP,{container:!0,spacing:r.dv,children:(0,$.jsx)(o.ZP,{item:!0,xs:12,children:(0,$.jsx)(o.ZP,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:(0,$.jsx)(o.ZP,{item:!0,xs:!0,zeroMinWidth:!0,children:(0,$.jsxs)(o.ZP,{container:!0,spacing:1,children:[(0,$.jsxs)(o.ZP,{item:!0,xs:!0,zeroMinWidth:!0,sx:{display:"flex",alignItems:"center"},children:[(0,$.jsx)(U.Z,{align:"left",variant:"body2",children:n}),1===t?(0,$.jsx)(U.Z,{align:"left",variant:"body2",sx:{ml:2},children:(0,$.jsx)(L.Z,{title:"Update",arrow:!0,children:(0,$.jsx)("div",{children:(0,$.jsx)(X.Z,{sx:{fontSize:"18px",cursor:"pointer",color:"#3e7dc3"}})})})}):""]}),(0,$.jsx)(o.ZP,{item:!0,sx:{width:"25%",display:"flex",justifyContent:"flex-end"},children:(0,$.jsx)(J.Z,{label:i,variant:"outlined",chipcolor:"primary"})})]})})})})})})},re=function(e){var n,i=e.open,l=e.close,c=e.dsrId,u=((0,x.Z)(),(0,Y.I0)(),(0,Y.v9)((function(e){return e.clusterLeadAction}))),p=u.getDSRDetails,v=u.getDSRDetailsLoading,m=(0,t.useState)(!1),h=(0,a.Z)(m,2),f=h[0],Z=(h[1],(0,t.useState)(null===p||void 0===p?void 0:p.linkedin_messages)),g=(0,a.Z)(Z,2),j=g[0],b=(g[1],C()().format("DD-MM-YYY"),C()(null===p||void 0===p?void 0:p.createdAt).format("DD-MM-YYY"),function(){var e=(0,d.Z)((0,s.Z)().mark((function e(n){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),{dsr_id:c,linkedin_messages:Number(j)};case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}());return(0,$.jsx)("div",{children:(0,$.jsxs)(ie,{open:i,TransitionComponent:ne,maxWidth:"xl",fullWidth:!0,sx:{"& .MuiDialog-paper":{p:0,width:"100%",maxWidth:"850px"}},children:[(0,$.jsx)(te,{id:"customized-dialog-title",onClose:function(){l()},children:(0,$.jsxs)(U.Z,{variant:"h6",component:"h6",sx:{pl:"10px",fontSize:"1em"},children:["View DSR ",v?"":(0,$.jsxs)($.Fragment,{children:["(",null===p||void 0===p||null===(n=p.bd_id)||void 0===n?void 0:n.name,")"]})]})}),(0,$.jsx)(H(),{component:"div",style:{scrollbarWidth:"thin",scrollbarColor:"#ff0000 #f1f1f1",maxWidth:"100%"},children:(0,$.jsx)(E.Z,{dividers:!0,children:v?(0,$.jsx)(O.YJ,{rows:8}):(0,$.jsxs)(o.ZP,{container:!0,spacing:r.dv,children:[(0,$.jsx)(o.ZP,{item:!0,xs:6,sx:{borderRight:"0px solid #5bb4fe","&.MuiGrid-root":{pt:"10px"}},children:(0,$.jsxs)(D.Z,{content:!1,children:[(0,$.jsx)(oe,{title:"Number Of Leads Assigned",count:null===p||void 0===p?void 0:p.lead_assigned,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),(0,$.jsx)(oe,{title:"Number Of Positive Response",count:null===p||void 0===p?void 0:p.lead_positive_response,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),(0,$.jsx)(oe,{title:"Number Of Negative Response",count:null===p||void 0===p?void 0:p.lead_negative_response,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),(0,$.jsx)(oe,{title:"Number Of Follow-Ups",count:null===p||void 0===p?void 0:p.follow_ups,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),(0,$.jsx)(oe,{title:"Number Of Bids (Upwork)",count:null===p||void 0===p?void 0:p.upwork_bids,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),(0,$.jsx)(oe,{title:"Number Of Upwork Response",count:null===p||void 0===p?void 0:p.upwork_positive_response,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),(0,$.jsx)(oe,{title:"Number Of LinkedIn Response",count:null===p||void 0===p?void 0:p.linkedin_response,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),(0,$.jsx)(oe,{title:"Number Of LinkedIn Messages",count:null===p||void 0===p?void 0:p.linkedin_messages,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id})]})}),(0,$.jsx)(o.ZP,{item:!0,xs:6,sx:{borderLeft:"0px solid #5bb4fe","&.MuiGrid-root":{pt:"10px"}},children:(0,$.jsxs)(D.Z,{content:!1,children:[(0,$.jsx)(oe,{title:"Number Of Meeting Secheduled",count:null===p||void 0===p?void 0:p.meeting_scheduled,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),(0,$.jsx)(oe,{title:"Number Of Meeting Done",count:null===p||void 0===p?void 0:p.meeting_done,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),(0,$.jsx)(oe,{title:"Number Of Follow-Ups Calls Done",count:null===p||void 0===p?void 0:p.phone_call_done,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),(0,$.jsx)(oe,{title:"Number Of Propsal Submitted",count:null===p||void 0===p?void 0:p.proposal_submitted,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),(0,$.jsx)(oe,{title:"Proposal Submitted Amount",count:null!==p&&void 0!==p&&p.proposal_amount?null===p||void 0===p?void 0:p.proposal_amount:0,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),(0,$.jsx)(oe,{title:"Number Of Estimation Submitted",count:null===p||void 0===p?void 0:p.estimation_submitted,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),(0,$.jsx)(oe,{title:"Understand and Queries Submitted",count:null===p||void 0===p?void 0:p.understanding_queries_submitted,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),(0,$.jsx)(oe,{title:"Number Of Features List Shared",count:null===p||void 0===p?void 0:p.feature_list_shared,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===p||void 0===p?void 0:p._id}),f?(0,$.jsx)(Q.Z,{sx:{padding:"18px 24px"},children:(0,$.jsx)(o.ZP,{container:!0,spacing:r.dv,children:(0,$.jsx)(o.ZP,{item:!0,xs:12,children:(0,$.jsx)(T.Z,{size:"small",variant:"contained",color:"secondary",sx:{height:"35px",background:"#3a5895","&:hover":{color:"#000",background:"#c6d9ff"}},onClick:function(e){return b(e)},children:"Submit"})})})}):""]})})]})})})]})})},se=i(14732),de=i(74031),le=(0,u.ZP)(p.Z)((function(e){var n;e.theme;return n={},(0,c.Z)(n,"&.".concat(v.Z.head),{backgroundColor:"#c6d9ff",color:"#000"}),(0,c.Z)(n,"&.".concat(v.Z.body),{fontSize:14}),n})),ae=(0,u.ZP)(m.Z)((function(e){return{"&:nth-of-type(odd)":{backgroundColor:e.theme.palette.action.hover}}}));function ce(e){var n=e.row,i=e.key,o=e.currentPage,r=e.pageLength,s=e.leadStatus,d=((0,x.Z)(),o+1),l=t.useState(""),c=(0,a.Z)(l,2),u=c[0],p=c[1],v=t.useState(!1),m=(0,a.Z)(v,2),h=(m[0],m[1],t.useState(!1)),f=(0,a.Z)(h,2),Z=(f[0],f[1],t.useState(!1)),g=(0,a.Z)(Z,2),j=(g[0],g[1],t.useState(!1)),b=(0,a.Z)(j,2),y=b[0],P=b[1],w=(0,t.useState)(""),_=(0,a.Z)(w,2);_[0],_[1];return(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(ae,{hover:!0,sx:{"& > *":{borderBottom:"unset"}},unmountOnExit:!0,children:[(0,$.jsx)(le,{component:"th",scope:"row",sx:{py:2},children:null===n||void 0===n?void 0:n.bd_name})," ",(0,$.jsx)(le,{component:"th",scope:"row",sx:{py:2},children:null===n||void 0===n?void 0:n.bd_target})," ",(0,$.jsx)(le,{component:"th",scope:"row",sx:{py:2},children:C()(null===n||void 0===n?void 0:n.createdAt).format("DD-MMMM-YYYY")}),(0,$.jsx)(le,{align:"left",sx:{py:2},children:(0,$.jsx)(L.Z,{title:"View Report",arrow:!0,children:(0,$.jsx)(R.Z,{onClick:function(){return p((e=n)._id),P(!0),void(0,I.WI)((0,S.vK)(e._id));var e},sx:{color:"#4d97f3",cursor:"pointer","&:hover":{color:"#b5dbff"}}})})})]},i),y&&(0,$.jsx)(re,{dsrId:u,open:y,rowData:n,close:function(){return p(""),P(!1),(0,I.WI)((0,S.OV)()),void(0,I.WI)((0,S.AQ)(d,r,"",s))}})]})}(0,u.ZP)(h.Z,{shouldForwardProp:N.x9})((function(e){var n,i=e.theme;return n={width:290,marginLeft:16,height:"45px",padding:"27px 16px","& input":{background:"transparent !important",paddingLeft:"4px !important"}},(0,c.Z)(n,i.breakpoints.down("lg"),{width:250}),(0,c.Z)(n,i.breakpoints.down("md"),{width:"100%",marginLeft:4,background:"dark"===i.palette.mode?i.palette.dark[800]:"#fff"}),n})),(0,u.ZP)(f.Z,{shouldForwardProp:N.x9})((function(e){var n=e.theme;return(0,l.Z)((0,l.Z)((0,l.Z)({},n.typography.commonAvatar),n.typography.mediumAvatar),{},{background:"transparent",color:"#3e7dc3","&:hover":{color:"black"}})}));var ue=function(){var e,n,i,o,r=(0,t.useState)(0),c=(0,a.Z)(r,2),u=c[0],x=c[1],v=(0,t.useState)(10),h=(0,a.Z)(v,2),f=h[0],k=h[1],L=(0,t.useState)(!1),N=(0,a.Z)(L,2),R=N[0],W=N[1],A=(0,t.useState)(""),z=(0,a.Z)(A,2),F=(z[0],z[1],(0,Y.v9)((function(e){return e.clusterLeadAction}))),B=F.getDSRList,Q=F.getDSRLoading,U=F.getBdeDropdownList,E=((0,Y.v9)((function(e){return e.masterAction})).leadStatusList,(0,Y.v9)((function(e){return e.commonAction})).dashboardleadTypeId,(0,t.useState)("")),T=(0,a.Z)(E,2),V=T[0],K=T[1],G=(0,t.useState)([]),q=(0,a.Z)(G,2),H=q[0],J=(q[1],(0,t.useState)(["",""])),X=(0,a.Z)(J,2),ee=X[0],ne=X[1];null==ee?(i="",o=""):(i=ee.length>0&&""!==ee[0]?C()(ee[0]).format("YYYY-MM-DD"):"",o=ee.length>0&&""!==ee[0]?C()(ee[1]).format("YYYY-MM-DD"):""),(0,t.useEffect)((function(){(0,I.WI)((0,S.AQ)(1,f,V,i,o))}),[f,i,o]),(0,t.useEffect)((function(){(0,I.WI)((0,S.n6)())}),[]);var ie=function(){var e=(0,d.Z)((0,s.Z)().mark((function e(n){var i,t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ne(n),n.length>0&&(i=n?C()(n[0]).format("YYYY-MM-DD"):"",t=n?C()(n[1]).format("YYYY-MM-DD"):"",(0,I.WI)((0,S.AQ)(u+1,f,V,i,t)));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),te=function(){var e=(0,d.Z)((0,s.Z)().mark((function e(n){var i,t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=n?C()(n[0]).format("YYYY-MM-DD"):"",t=n?C()(n[1]).format("YYYY-MM-DD"):"",(0,I.WI)((0,S.AQ)(u+1,f,V,i,t)),ne(n);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,$.jsxs)(D.Z,{content:!1,title:(0,$.jsxs)(Z.Z,{direction:"row",children:[(0,$.jsx)(M.hR0,{sx:{mr:2}})," \xa0 BDE DSR"]}),sx:{border:"0px solid",padding:"5px"},secondary:(0,$.jsxs)(Z.Z,{direction:"row",spacing:2,alignItems:"center",children:[(0,$.jsx)(se.Z,{showOneCalendar:!0,size:"md",placeholder:"Please Select Date-Range",className:"w-100 input d-inline",character:" -To- ",block:!0,value:ee,cleanable:!0,onOk:te,onChange:ie,format:"dd-MMM-yyyy",onKeyDown:function(e){return e.preventDefault()},ranges:de.rQ,disabledDate:function(e){return e>new Date},style:{borderRadius:"10px !important"}}),(0,$.jsx)(g.Z,{options:U,getOptionLabel:function(e){return e?e.name:""},value:U.find((function(e){return e._id===V}))||null,onChange:function(e,n){var i=n?n._id:"";K(i),(0,I.WI)((0,S.AQ)(u+1,f,i))},renderInput:function(e){return(0,$.jsx)(j.Z,(0,l.Z)((0,l.Z)({},e),{},{label:"Select BDE",inputProps:(0,l.Z)((0,l.Z)({},e.inputProps),{},{autoComplete:"off"}),size:"small",sx:{minWidth:"250px","& .MuiTextField-root":{borderRadius:"5px"}}}))}})]}),children:[(0,$.jsx)(b.Z,{children:(0,$.jsxs)(y.Z,{"aria-label":"customized table",children:[(0,$.jsx)(P.Z,{children:(0,$.jsxs)(m.Z,{children:[(0,$.jsx)(le,{sx:{pr:3,py:2},align:"left",children:"BDE Name"}),(0,$.jsx)(le,{sx:{pr:3,py:2},align:"left",children:"Achived Target"}),(0,$.jsx)(le,{sx:{pr:3,py:2},align:"left",children:"Date"}),(0,$.jsx)(le,{sx:{pr:3,py:2},align:"left",children:"View"})]})}),(0,$.jsx)(w.Z,{children:!Q&&(null===B||void 0===B||null===(e=B.docs)||void 0===e?void 0:e.length)>0?null===B||void 0===B||null===(n=B.docs)||void 0===n?void 0:n.map((function(e,n){return(0,$.jsx)(ce,{row:e,leadStatus:H,currentPage:u,pageLength:f},n)})):(0,$.jsx)($.Fragment,{children:!0===Q?(0,$.jsx)(O.m1,{rows:10}):(0,$.jsx)(m.Z,{children:(0,$.jsx)(p.Z,{sx:{pr:3},align:"center",colSpan:7,children:"No DSR Found"})})})})]})}),(0,$.jsx)(_.Z,{rowsPerPageOptions:[10,25,50,100],component:"div",count:B.totalDocs,rowsPerPage:f,page:u,onPageChange:function(e,n){x(n),(0,I.WI)((0,S.AQ)(n+1,f,V))},onRowsPerPageChange:function(e){(0,I.WI)((0,S.AQ)(u+1,e.target.value,V)),k(parseInt(null===e||void 0===e?void 0:e.target.value))}}),R&&(0,$.jsx)(re,{open:R,close:function(){return W(!1),void(0,I.WI)((0,S.AQ)(u+1,f))}})]})},xe=["children","onClose"],pe=t.forwardRef((function(e,n){return(0,$.jsx)(A.Z,(0,l.Z)({direction:"up",ref:n},e))})),ve=(0,V.Z)(z.Z)((function(e){var n=e.theme;return{"& .MuDialogContent-root":{padding:n.spacing(2)},"& .MuDialogActions-root":{padding:n.spacing(1)}}})),me=function(e){var n=e.children,i=e.onClose,t=(0,W.Z)(e,xe);return(0,$.jsxs)(F.Z,(0,l.Z)((0,l.Z)({sx:{m:0,py:1,px:2}},t),{},{children:[n,i?(0,$.jsx)(B.Z,{"aria-label":"close",onClick:i,sx:{position:"absolute",right:10,top:10,color:function(e){return e.palette.grey[500]}},children:(0,$.jsx)(K.Z,{})}):null]}))},he=function(e){var n=e.title,i=e.count,t=(e.iconPrimary,e.messages);return(0,$.jsx)(Q.Z,{sx:{padding:"16px 24px"},children:(0,$.jsx)(o.ZP,{container:!0,spacing:r.dv,children:(0,$.jsx)(o.ZP,{item:!0,xs:12,children:(0,$.jsx)(o.ZP,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:(0,$.jsx)(o.ZP,{item:!0,xs:!0,zeroMinWidth:!0,children:(0,$.jsxs)(o.ZP,{container:!0,spacing:1,children:[(0,$.jsxs)(o.ZP,{item:!0,xs:!0,zeroMinWidth:!0,sx:{display:"flex",alignItems:"center"},children:[(0,$.jsx)(U.Z,{align:"left",variant:"body2",children:n}),1===t?(0,$.jsx)(U.Z,{align:"left",variant:"body2",sx:{ml:2},children:(0,$.jsx)(L.Z,{title:"Update",arrow:!0,children:(0,$.jsx)("div",{children:(0,$.jsx)(X.Z,{sx:{fontSize:"18px",cursor:"pointer",color:"#3e7dc3"}})})})}):""]}),(0,$.jsx)(o.ZP,{item:!0,sx:{width:"25%",display:"flex",justifyContent:"flex-end"},children:(0,$.jsx)(J.Z,{label:i,variant:"outlined",chipcolor:"primary"})})]})})})})})})},fe=function(e){var n=e.open,i=e.close,l=e.dsrId,c=e.rowData,u=((0,x.Z)(),(0,Y.I0)(),(0,t.useState)(!1)),p=(0,a.Z)(u,2),v=p[0],m=(p[1],(0,t.useState)(null===c||void 0===c?void 0:c.linkedin_messages)),h=(0,a.Z)(m,2),f=h[0],Z=(h[1],C()().format("DD-MM-YYY"),C()(null===c||void 0===c?void 0:c.createdAt).format("DD-MM-YYY"),function(){var e=(0,d.Z)((0,s.Z)().mark((function e(n){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),{dsr_id:l,linkedin_messages:Number(f)};case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}());return(0,$.jsx)("div",{children:(0,$.jsxs)(ve,{open:n,TransitionComponent:pe,maxWidth:"xl",fullWidth:!0,sx:{"& .MuiDialog-paper":{p:0,width:"100%",maxWidth:"850px"}},children:[(0,$.jsx)(me,{id:"customized-dialog-title",onClose:function(){i()},children:(0,$.jsx)(U.Z,{variant:"h6",component:"h6",sx:{pl:"10px",fontSize:"1em"},children:"View DSR"})}),(0,$.jsx)(H(),{component:"div",style:{scrollbarWidth:"thin",scrollbarColor:"#ff0000 #f1f1f1",maxWidth:"100%"},children:(0,$.jsx)(E.Z,{dividers:!0,children:(0,$.jsxs)(o.ZP,{container:!0,spacing:r.dv,children:[(0,$.jsx)(o.ZP,{item:!0,xs:6,sx:{borderRight:"0px solid #5bb4fe","&.MuiGrid-root":{pt:"10px"}},children:(0,$.jsxs)(D.Z,{content:!1,children:[(0,$.jsx)(he,{title:"Number Of Leads Assigned",count:null===c||void 0===c?void 0:c.lead_assigned,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,$.jsx)(he,{title:"Number Of Positive Response",count:null===c||void 0===c?void 0:c.lead_positive_response,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,$.jsx)(he,{title:"Number Of Negative Response",count:null===c||void 0===c?void 0:c.lead_negative_response,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,$.jsx)(he,{title:"Number Of Follow-Ups",count:null===c||void 0===c?void 0:c.follow_ups,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,$.jsx)(he,{title:"Number Of Bids (Upwork)",count:null===c||void 0===c?void 0:c.upwork_bids,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,$.jsx)(he,{title:"Number Of Upwork Response",count:null===c||void 0===c?void 0:c.upwork_positive_response,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,$.jsx)(he,{title:"Number Of LinkedIn Response",count:null===c||void 0===c?void 0:c.linkedin_response,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,$.jsx)(he,{title:"Number Of LinkedIn Messages",count:null===c||void 0===c?void 0:c.linkedin_messages,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id})]})}),(0,$.jsx)(o.ZP,{item:!0,xs:6,sx:{borderLeft:"0px solid #5bb4fe","&.MuiGrid-root":{pt:"10px"}},children:(0,$.jsxs)(D.Z,{content:!1,children:[(0,$.jsx)(he,{title:"Number Of Meeting Secheduled",count:null===c||void 0===c?void 0:c.meeting_scheduled,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,$.jsx)(he,{title:"Number Of Meeting Done",count:null===c||void 0===c?void 0:c.meeting_done,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,$.jsx)(he,{title:"Number Of Follow-Ups Calls Done",count:null===c||void 0===c?void 0:c.phone_call_done,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,$.jsx)(he,{title:"Number Of Propsal Submitted",count:null===c||void 0===c?void 0:c.proposal_submitted,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,$.jsx)(he,{title:"Proposal Submitted Amount",count:null!==c&&void 0!==c&&c.proposal_amount?null===c||void 0===c?void 0:c.proposal_amount:0,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,$.jsx)(he,{title:"Number Of Estimation Submitted",count:null===c||void 0===c?void 0:c.estimation_submitted,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,$.jsx)(he,{title:"Understand and Queries Submitted",count:null===c||void 0===c?void 0:c.understanding_queries_submitted,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,$.jsx)(he,{title:"Number Of Features List Shared",count:null===c||void 0===c?void 0:c.feature_list_shared,iconPrimary:(0,$.jsx)(G.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),v?(0,$.jsx)(Q.Z,{sx:{padding:"18px 24px"},children:(0,$.jsx)(o.ZP,{container:!0,spacing:r.dv,children:(0,$.jsx)(o.ZP,{item:!0,xs:12,children:(0,$.jsx)(T.Z,{size:"small",variant:"contained",color:"secondary",sx:{height:"35px",background:"#3a5895","&:hover":{color:"#000",background:"#c6d9ff"}},onClick:function(e){return Z(e)},children:"Submit"})})})}):""]})})]})})})]})})},Ze=(0,u.ZP)(p.Z)((function(e){var n;e.theme;return n={},(0,c.Z)(n,"&.".concat(v.Z.head),{backgroundColor:"#c6d9ff",color:"#000"}),(0,c.Z)(n,"&.".concat(v.Z.body),{fontSize:14}),n})),ge=(0,u.ZP)(m.Z)((function(e){return{"&:nth-of-type(odd)":{backgroundColor:e.theme.palette.action.hover}}}));function je(e){var n=e.row,i=e.key,o=e.currentPage,r=e.pageLength,s=e.leadStatus,d=((0,x.Z)(),o+1),l=t.useState(""),c=(0,a.Z)(l,2),u=c[0],p=c[1],v=t.useState(!1),m=(0,a.Z)(v,2),h=(m[0],m[1],t.useState(!1)),f=(0,a.Z)(h,2),Z=(f[0],f[1],t.useState(!1)),g=(0,a.Z)(Z,2),j=(g[0],g[1],t.useState(!1)),b=(0,a.Z)(j,2),y=b[0],P=b[1],w=(0,t.useState)(""),_=(0,a.Z)(w,2);_[0],_[1];return(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(ge,{hover:!0,sx:{"& > *":{borderBottom:"unset"}},unmountOnExit:!0,children:[(0,$.jsx)(Ze,{component:"th",scope:"row",sx:{py:2},children:C()(null===n||void 0===n?void 0:n.createdAt).format("DD-MMMM-YYYY")}),(0,$.jsx)(Ze,{align:"left",sx:{py:2},children:(0,$.jsx)(L.Z,{title:"View Report",arrow:!0,children:(0,$.jsx)(R.Z,{onClick:function(){return p(n._id),void P(!0)},sx:{color:"#4d97f3",cursor:"pointer","&:hover":{color:"#b5dbff"}}})})})]},i),y&&(0,$.jsx)(fe,{dsrId:u,open:y,rowData:n,close:function(){return p(""),P(!1),(0,I.WI)((0,S.OV)()),void(0,I.WI)((0,S.BC)(d,r,"",s))}})]})}(0,u.ZP)(h.Z,{shouldForwardProp:N.x9})((function(e){var n,i=e.theme;return n={width:290,marginLeft:16,height:"45px",padding:"27px 16px","& input":{background:"transparent !important",paddingLeft:"4px !important"}},(0,c.Z)(n,i.breakpoints.down("lg"),{width:250}),(0,c.Z)(n,i.breakpoints.down("md"),{width:"100%",marginLeft:4,background:"dark"===i.palette.mode?i.palette.dark[800]:"#fff"}),n})),(0,u.ZP)(f.Z,{shouldForwardProp:N.x9})((function(e){var n=e.theme;return(0,l.Z)((0,l.Z)((0,l.Z)({},n.typography.commonAvatar),n.typography.mediumAvatar),{},{background:"transparent",color:"#3e7dc3","&:hover":{color:"black"}})}));var be=function(){var e,n,i,o,r=(0,t.useState)(0),l=(0,a.Z)(r,2),c=l[0],u=l[1],x=(0,t.useState)(10),v=(0,a.Z)(x,2),h=v[0],f=v[1],g=(0,t.useState)(!1),j=(0,a.Z)(g,2),k=(j[0],j[1],(0,t.useState)("")),L=(0,a.Z)(k,2),N=(L[0],L[1],(0,Y.v9)((function(e){return e.clusterLeadAction}))),R=N.getClusterDSRList,W=N.getClsuterDSRLoading,A=(N.getBdeDropdownList,(0,Y.v9)((function(e){return e.masterAction})).leadStatusList,(0,Y.v9)((function(e){return e.commonAction})).dashboardleadTypeId,(0,t.useState)("")),z=(0,a.Z)(A,2),F=z[0],B=(z[1],(0,t.useState)([])),Q=(0,a.Z)(B,2),U=Q[0],E=(Q[1],(0,t.useState)(["",""])),T=(0,a.Z)(E,2),V=T[0],K=T[1];null==V?(i="",o=""):(i=V.length>0&&""!==V[0]?C()(V[0]).format("YYYY-MM-DD"):"",o=V.length>0&&""!==V[0]?C()(V[1]).format("YYYY-MM-DD"):""),(0,t.useEffect)((function(){(0,I.WI)((0,S.BC)(1,h,i,o))}),[h,i,o]);var G=function(){var e=(0,d.Z)((0,s.Z)().mark((function e(n){var i,t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:K(n),n.length>0&&(i=n?C()(n[0]).format("YYYY-MM-DD"):"",t=n?C()(n[1]).format("YYYY-MM-DD"):"",(0,I.WI)((0,S.BC)(c+1,h,i,t)));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),q=function(){var e=(0,d.Z)((0,s.Z)().mark((function e(n){var i,t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=n?C()(n[0]).format("YYYY-MM-DD"):"",t=n?C()(n[1]).format("YYYY-MM-DD"):"",(0,I.WI)((0,S.BC)(c+1,h,i,t)),K(n);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,$.jsxs)(D.Z,{content:!1,title:(0,$.jsxs)(Z.Z,{direction:"row",children:[(0,$.jsx)(M.hR0,{sx:{mr:2}})," \xa0 Cluster DSR"]}),sx:{border:"0px solid",padding:"5px"},secondary:(0,$.jsx)(Z.Z,{direction:"row",spacing:2,alignItems:"center",children:(0,$.jsx)(se.Z,{showOneCalendar:!0,size:"md",placeholder:"Please Select Date-Range",className:"w-100 input d-inline",character:" -To- ",block:!0,value:V,cleanable:!0,onOk:q,onChange:G,format:"dd-MMM-yyyy",onKeyDown:function(e){return e.preventDefault()},ranges:de.rQ,disabledDate:function(e){return e>new Date},style:{borderRadius:"10px !important"}})}),children:[(0,$.jsx)(b.Z,{children:(0,$.jsxs)(y.Z,{"aria-label":"customized table",children:[(0,$.jsx)(P.Z,{children:(0,$.jsxs)(m.Z,{children:[(0,$.jsx)(Ze,{sx:{pr:3,py:2},align:"left",children:"Date"}),(0,$.jsx)(Ze,{sx:{pr:3,py:2},align:"left",children:"View"})]})}),(0,$.jsx)(w.Z,{children:!W&&(null===R||void 0===R||null===(e=R.docs)||void 0===e?void 0:e.length)>0?null===R||void 0===R||null===(n=R.docs)||void 0===n?void 0:n.map((function(e,n){return(0,$.jsx)(je,{row:e,leadStatus:U,currentPage:c,pageLength:h},n)})):(0,$.jsx)($.Fragment,{children:!0===W?(0,$.jsx)(O.m1,{rows:10}):(0,$.jsx)(m.Z,{children:(0,$.jsx)(p.Z,{sx:{pr:3},align:"center",colSpan:7,children:"No DSR Found"})})})})]})}),(0,$.jsx)(_.Z,{rowsPerPageOptions:[10,25,50,100],component:"div",count:R.totalDocs,rowsPerPage:h,page:c,onPageChange:function(e,n){u(n),(0,I.WI)((0,S.BC)(n+1,h,F))},onRowsPerPageChange:function(e){(0,I.WI)((0,S.BC)(c+1,e.target.value,F)),f(parseInt(null===e||void 0===e?void 0:e.target.value))}})]})},ye=function(){return(0,$.jsxs)(o.ZP,{container:!0,spacing:r.dv,children:[(0,$.jsx)(o.ZP,{item:!0,xs:12,md:7,children:(0,$.jsx)(ue,{})}),(0,$.jsx)(o.ZP,{item:!0,xs:12,md:5,children:(0,$.jsx)(be,{})})]})}},65954:function(e,n,i){var t=i(64836);n.Z=void 0;var o=t(i(45045)),r=i(46417),s=(0,o.default)((0,r.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");n.Z=s},93066:function(e,n,i){var t=i(64836);n.Z=void 0;var o=t(i(45045)),r=i(46417),s=(0,o.default)([(0,r.jsx)("path",{d:"M12 6.5c-2.49 0-4 2.02-4 4.5v6h8v-6c0-2.48-1.51-4.5-4-4.5z",opacity:".3"},"0"),(0,r.jsx)("path",{d:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"},"1")],"NotificationsTwoTone");n.Z=s},35328:function(e,n,i){i(47313);var t=i(81171),o=i(46417);n.Z=(0,t.Z)((0,o.jsx)("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft")},88168:function(e,n,i){i(47313);var t=i(81171),o=i(46417);n.Z=(0,t.Z)((0,o.jsx)("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight")}}]);