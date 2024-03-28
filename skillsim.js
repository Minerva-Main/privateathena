document.addEventListener("DOMContentLoaded", function() {
    var mainPane = document.querySelector('.maps .card-list'); // Select the card-list inside .maps
    var searchInput = document.getElementById('searchInput');
    var searchButton = document.getElementById('searchButton');
    var nextPageToken = ''; // Variable to store the token for the next page of results

    // Function to fetch and display books based on search terms
    function fetchBooks(searchTerms) {
        // Make a request to the Google Books API
        var url = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerms;
        if (nextPageToken !== '') {
            url += '&pageToken=' + nextPageToken;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Clear any existing content in mainPane
                if (nextPageToken === '') {
                    mainPane.innerHTML = '';
                }

                // Loop through the items in the response and create HTML elements for each book
                data.items.forEach(book => {
                    // Create a div element for the book
                    var bookDiv = document.createElement('div');
                    bookDiv.classList.add('card-list-entry'); // Add card-list-entry class
                    bookDiv.setAttribute('data-v-83cab26c', ''); // Add data-v-83cab26c attribute

                    // Create a div element for item-card
                    var itemCardDiv = document.createElement('div');
                    itemCardDiv.classList.add('item-card');

                    // Create a link element for the book
                    var bookLink = document.createElement('a');
                    bookLink.href = book.volumeInfo.previewLink;
                    bookLink.classList.add('entry');

                    // Image
                    var coverImg = document.createElement('img');
                    coverImg.src = book.volumeInfo.imageLinks.thumbnail; // Use the thumbnail image
                    coverImg.alt = book.volumeInfo.title; // Alt text for accessibility

                    // Create a div element for the title and author
                    var titleAndAuthorDiv = document.createElement('div');
                    titleAndAuthorDiv.classList.add('title');

                    // Title
                    var title = document.createElement('div');
                    title.classList.add('head');
                    title.textContent = book.volumeInfo.title;

                    // Author
                    var author = document.createElement('div');
                    author.classList.add('remark');
                    author.textContent = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown';

                    // Append elements
                    titleAndAuthorDiv.appendChild(title);
                    titleAndAuthorDiv.appendChild(author);
                    bookLink.appendChild(coverImg);
                    bookLink.appendChild(titleAndAuthorDiv);
                    itemCardDiv.appendChild(bookLink);
                    bookDiv.appendChild(itemCardDiv);

                    // Make the book clickable
                    bookDiv.addEventListener('click', function(event) {
                        event.preventDefault(); // Prevent default behavior of the link
                        window.open(book.volumeInfo.previewLink, '_blank'); // Open in a new tab
                    });

                    // Append bookDiv to mainPane
                    mainPane.appendChild(bookDiv);
                });

                // Update nextPageToken
                nextPageToken = data.nextPageToken || '';
                updateLoadMoreButton(); // Update the visibility of the load more button
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }

    // Function to handle search
    function handleSearch() {
        var searchTerms = searchInput.value.trim();
        if (searchTerms !== '') {
            fetchBooks(searchTerms);
        }
    }

    // Event listener for search button click
    searchButton.addEventListener('click', handleSearch);

    // Event listener for Enter key press on search input
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    // Function to update the visibility of the load more button
    function updateLoadMoreButton() {
        if (nextPageToken) {
            var loadMoreButton = document.createElement('button');
            loadMoreButton.textContent = 'Load More';
            loadMoreButton.id = 'loadMoreButton';
            loadMoreButton.classList.add('load-more-button');
            mainPane.appendChild(loadMoreButton);

            // Event listener for load more button click
            loadMoreButton.addEventListener('click', function() {
                handleSearch(); // Fetch more books
            });
        }
    }

    // Call fetchBooks function to initially load books
    fetchBooks(''); // Empty search term to load some initial books
});