//클래스 이름이 panel 인 요소를 모두 선택해서 NodeList로 저장
const panels = document.querySelectorAll('.panel')

//panels => div.panel 들
panels.forEach(panel=>{
    panel.addEventListener('click', ()=>{
        removeActiveClasses()
        //선택된 panel 에만 클래스 추가
        panel.classList.add('active')
    })
})

//모든 panel 들에서 active 를 전부 제거
function removeActiveClasses(){
    panels.forEach(panel=>{
        panel.classList.remove('active')
    })
}
