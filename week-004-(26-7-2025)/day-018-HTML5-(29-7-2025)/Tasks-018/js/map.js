let mapVisible = false;
let detailsVisible = false;
let map;
let marker;

const mapElement = document.getElementById("map");
const detailsElement = document.getElementById("details");

document.getElementById("toggleMap").addEventListener("click", () => {
	mapVisible = !mapVisible;
	mapElement.classList.toggle("hidden");

	if (mapVisible) {
		getLocationAndShowMap();
		document.getElementById("toggleMap").innerText = "Hide Map";
	} else {
		document.getElementById("toggleMap").innerText = "Show Map";
	}
});

document.getElementById("toggleDetails").addEventListener("click", () => {
	detailsVisible = !detailsVisible;
	detailsElement.classList.toggle("hidden");

	if (detailsVisible) {
		getLocationAndShowDetails();
		document.getElementById("toggleDetails").innerText = "Hide Details";
	} else {
		document.getElementById("toggleDetails").innerText = "Show Details";
	}
});

//========================================== Leaflet.js =======================================

function getLocationAndShowMap() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;

				if (!map) {
					map = L.map("map").setView([lat, lon], 17);

					L.tileLayer(
						"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
						{
							attribution: "&copy; OpenStreetMap contributors",
						}
					).addTo(map);

					marker = L.marker([lat, lon])
						.addTo(map)
						.bindPopup("📍 You are here!")
						.openPopup();
				} else {
					map.setView([lat, lon], 17);
					marker.setLatLng([lat, lon]).update();
				}
			},
			showError,
			{ enableHighAccuracy: true }
		);
	} else {
		mapElement.innerText = "Geolocation is not supported by this browser.";
	}
}

//========================================== Google =======================================

// function getLocationAndShowMap() {
// 	if (navigator.geolocation) {
// 		navigator.geolocation.getCurrentPosition(
// 			(position) => {
// 				const lat = position.coords.latitude;
// 				const lon = position.coords.longitude;
// 				const location = new google.maps.LatLng(lat, lon);

// 				const specs = {
// 					zoom: 18,
// 					center: location,
// 					mapTypeId: google.maps.MapTypeId.ROADMAP,
// 				};

// 				map = new google.maps.Map(mapElement, specs);

// 				marker = new google.maps.Marker({
// 					position: location,
// 					map: map,
// 					title: "You are here!",
// 					animation: google.maps.Animation.DROP,
// 				});
// 			},
// 			showError,
// 			{ enableHighAccuracy: true }
// 		);
// 	} else {
// 		mapElement.innerText = "Geolocation is not supported by this browser.";
// 	}
// }

function getLocationAndShowDetails() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;
				const accuracy = position.coords.accuracy;
				const timestamp = new Date(position.timestamp);

				detailsElement.innerHTML = `
            <div class="details">
                <label>Latitude (°)</label>
                <input type="text" value="${lat}" disabled />
                <label>Longitude (°)</label>
                <input type="text" value="${lon}" disabled />
                <label>Accuracy (meters)</label>
                <input type="text" value="${accuracy}" disabled />
                <label>Timestamp</label>
                <input type="text" value="${timestamp}" disabled />
            </div>`;
			},
			showError,
			{ enableHighAccuracy: true }
		);
	} else {
		detailsElement.innerText =
			"Geolocation is not supported by this browser.";
	}
}

function showError(error) {
	alert("Error retrieving location. Please allow location access.");
	console.error("Error:", error.message);
}
