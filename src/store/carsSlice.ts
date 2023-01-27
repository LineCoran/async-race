import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GarageListParams, WinnerListParams } from '../interfaces/types';

type Car = {
  name: string;
  color: string;
};

type CarsState = {
  cars: Car[];
  raceStatus: boolean;
  updateCarId: number | null;
  carListParams: GarageListParams;
  winnerListParams: WinnerListParams;
};

const initialState: CarsState = {
  cars: [],
  raceStatus: false,
  updateCarId: null,
  carListParams: {
    _limit: 7,
    _page: 1,
  },
  winnerListParams: {
    _limit: 10,
    _page: 1,
    _sort: 'id',
    _order: 'ASC',
  },
};

const carsSLice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addCar(state, action: PayloadAction<Car>) {
      state.cars.push({
        name: action.payload.name,
        color: action.payload.color,
      });
    },
    changeRaceStatus(state, action: PayloadAction<boolean>) {
      const currentState = state;
      currentState.raceStatus = action.payload;
    },
    addIdUpdatedCarSlice(state, action: PayloadAction<number | null>) {
      const currentState = state;
      currentState.updateCarId = action.payload;
    },
    changeGaragePage(state, action: PayloadAction<boolean>) {
      const currentState = state;
      currentState.carListParams._page += action.payload ? 1 : -1;
    },
    changeWinnerPage(state, action: PayloadAction<boolean>) {
      const currentState = state;
      currentState.winnerListParams._page += action.payload ? 1 : -1;
    },
    changeWinnerSort(state, action: PayloadAction<string>) {
      const currentState = state;
      if (currentState.winnerListParams._sort === action.payload) {
        if (currentState.winnerListParams._order === 'DESC') {
          currentState.winnerListParams._order = 'ASC';
        } else {
          currentState.winnerListParams._order = 'DESC';
        }
      } else {
        currentState.winnerListParams._sort = action.payload;
        currentState.winnerListParams._order = 'ASC';
      }
    },
  },
});

export const {
  addCar,
  changeRaceStatus,
  addIdUpdatedCarSlice,
  changeGaragePage,
  changeWinnerPage,
  changeWinnerSort,
} = carsSLice.actions;
export default carsSLice.reducer;
