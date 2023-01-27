import { Button, ButtonGroup } from '@mui/material';

interface IButtonGroupPagination {
  minPages: number;
  maxPages: number;
  currentPage: number;
  changePage: (value: boolean) => void;
}

function ButtonGroupPagination({
  minPages,
  maxPages,
  currentPage,
  changePage,
}: IButtonGroupPagination) {
  return (
    <ButtonGroup sx={{ marginBottom: '0.5rem' }} size='small' aria-label='small button group'>
      <Button
        sx={{ minWidth: 'max-content', margin: '0' }}
        disabled={minPages === currentPage}
        onClick={() => changePage(false)}
      >
        Prev
      </Button>
      <Button color='primary' sx={{ minWidth: 'max-content', margin: '0' }}>
        {currentPage}
      </Button>
      <Button
        sx={{ minWidth: 'max-content', margin: '0' }}
        disabled={maxPages === currentPage}
        onClick={() => changePage(true)}
      >
        Next
      </Button>
    </ButtonGroup>
  );
}

export default ButtonGroupPagination;
