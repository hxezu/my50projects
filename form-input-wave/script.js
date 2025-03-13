const labels = document.querySelectorAll('.form-control label')

labels.forEach(label=>{
    label.innerHTML = label.innerHTML
    .split('')
    //각각의 문자에 span 태그 추가
    //transition-delay 를 idx*50ms 로 설정
    .map((letter, idx)=> `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
    .join('')
})
