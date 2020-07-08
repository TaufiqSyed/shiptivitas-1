import React from 'react';
import './Card.css';

export default class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: props.status
    }
    this.updateStatus = this.updateStatus.bind(this)
  }

  updateStatus(newStatus) {
    this.setState({
      status: newStatus
    })
  }

  render() {
    let className = ['Card'];
    if (this.state.status === 'backlog') {
      className.push('Card-grey');
    } else if (this.state.status === 'in-progress') {
      className.push('Card-blue');
    } else if (this.state.status === 'complete') {
      className.push('Card-green');
    }
    return (
      <div className={className.join(' ')} data-id={this.props.id} data-status={this.state.status}>
        <div className="Card-title">{this.props.name}</div>
      </div>
    );
  }
}