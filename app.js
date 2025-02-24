document.addEventListener('DOMContentLoaded', () => {
    // Hero Slider
    // Allows for dot pagination navigation and auto advancement
    function initHeroSlider() {
        const dots = document.querySelectorAll('.dot');
        const slides = document.querySelectorAll('.slide');
        const slideInterval = 6000;
        let currentSlide = 0;

        function updateSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function autoAdvance() {
            let nextSlide = (currentSlide + 1) % slides.length;
            updateSlide(nextSlide);
        }
        let slideTimer = setInterval(autoAdvance, slideInterval);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateSlide(index);
                clearInterval(slideTimer);
                slideTimer = setInterval(autoAdvance, slideInterval);
            });
        });
    }

    // Drawer
    // Opens and stays regardless of header/sticky header and page scroll, click anywhere on screen to exit.
    function initHeader() {
        const header = document.querySelector('.site-header');
        const shopLink = document.querySelector('.shop-link');
        const shopDrawer = document.querySelector('.shop-drawer');
        const scrollThreshold = 50;
        let isDrawerOpen = false;

        function toggleDrawer(open) {
            isDrawerOpen = open;
            shopDrawer.classList.toggle('active', open);
            shopLink.classList.toggle('active', open);
            header.classList.toggle('drawer-open', open);
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else if (!isDrawerOpen) {
                header.classList.remove('scrolled');
            }
        });

        shopLink.addEventListener('click', (e) => {
            e.preventDefault();
            toggleDrawer(!isDrawerOpen);
        });

        document.addEventListener('click', (event) => {
            if (isDrawerOpen &&
                !shopDrawer.contains(event.target) &&
                !shopLink.contains(event.target)) {
                toggleDrawer(false);
            }
        });
    }

    // New Arrivals Slider
    // Initializing a simple slider, could use more work to include additional interactivity features.
    function initArrivalsSlider() {
        const slider = document.querySelector('.arrivals-slider');
        const prevButton = document.querySelector('.slider-arrow.prev');
        const nextButton = document.querySelector('.slider-arrow.next');
        const cardWidth = document.querySelector('.product-card').offsetWidth + 32;

        // Arrow Navigation
        prevButton.addEventListener('click', () => {
            slider.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });

        nextButton.addEventListener('click', () => {
            slider.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });
    }

    initHeroSlider();
    initHeader();
    initArrivalsSlider();
});
