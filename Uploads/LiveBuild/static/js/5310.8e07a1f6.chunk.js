"use strict";(self.webpackChunklms_admin=self.webpackChunklms_admin||[]).push([[5310],{3779:function(e,n,i){i.r(n),i.d(n,{default:function(){return ce}});var t=i(74165),r=i(15861),s=i(1413),o=i(4942),d=i(29439),a=i(47313),l=i(17592),c=i(19860),u=i(67478),x=i(24076),p=i(49914),v=i(48119),m=i(35898),h=i(51629),f=i(66835),Z=i(23477),g=i(57861),j=i(91034),b=i(33497),y=(i(1759),i(22903),i(1834)),P=i(62831),w=i(64224),_=i(66135),D=i(70816),M=i.n(D),I=i(11692),k=(i(56052),i(61689)),S=i(36541),Y=i(91210),C=(i(45352),i(45987)),R=i(50301),z=i(94469),L=i(33604),O=i(47131),A=i(93405),N=i(9019),W=i(61113),F=i(96467),Q=i(24631),U=i(69099),V=i(91215),E=(i(61581),i(40364),i(11198)),K=i(93066),T=i(12401),B=i(34229),q=i.n(B),H=i(39236),J=i(65954),G=i(5866),X=i(46417),$=["children","onClose"],ee=a.forwardRef((function(e,n){return(0,X.jsx)(R.Z,(0,s.Z)({direction:"up",ref:n},e))})),ne=(0,V.Z)(z.Z)((function(e){var n=e.theme;return{"& .MuDialogContent-root":{padding:n.spacing(2)},"& .MuDialogActions-root":{padding:n.spacing(1)}}})),ie=function(e){var n=e.children,i=e.onClose,t=(0,C.Z)(e,$);return(0,X.jsxs)(L.Z,(0,s.Z)((0,s.Z)({sx:{m:0,py:1,px:2}},t),{},{children:[n,i?(0,X.jsx)(O.Z,{"aria-label":"close",onClick:i,sx:{position:"absolute",right:10,top:10,color:function(e){return e.palette.grey[500]}},children:(0,X.jsx)(E.Z,{})}):null]}))},te=function(e){var n=e.title,i=e.count,t=(e.iconPrimary,e.messages);return(0,X.jsx)(A.Z,{sx:{padding:"16px 24px"},children:(0,X.jsx)(N.ZP,{container:!0,spacing:T.dv,children:(0,X.jsx)(N.ZP,{item:!0,xs:12,children:(0,X.jsx)(N.ZP,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:(0,X.jsx)(N.ZP,{item:!0,xs:!0,zeroMinWidth:!0,children:(0,X.jsxs)(N.ZP,{container:!0,spacing:1,children:[(0,X.jsxs)(N.ZP,{item:!0,xs:!0,zeroMinWidth:!0,sx:{display:"flex",alignItems:"center"},children:[(0,X.jsx)(W.Z,{align:"left",variant:"body2",children:n}),1===t?(0,X.jsx)(W.Z,{align:"left",variant:"body2",sx:{ml:2},children:(0,X.jsx)(k.Z,{title:"Update",arrow:!0,children:(0,X.jsx)("div",{children:(0,X.jsx)(J.Z,{sx:{fontSize:"18px",cursor:"pointer",color:"#3e7dc3"}})})})}):""]}),(0,X.jsx)(N.ZP,{item:!0,sx:{width:"25%",display:"flex",justifyContent:"flex-end"},children:(0,X.jsx)(H.Z,{label:i,variant:"outlined",chipcolor:"primary"})})]})})})})})})},re=function(e){var n=e.open,i=e.close,s=e.dsrId,o=((0,c.Z)(),(0,_.I0)()),l=(0,_.v9)((function(e){return e.businessAction})),u=l.getDSRDetails,x=l.getDSRDetailsLoading,p=(0,a.useState)(!1),v=(0,d.Z)(p,2),m=v[0],h=v[1],f=(0,a.useState)(null===u||void 0===u?void 0:u.linkedin_messages),Z=(0,d.Z)(f,2),g=Z[0],j=Z[1],y=M()().format("DD-MM-YYY")===M()(null===u||void 0===u?void 0:u.createdAt).format("DD-MM-YYY"),w=function(){var e=(0,r.Z)((0,t.Z)().mark((function e(n){var i;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),i={dsr_id:s,linkedin_messages:Number(g)},o((0,P.ll)(i)).then((function(e){!0===e.succeeded?(h(!1),o((0,P.vK)(s)),o((0,G.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))):o((0,G.ss)({open:!0,message:e.ResponseMessage,variant:"alert",alert:{color:"error"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))}));case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,X.jsx)("div",{children:(0,X.jsxs)(ne,{open:n,TransitionComponent:ee,maxWidth:"xl",fullWidth:!0,sx:{"& .MuiDialog-paper":{p:0,width:"100%",maxWidth:"850px"}},children:[(0,X.jsx)(ie,{id:"customized-dialog-title",onClose:function(){i()},children:(0,X.jsx)(W.Z,{variant:"h6",component:"h6",sx:{pl:"10px",fontSize:"1em"},children:"DSR View & Update"})}),(0,X.jsx)(q(),{component:"div",style:{scrollbarWidth:"thin",scrollbarColor:"#ff0000 #f1f1f1",maxWidth:"100%"},children:(0,X.jsx)(F.Z,{dividers:!0,children:x?(0,X.jsx)(I.YJ,{rows:8}):(0,X.jsxs)(N.ZP,{container:!0,spacing:T.dv,children:[(0,X.jsx)(N.ZP,{item:!0,xs:6,sx:{borderRight:"0px solid #5bb4fe"},children:(0,X.jsxs)(b.Z,{content:!1,children:[(0,X.jsx)(te,{title:"Number Of Leads Assigned",count:null===u||void 0===u?void 0:u.lead_assigned,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id}),(0,X.jsx)(te,{title:"Number Of Positive Response",count:null===u||void 0===u?void 0:u.lead_positive_response,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id}),(0,X.jsx)(te,{title:"Number Of Negative Response",count:null===u||void 0===u?void 0:u.lead_negative_response,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id}),(0,X.jsx)(te,{title:"Number Of Follow-Ups",count:null===u||void 0===u?void 0:u.follow_ups,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id}),(0,X.jsx)(te,{title:"Number Of Bids (Upwork)",count:null===u||void 0===u?void 0:u.upwork_bids,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id}),(0,X.jsx)(te,{title:"Number Of Upwork Response",count:null===u||void 0===u?void 0:u.upwork_positive_response,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id}),(0,X.jsx)(te,{title:"Number Of LinkedIn Response",count:null===u||void 0===u?void 0:u.linkedin_response,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id}),(0,X.jsx)(A.Z,{sx:{padding:"16px 24px"},children:(0,X.jsx)(N.ZP,{container:!0,spacing:T.dv,children:(0,X.jsx)(N.ZP,{item:!0,xs:12,children:(0,X.jsx)(N.ZP,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:(0,X.jsx)(N.ZP,{item:!0,xs:!0,zeroMinWidth:!0,children:(0,X.jsxs)(N.ZP,{container:!0,spacing:1,children:[(0,X.jsxs)(N.ZP,{item:!0,xs:!0,zeroMinWidth:!0,sx:{display:"flex",alignItems:"center"},children:[(0,X.jsx)(W.Z,{align:"left",variant:"body2",children:"Number Of LinkedIn Messages"}),(0,X.jsx)(W.Z,{align:"left",variant:"body2",sx:{ml:2},children:!0===y?(0,X.jsx)(k.Z,{title:"Update",arrow:!0,children:(0,X.jsx)("div",{children:(0,X.jsx)(J.Z,{onClick:function(){h(!m)},sx:{fontSize:"18px",cursor:"pointer",color:"#3e7dc3"}})})}):""})]}),(0,X.jsx)(N.ZP,{item:!0,sx:{width:"25%",display:"flex",justifyContent:"flex-end"},children:m?(0,X.jsx)(Q.Z,{type:"text",size:"small",defaultValue:g||(null===u||void 0===u?void 0:u.linkedin_messages),inputProps:{maxLength:4},onChange:function(e){return j(e?e.target.value:"")}}):(0,X.jsx)(H.Z,{label:null===u||void 0===u?void 0:u.linkedin_messages,variant:"outlined",chipcolor:"primary"})})]})})})})})}),m?(0,X.jsx)(A.Z,{sx:{padding:"18px 24px"},children:(0,X.jsx)(N.ZP,{container:!0,spacing:T.dv,children:(0,X.jsx)(N.ZP,{item:!0,xs:12,children:(0,X.jsx)(U.Z,{size:"small",variant:"contained",color:"secondary",sx:{height:"35px",background:"#3a5895","&:hover":{color:"#000",background:"#c6d9ff"}},onClick:function(e){return w(e)},children:"Submit"})})})}):""]})}),(0,X.jsx)(N.ZP,{item:!0,xs:6,sx:{borderLeft:"0px solid #5bb4fe"},children:(0,X.jsxs)(b.Z,{content:!1,children:[(0,X.jsx)(te,{title:"Number Of Meeting Secheduled",count:null===u||void 0===u?void 0:u.meeting_scheduled,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id}),(0,X.jsx)(te,{title:"Number Of Meeting Done",count:null===u||void 0===u?void 0:u.meeting_done,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id}),(0,X.jsx)(te,{title:"Number Of Follow-Ups Calls Done",count:null===u||void 0===u?void 0:u.phone_call_done,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id}),(0,X.jsx)(te,{title:"Number Of Propsal Submitted",count:null===u||void 0===u?void 0:u.proposal_submitted,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id}),(0,X.jsx)(te,{title:"Proposal Submitted Amount",count:null!==u&&void 0!==u&&u.proposal_amount?null===u||void 0===u?void 0:u.proposal_amount:0,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id}),(0,X.jsx)(te,{title:"Number Of Estimation Submitted",count:null===u||void 0===u?void 0:u.estimation_submitted,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id}),(0,X.jsx)(te,{title:"Understand and Queries Submitted",count:null===u||void 0===u?void 0:u.understanding_queries_submitted,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id}),(0,X.jsx)(te,{title:"Number Of Features List Shared",count:null===u||void 0===u?void 0:u.feature_list_shared,iconPrimary:(0,X.jsx)(K.Z,{}),messages:2,dsrId:null===u||void 0===u?void 0:u._id})]})})]})})})]})})},se=i(14732),oe=i(74031),de=(0,l.ZP)(u.Z)((function(e){e.theme;return{}})),ae=(0,l.ZP)(x.Z)((function(e){e.theme;return{"&:last-of-type td, &:last-of-type th":{border:0}}}));function le(e){var n=e.row,i=e.key,t=e.currentPage,r=e.pageLength,s=e.leadStatus,o=((0,c.Z)(),t+1),l=a.useState(""),x=(0,d.Z)(l,2),p=x[0],v=x[1],m=a.useState(!1),h=(0,d.Z)(m,2),f=(h[0],h[1],a.useState(!1)),Z=(0,d.Z)(f,2),g=(Z[0],Z[1],a.useState(!1)),j=(0,d.Z)(g,2),b=(j[0],j[1],a.useState(!1)),y=(0,d.Z)(b,2),_=y[0],D=y[1];return(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(ae,{hover:!0,sx:{"& > *":{borderBottom:"unset"}},unmountOnExit:!0,children:[(0,X.jsx)(u.Z,{component:"th",scope:"row",sx:{py:2},children:M()(null===n||void 0===n?void 0:n.createdAt).format("DD-MMMM-YYYY")}),(0,X.jsx)(u.Z,{align:"left",sx:{py:2},children:(0,X.jsx)(k.Z,{title:"View Report",arrow:!0,children:(0,X.jsx)(Y.Z,{onClick:function(){return v((e=n)._id),D(!0),void(0,w.WI)((0,P.vK)(e._id));var e},sx:{color:"#4d97f3",cursor:"pointer","&:hover":{color:"#b5dbff"}}})})})]},i),_&&(0,X.jsx)(re,{dsrId:p,open:_,rowData:n,close:function(){return v(""),D(!1),(0,w.WI)((0,P.OV)()),void(0,w.WI)((0,P.AQ)(o,r,"",s))}})]})}(0,l.ZP)(p.Z,{shouldForwardProp:S.x9})((function(e){var n,i=e.theme;return n={width:290,marginLeft:16,height:"45px",padding:"27px 16px","& input":{background:"transparent !important",paddingLeft:"4px !important"}},(0,o.Z)(n,i.breakpoints.down("lg"),{width:250}),(0,o.Z)(n,i.breakpoints.down("md"),{width:"100%",marginLeft:4,background:"dark"===i.palette.mode?i.palette.dark[800]:"#fff"}),n})),(0,l.ZP)(v.Z,{shouldForwardProp:S.x9})((function(e){var n=e.theme;return(0,s.Z)((0,s.Z)((0,s.Z)({},n.typography.commonAvatar),n.typography.mediumAvatar),{},{background:"transparent",color:"#3e7dc3","&:hover":{color:"black"}})}));var ce=function(){var e,n,i,s,o=(0,a.useState)(0),l=(0,d.Z)(o,2),c=l[0],p=l[1],v=(0,a.useState)(10),D=(0,d.Z)(v,2),k=D[0],S=D[1],Y=(0,a.useState)(!1),C=(0,d.Z)(Y,2),R=C[0],z=C[1],L=(0,a.useState)(""),O=(0,d.Z)(L,2),A=(O[0],O[1],(0,_.v9)((function(e){return e.businessAction}))),N=A.getDSRList,W=A.getDSRLoading,F=((0,_.v9)((function(e){return e.masterAction})).leadStatusList,(0,_.v9)((function(e){return e.commonAction})).dashboardleadTypeId),Q=(0,a.useState)(F),U=(0,d.Z)(Q,2),V=U[0],E=(U[1],(0,a.useState)(["",""])),K=(0,d.Z)(E,2),T=K[0],B=K[1];null==T?(i="",s=""):(i=T.length>0&&""!==T[0]?M()(T[0]).format("YYYY-MM-DD"):"",s=T.length>0&&""!==T[0]?M()(T[1]).format("YYYY-MM-DD"):""),(0,a.useEffect)((function(){(0,w.WI)((0,P.AQ)(1,k,i,s))}),[k,i,s]);var q=function(){var e=(0,r.Z)((0,t.Z)().mark((function e(n){var i,r;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:B(n),n.length>0&&(i=n?M()(n[0]).format("YYYY-MM-DD"):"",r=n?M()(n[1]).format("YYYY-MM-DD"):"",(0,w.WI)((0,P.AQ)(c+1,k,i,r)));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),H=function(){var e=(0,r.Z)((0,t.Z)().mark((function e(n){var i,r;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=n?M()(n[0]).format("YYYY-MM-DD"):"",r=n?M()(n[1]).format("YYYY-MM-DD"):"",(0,w.WI)((0,P.AQ)(c+1,k,i,r)),B(n);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,X.jsxs)(b.Z,{content:!1,title:(0,X.jsxs)(m.Z,{direction:"row",children:[(0,X.jsx)(y.hR0,{sx:{mr:2}})," \xa0 DSR Report"]}),sx:{border:"0px solid",padding:"5px"},secondary:(0,X.jsx)(m.Z,{direction:"row",spacing:2,alignItems:"center",children:(0,X.jsx)(se.Z,{showOneCalendar:!0,size:"md",placeholder:"Please Select Date-Range",className:"w-100 input d-inline",character:" -To- ",block:!0,value:T,cleanable:!0,onOk:H,onChange:q,format:"dd-MMM-yyyy",onKeyDown:function(e){return e.preventDefault()},ranges:oe.rQ,disabledDate:function(e){return e>new Date},style:{borderRadius:"10px !important"},placement:"bottomEnd"})}),children:[(0,X.jsx)(h.Z,{children:(0,X.jsxs)(f.Z,{"aria-label":"simple table",children:[(0,X.jsx)(Z.Z,{children:(0,X.jsxs)(x.Z,{children:[(0,X.jsx)(de,{sx:{pr:3,py:2},align:"left",children:"Date"}),(0,X.jsx)(de,{sx:{pr:3,py:2},align:"left",children:"View"})]})}),(0,X.jsx)(g.Z,{children:!W&&(null===N||void 0===N||null===(e=N.docs)||void 0===e?void 0:e.length)>0?null===N||void 0===N||null===(n=N.docs)||void 0===n?void 0:n.map((function(e,n){return(0,X.jsx)(le,{row:e,leadStatus:V,currentPage:c,pageLength:k},n)})):(0,X.jsx)(X.Fragment,{children:!0===W?(0,X.jsx)(I.L7,{rows:10}):(0,X.jsx)(x.Z,{children:(0,X.jsx)(u.Z,{sx:{pr:3},align:"center",colSpan:7,children:"No DSR Found"})})})})]})}),(0,X.jsx)(j.Z,{rowsPerPageOptions:[10,25,50,100],component:"div",count:N.totalDocs,rowsPerPage:k,page:c,onPageChange:function(e,n){p(n),(0,w.WI)((0,P.AQ)(n+1,k,"",V))},onRowsPerPageChange:function(e){(0,w.WI)((0,P.AQ)(c+1,e.target.value,"",V)),S(parseInt(null===e||void 0===e?void 0:e.target.value))}}),R&&(0,X.jsx)(re,{open:R,close:function(){return z(!1),void(0,w.WI)((0,P.AQ)(c+1,k))}})]})}},65954:function(e,n,i){var t=i(64836);n.Z=void 0;var r=t(i(45045)),s=i(46417),o=(0,r.default)((0,s.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");n.Z=o},93066:function(e,n,i){var t=i(64836);n.Z=void 0;var r=t(i(45045)),s=i(46417),o=(0,r.default)([(0,s.jsx)("path",{d:"M12 6.5c-2.49 0-4 2.02-4 4.5v6h8v-6c0-2.48-1.51-4.5-4-4.5z",opacity:".3"},"0"),(0,s.jsx)("path",{d:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"},"1")],"NotificationsTwoTone");n.Z=o},35328:function(e,n,i){i(47313);var t=i(81171),r=i(46417);n.Z=(0,t.Z)((0,r.jsx)("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft")},88168:function(e,n,i){i(47313);var t=i(81171),r=i(46417);n.Z=(0,t.Z)((0,r.jsx)("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight")}}]);