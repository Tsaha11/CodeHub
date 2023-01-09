const div=document.querySelectorAll('.inbox-selector div');
const shareBtn=document.querySelector('.share-button');
const username=document.getElementById('usernameField');
const textarea=document.querySelector('.share-code textarea');
const body=document.querySelector('body');
const deleteBtn=document.querySelectorAll('.delete-code button');
const closeBtn=document.getElementsByClassName('close-btn')[0];
closeBtn.addEventListener('click',(er)=>{
    const val=document.querySelector('.contents');
    val.classList.remove('popclass');
})
for(const btn of deleteBtn){
    btn.addEventListener('click',(er)=>{
        const child=er.target;
        const parent=child.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.innerText;
        // time stamp is unique
        fetch('/share/inbox/delete',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                timeStamp:parent
            })
        }).then((result)=>{
            return result.json();
        }).then((data)=>{
            alert(`message deleted`);
            location.reload();
        })
        .catch((er)=>{
            alert('Error from server side');
        })
    })
}
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
if(shareBtn!=null){
    shareBtn.addEventListener('click',(er)=>{
        fetch('/share',{
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
            window.location.href='/share/inbox'
        }).catch((er)=>{
            alert('Failed : error from server side');
        })
    })
    
}