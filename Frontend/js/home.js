const boxes=document.getElementsByClassName('box');
const quoteText=document.querySelector('.quote-body span');
const clipboard=document.querySelector('.clipboard');
const volume=document.querySelector('.volume')
for(const box of boxes){
    box.addEventListener('click',(er)=>{
        window.location.href='/'+box.id;
    })
}
clipboard.addEventListener('click',(er)=>{
    navigator.clipboard.writeText(quoteText.innerHTML);
})
volume.addEventListener('click',(er)=>{
    let utterance=new SpeechSynthesisUtterance(`${quoteText.innerHTML}`);
    speechSynthesis.speak(utterance)
})
const btn=document.getElementById('new-qoute');
btn.addEventListener('click',(er)=>{
    window.location.reload();
})
