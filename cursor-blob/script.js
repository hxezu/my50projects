document.addEventListener('DOMContentLoaded',()=>{
    const cursor = document.querySelector('#cursorBlob');
    const navLinks = document.querySelectorAll(".nav-link");
    let scale = 1

    document.addEventListener('mousemove', (e)=>{
        requestAnimationFrame(()=>{
            cursor.style.transform = 
            `translate(${e.pageX - cursor.offsetWidth / 2}px, ${e.pageY - cursor.offsetHeight / 2}px)
            scale(${scale})`
        })
    })

    navLinks.forEach((link) =>{
        link.addEventListener('mouseover', (e)=>{
            scale = 2.5
        })
        link.addEventListener('mouseleave', (e)=>{
            scale = 1
        })
    })
})
