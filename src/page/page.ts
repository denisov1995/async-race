import {
  getCars, getCar, createCar, deleteCar, updateCar, startEngine, drive, getWinners, saveWinner, deleteWinner,
  IWinners,
} from '../api';
import { generateRandomCars, getDistance } from '../utils/utils';
import store from '../store/store';
import carImageTemplate from '../../public/image.svg';
import flagImageTemplate from '../../public/flag.svg';

const getCarImage = (color: string, id: string): SVGAElement => {
  const el = document.createElement('div');
  el.innerHTML = carImageTemplate;
  const svg = el.querySelector<SVGAElement>('.car-svg');
  if (!svg) throw new Error();
  svg?.setAttribute('id', `car-svg-${id}`);
  const svgFill = svg?.querySelector('.car-svg-fill');
  if (!svgFill) throw new Error();
  (svgFill as SVGAElement).style.fill = color;
  return svg;
};

const getFlag = (id: string): SVGAElement => {
  const el = document.createElement('div');
  el.innerHTML = flagImageTemplate;
  const svg = el.querySelector<SVGAElement>('.flag-svg');
  if (!svg) throw new Error();
  svg?.setAttribute('id', `flag-svg-${id}`);
  return svg;
};

const getGarageControls = () => `
  <div class="garage-form">
    <form id="create" class="form">
      <input type="text" class="input" id="create-name">
      <input type="color" class="input" id="create-color" value="#ffffff">
      <button class="btn" id="create-btn" type="submit">Create</button>
    </form>
    <form id="update" class="form">
      <input type="text" class="input" id="update-name" disabled>
      <input type="color" class="input" id="update-color" value="#ffffff" disabled>
      <button class="btn" id="update-btn" type="submit" disabled>Update</button>
    </form>
  </div>
  <div class="race-btns">
    <button class="btn race-btn" id="race">Race</button>
    <button class="btn reset-btn" id="reset" disabled>Reset</button>
    <button class="btn generator-btn" id="generator">Generate cars</button>
  </div>
`;

const getRenderCar = (name: string, id: string, color: string) => `
  <div class="service-btn">
    <button class="btn select-btn" id="select-btn-${id}">Select</button>
    <button class="btn remove-btn" id="remove-btn-${id}">Remove</button>
    <span class="car-name">${name}</span>
  </div>
  <div class="road">
    <div class="roads-btns">
    <button class="btn start-car" id="start-${id}">A</button>
    <button class="btn stop-car" id="stop-${id}" disabled>B</button>
    </div>
    <div class="car" id="car">
        ${getFlag(id).outerHTML}${getCarImage(color, id).outerHTML}
    
    </div>
  </div>
`;

const getGarageGame = (cars: Array<{ name: string; id: string; color: string; }>, count: string) => `
  <div id="garage">
    <h1>Garage (${count})</h1>
    <h2>Page (${store.carsPage})</h2>
    <ul class="garage">
      ${cars.map((car: { name: string; id: string; color: string; }) => `
        <li>${getRenderCar(car.name, car.id, car.color)}</li>
      `).join('')}
    </ul>
    <button class="btn prev" id="prev" disabled>PREV</button>
    <button class="btn next" id="next">NEXT</button>
    <p class="message-win"></p>
  </div>
`;

const getPageWinners = async (result: IWinners) => {
  let root: HTMLElement;
  if (!document.querySelector('.winners-page')) {
    root = document.createElement('div');
    root.classList.add('winners-page');
  } else {
    root = <HTMLElement>document.querySelector('.winners-page');
  }
  const winnerPromise = result;
  const { items } = winnerPromise;
  const { count } = winnerPromise;
  const html = `
  <h1>Winners (${count})</h1>
  <h2>Page (${store.winnerPage})</h2>
  <table class="table" cellspacing="0" border="2" cellpadding="0">
   <thead>
    <th>Number</th>
    <th>Motorbike</th>
    <th>Name</th>
    <th class="table-btn table-wins ${store.sortBy === 'wins' ? store.sortOrder : ''}" id="sort-by-wins">Wins</th>
    <th class="table-btn table-time ${store.sortBy === 'time' ? store.sortOrder : ''}" id="sort-by-time">
    Best time (seconds)
    </th>
   </thead>
   <tbody>
     ${items.map(
    (winner: { id: string; wins: string; time: string; car: { name: string; id: string; color: string; } },
      index: number) => `
     <tr>
      <td>${(store.winnerPage * 10 - 10) + index + 1}</td>
      <td>${getCarImage(winner.car.color, winner.id).outerHTML}</td>
      <td>${winner.car.name}</td>
      <td>${winner.wins}</td>
      <td>${winner.time}</td>
     </tr>
    `,
  ).join('')}
   </tbody>
  </table>
  <button class="btn prev" id="prev-winner">PREV</button>
  <button class="btn next" id="next-winner">NEXT</button>`;
  root.innerHTML = html;
  const div = <HTMLElement>document.querySelector('.root');
  div.appendChild(root);
};

function checkBtnPageControlsWinner() {
  const prev = document.getElementById('prev-winner');
  const next = document.getElementById('next-winner');
  if (store.winnerPage === 1) {
    prev?.setAttribute('disabled', '');
  } else {
    prev?.removeAttribute('disabled');
  }
  getWinners({
    page: store.winnerPage, limit: 10, sort: 'id', order: 'ASC',
  }).then((result) => {
    if (store.winnerPage === Math.ceil(Number(result.count) / 10)) {
      next?.setAttribute('disabled', '');
    } else {
      next?.removeAttribute('disabled');
    }
  });
}

async function renderPageWinners() {
  await getWinners({
    page: store.winnerPage, limit: 10, sort: store.sortBy, order: store.sortOrder,
  }).then((result) => getPageWinners(result));
  checkBtnPageControlsWinner();
}

export const render = async (cars: Array<{ name: string; id: string; color: string; }>,
  count: string, winner: IWinners): Promise<void> => {
  const html = `
    <div class="nav">
      <button class="btn btn-garage" disabled>Garage</button>
      <button class="btn btn-winners">Winners</button>
    </div>
    <div class="garage-page">
      ${getGarageControls()}
      ${getGarageGame(cars, count)}
    </div>`;
  const root = document.createElement('div');
  root.classList.add('root');
  root.innerHTML = html;
  document.body.appendChild(root);
  getPageWinners(winner);
};

async function renderGarage(pageNumber: number) {
  const root = document.getElementById('garage');
  if (!root) throw new Error('eror');
  root.innerHTML = await getCars(pageNumber).then((result) => getGarageGame(result.items, result.count));
}

export function create(): void {
  document.getElementById('create')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const createName = (<HTMLInputElement>document.getElementById('create-name'));
    const createColor = (<HTMLInputElement>document.getElementById('create-color'));
    const map = {
      name: createName.value,
      color: createColor.value,
    };
    await createCar(map);
    renderGarage(store.carsPage);
    createName.value = '';
    createColor.value = '#ffffff';
    const raceBtn = (document.querySelector('.race-btn') as HTMLButtonElement);
    const resetBtn = (document.querySelector('.reset-btn') as HTMLButtonElement);
    raceBtn.disabled = false;
    resetBtn.disabled = true;
  });
}

export function deleteAuto(): void {
  const gar = document.getElementById('garage');
  gar?.addEventListener('click', async (e) => {
    if (e.target instanceof Element) {
      if (!e.target) throw new Error();
      if (e.target.classList.contains('remove-btn')) {
        const btnName = e.target.id.split('-');
        const btnId = btnName[btnName.length - 1];
        await deleteCar(btnId);
        await deleteWinner(btnId);
        renderGarage(store.carsPage);
        await renderPageWinners();
      }
    }
  });
}

interface IState {
  id: number,
  name: string,
  color: string,
}

const state: IState = {
  id: 0,
  name: '',
  color: '',
};

function update(selectedCard: IState) {
  const getName = (<HTMLInputElement>document.getElementById('update-name'));
  const getColor = (<HTMLInputElement>document.getElementById('update-color'));
  getName.removeAttribute('disabled');
  getColor.removeAttribute('disabled');
  document.getElementById('update-btn')?.removeAttribute('disabled');
  getName.value = selectedCard.name;
  getColor.value = selectedCard.color;
  document.getElementById('update')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    state.name = getName.value;
    state.color = getColor.value;
    await updateCar(state, state.id);
    renderGarage(store.carsPage);
    getName.value = '';
    getColor.value = '#ffffff';
    getName.setAttribute('disabled', '');
    getColor.setAttribute('disabled', '');
    document.getElementById('update-btn')?.setAttribute('disabled', '');
  });
}

export async function getDate(): Promise<void> {
  const gar = document.getElementById('garage');
  gar?.addEventListener('click', async (e) => {
    if (e.target instanceof Element) {
      if (!e.target) throw new Error();
      if (e.target.classList.contains('select-btn')) {
        const btnName = e.target.id.split('-');
        state.id = +btnName[btnName.length - 1];
        const selectedCard: IState = await getCar(state.id);
        update(selectedCard);
      }
    }
  });
}

export function startCar(): void {
  const gar = document.getElementById('garage');
  gar?.addEventListener('click', async (e) => {
    if (e.target instanceof Element) {
      if (!e.target) throw new Error();
      if (e.target.classList.contains('start-car')) {
        const flagSvg = <HTMLElement>document.querySelector('.flag-svg');
        const carSvg = <HTMLElement>document.querySelector('.car-svg');
        const htmlDistance = await getDistance(carSvg, flagSvg);
        const btnId = e.target.id.split('-')[1];
        const newCar = document.getElementById(`car-svg-${btnId}`);
        const stopCar = (document.getElementById(`stop-${btnId}`) as HTMLButtonElement);
        const startBtnCar = (document.getElementById(`start-${btnId}`) as HTMLButtonElement);
        startBtnCar.disabled = true;
        const { velocity, distance } = (await startEngine(+btnId));
        const time = Math.round((distance / velocity) / 1000);

        let pos = 0;
        const way = setInterval(() => {
          if (pos === Math.round(htmlDistance + 50)) {
            clearInterval(way);
            if (!stopCar) throw new Error();
            stopCar.disabled = false;
          } else {
            pos++;
            if (!newCar) throw new Error();
            newCar.style.left = `${pos}px`;
          }
        }, time);
        const { success } = await drive(Number(btnId));
        if (!success) {
          clearInterval(way);
          if (!stopCar) throw new Error();
          stopCar.disabled = false;
        }

        stopCar?.addEventListener('click', () => {
          if (!newCar) throw new Error();
          newCar.style.left = '0px';
          stopCar.disabled = true;
          startBtnCar.disabled = false;
        });
      }
    }
  });
}

export function generateCars(): void {
  const raceBtn = (document.querySelector('.race-btn') as HTMLButtonElement);
  const resetBtn = (document.querySelector('.reset-btn') as HTMLButtonElement);
  const genetateBtn = <HTMLInputElement>document.querySelector('.generator-btn');
  async function getGenerateCars() {
    const cars: Array<{ name: string, color: string }> = generateRandomCars();
    for (let i = 0; i < cars.length; i++) {
      createCar(cars[i]);
    }
    renderGarage(store.carsPage);
    raceBtn.disabled = false;
    resetBtn.disabled = true;
  }
  genetateBtn?.addEventListener('click', getGenerateCars);
}

function makeActiveOrInactive(btn: HTMLButtonElement[], status: boolean) {
  for (let i = 0; i < btn.length; i++) {
    btn[i].disabled = status;
  }
}

interface Istate {
  id: number,
  time: number,
  status: boolean,
}

interface ITime {
  name: string;
  id: string;
  color: string;
}

const stateWins: Istate = {
  id: 0,
  time: 20,
  status: false,
};

export async function race(): Promise<void> {
  const raceBtn = (document.querySelector('.race-btn') as HTMLButtonElement);
  const resetBtn = (document.querySelector('.reset-btn') as HTMLButtonElement);
  const allBtnStop = [...(document.querySelectorAll('.stop-car') as NodeListOf<HTMLButtonElement>)];

  makeActiveOrInactive(allBtnStop, true);
  raceBtn?.addEventListener('click', async () => {
    const allCarsSvg: NodeListOf<HTMLInputElement> = document.querySelectorAll('.car-svg');
    const allBtnStart = [...(document.querySelectorAll('.start-car') as NodeListOf<HTMLButtonElement>)];
    raceBtn.disabled = true;
    makeActiveOrInactive(allBtnStart, true);
    const allTimesCars: Array<number> = [];
    const allServerCars = (await getCars(store.carsPage)).items;
    const timeCar = allServerCars.map(async (e: ITime) => {
      const { velocity, distance } = (await startEngine(+e.id));
      allTimesCars.push(distance / velocity);
    });
    await Promise.all(timeCar);

    const rrr = allServerCars.map((e, i: number) => new Promise<string>((resolve) => {
      const asyncWrap = async () => {
        const flagSvg = <HTMLElement>document.querySelector('.flag-svg');
        const carSvg = <HTMLElement>document.querySelector('.car-svg');
        const allCarSvg = document.querySelectorAll('.car-svg');

        const htmlDistance = await getDistance(carSvg, flagSvg);
        let start = 0;
        function step(timestamp: number) {
          if (!start) start = timestamp;
          const time = timestamp - start;
          const passed = Math.round(time * ((htmlDistance + 50) / allTimesCars[i]));
          allCarsSvg[i].style.transform = `translateX(${Math.min(passed, (htmlDistance + 50))}px)`;
          if (passed > htmlDistance + 50) {
            const ttt = allCarSvg[i].id.split('-');
            stateWins.id = +ttt[ttt.length - 1];
            allTimesCars[i] /= 1000;
            const message = `winner ${allServerCars[i].name} ${Math.round((allTimesCars[i]) * 100) / 100} sec`;
            resetBtn.disabled = false;
            stateWins.status = false;

            stateWins.time = Math.round((allTimesCars[i]) * 100) / 100;
            resolve(message);
          }
          if (passed < (htmlDistance + 50)) {
            stateWins.id = window.requestAnimationFrame(step);
          }
        }
        stateWins.id = window.requestAnimationFrame(step);
        const { success } = await drive(Number(e.id));
        if (!success) {
          resetBtn.disabled = false;
          window.cancelAnimationFrame(stateWins.id);
        }
      };
      asyncWrap();
    }));

    const ggg = await Promise.race(rrr);
    const mess = <HTMLInputElement>document.querySelector('.message-win');
    mess.innerHTML = `${ggg}`;

    await saveWinner(stateWins.id, stateWins.time);

    resetBtn?.addEventListener('click', () => {
      const newCarsSvg = [...allCarsSvg];

      for (let i = 0; i < newCarsSvg.length; i++) {
        newCarsSvg[i].style.transform = 'translateX(0px)';
      }
      mess.innerHTML = '';
      resetBtn.disabled = true;
      raceBtn.disabled = false;
      makeActiveOrInactive(allBtnStart, false);
    });
  });
}

function checkBtnPageControls() {
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  if (store.carsPage === 1) {
    prev?.setAttribute('disabled', '');
  } else {
    prev?.removeAttribute('disabled');
  }
  getCars(store.carsPage).then((result) => {
    if (store.carsPage === Math.ceil(Number(result.count) / 7)) {
      next?.setAttribute('disabled', '');
    } else {
      next?.removeAttribute('disabled');
    }
  });
}

export async function createPageGarage(): Promise<void> {
  const garage = document.getElementById('garage');
  checkBtnPageControls();

  garage?.addEventListener('click', async (e) => {
    if (e.target instanceof Element) {
      if (!e.target) throw new Error();
      if (e.target.classList.contains('next')) {
        store.carsPage++;
        await renderGarage(store.carsPage);
        checkBtnPageControls();
      }
      if (e.target.classList.contains('prev')) {
        store.carsPage--;
        await renderGarage(store.carsPage);
        checkBtnPageControls();
      }
    }
  });
}

export async function linkPage(): Promise<void> {
  const btnGarage = <HTMLElement>document.querySelector('.btn-garage');
  const btnWinner = <HTMLElement>document.querySelector('.btn-winners');
  const pageGarage = <HTMLDivElement>document.querySelector('.garage-page');
  const pageWinner = <HTMLDivElement>document.querySelector('.winners-page');
  document.body.addEventListener('click', async (e) => {
    if (e.target instanceof Element) {
      if (!e.target) throw new Error();
      if (e.target.classList.contains('btn-garage')) {
        btnGarage?.setAttribute('disabled', '');
        btnWinner?.removeAttribute('disabled');
        pageWinner.style.display = 'none';
        pageGarage.style.display = 'block';
      }
      if (e.target.classList.contains('btn-winners')) {
        btnWinner?.setAttribute('disabled', '');
        btnGarage?.removeAttribute('disabled');
        pageGarage.style.display = 'none';
        pageWinner.style.display = 'block';
        renderPageWinners();
      }
    }
  });
}

export async function createPageWinner(): Promise<void> {
  const winners = document.querySelector('.winners-page');
  checkBtnPageControlsWinner();
  winners?.addEventListener('click', async (event) => {
    if (event.target instanceof Element) {
      if (!event.target) throw new Error();
      if (event.target.classList.contains('next')) {
        store.winnerPage++;
        await renderPageWinners();
        checkBtnPageControlsWinner();
      }
      if (event.target.classList.contains('prev')) {
        store.winnerPage--;
        await renderPageWinners();
        checkBtnPageControlsWinner();
      }
    }
  });
}

const setSortOrder = async (sortBy: string) => {
  store.sortOrder = store.sortOrder === 'ASC' ? 'DESC' : 'ASC';
  store.sortBy = sortBy;

  await renderPageWinners();
};

export async function sortInWinnerPage(): Promise<void> {
  const winners = document.querySelector('.winners-page');
  checkBtnPageControlsWinner();
  winners?.addEventListener('click', async (event) => {
    if (event.target instanceof Element) {
      if (!event.target) throw new Error();
      if (event.target.classList.contains('table-wins')) {
        setSortOrder('wins');
      }
      if (event.target.classList.contains('table-time')) {
        setSortOrder('time');
      }
    }
  });
}
