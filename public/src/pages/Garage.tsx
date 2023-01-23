import MyForm from "../components/MyForm/MyForm";
import CarList from "../components/CarList/CarList";

function Garage() {
  return (
    <main className='garage'>
      <MyForm />  
        <section>
            <CarList />
        </section>
    </main>
  );
}

export default Garage;
