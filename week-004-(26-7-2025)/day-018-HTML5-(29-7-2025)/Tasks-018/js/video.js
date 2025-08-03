window.addEventListener("load", function () {
	const videoElement = document.getElementById("main-video");
	const videoButtons = document.querySelectorAll(".video-button");
	const videoTitle = document.getElementById("video-title");

	function playVideo(videoSrc, label = "", startTime = 0) {
		videoElement.innerHTML = "";
		const source = document.createElement("source");
		source.src = videoSrc;
		videoElement.appendChild(source);
		videoElement.load();

		videoElement.onloadedmetadata = () => {
			videoElement.currentTime = startTime;
			videoElement.play();
		};

		videoTitle.textContent = "Now Playing: " + label;
	}

	videoButtons.forEach((button) => {
		button.classList.add("effect-modern");

		button.addEventListener("click", () => {
			videoButtons.forEach((btn) =>
				btn.classList.remove("active-button")
			);
			button.classList.add("active-button");

			const videoSrc = button.getAttribute("data-video-src");
			const label = button.textContent;
			const startTime =
				parseFloat(button.getAttribute("data-start-time")) || 0;

			playVideo(videoSrc, label, startTime);
		});
	});

	if (videoButtons[0]) videoButtons[0].click();

	const enableBtn = document.getElementById("enable-original-effect");
	const disableBtn = document.getElementById("disable-original-effect");

	enableBtn.addEventListener("click", () => {
		videoButtons.forEach((btn) => {
			btn.classList.remove("effect-modern");
			btn.classList.add("effect-original");
		});
	});

	disableBtn.addEventListener("click", () => {
		videoButtons.forEach((btn) => {
			btn.classList.remove("effect-original");
			btn.classList.add("effect-modern");
		});
	});

	const rewindBtn = document.getElementById("rewind-10");
	const forwardBtn = document.getElementById("forward-10");

	rewindBtn.addEventListener("click", () => {
		videoElement.currentTime = Math.max(0, videoElement.currentTime - 10);
	});

	forwardBtn.addEventListener("click", () => {
		videoElement.currentTime = Math.min(
			videoElement.duration,
			videoElement.currentTime + 10
		);
	});
});
