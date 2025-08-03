document.addEventListener("DOMContentLoaded", () => {
	const num1 = document.getElementById("num1");
	const num2 = document.getElementById("num2");
	const num3 = document.getElementById("num3");
	const num4 = document.getElementById("num4");

	const updateAddition = () => {
		const result = +num1.value + +num2.value;
		document.getElementById("myvaladd").innerText = result;
	};

	const updatemultiplication = () => {
		const multiplicationResult = +num3.value * +num4.value;
		document.getElementById("myvaluemultiplication").innerText =
			multiplicationResult;
	};

	num1.addEventListener("input", updateAddition);
	num2.addEventListener("input", updateAddition);
	num3.addEventListener("input", updatemultiplication);
	num4.addEventListener("input", updatemultiplication);

	updateAddition();
	updatemultiplication();
});
