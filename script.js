 const API_KEY = "315176a67cc047e78e7e9d7daddd0e51";

const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}


// Function to bind news article data to HTML elements
function bindData(articles) {
    // Get the container where the news cards will be displayed
    const cardsContainer = document.getElementById("cards-container");
    // Get the template for a single news card
    const newsCardTemplate = document.getElementById("template-news-card");

    // Clear the container to remove any existing content
    cardsContainer.innerHTML = "";

    // Iterate through each article in the provided list
    articles.forEach((article) => {
        // Skip articles without an image URL
        if (!article.urlToImage) return;

        // Clone the content of the news card template for each article
        const cardClone = newsCardTemplate.content.cloneNode(true);

        // Fill the cloned card with article-specific data
        fillDataInCard(cardClone, article);

        // Append the filled card to the container
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}


let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});