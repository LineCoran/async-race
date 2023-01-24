import { Button } from "@mui/material";

interface IAddCarButton {
    addCar: any;
}

function AddCarButton({addCar}: IAddCarButton) {
    return (
        <Button onClick={addCar}>ADD CAR</Button>
    )
}

export default AddCarButton;
