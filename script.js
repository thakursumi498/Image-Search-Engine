const accessKey = "IsvrfouznZUnDu6ST9Ta2YheDqqBUBCquK0dzsuMYeg";

const searchForm = document.getElementById("search-Form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showmorebtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    if (keyword !== searchBox.value) {
        searchResult.innerHTML = ""; // Clear previous results
    }
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    if (results.length > 0) {
        showmorebtn.style.display = "block";
    } else {
        showmorebtn.style.display = "none";
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showmorebtn.addEventListener("click", () => {
    page++;
    searchImages();
});
