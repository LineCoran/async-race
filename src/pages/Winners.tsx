import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetAllWinnersQuery, useGetWinnersQuery } from '../api/apiSlice';
import { changeWinnerPage } from '../store/carsSlice';
import { Button, ButtonGroup } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';

type data = {
  id: number
  time: number;
  wins: number;
}

function createData(
  id: number,
  time: number,
  wins: number,
) {
  return { id, wins, time };
}

export default function Winners() {

  const MIN_PAGE = 1;
  const dispatch = useAppDispatch();
  const allWinnerList = useGetAllWinnersQuery('');
  const params = useAppSelector((store) => store.carsReducer.winnerListParams);
  const { data } = useGetWinnersQuery(params);
  const rows: data[]  = [];

  if (data !== undefined && data.length > 0) {
    data.map((winner) => rows.push(createData(winner.id, winner.time, winner.wins)))
  }

  let maxPages = (allWinnerList.data) ? Math.ceil(allWinnerList.data.length/params._limit) : MIN_PAGE;

  function handleChangePage(value: boolean) {
    dispatch(changeWinnerPage(value));
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> CAR ID</TableCell>
            <TableCell align="right">Time&nbsp;(s)</TableCell>
            <TableCell align="right">Wins</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.wins}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </TableContainer>
  );
}