import { Button, ButtonGroup } from '@mui/material';
import {
  useAddCarMutation,
  useAddWinnerMutation,
  useCheckEngineMutation,
  useGetAllCarsQuery,
  useGetCarsQuery,
  useStartCarMutation,
  useUpdateWinnerMutation,
} from '../../api/apiSlice';
import { carModels, carNames } from '../../data/cars';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CarPromiseResult } from '../../interfaces/interfaces';
import { changeRaceStatus } from '../../store/carsSlice';
import {
  calcTime,
  generateRandomColor,
  generateRandomNumber,
  getWinnerById,
  showWinnerCar,
  startAnimation,
  stopAnimation,
} from '../../helpers/helpers';
import './Controlls.css';

function Controls() {
  const GENERATE_CARS_LENGTH = 100;
  const raceStatus = useAppSelector((state) => state.carsReducer.raceStatus);
  const params = useAppSelector((state) => state.carsReducer.carListParams);
  const { data } = useGetCarsQuery(params);
  const cars = useGetAllCarsQuery('');
  const dispatch = useAppDispatch();
  const [addCar] = useAddCarMutation();
  const [startCar] = useStartCarMutation();
  const [checkEngine] = useCheckEngineMutation();
  const [addWinner] = useAddWinnerMutation();
  const [updateWinner] = useUpdateWinnerMutation();

  async function handleMoveCar(id: number, status: string) {
    const { distance, velocity } = await startCar({ id, status }).unwrap();
    const winnerCar = await getWinnerById(id);
    const time = calcTime(distance, velocity);
    startAnimation(id, time);
    if (status === 'started') {
      try {
        await checkEngine({ id, status: 'drive' }).unwrap();
        if (!Object.keys(winnerCar).length) {
          addWinner({ id, wins: 1, time });
        } else if (time < winnerCar.time) {
          const newWinner = { wins: winnerCar.wins + 1, time };
          updateWinner({ data: newWinner, id });
        }
        return { id, time };
      } catch (err) {
        stopAnimation(id);
      }
    }
    return undefined;
  }

  async function startRace(status: string) {
    if (status === 'started') {
      dispatch(changeRaceStatus(true));
    } else {
      dispatch(changeRaceStatus(false));
    }
    if (data !== undefined && data.length > 0) {
      await Promise.any(
        data.map(
          async (car) =>
            new Promise<CarPromiseResult>((res, rej) => {
              try {
                handleMoveCar(car.id, status).then((value) => {
                  if (value) {
                    res(value);
                  }
                });
              } catch (err) {
                rej(err);
              }
            }),
        ),
      ).then((winner) => {
        showWinnerCar(winner.id, winner.time);
      });
    }
  }

  const handleGenerateCar = async () => {
    let countOfCars = GENERATE_CARS_LENGTH;
    while (countOfCars > 0) {
      const carName = carNames[generateRandomNumber(carNames.length)];
      const carModel = carModels[generateRandomNumber(carModels.length)];
      const name = `${carName} - ${carModel}`;
      const color = generateRandomColor();
      addCar({ color, name }).unwrap();
      countOfCars -= 1;
    }
  };

  return (
    <section className='controlls'>
      <h2 className='car-list-title'>GARAGE ({cars.data ? cars.data.length : '0'})</h2>
      <ButtonGroup variant='outlined' aria-label='outlined button group'>
        <Button onClick={handleGenerateCar}>Generate</Button>
        <Button disabled={raceStatus} onClick={() => startRace('started')}>
          Race
        </Button>
        <Button disabled={!raceStatus} onClick={() => startRace('stopped')}>
          Stop
        </Button>
      </ButtonGroup>
    </section>
  );
}

export default Controls;
