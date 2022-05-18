import { alpha, Grid, InputBase, styled, Typography } from '@mui/material';
import React from 'react';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { useAppSelector } from '../../hooks/redux.hooks';
import { IFilters } from '../pages/SingleBoardPage';
import SearchIcon from '@mui/icons-material/Search';

type IProps = {
  filters: IFilters;
  setFilters: (filters: IFilters) => void;
};

const Toolbar = ({ filters, setFilters }: IProps) => {
  const { title } = useAppSelector((state) => state.boards.singleBoard);

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item sx={{ display: 'flex' }}>
        <DashboardRoundedIcon sx={{ color: '#303F9F' }} />
        <Typography align="left" variant="h5" sx={{ fontWeight: 'bold', color: '#303F9F' }}>
          {title.slice(2)}
        </Typography>
      </Grid>
      <Grid item>
        <Search sx={{ border: '2px solid #3f51b5' }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            value={filters.searchText}
            autoFocus={true}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setFilters({ ...filters, searchText: e.target.value })}
          />
        </Search>
      </Grid>
    </Grid>
  );
};

export default Toolbar;
