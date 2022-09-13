import './css/styles.css'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {getGallery} from './js/getGallery';
import { GetPixabyApi } from './js/getImage';
///////////////////////////////////////////

const refs = {
    form: document.querySelector('#search-form'),
    photoGallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

const getPixabyApi = new GetPixabyApi;
refs.loadMoreBtn.classList.add('is-hidden');

function renderGallery(photos) {
    refs.photoGallery.insertAdjacentHTML('beforeend', getGallery(photos))
}


async function onSubmit(event) {
    event.preventDefault();
    refs.loadMoreBtn.classList.add('is-hidden');
    resetGallery();
    getPixabyApi.resetPage();
    const searchRequest = event.target.elements.searchQuery.value.trim();
    if (!searchRequest) return Notify.info('Please type something');

    getPixabyApi.query = searchRequest;
    
    try {
        const { hits, totalHits } = await getPixabyApi.fetchImages();
        if (!totalHits)
            return Notify.warning('Sorry, there are no images matching your search query. Please try again.');
        Notify.success(`Hooray! We found ${totalHits} images.`)
        renderGallery(hits);
        lightbox.refresh();
        refs.loadMoreBtn.classList.remove('is-hidden');
       
    }
    catch (error) { console.log(error.message) };
       
    refs.form.reset();
}

function resetGallery() {
    refs.photoGallery.innerHTML = '';
}

async function onLoadMoreBtnClick() {
    try {
        const { hits, totalHits } = await getPixabyApi.fetchImages();
        renderGallery(hits);   
        lightbox.refresh();
                
        scrollLoadedPhoto();

        const totalNumber = document.getElementsByClassName('photo-card').length;
        
        if (totalNumber >= totalHits) {
            Notify.warning(`We're sorry, but you've reached the end of search results.`);
            refs.loadMoreBtn.classList.add('is-hidden')
        }          
    }
    catch(error) {console.log(error.message);}
    
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 300,
});

function scrollLoadedPhoto() {
const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

        window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
        });
}
