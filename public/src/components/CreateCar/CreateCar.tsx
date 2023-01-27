import { Button, TextField } from "@mui/material"
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useAddCarMutation } from "../../api/apiSlice";

function CreateCar() {
  const [color, setColor] = useState('#aabbcc');
  const [name, setName] = useState('car');
  const [addCar] = useAddCarMutation();

  const handleAddCar = async () => {
    await addCar({color, name}).unwrap();
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
        <Button sx={{margin: '0.5rem'}} variant='outlined' onClick={handleAddCar}>Add car</Button>
      </div>
    )
}

export default CreateCar;
