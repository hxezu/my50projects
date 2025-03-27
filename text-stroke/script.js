const container = document.querySelector('.container');

document.body.addEventListener('mousemove',e =>{
    const x = e.clientX;
    const y = e.clientY - 35;
    gsap.to(container,{
        y: y
    });
    gsap.to('.menu-mask',{
        y: -y
    });
})
