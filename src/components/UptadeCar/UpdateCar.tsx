import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useUpdateCarMutation } from '../../api/apiSlice';
import { addIdUpdatedCarSlice } from '../../store/carsSlice';
import CarClassNames from '../../interfaces/enums';

function UpdateCar() {
  const idUpdateCar = useAppSelector((store) => store.carsReducer.updateCarId);
  const dispatch = useAppDispatch();
  const [color, setColor] = useState('#123456');
  const [name, setName] = useState('');
  const [updateCar] = useUpdateCarMutation();

  function resetSelectedCars() {
    const allCars = document.querySelectorAll(`.${CarClassNames.default}`);
    allCars.forEach((car) => {
      const item = car;
      item.className = CarClassNames.default;
    });
  }

  async function handleUpdateCar() {
    const newCarParams = { color, name };
    if (idUpdateCar) {
      await updateCar({ data: newCarParams, id: idUpdateCar });
      setName('');
      setColor('#000000');
      dispatch(addIdUpdatedCarSlice(null));
      resetSelectedCars();
    }
  }

  return (
    <div className='form-setting'>
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
        sx={{ margin: '0.5rem' }}
        variant='outlined'
        disabled={!idUpdateCar}
        onClick={() => handleUpdateCar()}
      >
        Update
      </Button>
    </div>
  );
}

export default UpdateCar;
