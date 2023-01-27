import './MyForm.css';
import CreateCar from '../CreateCar/CreateCar';
import UpdateCar from '../UptadeCar/UpdateCar';
import Controls from '../Controlls/Controlls';

function MyForm() {

  return(
    <section className="form">
      <CreateCar />
      <Controls />
      <UpdateCar />
    </section>      
    )
}

export default MyForm;
