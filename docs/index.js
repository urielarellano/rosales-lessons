/* cta scroll button */
document.addEventListener('DOMContentLoaded', () => {
  const ctaButtons = document.querySelectorAll('.cta-scroll');
  const targetElement = document.getElementById('cta-scroll-to');

  // Safety check: Only run the logic if the target element actually exists on the page
  if (targetElement) {
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents default jump behavior if it's an <a> tag
        
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start' // Aligns the top of the element to the top of the viewport
        });
      });
    });
  }
});

/* FAQ dropdown functionality */
const questions = document.querySelectorAll(".faq-question");

questions.forEach((question) => {
question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector(".icon");

    const isOpen = answer.style.maxHeight;

    if (isOpen) {
    answer.style.maxHeight = null;
    icon.textContent = "+";
    question.classList.remove("active");
    } else {
    answer.style.maxHeight = answer.scrollHeight + "px";
    icon.textContent = "−";
    question.classList.add("active");
    }
});
});


/* quote carousel */

const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-track img");

const prevBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".nextus");

let currentIndex = 0;

function updateCarousel() {
    const slideWidth = document.querySelector(".carousel-window img").offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});


/*  review carousel */
function truncate(text, maxLength = 600) {
    if (text.length <= maxLength) return text;

    return text.slice(0, maxLength) + '...';
}

const reviewText = document.querySelector('.review-text');
const reviewAuthor = document.querySelector('.review-author');
const reviewDate = document.querySelector('.review-date');
const reviewStars = document.querySelector('.review-stars');

const prevButton = document.querySelector('.previous');
const nextButton = document.querySelector('.nextus');

let reviews = [];
let currIndex = 0;

fetch('./reviews.json')
    .then(res => res.json())
    .then(data => {
        reviews = data;
        renderReview();
    });

const card = document.querySelector('.review-card');

function renderReview() {
    const review = reviews[currIndex];

    card.classList.add('is-hidden');

    setTimeout(() => {
        reviewText.textContent = truncate(review.text);
        reviewAuthor.textContent = review.author;
        reviewDate.textContent = new Date(review.date).toLocaleDateString(
            'en-US',
            { year: 'numeric', month: 'long' }
        );
        reviewStars.textContent = '★'.repeat(review.rating);

        card.classList.remove('is-hidden');
    }, 200);
}

nextButton.addEventListener('click', () => {
    currIndex = (currIndex + 1) % reviews.length;
    renderReview();
});

prevButton.addEventListener('click', () => {
    currIndex =
        (currIndex - 1 + reviews.length) % reviews.length;
    renderReview();
});