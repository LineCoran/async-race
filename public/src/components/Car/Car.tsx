import { Button } from "@mui/material"
import { useCheckEngineMutation, useDeleteCarMutation, useStartCarMutation, useAddWinnerMutation, useUpdateWinnerMutation, useGetWinnerQuery } from '../../api/apiSlice';
import CarIcon from '../CarIcon/CarIcon';
import { useState } from 'react';
import { startAnimation, stopAnimation, calcTime, addStyleSelectedCar } from "../../utils/helpers";
import { ICarProps } from "../../interfaces/interfaces";
import { useAppSelector } from "../../hooks";
import { useAppDispatch } from "../../hooks";
import { addIdUpdatedCarSlice } from "../../store/carsSlice";
import ButtonGroup from '@mui/material/ButtonGroup';
import './Car.css';

function Car({ car, listId } : ICarProps) {
    const [startButtonStatus, setStartButtonStatus] = useState(false);
    const [deleteCar] = useDeleteCarMutation();
    const [startCar] = useStartCarMutation();
    const [checkEngine] = useCheckEngineMutation();
    const [addWinner] = useAddWinnerMutation();
    const [updateWinner] = useUpdateWinnerMutation();
    const isRace = useAppSelector((state) => state.carsReducer.raceStatus);
    const dispatch = useAppDispatch();
    const { data } = useGetWinnerQuery(car.id); 
    
    async function handleMoveCar(id: number, status: string) {
        const {distance, velocity} = await startCar({id, status}).unwrap();
        const time = calcTime(distance, velocity);
        setStartButtonStatus(true);
        startAnimation(id, time);
        if (status === 'started') {
            try {
                await checkEngine({id, status: 'drive'}).unwrap();
                if (!data) {
                    addWinner({id, wins: 1, time});
                } else {
                    if (time < data.time) {
                        const newWinner = {wins: data.wins+1, time};
                        updateWinner({data: newWinner, id})
                    }
                }
            } catch(err) {
                stopAnimation(id);
            }
        } else {
            setStartButtonStatus(false);
        }
    }
    function handleSelectCar(carId: number, listId: number) {
        dispatch(addIdUpdatedCarSlice(carId));
        addStyleSelectedCar(listId);
    }
    return(
        <div className="car-wrapper" id={`${car.id}`}>
            <h3>{car.id}. {car.name}</h3>
            <div className='track'>
                <div className='car-icon' id={'car'+String(car.id)}>
                    <CarIcon color={car.color}/>
                </div>
            </div>

        <ButtonGroup sx={{marginBottom: '0.5rem'}} size="small" aria-label="small button group">
            <Button
              sx={{minWidth: 'max-content', margin: '0'}}
              color="success"
              disabled={startButtonStatus || isRace}
              onClick={() => handleMoveCar(car.id, 'started')}>A
            </Button>

            <Button
              sx={{minWidth: 'max-content', margin: '0'}}
              disabled={!startButtonStatus && !isRace}
              onClick={() => handleMoveCar(car.id, 'stopped')}>B
            </Button>

            <Button
              color="error"
              sx={{minWidth: 'max-content', margin: '0'}}
              onClick={() => deleteCar(car.id)}>Delete
            </Button>

            <Button
              color='info'
              sx={{minWidth: 'max-content', margin: '0'}}
              onClick={() => handleSelectCar(car.id, listId)}>Select
            </Button>
        </ButtonGroup> 
        </div>
    )
}

export default Car;