


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
    let isMobile = document.body.clientWidth < 991
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
    } else {
        menuItems.forEach((item) => {
            item.addEventListener('click', (e) => {
                count = item.getAttribute('data-num');
                window.dispatchEvent(changeCountEvent);
                document.body.style.overflow = 'auto'
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
                let openMenu = document.querySelector('.menu.open')
                if(openMenu) {
                    document.body.style.overflow = 'auto'
                } else {
                    document.body.style.overflow = 'hidden'
                }
                menuSection.classList.toggle('open')
            })
        })
    
    }

    function orderCall () {
        let buttons = document.querySelectorAll('.call-button')
        let orderBlock = document.querySelector('.order-bot')
        let isMobile = false
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                isMobile = document.body.clientWidth > 991 ? false : true
                e.preventDefault()
                if(isMobile === true) {
                    orderBlock.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    count = 2
                    window.dispatchEvent(changeCountEvent)
                }
            })
        })
    }

    orderCall()
}

// Phone mask
function addMask (selector) {
    $(selector).mask("+375 (99) 999-99-99")
}

function formValidation () {
    let form = document.querySelector('.wpcf7-form')
    form.addEventListener('keydown', function(event) {
        if(event.keyCode == 13) {
            event.preventDefault();
        }
    });
    let phoneInput = document.querySelector('.phone-input input')
    let nameInput = document.querySelector('.name-input input')
    let sendButton = document.querySelector('.submit-input input')
    let phoneLength
    sendButton.classList.add('disabled')
    sendButton.setAttribute("disabled", "disabled")
    phoneInput.addEventListener('unfocus', (e) => {
        phoneLength = $('.phone-input input').mask().length
        if (phoneLength === 9 && nameInput.value.length > 2) {
            sendButton.classList.remove('disabled')
        }
    })
    nameInput.addEventListener('input', (e) => {
        phoneLength = $('.phone-input input').mask().length
        if (phoneLength === 9 && nameInput.value.length > 2) {
            sendButton.classList.remove('disabled')
        }
    })

}

function mobileHeaderHidden () {
    let oldScroll = 0
    let isMobile = document.body.clientWidth < 992
    window.addEventListener('resize', () => {
        isMobile = document.body.clientWidth < 992
        if(isMobile)  {
            menuHeaderBehavior()
        }
    })

    function menuHeaderBehavior() {
        let heroHeader = document.querySelector('.hero-header')
        let heroHeaderHeight = heroHeader.clientHeight
        window.addEventListener('scroll', () => {
            let currentScroll = window.pageYOffset
            if(currentScroll > oldScroll ) {
                heroHeader.classList.add('hidden')
                oldScroll = currentScroll
            } else {
                heroHeader.classList.remove('hidden')
                oldScroll = currentScroll
            }
        })
    }

    menuHeaderBehavior()
}

document.addEventListener('DOMContentLoaded', () => {
    initSliders()
    mobileHeaderHidden()
    // addMask('.phone-input input')
    // formValidation()
})

// document.addEventListener('resize', () => {
//    if(document.body.clientWidth > 991) {
//        isMobile = false
//    } else {
//        isMobile = true
//    }
// })



