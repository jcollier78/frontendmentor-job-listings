const getData = new XMLHttpRequest();
const url = "data.json";

fetch(url).then(res => res.json()).then(data => {
    displayData(data);
});

// initial display of all listings
function displayData(data){
    data.forEach(e => {
        // create main box div
        let box = document.createElement('div');
        box.className = 'box';
        box.classList.add('filter-item');

        if(e.featured){
            box.classList.add('featured');
        }

        // add attributes as class names to box to filter in css
        box.classList.add(e.role.toLowerCase()); 
        box.classList.add(e.level.toLowerCase());
    
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

            // add attributes as class names to box to filter in css
            box.classList.add(elem.toLowerCase());
        });

        e.tools.forEach(elem => {
            attributeList.innerHTML += '<li>' + elem + '</li>';

            // add attributes as class names to box to filter in css
            box.classList.add(elem.toLowerCase());
        });

        attributes.appendChild(attributeList);
        col2.appendChild(attributes);
        box.appendChild(col2);

        document.querySelector("#content").appendChild(box);
    });



    // array of current filters
    let currentFilters = [];
        
    // add event listener to all li items within class 'attribute-list'
    // get array of li items
    let attributeItems = Array.from(document.querySelectorAll('.attribute-list li'));

    // add event listeners to all filter buttons
    attributeItems.forEach(item => {
        item.addEventListener('click', e => {
            // add clicked filter to currentFilters array - no duplicates
            if(currentFilters.indexOf(e.target.textContent.toLowerCase()) === -1){
                currentFilters.push(e.target.textContent.toLowerCase());
            }
            console.log(currentFilters);

            filterList();
        });
    });

    // clear button - empty currentFilters array
    const clearItems = document.querySelector('.clear-items');
    clearItems.addEventListener('click', () => {
        currentFilters = [];
        filterList();
        console.log(currentFilters);
    });

    // create buttons for filter list
    function buttonList(){
        let buttons = Array.from(document.querySelectorAll('.filter-list li'));
        buttons.forEach(item => {
            item.addEventListener('click', () => {
                const index = currentFilters.indexOf(item.textContent);
                if(currentFilters.indexOf(item.textContent) > -1){
                    currentFilters.splice(index, 1);
                    // console.log(currentFilters);
                    filterList();
                }
            });
        });
    }
    

    // add functionality to remove buttons on filtered items
    function filterList(){
        // if currentFilters array is empty, don't show filter box
        if(currentFilters.length > 0) {
            document.querySelector('.filter').classList.remove('hide');
        }
        else {
            document.querySelector('.filter').classList.add('hide');
        }

        document.querySelector('.filter-list').innerHTML = "";

        // add filter items to filter list and add event listeners to filter items
        currentFilters.forEach(item => {
            let listItem = document.createElement('li');
            listItem.textContent = item;
            document.querySelector('.filter-list').appendChild(listItem);
        });

        // filter job listings - if class list of box doesn't have any of the currentFilter items, hide it
        let boxesToFilter = Array.from(document.querySelectorAll(".filter-item"));
        boxesToFilter.forEach(elem => {
            // console.log(elem);
            // console.log(currentFilters.every(e => elem.classList.contains(e)));
            
            // check for boxes that don't have every item in currentFilters array and hide them
            if(!currentFilters.every(e => elem.classList.contains(e))){
                elem.classList.add("hide");
            }

            // show all boxes that have every item in currentFilters array and show them
            else {
                elem.classList.remove("hide");
            }
        });


        // update filter list
        buttonList();
    }


}




    

