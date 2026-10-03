'use strict';
document.getElementById('year').textContent = new Date().getFullYear();
const stickyBooking = document.querySelector('.mobile-book');
const booking = document.getElementById('book');
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => { stickyBooking.hidden = entries[0].isIntersecting; }, {threshold: 0.12}).observe(booking);
}
