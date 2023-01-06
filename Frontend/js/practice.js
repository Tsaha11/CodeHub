const codingDiv=document.getElementsByClassName('difficulty');
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