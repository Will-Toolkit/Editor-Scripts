  /* UTILS START */
  const utils = [
    [
      "Cleanup",
      "Removes fadeIn classes and extra spaces from element classes.",
      `document.querySelectorAll('*').forEach(elem => {
  const classes = elem.getAttribute("class");
  if (classes != null) {
    
    elem.classList.remove('fadeInDone', 'childFadeInDone', 'visible');
    if (elem.classList.length === 0) {
      elem.removeAttribute("class");
    }
  }
  const style = elem.getAttribute("style");
  if ((style != null) && (style.length === 0)) {
    elem.removeAttribute("style");
  }
});`
    ],
    [
      "+ Lazy",
      "Adds 'lazy' class to all images, and changes src to data-src.",
      `const images = document.querySelectorAll('img');
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
      "Image alts",
      "Adds an \"alt\" tag to images. The text is based on the file name", 
      `
const images = document.querySelectorAll('img');
images.forEach(image => {
  if (!image.getAttribute('alt')) {
  let source = image.getAttribute('data-src') || image.getAttribute('src') || '';
  const alias = source.split('/').at(-1).split('.')[0];
  const alt = alias.toLowerCase().split('-');
  alt[0] = alt[0][0].toUpperCase() + alt[0].slice(1);
  altText = alt.join(' ');
  image.setAttribute('alt', altText);
  }
});
`
    ],
    [
      "Refresh files",
      "Refreshes the images",
      `
let randomNum = Math.floor(Math.random() * 16777215);
let hexCode = randomNum.toString(16).padStart(6, '0');

const newQuery = `?` + hexCode;

for (el of document.body.children) {
    let newString = el.outerHTML;

    const regex = /(?<=(?:toolkitfiles.*))(?<=\\.(?:jpg|jpeg|png|mp4|webm|webp|pdf|gif|txt|docx|JPG|JPEG|PNG|MP4|WEBM|WEBP|PDF|GIF|TXT|DOCX))\\?[^)"\\s]+/g;

    newString = newString.replaceAll(regex, newQuery);

    const freshRegex = /(https:\\/\\/secure.toolkitfiles.*)(?<=\\.(?:jpg|jpeg|png|mp4|webm|webp|pdf|gif|txt|docx|JPG|JPEG|PNG|MP4|WEBM|WEBP|PDF|GIF|TXT|DOCX))(?=[^\\?])/g;

    newString = newString.replace(freshRegex, "$1"+newQuery);

    el.outerHTML = newString;
}`
    
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
    img.src = img.src.replace(/(?<=\\/siteimages\\/)([^/]+)/g, "hires");
  }

  if (img.dataset.src) {
    img.dataset.src = img.dataset.src.replace(/(?<=\\/siteimages\\/)([^/]+)/g, "hires");
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
document.querySelectorAll("i[class^='fa-'], i[class*=' fa-']").forEach(el => {
  el.setAttribute("aria-hidden", "true");
});
            `,
    ],
  ];
  /* UTILS END */
