import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetAllWinnersQuery, useGetWinnersQuery } from '../../api/apiSlice';
import { changeWinnerPage, changeWinnerSort } from '../../store/carsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createRowDate, calcCountPages } from '../../helpers/helpers';
import { IWinners } from '../../interfaces/interfaces';
import { TableRows } from '../../interfaces/types';
import ButtonGroupPagination from '../ButtonGroupPagination/ButtonGroupPagination';

export default function Winners({ isGarageVisible }: IWinners) {
  const MIN_PAGES = 1;
  const rows: TableRows[] = [];
  const dispatch = useAppDispatch();
  const allWinnerList = useGetAllWinnersQuery('');
  const params = useAppSelector((store) => store.carsReducer.winnerListParams);
  const { data } = useGetWinnersQuery(params);
  const maxPages = calcCountPages(allWinnerList.data, params._limit);

  if (data) data.map((winner) => rows.push(createRowDate(winner.id, winner.time, winner.wins)));

  function handleChangeSort(value: string) {
    dispatch(changeWinnerSort(value));
  }

  const handleChangePage = (value: boolean) => {
    dispatch(changeWinnerPage(value));
  };

  return (
    <div className={isGarageVisible ? 'winner-wrapper-hidden' : 'winner-wrapper'}>
      <h1>{`Winners ${allWinnerList.data?.length}`}</h1>
      <TableContainer component={Paper}>
        <ButtonGroupPagination
          minPages={MIN_PAGES}
          maxPages={maxPages}
          currentPage={params._page}
          changePage={handleChangePage}
        />
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleChangeSort('id')}>
                CAR ID
              </TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell
                sx={{ cursor: 'pointer' }}
                onClick={() => handleChangeSort('time')}
                align='right'
              >
                Time&nbsp;(s)
              </TableCell>

              <TableCell
                sx={{ cursor: 'pointer' }}
                onClick={() => handleChangeSort('wins')}
                align='right'
              >
                Wins
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell align='right'>{row.name}</TableCell>
                <TableCell align='right'>{row.time}</TableCell>
                <TableCell align='right'>{row.wins}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
