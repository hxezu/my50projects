const textarea = document.getElementById('textarea')
const tagsEl = document.getElementById('tags')

//페이지가 로드되면 자동으로 포커스 맞춤
textarea.focus()

//textarea에 텍스트를 작성했을 때 밑에 태그 생기게 즉, tag 추가
textarea.addEventListener('keyup',(e)=>{
    createTags(e.target.value)

    //사용자가 엔터를 누르면 10ms 후 textarea 를 비움
    if(e.key == 'Enter'){
        setTimeout(()=>{
            e.target.value=''
        },10)

        randomSelect()
    }
})

function createTags(input){
    const tags = input
    .split(',')
    .filter(tag => tag.trim()!='')                  //공백만 있는 태그는 제거
    .map(tag => tag.trim())                         //앞뒤 공백 제거

    tagsEl.innerHTML=''

    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')                 //span 태그의 클래스 이름을 tag 로 설정
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    });
}

//랜덤
function randomSelect(){
  //랜덤으로 태그를 30번 번갈아가며 하이라이트
  const times = 30

  const interval = setInterval(()=>{        //setInterval: 0.1초마다 실행되는 코드
    const randomTag = pickRandomTag()
    if(randomTag != undefined){
        highlightTag(randomTag)

        setTimeout(()=>{                    //setTimeout: 0.1초 후 원래대로
            unHighlightTag(randomTag)
        },100)
    }
  },100)

  //최종으로 하나 태그 하이라이트

  setTimeout(()=>{                          //30*0.1초 반복 후 애니매이션 멈춤 즉, clearInterval
    clearInterval(interval)
    
    setTimeout(()=>{                        //애니매이션이 멈추면 최종 선택
        const randomTag = pickRandomTag()
        highlightTag(randomTag)
    },100)

  },times * 100)
}

function pickRandomTag(){
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag){
    tag.classList.add('highlight')
}

function unHighlightTag(tag){
    tag.classList.remove('highlight')
}