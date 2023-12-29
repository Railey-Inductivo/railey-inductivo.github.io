//Start of Sticky Navigation Bar
function initStickyNavbar() {
    window.addEventListener("scroll", function () {
        var nav = document.querySelector("nav");
        nav.classList.toggle("sticky", window.scrollY > 0);
    });
}
//End of Sticky Navigation Bar

//Start of Content Reveal Animation
function initContentReveal() {
    window.addEventListener('scroll', appear);
    
    function appear() {
        var appears = document.querySelectorAll('.appear');
        
        for (var i = 0; i < appears.length; i++) {
            var windowheight = window.innerHeight;
            var appeartop = appears[i].getBoundingClientRect().top;
            var appearpoint = 150;
            
            if (appeartop < windowheight - appearpoint) {
                appears[i].classList.add('active');
            }
        }
    };
}
//End of Content Reveal Animation

//Start of Scroll to Top Function

function navigateUp() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function initScrollTop() {
    window.onscroll = function () {
        scrollFunction();
    };
    
    function scrollFunction() {
        var navigateup = document.getElementById("navigateup");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            navigateup.classList.add("show");
        } else {
            navigateup.classList.remove("show");
        }
    }
    
    const navigateupButton = document.getElementById("navigateup");
    navigateupButton.addEventListener("click", navigateUp);
}
//End of Scroll to Top Function

//Start of Navigation Bar Menu Fullscreen
function initResponsiveNavBar() {
    var navToggle = document.getElementById("navToggle");
    var navBar = gsap.timeline();
    
    navBar.to(".first-bar", 0.5,{
        attr:{d: "M8,2 L2,8"},
        x:1,
        ease: Power2.easeInOut
    }, "start")
    
    navBar.to(".second-bar", 0.5,{
        autoAlpha: 0
    }, "start")
    
    navBar.to(".third-bar", 0.5,{
        attr:{d: "M8,8 L2,2"},
        x:1,
        ease: Power2.easeInOut
    }, "start")
    
    navBar.reverse();
    
    var tl = gsap.timeline({paused: true});
    
    tl.to(".menu-screen",{
        duration: 0,
        display: "block",
        ease: "Expo.easeInOut",
    });
    
    tl.from(".menu-overlay span", {
        duration: 0.4,
        x: "100%",
        stagger: 0.2,
        ease: "Expo.easeInOut"
    });
    
    tl.from(".nav-contents li a", {
        duration: 0.8,
        y: "100%",
        stagger: 0.2,
        ease: "Expo.easeInOut"
    }, "-=0.5");
    
    tl.reverse();
    
    navToggle.addEventListener("click", function(){
        navBar.reversed(!navBar.reversed());
        tl.reversed(!tl.reversed());
    });
    
    var navLinks = document.querySelectorAll('.nav-contents li a');
    navLinks.forEach(function (navLink) {
        navLink.addEventListener('click', function () {
            tl.reversed(!tl.reversed());
            navBar.reversed(!navBar.reversed());
        });
    });
}
//End of Navigation Bar Menu Fullscreen

//Start of Infinite Marquee Animation
function initMarqueeAnimation() {
    const carouselElements = document.querySelectorAll(".splide");
    carouselElements.forEach((carouselElement) => {
        
        const splide = new Splide(carouselElement, {
            type: "loop",
            drag: true,
            autoWidth: true,
            gap: 30,
            pagination: false,
            arrows: false,
            autoScroll: {
                speed: 1,
                pauseOnHover: true,
            },
        });
        splide.mount(window.splide.Extensions);
    });
}
//End of Infinite Marquee Animation

//Start of Expanding Cards Function
function initExpandingCards() {
    const whyusBox = document.querySelectorAll('.whyus-box');
    
    whyusBox.forEach(whyusBoxs => {
        whyusBoxs.addEventListener('click', () => {
            removeActiveClasses();
            whyusBoxs.classList.add('active');
        })
    })
    
    function removeActiveClasses(){
        whyusBox.forEach(whyusBoxs => {
            whyusBoxs.classList.remove('active');
        })
    }
}
//End of Expanding Cards Function

//Start of Meet The Team Function
function initMeetTeam() {
    const team = [
        { name: "Haleigh Rolf", role: "Founder & Photographer"},
        { name: "Narciso Trix", role: "Photographer & Editor"},
        { name: "Silvia Ronni", role: "Studio Manager"},
    ];
    
    const teamCursor = document.querySelector(".rydiant-cursor");
    
    const teamCursorWidth = teamCursor.offsetWidth / 2;
    const teamCursorHeight = teamCursor.offsetHeight / 2;
    
    let currentSlide = 1;
    const totalSlides = 3;
    
    document.addEventListener("mousemove", (e) => {
        gsap.to(teamCursor, {
            x: e.clientX - teamCursorWidth,
            y: e.clientY - teamCursorHeight,
            duration: 1,
            ease: "power3.out"
        });
    
    });
    
    const updateInfo = (slideNumber) =>{
        const member = team[slideNumber - 1];
        document.querySelector(".team-details .team-name").textContent = member.name;
        document.querySelector(".team-details .team-role").textContent = member.role;
    };
    
    const animateSlide = (slideNumber, reveal) => {
        const teamMarquee = document.querySelector(`.team${slideNumber}.marquee-wrap`);
        const teamImg = document.getElementById(`team${slideNumber}`);
        const clipPathValue = reveal ? 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)' : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';
    
        gsap.to(teamMarquee, {clipPath: clipPathValue, duration: 1, ease: "power4.out", delay: 0.3});
    
        gsap.to(teamImg, {clipPath: clipPathValue, duration: 1, ease: "power4.out"});
    };
    
    updateInfo(currentSlide);
    
    const handleRightClick = () => {
        if (currentSlide < totalSlides) {
            animateSlide(currentSlide + 1, true);
            currentSlide++;
            updateInfo(currentSlide);
        }
    }
    
    const handleLeftClick = () => {
        if (currentSlide > 1){
            animateSlide(currentSlide, false);
            currentSlide--;
            updateInfo(currentSlide);
        }
    }
    
    document.addEventListener("click", (e) => {
        const halfPageWidth = window.innerWidth / 2;
        if (e.clientX > halfPageWidth) {
            handleRightClick();
        } else{
            handleLeftClick();
        }
    });
}
//End of Meet The Team Function

//Start of Shuffle Letters Animation
document.addEventListener("DOMContentLoaded", () => {
    const serviceItems = document.querySelectorAll(".service-item");

    serviceItems.forEach((serviceItem) => {
        serviceItem.addEventListener("mouseenter", mixAnimation);
    });
});

function generateRandomChar() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";

    return chars[Math.floor(Math.random() * chars.length)];
}

function mixAnimation(event){
    const target = event.currentTarget;

    if (target.dataset.animating){
        return;
    }

    target.dataset.animating = true;

    const serviceNames = target.querySelectorAll(".service-name");
    const ogServiceName = Array.from(serviceNames).map((serviceName) => serviceName.textContent);

    let shuffles = 0;
    const maxShuffles = 5;
    const intervalDuration = 500/ maxShuffles;

    let animationInterval = setInterval(() => {
        if (shuffles >= maxShuffles) {
            clearInterval(animationInterval);
            serviceNames.forEach((serviceName, index) => {
                serviceName.textContent = ogServiceName[index];
            });

            delete target.dataset.animating;
        } else {
            serviceNames.forEach((serviceName) => {
                const length = serviceName.textContent.length;
                let shuffledText = "";
                for (let i = 0; i < length; i++){
                    shuffledText += generateRandomChar();
                }
                serviceName.textContent = shuffledText;
            });
            shuffles++;
        }
    }, intervalDuration);
}
//End of Shuffle Letters Animation

//Start of Filterable Image Gallery
function initFilterGallery() {
    const filterBtns = document.querySelectorAll('.rydiant-filter-btn');
    const rydiantgalleryItems = document.querySelectorAll('.rydiant-gallery-item');
    
    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const filterValue = btn.getAttribute('data-filter');
            filterBtns.forEach(function (btn) {
                btn.classList.remove('active');
            });
            
            btn.classList.add('active');
            rydiantgalleryItems.forEach(function (item) {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}
//End of Filterable Image Gallery

//Start of Image Expand
function initImageExpand() {
    lightGallery(document.querySelector(".rydiant-gallery"));
}
//End of Image Expand 

//Runs the functions when page loads
window.onload = function () {
    initScrollTop();
};

//Runs the functions when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    initStickyNavbar();
    initContentReveal();
    initResponsiveNavBar();
    initMarqueeAnimation();
    initExpandingCards();
    initMeetTeam();
    initFilterGallery();
    initImageExpand();
});


