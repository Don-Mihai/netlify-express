import React from 'react';
import './DaySelect.scss';

function DaySelect() {

  const day = [];
  for(let i = 1; i<=31; i++) {
    day.push(i)
  }

  const dayItem = day.map((item, index) =>  <option key={`${index}_${item}`} value={ index + 1 }>{ item }</option> )
  return (
    <>
    {dayItem}
    </>
  );
}

export default DaySelect;