const track = document.querySelector('.carousel-track');
const btn = document.querySelector('#Btn');

let currentIndex = 0;

const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

btn.addEventListener('click', () => {
    currentIndex++;

    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    moveToSlide(currentIndex);
});

function moveToSlide(index) {
    const move = index * -100;
    track.style.transform = `translateX(${move}%)`;
}