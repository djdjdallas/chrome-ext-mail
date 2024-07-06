(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[345],{3891:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});var n=r(1373);/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,n.Z)("Webcam",[["circle",{cx:"12",cy:"10",r:"8",key:"1gshiw"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 22h10",key:"10w4w3"}],["path",{d:"M12 22v-4",key:"1utk9m"}]])},8296:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/customize/[id]",function(){return r(8142)}])},6370:function(e,t,r){"use strict";r.d(t,{z:function(){return u}});var n=r(1844),i=r(5784),l=r(1465),o=r(5139),s=r(3954);let a=(0,o.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),u=i.forwardRef((e,t)=>{let{className:r,variant:i,size:o,asChild:u=!1,...c}=e,d=u?l.g7:"button";return(0,n.jsx)(d,{className:(0,s.cn)(a({variant:i,size:o,className:r})),ref:t,...c})});u.displayName="Button"},6649:function(e,t,r){"use strict";r.d(t,{I:function(){return o}});var n=r(1844),i=r(5784),l=r(3954);let o=i.forwardRef((e,t)=>{let{className:r,type:i,...o}=e;return(0,n.jsx)("input",{type:i,className:(0,l.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",r),ref:t,...o})});o.displayName="Input"},1047:function(e,t,r){"use strict";r.d(t,{_:function(){return d}});var n=r(1844),i=r(5784);r(8369);var l=r(1465),o=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let r=i.forwardRef((e,r)=>{let{asChild:i,...o}=e,s=i?l.g7:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,n.jsx)(s,{...o,ref:r})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{}),s=i.forwardRef((e,t)=>(0,n.jsx)(o.label,{...e,ref:t,onMouseDown:t=>{let r=t.target;r.closest("button, input, select, textarea")||(e.onMouseDown?.(t),!t.defaultPrevented&&t.detail>1&&t.preventDefault())}}));s.displayName="Label";var a=r(5139),u=r(3954);let c=(0,a.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),d=i.forwardRef((e,t)=>{let{className:r,...i}=e;return(0,n.jsx)(s,{ref:t,className:(0,u.cn)(c(),r),...i})});d.displayName=s.displayName},1457:function(e,t,r){"use strict";r.d(t,{g:function(){return o}});var n=r(1844),i=r(5784),l=r(3954);let o=i.forwardRef((e,t)=>{let{className:r,...i}=e;return(0,n.jsx)("textarea",{className:(0,l.cn)("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",r),ref:t,...i})});o.displayName="Textarea"},3954:function(e,t,r){"use strict";r.d(t,{cn:function(){return l}});var n=r(512),i=r(8388);function l(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,i.m6)((0,n.W)(t))}},8142:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return p}});var n=r(1844),i=r(5784),l=r(1163),o=r(7542),s=r(6370),a=r(1047),u=r(6649),c=r(1457),d=r(1664),f=r.n(d),m=r(3891);function p(){let e=(0,l.useRouter)(),{id:t}=e.query,r=(0,o.createClientComponentClient)(),[d,p]=(0,i.useState)(null),[g,h]=(0,i.useState)(""),[v,b]=(0,i.useState)("");(0,i.useEffect)(()=>{if(t){let e=async()=>{let{data:e,error:n}=await r.from("email_templates").select("title, subject, body").eq("id",t).single();n?console.error("Error fetching email template:",n):(p(e),h(e.body.replace(/\\n/g,"\n")))};e()}},[t,r]);let y=e=>{h(e.target.value)},x=e=>{b(e.target.value)},j=async()=>{try{let e=await fetch("/api/customize-with-chatgpt",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({emailBody:g})}),t=await e.json();e.ok?b(t.customizedEmail):console.error(t.error)}catch(e){console.error("Error customizing with ChatGPT:",e)}},w=async()=>{console.log("Customized Content:",g),console.log("ChatGPT Response:",v)};return d?(0,n.jsxs)("div",{className:"w-full max-w-4xl mt-10 mx-auto px-4 md:px-6 py-12 md:py-20",children:[(0,n.jsxs)("div",{className:"space-y-4 text-center",children:[(0,n.jsx)("h1",{className:"text-3xl md:text-4xl font-bold tracking-tighter",children:"Customize Your Email Template"}),(0,n.jsx)("p",{className:"text-muted-foreground md:text-xl",children:"Create a personalized email to engage your mobile app users."})]}),(0,n.jsx)("div",{className:"mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8",children:(0,n.jsxs)("div",{className:"space-y-6",children:[(0,n.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:(0,n.jsxs)("div",{children:[(0,n.jsx)(a._,{htmlFor:"subject",children:"Subject"}),(0,n.jsx)(u.I,{id:"subject",placeholder:"Enter email subject",className:"w-full",value:d.subject,onChange:e=>p({...d,subject:e.target.value})})]})}),(0,n.jsxs)("div",{children:[(0,n.jsx)(a._,{htmlFor:"body",children:"Email Body"}),(0,n.jsx)(c.g,{id:"body",placeholder:"Enter email body",rows:10,value:g,onChange:y})]}),(0,n.jsxs)(s.z,{type:"button",className:"w-full flex items-center justify-center gap-2",onClick:j,children:[(0,n.jsx)(m.Z,{className:"w-5 h-5"}),"Customize with ChatGPT"]}),(0,n.jsxs)("div",{children:[(0,n.jsx)(a._,{htmlFor:"chatgpt-response",children:"ChatGPT Response"}),(0,n.jsx)(c.g,{id:"chatgpt-response",placeholder:"Enter ChatGPT response",rows:10,value:v,onChange:x})]}),(0,n.jsx)(s.z,{type:"button",className:"w-full",onClick:w,children:"Save Email"}),(0,n.jsx)(f(),{href:"/template",children:(0,n.jsx)(s.z,{variant:"outline",className:"w-full",children:"Back"})})]})})]}):(0,n.jsx)("div",{children:"Loading..."})}},1465:function(e,t,r){"use strict";r.d(t,{g7:function(){return l}});var n=r(5784),i=r(1844),l=n.forwardRef((e,t)=>{let{children:r,...l}=e,s=n.Children.toArray(r),u=s.find(a);if(u){let e=u.props.children,r=s.map(t=>t!==u?t:n.Children.count(e)>1?n.Children.only(null):n.isValidElement(e)?e.props.children:null);return(0,i.jsx)(o,{...l,ref:t,children:n.isValidElement(e)?n.cloneElement(e,void 0,r):null})}return(0,i.jsx)(o,{...l,ref:t,children:r})});l.displayName="Slot";var o=n.forwardRef((e,t)=>{let{children:r,...i}=e;if(n.isValidElement(r)){let e,l;let o=(e=Object.getOwnPropertyDescriptor(r.props,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?r.ref:(e=Object.getOwnPropertyDescriptor(r,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?r.props.ref:r.props.ref||r.ref;return n.cloneElement(r,{...function(e,t){let r={...t};for(let n in t){let i=e[n],l=t[n],o=/^on[A-Z]/.test(n);o?i&&l?r[n]=(...e)=>{l(...e),i(...e)}:i&&(r[n]=i):"style"===n?r[n]={...i,...l}:"className"===n&&(r[n]=[i,l].filter(Boolean).join(" "))}return{...e,...r}}(i,r.props),ref:t?function(...e){return t=>e.forEach(e=>{var r;"function"==typeof(r=e)?r(t):null!=r&&(r.current=t)})}(t,o):o})}return n.Children.count(r)>1?n.Children.only(null):null});o.displayName="SlotClone";var s=({children:e})=>(0,i.jsx)(i.Fragment,{children:e});function a(e){return n.isValidElement(e)&&e.type===s}},5139:function(e,t,r){"use strict";r.d(t,{j:function(){return l}});let n=e=>"boolean"==typeof e?"".concat(e):0===e?"0":e,i=function(){for(var e,t,r=0,n="";r<arguments.length;)(e=arguments[r++])&&(t=function e(t){var r,n,i="";if("string"==typeof t||"number"==typeof t)i+=t;else if("object"==typeof t){if(Array.isArray(t))for(r=0;r<t.length;r++)t[r]&&(n=e(t[r]))&&(i&&(i+=" "),i+=n);else for(r in t)t[r]&&(i&&(i+=" "),i+=r)}return i}(e))&&(n&&(n+=" "),n+=t);return n},l=(e,t)=>r=>{var l;if((null==t?void 0:t.variants)==null)return i(e,null==r?void 0:r.class,null==r?void 0:r.className);let{variants:o,defaultVariants:s}=t,a=Object.keys(o).map(e=>{let t=null==r?void 0:r[e],i=null==s?void 0:s[e];if(null===t)return null;let l=n(t)||n(i);return o[e][l]}),u=r&&Object.entries(r).reduce((e,t)=>{let[r,n]=t;return void 0===n||(e[r]=n),e},{}),c=null==t?void 0:null===(l=t.compoundVariants)||void 0===l?void 0:l.reduce((e,t)=>{let{class:r,className:n,...i}=t;return Object.entries(i).every(e=>{let[t,r]=e;return Array.isArray(r)?r.includes({...s,...u}[t]):({...s,...u})[t]===r})?[...e,r,n]:e},[]);return i(e,a,c,null==r?void 0:r.class,null==r?void 0:r.className)}}},function(e){e.O(0,[507,888,179],function(){return e(e.s=8296)}),_N_E=e.O()}]);