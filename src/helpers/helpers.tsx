import { carNames, carModels } from '../data/cars';
import { CarClassNames } from '../interfaces/enums';
import { CarApi, WinnerParams } from '../interfaces/types';

export function stopAnimation(id: number) {
  const car = document.getElementById(`car${id}`);
  if (car === null) return;
  car.style.animationPlayState = 'paused';
}

export function startAnimation(id: number, time: number) {
  const car = document.getElementById(`car${id}`);
  if (car === null) return;
  car.style.animation = time === Infinity ? '' : `race ${time}s linear forwards`;
}

export function calcTime(distance: number, velocity: number) {
  const COUNT_MS_IN_SECOND = 1000;
  return Number((distance / velocity / COUNT_MS_IN_SECOND).toFixed(1));
}

export async function isBestTime(id: number, newTime: number) {
  const data = await fetch(`http://127.0.0.1:3000/winners/${id}`);
  const car = await data.json();
  let time: number;
  if (car.time) {
    time = car.time;
    return newTime < time;
  }
  return false;
}

export async function getWinnerById(id: number) {
  const data = await fetch(`http://127.0.0.1:3000/winners/${id}`);
  const car: WinnerParams = await data.json();
  return car;
}

export function addStyleSelectedCar(listId: number) {
  const allCars = document.querySelectorAll(`.${CarClassNames.default}`);
  allCars.forEach((car) => {
    const element = car;
    element.className = CarClassNames.default;
  });
  allCars[listId].classList.toggle(CarClassNames.active);
}

export function generateRandomNumber(maxNumber: number) {
  return Math.floor(Math.random() * maxNumber);
}

export function generateRandomColor(): string {
  return `#${`${Math.random().toString(16)}000000`.substring(2, 8).toUpperCase()}`;
}

export function showWinnerCar(id: number, time: number) {
  const winnerCar = document.getElementById(`carname${id}`);
  if (winnerCar) {
    const carName = winnerCar.innerHTML;
    alert(`WINNER: ${carName} Time: ${time}`);
  }
}

export function createRowDate(id: number, time: number, wins: number) {
  const carName = carNames[generateRandomNumber(carNames.length)];
  const carModel = carModels[generateRandomNumber(carModels.length)];
  const name = `${carName} ${carModel}`;
  return { id, name, wins, time };
}

export function calcCountPages(dataList: WinnerParams[] | CarApi[] | undefined, limit: number) {
  const MIN_PAGES = 1;
  if (!dataList) return MIN_PAGES;
  return Math.ceil(dataList.length / limit);
}
