const getData = new XMLHttpRequest();
const url = "data.json";

fetch(url).then(res => res.json()).then(data => {
    filterData(data);
});

function filterData(data) {
    // get filters
    let posFilters = [];
    let roleFilters = [];
    let levelFilters = [];
    let postedFilters = [];
    let contractFilters = [];
    let locFilters = [];
    let langFilters = [];
    let toolFilters = [];

    //loop through all listings
    data.forEach(e => {
        if(posFilters.indexOf(e.role) === -1){
            posFilters.push(e.role);
        }

        if(roleFilters.indexOf(e.level) === -1){
            roleFilters.push(e.level);
        }

        if(postedFilters.indexOf(e.postedAt) === -1){
            postedFilters.push(e.postedAt);
        }

        if(contractFilters.indexOf(e.contract) === -1){
            contractFilters.push(e.contract);
        }

        if(locFilters.indexOf(e.location) === -1){
            locFilters.push(e.location);
        }

        // loop through languages array, check if item is in langFilter, add if not 
        e.languages.forEach(item => {
            if(langFilters.indexOf(item) === -1){
                langFilters.push(item);
            }
        });

        // loop through tools array, check if item is in langFilter, add if not
        e.tools.forEach(item => {
            if(toolFilters.indexOf(item) === -1){
                toolFilters.push(item);
            }
        });
    });

    console.log(posFilters);
    console.log(roleFilters);
    console.log(levelFilters);
    console.log(postedFilters);
    console.log(contractFilters);
    console.log(locFilters);
    console.log(langFilters);
    console.log(toolFilters);

    // array of current filters - update everytime a filter is added or removed
    currentFilters = ['Frontend', 'USA Only', ];
    filteredData = data;

    data.forEach(e => {
        e.filter
    });
    
    displayData(filteredData);
}

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

        document.querySelector("main").appendChild(box);
    });

    
}

