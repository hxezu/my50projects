const boxes = document.querySelectorAll('.box')

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes(){
    const triggerBottom = window.innerHeight / 5 * 4            //innerHeight : 창의 높이
                                                                //화면 높이의 80%지점 계산
    boxes.forEach(box =>{
        const boxTop = box.getBoundingClientRect().top          //각 박스의 상단 경계선이 창의 상단 경계선으로부터 얼마나 떨어져있는지

        if(boxTop < triggerBottom){                             //박스가 트리거 지점으로 올라왔다면
            box.classList.add('show')           
        }else{
            box.classList.remove('show')
        }
    })
}