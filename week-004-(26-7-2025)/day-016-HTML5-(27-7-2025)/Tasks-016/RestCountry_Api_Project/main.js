// Elements
const slider = document.getElementById("slider");
const btnLeft = document.querySelector(".arrow-left");
const btnRight = document.querySelector(".arrow-right");
const searchBtn = document.getElementById("searchBtn");

let currentSet = [];
let currentIndex = 2; // center in a 5-item array

// Create country card
function createCard(country, type) {
    if (!country) return document.createElement("div");

    const name = country.name;
    const region = country.region;
    const population = (country.population / 1_000_000).toFixed(1) + " M";
    const flag = country.flag || country.flags?.png;
    const language = country.languages?.[0]?.name || "N/A";
    const currency = country.currencies?.[0]?.name || "N/A";

    const div = document.createElement("div");
    div.className = "country-box";
    div.classList.add(type === "active" ? "active" : "side");

    div.innerHTML = `
    <div class="card-type">${type}</div>
        <div class="flag">
            <img src="${flag}" alt="${name} flag" />
        </div>
        <div class="data">
        <div class="main-data">
            <h2>${name}</h2>
            <p class="continent">${region}</p>
        </div>
        <div class="sub-data">
            <p><i class="fas fa-users"></i> ${population}</p>
            <p><i class="fas fa-language"></i> ${language}</p>
            <p><i class="fas fa-money-bill-wave"></i> ${currency}</p>
        </div>
    </div>`;
    return div;
}

// Render 3 cards based on currentSet
function renderCurrentSet() {
    const len = currentSet.length;
    const [left, center, right] = [
        currentSet[(currentIndex - 1 + len) % len],
        currentSet[currentIndex],
        currentSet[(currentIndex + 1) % len],
    ];

    slider.innerHTML = "";
    if (left) slider.appendChild(createCard(left, "neighbor"));
    if (center) slider.appendChild(createCard(center, "active"));
    if (right) slider.appendChild(createCard(right, "neighbor"));
}

// Load main country and extended neighbors
function loadCountryAndNeighbors(mainCountry) {
    let borders = mainCountry.borders || [];

    // Special handling for Egypt: remove Israel, add Palestine
    if (
        mainCountry.name.toLowerCase() === "egypt" ||
        mainCountry.borders.includes("ISR")
    ) {
        borders = borders.filter((code) => code !== "ISR");
        if (!borders.includes("PSE")) {
            borders.push("PSE");
        }
    }

    const leftCode = borders[0];
    const rightCode = borders[1];

    const fetchLeft = leftCode
        ? fetch(`https://restcountries.com/v2/alpha/${leftCode}`).then((res) =>
              res.json()
          )
        : Promise.resolve(null);

    const fetchRight = rightCode
        ? fetch(`https://restcountries.com/v2/alpha/${rightCode}`).then((res) =>
              res.json()
          )
        : Promise.resolve(null);

    Promise.all([fetchLeft, fetchRight]).then(([leftCountry, rightCountry]) => {
        //const leftNeighborCode = leftCountry?.borders?.[0];
        //const rightNeighborCode = rightCountry?.borders?.[1];
        /**
         *! Added by Abdullah Shokr
         */
        let leftNeighborCode;
        if (leftCountry.borders[0] === "ISR") {
            leftNeighborCode = leftCountry.borders[1];
        } else {
            leftNeighborCode = leftCountry.borders[0];
        }
        let rightNeighborCode;
        if (rightCountry.borders[0] === "ISR") {
            rightNeighborCode = rightCountry.borders[1];
        } else {
            rightNeighborCode = rightCountry.borders[0];
        }

        const fetchFarLeft = leftNeighborCode
            ? fetch(
                  `https://restcountries.com/v2/alpha/${leftNeighborCode}`
              ).then((res) => res.json())
            : Promise.resolve(null);

        const fetchFarRight = rightNeighborCode
            ? fetch(
                  `https://restcountries.com/v2/alpha/${rightNeighborCode}`
              ).then((res) => res.json())
            : Promise.resolve(null);

        Promise.all([
            fetchFarLeft,
            fetchLeft,
            Promise.resolve(mainCountry),
            fetchRight,
            fetchFarRight,
        ]).then((countries) => {
            currentSet = countries.filter(Boolean);
            currentIndex = 2;
            renderCurrentSet();
        });
    });
}

// Search handler
searchBtn.addEventListener("click", () => {
    const input = document.getElementById("search").value.trim().toLowerCase();
    if (!input || !/^[a-z\s]+$/i.test(input)) {
        alert("Please enter a valid country name");
        return;
    }

    fetch(`https://restcountries.com/v2/name/${input}`)
        .then((res) => res.json())
        .then((data) => {
            if (!Array.isArray(data) || !data[0]) {
                alert("Not Found");
                return;
            }

            const country = data[0];

            if (country.name.toLowerCase() === "israel") {
                alert("Not Found");
                return;
            }

            loadCountryAndNeighbors(country);
        });
});

// Arrow navigation
btnLeft.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentSet.length) % currentSet.length;
    renderCurrentSet();
});

btnRight.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentSet.length;
    renderCurrentSet();
});
