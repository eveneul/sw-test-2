// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

function maskingText(element, index = 0) {
  gsap.to(element, {
    y: 0,
    duration: 0.5,
    delay: index * 0.2,
  });
}

function fadeIn(element, index = 0) {
  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    delay: index * 0.2,
  });
}

function header() {
  const header = document.querySelector("header");
  ScrollTrigger.create({
    trigger: "html",
    start: "top top",
    end: "+=99999",
    onUpdate: (event) => {
      if (event.direction === 1) {
        gsap.to(header, { yPercent: -100 });
      } else {
        gsap.to(header, { yPercent: 0 });
      }
    },
  });
}

header();

// function cursor() {
//   const cursor = document.querySelector("#cursor");
//   window.addEventListener("pointermove", (event) => {
//     const position = { x: event.clientX, y: event.clientY };
//     cursor.style.transform = `translate(${position.x}px, ${position.y}px)`;
//   });
// }

// cursor();

function kv() {
  const kv = document.querySelector(".sc__kv");
  ScrollTrigger.create({
    trigger: ".sc__about",
    start: "bottom top",
    onEnter: () => {
      gsap.set(kv, { opacity: 0 });
    },
    onLeaveBack: () => {
      console.log("onLeaveBack");
      gsap.set(kv, { opacity: 1 });
    },
  });
}

kv();

function about() {
  const titles = gsap.utils.toArray(".sc__about h2 p span");
  const descriptions = gsap.utils.toArray(".sc__about > div p span");
  ScrollTrigger.create({
    trigger: ".sc__about",
    start: "top 55%",
    onEnter: () => {
      titles.forEach((title, index) => {
        maskingText(title, index);
      });

      descriptions.forEach((desc, index) => {
        fadeIn(desc, index + 1.5);
      });
    },
  });
}

about();

function works() {
  const categoryList = document.querySelector(".video__category");
  const categoryItems = document.querySelectorAll(".video__category li");
  const currentVideoTitle = document.querySelector(".current-video");
  const category = [
    "Music & Live",
    "Advertising & Promotion",
    "Making-of & Sketch",
    "Performance",
    "MV & Art Film",
  ];

  const swiper = new Swiper(".sc__works", {
    spaceBetween: 0,
    centeredSlides: true,
    effect: "fade",
    loop: true,
    touchRatio: 0,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    on: {
      autoplayTimeLeft(s, time, progress) {
        categoryList.style.setProperty("--progress", 1 - progress);
      },
      activeIndexChange(swiper) {
        categoryItems.forEach((item, index) => {
          item.classList.remove("active");

          categoryItems[swiper.realIndex].classList.add("active");
          currentVideoTitle.innerText = category[swiper.realIndex];
        });
      },
    },
  });

  categoryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      console.log(index, "index");
      swiper.slideToLoop(index);
    });
  });
}

works();

function identity() {
  const section = document.querySelector(".sc__identity");
  const titles = gsap.utils.toArray(".sc__identity h2 span");
  const list = document.querySelector(".sc__identity .identity-wrap");
  const items = document.querySelectorAll(".sc__identity .identity-wrap li");
  const img = document.querySelector(".sc__identity figure");
  const imgs = document.querySelectorAll(".sc__identity figure img");
  console.log(imgs, "imgs");
  ScrollTrigger.create({
    trigger: ".sc__identity",
    start: "top 55%",

    onEnter: () => {
      titles.forEach((title, index) => {
        maskingText(title, index);
      });
    },
  });

  list.addEventListener("pointerenter", () => {
    img.classList.add("active");
    img.style.opacity = "1";
  });

  list.addEventListener("pointermove", (event) => {
    const pointer = { x: event.clientX, y: event.clientY };
    img.style.transform = `translate(${pointer.x}px, ${pointer.y}px)`;
  });

  list.addEventListener("pointerleave", () => {
    img.classList.remove("active");
    img.style.opacity = "0";
  });

  items.forEach((item, index) => {
    item.addEventListener("pointerenter", () => {
      imgs.forEach((imgItem, i) => {
        imgItem.classList.remove("active");
      });
      imgs[index].classList.add("active");
    });
  });
}

identity();

function contact() {
  const title = document.querySelector(".sc__contact .contact-title span");
  const descriptions = gsap.utils.toArray(".contact-desc p");
  const img = document.querySelector(".sc__contact figure");

  ScrollTrigger.create({
    trigger: ".sc__contact",
    start: "top 50%",

    onEnter: () => {
      maskingText(title);
      descriptions.forEach((desc, index) => {
        fadeIn(desc, index + 1.5);
      });
    },
  });

  ScrollTrigger.create({
    trigger: ".sc__contact",
    start: "top bottom",
    end: "bottom top",
    onUpdate: ({ progress }) => {
      img.style.setProperty("--progress", progress);
    },
  });
}

contact();
