"use strict";(self.webpackChunklead_management_system_dashboard=self.webpackChunklead_management_system_dashboard||[]).push([[6339],{61744:function(e,n,l){l.d(n,{EP:function(){return i},TW:function(){return t},eG:function(){return o}});var t=function(e){return"Active"===e?"#00c853":"Dead"===e?"#f44336":"Hot Prospect"===e?"#ffab91":"Hold"===e?"#ffc107":"Lead Return"===e?"#7c4dff":"Awarded"===e?"#2196f3":"In Discussion"===e?"#c77e23":"Proposal Submitted"===e?"#1B4242":"Negotiation"===e?"#9BBEC8":"#b5dbff"},i=function(e){return"Meeting Scheduled"===e?"#2196f3":"Meeting Cancelled"===e?"#f44336":"Meeting Re-Scheduled"===e?"#7c4dff":"Meeting Done"===e?"#00c853":"#b5dbff"},o=function(e){return"Request For Proposal"===e?"#7c4dff":"RFP Pending"===e?"#f44336":"RFP Received"===e?"#ffc107":"Revised RFP"===e?"#2196f3":"RFP Approved"===e?"#00c853":"#b5dbff"}},22903:function(e,n,l){l(89535),l(46417)},96339:function(e,n,l){l.r(n);var t=l(1413),i=l(4942),o=l(29439),d=l(47313),r=l(19860),a=l(17592),s=l(24076),u=l(70941),c=l(47131),h=l(66212),x=l(65033),v=l(9506),p=l(51629),f=l(66835),Z=l(57861),j=l(49914),g=l(48119),m=l(35898),b=l(42695),y=l(24631),_=l(41727),W=l(23477),S=l(91034),P=l(33497),k=l(1759),D=(l(22903),l(29428)),C=l(3665),w=l(1834),L=l(64224),I=l(66135),T=l(70816),A=l.n(T),R=l(11692),F=l(56052),M=l(36541),z=l(61744),E=(l(27754),l(56406)),Y=l(61113),B=l(46353),N=l(45352),H=l.n(N),O=l(46417);function q(e){var n,l,t,i,a,j,g,m,b,y,_,W,S,P,w,L,I,T=e.row,R=e.key,F=(e.currentPage,e.pageLength,e.search,e.leadStatus,e.bdeData,e.clusterLeadData,(0,r.Z)()),M=d.useState(""),E=(0,o.Z)(M,2),B=(E[0],E[1]),N=d.useState(!1),q=(0,o.Z)(N,2),U=q[0],K=q[1],V=d.useState(!1),$=(0,o.Z)(V,2),G=($[0],$[1],d.useState(!1)),J=(0,o.Z)(G,2),Q=(J[0],J[1]),X=d.useState(!1),ee=(0,o.Z)(X,2),ne=(ee[0],ee[1]),le=d.useState(""),te=(0,o.Z)(le,2),ie=(te[0],te[1]),oe=d.useState(!1),de=(0,o.Z)(oe,2),re=(de[0],de[1],function(e){var n;ne(!0),Q(!1),B(e._id),ie(null===e||void 0===e||null===(n=e.leadStatusData)||void 0===n?void 0:n._id)});return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(s.Z,{hover:!0,children:[(0,O.jsx)(u.Z,{sx:{pl:3,py:0},children:(0,O.jsx)(c.Z,{"aria-label":"expand row",size:"small",onClick:function(){return K(!U)},children:U?(0,O.jsx)(C.Z,{}):(0,O.jsx)(D.Z,{})})}),(0,O.jsx)(u.Z,{component:"th",scope:"row",sx:{py:0},children:null===T||void 0===T?void 0:T.client_name}),(0,O.jsx)(u.Z,{align:"left",sx:{py:0},children:null===T||void 0===T||null===(n=T.leadTypeData)||void 0===n?void 0:n.status_name}),(0,O.jsx)(u.Z,{align:"left",sx:{py:0},children:(0,O.jsx)(Y.Z,{sx:{color:"#2196f3"},children:null!==T&&void 0!==T&&null!==(l=T.bdData)&&void 0!==l&&l.name?null===T||void 0===T||null===(t=T.bdData)||void 0===t?void 0:t.name:"-"})}),(0,O.jsx)(u.Z,{align:"left",sx:{py:0},children:(0,O.jsx)(Y.Z,{sx:{color:"#2196f3"},children:null!==T&&void 0!==T&&null!==(i=T.transferbdData)&&void 0!==i&&i.name?null===T||void 0===T||null===(a=T.transferbdData)||void 0===a?void 0:a.name:"-"})}),(0,O.jsx)(u.Z,{align:"left",sx:{py:0},children:null===T||void 0===T?void 0:T.client_country}),(0,O.jsx)(u.Z,{align:"left",sx:{py:0},children:null!==T&&void 0!==T&&null!==(j=T.leadStatusData)&&void 0!==j&&j.status_name?(0,O.jsx)(h.Z,{label:null===T||void 0===T||null===(g=T.leadStatusData)||void 0===g?void 0:g.status_name,variant:"outlined",onClick:function(){return re(T)},sx:{cursor:"pointer",color:(0,z.TW)(null===T||void 0===T||null===(m=T.leadStatusData)||void 0===m?void 0:m.status_name),borderColor:(0,z.TW)(null===T||void 0===T||null===(b=T.leadStatusData)||void 0===b?void 0:b.status_name)}}):(0,O.jsx)(h.Z,{label:"No Found",variant:"outlined",color:"secondary",sx:{cursor:"pointer",color:(0,z.TW)(null===T||void 0===T||null===(y=T.leadStatusData)||void 0===y?void 0:y.status_name),borderColor:(0,z.TW)(null===T||void 0===T||null===(_=T.leadStatusData)||void 0===_?void 0:_.status_name)},onClick:function(){return re(T)}})}),(0,O.jsx)(u.Z,{align:"left",sx:{pr:0},children:A()(null===T||void 0===T?void 0:T.createdAt).format("DD-MMM-YYYY")}),(0,O.jsx)(u.Z,{align:"left",sx:{pr:0},children:A()(null===T||void 0===T?void 0:T.createdAt).format("DD-MMM-YYYY")})]},R),(0,O.jsx)(s.Z,{children:(0,O.jsx)(u.Z,{style:{paddingBottom:0,paddingTop:0},colSpan:10,children:(0,O.jsx)(x.Z,{in:U,timeout:"auto",unmountOnExit:!0,children:U&&(0,O.jsx)(v.Z,{sx:{margin:1},children:(0,O.jsx)(p.Z,{children:(0,O.jsx)(k.Z,{sx:{bgcolor:"dark"===F.palette.mode?"dark.800":"grey.50",mb:2},title:"Duplicate Lead Information",content:!1,children:(0,O.jsx)(f.Z,{size:"small","aria-label":"purchases",children:(0,O.jsxs)(Z.Z,{children:[(0,O.jsxs)(s.Z,{children:[(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Requirement Type"}),(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Lead Source "}),(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Lead Type"}),(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Client LinkedIn"}),(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Company Name"})]}),(0,O.jsxs)(s.Z,{children:[(0,O.jsx)(u.Z,{children:null!==T&&void 0!==T&&null!==(W=T.reqTypeData)&&void 0!==W&&W.status_name?null===T||void 0===T||null===(S=T.reqTypeData)||void 0===S?void 0:S.status_name:"-"}),(0,O.jsx)(u.Z,{children:null!==T&&void 0!==T&&null!==(P=T.leadSourceData)&&void 0!==P&&P.status_name?null===T||void 0===T||null===(w=T.leadSourceData)||void 0===w?void 0:w.status_name:"-"}),(0,O.jsx)(u.Z,{children:null!==T&&void 0!==T&&null!==(L=T.leadTypeData)&&void 0!==L&&L.status_name?null===T||void 0===T||null===(I=T.leadTypeData)||void 0===I?void 0:I.status_name:"-"}),(0,O.jsx)(u.Z,{children:null!==T&&void 0!==T&&T.client_linkedin?(0,O.jsx)("a",{href:null===T||void 0===T?void 0:T.client_linkedin,target:"_blank",rel:"noreferrer",children:"Click Here"}):"-"}),(0,O.jsx)(u.Z,{children:null!==T&&void 0!==T&&T.company_name?null===T||void 0===T?void 0:T.company_name:"-"})]}),(0,O.jsxs)(s.Z,{children:[(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Client Name"}),(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Client Email"}),(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Client Number"}),(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Client WhatsApp"}),(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Country"})]}),(0,O.jsxs)(s.Z,{children:[(0,O.jsx)(u.Z,{children:null!==T&&void 0!==T&&T.client_name?null===T||void 0===T?void 0:T.client_name:"-"}),(0,O.jsx)(u.Z,{children:(0,O.jsx)("a",{href:"mailto:".concat(null===T||void 0===T?void 0:T.client_email),children:null!==T&&void 0!==T&&T.client_email?null===T||void 0===T?void 0:T.client_email:"-"})}),(0,O.jsx)(u.Z,{children:null!==T&&void 0!==T&&T.client_number?null===T||void 0===T?void 0:T.client_number:"-"}),(0,O.jsx)(u.Z,{children:null!==T&&void 0!==T&&T.client_whatsapp_num?null===T||void 0===T?void 0:T.client_whatsapp_num:"-"}),(0,O.jsx)(u.Z,{children:null!==T&&void 0!==T&&T.client_country?null===T||void 0===T?void 0:T.client_country:"-"})]}),(0,O.jsxs)(s.Z,{children:[(0,O.jsx)(u.Z,{style:{fontWeight:"bold",width:"320px"},children:"Add Notes"}),(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Upwork URL"}),(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Bid URL"}),(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Proposal Amount"}),(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Client Budget"})]}),(0,O.jsxs)(s.Z,{children:[(0,O.jsx)(u.Z,{sx:{width:"320px"},children:""!==(null===T||void 0===T?void 0:T.add_notes)?(0,O.jsx)(H(),{charLimit:20,readMoreText:"Read more \u25bc",readLessText:"Read less \u25b2",children:null===T||void 0===T?void 0:T.add_notes}):"-"}),(0,O.jsx)(u.Z,{children:null!==T&&void 0!==T&&T.upwork_job_url?(0,O.jsx)("a",{href:null===T||void 0===T?void 0:T.upwork_job_url,target:"_blank",rel:"noreferrer",children:"Click Here"}):"-"}),(0,O.jsx)(u.Z,{children:null!==T&&void 0!==T&&T.bid_url?(0,O.jsx)("a",{href:null===T||void 0===T?void 0:T.bid_url,target:"_blank",rel:"noreferrer",children:"Click Here"}):"-"}),(0,O.jsx)(u.Z,{children:null!==T&&void 0!==T&&T.proposal_amount?null===T||void 0===T?void 0:T.proposal_amount:"-"}),(0,O.jsx)(u.Z,{children:null!==T&&void 0!==T&&T.client_budget?null===T||void 0===T?void 0:T.client_budget:"-"})]}),(0,O.jsxs)(s.Z,{children:[(0,O.jsx)(u.Z,{style:{fontWeight:"bold"},children:"Skype Id"}),(0,O.jsx)(u.Z,{colSpan:4,style:{fontWeight:"bold"},children:"Address"})]}),(0,O.jsxs)(s.Z,{children:[(0,O.jsx)(u.Z,{children:null!==T&&void 0!==T&&T.skype_id?null===T||void 0===T?void 0:T.skype_id:"-"}),(0,O.jsx)(u.Z,{colSpan:4,children:null!==T&&void 0!==T&&T.address?null===T||void 0===T?void 0:T.address:"-"})]})]})})})})})})})})]})}var U=(0,a.ZP)(j.Z,{shouldForwardProp:M.x9})((function(e){var n,l=e.theme;return n={width:200,"& input":{background:"transparent !important",paddingLeft:"4px !important"}},(0,i.Z)(n,l.breakpoints.down("lg"),{width:250}),(0,i.Z)(n,l.breakpoints.down("md"),{width:"100%",background:"dark"===l.palette.mode?l.palette.dark[800]:"#fff"}),n})),K=(0,a.ZP)(g.Z,{shouldForwardProp:M.x9})((function(e){var n=e.theme;return(0,t.Z)((0,t.Z)((0,t.Z)({},n.typography.commonAvatar),n.typography.mediumAvatar),{},{background:"transparent",color:"#3e7dc3","&:hover":{color:"black"}})}));n.default=function(){var e,n,l=(0,d.useState)(0),i=(0,o.Z)(l,2),r=i[0],a=i[1],c=(0,d.useState)(10),h=(0,o.Z)(c,2),x=h[0],v=h[1],j=(0,d.useState)(!1),g=(0,o.Z)(j,2),k=(g[0],g[1],(0,d.useState)("")),D=(0,o.Z)(k,2),C=D[0],T=D[1],A=(0,I.v9)((function(e){return e.clusterAction})),M=A.getTransferLeadList,z=A.getTransferLeadLoading,Y=A.getClDropdownList,N=A.getSelectedBDEDropdownList,H=(0,I.v9)((function(e){return e.masterAction})).leadStatusList,V=(0,I.v9)((function(e){return e.commonAction})).dashboardleadTypeId,$=(0,d.useState)(V),G=(0,o.Z)($,2),J=G[0],Q=G[1],X=(0,d.useState)(""),ee=(0,o.Z)(X,2),ne=ee[0],le=ee[1],te=(0,d.useState)(""),ie=(0,o.Z)(te,2),oe=ie[0],de=ie[1];(0,d.useEffect)((function(){(0,L.WI)((0,E.oP)(r+1,x,C,J,ne,oe))}),[x]),(0,d.useEffect)((function(){(0,L.WI)((0,E.VT)()),(0,L.WI)((0,E.$_)([])),(0,L.WI)((0,F.qh)()),(0,L.WI)((0,F.Fp)()),(0,L.WI)((0,F.Eb)()),(0,L.WI)((0,F.sY)()),(0,L.WI)((0,F.On)()),(0,L.WI)((0,F.tJ)())}),[]);return(0,O.jsxs)(P.Z,{content:!1,title:(0,O.jsxs)(m.Z,{direction:"row",children:[(0,O.jsx)(w.HH9,{sx:{mr:2}})," \xa0 Transfered Leads"]}),sx:{border:"0px solid",padding:"5px"},secondary:(0,O.jsxs)(m.Z,{direction:"row",spacing:2,alignItems:"center",children:[(0,O.jsx)(b.Z,{options:Y,getOptionLabel:function(e){return e?e.name:""},value:Y.find((function(e){return e._id===oe}))||null,onChange:function(e,n){var l=n?n._id:"",t=n?[n._id]:[];de(l),le(""),(0,L.WI)((0,E.$_)(t)),(0,L.WI)((0,E.oP)(r+1,x,C,J,"",l))},renderInput:function(e){return(0,O.jsx)(y.Z,(0,t.Z)((0,t.Z)({},e),{},{label:"Select Cluster Lead",inputProps:(0,t.Z)((0,t.Z)({},e.inputProps),{},{autoComplete:"off"}),style:{minWidth:"200px"},size:"small"}))}}),(0,O.jsx)(b.Z,{options:N,getOptionLabel:function(e){return e?e.name:""},value:N.find((function(e){return e._id===ne}))||null,onChange:function(e,n){var l=n?n._id:"";le(l),(0,L.WI)((0,E.oP)(r+1,x,C,J,l,oe))},renderInput:function(e){return(0,O.jsx)(y.Z,(0,t.Z)((0,t.Z)({},e),{},{label:"Select BDE",inputProps:(0,t.Z)((0,t.Z)({},e.inputProps),{},{autoComplete:"off"}),style:{minWidth:"200px"},size:"small"}))}}),(0,O.jsx)(b.Z,{options:H,getOptionLabel:function(e){return e?e.status_name:""},value:H.find((function(e){return e._id===J}))||null,onChange:function(e,n){var l=n?n._id:"";Q(l),(0,L.WI)((0,B.KW)({dashboardleadType:"",dashboardleadTypeId:""})),(0,L.WI)((0,E.oP)(r+1,x,"",l,ne,oe))},renderInput:function(e){return(0,O.jsx)(y.Z,(0,t.Z)((0,t.Z)({},e),{},{label:"Select Status",inputProps:(0,t.Z)((0,t.Z)({},e.inputProps),{},{autoComplete:"off"}),style:{minWidth:"200px"},size:"small"}))}}),(0,O.jsx)(U,{id:"input-search-header",value:C,placeholder:"Search",startAdornment:(0,O.jsx)(_.Z,{position:"start",sx:{color:"#3e7dc3",background:"#e0f4ff"},children:(0,O.jsx)(w.jVj,{stroke:2,size:"1.5rem",color:"#3e7dc3"})}),endAdornment:(0,O.jsx)(_.Z,{position:"end",children:(0,O.jsx)(K,{variant:"rounded",children:(0,O.jsx)(w.kLi,{stroke:1.5,size:"1.5rem",onClick:function(){return T(""),void(0,L.WI)((0,E.oP)(r+1,x,"",J,ne,oe))}})})}),"aria-describedby":"search-helper-text",inputProps:{"aria-label":"weight"},onChange:function(e){return function(e){e.target.value.length>2&&(0,L.WI)((0,E.oP)(r+1,x,e.target.value,J,ne,oe)),0===e.target.value.length&&(0,L.WI)((0,E.oP)(r+1,x,"",J,ne,oe)),T(e.target.value)}(e)},size:"small"})]}),children:[(0,O.jsx)(p.Z,{children:(0,O.jsxs)(f.Z,{"aria-label":"collapsible table",children:[(0,O.jsx)(W.Z,{children:(0,O.jsxs)(s.Z,{children:[(0,O.jsx)(u.Z,{sx:{pl:3,py:2}}),(0,O.jsx)(u.Z,{sx:{py:2},children:"Client Name"}),(0,O.jsx)(u.Z,{sx:{py:2},align:"left",children:"Lead Type"}),(0,O.jsx)(u.Z,{sx:{py:2},align:"left",children:"Transfered From"}),(0,O.jsx)(u.Z,{sx:{pr:3,py:2},align:"left",children:"Transfered To"}),(0,O.jsx)(u.Z,{sx:{py:2},align:"left",children:"Country"}),(0,O.jsx)(u.Z,{sx:{pr:3,py:2},align:"left",children:"Status"}),(0,O.jsx)(u.Z,{sx:{pr:3,py:2},align:"left",children:"Transfer Date"}),(0,O.jsx)(u.Z,{sx:{pr:3,py:2},align:"left",children:"Assigned Date"})]})}),(0,O.jsx)(Z.Z,{children:!z&&(null===M||void 0===M||null===(e=M.docs)||void 0===e?void 0:e.length)>0?null===M||void 0===M||null===(n=M.docs)||void 0===n?void 0:n.map((function(e,n){return(0,O.jsx)(q,{row:e,leadStatus:J,bdeData:ne,clusterLeadData:oe,currentPage:r,pageLength:x,search:C},n)})):(0,O.jsx)(O.Fragment,{children:!0===z?(0,O.jsx)(R.V7,{rows:10}):(0,O.jsx)(s.Z,{children:(0,O.jsx)(u.Z,{sx:{pr:3},align:"center",colSpan:11,children:"No Leads Found"})})})})]})}),(0,O.jsx)(S.Z,{rowsPerPageOptions:[10,25,50,100],component:"div",count:M.totalDocs,rowsPerPage:x,page:r,onPageChange:function(e,n){a(n),(0,L.WI)((0,E.oP)(n+1,x,"",J,ne,oe))},onRowsPerPageChange:function(e){(0,L.WI)((0,E.oP)(r+1,e.target.value,"",J,ne,oe)),v(parseInt(null===e||void 0===e?void 0:e.target.value))}})]})}},29428:function(e,n,l){var t=l(64836);n.Z=void 0;var i=t(l(45045)),o=l(46417),d=(0,i.default)((0,o.jsx)("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}),"KeyboardArrowDown");n.Z=d},3665:function(e,n,l){var t=l(64836);n.Z=void 0;var i=t(l(45045)),o=l(46417),d=(0,i.default)((0,o.jsx)("path",{d:"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"}),"KeyboardArrowUp");n.Z=d}}]);