
document.addEventListener('DOMContentLoaded',()=>{
    const pageCreateBtn = document.getElementById('pageCreateButton')
    pageCreateBtn.addEventListener('click',(e)=>{
        e.preventDefault()
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            body: JSON.stringify({
              title: '',
              body: '',
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            //.then((json) => console.log(json));
            .then((json) => makePageTitle(json))
    })

    const notionList = document.getElementById('notionList');
    const makePageTitle = (data)=>{
        const i = document.createElement('i')
        const li = document.createElement('li')
        const a = document.createElement('a')
        i.className = 'fa-regular fa-file-lines'
        a.href = '#'
        a.id = data['id'];
        a.textContent = data['title'] == ''? '새 페이지': data['title']
        a.addEventListener('click',(e)=>{
            e.preventDefault()
            fetch('http://localhost:3000/posts/'+e.currentTarget.id)
            .then((response) => response.json())
            .then((json) => {
                setContents(json)
            })
        })
        li.appendChild(i)
        li.appendChild(a)
        notionList.appendChild(li)
    }
    
    const getPageTitleist=()=>{
        fetch('http://localhost:3000/posts')
        .then((response) => response.json())
        .then((json) => {
            json.forEach( (data) => {makePageTitle(data)});
            setContents(json[0])
        })
    }
    getPageTitleist()

    const pageId = document.getElementById('pageId')
    const contentTitle = document.getElementById('contentTitle')
    const contentBody = document.getElementById('contentBody')
    const setContents = (data)=>{
        pageId.textContent = data['id']
        contentTitle.value = data['title']
        contentBody.value = data['body']

        history.back = []
        history.forward = []
    }

    contentTitle.addEventListener('keydown',(e)=>{
        if(e.keyCode ==13){
            e.preventDefault()
        }
    })

    const pageSaveButton =document.getElementById('pageSaveButton');
    pageSaveButton.addEventListener('click',(e)=>{
        
        if(confirm('저장하시겠습니까?')){
            fetch('http://localhost:3000/posts/'+pageId.textContent, {
                method: 'PUT',
                body: JSON.stringify({
                  title : contentTitle.value,
                  body : contentBody.value
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
                .then((response) => response.json())
                .then((json) => {
                    notionList.querySelector("a[id='"+pageId.textContent+"']").textContent = contentTitle.value
                    alert('저장되었습니다')
                });     
        }
    })
    const history={
        'back' :[],
        'forward':[]
    }
    contentBody.addEventListener('keydown',(event)=>{
        if(event.keyCode==13){
            if(history.forward.length > 0){
                history.forward  = []
            }
            history.back.push(event.currentTarget.value)
        }
    })

    const historyBackBtn = document.getElementById('historyBackButton')
    historyBackBtn.addEventListener('click', (e)=>{
        if(history.back.length ==0){
            return;
        }
        history.forward.push(contentBody.value)
        contentBody.value = history.back.pop()
    })

    const historyForwardBtn = document.getElementById('historyForwardButton')
    historyForwardBtn.addEventListener('click',(e)=>{
        if(history.forward.length ==0){
            return;
        }
        history.back.push(contentBody.value)
        contentBody.value = history.forward.pop()
    })
})