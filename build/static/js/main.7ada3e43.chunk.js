(this["webpackJsonpdnd-monster-machine"]=this["webpackJsonpdnd-monster-machine"]||[]).push([[0],{19:function(t,e,n){},21:function(t,e,n){"use strict";n.r(e);var a=n(3),r=n.n(a),c=n(13),i=n.n(c),u=(n(19),n(4)),o=n(1),s=n(2),l=n(10);function f(){var t=Object(a.useState)(null),e=Object(s.a)(t,2),n=e[0],r=e[1];return[n,Object(a.useCallback)((function(t){return r([t])}),[r])]}var b=n(0),d=function(){return null};function j(t,e){return function(n){return Object(b.jsx)(t,Object(o.a)(Object(o.a)({},n),{},{default:e}))}}function h(t,e,n){return function(r){var c=r.onChange,i=r.default,u=Object(a.useMemo)((function(){return n(i)}),[i]),o=Object(a.useCallback)((function(t){c(e(t))}),[e,c]);return Object(b.jsx)(t,{onChange:o,default:u})}}function O(t){return function(e){var n=e.onChange,r=e.default,c=Object(a.useState)(r),i=Object(s.a)(c,2),u=i[0],o=i[1],l=Object(a.useCallback)((function(t){o(t),n(t)}),[n]);return Object(b.jsx)(t,{value:u,onChange:l})}}O((function(t){var e=t.value,n=t.onChange;return Object(b.jsx)("input",{value:e,className:"input-reset ba b--black-20 pa2 mb2 db w-100",onChange:function(t){n(t.target.value)}})}));var p=O((function(t){var e=t.value,n=t.onChange;return Object(b.jsx)("textarea",{value:e,className:"input-reset ba b--black-20 pa2 mb2 db w-100",onChange:function(t){n(t.target.value)}})})),v=O((function(t){var e=t.value,n=t.onChange;return Object(b.jsx)("input",{type:"number",step:"1",value:e,className:"input-reset ba b--black-20 pa2 mb2 db w-100",onChange:function(t){n(parseInt(t.target.value,10))}})}));O((function(t){var e=t.value,n=t.onChange;return Object(b.jsx)("input",{checked:e,onChange:function(t){n(t.target.checked)}})}));function m(t){return O((function(e){var n=e.onChange,a=e.value;return Object(b.jsx)("select",{className:"input-reset ba b--black-20 pa2 mb2 db w-100",onChange:function(t){return n(t.target.value)},children:t.map((function(t,e){return Object(b.jsx)("option",{value:t,selected:t===a,children:t},e)}))})}))}function g(t){return function(e){var n=e.onChange,r=e.default;return Object(a.useEffect)((function(){n(r)}),[]),Object(b.jsx)(t,Object(o.a)({},e))}}function M(t){return function(e){var n=e.onChange;return Object(a.useEffect)((function(){n(t)}),[t]),Object(b.jsx)(b.Fragment,{})}}function y(t,e){return function(n){return Object(b.jsxs)("div",{className:"flex items-center mb2",children:[Object(b.jsxs)("label",{className:"lh-copy mr2 mb2",children:[t,": "]}),Object(b.jsx)(e,Object(o.a)({},n))]})}}function C(t,e){var n=Object(a.useState)(e),r=Object(s.a)(n,2),c=r[0],i=r[1],u=Object(a.useMemo)((function(){return n=j(t,e),r=function(t){return i((function(){return t}))},function(t){var e=t.onChange,c=Object(a.useCallback)((function(t){r(t),e(t)}),[r,e]);return Object(b.jsx)(n,{onChange:c})};var n,r}),[t,e]);return[u,c]}function x(t,e){return function(n){var r=n.onChange,c=f(),i=Object(s.a)(c,2),u=i[0],o=i[1],l=f(),d=Object(s.a)(l,2),j=d[0],h=d[1];return Object(a.useEffect)((function(){u&&j&&r(u[0](j[0]))}),[u,j]),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(t,{onChange:o},"f"),Object(b.jsx)(e,{onChange:h},"p")]})}}function k(t,e){return function(n){var r=n.onChange,c=f(),i=Object(s.a)(c,2),u=i[0],o=i[1],l=Object(a.useMemo)((function(){return u?e(u[0]):null}),[u]),d=Object(a.useCallback)((function(t){var e=t.onChange;return l?Object(b.jsx)(l,{onChange:e}):null}),[l]);return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(t,{onChange:o}),Object(b.jsx)(d,{onChange:r})]})}}function w(t,e,n){return x(x(t,e),n)}function N(t){for(var e=M([]),n=0;n<t.length;++n)e=k(e,(function(e){var n,r,c=t.filter((function(t){return!e.includes(t)}));return n=j(g(m(c)),c[0]||""),r=function(t){return[].concat(Object(u.a)(e),[t])},function(t){var e=t.onChange,c=Object(a.useCallback)((function(t){e(r(t))}),[r,e]);return Object(b.jsx)(n,{onChange:c})}}));return e}var A={acMod:0,stMod:0,hpMult:1,attack:0,dcMod:0,dmgMult:1,speed:0,perceptionProfMod:0,stealthProfMod:0,initProfMod:0},S={acMod:0,hpMult:1,stMod:0,initProfMod:0,attackMod:0,dcMod:0,dmgMult:1,xpMult:1},P={CombatLevel:0,CombatRank:S,CombatRole:A,Abilities:["Str","Dex","Con","Wis","Int","Cha"],flags:[],WinCondition:"",CounterMeasure:""},I={Source:"dndmm",_editing:P,Type:"beast",Challenge:"0",HP:{Value:3,Notes:""},AC:{Value:10,Notes:""},InitiativeModifier:0,InitiativeAdvantage:!1,Speed:["walk 30 ft."],Abilities:{Str:10,Dex:10,Con:10,Int:10,Wis:10,Cha:10},DamageVulnerabilities:[],DamageResistances:[],DamageImmunities:[],ConditionImmunities:[],Saves:[],Skills:[],Senses:[],Languages:[],Traits:[],Actions:[],BonusActions:[],Reactions:[],LegendaryActions:[],MythicActions:[],Version:"1.0",Player:"",ImageUrl:""},R={ac:0,hp:0,attack:0,dcs:[0,0],damage:1,prof:0,st:[0,0,0],ab:[0,0,0,0,0,0]},B=n(8),D=n(7),E=n(14),L=n(5),V=n(6),F=function(){function t(e){Object(L.a)(this,t),this.f=e}return Object(V.a)(t,[{key:"run",value:function(t){return this.f(0,t)[0]}},{key:"withErrorMessage",value:function(e){var n=this;return new t((function(t,a){try{return n.f(t,a)}catch(r){throw new Error(e)}}))}},{key:"alt",value:function(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];var r=this;return new t((function(t,e){var a,c=[r].concat(n),i=[],u=Object(E.a)(c);try{for(u.s();!(a=u.n()).done;){var o=a.value;try{return o.f(t,e)}catch(s){i.push(s.message)}}}catch(l){u.e(l)}finally{u.f()}throw new Error(i.join(" or "))}))}},{key:"andThen",value:function(e){var n=this;return new t((function(t,a){var r=n.f(t,a),c=Object(s.a)(r,2),i=c[0],u=c[1];return e(i).f(u,a)}))}},{key:"map",value:function(e){var n=this;return new t((function(t,a){var r=n.f(t,a),c=Object(s.a)(r,2),i=c[0],u=c[1];return[e(i),u]}))}},{key:"asLookahead",value:function(){var e=this;return new t((function(t,n){var a=e.f(t,n);return[Object(s.a)(a,1)[0],t]}))}},{key:"proceededBy",value:function(e){var n=this;return new t((function(t,a){var r=e.f(t,a),c=Object(s.a)(r,2),i=(c[0],c[1]),u=n.f(i,a),o=Object(s.a)(u,2);return[o[0],o[1]]}))}},{key:"terminatedBy",value:function(e){var n=this;return new t((function(t,a){var r=n.f(t,a),c=Object(s.a)(r,2),i=c[0],u=c[1];return[i,e.f(u,a)[1]]}))}},{key:"someUntil",value:function(e){var n=this;return new t((function(t,a){for(var r=[];;){try{e.f(t,a);break}catch(o){}var c=n.f(t,a),i=Object(s.a)(c,2),u=i[0];t=i[1],r.push(u)}return[r,t]}))}}],[{key:"nextMatching",value:function(e){return new t((function(t,n){var a=n.slice(t).match(e);if(null==a||0!=a.index||!a[0])throw new Error("Expected matching "+e.source+" but did not find any near "+n.slice(t));return[a[0],t+a[0].length]}))}},{key:"just",value:function(e){return new t((function(t){return[e,t]}))}},{key:"failWith",value:function(e){return new t((function(){throw new Error(e)}))}},{key:"matchLiteral",value:function(e){return new t((function(t,n){if(n.slice(t,t+e.length)===e)return[e,t+e.length];throw new Error("Expected "+JSON.stringify(e)+" near "+JSON.stringify(n.slice(t,t+10)))}))}},{key:"liftFunction",value:function(t){return new T((function(e,n){return[t,e]}))}},{key:"liftFunction2",value:function(t){return new K((function(e,n){return[t,e]}))}},{key:"liftFunction3",value:function(t){return new W((function(e,n){return[t,e]}))}},{key:"liftFunction4",value:function(t){return new H((function(e,n){return[t,e]}))}},{key:"liftFunction5",value:function(t){return new J((function(e,n){return[t,e]}))}},{key:"liftFunction6",value:function(t){return new G((function(e,n){return[t,e]}))}}]),t}(),T=function(t){Object(B.a)(n,t);var e=Object(D.a)(n);function n(){return Object(L.a)(this,n),e.apply(this,arguments)}return Object(V.a)(n,[{key:"apply",value:function(t){var e=this;return new F((function(n,a){var r=e.f(n,a),c=Object(s.a)(r,2),i=c[0],u=c[1],o=t.f(u,a),l=Object(s.a)(o,2),f=l[0],b=l[1];return[i(f),b]}))}}]),n}(F),K=function(t){Object(B.a)(n,t);var e=Object(D.a)(n);function n(){return Object(L.a)(this,n),e.apply(this,arguments)}return Object(V.a)(n,[{key:"apply",value:function(t){var e=this;return new T((function(n,a){var r=e.f(n,a),c=Object(s.a)(r,2),i=c[0],u=c[1],o=t.f(u,a),l=Object(s.a)(o,2),f=l[0],b=l[1];return[i(f),b]}))}}]),n}(F),W=function(t){Object(B.a)(n,t);var e=Object(D.a)(n);function n(){return Object(L.a)(this,n),e.apply(this,arguments)}return Object(V.a)(n,[{key:"apply",value:function(t){var e=this;return new K((function(n,a){var r=e.f(n,a),c=Object(s.a)(r,2),i=c[0],u=c[1],o=t.f(u,a),l=Object(s.a)(o,2),f=l[0],b=l[1];return[i(f),b]}))}}]),n}(F),H=function(t){Object(B.a)(n,t);var e=Object(D.a)(n);function n(){return Object(L.a)(this,n),e.apply(this,arguments)}return Object(V.a)(n,[{key:"apply",value:function(t){var e=this;return new W((function(n,a){var r=e.f(n,a),c=Object(s.a)(r,2),i=c[0],u=c[1],o=t.f(u,a),l=Object(s.a)(o,2),f=l[0],b=l[1];return[i(f),b]}))}}]),n}(F),J=function(t){Object(B.a)(n,t);var e=Object(D.a)(n);function n(){return Object(L.a)(this,n),e.apply(this,arguments)}return Object(V.a)(n,[{key:"apply",value:function(t){var e=this;return new H((function(n,a){var r=e.f(n,a),c=Object(s.a)(r,2),i=c[0],u=c[1],o=t.f(u,a),l=Object(s.a)(o,2),f=l[0],b=l[1];return[i(f),b]}))}}]),n}(F),G=function(t){Object(B.a)(n,t);var e=Object(D.a)(n);function n(){return Object(L.a)(this,n),e.apply(this,arguments)}return Object(V.a)(n,[{key:"apply",value:function(t){var e=this;return new J((function(n,a){var r=e.f(n,a),c=Object(s.a)(r,2),i=c[0],u=c[1],o=t.f(u,a),l=Object(s.a)(o,2),f=l[0],b=l[1];return[i(f),b]}))}}]),n}(F),U=function(t){Object(B.a)(n,t);var e=Object(D.a)(n);function n(){return Object(L.a)(this,n),e.apply(this,arguments)}return Object(V.a)(n,[{key:"withKey",value:function(t,e){return new n(this.andThen((function(n){return e.map((function(e){return Object(o.a)(Object(o.a)({},n),{},Object(l.a)({},t,e))}))})).f)}}]),n}(F),_=function(t){Object(B.a)(n,t);var e=Object(D.a)(n);function n(){return Object(L.a)(this,n),e.apply(this,arguments)}return Object(V.a)(n,[{key:"plus",value:function(t){return new n(this.andThen((function(e){return t.map((function(t){return[].concat(Object(u.a)(e),[t])}))})).f)}}]),n}(F),z=(F.nextMatching(/\s*/),F.nextMatching(/\s+/)),$=(F.nextMatching(/$/),F.nextMatching(/[+-]?([0-9]*[.])?[0-9]+([eE][-+]?[0-9]+)?/).map((function(t){return parseFloat(t)}))),q=new U((function(t){return[{},t]})),Q=new _((function(t){return[[],t]})),X={Minion:Object(o.a)(Object(o.a)({},S),{},{acMod:-2,hpMult:.2,stMod:-2,dmgMult:.75,xpMult:.25}),Grunt:Object(o.a)({},S),Elite:Object(o.a)(Object(o.a)({},S),{},{acMod:2,hpMult:2,stMod:2,dmgMult:1.1,attackMod:2,dcMod:2,initProfMod:1,xpMult:2}),Paragon:Object(o.a)(Object(o.a)({},S),{},{acMod:2,hpMult:4,stMod:2,dmgMult:1.2,attackMod:2,dcMod:2,initProfMod:1,xpMult:4})},Y={Controller:Object(o.a)(Object(o.a)({},A),{},{acMod:2,stMod:1,dmgMult:.75,initProfMod:1}),Defender:Object(o.a)(Object(o.a)({},A),{},{acMod:4,stMod:2,hpMult:.75,speed:-5}),Lurker:Object(o.a)(Object(o.a)({},A),{},{acMod:-4,stMod:-2,hpMult:.75,attack:3,dcMod:3,dmgMult:1.5,speed:5,stealthProfMod:1}),Scout:Object(o.a)(Object(o.a)({},A),{},{attack:-1,dcMod:-1,dmgMult:.75,speed:10,stealthProfMod:1,perceptionProfMod:1}),Striker:Object(o.a)(Object(o.a)({},A),{},{acMod:-2,stMod:-1,hpMult:1.25,attack:2,dcMod:2,dmgMult:1.25}),Supporter:Object(o.a)(Object(o.a)({},A),{},{hpMult:1.5,attack:-2,dcMod:-2,initProfMod:1})},Z={celestial:[],hardened:[],intangible:["grappled","restrained"],animated:["blinded","paralyzed","exhaustion","unconscious"],undead:["frightened","exhaustion","stunned","charmed","unconscious"],fey:["charmed"],wriggler:["prone"],swarm:["prone","exhaustion"],toxic:["poisoned","petrified"]},tt={celestial:[],fey:[],hardened:[],intangible:[],toxic:[],wriggler:[],undead:["radiant"],swarm:["thunder"],animated:["thunder"]},et={animated:[],intangible:[],swarm:[],wriggler:[],hardened:["blunt","piercing","slashing"],undead:["cold","necrotic"],fey:["psychic"],celestial:["radiant"],toxic:["poison"]},nt={celestial:[],fey:[],hardened:[],intangible:[],swarm:[],toxic:[],wriggler:[],undead:["poison"],animated:["psychic","poison"]};var at=$.terminatedBy(F.nextMatching(/, |-/)),rt=q.withKey("ac",$.terminatedBy(z)).withKey("hp",$.terminatedBy(z)).withKey("attack",$.terminatedBy(z)).withKey("dcs",Q.plus(at).plus($).terminatedBy(z)).withKey("damage",$.terminatedBy(z)).withKey("prof",$.terminatedBy(z)).withKey("st",Q.plus(at).plus(at).plus($).terminatedBy(z)).withKey("ab",Q.plus(at).plus(at).plus(at).plus(at).plus(at).plus($).terminatedBy(z)).proceededBy($.terminatedBy(z)),ct="0 14 16 +2 7-10 1 +1 4, 2, 0 3, 2, 1, 1, 0, -1 1/8 25\n1 14 26 +3 8-11 2 +2 5, 3, 0 3, 2, 1, 1, 0, -1 1/4 50\n2 14 29 +3 8-11 4 +2 5, 3, 0 3, 2, 1, 1, 0, -1 1/2 112\n3 14 33 +3 8-11 5 +2 5, 3, 0 3, 2, 1, 1, 0, -1 1/2 175\n4 15 36 +4 9-12 8 +2 6, 3, 1 4, 3, 2, 1, 1, 0 1 275\n5 16 60 +5 10-13 9 +3 7, 4, 1 4, 3, 2, 1, 1, 0 2 450\n6 16 64 +5 10-13 11 +3 7, 4, 1 4, 3, 2, 1, 1, 0 2 575\n7 16 68 +5 10-13 13 +3 7, 4, 1 4, 3, 2, 1, 1, 0 3 725\n8 17 71 +6 11-14 17 +3 8, 5, 1 5, 3, 2, 2, 1, 0 3 975\n9 18 102 +7 12-15 19 +4 9, 5, 2 5, 3, 2, 2, 1, 0 4 1,250\n10 18 106 +7 12-15 21 +4 9, 5, 2 5, 3, 2, 2, 1, 0 4 1,475\n11 18 111 +7 12-15 23 +4 9, 5, 2 5, 3, 2, 2, 1, 0 5 1,800\n12 18 115 +8 12-15 28 +4 10, 6, 2 6, 4, 3, 2, 1, 0 5 2,100\n13 19 152 +9 13-16 30 +5 11, 7, 2 6, 4, 3, 2, 1, 0 6 2,500\n14 19 157 +9 13-16 32 +5 11, 7, 2 6, 4, 3, 2, 1, 0 6 2,875\n15 19 162 +9 13-16 34 +5 11, 7, 2 6, 4, 3, 2, 1, 0 7 3,250\n16 20 166 +10 14-17 41 +5 12, 7, 3 7, 5, 3, 2, 2, 1 7 3,750\n17 21 210 +11 15-18 43 +6 13, 8, 3 7, 5, 3, 2, 2, 1 8 4,500\n18 21 215 +11 15-18 46 +6 13, 8, 3 7, 5, 3, 2, 2, 1 9 5,000\n19 21 221 +11 15-18 48 +6 13, 8, 3 7, 5, 3, 2, 2, 1 9 5,500\n20 22 226 +12 16-19 51 +6 14, 9, 3 8, 6, 4, 3, 2, 1 10 6,250\n21 22 276 +13 17-20 53 +7 15, 9, 4 8, 6, 4, 3, 2, 1 11 8,250\n22 22 282 +13 17-20 56 +7 15, 9, 4 8, 6, 4, 3, 2, 1 13 10,250\n23 22 288 +13 17-20 58 +7 15, 9, 4 8, 6, 4, 3, 2, 1 14 12,500\n24 23 293 +14 17-20 61 +7 16, 10, 4 9, 6, 4, 3, 2, 1 16 15,500".split("\n").map((function(t){return rt.run(t)}));function it(t,e,n){var a=function(t){return ct[t]||R}(t),r=a.hp,c=a.ac,i=a.ab,u=a.attack,o=a.damage,l=Object(s.a)(a.dcs,2),f=l[0],b=l[1],d=Object(s.a)(a.st,3),j=d[0],h=d[1],O=d[2],p=a.prof;return r=Math.floor(.75*r),o=Math.floor(1.33*o),{hp:Math.floor(r*e.hpMult*n.hpMult),ac:c+e.acMod+n.acMod,ab:i,attack:u+e.attackMod+n.attack,damage:Math.floor(o*e.dmgMult*n.dmgMult),dcs:[b+e.dcMod+n.dcMod,f+e.dcMod+n.dcMod],st:[j+e.stMod+n.stealthProfMod,h+e.stMod+n.stMod,O+e.stMod+n.stMod],prof:p}}function ut(t){return Math.floor((t-10)/2)}function ot(t){var e=t.CombatLevel,n=t.CombatRank,a=t.CombatRole,r=t.flags,c=it(e,n,a),i=c.hp,s=c.prof,l=c.ac,f=c.ab,b=c.st,d=c.attack,j=c.dcs,h=c.damage,O=Object(o.a)({},I.Abilities),p=Object(u.a)(I.Saves);t.Abilities.forEach((function(t,e){if(t in O){var n=f[e];if(null!=n)O[t]=10+2*n,e<1?p.push({Name:t,Modifier:b[0]}):e<3?p.push({Name:t,Modifier:b[1]}):p.push({Name:t,Modifier:b[2]})}}));var v=r.map((function(t){return nt[t]||[]})).flat(),m=r.map((function(t){return et[t]||[]})).flat(),g=r.map((function(t){return tt[t]||[]})).flat(),M=r.map((function(t){return Z[t]||[]})).flat(),y=Object(u.a)(I.Actions),C=Object(u.a)(I.BonusActions),x=Object(u.a)(I.Reactions),k=Object(u.a)(I.LegendaryActions),w=Object(u.a)(I.Traits);return w.push({Name:"+",Content:t.WinCondition}),w.push({Name:"-",Content:t.CounterMeasure}),y.push({Name:"Attack",Content:"Attack: ".concat(d,", DC ").concat(j[0],", Damage: ").concat([4,6,8,12].map((function(t){return function(t){var e=t.sides,n=t.dice,a=t.mod,r=e/2+.5;if(e<1||n<1)return(r*e).toString();if(a>0)return"".concat(n,"d").concat(e,"+").concat(a);if(a<0)return"".concat(n,"d").concat(e).concat(a);return"".concat(n,"d").concat(e)}(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6,n=e/2+.5,a=Math.floor(t/n);a||(a+=1,t-=n);var r=Math.floor(t%n);return{dice:a,mod:r,sides:e}}(h,t))})).join(" / "))}),y.push({Name:"Power (3/Day)",Content:""}),r.includes("legendary")&&(w.push({Name:"Legendary Resistance (3/Day)",Content:"May succeed a failed saving throw."}),k.push({Name:"Move",Content:"Make another movement (2 Actions)"})),C.push({Name:"Secondary Effect",Content:"DC ".concat(j[1])}),x.push({Name:"Reaction",Content:"Prof: ".concat(s)}),Object(o.a)(Object(o.a)({},I),{},{HP:{Value:i,Notes:""},InitiativeModifier:s*(n.initProfMod+a.initProfMod)+ut(O.Dex),Saves:p,AC:{Value:l,Notes:""},Senses:["passive Perception ".concat(10+ut(O.Wis)+s*a.perceptionProfMod)],Skills:[{Name:"Stealth",Modifier:ut(O.Dex)+s*a.stealthProfMod}],Speed:["move +".concat(a.speed," ft")],Abilities:O,DamageImmunities:v,DamageResistances:m,DamageVulnerabilities:g,ConditionImmunities:M,Traits:w,Actions:y,BonusActions:C,Reactions:x,LegendaryActions:k,_editing:t,Challenge:t.CombatLevel+""})}var st=function(){var t=C(Object(a.useMemo)((function(){return function(t,e){var n=M(t),a=function(a){n=w(M((function(t){return function(e){return Object(o.a)(Object(o.a)({},t),{},Object(l.a)({},a,e))}})),n,j(g(e[a]),t[a]))};for(var r in e)a(r);return n}(P,Object(o.a)(Object(o.a)({},function(t){var e={};for(var n in t)e[n]=M(t);return e}(P)),{},{CombatLevel:y("Level",v),CombatRank:y("Rank",h(m(Object.keys(X)),(function(t){return X[t]}),(function(t){return Object.keys(X).find((function(e){return X[e]===t}))||"Grunt"}))),CombatRole:y("Role",h(m(Object.keys(Y)),(function(t){return Y[t]}),(function(t){return Object.keys(Y).find((function(e){return Y[e]===t}))||"Controller"}))),Abilities:y("Abilities",N(P.Abilities)),WinCondition:y("Win Condition",p),CounterMeasure:y("Counter Measure",p),flags:y("Flags",(t=[].concat(Object(u.a)(Object.keys(Object(o.a)(Object(o.a)(Object(o.a)(Object(o.a)({},nt),tt),Z),et))),["legendary"]),function(e){var n=e.onChange,r=e.default,c=Object(a.useState)(r),i=Object(s.a)(c,2),u=i[0],o=i[1],l=Object(a.useCallback)((function(t){o(t),n(t)}),[n]),f=Object(a.useCallback)((function(t){for(var e=t.target.options,n=[],a=0;a<e.length;++a)e[a].selected&&n.push(e[a].value);l(n)}),[l,u]);return Object(b.jsx)("select",{className:"input-reset ba b--black-20 pa2 mb2 db w-100",multiple:!0,onChange:f,children:t.map((function(t,e){return Object(b.jsx)("option",{value:t,selected:u.includes(t),children:t},e)}))})}))}));var t}),[P]),P),e=Object(s.a)(t,2),n=e[0],r=e[1],c=Object(a.useMemo)((function(){return ot(r)}),[r]),i=Object(a.useMemo)((function(){return{HP:c.HP.Value+" "+c.HP.Notes,AC:c.AC.Value+" "+c.AC.Notes,Init:c.InitiativeModifier,Per:c.Senses.join(", "),Skls:c.Skills.map((function(t){var e=t.Name,n=t.Modifier;return"".concat(e,": ").concat(n)})).join(", "),ST:c.Saves.map((function(t){var e=t.Name,n=t.Modifier;return"".concat(e,": ").concat(n)})).join(", "),Imm:Object(u.a)(new Set([].concat(Object(u.a)(c.DamageImmunities),Object(u.a)(c.ConditionImmunities))).values()).join(", "),Res:Object(u.a)(new Set(c.DamageResistances).values()).join(", "),Vuln:Object(u.a)(new Set(c.DamageVulnerabilities).values()).join(", ")}}),[c]);return Object(b.jsxs)("div",{className:"mw7 center pa4",children:[Object(b.jsx)(n,{onChange:d}),Object(b.jsx)("div",{children:Object(b.jsx)("textarea",{value:JSON.stringify(c,null,2),className:"input-reset w-100",rows:4})}),Object(b.jsxs)("div",{children:["HP ",i.HP," AC: ",i.AC," Init: ",i.Init," ",i.Per]}),Object(b.jsxs)("div",{children:[i.Skls," Imm: ",i.Imm," Res: ",i.Res," Vuln: ",i.Vuln]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("h3",{children:"Traits"}),Object(b.jsx)("ul",{children:c.Traits.map((function(t){var e=t.Name,n=t.Content;return Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:e})," ",n]})}))})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("h3",{children:"Actions"}),Object(b.jsx)("ul",{children:c.Actions.map((function(t){var e=t.Name,n=t.Content;return Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:e})," ",n]})}))})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("h3",{children:"Bonus Actions"}),Object(b.jsx)("ul",{children:c.BonusActions.map((function(t){var e=t.Name,n=t.Content;return Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:e})," ",n]})}))})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("h3",{children:"Reactions"}),Object(b.jsx)("ul",{children:c.Reactions.map((function(t){var e=t.Name,n=t.Content;return Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:e})," ",n]})}))})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("h3",{children:"Legendary Actions"}),Object(b.jsx)("ul",{children:c.LegendaryActions.map((function(t){var e=t.Name,n=t.Content;return Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:e})," ",n]})}))})]})]})};i.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(st,{})}),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.7ada3e43.chunk.js.map