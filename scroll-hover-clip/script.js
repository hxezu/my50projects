gsap.registerPlugin(ScrollTrigger)

const textEl = gsap.utils.toArray('.text');

textEl.forEach(text=>{
    gsap.to(text,{
        backgroundSize : '100%',
        ease : 'none',
        scrollTrigger:{
            trigger: text,
            start : 'center 80%',
            end: 'center 30%',
            scrub :1
        }
    })
})
