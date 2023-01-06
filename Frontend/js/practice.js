const codingDiv=document.getElementsByClassName('difficulty');
const logoutBtn=document.querySelector('.logout-btn button');
const doneBtn=document.querySelectorAll('.tick i');

// console.log(doneBtn)
for(const btn of doneBtn){
    btn.addEventListener('click',(er)=>{
        const id=er.target.id;
        console.log(id);
        fetch('http://localhost:3000/share/done',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id:id
            })
        }).then((data)=>{
            return data.json();
        }).then(result=>{
            console.log(result)
        }).catch((er)=>{
            console.log('error')
            console.log(er);
        })
    })
}
for(const div of codingDiv){
    div.addEventListener('click',(er)=>{
        const add=div.classList[1];
        window.location.href=`/practice/${add}`;
    })
}
const icons=document.querySelectorAll('.tick i');
for(const icon of icons){
    icon.addEventListener('click',(er)=>{
        const id=er.target;
        const parent=id.parentNode.parentNode.parentNode.classList.add('tick-green');
    })
}
logoutBtn.addEventListener('click',(er)=>{
    const child=er.target;
    fetch('http://localhost:3000/logout',{
        method:'POST',
    }).then(result=>{
        console.log(result)
    }).catch(er=>{
        console.log(er);
    })
})