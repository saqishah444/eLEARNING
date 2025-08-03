



const testimonials = [
    {
        img: "./assets/images/testimonial-1.jpg",
        name: "Client Name",
        role: "Profession",
        text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit."
    },
    {
        img: "./assets/images/testimonial-2.jpg",
        name: "Client Name",
        role: "Profession",
        text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit."
    },
    {
        img: "./assets/images/testimonial-3.jpg",
        name: "Client Name",
        role: "Profession",
        text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit."
    },
    {
        img: "./assets/images/testimonial-4.jpg",
        name: "Client Name",
        role: "Profession",
        text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit."
    }
];

const wrapper = document.getElementById("sliderWrapper");
const dotsContainer = document.getElementById("paginationDots");

const cardWidth = 300;
const gap = 30;
const slideDistance = cardWidth + gap;

let currentStart = 0; // index of leftmost visible card
let isAnimating = false;

// Create card element
function createCard(item, isActive = false) {
    const div = document.createElement("div");
    div.className = "testimonial-card" + (isActive ? " active" : "");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h5>${item.name}</h5>
      <p>${item.role}</p>
      <div class="content-box"><p>${item.text}</p></div>
    `;
    return div;
}

// Render 3 cards only
function renderCards() {
    wrapper.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        const index = (currentStart + i) % testimonials.length;
        const isActive = i === 1; // center card active
        const card = createCard(testimonials[index], isActive);
        wrapper.appendChild(card);
    }
    wrapper.style.transition = "none";
    wrapper.style.transform = "translateX(0)";
}

// Render dots — 3 dots, middle active
function renderDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        if (i === 1) dot.classList.add("active");
        dot.addEventListener("click", () => {
            if (isAnimating) return; // block while animating
            currentStart = (currentStart + i - 1 + testimonials.length) % testimonials.length;
            renderCards();
            renderDots();
        });
        dotsContainer.appendChild(dot);
    }
}

// Slide next: smooth translate left, then update cards after transition
function slideNext() {
    if (isAnimating) return; // prevent overlap
    isAnimating = true;
    wrapper.style.transition = "transform 0.5s ease";
    wrapper.style.transform = `translateX(-${slideDistance}px)`;
}

// After transition end, update cards and reset transform
wrapper.addEventListener("transitionend", () => {
    if (!isAnimating) return;
    currentStart = (currentStart + 1) % testimonials.length;
    renderCards();
    isAnimating = false;
});

// Autoplay timer
let autoplay = setInterval(slideNext, 3000);

// Drag/swipe handling (pause autoplay)
const slider = document.getElementById("sliderContainer");
let startX = 0;
let isDragging = false;

slider.addEventListener("mousedown", (e) => {
    if (isAnimating) return;
    startX = e.clientX;
    isDragging = true;
    clearInterval(autoplay);
    wrapper.style.transition = "none"; // stop any transition
});

slider.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    let delta = e.clientX - startX;
    if (Math.abs(delta) > 50) {
        if (delta < 0) slideNext();
        else {
            if (isAnimating) return;
            isAnimating = true;
            wrapper.style.transition = "transform 0.5s ease";
            wrapper.style.transform = `translateX(${slideDistance}px)`;
            wrapper.addEventListener("transitionend", function prevSlideHandler() {
                wrapper.removeEventListener("transitionend", prevSlideHandler);
                currentStart = (currentStart - 1 + testimonials.length) % testimonials.length;
                renderCards();
                isAnimating = false;
            });
        }
    } else {
        // Not enough drag — reset position smoothly
        wrapper.style.transition = "transform 0.5s ease";
        wrapper.style.transform = "translateX(0)";
    }
    isDragging = false;
    autoplay = setInterval(slideNext, 3000);
});

slider.addEventListener("mouseleave", () => {
    if (isDragging) {
        wrapper.style.transition = "transform 0.5s ease";
        wrapper.style.transform = "translateX(0)";
        isDragging = false;
        autoplay = setInterval(slideNext, 3000);
    }
});

// Touch events
slider.addEventListener("touchstart", (e) => {
    if (isAnimating) return;
    startX = e.touches[0].clientX;
    clearInterval(autoplay);
    wrapper.style.transition = "none";
});

slider.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let delta = endX - startX;
    if (Math.abs(delta) > 50) {
        if (delta < 0) slideNext();
        else {
            if (isAnimating) return;
            isAnimating = true;
            wrapper.style.transition = "transform 0.5s ease";
            wrapper.style.transform = `translateX(${slideDistance}px)`;
            wrapper.addEventListener("transitionend", function prevSlideHandler() {
                wrapper.removeEventListener("transitionend", prevSlideHandler);
                currentStart = (currentStart - 1 + testimonials.length) % testimonials.length;
                renderCards();
                isAnimating = false;
            });
        }
    } else {
        wrapper.style.transition = "transform 0.5s ease";
        wrapper.style.transform = "translateX(0)";
    }
    autoplay = setInterval(slideNext, 3000);
});

// Initial render
renderCards();
renderDots();


let email = document.getElementById("email");
email.addEventListener("click", function(){
    email.style.border = "2px";
    email.style.border = "blue";
    email.style.border = "solid";

})