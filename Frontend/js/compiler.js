const langBtn=document.querySelectorAll('.language button');
const file=document.querySelector('.file');
const codeEditor=document.getElementById('codeEditor');
const resetBtn=document.getElementById('resetBtn');
const copyBtn=document.getElementById('copyBtn');
const input=document.getElementById('field-input');
const output=document.getElementById('field-output');
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
const runBtn=document.getElementById('runBtn');
runBtn.addEventListener('click',(er)=>{
    if(codeEditor.value=='' || file.innerHTML=='' || input.value==''){
        alert('Please fill the necessary criteria');
        // dialog popping box ayega baad mein
    }
    fetch('http://localhost:3000/compiler',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            codeText:codeEditor.value,
            lang:file.innerHTML,
            stdin:input.value
        })
    }).then(result=>{
        return result.json();
    }).then(data=>{
        /// error handling baki hai
        output.value=data.body.output;
    })
    .catch(er=>{
        console.log(er);
    })
})
