let divStar = document.querySelectorAll('path');

divStar.forEach((star, index) =>{

star.addEventListener('click',()=> {
    divStar.forEach((star, index2)=>{
        index >= index2 ? star.classList.add('pathAcceso'):star.classList.remove('pathAcceso')
        })
    })
})