import React from 'react';
import './Search.scss';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  handleChange: (event:any) => any;
  searchText: string;
}

function Search({handleChange, searchText} : Props) {
  return (
    <div className="home-aside__wrapper">
      <SearchIcon className='home-aside__icon'/>
      <input className='home-aside__search' type="text" onChange={handleChange} value={searchText} placeholder='Search...'/>
    </div>
  );
}

export default React.memo(Search);