"use strict";(self.webpackChunklms_admin=self.webpackChunklms_admin||[]).push([[6492],{86492:function(e,n,i){i.r(n),i.d(n,{default:function(){return le}});var t=i(74165),o=i(15861),r=i(1413),s=i(4942),d=i(29439),l=i(47313),a=i(19860),u=i(17592),c=i(24076),x=i(67478),p=i(49914),v=i(48119),m=i(35898),f=i(42695),h=i(24631),Z=i(51629),g=i(66835),j=i(23477),b=i(57861),y=i(91034),_=i(33497),w=(i(1759),i(49726),i(1834)),P=i(27754),D=i(64224),I=i(66135),S=i(70816),Y=i.n(S),M=i(11692),k=(i(56052),i(61689)),O=i(36541),A=i(91210),C=(i(45352),i(45987)),N=i(50301),R=i(94469),W=i(33604),L=i(47131),F=i(93405),Q=i(9019),z=i(61113),E=i(96467),U=i(69099),B=i(91215),T=(i(61581),i(40364),i(11198)),V=i(93066),G=i(12401),K=i(34229),q=i.n(K),J=i(39236),H=i(65954),X=(i(5866),i(46417)),$=["children","onClose"],ee=l.forwardRef((function(e,n){return(0,X.jsx)(N.Z,(0,r.Z)({direction:"up",ref:n},e))})),ne=(0,B.Z)(R.Z)((function(e){var n=e.theme;return{"& .MuDialogContent-root":{padding:n.spacing(2)},"& .MuDialogActions-root":{padding:n.spacing(1)}}})),ie=function(e){var n=e.children,i=e.onClose,t=(0,C.Z)(e,$);return(0,X.jsxs)(W.Z,(0,r.Z)((0,r.Z)({sx:{m:0,py:1,px:2}},t),{},{children:[n,i?(0,X.jsx)(L.Z,{"aria-label":"close",onClick:i,sx:{position:"absolute",right:10,top:10,color:function(e){return e.palette.grey[500]}},children:(0,X.jsx)(T.Z,{})}):null]}))},te=function(e){var n=e.title,i=e.count,t=(e.iconPrimary,e.messages);return(0,X.jsx)(F.Z,{sx:{padding:"16px 24px"},children:(0,X.jsx)(Q.ZP,{container:!0,spacing:G.dv,children:(0,X.jsx)(Q.ZP,{item:!0,xs:12,children:(0,X.jsx)(Q.ZP,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:(0,X.jsx)(Q.ZP,{item:!0,xs:!0,zeroMinWidth:!0,children:(0,X.jsxs)(Q.ZP,{container:!0,spacing:1,children:[(0,X.jsxs)(Q.ZP,{item:!0,xs:!0,zeroMinWidth:!0,sx:{display:"flex",alignItems:"center"},children:[(0,X.jsx)(z.Z,{align:"left",variant:"body2",children:n}),1===t?(0,X.jsx)(z.Z,{align:"left",variant:"body2",sx:{ml:2},children:(0,X.jsx)(k.Z,{title:"Update",arrow:!0,children:(0,X.jsx)("div",{children:(0,X.jsx)(H.Z,{sx:{fontSize:"18px",cursor:"pointer",color:"#3e7dc3"}})})})}):""]}),(0,X.jsx)(Q.ZP,{item:!0,sx:{width:"25%",display:"flex",justifyContent:"flex-end"},children:(0,X.jsx)(J.Z,{label:i,variant:"outlined",chipcolor:"primary"})})]})})})})})})},oe=function(e){var n,i=e.open,r=e.close,s=e.dsrId,u=((0,a.Z)(),(0,I.I0)(),(0,I.v9)((function(e){return e.clusterLeadAction}))),c=u.getDSRDetails,x=u.getDSRDetailsLoading,p=(0,l.useState)(!1),v=(0,d.Z)(p,2),m=v[0],f=(v[1],(0,l.useState)(null===c||void 0===c?void 0:c.linkedin_messages)),h=(0,d.Z)(f,2),Z=h[0],g=(h[1],Y()().format("DD-MM-YYY"),Y()(null===c||void 0===c?void 0:c.createdAt).format("DD-MM-YYY"),function(){var e=(0,o.Z)((0,t.Z)().mark((function e(n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),{dsr_id:s,linkedin_messages:Number(Z)};case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}());return(0,X.jsx)("div",{children:(0,X.jsxs)(ne,{open:i,TransitionComponent:ee,maxWidth:"xl",fullWidth:!0,sx:{"& .MuiDialog-paper":{p:0,width:"100%",maxWidth:"850px"}},children:[(0,X.jsx)(ie,{id:"customized-dialog-title",onClose:function(){r()},children:(0,X.jsxs)(z.Z,{variant:"h6",component:"h6",sx:{pl:"10px",fontSize:"1em"},children:["View DSR ",x?"":(0,X.jsxs)(X.Fragment,{children:["(",null===c||void 0===c||null===(n=c.bd_id)||void 0===n?void 0:n.name,")"]})]})}),(0,X.jsx)(q(),{component:"div",style:{scrollbarWidth:"thin",scrollbarColor:"#ff0000 #f1f1f1",maxWidth:"100%"},children:(0,X.jsx)(E.Z,{dividers:!0,children:x?(0,X.jsx)(M.YJ,{rows:8}):(0,X.jsxs)(Q.ZP,{container:!0,spacing:G.dv,children:[(0,X.jsx)(Q.ZP,{item:!0,xs:6,sx:{borderRight:"0px solid #5bb4fe","&.MuiGrid-root":{pt:"10px"}},children:(0,X.jsxs)(_.Z,{content:!1,children:[(0,X.jsx)(te,{title:"Number Of Leads Assigned",count:null===c||void 0===c?void 0:c.lead_assigned,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,X.jsx)(te,{title:"Number Of Positive Response",count:null===c||void 0===c?void 0:c.lead_positive_response,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,X.jsx)(te,{title:"Number Of Negative Response",count:null===c||void 0===c?void 0:c.lead_negative_response,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,X.jsx)(te,{title:"Number Of Follow-Ups",count:null===c||void 0===c?void 0:c.follow_ups,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,X.jsx)(te,{title:"Number Of Bids (Upwork)",count:null===c||void 0===c?void 0:c.upwork_bids,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,X.jsx)(te,{title:"Number Of Upwork Response",count:null===c||void 0===c?void 0:c.upwork_positive_response,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,X.jsx)(te,{title:"Number Of LinkedIn Response",count:null===c||void 0===c?void 0:c.linkedin_response,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,X.jsx)(te,{title:"Number Of LinkedIn Messages",count:null===c||void 0===c?void 0:c.linkedin_messages,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id})]})}),(0,X.jsx)(Q.ZP,{item:!0,xs:6,sx:{borderLeft:"0px solid #5bb4fe","&.MuiGrid-root":{pt:"10px"}},children:(0,X.jsxs)(_.Z,{content:!1,children:[(0,X.jsx)(te,{title:"Number Of Meeting Secheduled",count:null===c||void 0===c?void 0:c.meeting_scheduled,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,X.jsx)(te,{title:"Number Of Meeting Done",count:null===c||void 0===c?void 0:c.meeting_done,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,X.jsx)(te,{title:"Number Of Follow-Ups Calls Done",count:null===c||void 0===c?void 0:c.phone_call_done,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,X.jsx)(te,{title:"Number Of Propsal Submitted",count:null===c||void 0===c?void 0:c.proposal_submitted,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,X.jsx)(te,{title:"Number Of Estimation Submitted",count:null===c||void 0===c?void 0:c.estimation_submitted,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,X.jsx)(te,{title:"Understand and Queries Submitted",count:null===c||void 0===c?void 0:c.understanding_queries_submitted,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,X.jsx)(te,{title:"Number Of Features List Shared",count:null===c||void 0===c?void 0:c.feature_list_shared,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),(0,X.jsx)(te,{title:"Number Of Proposal Amount",count:null!==c&&void 0!==c&&c.proposal_amount?null===c||void 0===c?void 0:c.proposal_amount:0,iconPrimary:(0,X.jsx)(V.Z,{}),messages:2,dsrId:null===c||void 0===c?void 0:c._id}),m?(0,X.jsx)(F.Z,{sx:{padding:"18px 24px"},children:(0,X.jsx)(Q.ZP,{container:!0,spacing:G.dv,children:(0,X.jsx)(Q.ZP,{item:!0,xs:12,children:(0,X.jsx)(U.Z,{size:"small",variant:"contained",color:"secondary",sx:{height:"35px",background:"#3a5895","&:hover":{color:"#000",background:"#c6d9ff"}},onClick:function(e){return g(e)},children:"Submit"})})})}):""]})})]})})})]})})},re=i(14732),se=i(74031);function de(e){var n=e.row,i=e.key,t=e.currentPage,o=e.pageLength,r=e.leadStatus,s=((0,a.Z)(),t+1),u=l.useState(""),p=(0,d.Z)(u,2),v=p[0],m=p[1],f=l.useState(!1),h=(0,d.Z)(f,2),Z=(h[0],h[1],l.useState(!1)),g=(0,d.Z)(Z,2),j=(g[0],g[1],l.useState(!1)),b=(0,d.Z)(j,2),y=(b[0],b[1],l.useState(!1)),_=(0,d.Z)(y,2),w=_[0],I=_[1],S=(0,l.useState)(""),M=(0,d.Z)(S,2);M[0],M[1];return(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(c.Z,{hover:!0,sx:{"& > *":{borderBottom:"unset"}},unmountOnExit:!0,children:[(0,X.jsx)(x.Z,{component:"th",scope:"row",sx:{py:2},children:null===n||void 0===n?void 0:n.bd_name})," ",(0,X.jsx)(x.Z,{component:"th",scope:"row",sx:{py:2},children:null===n||void 0===n?void 0:n.bd_target})," ",(0,X.jsx)(x.Z,{component:"th",scope:"row",sx:{py:2},children:Y()(null===n||void 0===n?void 0:n.createdAt).format("DD-MMMM-YYYY")}),(0,X.jsx)(x.Z,{align:"left",sx:{py:2},children:(0,X.jsx)(k.Z,{title:"View Report",arrow:!0,children:(0,X.jsx)(A.Z,{onClick:function(){return m((e=n)._id),I(!0),void(0,D.WI)((0,P.vK)(e._id));var e},sx:{color:"#4d97f3",cursor:"pointer","&:hover":{color:"#b5dbff"}}})})})]},i),w&&(0,X.jsx)(oe,{dsrId:v,open:w,rowData:n,close:function(){return m(""),I(!1),(0,D.WI)((0,P.OV)()),void(0,D.WI)((0,P.AQ)(s,o,"",r))}})]})}(0,u.ZP)(p.Z,{shouldForwardProp:O.x9})((function(e){var n,i=e.theme;return n={width:290,marginLeft:16,height:"45px",padding:"27px 16px","& input":{background:"transparent !important",paddingLeft:"4px !important"}},(0,s.Z)(n,i.breakpoints.down("lg"),{width:250}),(0,s.Z)(n,i.breakpoints.down("md"),{width:"100%",marginLeft:4,background:"dark"===i.palette.mode?i.palette.dark[800]:"#fff"}),n})),(0,u.ZP)(v.Z,{shouldForwardProp:O.x9})((function(e){var n=e.theme;return(0,r.Z)((0,r.Z)((0,r.Z)({},n.typography.commonAvatar),n.typography.mediumAvatar),{},{background:"transparent",color:"#3e7dc3","&:hover":{color:"black"}})}));var le=function(){var e,n,i,s,a=(0,l.useState)(0),u=(0,d.Z)(a,2),p=u[0],v=u[1],S=(0,l.useState)(10),k=(0,d.Z)(S,2),O=k[0],A=k[1],C=(0,l.useState)(!1),N=(0,d.Z)(C,2),R=N[0],W=N[1],L=(0,l.useState)(""),F=(0,d.Z)(L,2),Q=(F[0],F[1],(0,I.v9)((function(e){return e.clusterLeadAction}))),z=Q.getDSRList,E=Q.getDSRLoading,U=Q.getBdeDropdownList,B=((0,I.v9)((function(e){return e.masterAction})).leadStatusList,(0,I.v9)((function(e){return e.commonAction})).dashboardleadTypeId,(0,l.useState)("")),T=(0,d.Z)(B,2),V=T[0],G=T[1],K=(0,l.useState)([]),q=(0,d.Z)(K,2),J=q[0],H=(q[1],(0,l.useState)(["",""])),$=(0,d.Z)(H,2),ee=$[0],ne=$[1];null==ee?(i="",s=""):(i=ee.length>0&&""!==ee[0]?Y()(ee[0]).format("YYYY-MM-DD"):"",s=ee.length>0&&""!==ee[0]?Y()(ee[1]).format("YYYY-MM-DD"):""),(0,l.useEffect)((function(){(0,D.WI)((0,P.AQ)(1,O,V,i,s))}),[O,i,s]),(0,l.useEffect)((function(){(0,D.WI)((0,P.n6)())}),[]);var ie=function(){var e=(0,o.Z)((0,t.Z)().mark((function e(n){var i,o;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ne(n),n.length>0&&(i=n?Y()(n[0]).format("YYYY-MM-DD"):"",o=n?Y()(n[1]).format("YYYY-MM-DD"):"",(0,D.WI)((0,P.AQ)(p+1,O,V,i,o)));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),te=function(){var e=(0,o.Z)((0,t.Z)().mark((function e(n){var i,o;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=n?Y()(n[0]).format("YYYY-MM-DD"):"",o=n?Y()(n[1]).format("YYYY-MM-DD"):"",(0,D.WI)((0,P.AQ)(p+1,O,V,i,o)),ne(n);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,X.jsxs)(_.Z,{content:!1,title:(0,X.jsxs)(m.Z,{direction:"row",children:[(0,X.jsx)(w.hR0,{sx:{mr:2}})," \xa0 DSR Report"]}),sx:{border:"0px solid",padding:"5px"},secondary:(0,X.jsxs)(m.Z,{direction:"row",spacing:2,alignItems:"center",children:[(0,X.jsx)(re.Z,{showOneCalendar:!0,size:"md",placeholder:"Please Select Date-Range",className:"w-100 input d-inline",character:" -To- ",block:!0,value:ee,cleanable:!0,onOk:te,onChange:ie,format:"dd-MMM-yyyy",onKeyDown:function(e){return e.preventDefault()},ranges:se.rQ,disabledDate:function(e){return e>new Date},style:{borderRadius:"10px !important"}}),(0,X.jsx)(f.Z,{options:U,getOptionLabel:function(e){return e?e.name:""},value:U.find((function(e){return e._id===V}))||null,onChange:function(e,n){var i=n?n._id:"";G(i),(0,D.WI)((0,P.AQ)(p+1,O,i))},renderInput:function(e){return(0,X.jsx)(h.Z,(0,r.Z)((0,r.Z)({},e),{},{label:"Select BDE",inputProps:(0,r.Z)((0,r.Z)({},e.inputProps),{},{autoComplete:"off"}),size:"small",sx:{minWidth:"250px","& .MuiTextField-root":{borderRadius:"5px"}}}))}})]}),children:[(0,X.jsx)(Z.Z,{children:(0,X.jsxs)(g.Z,{"aria-label":"collapsible table",children:[(0,X.jsx)(j.Z,{children:(0,X.jsxs)(c.Z,{children:[(0,X.jsx)(x.Z,{sx:{pr:3,py:2},align:"left",children:"BDE Name"}),(0,X.jsx)(x.Z,{sx:{pr:3,py:2},align:"left",children:"Achived Target"}),(0,X.jsx)(x.Z,{sx:{pr:3,py:2},align:"left",children:"Date"}),(0,X.jsx)(x.Z,{sx:{pr:3,py:2},align:"left",children:"View"})]})}),(0,X.jsx)(b.Z,{children:!E&&(null===z||void 0===z||null===(e=z.docs)||void 0===e?void 0:e.length)>0?null===z||void 0===z||null===(n=z.docs)||void 0===n?void 0:n.map((function(e,n){return(0,X.jsx)(de,{row:e,leadStatus:J,currentPage:p,pageLength:O},n)})):(0,X.jsx)(X.Fragment,{children:!0===E?(0,X.jsx)(M.m1,{rows:10}):(0,X.jsx)(c.Z,{children:(0,X.jsx)(x.Z,{sx:{pr:3},align:"center",colSpan:7,children:"No DSR Found"})})})})]})}),(0,X.jsx)(y.Z,{rowsPerPageOptions:[10,25,50,100],component:"div",count:z.totalDocs,rowsPerPage:O,page:p,onPageChange:function(e,n){v(n),(0,D.WI)((0,P.AQ)(n+1,O,V))},onRowsPerPageChange:function(e){(0,D.WI)((0,P.AQ)(p+1,e.target.value,V)),A(parseInt(null===e||void 0===e?void 0:e.target.value))}}),R&&(0,X.jsx)(oe,{open:R,close:function(){return W(!1),void(0,D.WI)((0,P.AQ)(p+1,O))}})]})}}}]);