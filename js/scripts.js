const xmlhttp = new XMLHttpRequest();
const url = "data.json";

xmlhttp.onreadystatechange = function(){
    let data = JSON.parse(this.responseText);
    console.log(data);
    // myFunction(data);
};
xmlhttp.open("GET", url, true);
xmlhttp.send;

function myFunction(data){
    console.log('hello');
    console.log(data[0].company);
}
