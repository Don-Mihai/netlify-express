import React from 'react';
import AsideTopic from '../AsideTopic';
import './AsideCurrent.scss';

function AsideCurrent() {
  return (
    <div className="home-aside__current">
      <h2 className="home-aside__current-title">
        Актуальные темы для вас
      </h2>
      <div className="home-aside__current-wrapper">
        <AsideTopic title={'Спорт - Актуально'} signature={'#Viaplay'} twit={'Твитов: 10,3 тыс.'}/>
        <AsideTopic title={'Спорт - Актуально'} signature={'#Viaplay'} twit={'Твитов: 10,3 тыс.'}/>
        <AsideTopic title={'Программирование - Актуально'} signature={'#FrontEndBoy'} twit={'Твитов: 96,1 тыс.'}/>
        <AsideTopic title={'Программирование - Актуально'} signature={'#FrontEndBoy'} twit={'Твитов: 96,1 тыс.'}/>
        <AsideTopic title={'Программирование - Актуально'} signature={'#FrontEndBoy'} twit={'Твитов: 96,1 тыс.'}/>
        <AsideTopic title={'Программирование - Актуально'} signature={'#FrontEndBoy'} twit={'Твитов: 96,1 тыс.'}/>
        <AsideTopic title={'Программирование - Актуально'} signature={'#FrontEndBoy'} twit={'Твитов: 96,1 тыс.'}/>
        <AsideTopic title={'Программирование - Актуально'} signature={'#FrontEndBoy'} twit={'Твитов: 96,1 тыс.'}/>
        <AsideTopic title={'Программирование - Актуально'} signature={'#FrontEndBoy'} twit={'Твитов: 96,1 тыс.'}/>
        <AsideTopic title={'Программирование - Актуально'} signature={'#FrontEndBoy'} twit={'Твитов: 96,1 тыс.'}/>
      </div>
    </div>
  );
}

export default React.memo(AsideCurrent);