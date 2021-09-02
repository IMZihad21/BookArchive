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
    if (searchText.value === '') {
        showNoResults();
    }
    else if (results.numFound === 0) {
        showNoInput();
    }
    else {
        showSearchResults(results.numFound, results.docs);
    }
}

const showSearchResults = (resultnum, results) => {
    // Handles Result number display
    const resultNumber = document.createElement("div");
    resultNumber.classList.add('text-center')
    resultNumber.innerHTML = `
                <p class="display-6"><strong>${resultnum}</strong> results found for <strong>${searchText.value}.</strong></p>
                <p><small><strong>${results.length}</strong> Results were fetched and displayed.</small></p>`;
    searchNumbers.textContent = '';
    searchText.value = '';
    searchNumbers.appendChild(resultNumber);
    // Handles Results display
    const newBookSection = document.createElement("div");
    newBookSection.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');
    searchResults.appendChild(newBookSection);
    results.forEach(book => {
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
    });
};

const showNoResults = () => {
    searchNumbers.textContent = '';
    searchResults.innerHTML = `
        <div class="text-center">
            <h1 class="display-5">You must enter some keywords to find books</h1>
        </div>`;
}

const showNoInput = () => {
    searchNumbers.textContent = '';
    searchResults.innerHTML = `
        <div class="text-center">
            <h1 class="display-5">No Book found with ${searchText.value} keyword</h1>
        </div>`;
    searchText.value = '';
}


/*-----------
Event Handler
------------*/
searchButton.onclick = loadResults;