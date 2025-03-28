console.clear()
const{ gsap, Splitting } = window;

Splitting();

gsap.set('.cards-wrapper', {autoAlpha : 1})

gsap.timeline({
    defaults:{
        duration : 1.25,
        stagger : 0.125,
        ease : 'expo.inOut'
    },
})
.fromTo('.card-image-wrapper',{yPercent: 110}, {yPercent : 0},0)
.fromTo('.card-image-outer',{yPercent: -110}, {yPercent : 0},0)
.set('.cards-wrapper, .card',{pointerEvents : 'all'}, '-=1')