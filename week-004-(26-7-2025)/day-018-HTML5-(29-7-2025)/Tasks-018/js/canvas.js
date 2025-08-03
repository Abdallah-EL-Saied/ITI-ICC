const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const sizePicker = document.getElementById("sizePicker");
const shapeSelect = document.getElementById("shapeSelect");

let mode = "single";
let drawing = false;

const undoStack = [];
const redoStack = [];

function resizeCanvas() {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	saveState();
}

function saveState() {
	undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
	if (undoStack.length > 50) undoStack.shift();
	redoStack.length = 0;
}

function restoreState(stackFrom, stackTo) {
	if (stackFrom.length > 0) {
		const state = stackFrom.pop();
		stackTo.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
		ctx.putImageData(state, 0, 0);
	}
}

function drawShape(x, y) {
	const size = 50;
	ctx.fillStyle = colorPicker.value;
	ctx.beginPath();

	const shape = shapeSelect.value;
	if (shape === "square") {
		ctx.fillRect(x - size / 2, y - size / 2, size, size);
	} else if (shape === "circle") {
		ctx.arc(x, y, size / 2, 0, Math.PI * 2);
		ctx.fill();
	} else if (shape === "triangle") {
		ctx.moveTo(x, y - size / 2);
		ctx.lineTo(x - size / 2, y + size / 2);
		ctx.lineTo(x + size / 2, y + size / 2);
		ctx.closePath();
		ctx.fill();
	}

	saveState();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

canvas.addEventListener("mousedown", (e) => {
	if (mode === "draw" || mode === "eraser") {
		drawing = true;
		ctx.beginPath();
		ctx.moveTo(e.offsetX, e.offsetY);
	}
});

canvas.addEventListener("mouseup", () => {
	if (drawing && (mode === "draw" || mode === "eraser")) {
		saveState();
	}
	drawing = false;
});

canvas.addEventListener("mouseleave", () => {
	drawing = false;
});

canvas.addEventListener("mousemove", (e) => {
	if (drawing && (mode === "draw" || mode === "eraser")) {
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.strokeStyle = mode === "eraser" ? "#ffffff" : colorPicker.value;
		ctx.lineWidth = sizePicker.value;
		ctx.lineCap = "round";
		ctx.stroke();
	}
});

canvas.addEventListener("click", (e) => {
	const x = e.offsetX;
	const y = e.offsetY;

	if (mode === "single") {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawShape(x, y);
	} else if (mode === "multiple") {
		drawShape(x, y);
	}
});

document.getElementById("mode-single").onclick = () => (mode = "single");
document.getElementById("mode-multiple").onclick = () => (mode = "multiple");
document.getElementById("mode-draw").onclick = () => (mode = "draw");
document.getElementById("mode-eraser").onclick = () => (mode = "eraser");

document.getElementById("undo").onclick = () =>
	restoreState(undoStack, redoStack);
document.getElementById("redo").onclick = () =>
	restoreState(redoStack, undoStack);

document.getElementById("clear-all").onclick = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	saveState();
};
