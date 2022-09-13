import axios from 'axios';

const KEY = '29184640-266ee5361b73d654bedf55260';
axios.defaults.baseURL = 'https://pixabay.com/api';


export class GetPixabyApi {
    constructor() { 
        this.searchQuery = '';
        this.page = 1;        
    }
    
    async fetchImages() {
        const searchParams = new URLSearchParams({
        key: KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
     
        safesearch: true,
        page: this.page,
        per_page: 40

        });
        const { data } = await axios.get(`?${searchParams}`);
        
        this.incrementPage();       

        return data;
    }

   
    get query() {
        return this.searchQuery
    };

    set query(newSearchQuery) {
        this.searchQuery = newSearchQuery
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
    
}


// export default async function getImage(name, page) {
//   const URL = 'https://pixabay.com/api/';
//   const KEY = '29694280-1f89fd7ceb8297b5baecd65b3';
//  const filter = `?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

//   return await axios.get(`${URL}${filter}`).then(response => response.data);
// }

