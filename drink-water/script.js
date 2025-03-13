const smallCups = document.querySelectorAll('.cup-small')
const liters = document.getElementById('liters')
const percentage = document.getElementById('percentage')
const remained = document.getElementById('remained')

updateBigCup()

smallCups.forEach((cup, idx)=>{
    cup.addEventListener('click', ()=> highlightCups(idx))
})

function highlightCups(idx){
    //클릭한 작은 컵이 채워져있을 때 다시 클릭하면 물을 줄이는 동작 제어
    if(idx===7 && smallCups[idx].classList.contains("full"))
        idx--;
    else if(smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full'))
        idx--;
    //현재 클릭한 컵이 채워진 상태이면서 그 다음 컵이 비어있다면 현재 컵을 비우도록


    //클릭한 컵까지는 .full 클래스 추가 이후 컵들은 .full 제거
    smallCups.forEach((cup,idx2) =>{
        if(idx2 <= idx){
            cup.classList.add('full')
        }else{
            cup.classList.remove('full')
        }
    })
    updateBigCup()
}

function updateBigCup(){
    const fullCups = document.querySelectorAll('.cup-small.full').length
    const totalCups = smallCups.length

    if(fullCups===0){
        percentage.style.visibility = 'hidden'
        percentage.style.height = 0
    }else{
        percentage.style.visibility = 'visible'
        percentage.style.height = `${fullCups/totalCups * 330}px`
        percentage.innerText = `${fullCups/totalCups * 100}%`
    }

    if(fullCups===totalCups){
        remained.style.visibility = 'hidden'
        remained.style.height = 0
    }else{
        remained.style.visibility = 'visible'
        liters.innerText = `${2-(250 * fullCups /1000)}L`
    }
}
