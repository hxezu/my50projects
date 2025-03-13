const container = document.querySelector('.container')

// 키가 입력되면  기존에 key 는 안보이게, key small 을 추가 후에 보이게

window.addEventListener('keydown', (event)=>{
    container.innerHTML = 
    `
        <div class="key">
            ${event.key=== ' '? 'Space' : event.key}
            <small>event.key</small>
        </div>

        <div class="key">
            ${event.keyCode}
            <small>event.keycode</small>
        </div>

        <div class="key">
            ${event.code}
            <small>event.code</small>
        </div>

    `
})