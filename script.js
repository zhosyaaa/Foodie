let restaurantsData = []; 

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8080/api/restaurants')
        .then(response => response.json())
        .then(data => {
            restaurantsData = data; 
            addBlogCardsToPage(restaurantsData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
function createBlogCard(data) {
    var cardHtml = `
        <div class="col-lg-4 col-sm-6 mb-4 hover-animate">
            <div class="card shadow border-0 h-100">
                <a href="post.html"><img class="img-fluid card-img-top" src="${data.image}" alt="${data.title}"></a>
                <div class="card-body">
                    <a class="text-uppercase text-muted text-sm letter-spacing-2" href="#">${data.City}</a>
                    <h5 class="my-2"><a class="text-dark" href="post.html">${data.title}</a></h5>
                    <p class="text-gray-500 text-sm my-3"><i class="far fa-clock me-2"></i>${data.time}</p>
                    <p class="my-2 text-muted text-sm">${data.description}</p>
                    <p class="my-2 text-muted text-sm">Cuisine: ${data.Сuisine}</p>
                    <p class="my-2 text-muted text-sm">Average check: ${data["Average check"]}</p>      
                </div>
            </div>
        </div>
    `;

    return cardHtml;
}


function addBlogCardsToPage(data) {
    var container = document.getElementById("blogContainer");
    var row = container.querySelector(".row");

    data.forEach(function(blogItem) {
        var cardHtml = createBlogCard(blogItem);
        row.innerHTML += cardHtml;
    });
}

addBlogCardsToPage(jsonData);

// ---------------------------------------------------------------------------------
var filteredData = restaurantsData.slice(); 
document.getElementById("applyFilterButton").addEventListener("click", applyFilter);
function applyFilter() {
    const citySelect = document.getElementById('city').value;
    const cuisineSelect = document.getElementById('cuisine').value;
    const checkSelect = document.getElementById('averageCheck').value;

    console.log('Selected city:', citySelect);
    console.log('Selected cuisine:', cuisineSelect);
    console.log('Selected check:', checkSelect);

    filteredData = restaurantsData.filter(rest => {
        if (citySelect !== "" && rest.City !== citySelect) {
            return false;
        }
        if (cuisineSelect !== "" && rest.Сuisine !== cuisineSelect) {
            return false;
        }

        if (checkSelect !== "") {
            const [minPrice, maxPrice] = checkSelect.split("-").map(Number);
            const checkValue = parseFloat(rest["Average check"]);
            if (checkValue < minPrice || checkValue > maxPrice) {
                return false;
            }
        }

        return true;
    });

    console.log('Filtered data:', filteredData);

    var container = document.getElementById("blogContainer");
    var row = container.querySelector(".row");
    row.innerHTML = "";
    addBlogCardsToPage(filteredData);
}


addBlogCardsToPage(filteredData);

// -----------------------------------------------------------------------------

// var favoriteRestaurants = [];

// function getRestaurantByName(name) {
//     return restaurantsData.find(restaurant => restaurant.title === name);
// }

// function addToFavorites(restaurantName) {
//     favoriteRestaurants.push("")
//     console.log(favoriteRestaurant.Number)
//     const restaurant = getRestaurantByName(restaurantName);
//     isAlreadyFavorite = false
//     if (restaurant) {
        
//         restaurantsData.forEach(function(rest) {
//             if (rest.title === restaurant.title) {
//                 isAlreadyFavorite = true
//             }
//         });
        
//         if (!isAlreadyFavorite) {
//             favoriteRestaurants.push(restaurant);
//             alert('Added to favorites!');
//         } else {
//             alert('Already in favorites!');
//         }
//     } else {
//         alert('Restaurant not found!');
//     }
// }


let favoriteRestaurants = [];

function addToFavorites(title) {
    favoriteRestaurants.push(title);
    console.log(favoriteRestaurants);
}