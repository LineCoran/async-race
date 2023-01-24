import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Car = {
    name: string;
    color: string;
}

type carListParams = {
    _page: number;
    _limit: number;
}

type winnerListParams = {
    _page: number;
    _limit: number;
    _sort: string;
    _order: string;
}

type CarsState = {
    cars: Car[];
    raceStatus: boolean;
    updateCarId: number | null;
    carListParams: carListParams;
    winnerListParams: winnerListParams;
}

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
    }
}

const carsSLice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        addCar(state, action: PayloadAction<Car>) {
            state.cars.push({
                name: action.payload.name,
                color: action.payload.color,
            })
        },
        changeRaceStatus(state, action: PayloadAction<boolean>) {
            state.raceStatus = action.payload;
        },
        addIdUpdatedCarSlice(state, action: PayloadAction<number | null>) {
            state.updateCarId = action.payload;
        },
        changeGaragePage(state, action: PayloadAction<boolean>) {
            if (action.payload) {
                state.carListParams._page++;
            } else {
                state.carListParams._page--;
            }
        },
        changeWinnerPage(state, action: PayloadAction<boolean>) {
            if (action.payload) {
                state.winnerListParams._page++;
            } else {
                state.winnerListParams._page--;
            }
        },
        changeWinnerSort(state, action: PayloadAction<string>) {
            if (state.winnerListParams._sort === action.payload ) {
                if (state.winnerListParams._order === 'DESC') {
                    state.winnerListParams._order = 'ASC';
                } else {
                    state.winnerListParams._order = 'DESC';
                }
            } else {
                state.winnerListParams._sort = action.payload;
                state.winnerListParams._order = 'ASC';
            }
        },
    }
})

export const {
    addCar,
    changeRaceStatus,
    addIdUpdatedCarSlice,
    changeGaragePage,
    changeWinnerPage,
    changeWinnerSort
} = carsSLice.actions;
export default carsSLice.reducer;
