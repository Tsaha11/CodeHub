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
    var mode;
    const url=window.location.href;
    if(url.includes('medium')==true){
        mode="medium";
    }
    else if(url.includes('hard')==true){
        mode="hard";
    }
    else{
        mode="easy";
    }
    fetch('/practice/seen',{
        method:'GET'
    }).then((data)=>{
        return data.json();
    }).then((data)=>{
        if(mode=="easy"){
            addGreenBorder(data.seenEasy)
        }
        else if(mode=="medium"){
            addGreenBorder(data.seenMedium);
        }
        else{
            addGreenBorder(data.seenHard);
        }
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
        if(seen){
            for(var i=0;i<seen.length;i++){
                if(seen[i]==id){
                    q.id='tick-green';
                }
            }
        }
    }
    progressBar();
}

for(const btn of doneBtn){
    btn.addEventListener('click',(er)=>{
        const id=er.target.id;
        var mode;
        const url=window.location.href;
        if(url.includes('medium')==true){
            mode="medium";
        }
        else if(url.includes('hard')==true){
            mode="hard";
        }
        else{
            mode="easy";
        }
        fetch(`/share/done`,{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id:id,
                mode:mode
            })
        }).then((data)=>{
            return data.json();
        }).then(result=>{
            if(mode=="easy"){
                addGreenBorder(result.seen);
            }
            else if(mode=="hard"){
                addGreenBorder(result.seen);
            }
            else{
                addGreenBorder(result.seen);
            }
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
    fetch('/logout',{
        method:'POST',
    }).then(result=>{
        console.log(result)
    }).catch(er=>{
        console.log(er);
    })
})