import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import './Swimlane.css';

export default class Swimlane extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     containerID: ""
  //   }
  // }

  // componentDidMount() {
  //   this.setState({
  //     containerId: "Swimlane" + ReactDOM.findDOMNode(this).parentNode.getAttribute("id")
  //   });
  // }

  render() {
    const cards = this.props.clients.map(client => {
      return (
        <Card
          key={client.id}
          id={client.id}
          name={client.name}
          description={client.description}
          status={client.status}
        />
      );
    })
    return (
      <div className="Swimlane-column">
        <div className="Swimlane-title">{this.props.name}</div>
        <div className="Swimlane-dragColumn" ref={this.props.dragulaRef}>
          {cards}
        </div>
      </div>);
  }

}
