import Star from "./stars"

function drawStars() {
    let container = document.querySelector("#bg3");
    while (container.firstChild) { container.removeChild(container.firstChild); }
    let stars = [];
    for (let i=0;i<200;i++) {
        let x = rand(0,100);
        let y = rand(0,100);
        let h = rand(1,359);
        let s = rand(50,100);
        let l = rand(80,100);
        let radius = rand(1,4);
        stars.push(new Star({x:x,y:y,color:`hsl(${h},${s}%,${l}%)`,radius:radius}));
    }
    return stars;
}

function rand(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default drawStars;