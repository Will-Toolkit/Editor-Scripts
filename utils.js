  /* UTILS START */
  const utils = [
    [
      "+ Lazy",
      "Adds 'lazy' class to all images, and changes src to data-src.",
      `const images = document.querySelectorAll('.row:not(.home-header) img');
images.forEach(image => {
  image.classList.add('lazy');
  if (image.src) {
    image.setAttribute('data-src', \`\${image.src}\`);
    image.removeAttribute('src');
  }
});`,
    ],
    [
      "- Lazy",
      "Removes 'lazy' class from all images, and changes data-src to src.",
      `
const lazyImgs = document.querySelectorAll('.lazy');
lazyImgs.forEach(lazyImg => {
  lazyImg.classList.remove('lazy');
  if (lazyImg.getAttribute('data-src')) {
    lazyImg.setAttribute('src', \`\${lazyImg.getAttribute('data-src')}\`);
    lazyImg.removeAttribute('data-src');
  }
});`,
    ],
    [
      "Fancy href",
      "Makes the href of fancyboxes 'javascript:;'",
      `
document.querySelectorAll("a").forEach(el => {
  if (el.dataset.fancybox != null) {
    el.href = "javascript:;"
  }
});`,
    ],
    [
      "Fancybox img Match",
      "Sychronises the data-src of every fancybox to its first img child",
      `
const fancyboxes = document.querySelectorAll("a[data-fancybox]").forEach(el => {
  const img = el.querySelector("img");
  const imgSrc = img ? (img.dataset.src ? img.dataset.src : img.src) : null;
  if (imgSrc) {
    el.dataset.src = imgSrc;
  }
});`,
    ],
    [
      "img to hires",
      "Changes all toolkit images to the hires version.",
      `
const imgs = document.querySelectorAll("img");
imgs.forEach(img => {
  if (img.src) {
    img.src = img.src.replace(/(?<=\/siteimages\/)([^/]+)/g, "hires");
  }

  if (img.dataset.src) {
    img.dataset.src = img.dataset.src.replace(/(?<=\/siteimages\/)([^/]+)/g, "hires");
  }
});`,
    ],
    [
      "+ objectFill",
      "Adds objectFill class to every image.",
      `
const images = document.querySelectorAll('img');
images.forEach(image => {
  image.classList.add('objectFill');
});

const coverImgs = document.querySelectorAll('.objectFill');
coverImgs.forEach(coverImg => {
  coverImg.style.width = '100%';
  coverImg.style.height = '100%';
  coverImg.style.objectFit = 'cover';
});`,
    ],
    [
      "Inline objectFill",
      "Adds inline styling to images with the objectFill class.",
      `
const coverImgs = document.querySelectorAll('.objectFill');
coverImgs.forEach(coverImg => {
  coverImg.style.width = '100%';
  coverImg.style.height = '100%';
  coverImg.style.objectFit = 'cover';
});`,
    ],
    [
      "Aria-hidden icons",
      "Applies aria-hidden='true' to all <i> tags.",
      `
document.querySelectorAll("i").forEach(el => {
  el.setAttribute("aria-hidden", "true");
});
            `,
    ],
  ];
  /* UTILS END */

export utils;
