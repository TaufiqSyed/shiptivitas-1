import React from 'react';
import './Card.css';

function Card(props) {
  let className = ['Card'];
  if (props.status === 'backlog') {
    className.push('Card-grey');
  } else if (props.status === 'in-progress') {
    className.push('Card-blue');
  } else if (props.status === 'complete') {
    className.push('Card-green');
  }
  return (
    <div className={className.join(' ')} data-id={props.id} data-status={props.status}>
      <div className="Card-title">{props.name}</div>
    </div>
  );
};

export default Card;