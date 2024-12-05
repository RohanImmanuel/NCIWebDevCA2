
function toggleAccordionBasedOnScreenSize() {
    if (window.innerWidth >= 992) {
        $('.accordion-collapse').each(function () {
            $(this).addClass('show');
        });
    } else {
        $('.accordion-collapse').each(function () {
            $(this).removeClass('show');
        });
    }
}

function showWindow(r) {
    $('#window-name').text(r.name);
    $('#window-description').text(r.description);
    $('#window-rating').text(r.rating);
    $('#window-cuisine').text(r.cuisine);
    $('#window-priceRange').text(r.priceRange);
    $('#window-address').text(r.address);
    $('#window-phone').text(r.phone);
    $('#window-link').text(r.website);
    $('#window-link').attr('href', r.website);
    $('#window').show();
}

function filterList() {
    let nList = restaurants;
    
    let search = $('#search-filter').val().toLowerCase();
    if(search) {
        nList = nList.filter(r => {
            return r.name.toLowerCase().includes(search) || r.description.toLowerCase().includes(search) || r.cuisine.toLowerCase().includes(search);
        });
    }
    
    let cuisine = $('#cuisine-filter').val();
    if(cuisine && cuisine != 'all') {
        nList = nList.filter(r => {
            return r.cuisine == cuisine;
        });
    }
    
    let ratingArr = $('.raiting-filter-cb:checked').map(function () {
        return Number($(this).val());
    }).get();
    if(ratingArr.length > 0) {
        let rating = Math.min(...ratingArr);
        nList = nList.filter(r => {
            return r.rating >= rating;
        });
    }
    
    let prArr = $('.pr-filter-cb:checked').map(function () {
        return $(this).val();
    }).get();
    if(prArr.length > 0) {
        nList = nList.filter(r => {
            for(let pr in prArr) {
                if(r.priceRange == prArr[pr]) {
                    return true;
                }
            }
            return false;
        });
    }
    
    updateList(nList);
}

function updateList(list) {
    let lv = $('#list-view');
    lv.empty();
    
    for(let i in list) {
        let elm = $(`
            <div class="col-md-6 col-lg-4">
                <div class="card mb-3 shadow">
                    <img src="img/restaurants/restaurantsCommon.jpg" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">${list[i].name}</h5>
                            <p class="card-text text-truncate">${list[i].description}</p>
                            <p class="card-text text-end">
                                <i class="text-warning fa-solid fa-star"></i> ${list[i].rating}
                                <span class="badge text-bg-warning float-start">${list[i].cuisine}</span>
                                <span class="badge text-bg-success float-start ms-1">${list[i].priceRange}</span>
                            </p>
                        </div>
                    </div>
                </div>`);
        lv.append(elm);
        elm.on('click', function() {
            console.log('click', list[i]);
            showWindow(list[i]);
        });
    }
}

$(document).ready(function () {
    $('#cuisine-filter').on('change', filterList);
    $('.raiting-filter-cb').on('change', filterList);
    $('.pr-filter-cb').on('change', filterList);
    $('#search-filter').on('input', filterList);
    filterList();
    
    $(window).on('resize', toggleAccordionBasedOnScreenSize);
    toggleAccordionBasedOnScreenSize();
    
    $('#window-close').on('click', function() {
        $('#window').hide();
    });
});
