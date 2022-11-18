import React from 'react';
import './AsideTopic.scss';

interface Props{
  title: string;
  signature: string;
  twit: string;
}

function AsideTopic({title, signature, twit}:Props) {
  return (
    <div className="home-aside__current-topic">
      <div className="home-aside__current-content">
        <h4 className="home-aside__current-description aside-content">
          {title}
        </h4>
        <h3 className="home-aside__current-signature">
          {signature}
        </h3>
        <h4 className="home-aside__current-twit aside-content">
          {twit}
        </h4>
      </div>
      <div className="home-aside__current-menu">
        ...
      </div>
    </div>
  );
}

export default AsideTopic;