
function initSliders() {
    $(document).ready(function(){
        //hero block slider
        
        $('.hero-content-slider').slick({
            arrows: true,
            slidesToShow: 2,
            prevArrow: document.querySelector('.hero-content-slider-buttons-prev'),
            nextArrow: document.querySelector('.hero-content-slider-buttons-next'),
            infinite: false,
            }
        );
        $('.hero-content-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
            console.log(currentSlide);
            console.log(slick.slideCount)
            if(currentSlide !== 0) {
                document.querySelector('.hero-content-slider-buttons-prev').classList.add('active')
            } else {
                document.querySelector('.hero-content-slider-buttons-prev').classList.remove('active')
            }
            if(currentSlide === slick.slideCount - 2) {
                document.querySelector('.hero-content-slider-buttons-next').classList.remove('active')
            } else {
                document.querySelector('.hero-content-slider-buttons-next').classList.add('active')
            }
        });
        //offer block slider
        $('.offer-slider').slick({
            arrows: false,
            slidesToShow: 1,
            speed: 5000,
            autoplay: true,
            fade: true,
            }
        );

        $('.example-slider').slick({
            arrows: true,
            slidesToShow: 3,
            infinite: false,
            centerMode: true,
            prevArrow: document.querySelector('.example-slider-buttons-prev'),
            nextArrow: document.querySelector('.example-slider-buttons-next'),
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        $('.example-slider').slick('slickGoTo', 2,  true);

        $('.comment-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
            prevArrow: document.querySelector('.comment-slider-arrows-prev'),
            nextArrow: document.querySelector('.comment-slider-arrows-next'),
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
            }
        );
    });
}


window.addEventListener('load', function () {
    siteNavigation();
});



function siteNavigation() {

    menuBehavior()
    
    let count = 0;
    let newCount;
    let inProgress = false;
    let sections = Array.prototype.slice.call(document.querySelectorAll('section'));
    let maxCount = sections.length - 1;
    let changeCountEvent = new Event('changeCount');
    let menuSection = document.querySelector('.menu');
    let menuItems = Array.prototype.slice.call(document.querySelectorAll('.menu-item'));


    if(document.body.clientWidth > 991) {
        
        renderPage(0)
        changeCountToWhell()
        changeCountToClick()

        menuItems.forEach((item) => {
            item.addEventListener('click', (e) => {
                count = item.getAttribute('data-num');
                window.dispatchEvent(changeCountEvent);
                menuSection.classList.remove('open')
            })
        })
    }
   

    window.addEventListener('changeCount', (e) => {
        renderPage(count)
    })

    function renderPage (num) {
        sections[num].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
    }

    function changeCountToWhell () {
        window.addEventListener('wheel', (e) => {
            if(!inProgress) {
                if(e.deltaY > 0) {
                    (count < maxCount) ? count++ : count = maxCount;
                    window.dispatchEvent(changeCountEvent)
                    inProgress = true;
                    changeProgress()
                } else if (e.deltaY < 0) {
                    (count > 0 && count <= maxCount) ? count-- : count = 0;
                    window.dispatchEvent(changeCountEvent)
                    inProgress = true;
                    changeProgress()
                }
            }
        })
        document.querySelector('.body-wrapper').addEventListener('wheel', (e) => {
            e.preventDefault();
        })
    }

    function changeCountToClick() {
        let buttonsTop = Array.prototype.slice.call(document.querySelectorAll('.grid-counter-top'));
        let buttonsBottom = Array.prototype.slice.call(document.querySelectorAll('.grid-counter-bottom'));
        buttonsTop.forEach((button) => {
            button.addEventListener('click', (e) => {
                (count > 0 && count <= maxCount) ? count-- : count = 0;
                window.dispatchEvent(changeCountEvent)
            })
        })
        buttonsBottom.forEach((button) => {
            button.addEventListener('click', (e) => {
                (count < maxCount) ? count++ : count = maxCount;
                window.dispatchEvent(changeCountEvent)
            })
        })
    }

    function changeProgress () {
        setTimeout(function() {
            inProgress = false
        }, 1000)
    }

    function menuBehavior () {
        let menuOpenButton = document.querySelectorAll('.hamburger');
        menuOpenButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                menuSection.classList.toggle('open')
            })
        })
    
    }


    
    
}



initSliders()

