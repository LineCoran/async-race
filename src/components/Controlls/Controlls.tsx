import { Button, ButtonGroup } from "@mui/material";
import { useAddCarMutation, useAddWinnerMutation, useCheckEngineMutation, useGetAllCarsQuery, useGetCarsQuery, useStartCarMutation, useUpdateWinnerMutation } from "../../api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeRaceStatus } from "../../store/carsSlice";
import { calcTime, getWinnerById, startAnimation, stopAnimation } from "../../utils/helpers";
import './Controlls.css'

function Controls() {
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
    
    async function startRace(status: string) {
        if (status === 'started') {
          dispatch(changeRaceStatus(true))
        } else {
          dispatch(changeRaceStatus(false))
        }
        if (data !== undefined && data.length > 0) {
          data.map((car) => handleMoveCar(car.id, status))
        }
    }
    async function handleMoveCar(id: number, status: string) {
      const {distance, velocity} = await startCar({id, status}).unwrap();
      const winnerCar = await getWinnerById(id);
      const time = calcTime(distance, velocity);
      startAnimation(id, time);
      if (status === 'started') {
          try {
              await checkEngine({id, status: 'drive'}).unwrap();
              if (!Object.keys(winnerCar).length) {
                  console.log('here')
                  addWinner({id, wins: 1, time});
              } else {
                  if (time < winnerCar.time) {
                      const newWinner = {wins: winnerCar.wins+1, time};
                      updateWinner({data: newWinner, id})
                  }
              }
          } catch(err) {
              stopAnimation(id);
          }
  }
}
    const handleGenerateCar = async () => {
        let countOfCarsGenerate = 100;
        while(countOfCarsGenerate > 0) {
          addCar({color: 'black', name: 'Tesla'}).unwrap();
          countOfCarsGenerate--;
        }
    }
    return (
      <section className='controlls'>
        <h2 className='car-list-title'>GARAGE ({cars.data ? cars.data.length : '0'})</h2>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={handleGenerateCar}>Generate</Button>
          <Button disabled={raceStatus} onClick={() => startRace('started')}>Race</Button>
          <Button disabled={!raceStatus} onClick={() => startRace('stopped')}>Stop</Button>
        </ButtonGroup>
      </section>
    )
}

export default Controls;

