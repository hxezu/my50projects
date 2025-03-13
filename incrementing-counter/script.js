const counters = document.querySelectorAll('.counter')

counters.forEach(counter =>{
    counter.innerText = '0'

    const updateCounter = () =>{
        const target = +counter.getAttribute('data-target')         // + : 문자열을 숫자로 변환
        const c = +counter.innerText

        const increment = target/200            //숫자가 200번에 걸쳐서 증가

        if(c<target){
            counter.innerText = `${Math.ceil(c+increment)}`     //현재 숫자에 increment 를 더한 후 올림
            setTimeout(updateCounter,1)                         //1ms 후에 함수 다시 실행
        }else{
            counter.innerText = target
        }
    }

    updateCounter()
})

