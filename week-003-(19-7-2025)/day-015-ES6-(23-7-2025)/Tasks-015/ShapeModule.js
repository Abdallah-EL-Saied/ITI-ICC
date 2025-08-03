class Shape {
    #color = "";

    constructor(color) {
        if (new.target.name === "Shape") {
            throw new Error("Sorry, Abstract Class");
        } else {
            this.Color = color;
        }
    }

    set Color(value) {
        if (typeof value === "string" && value.trim().length > 0) {
            this.#color = value;
        }
    }

    get Color() {
        return this.#color;
    }

    DrawShape() {
        console.log(`Shape Color: ${this.Color}`);
    }
}

export default Shape;
