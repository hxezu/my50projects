document.addEventListener('DOMContentLoaded',()=>{
    const menuBtn = document.querySelectorAll('.fa-ellipsis');
    const dropdownMenu = document.querySelectorAll('.dropdown-menu');

    menuBtn.forEach((btn, index)=>{
        btn.addEventListener('click', (e)=>{
            e.stopPropagation();

            const currentDropdown = dropdownMenu[index];
            const isActive = currentDropdown.classList.contains('active');

            dropdownMenu.forEach(menu=>{
                menu.classList.remove('active')
            })
            menuBtn.forEach(btn =>{
                btn.classList.remove('hidden')
            })

            if(!isActive){
                currentDropdown.classList.add('active')
                btn.classList.add('hidden')
            }
        })
    })

    document.addEventListener('click', ()=>{
        dropdownMenu.forEach(menu =>{
            menu.classList.remove('active')
        })
        menuBtn.forEach(btn=>{
            btn.classList.remove('hidden')
        })
    })
})
