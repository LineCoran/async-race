import { Button } from '@mui/material';
import { useState } from 'react';
import Garage from '../../components/Garage/Garage';
import Winners from '../../components/Winners/Winners';
import { ButtonNames } from '../../interfaces/enums';
import './Main.css';

function Main() {
  const [isGarageVisible, setIsGarage] = useState(true);
  const [currentButtonName, setPageNameButton] = useState(ButtonNames.WINNERS);

  function handleSwitchPage() {
    setPageNameButton(isGarageVisible ? ButtonNames.GARAGE : ButtonNames.WINNERS);
    setIsGarage(!isGarageVisible);
  }
  return (
    <main>
      <div className='container'>
        <Button onClick={() => handleSwitchPage()}>{currentButtonName}</Button>
        <div className='page-wrapper'>
          <Winners isGarageVisible={isGarageVisible} />
          <Garage isGarageVisible={isGarageVisible} />
        </div>
      </div>
    </main>
  );
}

export default Main;
