import{i as s}from"./vendor-77e16229.js";import{i as c}from"./bi_x-octagon-f8a7bee3.js";const n="/goit-js-hw-10/assets/bi_check2-circle-449d10c7.svg",m=document.querySelector(".form");document.querySelector('[type="submit"]');m.addEventListener("submit",function(t){t.preventDefault();const o=Number(document.querySelector('[name="delay"]').value),i=document.querySelector('[name="state"]:checked');new Promise((e,r)=>{setTimeout(()=>{i.value==="fulfilled"?e(o):r(o)},o)}).then(e=>{s.success({message:`Fulfilled promise in ${e}ms`,messageColor:"#FFF",backgroundColor:"#59A10D",position:"topRight",iconUrl:n})}).catch(e=>{s.error({message:`Rejected promise in ${e}ms`,messageColor:"#FFF",backgroundColor:"#EF4040",position:"topRight",iconUrl:c})})});
//# sourceMappingURL=2-snackbar-3e36ea8f.js.map