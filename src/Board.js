import React from 'react';
import dragula from 'react-dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog: clients.filter(client => !client.status || client.status === 'backlog'),
        inProgress: clients.filter(client => client.status && client.status === 'in-progress'),
        complete: clients.filter(client => client.status && client.status === 'complete'),
      }
    };
    this.drake = dragula()
    this.drake.on("drop", (el, target, source) => {
      if (target !== source) {
        this.drake.cancel(true)
        this.handleDrop(el, target)
      }
    });

    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    };

    this.handleDrop = this.handleDrop.bind(this)
  }
  getClients() {
    return [
      ['1', 'Stark, White and Abbott', 'Cloned Optimal Architecture', ''],
      ['2', 'Wiza LLC', 'Exclusive Bandwidth-Monitored Implementation', ''],
      ['3', 'Nolan LLC', 'Vision-Oriented 4Thgeneration Graphicaluserinterface', ''],
      ['4', 'Thompson PLC', 'Streamlined Regional Knowledgeuser', ''],
      ['5', 'Walker-Williamson', 'Team-Oriented 6Thgeneration Matrix', ''],
      ['6', 'Boehm and Sons', 'Automated Systematic Paradigm', ''],
      ['7', 'Runolfsson, Hegmann and Block', 'Integrated Transitional Strategy', ''],
      ['8', 'Schumm-Labadie', 'Operative Heuristic Challenge', ''],
      ['9', 'Kohler Group', 'Re-Contextualized Multi-Tasking Attitude', ''],
      ['10', 'Romaguera Inc', 'Managed Foreground Toolset', ''],
      ['11', 'Reilly-King', 'Future-Proofed Interactive Toolset', ''],
      ['12', 'Emard, Champlin and Runolfsdottir', 'Devolved Needs-Based Capability', ''],
      ['13', 'Fritsch, Cronin and Wolff', 'Open-Source 3Rdgeneration Website', ''],
      ['14', 'Borer LLC', 'Profit-Focused Incremental Orchestration', ''],
      ['15', 'Emmerich-Ankunding', 'User-Centric Stable Extranet', ''],
      ['16', 'Willms-Abbott', 'Progressive Bandwidth-Monitored Access', ''],
      ['17', 'Brekke PLC', 'Intuitive User-Facing Customerloyalty', ''],
      ['18', 'Bins, Toy and Klocko', 'Integrated Assymetric Software', ''],
      ['19', 'Hodkiewicz-Hayes', 'Programmable Systematic Securedline', ''],
      ['20', 'Murphy, Lang and Ferry', 'Organized Explicit Access', ''],
    ].map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
    }));
  }

  renderSwimlane(name, clients, ref) {
    return (
      <Swimlane
        name={name}
        clients={clients}
        dragulaRef={ref}
      />
    );
  }

  getTargetStatus(target) {
    const swimlaneDragColumns = document.getElementsByClassName('Swimlane-dragColumn')
    const indexToStatus = {
      0: 'backlog',
      1: 'in-progress',
      2: 'complete'
    }
    for (let i = 0; i < 3; i++) {
      if (target === swimlaneDragColumns[i]) {
        return indexToStatus[i]
      }
    }
  }

  handleDrop(el, target) {
    const cardID = el.getAttribute("data-id")
    const targetStatus = this.getTargetStatus(target)
    let clientsList = this.state.clients.backlog.concat(
      this.state.clients.inProgress,
      this.state.clients.complete
    ).filter( client => client !== undefined )

    for (let i = 0; i < clientsList.length; i++) {
      if (cardID === clientsList[i].id) {
        clientsList[i].status = targetStatus
        const clientsState = {
          backlog: clientsList.filter(client => !client.status || client.status === 'backlog'),
          inProgress: clientsList.filter(client => client.status && client.status === 'in-progress'),
          complete: clientsList.filter(client => client.status && client.status === 'complete'),
        };
        this.setState({ clients: clientsState })
        break
      };
    };
  };

  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4" id="backlog">
              {this.renderSwimlane('Backlog', this.state.clients.backlog, this.swimlanes.backlog = this.dragulaDecorator, 'backlog')}
            </div>
            <div className="col-md-4" id="in-progress">
              {this.renderSwimlane('In Progress', this.state.clients.inProgress, this.swimlanes.inProgress = this.dragulaDecorator, 'inProgress')}
            </div>
            <div className="col-md-4" id="complete">
              {this.renderSwimlane('Complete', this.state.clients.complete, this.swimlanes.complete = this.dragulaDecorator, 'complete')}
            </div>
          </div>
        </div>
      </div>
    );
  };
  dragulaDecorator = (componentBackingInstance) => {
    this.drake.containers.push(componentBackingInstance);
  };
}