var jsonData = [
    {
        "City":"Astana",
        "Сuisine": "Asian",
        "title": "Korean house",
        "time": "10:00 - 00:00",
        "image": "images/rests/1.jpg",
        "Average check":"17.500",
        "description": "Korean traditional restaurant. A chef from Korea is ready to surprise customers with his modern vision of Korean ancient recipes."
    },
    {
        "City":"Almaty",
        "Сuisine": "European",
        "title": "Mama mia",
        "time": "09:00 - 21:00",
        "image": "images/rests/2.jpg",
        "Average check":"6000",
        "description": "if you wanted to feel the atmosphere of Italy for at least half an hour, then our restaurant is the best solution for you. Try the delights of our chefs while listening to traditional Italian music"
    },
    {
        "City":"Shymkent",
        "Сuisine": "Fast food",
        "title": "Ali-doner",
        "time": "08:00 - 22:00",
        "image": "images/rests/3.jpg",
        "Average check":"3000",
        "description": "our doner guarantees you speed and good quality"
    },
    {
        "City":"Astana",
        "Сuisine": "European",
        "title": "Дареджани",
        "time": "10:00 - 20:00",
        "image": "images/rests/4.jpg",
        "Average check":"8000",
        "description": "in our kitchen everything is done with love and care. Only here you can try the famous original Georgian wine, which has been infused for more than 50 years"
    },
    {
        "City":"Almaty",
        "Сuisine": "Fast food",
        "title": "Бродвей Бургер",
        "time": "08:00 - 00:00",
        "image": "images/rests/5.jpg",
        "Average check":"4500",
        "description": "our burgers are distinguished by excellent quality marbled beef patties, and in our establishment you can pour unlimited drinks"
    },
    {
        "City":"Shymkent",
        "Сuisine": "Asian",
        "title": "Yakitoria",
        "time": "08:00 - 22:00",
        "image": "images/rests/6.jpg",
        "Average check":"11000",
        "description": "a popular restaurant of oriental Japanese cuisine; some of the ingredients for the dishes in this establishment were brought directly from Japan."
    },
    {
        "City":"Almaty",
        "Сuisine": "Asian",
        "title": "J.Z.Peking Duck",
        "time": "10:00 - 23:00",
        "image": "images/rests/7.jpg",
        "Average check":"15000",
        "description": "the only and unique Chinese restaurant in Almaty, where duck is prepared and served following all Asian standards"
    },

];

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
                    <a class="btn btn-link ps-0" href="post.html" style="text-decoration: none; color: black;">More..<i class="fa fa-long-arrow-alt-right ms-2"></i></a>
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

var showAll = false;
var maxItemsToShow = 6;

function updateBlogCards(data) {
    var container = document.getElementById("blogContainer");
    var row = container.querySelector(".row");
    row.innerHTML = "";

    var itemsToShow = showAll ? data.length : Math.min(maxItemsToShow, data.length);

    for (var i = 0; i < itemsToShow; i++) {
        var cardHtml = createBlogCard(data[i]);
        row.innerHTML += cardHtml;
    }
}

var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function() {
    var selectedCity = document.getElementById("city").value;
    var selectedCuisine = document.getElementById("cuisine").value;
    var selectedAverageCheck = document.getElementById("averageCheck").value;

    // Фильтруйте данные на основе выбранных опций
    var filteredData = originalData.filter(function (item) {
        var cityMatch = selectedCity === "all" || item.City === selectedCity;
        var cuisineMatch = selectedCuisine === "all" || item.Cuisine === selectedCuisine;
        var checkMatch = selectedAverageCheck === "all" || parseFloat(item["Average check"].replace(',', '')) >= parseFloat(selectedAverageCheck);

        return cityMatch && cuisineMatch && checkMatch;
    });

    // Обновите карточки на странице с отфильтрованными данными
    updateBlogCards(filteredData);
});

var toggleButton = document.getElementById("toggleButton");
toggleButton.addEventListener("click", function () {
    showAll = !showAll;
    updateBlogCards(showAll ? originalData : jsonData);
});