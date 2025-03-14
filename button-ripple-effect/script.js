const buttons = document.querySelectorAll('.ripple')

buttons.forEach(button =>{
    button.addEventListener('click', function (e){
        //클릭한 위치의 좌표
        const x = e.pageX
        const y = e.pageY

        //버튼의 위쪽/왼쪽 끝의 위치
        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft

        //버튼 안에서의 상대적인 클릭 위치
        const xInside = x - buttonLeft - 10        //버튼 왼쪽 끝에서 클릭 지점 까지 거리
        const yInside = y - buttonTop - 10
        
        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside +'px'

        this.appendChild(circle)
        setTimeout(()=>circle.remove(), 500)
    })
})