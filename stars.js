export default class Star {
    constructor(obj) {
        this.radius = obj.radius;
        this.color = obj.color;
        this.x = obj.x;
        this.y = obj.y;
        this.element = document.createElement("div");
        this.element.className = "star";
        document.querySelector("#bg3").appendChild(this.element);
        this.element.style.backgroundColor = this.color;
        this.element.style.width = this.element.style.height = `${this.radius}px`;
        this.element.style.top = `${this.y}vh`;
        this.element.style.left = `${this.x}vw`;
        this.element.style.boxShadow = `0 0 ${this.radius*2}px ${this.radius/2}px ${this.color}`;
    }
}