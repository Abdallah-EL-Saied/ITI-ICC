const productArea = document.getElementById("product-area");
const cartArea = document.getElementById("cart-area");
const totalCountEl = document.getElementById("total-count");
const totalPriceEl = document.getElementById("total-price");
const emptyMsg = document.getElementById("empty-cart");
const resetBtn = document.getElementById("reset-btn");

const products = {};
const cart = {};

document.querySelectorAll(".product").forEach((p) => {
	const id = p.dataset.id;
	products[id] = {
		el: p,
		stock: parseInt(p.dataset.stock),
		price: parseFloat(p.dataset.price),
		originalStock: parseInt(p.dataset.stock),
	};
});

function updateStocks() {
	for (let id in products) {
		const p = products[id];
		const badge = p.el.querySelector(".stock");
		if (p.stock <= 0) {
			p.el.style.display = "none";
		} else {
			p.el.style.display = "flex";
			badge.textContent = p.stock;
		}
	}
}

function updateSummary() {
	let count = 0,
		price = 0;
	for (let id in cart) {
		count += cart[id].count;
		price += cart[id].count * products[id].price;
	}
	totalCountEl.textContent = count;
	totalPriceEl.textContent = price.toFixed(2);
	emptyMsg.style.display = count === 0 ? "block" : "none";
}

function addToCart(id, imgSrc) {
	if (products[id].stock <= 0) return;
	products[id].stock--;

	if (cart[id]) {
		cart[id].count++;
		cart[id].badge.textContent = cart[id].count;
	} else {
		const item = document.createElement("div");
		item.className = "cart-item";
		item.setAttribute("draggable", "true");
		item.dataset.id = id;

		const img = document.createElement("img");
		img.src = imgSrc;

		const badge = document.createElement("div");
		badge.className = "count-badge";
		badge.textContent = "1";

		item.append(img, badge);
		cartArea.appendChild(item);

		cart[id] = { count: 1, badge, item };

		item.addEventListener("dragstart", (e) => {
			e.dataTransfer.setData("id", id);
			e.dataTransfer.setData("type", "cart");
		});
	}

	updateStocks();
	updateSummary();
}

productArea.addEventListener("dragstart", (e) => {
	const p = e.target.closest(".product");
	if (!p) return;
	const id = p.dataset.id;
	const img = p.querySelector("img").src;
	e.dataTransfer.setData("id", id);
	e.dataTransfer.setData("img", img);
	e.dataTransfer.setData("type", "product");
});

cartArea.addEventListener("dragover", (e) => e.preventDefault());

cartArea.addEventListener("drop", (e) => {
	e.preventDefault();
	const id = e.dataTransfer.getData("id");
	const img = e.dataTransfer.getData("img");
	const type = e.dataTransfer.getData("type");
	if (type === "product") addToCart(id, img);
});

productArea.addEventListener("dragover", (e) => e.preventDefault());

productArea.addEventListener("drop", (e) => {
	e.preventDefault();
	const id = e.dataTransfer.getData("id");
	const type = e.dataTransfer.getData("type");
	if (type === "cart" && cart[id]) {
		cart[id].count--;
		products[id].stock++;
		if (cart[id].count <= 0) {
			cart[id].item.remove();
			delete cart[id];
		} else {
			cart[id].badge.textContent = cart[id].count;
		}
		updateStocks();
		updateSummary();
	}
});

resetBtn.addEventListener("click", () => {
	Object.values(cart).forEach((c) => c.item.remove());
	for (let id in products) {
		products[id].stock = products[id].originalStock;
	}
	Object.keys(cart).forEach((id) => delete cart[id]);
	updateStocks();
	updateSummary();
});

updateStocks();
updateSummary();
