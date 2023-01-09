const link=document.getElementsByTagName('a');
const img=document.querySelector('.images');
const removeOther=()=>{
    for(const val of link){
        if(val.classList[1]=='active'){
            val.classList.remove('active');
        }
    }
}
for(const val of link){
    val.addEventListener('click',(er)=>{
        var test=er.target;
        removeOther();
        test.classList.add('active');
        const c=test.classList[0];
        if(c=='btn1'){
            img.style.marginLeft='0%'
        }
        else if(c=='btn2'){
            img.style.marginLeft='-100%'
        }
        else if(c=='btn3'){
            img.style.marginLeft='-200%'
        }
        else if(c=='btn4'){
            img.style.marginLeft='-300%'
        }
        else{
            img.style.marginLeft='-400%'
        }
    })
}