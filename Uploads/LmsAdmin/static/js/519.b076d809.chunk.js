(self.webpackChunklead_management_system_dashboard=self.webpackChunklead_management_system_dashboard||[]).push([[519],{61744:function(e,t,n){"use strict";n.d(t,{EP:function(){return r},TW:function(){return o},eG:function(){return l}});var o=function(e){return"Active"===e?"#00c853":"Dead"===e?"#f44336":"Hot Prospect"===e?"#ffab91":"Hold"===e?"#ffc107":"Lead Return"===e?"#7c4dff":"Awarded"===e?"#2196f3":"In Discussion"===e?"#c77e23":"Proposal Submitted"===e?"#1B4242":"Negotiation"===e?"#9BBEC8":"#b5dbff"},r=function(e){return"Meeting Scheduled"===e?"#2196f3":"Meeting Cancelled"===e?"#f44336":"Meeting Re-Scheduled"===e?"#7c4dff":"Meeting Done"===e?"#00c853":"#b5dbff"},l=function(e){return"Request For Proposal"===e?"#7c4dff":"RFP Pending"===e?"#f44336":"RFP Received"===e?"#ffc107":"Revised RFP"===e?"#2196f3":"RFP Approved"===e?"#00c853":"#b5dbff"}},22903:function(e,t,n){"use strict";n(89535),n(46417)},30519:function(e,t,n){"use strict";n.r(t);var o=n(1413),r=n(4942),l=n(29439),i=n(47313),a=n(19860),d=n(17592),s=n(24076),c=n(70941),u=n(47131),p=n(66212),f=n(65033),h=n(9506),v=n(51629),x=n(66835),y=n(57861),b=n(49914),m=n(48119),g=n(35898),j=n(42695),Z=n(24631),_=n(41727),C=n(23477),w=n(91034),D=n(33497),S=n(1759),P=(n(22903),n(29428)),k=n(3665),O=n(1834),W=n(64224),L=n(66135),I=n(70816),T=n.n(I),R=n(11692),E=n(56052),A=n(36541),z=n(61744),M=(n(27754),n(56406)),N=n(61113),q=n(46353),F=n(45352),B=n.n(F),H=n(33538),U=n(42042),V=n(5866),Y=n(46417);function K(e){var t,n,o,r,d,b,m,g,j,Z,_,C,w,D,O,L,I,R,E,A,M,q=e.row,F=e.key,K=(e.currentPage,e.pageLength,e.search,e.leadStatus,e.bdeData,e.clusterLeadData,(0,a.Z)()),$=i.useState(""),G=(0,l.Z)($,2),J=(G[0],G[1]),X=i.useState(!1),Q=(0,l.Z)(X,2),ee=Q[0],te=Q[1],ne=i.useState(!1),oe=(0,l.Z)(ne,2),re=(oe[0],oe[1],i.useState(!1)),le=(0,l.Z)(re,2),ie=(le[0],le[1]),ae=i.useState(!1),de=(0,l.Z)(ae,2),se=(de[0],de[1]),ce=i.useState(""),ue=(0,l.Z)(ce,2),pe=(ue[0],ue[1]),fe=i.useState(!1),he=(0,l.Z)(fe,2),ve=(he[0],he[1],function(e){var t;se(!0),ie(!1),J(e._id),pe(null===e||void 0===e||null===(t=e.leadStatusData)||void 0===t?void 0:t._id)});return(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsxs)(s.Z,{hover:!0,children:[(0,Y.jsx)(c.Z,{sx:{pl:3,py:0},children:(0,Y.jsx)(u.Z,{"aria-label":"expand row",size:"small",onClick:function(){return te(!ee)},children:ee?(0,Y.jsx)(k.Z,{}):(0,Y.jsx)(P.Z,{})})}),(0,Y.jsx)(c.Z,{component:"th",scope:"row",sx:{py:0},children:null===q||void 0===q?void 0:q.client_name}),(0,Y.jsx)(c.Z,{align:"left",sx:{py:0},children:null===q||void 0===q||null===(t=q.leadTypeData)||void 0===t?void 0:t.status_name}),(0,Y.jsx)(c.Z,{align:"left",sx:{py:0},children:"1"===q.clusterLeadData.status?(0,Y.jsx)(N.Z,{sx:{color:"#2196f3"},children:null===q||void 0===q||null===(n=q.clusterLeadData)||void 0===n?void 0:n.name}):(0,Y.jsx)(N.Z,{sx:{color:"#d84315"},children:null===q||void 0===q||null===(o=q.clusterLeadData)||void 0===o?void 0:o.name})}),(0,Y.jsx)(c.Z,{align:"left",sx:{py:0},children:"1"===q.bdData.status?(0,Y.jsx)(N.Z,{sx:{color:"#2196f3"},children:null===q||void 0===q||null===(r=q.bdData)||void 0===r?void 0:r.name}):(0,Y.jsx)(N.Z,{sx:{color:"#d84315"},children:null===q||void 0===q||null===(d=q.bdData)||void 0===d?void 0:d.name})}),(0,Y.jsx)(c.Z,{align:"left",sx:{py:0},children:null===q||void 0===q?void 0:q.client_country}),(0,Y.jsx)(c.Z,{align:"left",sx:{py:0},children:null!==q&&void 0!==q&&null!==(b=q.leadStatusData)&&void 0!==b&&b.status_name?(0,Y.jsx)(p.Z,{label:null===q||void 0===q||null===(m=q.leadStatusData)||void 0===m?void 0:m.status_name,variant:"outlined",onClick:function(){return ve(q)},sx:{cursor:"pointer",color:(0,z.TW)(null===q||void 0===q||null===(g=q.leadStatusData)||void 0===g?void 0:g.status_name),borderColor:(0,z.TW)(null===q||void 0===q||null===(j=q.leadStatusData)||void 0===j?void 0:j.status_name)}}):(0,Y.jsx)(p.Z,{label:"No Found",variant:"outlined",color:"secondary",sx:{cursor:"pointer",color:(0,z.TW)(null===q||void 0===q||null===(Z=q.leadStatusData)||void 0===Z?void 0:Z.status_name),borderColor:(0,z.TW)(null===q||void 0===q||null===(_=q.leadStatusData)||void 0===_?void 0:_.status_name)},onClick:function(){return ve(q)}})}),(0,Y.jsx)(c.Z,{align:"left",sx:{py:0},children:null!==q&&void 0!==q&&null!==(C=q.leadData)&&void 0!==C&&null!==(w=C.lead_bd_data)&&void 0!==w&&w.bdName?(0,Y.jsx)(N.Z,{sx:{color:"#2196f3"},children:null===q||void 0===q||null===(D=q.leadData)||void 0===D||null===(O=D.lead_bd_data)||void 0===O?void 0:O.bdName}):"-"}),(0,Y.jsx)(c.Z,{align:"left",sx:{pr:0},children:T()(null===q||void 0===q?void 0:q.createdAt).format("DD-MMM-YYYY")})]},F),(0,Y.jsx)(s.Z,{children:(0,Y.jsx)(c.Z,{style:{paddingBottom:0,paddingTop:0},colSpan:10,children:(0,Y.jsx)(f.Z,{in:ee,timeout:"auto",unmountOnExit:!0,children:ee&&(0,Y.jsx)(h.Z,{sx:{margin:1},children:(0,Y.jsx)(v.Z,{children:(0,Y.jsx)(S.Z,{sx:{bgcolor:"dark"===K.palette.mode?"dark.800":"grey.50",mb:2},title:"Duplicate Lead Information",content:!1,children:(0,Y.jsx)(x.Z,{size:"small","aria-label":"purchases",children:(0,Y.jsxs)(y.Z,{children:[(0,Y.jsxs)(s.Z,{children:[(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Requirement Type"}),(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Lead Source "}),(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Lead Type"}),(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Client LinkedIn"}),(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Company Name"})]}),(0,Y.jsxs)(s.Z,{children:[(0,Y.jsx)(c.Z,{children:null!==q&&void 0!==q&&null!==(L=q.reqTypeData)&&void 0!==L&&L.status_name?null===q||void 0===q||null===(I=q.reqTypeData)||void 0===I?void 0:I.status_name:"-"}),(0,Y.jsx)(c.Z,{children:null!==q&&void 0!==q&&null!==(R=q.leadSourceData)&&void 0!==R&&R.status_name?null===q||void 0===q||null===(E=q.leadSourceData)||void 0===E?void 0:E.status_name:"-"}),(0,Y.jsx)(c.Z,{children:null!==q&&void 0!==q&&null!==(A=q.leadTypeData)&&void 0!==A&&A.status_name?null===q||void 0===q||null===(M=q.leadTypeData)||void 0===M?void 0:M.status_name:"-"}),(0,Y.jsx)(c.Z,{children:null!==q&&void 0!==q&&q.client_linkedin?(0,Y.jsx)("a",{href:null===q||void 0===q?void 0:q.client_linkedin,target:"_blank",rel:"noreferrer",children:"Click Here"}):"-"}),(0,Y.jsx)(c.Z,{children:null!==q&&void 0!==q&&q.company_name?null===q||void 0===q?void 0:q.company_name:"-"})]}),(0,Y.jsxs)(s.Z,{children:[(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Client Name"}),(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Client Email"}),(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Client Number"}),(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Client WhatsApp"}),(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Country"})]}),(0,Y.jsxs)(s.Z,{children:[(0,Y.jsx)(c.Z,{children:null!==q&&void 0!==q&&q.client_name?null===q||void 0===q?void 0:q.client_name:"-"}),(0,Y.jsxs)(c.Z,{children:[null===q||void 0===q?void 0:q.client_email,(0,Y.jsx)(H.CopyToClipboard,{text:null===q||void 0===q?void 0:q.client_email,onCopy:function(){return(0,W.WI)((0,V.ss)({open:!0,message:"Email Copied",variant:"alert",alert:{color:"success"},transition:"Fade",anchorOrigin:{vertical:"top",horizontal:"right"}}))},children:(0,Y.jsx)(U.Z,{sx:{color:K.palette.primary.main,ml:1,mt:.5,fontSize:"1rem",cursor:"pointer"}})})]}),(0,Y.jsx)(c.Z,{children:null!==q&&void 0!==q&&q.client_number?null===q||void 0===q?void 0:q.client_number:"-"}),(0,Y.jsx)(c.Z,{children:null!==q&&void 0!==q&&q.client_whatsapp_num?null===q||void 0===q?void 0:q.client_whatsapp_num:"-"}),(0,Y.jsx)(c.Z,{children:null!==q&&void 0!==q&&q.client_country?null===q||void 0===q?void 0:q.client_country:"-"})]}),(0,Y.jsxs)(s.Z,{children:[(0,Y.jsx)(c.Z,{style:{fontWeight:"bold",width:"320px"},children:"Add Notes"}),(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Upwork URL"}),(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Bid URL"}),(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Proposal Amount"}),(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Client Budget"})]}),(0,Y.jsxs)(s.Z,{children:[(0,Y.jsx)(c.Z,{sx:{width:"320px"},children:""!==(null===q||void 0===q?void 0:q.add_notes)?(0,Y.jsx)(B(),{charLimit:20,readMoreText:"Read more \u25bc",readLessText:"Read less \u25b2",children:null===q||void 0===q?void 0:q.add_notes}):"-"}),(0,Y.jsx)(c.Z,{children:null!==q&&void 0!==q&&q.upwork_job_url?(0,Y.jsx)("a",{href:null===q||void 0===q?void 0:q.upwork_job_url,target:"_blank",rel:"noreferrer",children:"Click Here"}):"-"}),(0,Y.jsx)(c.Z,{children:null!==q&&void 0!==q&&q.bid_url?(0,Y.jsx)("a",{href:null===q||void 0===q?void 0:q.bid_url,target:"_blank",rel:"noreferrer",children:"Click Here"}):"-"}),(0,Y.jsx)(c.Z,{children:null!==q&&void 0!==q&&q.proposal_amount?null===q||void 0===q?void 0:q.proposal_amount:"-"}),(0,Y.jsx)(c.Z,{children:null!==q&&void 0!==q&&q.client_budget?null===q||void 0===q?void 0:q.client_budget:"-"})]}),(0,Y.jsxs)(s.Z,{children:[(0,Y.jsx)(c.Z,{style:{fontWeight:"bold"},children:"Skype Id"}),(0,Y.jsx)(c.Z,{colSpan:4,style:{fontWeight:"bold"},children:"Address"})]}),(0,Y.jsxs)(s.Z,{children:[(0,Y.jsx)(c.Z,{children:null!==q&&void 0!==q&&q.skype_id?null===q||void 0===q?void 0:q.skype_id:"-"}),(0,Y.jsx)(c.Z,{colSpan:4,children:null!==q&&void 0!==q&&q.address?null===q||void 0===q?void 0:q.address:"-"})]})]})})})})})})})})]})}var $=(0,d.ZP)(b.Z,{shouldForwardProp:A.x9})((function(e){var t,n=e.theme;return t={width:200,"& input":{background:"transparent !important",paddingLeft:"4px !important"}},(0,r.Z)(t,n.breakpoints.down("lg"),{width:250}),(0,r.Z)(t,n.breakpoints.down("md"),{width:"100%",background:"dark"===n.palette.mode?n.palette.dark[800]:"#fff"}),t})),G=(0,d.ZP)(m.Z,{shouldForwardProp:A.x9})((function(e){var t=e.theme;return(0,o.Z)((0,o.Z)((0,o.Z)({},t.typography.commonAvatar),t.typography.mediumAvatar),{},{background:"transparent",color:"#3e7dc3","&:hover":{color:"black"}})}));t.default=function(){var e,t,n=(0,i.useState)(0),r=(0,l.Z)(n,2),a=r[0],d=r[1],u=(0,i.useState)(10),p=(0,l.Z)(u,2),f=p[0],h=p[1],b=(0,i.useState)(!1),m=(0,l.Z)(b,2),S=(m[0],m[1],(0,i.useState)("")),P=(0,l.Z)(S,2),k=P[0],I=P[1],T=(0,L.v9)((function(e){return e.clusterAction})),A=T.getDuplicateLeadList,z=T.getDuplicateLeadLoading,N=T.getClDropdownList,F=T.getSelectedBDEDropdownList,B=(0,L.v9)((function(e){return e.masterAction})).leadStatusList,H=(0,L.v9)((function(e){return e.commonAction})).dashboardleadTypeId,U=(0,i.useState)(H),V=(0,l.Z)(U,2),J=V[0],X=V[1],Q=(0,i.useState)(""),ee=(0,l.Z)(Q,2),te=ee[0],ne=ee[1],oe=(0,i.useState)(""),re=(0,l.Z)(oe,2),le=re[0],ie=re[1];(0,i.useEffect)((function(){(0,W.WI)((0,M.q_)(a+1,f,k,J,te,le))}),[f]),(0,i.useEffect)((function(){(0,W.WI)((0,M.VT)()),(0,W.WI)((0,M.$_)([])),(0,W.WI)((0,E.qh)()),(0,W.WI)((0,E.Fp)()),(0,W.WI)((0,E.Eb)()),(0,W.WI)((0,E.sY)()),(0,W.WI)((0,E.On)()),(0,W.WI)((0,E.tJ)())}),[]);return(0,Y.jsxs)(D.Z,{content:!1,title:(0,Y.jsxs)(g.Z,{direction:"row",children:[(0,Y.jsx)(O.HH9,{sx:{mr:2}})," \xa0 Duplicate Leads"]}),sx:{border:"0px solid",padding:"5px"},secondary:(0,Y.jsxs)(g.Z,{direction:"row",spacing:2,alignItems:"center",children:[(0,Y.jsx)(j.Z,{options:N,getOptionLabel:function(e){return e?e.name:""},value:N.find((function(e){return e._id===le}))||null,onChange:function(e,t){var n=t?t._id:"",o=t?[t._id]:[];ie(n),ne(""),(0,W.WI)((0,M.$_)(o)),(0,W.WI)((0,M.q_)(a+1,f,k,J,"",n))},renderInput:function(e){return(0,Y.jsx)(Z.Z,(0,o.Z)((0,o.Z)({},e),{},{label:"Select Cluster Lead",inputProps:(0,o.Z)((0,o.Z)({},e.inputProps),{},{autoComplete:"off"}),style:{minWidth:"200px"},size:"small"}))}}),(0,Y.jsx)(j.Z,{options:F,getOptionLabel:function(e){return e?e.name:""},value:F.find((function(e){return e._id===te}))||null,onChange:function(e,t){var n=t?t._id:"";ne(n),(0,W.WI)((0,M.q_)(a+1,f,k,J,n,le))},renderInput:function(e){return(0,Y.jsx)(Z.Z,(0,o.Z)((0,o.Z)({},e),{},{label:"Select BDE",inputProps:(0,o.Z)((0,o.Z)({},e.inputProps),{},{autoComplete:"off"}),style:{minWidth:"200px"},size:"small"}))}}),(0,Y.jsx)(j.Z,{options:B,getOptionLabel:function(e){return e?e.status_name:""},value:B.find((function(e){return e._id===J}))||null,onChange:function(e,t){var n=t?t._id:"";X(n),(0,W.WI)((0,q.KW)({dashboardleadType:"",dashboardleadTypeId:""})),(0,W.WI)((0,M.q_)(a+1,f,"",n,te,le))},renderInput:function(e){return(0,Y.jsx)(Z.Z,(0,o.Z)((0,o.Z)({},e),{},{label:"Select Status",inputProps:(0,o.Z)((0,o.Z)({},e.inputProps),{},{autoComplete:"off"}),style:{minWidth:"200px"},size:"small"}))}}),(0,Y.jsx)($,{id:"input-search-header",value:k,placeholder:"Search",startAdornment:(0,Y.jsx)(_.Z,{position:"start",sx:{color:"#3e7dc3",background:"#e0f4ff"},children:(0,Y.jsx)(O.jVj,{stroke:2,size:"1.5rem",color:"#3e7dc3"})}),endAdornment:(0,Y.jsx)(_.Z,{position:"end",children:(0,Y.jsx)(G,{variant:"rounded",children:(0,Y.jsx)(O.kLi,{stroke:1.5,size:"1.5rem",onClick:function(){return I(""),void(0,W.WI)((0,M.q_)(a+1,f,"",J,te,le))}})})}),"aria-describedby":"search-helper-text",inputProps:{"aria-label":"weight"},onChange:function(e){return function(e){e.target.value.length>2&&(0,W.WI)((0,M.q_)(a+1,f,e.target.value,J,te,le)),0===e.target.value.length&&(0,W.WI)((0,M.q_)(a+1,f,"",J,te,le)),I(e.target.value)}(e)},size:"small"})]}),children:[(0,Y.jsx)(v.Z,{children:(0,Y.jsxs)(x.Z,{"aria-label":"collapsible table",children:[(0,Y.jsx)(C.Z,{children:(0,Y.jsxs)(s.Z,{children:[(0,Y.jsx)(c.Z,{sx:{pl:3,py:2}}),(0,Y.jsx)(c.Z,{sx:{py:2},children:"Client Name"}),(0,Y.jsx)(c.Z,{sx:{py:2},align:"left",children:"Lead Type"}),(0,Y.jsx)(c.Z,{sx:{py:2},align:"left",children:"CL Name"}),(0,Y.jsx)(c.Z,{sx:{py:2},align:"left",children:"BDE Name"}),(0,Y.jsx)(c.Z,{sx:{py:2},align:"left",children:"Country"}),(0,Y.jsx)(c.Z,{sx:{pr:3,py:2},align:"left",children:"Status"})," ",(0,Y.jsx)(c.Z,{sx:{pr:3,py:2},align:"left",children:"Assigned BDE"}),(0,Y.jsx)(c.Z,{sx:{pr:3,py:2},align:"left",children:"Assigned Date"})]})}),(0,Y.jsx)(y.Z,{children:!z&&(null===A||void 0===A||null===(e=A.docs)||void 0===e?void 0:e.length)>0?null===A||void 0===A||null===(t=A.docs)||void 0===t?void 0:t.map((function(e,t){return(0,Y.jsx)(K,{row:e,leadStatus:J,bdeData:te,clusterLeadData:le,currentPage:a,pageLength:f,search:k},t)})):(0,Y.jsx)(Y.Fragment,{children:!0===z?(0,Y.jsx)(R.V7,{rows:10}):(0,Y.jsx)(s.Z,{children:(0,Y.jsx)(c.Z,{sx:{pr:3},align:"center",colSpan:11,children:"No Leads Found"})})})})]})}),(0,Y.jsx)(w.Z,{rowsPerPageOptions:[10,25,50,100],component:"div",count:A.totalDocs,rowsPerPage:f,page:a,onPageChange:function(e,t){d(t),(0,W.WI)((0,M.q_)(t+1,f,"",J,te,le))},onRowsPerPageChange:function(e){(0,W.WI)((0,M.q_)(a+1,e.target.value,"",J,te,le)),h(parseInt(null===e||void 0===e?void 0:e.target.value))}})]})}},42042:function(e,t,n){"use strict";var o=n(64836);t.Z=void 0;var r=o(n(45045)),l=n(46417),i=(0,r.default)([(0,l.jsx)("path",{d:"M8 7h11v14H8z",opacity:".3"},"0"),(0,l.jsx)("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"},"1")],"ContentCopyTwoTone");t.Z=i},29428:function(e,t,n){"use strict";var o=n(64836);t.Z=void 0;var r=o(n(45045)),l=n(46417),i=(0,r.default)((0,l.jsx)("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}),"KeyboardArrowDown");t.Z=i},3665:function(e,t,n){"use strict";var o=n(64836);t.Z=void 0;var r=o(n(45045)),l=n(46417),i=(0,r.default)((0,l.jsx)("path",{d:"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"}),"KeyboardArrowUp");t.Z=i},92229:function(e,t,n){"use strict";var o=n(43071),r={"text/plain":"Text","text/html":"Url",default:"Text"};e.exports=function(e,t){var n,l,i,a,d,s,c=!1;t||(t={}),n=t.debug||!1;try{if(i=o(),a=document.createRange(),d=document.getSelection(),(s=document.createElement("span")).textContent=e,s.ariaHidden="true",s.style.all="unset",s.style.position="fixed",s.style.top=0,s.style.clip="rect(0, 0, 0, 0)",s.style.whiteSpace="pre",s.style.webkitUserSelect="text",s.style.MozUserSelect="text",s.style.msUserSelect="text",s.style.userSelect="text",s.addEventListener("copy",(function(o){if(o.stopPropagation(),t.format)if(o.preventDefault(),"undefined"===typeof o.clipboardData){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var l=r[t.format]||r.default;window.clipboardData.setData(l,e)}else o.clipboardData.clearData(),o.clipboardData.setData(t.format,e);t.onCopy&&(o.preventDefault(),t.onCopy(o.clipboardData))})),document.body.appendChild(s),a.selectNodeContents(s),d.addRange(a),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");c=!0}catch(u){n&&console.error("unable to copy using execCommand: ",u),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),c=!0}catch(u){n&&console.error("unable to copy using clipboardData: ",u),n&&console.error("falling back to prompt"),l=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:"Copy to clipboard: #{key}, Enter"),window.prompt(l,e)}}finally{d&&("function"==typeof d.removeRange?d.removeRange(a):d.removeAllRanges()),s&&document.body.removeChild(s),i()}return c}},68904:function(e,t,n){"use strict";function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.CopyToClipboard=void 0;var r=a(n(47313)),l=a(n(92229)),i=["text","onCopy","options","children"];function a(e){return e&&e.__esModule?e:{default:e}}function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function f(e,t){return f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},f(e,t)}function h(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=y(e);if(t){var r=y(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return v(this,n)}}function v(e,t){if(t&&("object"===o(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return x(e)}function x(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&f(e,t)}(d,e);var t,n,o,a=h(d);function d(){var e;u(this,d);for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];return b(x(e=a.call.apply(a,[this].concat(n))),"onClick",(function(t){var n=e.props,o=n.text,i=n.onCopy,a=n.children,d=n.options,s=r.default.Children.only(a),c=(0,l.default)(o,d);i&&i(o,c),s&&s.props&&"function"===typeof s.props.onClick&&s.props.onClick(t)})),e}return t=d,(n=[{key:"render",value:function(){var e=this.props,t=(e.text,e.onCopy,e.options,e.children),n=c(e,i),o=r.default.Children.only(t);return r.default.cloneElement(o,s(s({},n),{},{onClick:this.onClick}))}}])&&p(t.prototype,n),o&&p(t,o),Object.defineProperty(t,"prototype",{writable:!1}),d}(r.default.PureComponent);t.CopyToClipboard=m,b(m,"defaultProps",{onCopy:void 0,options:void 0})},33538:function(e,t,n){"use strict";var o=n(68904).CopyToClipboard;o.CopyToClipboard=o,e.exports=o},43071:function(e){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],o=0;o<e.rangeCount;o++)n.push(e.getRangeAt(o));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||n.forEach((function(t){e.addRange(t)})),t&&t.focus()}}}}]);