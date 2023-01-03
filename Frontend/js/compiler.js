const langBtn=document.querySelectorAll('.language button');
const file=document.querySelector('.file');
const codeEditor=document.getElementById('codeEditor');
const resetBtn=document.getElementById('resetBtn');
const copyBtn=document.getElementById('copyBtn');
resetBtn.addEventListener('click',(er)=>{
    codeEditor.value='';
})
copyBtn.addEventListener('click',(er)=>{
    navigator.clipboard.writeText(codeEditor.value);
})
for(const lang of langBtn){
    lang.addEventListener('click',(er)=>{
        const id=er.target.id;
        file.innerHTML=id;
    })
}
