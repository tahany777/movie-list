'use strict';

let movieForm = document.getElementById('movie-form');
let movieTable = document.getElementById('movie-table');
let clearBtn = document.getElementById('clear');
let count = 0;

function Movie(name, img, release) {
    this.name = name;
    this.img = img;
    this.release = release;

    Movie.all.push(this);
}
Movie.all = [];

function handler(e) {
    e.preventDefault();

    let name = e.target.movieName.value;
    let img = e.target.movieImg.value;
    let release = e.target.year.value;

    new Movie(name, `./img/${img}.png`, release);

    localStorage.setItem('movie', JSON.stringify(Movie.all));
    count++;
    getData();
      
}

function resultView() {
    movieTable.innerHTML = '';
    
    let tableForm = document.createElement('table');
         movieTable.appendChild(tableForm);
         let headerRow = document.createElement('tr');
         tableForm.appendChild(headerRow);
         headerRow.innerHTML= '<th>#</th><th>Image</th><th>Name</th><th>Release</th>';
     for(let i = 0; i < Movie.all.length; i++){
         let rowTable = document.createElement('tr');
         tableForm.appendChild(rowTable);
         rowTable.innerHTML = `<td><a onclick='del(${i})'>X</a></td><td><img src='${Movie.all[i].img}'></td><td>${Movie.all[i].name}</td><td>${Movie.all[i].release}</td>`; 
     }
     let rowFooter = document.createElement('tr');
         tableForm.appendChild(rowFooter);
         rowFooter.innerHTML = `<th colspan='2'>Quantity</th><th colspan='2'>${count}</th>`;
 }
 function del(id) {
     Movie.all.splice(id, 1);
     localStorage.setItem('movie', JSON.stringify(Movie.all));
    getData();
    count--;
 }
function getData() {
    let data = JSON.parse(localStorage.getItem('movie')) || [];
    if(data) {
        Movie.all = [];
        for(let i = 0; i < data.length; i++) {
            new Movie(data[i].name, data[i].img, data[i].release);
        }
        resultView();  
    }
    
}
 getData();
 function clearFun() {
    movieTable.innerHTML = '';
     localStorage.removeItem('movie');
     getData();
 }
clearBtn.addEventListener('click', clearFun);
movieForm.addEventListener('submit', handler);
