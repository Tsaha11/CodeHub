const codingDiv=document.getElementsByClassName('difficulty');
const logoutBtn=document.querySelector('.logout-btn button');
const doneBtn=document.querySelectorAll('.tick i');
// console.log(doneBtn)
const progressBar=()=>{
    const question=document.querySelectorAll('.question');
    var count=0;
    for(const q of question){
        if(q.id=='tick-green'){
            count++;
        }
    }
    const progress=document.querySelector('.circular-progress');
    const percent=progress.firstElementChild;
    progress.style.background=`conic-gradient(#6c18da ${(count/20)*360}deg,#ededed 0deg)`;
    percent.innerHTML=`${(count/20)*100}%`;

}
const addGreen=()=>{
    fetch('http://localhost:3000/practice/seen',{
        method:'GET'
    }).then((data)=>{
        return data.json();
    }).then((data)=>{
        addGreenBorder(data.seen);
    }).catch((er)=>{
        console.log(er);
    })
}
addGreen();
progressBar();

const addGreenBorder=(seen)=>{
    const question=document.querySelectorAll('.question');
    for(const q of question){
        const icon=q.lastElementChild.firstElementChild.firstElementChild;
        const id=icon.id;
        if(seen.includes(id)==true){
            q.id='tick-green'
        }
    }
    progressBar();
}

for(const btn of doneBtn){
    btn.addEventListener('click',(er)=>{
        const id=er.target.id;
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
            addGreenBorder(result.seen);
        }).catch((er)=>{
            console.log(er);
            alert('error from server side');
        })
    })
}
for(const div of codingDiv){
    div.addEventListener('click',(er)=>{
        const add=div.classList[1];
        window.location.href=`/practice/${add}`;
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