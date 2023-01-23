import { Button, ButtonGroup } from "@mui/material";
import { useGetCarsQuery, useGetAllCarsQuery} from "../../api/apiSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { changeGaragePage, changeRaceStatus } from "../../store/carsSlice";
import Car from "../Car/Car";
import './CarList.css';

function CarList() {

  const MIN_PAGE = 1;
  const dispatch = useAppDispatch();
  const params = useAppSelector((state) => state.carsReducer.carListParams);
  const { data } = useGetCarsQuery(params);
  const carAllList = useGetAllCarsQuery('');
  let maxPages = (carAllList.data) ? Math.ceil(carAllList.data.length/params._limit) : MIN_PAGE;

  function handleChangePage(value: boolean) {
    dispatch(changeGaragePage(value));
    dispatch(changeRaceStatus(false));
  }
  if (data !== undefined) {
    return (
      <div className="car-list-wrapper">
        <ButtonGroup sx={{marginBottom: '0.5rem'}} size="small" aria-label="small button group">
            <Button
              sx={{minWidth: 'max-content', margin: '0'}}
              disabled={MIN_PAGE===params._page}
              onClick={() => handleChangePage(false)}>Prev
            </Button>
            <Button color='primary' sx={{minWidth: 'max-content', margin: '0'}}>{params._page}</Button>
            <Button
              sx={{minWidth: 'max-content', margin: '0'}}
              disabled={maxPages === params._page}
              onClick={() => handleChangePage(true)}>Next
            </Button>
        </ButtonGroup> 
        <div className='car-list'>
          {data.map((item, index) => (
            <Car car={item} key={item.id} listId={index} />
          ))}
        </div>
      </div>
        )
  } else {
    return (
      <h1>not found</h1>
    )
  }
}

export default CarList;
