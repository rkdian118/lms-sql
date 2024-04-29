"use strict";(self.webpackChunklead_management_system_dashboard=self.webpackChunklead_management_system_dashboard||[]).push([[7342],{57342:function(t,l,n){n.r(l);var o=n(1413),e=n(74165),a=n(15861),r=n(29439),s=n(47313),i=n(9019),u=n(73428),d=n(42695),c=n(24631),v=n(12401),p=(n(33497),n(34229),n(19860)),m=(n(89562),n(78855),n(66135)),h=n(43003),Z=(n(15981),n(14732)),f=n(74031),x=n(70816),P=n.n(x),g=n(27754),D=n(64224),C=n(56052),A=(n(1759),n(48620),n(88730),n(28477)),b=n(15403),j=n(38049),y=n(51604),w=n(12544),M=(n(32433),n(46353)),Y=n(46417);l.default=(0,m.$j)(null,{ClusterGetAllBdeDropdownApi:g.n6,LeadFollowUpsGetApi:C.tJ,ClusterGetAllDashboardDataApi:g.RX,ClusterGetAllFollowUpsDataApi:g.OO,ClusterGetAllCallsDataApi:g.ei,ClusterGetAllRfpDataApi:g.w1,ClusterLeadDashboardGraphApi:g.GD})((function(t){var l,n,x,g,C,z,G,S,_,F,L,R,k,H,O,V,I,W,B,E,U=t.ClusterGetAllBdeDropdownApi,T=t.ClusterGetAllDashboardDataApi,$=t.ClusterGetAllFollowUpsDataApi,J=t.ClusterGetAllCallsDataApi,K=t.ClusterGetAllRfpDataApi,N=t.LeadFollowUpsGetApi,Q=t.ClusterLeadDashboardGraphApi,X=((0,p.Z)(),(0,m.v9)((function(t){return t.clusterLeadAction}))),q=X.getDashboardData,tt=X.getBdeDropdownList,lt=(0,s.useState)(!0),nt=(0,r.Z)(lt,2),ot=(nt[0],nt[1]),et=(0,s.useState)(!1),at=(0,r.Z)(et,2),rt=(at[0],at[1],(0,s.useState)(["",""])),st=(0,r.Z)(rt,2),it=st[0],ut=st[1],dt=(0,s.useState)([]),ct=(0,r.Z)(dt,2),vt=(ct[0],ct[1],(0,s.useState)("")),pt=(0,r.Z)(vt,2),mt=pt[0],ht=pt[1],Zt=(0,s.useState)(!1),ft=(0,r.Z)(Zt,2),xt=(ft[0],ft[1],(0,s.useState)(window.innerWidth>1280)),Pt=(0,r.Z)(xt,2);Pt[0],Pt[1];null==it?(B="",E=""):(B=it.length>0&&""!==it[0]?P()(it[0]).format("YYYY-MM-DD"):"",E=it.length>0&&""!==it[0]?P()(it[1]).format("YYYY-MM-DD"):""),(0,s.useEffect)((function(){N(),U()}),[]),(0,s.useEffect)((function(){T(B,E,mt),Q(B,E,mt),ot(!1)}),[B,E,mt]);var gt=function(t){var l,n=null===t||void 0===t||null===(l=t.leadData)||void 0===l?void 0:l.filter((function(t){return"lead_status"===t.status_type})),o=n.reduce((function(t,l){return t+l.count}),0);return n.push({status_type:"lead_status",status_name:"Assigned Leads",_id:"",count:o}),n.sort((function(t,l){return t.status_name.localeCompare(l.status_name)})),n},Dt=function(){var t=(0,a.Z)((0,e.Z)().mark((function t(l){var n,o;return(0,e.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(0,D.WI)((0,M.dz)()),(0,D.WI)((0,M.pZ)({start:l[0],end:l[1]})),n=l?P()(l[0]).format("YYYY-MM-DD"):"",o=l?P()(l[1]).format("YYYY-MM-DD"):"",t.next=6,T(n,o,mt);case 6:return t.next=8,Q(n,o,mt);case 8:return t.next=10,$(n,o,mt);case 10:return t.next=12,J(n,o,mt);case 12:return t.next=14,K(n,o,mt);case 14:ut(l);case 15:case"end":return t.stop()}}),t)})));return function(l){return t.apply(this,arguments)}}(),Ct=function(){var t=(0,a.Z)((0,e.Z)().mark((function t(l){var n,o;return(0,e.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(ut(l),!(l.length>0)){t.next=16;break}return(0,D.WI)((0,M.dz)()),(0,D.WI)((0,M.pZ)({start:l[0],end:l[1]})),n=l?P()(l[0]).format("YYYY-MM-DD"):"",o=l?P()(l[1]).format("YYYY-MM-DD"):"",t.next=8,T(n,o,mt);case 8:return t.next=10,Q(n,o,mt);case 10:return t.next=12,$(n,o,mt);case 12:return t.next=14,J(n,o,mt);case 14:return t.next=16,K(n,o,mt);case 16:case"end":return t.stop()}}),t)})));return function(l){return t.apply(this,arguments)}}();i.ZP,v.dv,i.ZP,w.Z,A.Z,(null===q||void 0===q||null===(l=q.totalCalls)||void 0===l?void 0:l.length)>0&&null!==q&&void 0!==q&&null!==(n=q.totalCalls[0])&&void 0!==n&&n.count&&(null===q||void 0===q||null===(x=q.totalCalls[0])||void 0===x||x.count),i.ZP,w.Z,(null===q||void 0===q||null===(g=q.totalRFPs)||void 0===g?void 0:g.length)>0&&null!==q&&void 0!==q&&null!==(C=q.totalRFPs[0])&&void 0!==C&&C.count&&(null===q||void 0===q||null===(z=q.totalRFPs[0])||void 0===z||z.count),j.Z,i.ZP,w.Z,(null===q||void 0===q||null===(G=q.totalProposals)||void 0===G?void 0:G.length)>0&&null!==q&&void 0!==q&&null!==(S=q.totalProposals[0])&&void 0!==S&&S.count&&(null===q||void 0===q||null===(_=q.totalProposals[0])||void 0===_||_.count),y.Z,i.ZP,w.Z,"$ ".concat(null!==q&&void 0!==q&&q.totalProposalAmount?null===q||void 0===q?void 0:q.totalProposalAmount:0),b.Z,h.Z,gt(q);return(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsxs)(i.ZP,{container:!0,spacing:2,children:[(0,Y.jsx)(i.ZP,{item:!0,xs:12,sm:12,md:4,lg:4,children:(0,Y.jsx)(u.Z,{sx:{position:"relative",color:"#fff",p:"5px",mb:2,boxShadow:"4"},children:(0,Y.jsx)(d.Z,{options:tt,getOptionLabel:function(t){return t?t.name:""},value:tt.find((function(t){return t._id===mt}))||null,onChange:function(t,l){var n=l?l._id:"";ht(n),T(B,E,n),Q(B,E,n)},renderInput:function(t){return(0,Y.jsx)(c.Z,(0,o.Z)((0,o.Z)({},t),{},{label:"Select BDE",inputProps:(0,o.Z)((0,o.Z)({},t.inputProps),{},{autoComplete:"off"}),size:"small",sx:{"& .MuiTextField-root":{borderRadius:"5px"}}}))}})})}),(0,Y.jsx)(i.ZP,{item:!0,xs:12,sm:12,md:4,lg:4,children:(0,Y.jsx)(u.Z,{sx:{position:"relative",color:"#fff",p:"5px",mb:2,boxShadow:"4"},children:(0,Y.jsx)(Z.Z,{showOneCalendar:!0,size:"md",placeholder:"Please Select Date-Range",className:"w-100 input d-inline",character:" -To- ",block:!0,value:it,cleanable:!0,onOk:Dt,onChange:Ct,format:"dd-MMM-yyyy",onKeyDown:function(t){return t.preventDefault()},ranges:f.rQ,style:{borderRadius:"10px !important"},placement:"bottomEnd"})})})]}),(0,Y.jsxs)(i.ZP,{container:!0,spacing:2,children:[(0,Y.jsx)(i.ZP,{item:!0,xs:12,sm:12,md:6,lg:3,children:(0,Y.jsx)(w.Z,{iconPrimary:A.Z,color:"primary.main",bgcolor:"primary.light",primary:"Calls Count",secondary:(null===q||void 0===q||null===(F=q.totalCalls)||void 0===F?void 0:F.length)>0&&null!==q&&void 0!==q&&null!==(L=q.totalCalls[0])&&void 0!==L&&L.count?null===q||void 0===q||null===(R=q.totalCalls[0])||void 0===R?void 0:R.count:0,content:""})}),(0,Y.jsx)(i.ZP,{item:!0,xs:12,sm:12,md:6,lg:3,children:(0,Y.jsx)(w.Z,{primary:"RFP Count",secondary:(null===q||void 0===q||null===(k=q.totalRFPs)||void 0===k?void 0:k.length)>0&&null!==q&&void 0!==q&&null!==(H=q.totalRFPs[0])&&void 0!==H&&H.count?null===q||void 0===q||null===(O=q.totalRFPs[0])||void 0===O?void 0:O.count:0,content:"",iconPrimary:j.Z,color:"success.dark",bgcolor:"success.light"})}),(0,Y.jsx)(i.ZP,{item:!0,xs:12,sm:12,md:6,lg:3,children:(0,Y.jsx)(w.Z,{primary:"Proposal Count",content:"",secondary:(null===q||void 0===q||null===(V=q.totalProposals)||void 0===V?void 0:V.length)>0&&null!==q&&void 0!==q&&null!==(I=q.totalProposals[0])&&void 0!==I&&I.count?null===q||void 0===q||null===(W=q.totalProposals[0])||void 0===W?void 0:W.count:0,iconPrimary:y.Z,color:"warning.dark",bgcolor:"warning.light"})}),(0,Y.jsx)(i.ZP,{item:!0,xs:12,sm:12,md:6,lg:3,children:(0,Y.jsx)(w.Z,{primary:"Proposal Amount",secondary:"$ ".concat(null!==q&&void 0!==q&&q.totalProposalAmount?null===q||void 0===q?void 0:q.totalProposalAmount:0),content:"",iconPrimary:b.Z,color:"error.dark",bgcolor:"error.light"})}),(0,Y.jsx)(i.ZP,{item:!0,xs:12,sm:12,md:12,lg:12,children:(0,Y.jsx)(h.Z,{bdeData:mt,startDate:B,endDate:E,leadStatusCount:gt(q)})})]})]})}))},15403:function(t,l,n){var o=n(64836);l.Z=void 0;var e=o(n(45045)),a=n(46417),r=(0,e.default)((0,a.jsx)("path",{d:"M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"}),"GroupOutlined");l.Z=r},28477:function(t,l,n){var o=n(64836);l.Z=void 0;var e=o(n(45045)),a=n(46417),r=(0,e.default)((0,a.jsx)("path",{d:"m18 11 5-5-5-5v3h-4v4h4v3zm2 4.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"}),"PhoneForwarded");l.Z=r},38049:function(t,l,n){var o=n(64836);l.Z=void 0;var e=o(n(45045)),a=n(46417),r=(0,e.default)([(0,a.jsx)("path",{d:"M19.5 3.5 18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2l-1.5 1.5zM15 20H6c-.55 0-1-.45-1-1v-1h10v2zm4-1c0 .55-.45 1-1 1s-1-.45-1-1v-3H8V5h11v14z"},"0"),(0,a.jsx)("path",{d:"M9 7h6v2H9zm7 0h2v2h-2zm-7 3h6v2H9zm7 0h2v2h-2z"},"1")],"ReceiptLongOutlined");l.Z=r},51604:function(t,l,n){var o=n(64836);l.Z=void 0;var e=o(n(45045)),a=n(46417),r=(0,e.default)((0,a.jsx)("path",{d:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-9.18-6.95L7.4 14.46 10.94 18l5.66-5.66-1.41-1.41-4.24 4.24-2.13-2.12z"}),"TaskOutlined");l.Z=r}}]);