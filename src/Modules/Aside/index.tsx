import React from 'react';
import AsideCurrent from '../../components/AsideCurrent';
import Search from '../../components/Search';
import './Aside.scss';

interface Props {
  handleChange: (event:any) => any;
  searchText: string;
}

function Aside({handleChange, searchText} : Props) {
  return (
    <aside className="home-aside">
				<Search handleChange={handleChange} searchText={searchText}/>
				<AsideCurrent/>
				
			</aside>
  );
}

export default React.memo(Aside);