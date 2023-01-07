const div=document.querySelectorAll('.inbox-selector div');
const shareBtn=document.querySelector('.share-button');
const username=document.getElementById('usernameField');
const textarea=document.querySelector('.share-code textarea');
const body=document.querySelector('body');
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
setTimeout(function () {
    const popup=document.querySelector('.contents');
    popup.classList.remove('popclass');

}, 3000);
function remove(div){
    setTimeout((div) => {
        div.classList.remove('popclass');
    }, 2000);
}
shareBtn.addEventListener('click',(er)=>{
    fetch('http://localhost:3000/share',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            code:textarea.value,
            username:username.value
        })
    }).then((result)=>{
        return result.json();
    }).then((data)=>{
        if(data){
            alert(`${data.msg}`);
        }
    }).catch((er)=>{

    })
})
