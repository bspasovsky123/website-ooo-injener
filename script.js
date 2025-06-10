document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector('.navbar');
    const navbarLinks = document.querySelectorAll('.nav-link');

    // Эффект прокрутки к секции при клике на ссылку
    navbarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - navbar.offsetHeight, // Учитываем высоту панели
                    behavior: 'smooth'
                });
            }
        });
    });
});
