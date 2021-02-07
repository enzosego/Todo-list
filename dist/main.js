(()=>{"use strict";var t=6e4;function e(e){return e.getTime()%t}function n(n){var a=new Date(n.getTime()),i=Math.ceil(a.getTimezoneOffset());a.setSeconds(0,0);var r=i>0?(t+e(a))%t:e(a);return i*t+r}function a(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function i(t){a(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new Date(t.getTime()):"number"==typeof t||"[object Number]"===e?new Date(t):("string"!=typeof t&&"[object String]"!==e||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function r(t,e){a(2,arguments);var n=i(t),r=i(e),o=n.getTime()-r.getTime();return o<0?-1:o>0?1:o}function o(t,e){a(2,arguments);var n=i(t),r=i(e);return n.getTime()-r.getTime()}function d(t,e){a(2,arguments);var n=o(t,e)/1e3;return n>0?Math.floor(n):Math.ceil(n)}function s(t){return function(t,e){if(null==t)throw new TypeError("assign requires that input parameter not be null or undefined");for(var n in e=e||{})e.hasOwnProperty(n)&&(t[n]=e[n]);return t}({},t)}var c={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function l(t){return function(e){var n=e||{},a=n.width?String(n.width):t.defaultWidth;return t.formats[a]||t.formats[t.defaultWidth]}}var u,m={date:l({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:l({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:l({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},h={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function g(t){return function(e,n){var a,i=n||{};if("formatting"===(i.context?String(i.context):"standalone")&&t.formattingValues){var r=t.defaultFormattingWidth||t.defaultWidth,o=i.width?String(i.width):r;a=t.formattingValues[o]||t.formattingValues[r]}else{var d=t.defaultWidth,s=i.width?String(i.width):t.defaultWidth;a=t.values[s]||t.values[d]}return a[t.argumentCallback?t.argumentCallback(e):e]}}function f(t){return function(e,n){var a=String(e),i=n||{},r=i.width,o=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],d=a.match(o);if(!d)return null;var s,c=d[0],l=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth];return s="[object Array]"===Object.prototype.toString.call(l)?function(t,e){for(var n=0;n<t.length;n++)if(t[n].test(c))return n}(l):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&t[n].test(c))return n}(l),s=t.valueCallback?t.valueCallback(s):s,{value:s=i.valueCallback?i.valueCallback(s):s,rest:a.slice(c.length)}}}const p={code:"en-US",formatDistance:function(t,e,n){var a;return n=n||{},a="string"==typeof c[t]?c[t]:1===e?c[t].one:c[t].other.replace("{{count}}",e),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a},formatLong:m,formatRelative:function(t,e,n,a){return h[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:g({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:g({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return Number(t)-1}}),month:g({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:g({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:g({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(u={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t,e){var n=String(t),a=e||{},i=n.match(u.matchPattern);if(!i)return null;var r=i[0],o=n.match(u.parsePattern);if(!o)return null;var d=u.valueCallback?u.valueCallback(o[0]):o[0];return{value:d=a.valueCallback?a.valueCallback(d):d,rest:n.slice(r.length)}}),era:f({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:f({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:f({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:f({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:f({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};var y=1440,v=43200,b=525600;function E(t,e,o,c,l,u,m,h,g){if(g){const e=function(t,e,n,a){return{title:t,description:e,date:n,priority:a,completion:!1}}(c,l,u,o);t.push(e)}!function(t,e,n){let a=document.createElement("div");"low"===e?a.classList.add("tasks-low"):"medium"===e?a.classList.add("tasks-medium"):"high"===e&&a.classList.add("tasks-high"),a.setAttribute("id",`task${n}${t}`),document.querySelector(".active").appendChild(a)}(e,o,m),function(t,e){let n=document.createElement("img");n.classList.add("delete-button"),n.setAttribute("id",`delete${e}${t}`),n.src="images/trash-solid.svg",n.title="Delete task";let a=document.createElement("img");a.classList.add("edit-button"),a.setAttribute("id",`edit${e}${t}`),a.src="images/edit-solid.svg",a.title="Edit task",document.getElementById(`task${e}${t}`).appendChild(a),document.getElementById(`task${e}${t}`).appendChild(n)}(e,m),function(t,e,o,c,l,u){let m=document.createElement("h3");m.classList.add("task-title"),m.setAttribute("id",`task-title${o}${e}`),m.textContent=c;let h=document.createElement("p");h.classList.add("task-description"),h.textContent=l,h.setAttribute("id",`task-description${o}${e}`);let g=document.createElement("input");g.setAttribute("type","checkbox"),g.setAttribute("id",`task-check${o}${e}`),g.checked=1==u,g.classList.add("task-check"),document.getElementById(`task${o}${e}`).appendChild(m),document.getElementById(`task${o}${e}`).appendChild(h),function(t,e,o){let c=document.createElement("p");c.classList.add("due-date"),c.textContent=`${function(t,e,o){a(2,arguments);var c=o||{},l=c.locale||p;if(!l.formatDistance)throw new RangeError("locale must contain localize.formatDistance property");var u=r(t,e);if(isNaN(u))throw new RangeError("Invalid time value");var m,h,g=s(c);g.addSuffix=Boolean(c.addSuffix),g.comparison=u,u>0?(m=i(e),h=i(t)):(m=i(t),h=i(e));var f,E=null==c.roundingMethod?"round":String(c.roundingMethod);if("floor"===E)f=Math.floor;else if("ceil"===E)f=Math.ceil;else{if("round"!==E)throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");f=Math.round}var $,w=d(h,m),k=(n(h)-n(m))/1e3,j=f((w-k)/60);if("second"===($=null==c.unit?j<1?"second":j<60?"minute":j<y?"hour":j<v?"day":j<b?"month":"year":String(c.unit)))return l.formatDistance("xSeconds",w,g);if("minute"===$)return l.formatDistance("xMinutes",j,g);if("hour"===$){var I=f(j/60);return l.formatDistance("xHours",I,g)}if("day"===$){var S=f(j/y);return l.formatDistance("xDays",S,g)}if("month"===$){var B=f(j/v);return l.formatDistance("xMonths",B,g)}if("year"===$){var C=f(j/b);return l.formatDistance("xYears",C,g)}throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'")}(new Date,new Date(t))} left`,document.getElementById(`task${o}${e}`).appendChild(c)}(t,e,o),document.getElementById(`task${o}${e}`).appendChild(g)}(u,e,m,c,l,h)}function $(t,e="New Project"){!function(t,e){let n=document.createElement("div");n.classList.add("list"),n.setAttribute("id",`container${t}`),n.dataset.tabContent="",e.appendChild(n)}(t,document.getElementById("main-container")),function(t){let e=document.createElement("div");e.setAttribute("id",`project${t}`),e.classList.add("project-tab"),e.dataset.tabTarget=`#container${t}`,document.getElementById("existing-projects").appendChild(e)}(t),function(t){let e=document.createElement("img");e.src="images/edit-solid.svg",e.classList.add("project-edit"),e.setAttribute("id",`project-edit${t}`),e.title="Edit this project's name";let n=document.createElement("img");n.src="images/trash-solid.svg",n.classList.add("project-delete"),n.setAttribute("id",`project-delete${t}`),n.title="Delete this project",document.getElementById(`project${t}`).appendChild(e),document.getElementById(`project${t}`).appendChild(n)}(t),function(t,e){let n=document.createElement("p");n.classList.add("tab-text"),n.setAttribute("id",`tab-text${t}`),n.textContent=e,document.getElementById(`project${t}`).appendChild(n)}(t,e)}function w(t){t.parentElement.className="input-cont success"}function k(t){t.parentElement.className="input-cont error"}!function(){let t=function(){let t=new Date,e=t.getDate(),n=t.getMonth()+1,a=t.getFullYear();return e<10&&(e="0"+e),n<10&&(n="0"+n),t=`${a}-${n}-${e}`,t}();document.getElementById("date-calendar").setAttribute("min",t)}();let j=document.getElementById("submit"),I=document.getElementById("priority-select"),S="low";const B=document.getElementById("title-input"),C=document.getElementById("description-input"),L=document.querySelector("#date-calendar");let M="container0",x=1,A=JSON.parse(localStorage.getItem("projects"));if(console.table(A),A){for(let t=0;t<A.length;t++){0!==t&&($(x,A[t].projectName),x++),t>0&&(document.getElementById(`container${t}`).classList.add("active"),document.getElementById("container"+(t-1)).classList.remove("active"));let e=0;A[t].count=0;for(let n=0;n<A[t].list.length;n++)E(A[t].list,e,A[t].list[n].priority,A[t].list[n].title,A[t].list[n].description,A[t].list[n].date,A[t].projectContainer.slice(-1),A[t].list[n].completion),e++,A[t].count=A[t].count+1;t==A.length-1&&document.getElementById(`container${t}`).classList.remove("active")}document.getElementById("container0").classList.add("active"),P()}else A=[],A.push(W("container0"));function W(t){return{projectName:"New Project",projectContainer:t,list:[],count:0}}function P(){const t=document.querySelectorAll("[data-tab-target]"),e=document.querySelectorAll("[data-tab-content]");t.forEach((n=>{n.addEventListener("click",(()=>{const a=document.querySelector(n.dataset.tabTarget);M=a.id,e.forEach((t=>{t.classList.remove("active")})),t.forEach((t=>{t.classList.remove("active-tab")})),n.classList.add("active-tab"),a.classList.add("active")}))}))}document.getElementById("new-project").addEventListener("click",(()=>{x<6&&(A.push(W(`container${x}`)),localStorage.setItem("projects",JSON.stringify(A)),$(x),P(),x++)})),I.addEventListener("change",(()=>{S="medium"==I.value?"medium":"high"==I.value?"high":"low"})),j.addEventListener("click",(()=>{!function(t,e,n){const a=t.value,i=e.value,r=n.value;""===a?k(t):w(t),""===i?k(e):w(e),""===r?k(n):w(n)}(B,C,L),B.value&&C.value&&L.value&&A[M.slice(-1)].count<8&&(E(A[M.slice(-1)].list,A[M.slice(-1)].count,S,B.value,C.value,L.value,M.slice(-1),!1,1),localStorage.setItem("projects",JSON.stringify(A)),A[M.slice(-1)].count=A[M.slice(-1)].count+1,B.value="",C.value="")})),window.addEventListener("load",(t=>{document.querySelectorAll("input[type=checkbox]").forEach((t=>{t.checked&&t.parentElement.classList.add("checked-task")}))})),document.addEventListener("change",(t=>{if(t.target&&"task-check"==t.target.classList){let e=t.target.id.slice(-2);t.target.checked?(A[e.slice(-2,-1)].list[e.slice(-1)].completion=!0,t.target.parentElement.classList.add("checked-task")):(A[e.slice(-2,-1)].list[e.slice(-1)].completion=!1,t.target.parentElement.classList.remove("checked-task")),localStorage.setItem("projects",JSON.stringify(A)),console.log("completion: "+A[e.slice(-2,-1)].list[e.slice(-1)].completion)}})),window.addEventListener("click",(t=>{if(t.target&&"delete-button"==t.target.classList){let e=t.target.id.slice(-2),n=document.getElementById(`container${e[0]}`).querySelectorAll("div"),a=[];n.forEach((t=>{a.push(t)}));for(let t=+e[1]+1;t<a.length;t++)document.getElementById(`task${e[0]}${t}`).setAttribute("id",`task${e[0]}${t-1}`),document.getElementById(`edit${e[0]}${t}`).setAttribute("id",`edit${e[0]}${t-1}`),document.getElementById(`delete${e[0]}${t}`).setAttribute("id",`delete${e[0]}${t-1}`),document.getElementById(`task-check${e[0]}${t}`).setAttribute("id",`task-check${e[0]}${t-1}`);A[e[0]].list.splice(e[1],1),A[e[0]].count=A[e[0]].count-1,localStorage.setItem("projects",JSON.stringify(A));let i=document.getElementById(t.target.id).parentElement;i.parentElement.removeChild(i)}})),window.addEventListener("click",(t=>{let e=t.target.id.slice(-2);if(t.target&&"edit-button"==t.target.classList&&!document.getElementById(`finish-edit${e}`)){let n=t.target.parentElement,a=n.querySelector(".task-title").textContent,i=n.querySelector(".task-description").textContent,r=document.createElement("input");r.type="text",r.value=a,r.setAttribute("id","title-edit"),r.classList.add("input-edit");let o=document.createElement("input");o.type="text",o.value=i,o.setAttribute("id","description-edit"),o.classList.add("input-edit");let d=document.createElement("button");d.classList.add("finish-edit-button"),d.setAttribute("id",`finish-edit${e}`),d.title="Done!",n.appendChild(r),n.appendChild(o),n.appendChild(d)}})),document.addEventListener("click",(t=>{let e=t.target.id.slice(-2);if(t.target&&"finish-edit-button"==t.target.classList){let n=document.getElementById("title-edit").value,a=document.getElementById("description-edit").value;A[e.slice(-2,-1)].list[e.slice(-1)].title=n,A[e.slice(-2,-1)].list[e.slice(-1)].description=a,localStorage.setItem("projects",JSON.stringify(A)),document.getElementById(`task-title${e}`).textContent=n,document.getElementById(`task-description${e}`).textContent=a;let i=t.target.parentElement,r=document.getElementById("title-edit"),o=document.getElementById("description-edit"),d=document.getElementById(`finish-edit${e}`);i.removeChild(r),i.removeChild(o),i.removeChild(d)}})),document.addEventListener("click",(t=>{if(t.target&&"project-delete"==t.target.classList){let e=t.target.id.slice(-1);M="container0",A.splice(e,1);for(let t=+e+1;t<=A.length;t++)document.getElementById(`project-delete${t}`).id="project-delete"+(t-1),document.getElementById(`project${t}`).dataset.tabTarget="#container"+(t-1),document.getElementById(`project${t}`).id="project"+(t-1),document.getElementById(`project-edit${t}`).id="project-edit"+(t-1),document.getElementById(`tab-text${t}`).id="tab-text"+(t-1),document.getElementById(`container${t}`).id="container"+(t-1);if(A.length>=2)for(let t=+e;t<A.length;t++)for(let e=0;e<A[t].list.length;e++)document.getElementById(`task${t+1}${e}`).id=`task${t}${e}`,document.getElementById(`edit${t+1}${e}`).id=`edit${t}${e}`,document.getElementById(`delete${t+1}${e}`).id=`delete${t}${e}`,document.getElementById(`task-title${t+1}${e}`).id=`task-title${t}${e}`,document.getElementById(`task-description${t+1}${e}`).id=`task-description${t}${e}`,document.getElementById(`task-check${t+1}${e}`).id=`task-check${t}${e}`;for(let t=+e;t<A.length;t++)A[t].projectContainer=`container${t}`;localStorage.setItem("projects",JSON.stringify(A));let n=document.getElementById("main-container"),a=document.getElementById(`container${e}`);n.removeChild(a);let i=document.getElementById("existing-projects"),r=t.target.parentElement;i.removeChild(r)}})),document.addEventListener("click",(t=>{if(t.target&&"project-edit"==t.target.classList&&!document.querySelector(".finish-edit-project-button")){let e=t.target.id.slice(-1),n=document.createElement("input");n.type="text",n.classList.add("project-edit-text"),n.setAttribute("id",`project-edit-text${e}`),n.value=A[e].projectName;let a=document.createElement("img");a.classList.add("finish-edit-project-button"),a.setAttribute("id",`finish-edit-project-button${e}`),a.src="images/check-square-solid.svg",a.title="Done!",document.getElementById(`project${e}`).appendChild(a),document.getElementById(`project${e}`).appendChild(n)}})),window.addEventListener("click",(t=>{if(t.target&&"finish-edit-project-button"==t.target.classList){let e=t.target.id.slice(-1),n=document.getElementById(`project-edit-text${e}`).value;A[e].projectName=n,localStorage.setItem("projects",JSON.stringify(A)),document.getElementById(`tab-text${e}`).textContent=n;let a=t.target.parentElement;a.removeChild(t.target),a.removeChild(document.getElementById(`project-edit-text${e}`))}}))})();