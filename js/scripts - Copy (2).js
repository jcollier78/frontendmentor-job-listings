const getData = new XMLHttpRequest();
const url = "data.json";

fetch(url).then(res => res.json()).then(data => {
    displayData(data);
});

function displayData(data){

    data.forEach(e => {
        // create main box div
        let box = document.createElement('div');
        box.className = 'box';
        if(e.featured){
            box.classList.add('featured');
        }
    
        // create first col
        let col1 = document.createElement('div');
        col1.className = 'col-1';

        col1.innerHTML += '<div class="logo"><img src="' + e.logo + '" alt=""></div>';

        // create company details div
        let company = document.createElement('div');
        company.className = 'company-details';

        company.innerHTML = '<div class="company">' + e.company + '</div>';
        if(e.new){
            company.innerHTML += '<div class="btn new-btn">New!</div>';
        }
        if(e.featured){
            company.innerHTML += '<div class="btn featured-btn">Featured</div>';
        }
        company.innerHTML += '<h2 class="position">' + e.position + '</h2>';

        let jobDetails = document.createElement('ul');
        jobDetails.className = 'job-details-list';

        jobDetails.innerHTML += '<li class="job-details-item">' + e.postedAt + '</li>';
        jobDetails.innerHTML += '<li class="job-details-item">' + e.contract + '</li>';
        jobDetails.innerHTML += '<li class="job-details-item">' + e.location + '</li>';
        jobDetails.innerHTML += '</ul>';
    
        company.appendChild(jobDetails);
        col1.appendChild(company);
        col1.innerHTML += "<hr>";
        box.appendChild(col1);

        // create second col
        let col2 = document.createElement('div');
        col2.className = 'col-2';

        let attributes = document.createElement('div');
        attributes.className = 'attributes';

        let attributeList = document.createElement('ul');
        attributeList.className = 'attribute-list';

        attributeList.innerHTML = '<li>' + e.role + '</li>';
        attributeList.innerHTML += '<li>' + e.level + '</li>';

        e.languages.forEach(elem => {
            attributeList.innerHTML += '<li>' + elem + '</li>';
        });

        e.tools.forEach(elem => {
            attributeList.innerHTML += '<li>' + elem + '</li>';
        });

        attributes.appendChild(attributeList);
        col2.appendChild(attributes);
        box.appendChild(col2);

        document.querySelector("#content").appendChild(box);
    });

    filterData(data);
}

function filterData(data) {

    // array of current filters
    let currentFilters = [];
    
    // add event listener to all li items within class 'attribute-list'

    // get array of li items
    let attributeItems = Array.from(document.querySelectorAll('.attribute-list li'));
    
    //loop through array and add event listener
    attributeItems.forEach(item => {
        item.addEventListener('click', e => {
            // add clicked filter to currentFilters array - don't allow duplicates
            if(currentFilters.indexOf(e.target.textContent) === -1){
                currentFilters.push(e.target.textContent);
            }
            console.log(currentFilters);

            // loop through data filter data according to currentFilters
            const filteredData = [];

            data.forEach(item => {
                currentFilters.forEach(e => {
                    if(currentFilters.length > 0 && item.role === e){
                        filteredData.push(item);
                    }
                });
            });

            // display filtered data
            if(currentFilters.length === 0){
                displayData(data);
            }
            else {
                document.getElementById('content').innerHTML = "";
                displayData(filteredData);
                console.log(filteredData);
            } 
        });
    });

    // clear button - empty currentFilters array
    const clearItems = document.querySelector('.clear-items');
    clearItems.addEventListener('click', (data) => {
        currentFilters = [];
        filterData(data);
    });
}



