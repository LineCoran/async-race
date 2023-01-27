import MyForm from '../MyForm/MyForm';
import CarList from '../CarList/CarList';

interface IGarage {
  isGarageVisible: boolean;
}
function Garage({ isGarageVisible }: IGarage) {
  return (
    <div className={!isGarageVisible ? 'garage-wrapper-hidden' : 'garage-wrapper'}>
      <MyForm />
      <CarList />
    </div>
  );
}

export default Garage;
