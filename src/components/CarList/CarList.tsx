import { useGetCarsQuery, useGetAllCarsQuery } from '../../api/apiSlice';
import { calcCountPages } from '../../helpers/helpers';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeGaragePage, changeRaceStatus } from '../../store/carsSlice';
import ButtonGroupPagination from '../ButtonGroupPagination/ButtonGroupPagination';
import Car from '../Car/Car';
import './CarList.css';

function CarList() {
  const MIN_PAGES = 1;
  const dispatch = useAppDispatch();
  const params = useAppSelector((state) => state.carsReducer.carListParams);
  const { data } = useGetCarsQuery(params);
  const allCarList = useGetAllCarsQuery('');
  const maxPages = calcCountPages(allCarList.data, params._limit);

  const handleChangePage = (value: boolean) => {
    dispatch(changeGaragePage(value));
    dispatch(changeRaceStatus(false));
  };

  if (data !== undefined) {
    return (
      <div className='car-list-wrapper'>
        <div className='car-list'>
          <ButtonGroupPagination
            minPages={MIN_PAGES}
            maxPages={maxPages}
            currentPage={params._page}
            changePage={handleChangePage}
          />
          {data.map((item, index) => (
            <Car car={item} key={item.id} listId={index} />
          ))}
        </div>
      </div>
    );
  }
  return <h1>not found</h1>;
}

export default CarList;
