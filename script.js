'use strict';

const movieSelection = document.getElementById('movie');
const container = document.querySelector('.container');
const count = document.getElementById('count');
const total = document.getElementById('total');
const seats = document.querySelectorAll('.row .seat');

let ticketPrice = movieSelection.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}


function populateUI() {
  const getSelectedSeats = JSON.parse(localStorage.getItem('seatsIndex'));
  if (getSelectedSeats !== null && getSelectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (getSelectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const getSelectedMovie = localStorage.getItem('selectedMovieIndex');
  if (getSelectedMovie !== null) {
    movieSelection.selectedIndex = getSelectedMovie;

  }
}

populateUI();

// movie selection event listener
movieSelection.addEventListener('change', (event) => {
  ticketPrice = +event.target.value;
  setMovieData(event.target.selectedIndex, event.target.value);
  countSelectedSeats();
});

//selected seats and price counter
function countSelectedSeats() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('seatsIndex', JSON.stringify(seatsIndex));

  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}


// seats selection listener
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
    event.target.classList.toggle('selected');
    countSelectedSeats();
  }
})


countSelectedSeats();