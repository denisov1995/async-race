(()=>{"use strict";var e={387:(e,t,n)=>{n.r(t)},203:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.saveWinner=t.updateWinner=t.createWinner=t.deleteWinner=t.getWinnerStatus=t.getWinner=t.getWinners=t.drive=t.stopEngine=t.startEngine=t.updateCar=t.deleteCar=t.createCar=t.getCar=t.getCars=void 0;const n="http://localhost:3000",a=`${n}/garage`,r=`${n}/engine`,s=`${n}/winners`;async function i(e){return(await fetch(s,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json()}async function c(e,t){return(await fetch(`${s}/${e}`,{method:"PUT",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}})).json()}t.getCars=async(e,t=7)=>{const n=await fetch(`${a}?_page=${e}&_limit=${t}`);return{items:await n.json(),count:String(n.headers.get("X-Total-Count"))}},t.getCar=async e=>(await fetch(`${a}/${e}`)).json(),t.createCar=async e=>(await fetch(a,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json(),t.deleteCar=async e=>(await fetch(`${a}/${e}`,{method:"DELETE"})).json(),t.updateCar=async function(e,t){return(await fetch(`${a}/${t}`,{method:"PUT",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json()},t.startEngine=async function(e){return(await fetch(`${r}?id=${e}&status=started`,{method:"PATCH",headers:{"Content-Type":"application/json"}})).json()},t.stopEngine=async function(e){return(await fetch(`${r}?id=${e}&status=stopped`,{method:"PATCH",headers:{"Content-Type":"application/json"}})).json()},t.drive=async e=>{const t=await fetch(`${r}?id=${e}&status=drive`,{method:"PATCH",headers:{"Content-Type":"application/json"}});return 200!==t.status?{success:!1}:{...await t.json()}},t.getWinners=async({page:e,limit:n=10,sort:a="id",order:r="ASC"})=>{const i=await fetch(`${s}?_page=${e}&_limit=${n}${((e,t)=>e&&t?`&_sort=${e}&_order=${t}`:"")(a,r)}`),c=await i.json();return{items:await Promise.all(c.map((async e=>({...e,car:await t.getCar(e.id)})))),count:i.headers.get("X-Total-Count")}},t.getWinner=async e=>(await fetch(`${s}/${e}`)).json(),t.getWinnerStatus=async e=>(await fetch(`${s}/${e}`)).status,t.deleteWinner=async function(e){return(await fetch(`${s}/${e}`,{method:"DELETE"})).json()},t.createWinner=i,t.updateWinner=c,t.saveWinner=async(e,n)=>{if(404===await t.getWinnerStatus(e))await i({id:e,wins:1,time:n});else{const a=await t.getWinner(e);await c(e,{id:e,wins:a.wins+1,time:n>a.time?a.time:n})}}},607:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),n(387);const r=n(985),s=a(n(54)),i=n(203);i.getCars(s.default.carsPage).then((e=>i.getWinners({page:s.default.winnerPage,limit:10,sort:"id",order:"ASC"}).then((t=>r.render(e.items,e.count,t))).then((()=>{r.create(),r.deleteAuto(),r.getDate(),r.startCar(),r.generateCars(),r.race(),r.createPageGarage(),r.linkPage(),r.createPageWinner(),r.sortInWinnerPage()}))))},985:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.sortInWinnerPage=t.createPageWinner=t.linkPage=t.createPageGarage=t.race=t.generateCars=t.startCar=t.getDate=t.deleteAuto=t.create=t.render=void 0;const r=n(203),s=n(974),i=a(n(54)),c=a(n(392)),o=a(n(55)),l=(e,t)=>{const n=document.createElement("div");n.innerHTML=c.default;const a=n.querySelector(".car-svg");if(!a)throw new Error;null==a||a.setAttribute("id",`car-svg-${t}`);const r=null==a?void 0:a.querySelector(".car-svg-fill");if(!r)throw new Error;return r.style.fill=e,a},d=(e,t)=>`\n  <div id="garage">\n    <h1>Garage (${t})</h1>\n    <h2>Page (${i.default.carsPage})</h2>\n    <ul class="garage">\n      ${e.map((e=>{return`\n        <li>${t=e.name,n=e.id,a=e.color,`\n  <div class="service-btn">\n    <button class="btn select-btn" id="select-btn-${n}">Select</button>\n    <button class="btn remove-btn" id="remove-btn-${n}">Remove</button>\n    <span class="car-name">${t}</span>\n  </div>\n  <div class="road">\n    <div class="roads-btns">\n    <button class="btn start-car" id="start-${n}">A</button>\n    <button class="btn stop-car" id="stop-${n}" disabled>B</button>\n    </div>\n    <div class="car" id="car">\n        ${(e=>{const t=document.createElement("div");t.innerHTML=o.default;const n=t.querySelector(".flag-svg");if(!n)throw new Error;return null==n||n.setAttribute("id",`flag-svg-${e}`),n})(n).outerHTML}${l(a,n).outerHTML}\n    \n    </div>\n  </div>\n`}</li>\n      `;var t,n,a})).join("")}\n    </ul>\n    <button class="btn prev" id="prev" disabled>PREV</button>\n    <button class="btn next" id="next">NEXT</button>\n    <p class="message-win"></p>\n  </div>\n`,u=async e=>{let t;document.querySelector(".winners-page")?t=document.querySelector(".winners-page"):(t=document.createElement("div"),t.classList.add("winners-page"));const n=e,{items:a}=n,{count:r}=n,s=`\n  <h1>Winners (${r})</h1>\n  <h2>Page (${i.default.winnerPage})</h2>\n  <table class="table" cellspacing="0" border="2" cellpadding="0">\n   <thead>\n    <th>Number</th>\n    <th>Motorbike</th>\n    <th>Name</th>\n    <th class="table-btn table-wins ${"wins"===i.default.sortBy?i.default.sortOrder:""}" id="sort-by-wins">Wins</th>\n    <th class="table-btn table-time ${"time"===i.default.sortBy?i.default.sortOrder:""}" id="sort-by-time">\n    Best time (seconds)\n    </th>\n   </thead>\n   <tbody>\n     ${a.map(((e,t)=>`\n     <tr>\n      <td>${10*i.default.winnerPage-10+t+1}</td>\n      <td>${l(e.car.color,e.id).outerHTML}</td>\n      <td>${e.car.name}</td>\n      <td>${e.wins}</td>\n      <td>${e.time}</td>\n     </tr>\n    `)).join("")}\n   </tbody>\n  </table>\n  <button class="btn prev" id="prev-winner">PREV</button>\n  <button class="btn next" id="next-winner">NEXT</button>`;t.innerHTML=s,document.querySelector("div").appendChild(t)};function g(){const e=document.getElementById("prev-winner"),t=document.getElementById("next-winner");1===i.default.winnerPage?null==e||e.setAttribute("disabled",""):null==e||e.removeAttribute("disabled"),r.getWinners({page:i.default.winnerPage,limit:10,sort:"id",order:"ASC"}).then((e=>{i.default.winnerPage===Math.ceil(Number(e.count)/10)?null==t||t.setAttribute("disabled",""):null==t||t.removeAttribute("disabled")}))}async function f(){await r.getWinners({page:i.default.winnerPage,limit:10,sort:i.default.sortBy,order:i.default.sortOrder}).then((e=>u(e))),g()}async function m(e){const t=document.getElementById("garage");if(!t)throw new Error("eror");t.innerHTML=await r.getCars(e).then((e=>d(e.items,e.count)))}t.render=async(e,t,n)=>{const a=`\n    <div class="nav">\n      <button class="btn btn-garage" disabled>Garage</button>\n      <button class="btn btn-winners">Winners</button>\n    </div>\n    <div class="garage-page">\n      \n  <div class="garage-form">\n    <form id="create" class="form">\n      <input type="text" class="input" id="create-name">\n      <input type="color" class="input" id="create-color" value="#ffffff">\n      <button class="btn" id="create-btn" type="submit">Create</button>\n    </form>\n    <form id="update" class="form">\n      <input type="text" class="input" id="update-name" disabled>\n      <input type="color" class="input" id="update-color" value="#ffffff" disabled>\n      <button class="btn" id="update-btn" type="submit" disabled>Update</button>\n    </form>\n  </div>\n  <div class="race-btns">\n    <button class="btn race-btn" id="race">Race</button>\n    <button class="btn reset-btn" id="reset" disabled>Reset</button>\n    <button class="btn generator-btn" id="generator">Generate cars</button>\n  </div>\n\n      ${d(e,t)}\n    </div>`,r=document.createElement("div");r.innerHTML=a,document.body.appendChild(r),u(n)},t.create=function(){var e;null===(e=document.getElementById("create"))||void 0===e||e.addEventListener("submit",(async e=>{e.preventDefault();const t=document.getElementById("create-name"),n=document.getElementById("create-color"),a={name:t.value,color:n.value};await r.createCar(a),m(i.default.carsPage),t.value="",n.value="#ffffff";const s=document.querySelector(".race-btn"),c=document.querySelector(".reset-btn");s.disabled=!1,c.disabled=!0}))},t.deleteAuto=function(){const e=document.getElementById("garage");null==e||e.addEventListener("click",(async e=>{if(e.target instanceof Element){if(!e.target)throw new Error;if(e.target.classList.contains("remove-btn")){const t=e.target.id.split("-"),n=t[t.length-1];await r.deleteCar(n),await r.deleteWinner(n),m(i.default.carsPage),await f()}}}))};const b={id:0,name:"",color:""};function y(e,t){for(let n=0;n<e.length;n++)e[n].disabled=t}t.getDate=async function(){const e=document.getElementById("garage");null==e||e.addEventListener("click",(async e=>{if(e.target instanceof Element){if(!e.target)throw new Error;if(e.target.classList.contains("select-btn")){const t=e.target.id.split("-");b.id=+t[t.length-1],function(e){var t,n;const a=document.getElementById("update-name"),s=document.getElementById("update-color");a.removeAttribute("disabled"),s.removeAttribute("disabled"),null===(t=document.getElementById("update-btn"))||void 0===t||t.removeAttribute("disabled"),a.value=e.name,s.value=e.color,null===(n=document.getElementById("update"))||void 0===n||n.addEventListener("submit",(async e=>{var t;e.preventDefault(),b.name=a.value,b.color=s.value,await r.updateCar(b,b.id),m(i.default.carsPage),a.value="",s.value="#ffffff",a.setAttribute("disabled",""),s.setAttribute("disabled",""),null===(t=document.getElementById("update-btn"))||void 0===t||t.setAttribute("disabled","")}))}(await r.getCar(b.id))}}}))},t.startCar=function(){const e=document.getElementById("garage");null==e||e.addEventListener("click",(async e=>{if(e.target instanceof Element){if(!e.target)throw new Error;if(e.target.classList.contains("start-car")){const t=document.querySelector(".flag-svg"),n=document.querySelector(".car-svg"),a=await s.getDistance(n,t),i=e.target.id.split("-")[1],c=document.getElementById(`car-svg-${i}`),o=document.getElementById(`stop-${i}`),l=document.getElementById(`start-${i}`);l.disabled=!0;const{velocity:d,distance:u}=await r.startEngine(+i),g=Math.round(u/d/1e3);let f=0;const m=setInterval((()=>{if(f===Math.round(a+50)){if(clearInterval(m),!o)throw new Error;o.disabled=!1}else{if(f++,!c)throw new Error;c.style.left=`${f}px`}}),g),{success:b}=await r.drive(Number(i));if(!b){if(clearInterval(m),!o)throw new Error;o.disabled=!1}null==o||o.addEventListener("click",(()=>{if(!c)throw new Error;c.style.left="0px",o.disabled=!0,l.disabled=!1}))}}}))},t.generateCars=function(){const e=document.querySelector(".race-btn"),t=document.querySelector(".reset-btn"),n=document.querySelector(".generator-btn");null==n||n.addEventListener("click",(async function(){const n=s.generateRandomCars();for(let e=0;e<n.length;e++)r.createCar(n[e]);m(i.default.carsPage),e.disabled=!1,t.disabled=!0}))};const p={id:0,time:20,status:!1};function v(){const e=document.getElementById("prev"),t=document.getElementById("next");1===i.default.carsPage?null==e||e.setAttribute("disabled",""):null==e||e.removeAttribute("disabled"),r.getCars(i.default.carsPage).then((e=>{i.default.carsPage===Math.ceil(Number(e.count)/7)?null==t||t.setAttribute("disabled",""):null==t||t.removeAttribute("disabled")}))}t.race=async function(){const e=document.querySelector(".race-btn"),t=document.querySelector(".reset-btn");y([...document.querySelectorAll(".stop-car")],!0),null==e||e.addEventListener("click",(async()=>{const n=document.querySelectorAll(".car-svg"),a=[...document.querySelectorAll(".start-car")];e.disabled=!0,y(a,!0);const c=[],o=(await r.getCars(i.default.carsPage)).items,l=o.map((async e=>{const{velocity:t,distance:n}=await r.startEngine(+e.id);c.push(n/t)}));await Promise.all(l);const d=o.map(((e,a)=>new Promise((i=>{(async()=>{const l=document.querySelector(".flag-svg"),d=document.querySelector(".car-svg"),u=document.querySelectorAll(".car-svg"),g=await s.getDistance(d,l);let f=0;p.id=window.requestAnimationFrame((function e(r){f||(f=r);const s=r-f,l=Math.round(s*((g+50)/c[a]));if(n[a].style.transform=`translateX(${Math.min(l,g+50)}px)`,l>g+50){const e=u[a].id.split("-");p.id=+e[e.length-1],c[a]/=1e3;const n=`winner ${o[a].name} ${Math.round(100*c[a])/100} sec`;t.disabled=!1,p.status=!1,p.time=Math.round(100*c[a])/100,i(n)}l<g+50&&(p.id=window.requestAnimationFrame(e))}));const{success:m}=await r.drive(Number(e.id));m||(t.disabled=!1,window.cancelAnimationFrame(p.id))})()})))),u=await Promise.race(d),g=document.querySelector(".message-win");g.innerHTML=`${u}`,await r.saveWinner(p.id,p.time),null==t||t.addEventListener("click",(()=>{const r=[...n];for(let e=0;e<r.length;e++)r[e].style.transform="translateX(0px)";g.innerHTML="",t.disabled=!0,e.disabled=!1,y(a,!1)}))}))},t.createPageGarage=async function(){const e=document.getElementById("garage");v(),null==e||e.addEventListener("click",(async e=>{if(e.target instanceof Element){if(!e.target)throw new Error;e.target.classList.contains("next")&&(i.default.carsPage++,await m(i.default.carsPage),v()),e.target.classList.contains("prev")&&(i.default.carsPage--,await m(i.default.carsPage),v())}}))},t.linkPage=async function(){const e=document.querySelector(".btn-garage"),t=document.querySelector(".btn-winners"),n=document.querySelector(".garage-page"),a=document.querySelector(".winners-page");document.body.addEventListener("click",(async r=>{if(r.target instanceof Element){if(!r.target)throw new Error;r.target.classList.contains("btn-garage")&&(null==e||e.setAttribute("disabled",""),null==t||t.removeAttribute("disabled"),a.style.display="none",n.style.display="block"),r.target.classList.contains("btn-winners")&&(null==t||t.setAttribute("disabled",""),null==e||e.removeAttribute("disabled"),n.style.display="none",a.style.display="block",f())}}))},t.createPageWinner=async function(){const e=document.querySelector(".winners-page");g(),null==e||e.addEventListener("click",(async e=>{if(e.target instanceof Element){if(!e.target)throw new Error;e.target.classList.contains("next")&&(i.default.winnerPage++,await f(),g()),e.target.classList.contains("prev")&&(i.default.winnerPage--,await f(),g())}}))};const h=async e=>{i.default.sortOrder="ASC"===i.default.sortOrder?"DESC":"ASC",i.default.sortBy=e,await f()};t.sortInWinnerPage=async function(){const e=document.querySelector(".winners-page");g(),null==e||e.addEventListener("click",(async e=>{if(e.target instanceof Element){if(!e.target)throw new Error;e.target.classList.contains("table-wins")&&h("wins"),e.target.classList.contains("table-time")&&h("time")}}))}},54:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default={carsPage:1,winnerPage:1,sortOrder:"DESC",sortBy:"id"}},974:(e,t)=>{async function n(e){const{top:t,left:n,width:a,height:r}=e.getBoundingClientRect();return{x:n+a/2,y:t+r/2}}Object.defineProperty(t,"__esModule",{value:!0}),t.generateRandomCars=t.getDistance=void 0,t.getDistance=async function(e,t){const a=await n(e),r=await n(t);return Math.hypot(a.x-r.x,a.y-r.y)};const a=()=>{let e="#";for(let t=0;t<6;t++)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e},r=["Honda","Suzuki","Kawasaki","Yamaha","BMW","KTM","Ducati","Husqvarna","Motoland"],s=["250SFX","YZ450F","KX450F","FC 250","KX250F","YZ 85","TC 125","FC 350","XR 250 LITE"];t.generateRandomCars=function(e=100){return new Array(e).fill(1).map((()=>({name:`${r[Math.floor(Math.random()*r.length)]} ${s[Math.floor(Math.random()*r.length)]}`,color:a()})))}},55:e=>{e.exports='<svg class="flag-svg" right="100px" width="35px" height="35px" viewBox="0 0 256 256" enable-background="new 0 0 256 256">\r\n<switch>\r\n   <foreignObject requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/" x="0" y="0" width="1" height="1">\r\n     <i:pgfRef xlink:href="#adobe_illustrator_pgf"></i:pgfRef>\r\n   </foreignObject>\r\n<g i:extraneous="self">\r\n<g>\r\n<g>\r\n<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="33.9004" y1="-1.5469" x2="33.9004" y2="259.0207">\r\n<stop offset="0" style="stop-color:#E3E3E3"/>\r\n<stop offset="1" style="stop-color:#E2E2E2"/>\r\n</linearGradient>\r\n<path fill="url(#SVGID_1_)" d="M40.33,250.775c0,2.874-2.351,5.225-5.225,5.225h-2.41c-2.874,0-5.225-2.351-5.225-5.225V5.224      C27.471,2.351,29.821,0,32.695,0h2.41c2.874,0,5.225,2.351,5.225,5.224V250.775z"/>\r\n<g opacity="0.2">\r\n<path fill="#D8D8D8" d="M35.105,250.726h-2.41c-2.874,0-5.225-2.35-5.225-5.224v5.273c0,2.874,2.351,5.225,5.225,5.225h2.41       c2.874,0,5.225-2.351,5.225-5.225v-5.273C40.33,248.376,37.979,250.726,35.105,250.726z"/>\r\n</g>\r\n<linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="135.5977" y1="9.0024" x2="135.5977" y2="135.666">\r\n<stop offset="0" style="stop-color:#F15454"/>\r\n<stop offset="1" style="stop-color:#D93B3B"/>\r\n</linearGradient>\r\n<path fill="url(#SVGID_2_)" d="M216.845,4.677H43.836c-0.396,0-0.783,0.021-1.171,0.058v127.296      c0.388,0.041,0.775,0.06,1.171,0.06h173.009c6.424,0,11.685-5.26,11.685-11.689V16.365      C228.529,9.937,223.269,4.677,216.845,4.677z"/>\r\n<g opacity="0.2">\r\n<path fill="#2C2C2C" d="M216.845,126.817H43.836c-0.396,0-0.783-0.019-1.171-0.06v5.274c0.388,0.041,0.775,0.06,1.171,0.06       h173.009c6.424,0,11.685-5.26,11.685-11.689v-5.274C228.529,121.557,223.269,126.817,216.845,126.817z"/>\r\n</g>\r\n</g>\r\n</g>\r\n</g>\r\n</svg>\r\n'},392:e=>{e.exports='<svg class="car-svg" xmlns="http://www.w3.org/2000/svg" version="1.0"  width="100px" height="35px" viewBox="0 0 1280.000000 640.000000" preserveAspectRatio="xMidYMid meet">\r\n    <g class="car-svg-transform"  fill="#000"  stroke="none">\r\n    <path id="bike-14-bike-14" fill-rule="evenodd" clip-rule="evenodd"  class="car-svg-fill" fill="#3E5266" d="M846.0039,300.5766\r\n\tc45.3408,0,86.2832,18.3165,115.9521,47.9649C991.6738,378.3091,1010,419.2817,1010,464.564\r\n\tc0,45.3017-18.3262,86.3134-48.0439,115.9521c-29.6689,29.6689-70.6807,48.0742-115.9521,48.0742\r\n\tc-45.2832,0-86.3242-18.4053-115.9629-48.0742c-29.709-29.6387-48.0742-70.6504-48.0742-115.9521\r\n\tc0-45.2823,18.3652-86.2549,48.0742-116.0225c11.3916-11.3613,24.5293-21.1367,38.9199-28.8008l-11.9638-30.3291l-12.2901,4.7051\r\n\tl-28.248-63.1055c-69.2402,45.4204-117.876,121.4072-124.5733,224.0537l-8.7978-0.5517c0.0391,0.5517,0.1182,1.1435,0.1973,1.667\r\n\tc-41.5645,0-113.5562,0-155.189,0c-0.4341-22.5577-3.5313-44.1084-9.1235-64.4668l-95.4961,34.374\r\n\tc2.9785,12.3682,4.5566,25.1904,4.5566,38.4766c0,45.3017-18.4053,86.3134-48.0737,115.9521\r\n\tc-29.6294,29.6689-70.6607,48.0742-115.9331,48.0742c-45.3116,0-86.3037-18.4053-116.0513-48.0742\r\n\tC18.3457,550.8774,0,509.8657,0,464.564c0-45.2823,18.3457-86.2549,47.9751-116.0225\r\n\tc29.7476-29.6484,70.7397-47.9649,116.0513-47.9649c39.2754,0,75.2763,13.7598,103.5053,36.7706l70.0494-66.8238\r\n\tc-22.5284-17.9511-49.1192-33.1704-79.834-45.5981c-78.9947-26.9756-159.065-28.4751-240.0127-8.1763\r\n\tc-0.4541-5.938-0.9571-11.8559-1.4204-17.833c46.0024-12.4673,92.0737-18.5923,138.1157-18.6313\r\n\tc7.5254-16.3633,16.126-37.0762,22.3696-48.4688c27.4888,0.4346,56.3589,0.8389,86.1362,0.957\r\n\tc20.5948,35.1529,67.6425,71.0352,117.9941,89.5982c24.1357,8.8769,49.2969,13.9956,73.0083,13.4536\r\n\tc24.9243-0.6118,48.1328-7.5459,66.9321-22.8633c24.1748-19.7461,40.2822-52.7095,41.998-103.1504\r\n\tc37.8945-7.8906,73.8759-18.3257,106.7207-32.0752c-4.1231-10.248-7.5458-18.957-9.9034-25.0923l-34.3046-2.1303\r\n\tc-2.6036,3.4917-6.8047,5.6914-11.5587,5.415l-85.545-3.9258c-7.8418-0.3847-14.2714-6.9931-14.2714-14.874V13.585\r\n\tc0-7.8116,6.4296-13.9073,14.2714-13.5718l85.545,3.896c7.6933,0.4043,13.9658,6.8354,14.2422,14.5088l43.0927,2.6235\r\n\tc6.46,0.0791,12.5459,4.0835,14.9424,10.4453l60.7969,145.5723c76.5098-24.4414,166.6601-22.3008,256.1797,6.4604l-5.1983,16.146\r\n\tc-75.9765-24.4214-154.4384-23.0405-221.9336,1.6079l23.958,71.7554l-12.7636,4.8726l11.6592,29.5502\r\n\tC813.75,302.9736,829.6309,300.5766,846.0039,300.5766L846.0039,300.5766z M229.4102,373.7915\r\n\tc-18.3951-13.2949-40.982-21.1465-65.3838-21.1465c-30.9312,0-58.8838,12.5664-79.1231,32.835\r\n\tc-20.2593,20.2392-32.8056,48.1631-32.8056,79.084c0,30.8818,12.5463,58.8642,32.8056,79.1035\r\n\tc20.2393,20.2588,48.1919,32.7363,79.1231,32.7363c30.8525,0,58.8447-12.4775,79.0644-32.7363\r\n\tc20.2783-20.2393,32.7852-48.2217,32.7852-79.1035c0-7.003-0.6709-13.9268-1.9131-20.6241l-65.4336,23.5733\r\n\tc-1.2622,21.6592-19.1836,38.8808-41.2183,38.8808c-22.8335,0-41.2973-18.5029-41.2973-41.3271\r\n\tc0-22.834,18.4638-41.2676,41.2973-41.2676c2.9888,0,5.8882,0.3154,8.729,0.9463L229.4102,373.7915L229.4102,373.7915z\r\n\t M844.7012,423.8091c0.4931-0.0098,0.9765-0.0098,1.4599-0.0098c22.7744,0,41.2979,18.4336,41.2979,41.2676\r\n\tc0,22.8242-18.5235,41.3271-41.2979,41.3271s-41.3076-18.5029-41.3076-41.3271c0-10.5733,4.0049-20.2393,10.5536-27.5586\r\n\tl-27.124-68.8154c-7.8311,4.7841-14.9727,10.3271-21.3828,16.7871c-20.25,20.2392-32.7266,48.1631-32.7266,79.084\r\n\tc0,30.8818,12.4766,58.8642,32.7266,79.1035c20.2383,20.2588,48.2109,32.7363,79.1035,32.7363\r\n\tc30.8906,0,58.8438-12.4775,79.1035-32.7363c20.2589-20.2393,32.7852-48.2217,32.7852-79.1035\r\n\tc0-30.9209-12.5264-58.8448-32.7852-79.084c-20.2597-20.2686-48.2129-32.835-79.1035-32.835c-9.666,0-19.0176,1.2822-27.9726,3.541\r\n\tL844.7012,423.8091L844.7012,423.8091z M530.3584,115.8574c-88.6113-7.3974-166.6992-2.1401-228.5225,16.7974\r\n\tC360.2563,201.0859,520.6924,257.9282,530.3584,115.8574z"/>\r\n    </g>\r\n  </svg>\r\n'}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var s=t[a]={exports:{}};return e[a].call(s.exports,s,s.exports,n),s.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(607)})();