
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImgApi } from './js/fetchApi';
import { fetchImgApiNext } from './js/fetchApi';
import { getGallery } from './js/getGallery';

///////////////////////////////////////////


const gallery = document.querySelector('.search__gallery');
const form = document.querySelector('.search__form');
const loadMore = document.querySelector('.search__loadmore');


let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;


form.addEventListener('submit', onSearchForm);
loadMore.addEventListener('click', onLoadMore);


function onSearchForm(evt) {
  // console.log('test');
  evt.preventDefault();
  window.scroll({ top: 0 });
  page = 1;
  query = evt.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';

    if (query === '') {
      loadMore.classList.remove('no-hidden');
    return Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
  }

  fetchImgApi(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        getGallery(data.hits);
        simpleLightBox = new SimpleLightbox('.search__gallery a').refresh();
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        loadMore.classList.add('no-hidden');
      }
    })
    .catch(error => console.log(error));
}

function onLoadMore() {
  page += 1;
  simpleLightBox.destroy();

  fetchImgApiNext(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
     
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        getGallery(data.hits);
        simpleLightBox = new SimpleLightbox('.search__gallery a').refresh();
        if (data.totalHits - perPage * (page - 1) < 0) {
            loadMore.classList.remove('no-hidden');
             return Notify.failure(
          "Were sorry, but you've reached the end of search results."
        )
        }
      }
    })
    .catch(error => console.log(error));
}
