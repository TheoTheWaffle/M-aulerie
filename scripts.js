const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const captionText = document.getElementById('caption');
const closeModal = document.getElementById('closeModal');
let page = 1;

const loadImages = async () => {
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}`);
        const data = await response.json();
        data.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.url;
            imgElement.alt = image.id;
            imgElement.addEventListener('click', () => openModal(image.url, image.id));
            gallery.appendChild(imgElement);
        });
        page++;
    } catch (error) {
        console.error('Chyba při načítání obrázků:', error);
    }
};

const openModal = (url, id) => {
    modal.style.display = "block";
    modalImg.src = url;
    captionText.innerHTML = `ID obrázku: ${id}`;
};

closeModal.onclick = () => {
    modal.style.display = "none";
};

window.onclick = event => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadImages();
    }
});

window.addEventListener('keydown', (event) => {
    if (modal.style.display === "block") {
        if (event.key === 'ArrowRight') {
            // Handle next image
        } else if (event.key === 'ArrowLeft') {
            // Handle previous image
        }
    }
});

loadImages();
