import galleryPictures from './gallery-items.js';
const refs = {
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    gallery: document.querySelector('.js-gallery'),
    lightboxImage: document.querySelector('.lightbox__image'),
    lightbox: document.querySelector('.lightbox, .js-lightbox'),
    lightboxButton: document.querySelector('button[data-action="close-lightbox"]'),
    arrowLeft: document.querySelector('.arrow-left'),
    arrowRight: document.querySelector('.arrow-right'),
};
const { gallery, lightboxImage, lightbox, lightboxButton, arrowLeft, arrowRight, lightboxOverlay } = refs;
const itemConstructor = ({ preview, original, description }, id) => {
    return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img data-id='${id}' class="gallery__image" src="${preview}" 
    data-source="${original}" alt="${description}"/></a></li>`
};
const createGallery = (item) => { return item.map(itemConstructor).join('') };


const onClickGallary = (event) => {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return
    }
    const imageRef = event.target;
    const largeImageURL = imageRef.dataset.source;
    const largeImageALT = imageRef.alt;
    const largeImageid = imageRef.dataset.id;
    largeImage(largeImageURL, largeImageALT, largeImageid);
    lightbox.classList.add('is-open');
    window.addEventListener('keydown', onCloseESC);
    window.addEventListener('keydown', pushKey);
}

const largeImage = (url, alt, id) => {
    lightboxImage.src = url;
    lightboxImage.alt = alt;
    lightboxImage.id = id;
};

const renderGallery = (item) => gallery.insertAdjacentHTML('afterbegin', item);

const onClickClose = (event) => {
    event.preventDefault
    lightbox.classList.remove('is-open');
    clearAttribute();
};
const onCloseESC = (event) => {
    if (event.key === 'Escape') {
        onClickClose(event);
    }
};
const pushNextKey = (event) => {
    clickRight(event);
}
const pushPreviousKey = (event) => {
    clickLeft(event);
}
const pushKey = (event) => {
    if (event.key === 'ArrowLeft') { pushPreviousKey(event); }
    if (event.key === 'ArrowRight') { pushNextKey(event); }
};

const clearAttribute = () => {
    largeImage('', '', '');

};
const clickArrowLeft = (event) => {
    clickLeft(event)
};
const clickArrowRight = (event) => {
    clickRight(event)
};
const clickLeft = (event) => {
    const nextId = Number(lightboxImage.id) - 1;
    if (nextId === -1) {
        onClickClose(event);
    }
    lightboxImage.id = nextId;
    const { original, description } = galleryPictures[nextId];
    lightboxImage.src = original;
    lightboxImage.alt = description;
};
const clickRight = (event) => {
    const galleryLength = galleryPictures.length;
    const nextId = Number(lightboxImage.id) + 1;
    if (nextId === galleryLength) {
        onClickClose(event);
    }
    lightboxImage.id = nextId;
    const { original, description } = galleryPictures[nextId];
    lightboxImage.src = original;
    lightboxImage.alt = description;
};
lightboxButton.addEventListener('click', onClickClose);
renderGallery(createGallery(galleryPictures));
gallery.addEventListener('click', onClickGallary);
lightboxOverlay.addEventListener('click', onClickClose);
arrowLeft.addEventListener('click', clickArrowLeft);
arrowRight.addEventListener('click', clickArrowRight);