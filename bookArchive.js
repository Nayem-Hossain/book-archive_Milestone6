//title
//author_name
//first_publish_year
//publisher


/*------------------- data and spinner toggle function --------------------- */
const Toggling = (id, BlockOrNone) => {
  const spinnerOrData = document.getElementById(id);
  spinnerOrData.style.display = BlockOrNone;
};


/*------------------- get Books by Searching --------------------- */
const getBooksBySearch = () => {
  const searchId = document.getElementById("search-field");
  const searchText = searchId.value;
  if (searchText) {
    searchId.value = "";
    Toggling("spinner", "block");
    Toggling("displayData", "none");
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
      .then((response) => response.json())
      .then((data) => displayBooksBySearch(data));
  } else {
    alert("Please Write Something...");
  }
};


/*------------------- Displaying Books by Searching --------------------- */
const displayBooksBySearch = (books) => {
  Toggling("spinner", "none");
  Toggling("displayData", "block");
  if (books.numFound > 0) {
    const resultsContainer = document.getElementById("numberOfResults");
    resultsContainer.innerHTML = `<h3 class="fw-bold">Total ${books.numFound} results found</h3>`;
    const booksContainer = document.getElementById("display-books");
    booksContainer.innerHTML = "";
    books.docs.forEach((book) => {
      const div = document.createElement("div");
      div.classList.add("col"); //Or: div.className ="col";
      div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top text-center image-fluid" alt="cover of:${book.title}" style="height: 350px;">
            <div class="card-body">
                <h3 class="card-title">${book.title}</h3>
                <p class="card-text"><span class="fw-bold">Written By:</span> ${book.author_name}</p>
                <small class="card-text">First published in ${book.first_publish_year}</small>
                <p><span class="fw-bold">Published By:</span> ${book.publisher}</p>
    
            </div>
            <div class="card-footer btn-outline-dark">
                <p class="text-center fw-bold p-0 m-0">view full cover</p>
            </div>
        </div>
        `;
      booksContainer.appendChild(div);
    });
  } else {
    console.log(books.numFound);
    const results = document.getElementById("numberOfResults");
    results.innerHTML = `<h3 class="text-danger text-center">No Results Found...</h3>`;
    document.getElementById("display-books").innerHTML='';
  }
};
