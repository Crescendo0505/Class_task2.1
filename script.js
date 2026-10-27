/* 原生 JavaScript；通过 file:// 打开也能运行，没有接口和外部库。 */
document.body.classList.add('js');

// 导航是非模态折叠区：关闭时不占据键盘焦点。
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
function closeMenu() {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '菜单';
}
menuButton.addEventListener('click', function () {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '关闭' : '菜单';
});
nav.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
document.addEventListener('click', function (event) {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    closeMenu(); menuButton.focus();
  }
});
window.matchMedia('(min-width:701px)').addEventListener('change', closeMenu);

// 图片查看器：有 JavaScript 时用 dialog；关闭 JavaScript 时仍是图片链接。
const dialog = document.querySelector('.image-dialog');
const imageLinks = Array.from(document.querySelectorAll('[data-gallery]'));
let currentImage = 0;
if (dialog && imageLinks.length) {
  const dialogImage = dialog.querySelector('.dialog-image');
  const caption = dialog.querySelector('.dialog-caption');
  const counter = dialog.querySelector('.dialog-counter');
  function showImage(index) {
    currentImage = (index + imageLinks.length) % imageLinks.length;
    const link = imageLinks[currentImage];
    const image = link.querySelector('img');
    dialogImage.src = link.href;
    dialogImage.alt = image.alt;
    caption.textContent = link.dataset.caption;
    counter.textContent = String(currentImage + 1).padStart(2, '0') + ' / ' + imageLinks.length;
  }
  imageLinks.forEach(function (link, index) {
    link.addEventListener('click', function (event) {
      if (typeof dialog.showModal !== 'function') return;
      event.preventDefault(); showImage(index); dialog.showModal();
    });
  });
  dialog.querySelector('[data-close]').addEventListener('click', function () { dialog.close(); });
  dialog.querySelector('[data-previous]').addEventListener('click', function () { showImage(currentImage - 1); });
  dialog.querySelector('[data-next]').addEventListener('click', function () { showImage(currentImage + 1); });
  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') { event.preventDefault(); showImage(currentImage + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(currentImage - 1); }
  });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
}

// 进入视口的轻微淡入；减少动态效果时不隐藏内容。
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reducedMotion) {
  const reveals = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.07 });
  document.body.classList.add('motion-ready');
  reveals.forEach(function (element) { observer.observe(element); });
}

// 每帧最多更新一次导航，页面顶端始终保留首页状态。
const header = document.querySelector('.site-header');
let scrollQueued = false;
function updateNavigation() {
  header.classList.toggle('is-scrolled', scrollY > 20);
  let current = 'home';
  document.querySelectorAll('[data-nav-section]').forEach(function (section) {
    if (section.getBoundingClientRect().top <= Math.min(innerHeight * .35, 300)) current = section.id;
  });
  if (scrollY > 0 && Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 4) current = 'contact';
  if (scrollY === 0) current = 'home';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    if (link.hash === '#' + current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
window.addEventListener('scroll', function () {
  if (!scrollQueued) { requestAnimationFrame(updateNavigation); scrollQueued = true; }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
