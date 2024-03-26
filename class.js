document.addEventListener("DOMContentLoaded", function() {
    var timeSelector = document.querySelector('.selector');

    function updateTime() {
        
        var timezone = 'Asia/Singapore'; 
        var options = { timeZone: timezone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };

        
        var currentTime = new Date().toLocaleTimeString('en-US', options);

        var gmtOffset = new Date().toLocaleTimeString('en-US', { timeZoneName: 'short', timeZone: timezone });

        
        timeSelector.innerHTML = '<i class="fa fa-globe"></i>  ( ' + gmtOffset + ')';
    }

    
    updateTime();

    
    setInterval(updateTime, 1000);
});

// Get all anchor elements with class openModalAnchor
const modalAnchors = document.querySelectorAll('.openModalAnchor');

// Attach click event listener to each anchor element
modalAnchors.forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const modalId = this.dataset.modalId; // Get the data-modal-id attribute value
        const modal = document.getElementById(modalId); // Get the corresponding modal
        if (modal) {
            modal.classList.add('show-modal'); // Show the modal
        }
    });
});

// Get references to all close buttons
const closeButtons = document.querySelectorAll(".close-button");

// Add click event listener to each close button
closeButtons.forEach(button => {
    button.addEventListener("click", function() {
        const modal = this.closest('.modal'); // Find the parent modal
        if (modal) {
            modal.classList.remove("show-modal"); // Hide the modal
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var menuIcon = document.querySelector('.menu-icon');
    var mobileMenu = document.querySelector('.mobile');

    function toggleMenu() {
        // Toggle the opacity property between 0 and 1
        mobileMenu.style.opacity = (mobileMenu.style.opacity === '1') ? '0' : '1';

        // Toggle the pointer-events property between 'auto' and 'none'
        mobileMenu.style.pointerEvents = (mobileMenu.style.pointerEvents === 'auto') ? 'none' : 'auto';
    }

    // Initially, add the event listener
    menuIcon.addEventListener('click', toggleMenu);
});

                  var scriptAppended = false;
                  var initialContent = null;

                  // Function to load content
                  function loadContent(event) {
                      event.preventDefault(); // Prevent the default behavior of the anchor tag

                      var targetDiv = event.target;
                      var isFirstSemesterActive = targetDiv.classList.contains('router-link-exact-active');

                      // If the "FIRST SEMESTER" div is already active and we have initial content, restore it
                      if (isFirstSemesterActive && initialContent !== null) {
                          document.getElementById("content").innerHTML = initialContent;
                          initializeClass2Script(); // Reinitialize the script in class2.html
                          return;
                      }

                      // Otherwise, load new content
                      var xhr = new XMLHttpRequest();
                      xhr.onreadystatechange = function() {
                          if (xhr.readyState === 4 && xhr.status === 200) {
                              var responseHTML = xhr.responseText;
                              var parser = new DOMParser();
                              var doc = parser.parseFromString(responseHTML, 'text/html');
                              var divToExtract = doc.querySelector('div[data-v-5dbba857][class="uistrings snipcss-5DEmj"]');
                              if (divToExtract) {
                                  var extractedHTML = divToExtract.outerHTML;
                                  var extractedScript = divToExtract.querySelector('script');
                                  document.getElementById("content").innerHTML = extractedHTML;
                                  if (extractedScript && !scriptAppended) { // Check if script exists and not already appended
                                      var script = document.createElement('script');
                                      script.innerHTML = extractedScript.textContent;
                                      document.body.appendChild(script); // Append the script to the bottom of the body
                                      scriptAppended = true;
                                  }
                                  initializeClass2Script(); // Reinitialize the script in class2.html
                              } else {
                                  document.getElementById("content").innerHTML = "The specified div was not found in the response.";
                              }
                          }
                      };
                      xhr.open('GET', '/class2.html', true);
                      xhr.send();

                      // Remove the div with class 'home'
                      var homeDiv = document.querySelector('.uistrings.browse');
                      if (homeDiv) {
                          homeDiv.parentNode.removeChild(homeDiv);
                      }
                  }

                  function loadContentback(event) {
                  event.preventDefault(); // Prevent the default behavior of the button
                  // Otherwise, load new content
                  var xhr = new XMLHttpRequest();
                  xhr.onreadystatechange = function() {
                      if (xhr.readyState === 4 && xhr.status === 200) {
                          var responseHTML = xhr.responseText;
                          var parser = new DOMParser();
                          var doc = parser.parseFromString(responseHTML, 'text/html');
                          var divToExtract = doc.querySelector('div[data-v-5dbba857][class="uistrings snipcss-5DEmj"]');
                          if (divToExtract) {
                              document.getElementById("content").innerHTML = divToExtract.outerHTML;
                          } else {
                              document.getElementById("content").innerHTML = "The specified div was not found in the response.";
                          }
                          // After loading content, initialize script
                          initializeClass2Script();
                      }
                  };
                  xhr.open('GET', '/class.html', true);
                  xhr.send();
              }

                  // Function to initialize script in class2.html
                  function initializeClass2Script() {
                      // Function to handle search
                      function handleSearch() {
                          var searchTerm = document.querySelector('.searchbar input').value.toLowerCase();
                          var results = document.querySelectorAll('.midresult');
                          // Loop through each result
                          results.forEach(function(result) {
                              var text = result.querySelector('.mid').textContent.toLowerCase();
                              var isVisible = text.includes(searchTerm);
                              // Show/hide based on search term
                              if (isVisible) {
                                  result.style.display = 'block';
                              } else {
                                  result.style.display = 'none';
                              }
                          });
                          // Update the count after filtering
                          updateResultCount();
                      }
                      // Function to update the count
                      function updateResultCount() {
                          var countElement = document.querySelector('.count .val');
                          var visibleResults = document.querySelectorAll('.midresult[style="display: block;"]');
                          var count = visibleResults.length;
                          countElement.textContent = count + (count === 1 ? ' Result' : ' Results');
                      }
                      // Event listener for search input
                      document.querySelector('.searchbar input').addEventListener('input', handleSearch);
                      // Call the function initially to set the count
                      handleSearch();

                     // Get all anchor elements with class openModalAnchor
                    const modalAnchors = document.querySelectorAll('.openModalAnchor');

                    // Attach click event listener to each anchor element

                    modalAnchors.forEach(anchor => {
                        anchor.addEventListener('click', function(event) {
                            event.preventDefault();
                            const modalId = this.dataset.modalId; // Get the data-modal-id attribute value
                            const modal = document.getElementById(modalId); // Get the corresponding modal
                            if (modal) {
                                modal.classList.add('show-modal'); // Show the modal
                            }
                        });
                    });

                    // Get references to all close buttons
                    const closeButtons = document.querySelectorAll(".close-button");

                    // Add click event listener to each close button
                    closeButtons.forEach(button => {
                        button.addEventListener("click", function() {
                            const modal = this.closest('.modal'); // Find the parent modal
                            if (modal) {
                                modal.classList.remove("show-modal"); // Hide the modal
                            }
                        });
                    });
                  }
           
                  
                  

                  document.addEventListener('DOMContentLoaded', function() {
                    // Function to handle search
                    function handleSearch() {
                      var searchTerm = document.querySelector('.searchbar input').value.toLowerCase();
                      var results = document.querySelectorAll('.midresult');
                      // Loop through each result
                      results.forEach(function(result) {
                        var text = result.querySelector('.mid').textContent.toLowerCase();
                        var isVisible = text.includes(searchTerm);
                        // Show/hide based on search term
                        if (isVisible) {
                          result.style.display = 'block';
                        } else {
                          result.style.display = 'none';
                        }
                      });
                      // Update the count after filtering
                      updateResultCount();
                    }
                    // Function to update the count
                    function updateResultCount() {
                      var countElement = document.querySelector('.count .val');
                      var visibleResults = document.querySelectorAll('.midresult[style="display: block;"]');
                      var count = visibleResults.length;
                      countElement.textContent = count + (count === 1 ? ' Result' : ' Results');
                    }
                    // Event listener for search input
                    document.querySelector('.searchbar input').addEventListener('input', handleSearch);
                    // Call the function initially to set the count
                    handleSearch();

                   
                  });

                  