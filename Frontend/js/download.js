const downloadBtn=document.querySelector('.downloadBtn');
downloadBtn.addEventListener('click',(er)=>{
    const textContent=document.getElementById('codeEditor').value;
    const filename=document.querySelector('.file').innerHTML;
    const link=document.createElement('a');
    const blob=new Blob([textContent],{
        type:'plain/text'
    });
    const fileUrl=URL.createObjectURL(blob);
    link.setAttribute('href',fileUrl);
    link.setAttribute('download',filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})