function adjustLayout() {
    const container = document.getElementById('responsiveContainer');
    if (window.innerWidth < 600) {
        container.style.flexDirection = 'column';
        container.style.textAlign = 'center';
    } else if (window.innerWidth < 900) {
        container.style.flexDirection = 'row';
        container.style.textAlign = 'left';
    } else {
        container.style.flexDirection = 'row';
        container.style.textAlign = 'left';
    }
}

window.addEventListener('resize', adjustLayout);
document.addEventListener('DOMContentLoaded', adjustLayout);

function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const config = {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0.01
    };

    let observer;

    if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver((entries, self) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    preloadImage(entry.target);
                    self.unobserve(entry.target);
                }
            });
        }, config);

        images.forEach(image => observer.observe(image));
    } else {
        images.forEach(image => preloadImage(image));
    }
}

function preloadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;
    img.src = src;
}

document.addEventListener('DOMContentLoaded', lazyLoadImages);

function enableKeyboardNavigation() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                link.click();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', enableKeyboardNavigation);

