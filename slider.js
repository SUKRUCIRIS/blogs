const containers = Array.from(document.getElementsByClassName("slideshow-container"));
const allDots = Array.from(document.getElementsByClassName("dot"));
const slideIndices = containers.map(() => 1);

let dotOffset = 0;
const sliders = containers.map((container, sliderIdx) => {
	const slides = Array.from(container.getElementsByClassName("mySlides"));
	const dots = allDots.slice(dotOffset, dotOffset + slides.length);
	dotOffset += slides.length;

	const prevBtn = container.querySelector(".prev");
	const nextBtn = container.querySelector(".next");
	if (prevBtn) prevBtn.onclick = () => plusSlides(-1, sliderIdx);
	if (nextBtn) nextBtn.onclick = () => plusSlides(1, sliderIdx);

	dots.forEach((dot, dotIdx) => {
		dot.onclick = () => currentSlide(dotIdx + 1, sliderIdx);
	});

	return { container, slides, dots };
});

function getSliderIndexFromEvent() {
	const target = typeof event !== "undefined" && event ? event.target : null;
	if (!target) return 0;
	const container = target.closest ? target.closest(".slideshow-container") : null;
	if (container) {
		const idx = containers.indexOf(container);
		if (idx !== -1) return idx;
	}
	const dotIdx = sliders.findIndex((s) => s.dots.includes(target));
	return dotIdx !== -1 ? dotIdx : 0;
}

function plusSlides(n, sliderIdx = getSliderIndexFromEvent()) {
	showSlides((slideIndices[sliderIdx] += n), sliderIdx);
}

function currentSlide(n, sliderIdx = getSliderIndexFromEvent()) {
	showSlides((slideIndices[sliderIdx] = n), sliderIdx);
}

function showSlides(n, sliderIdx = 0) {
	const slider = sliders[sliderIdx];
	if (!slider || slider.slides.length === 0) return;

	const { slides, dots } = slider;
	if (n > slides.length) {
		slideIndices[sliderIdx] = 1;
	}
	if (n < 1) {
		slideIndices[sliderIdx] = slides.length;
	}

	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (let i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}

	const activeIndex = slideIndices[sliderIdx] - 1;
	slides[activeIndex].style.display = "block";
	if (dots[activeIndex]) {
		dots[activeIndex].className += " active";
	}
}

sliders.forEach((_, idx) => showSlides(slideIndices[idx], idx));
