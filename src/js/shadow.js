const container = document.querySelector('.breeds__container');
const scrollbox = document.querySelector('.breeds__container__scrollbox');

let isScrolling = false;

function setShadows(event) {
    if (!isScrolling) {
        window.requestAnimationFrame(function() {
            if(event.target.scrollTop > 0) {
                container.classList.add('off-top');
            }
            else {
                container.classList.remove('off-top');
            }
            if (event.target.scrollTop < 160) {
                container.classList.add('off-bottom');
            }
            else {
                container.classList.remove('off-bottom');
            }
            isScrolling = false;
        });
        isScrolling = true;
    }
}

scrollbox.addEventListener('scroll', setShadows);