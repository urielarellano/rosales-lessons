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

  const lessonForm = document.getElementById('lesson-form');

  if (lessonForm) {
    lessonForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!lessonForm.checkValidity()) {
        lessonForm.reportValidity();
        return;
      }

      const formData = new FormData(lessonForm);
      const nameVal = formData.get('name');
      const emailVal = formData.get('email');

      fetch(lessonForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(() => {
          gtag('event', 'generate_lead', {
            'event_category': 'engagement',
            'event_label': 'spanish_main_site'
          });
        })
        .catch(() => { /* don't block booking even if Formspree hiccups */ })
        .finally(() => showCalendly(nameVal, emailVal));
    });
  }

  function showCalendly(name, email) {
    const formEl = document.getElementById('lesson-form');
    const calendlySection = document.getElementById('calendly-section');
    const widgetDiv = calendlySection.querySelector('.calendly-inline-widget');

    const baseUrl = widgetDiv.getAttribute('data-url').split('?')[0];
    const params = new URLSearchParams({ name: name || '', email: email || '' });
    const fullUrl = `${baseUrl}?${params.toString()}`;
    widgetDiv.setAttribute('data-url', fullUrl);

    formEl.style.display = 'none';
    calendlySection.classList.remove('hidden');
    calendlySection.scrollIntoView({ behavior: 'smooth' });

    const initWidget = () => Calendly.initInlineWidget({ url: fullUrl, parentElement: widgetDiv });

    if (window.Calendly) {
      initWidget();
    } else {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    }
  }

  window.addEventListener('message', function (e) {
    if (!e.data.event || e.data.event.indexOf('calendly') !== 0) return;

    if (e.data.event === 'calendly.event_scheduled') {
      gtag('event', 'calendly_booking', {
        'event_category': 'engagement',
        'event_label': 'spanish_main_site'
      });
      // No 'send_to': AW-... here — this page isn't configured with the Ads tag,
      // so only report to GA4. See note below.
    }
  });
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