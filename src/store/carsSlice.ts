import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Car = {
  name: string;
  color: string;
};

type CarListParams = {
  page: number;
  limit: number;
};

type WinnerListParams = {
  page: number;
  limit: number;
  sort: string;
  order: string;
};

type CarsState = {
  cars: Car[];
  raceStatus: boolean;
  updateCarId: number | null;
  carListParams: CarListParams;
  winnerListParams: WinnerListParams;
};

const initialState: CarsState = {
  cars: [],
  raceStatus: false,
  updateCarId: null,
  carListParams: {
    limit: 7,
    page: 1,
  },
  winnerListParams: {
    limit: 10,
    page: 1,
    sort: 'id',
    order: 'ASC',
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
      currentState.carListParams.page += action.payload ? 1 : -1;
    },
    changeWinnerPage(state, action: PayloadAction<boolean>) {
      const currentState = state;
      currentState.winnerListParams.page += action.payload ? 1 : -1;
    },
    changeWinnerSort(state, action: PayloadAction<string>) {
      const currentState = state;
      if (currentState.winnerListParams.sort === action.payload) {
        if (currentState.winnerListParams.order === 'DESC') {
          currentState.winnerListParams.order = 'ASC';
        } else {
          currentState.winnerListParams.order = 'DESC';
        }
      } else {
        currentState.winnerListParams.sort = action.payload;
        currentState.winnerListParams.order = 'ASC';
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
