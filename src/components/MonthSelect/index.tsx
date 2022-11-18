import React from 'react';
import './MonthSelect.scss';
function MonthSelect() {
  const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май',
    'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]
  const monthItem = month.map((item, index) =>  <option key={`${index}_${item}`} value={ item }>{ item }</option> )
  return (
    <>
    {monthItem}
    </>
    
  );
}

export default MonthSelect;