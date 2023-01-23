import { Button, TextField } from "@mui/material"
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useUpdateCarMutation } from "../../api/apiSlice";
import { addIdUpdatedCarSlice } from "../../store/carsSlice";

function UpdateCar() {
  const idUpdateCar = useAppSelector((store) => store.carsReducer.updateCarId);
  const dispatch = useAppDispatch();
  const [color, setColor] = useState('#000000');
  const [name, setName] = useState('car');
  const [updateCar] = useUpdateCarMutation();

  async function handleUpdateCar() {
    const newCarParams = {color, name};
    if (idUpdateCar) {
        await updateCar({ data: newCarParams, id: idUpdateCar });
        setName('');
        setColor('#000000');
        dispatch(addIdUpdatedCarSlice(null));
        resetSelectedCars();
    }
  }

  function resetSelectedCars() {
    const allCars = document.querySelectorAll('.car-wrapper');
    allCars.forEach((car) => {
        car.className = 'car-wrapper';
    })
  }

    return (
      <div className="form-setting">
        <TextField
          size='small'
          sx={{ margin: '0 0 1rem 0' }}
          value={name}
          label='Car name'
          variant='outlined'
          onChange={(e) => setName(e.target.value)}
        />
        <HexColorPicker color={color} onChange={setColor} />
        <Button
          sx={{margin: '0.5rem'}} variant='outlined'
          disabled={(idUpdateCar ? false : true)}
          onClick={handleUpdateCar}>Update
        </Button>
      </div>
    )
}

export default UpdateCar;
