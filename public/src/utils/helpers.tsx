type WinnerParams = {
    id: number,
    wins: number,
    time: number,
  }

export function stopAnimation(id: number) {
    const car = document.getElementById('car'+id);
    if (car === null) return;
    car.style.animationPlayState = 'paused';
}

export function startAnimation(id: number, time: number) {
    const car = document.getElementById('car'+id);
    if (car === null) return;
    car.style.animation = (time === Infinity) 
    ? ''
    : `race ${time}s linear forwards`;
}

export function calcTime(distance: number, velocity: number) {
    const COUNT_MS_IN_SECOND = 1000;
    return Number((distance/velocity/COUNT_MS_IN_SECOND).toFixed(1));

}

export async function isBestTime(id: number, newTime: number) {
    const data = await fetch(`http://127.0.0.1:3000/winners/${id}`);
    const car = await data.json();
    let time: number;
    if (car.time) {
        time = car.time;
        return newTime < time;
    } else {
        return false;
    }
}

export async function getWinnerById(id: number) {
    const data = await fetch(`http://127.0.0.1:3000/winners/${id}`);
    const car: WinnerParams= await data.json();
    return car;
}

export function addStyleSelectedCar(listId: number) {
    const allCars = document.querySelectorAll('.car-wrapper');
    allCars.forEach((car) => {
        car.className = 'car-wrapper';
    })
    allCars[listId].classList.toggle('car-wrapper-active');
}