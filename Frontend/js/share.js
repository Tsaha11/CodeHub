const div=document.querySelectorAll('.inbox-selector div');
for(const d of div){
    d.addEventListener('click',(er)=>{
        if(er.target.classList.contains('inbox-div')==true){
            window.location.href='/share/inbox';
        }
        else{
            window.location.href='/share';
        }
    })
}