export const getGallery = photos => {
    return photos.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        `<div class="photo-card">
        <a class="gallery__item" 
        href=${largeImageURL}>
        <img src=${webformatURL} alt="${tags}" loading="lazy" /> </a>
            <div class="info">
            <p class="info-item">
            <b>Likes</b>
            ${likes}
            </p>
            <p class="info-item">
            <b>Views</b>
            ${views}
            </p>
            <p class="info-item">
            <b>Comments</b>
            ${comments}
            </p>
            <p class="info-item">
            <b>Downloads</b>
            ${downloads}
            </p>
            
        </div>
        </div>`
    ).join('');
}

// export default function getGallery (images) {
//     const markup = images
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `<li class="photo-card"><a class="gallery__item" href="${largeImageURL}">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes:</b> <span>${likes}</span> 
//     </p>
//     <p class="info-item">
//       <b>Views:</b> <span>${views}</span>
//     </p>
//     <p class="info-item">
//       <b>Comments:</b> <span>${comments}</span> 
//     </p>
//     <p class="info-item">
//       <b>Downloads:</b> <span>${downloads}</span> 
//     </p>
//   </div>
//   </a></li>`;
//       }
//     )
//     .join('');
 
// }


