import { Button } from '@mui/material';

interface IAddCarButton {
  addCar: () => void;
}

function AddCarButton({ addCar }: IAddCarButton) {
  return <Button onClick={addCar}>ADD CAR</Button>;
}

export default AddCarButton;
