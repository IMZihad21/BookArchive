/*----------------------
Declare global variables
------------------------*/
const searchText = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const searchNumbers = document.getElementById('search-numbers');


/*--------
Functions
---------*/
const loadResults = async () => {
    const fetchAPI = `https://openlibrary.org/search.json?q=${searchText.value}`;
    const response = await fetch(fetchAPI);
    const results = await response.json();
    searchResults.textContent = '';
    if (results.numFound === 0) {
        showNoInput();
    }
    else {
        const resultNumber = document.createElement("div");
        resultNumber.classList.add('text-center')
        resultNumber.innerHTML = `
                <p class="display-6"><strong>${results.numFound}</strong> results found for <strong>${searchText.value}</strong></p>
                <p><small>* Showing books with cover images below</small></p>`;
        searchNumbers.textContent = '';
        searchNumbers.appendChild(resultNumber);
        showSearchResults(results.docs);
    }
}

const showSearchResults = (results) => {
    const newBookSection = document.createElement("div");
    newBookSection.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');
    searchResults.appendChild(newBookSection);
    results.forEach(book => {
        if (book.cover_i) {
            const newBook = document.createElement("div");
            newBook.classList.add("col");
            newBook.innerHTML = `
                        <div class="card h-100 bg-light">
                            <img class="h-100" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-thumbnail card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text">Authored by <span class="fw-bolder">${book.author_name}</span></p>
                                <p class="card-text">First published on ${book.first_publish_year} </p>
                            </div>
                        </div>
                    </div>`;
            newBookSection.appendChild(newBook);
        }
    });
};

const showNoResults = () => {
    searchNumbers.textContent = '';
    searchResults.innerHTML = `
        <div class="text-center">
            <h1 class="display-5">Enter the book Name you want to Search</h1>
        </div>`;
}

const showNoInput = () => {
    searchNumbers.textContent = '';
    searchResults.innerHTML = `
        <div class="text-center">
            <h1 class="display-5">No Book found with ${searchText.value} keyword</h1>
        </div>`;
}


/*-----------
Event Handler
------------*/
searchButton.onclick = () => {
    if (searchText.value === '') {
        showNoResults();
    }
    else {
        loadResults();
    }
}
