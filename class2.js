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


                        