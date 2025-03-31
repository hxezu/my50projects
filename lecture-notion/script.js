
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
        contentTitle.textContent = data['title']
        contentBody.textContent = data['body']
    }

    contentTitle.addEventListener('keydown',(e)=>{
        if(e.keyCode ==13){
            e.preventDefault()
        }
    })

    const pageSaveButton =document.getElementById('historyBackButton');
    pageSaveButton.addEventListener('click',(e)=>{
        if(confirm('저장하시겠습니까?')){
            fetch('http://localhost:3000/posts'+pageId.textContent, {
                method: 'PUT',
                body: JSON.stringify({
                  title : contentTitle.innerHTML,
                  body : contentBody.innerHTML
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
                .then((response) => response.json())
                .then((json) => console.log(json));
        }
    })
    
})