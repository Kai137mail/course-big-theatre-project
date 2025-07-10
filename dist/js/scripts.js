import Swiper from '../utils/swiper-bundle.mjs';

const swiper = new Swiper('.swiper', {
//     // Optional parameters
//     // direction: 'vertical',
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    breakpoints: {
        577: {
            slidesPerView: 2,
        },
        993: {
            slidesPerView: 3,
        },
    },
    // If we need pagination
    // pagination: {
    // el: '.swiper-pagination',
    // },

    // Navigation arrows
    // navigation: {
    // nextEl: '.swiper-button-next',
    // prevEl: '.swiper-button-prev',
    // },

    // And if we need scrollbar
    // scrollbar: {
    // el: '.swiper-scrollbar',
    // },
});