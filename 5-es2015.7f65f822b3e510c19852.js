(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{snvy:function(t,n,e){"use strict";e.r(n),e.d(n,"AccountFeatureRegistrationModule",(function(){return h})),e.d(n,"RegistrationComponent",(function(){return l}));var o=e("An66"),r=e("kZht");let c=(()=>{class t{}return t.\u0275mod=r.Pb({type:t}),t.\u0275inj=r.Ob({factory:function(n){return new(n||t)},imports:[[o.c]]}),t})();var i=e("ROBh"),s=e("6uGs");let a=(()=>{class t{constructor(t){this.http=t}load(){return Object(i.a)([{id:1,name:"Lorem ipsum",description:"Lorem ipsum dolor sit amet"},{id:2,name:"At vero eos",description:"At vero eos et accusam et justo duo dolores"},{id:3,name:"Duis autem",description:"Duis autem vel eum iriure dolor in hendrerit"}])}}return t.\u0275fac=function(n){return new(n||t)(r.bc(s.b))},t.\u0275prov=r.Nb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var u=e("C05f");let d=(()=>{class t{constructor(t){this.accountDataService=t,this.accountListSubject=new u.a([]),this.accountList$=this.accountListSubject.asObservable()}load(){this.accountDataService.load().subscribe(t=>{this.accountListSubject.next(t)},t=>{console.error("err",t)})}}return t.\u0275fac=function(n){return new(n||t)(r.bc(a))},t.\u0275prov=r.Nb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();function b(t,n){if(1&t&&(r.Xb(0,"tr"),r.Xb(1,"td"),r.Ic(2),r.Wb(),r.Xb(3,"td"),r.Ic(4),r.Wb(),r.Xb(5,"td"),r.Ic(6),r.Wb(),r.Wb()),2&t){const t=n.$implicit;r.Fb(2),r.Jc(t.id),r.Fb(2),r.Jc(t.name),r.Fb(2),r.Jc(t.description)}}let l=(()=>{class t{constructor(t){this.registrationFacade=t,this.accountList$=this.registrationFacade.accountList$}ngOnInit(){this.load()}load(){this.registrationFacade.load()}}return t.\u0275fac=function(n){return new(n||t)(r.Rb(d))},t.\u0275cmp=r.Lb({type:t,selectors:[["account-registration"]],decls:5,vars:3,consts:[[1,"table"],[4,"ngFor","ngForOf"]],template:function(t,n){1&t&&(r.Xb(0,"h1"),r.Ic(1,"account-registration"),r.Wb(),r.Xb(2,"table",0),r.Gc(3,b,7,3,"tr",1),r.kc(4,"async"),r.Wb()),2&t&&(r.Fb(3),r.rc("ngForOf",r.lc(4,1,n.accountList$)))},directives:[o.k],pipes:[o.b],styles:[".table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border:1px solid;padding:10px}"]}),t})();var p=e("1VvW");const f=[{path:"",component:l}];let m=(()=>{class t{}return t.\u0275mod=r.Pb({type:t}),t.\u0275inj=r.Ob({factory:function(n){return new(n||t)},imports:[[p.f.forChild(f)],p.f]}),t})(),h=(()=>{class t{}return t.\u0275mod=r.Pb({type:t}),t.\u0275inj=r.Ob({factory:function(n){return new(n||t)},imports:[[o.c,c,m]]}),t})()}}]);