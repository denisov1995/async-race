import './styles.scss';
import {
  render, create, deleteAuto, getDate, startCar, generateCars,
  race, createPageGarage, linkPage, createPageWinner, sortInWinnerPage,
} from './page/page';
import store from './store/store';

import { getCars, getWinners } from './api';

getCars(store.carsPage).then((result) => getWinners({
  page: store.winnerPage, limit: 10, sort: 'id', order: 'ASC',
}).then((resultWinner) => render(result.items, result.count, resultWinner))
  .then(() => {
    create();
    deleteAuto();
    getDate();
    startCar();
    generateCars();
    race();
    createPageGarage();
    linkPage();
    createPageWinner();
    sortInWinnerPage();
  }));
