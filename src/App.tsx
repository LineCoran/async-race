import Garage from './pages/Garage';
import Winners from './pages/Winners';
import './App.css';
import { useState } from 'react';
import { Button } from '@mui/material';

function App() {

  const [isGarage, setIsGarage] = useState(true);
  const [pageNameButton, setPageNameButton] = useState('To winners');

  function changePageNameButton() {
    if(pageNameButton === 'To winners') {
      setPageNameButton('To garage')
    } else {
      setPageNameButton('To winners')
    }
  }

  function handleSwitchPage() {
    changePageNameButton();
    setIsGarage(!isGarage);
  }
  return (
    <div className='container'>
      <Button onClick={handleSwitchPage}>{pageNameButton}</Button>
      <div className='page-wrapper'>
      <div className='winner-wrapper' style={{opacity: (!isGarage)?'1':'0', zIndex: (!isGarage)?'10':'0'}}>
        <Winners />
      </div>
      <div className='garage-wrapper' style={{opacity: (isGarage)?'1':'0', zIndex: (isGarage)?'10':'0'}}>
        <Garage />
      </div>
      
      </div>
    </div>
  )
}

export default App;
