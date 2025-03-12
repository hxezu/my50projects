const bg = document.querySelector('.bg')
const loading = document.querySelector('.loading-text');

let load =0;
let int = setInterval(blurring, 30)                 //blurring 함수를 0.03 초 마다 반복 실행

function blurring(){
    load++;

    if(load>99){
        clearInterval(int);
    }

    loading.innerText = `${load}%`
    loading.style.opacity = scale(load, 0, 100, 1, 0)
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`        /*입력 범위:0~100 출력 범위: 30px 흐림 -> 0px 흐림 */
}

const scale = (num, in_min, in_max, out_min, out_max)=>{
    return ((num - in_min) * (out_max-out_min)) / (in_max-in_min) + out_min
}
