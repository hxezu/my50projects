const fill = document.querySelector ('.icon-fill')
const icons = document.querySelectorAll('.icon')
const body = document.body

body.addEventListener('dragstart', dragStart)
body.addEventListener('dragend', dragEnd)

for(const icon of icons){
    icon.addEventListener('dragover',dragOver);
    icon.addEventListener('dragenter',dragEnter);
    icon.addEventListener('dragleave',dragLeave);
    icon.addEventListener('drop',dragDrop);

    function dragStart(e){
        if(!e.target.classList.contains('icon-fill')){
            e.preventDefault()
            return
        }
        fill.className += ' hold'
        setTimeout(()=>fill.className = 'invisible',0)
    }

    function dragEnd(){
        fill.className = 'icon-fill'
    }
    function dragOver(e){
        e.preventDefault()
    }
    function dragEnter(e){
        e.preventDefault()
        this.className += ' hovered'
    }
    function dragLeave(){
        this.className = 'icon'
    }
    function dragDrop(){
        this.className = 'icon'
        this.append(fill)
    }
}
