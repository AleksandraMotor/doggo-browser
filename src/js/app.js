import '../sass/style.scss';

class Dogo {
    constructor() {
        this.apiUrl = 'https://dog.ceo/api';
        this.displayImg = document.querySelector('.current-dog__image img');
        this.displayName = document.querySelector('.current-dog__description__title');
        this.displayButtons = document.querySelector('.current-dog__description__record');
        this.subtitle = document.querySelector('.current-dog__description__subtitle');
        this.showList = document.querySelector('.breeds__selector');
        this.scrollbox = document.querySelector('.breeds__scrollbox');
        this.init();
    }

    getBreedsList() {
        return fetch(`${this.apiUrl}/breeds/list/all`)
            .then(resp => resp.json())
            .then(data => data.message);
    }

    getRandomImage() {
        return fetch(`${this.apiUrl}/breeds/image/random`)
            .then(resp => resp.json())
            .then(data => data.message);
    }

    getRandomImageByBreed(breed) {
        return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
        .then(resp => resp.json())
            .then(data => data.message);
    }

    init() {
        this.getRandomImage()
            .then(img => this.showImageWhenReady(img));

        this.showAllBreeds();
    }

    showImageWhenReady(image) {
        this.displayImg.setAttribute('src', image);
    }

    addBread(breed, subBreed) {
        let name;
        let type;
        if (typeof subBreed === 'undefined') {
            name = breed;
            type = breed;
        } else {
            name = `${breed} ${subBreed}`;
            type = `${breed}/${subBreed}`;
        }

        const listItem = document.createElement('div');
        listItem.classList.add('breeds__scrollbox__item');

        listItem.innerText = name;
        
        listItem.addEventListener('click', () => {
            window.scrollTo(0, 0);
            this.getRandomImageByBreed(type)
                .then(img => this.showImageWhenReady(img));
            
            this.subtitle.style.display = 'flex';
            this.displayName.innerText = name;

            const nextButton = document.createElement('button');
            nextButton.innerText = name;
            nextButton.classList.add('current-dog__description__record__button');
            nextButton.addEventListener('click', () => {
                this.getRandomImageByBreed(type)
                    .then(img => this.showImageWhenReady(img));
                    window.scrollTo(0, 0);
                this.displayName.innerText = name;
            });
            
            this.displayButtons.appendChild(nextButton);
            this.displayButtons.style.display = 'flex';
        });

        this.scrollbox.appendChild(listItem);

        this.showList.addEventListener('click', () => {
            this.showList.classList.toggle('breeds__selector--show');
            this.scrollbox.classList.toggle('breeds__scrollbox--show');
        })

        document.addEventListener('click', (event) => {
            if (event.target.id !== 'show') {
                this.showList.classList.remove('breeds__selector--show');
                this.scrollbox.classList.remove('breeds__scrollbox--show');
            }
        })

    }

    showAllBreeds() {
        this.getBreedsList()
            .then(breeds => {
                for (const breed in breeds) {
                    if (breeds[breed].length === 0) {
                        this.addBread(breed);
                    } else {
                        for (const subBreed of breeds[breed]) {
                            this.addBread(breed, subBreed);
                        }
                    }
                }
        });            
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Dogo();
});
