import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types"
// import {Api} from '../middleware/api'

// Components
import TableCellDefault from './tableCellContainer/tableCellDefault';
import TableCellSelect from './tableCellContainer/tableCellSelect';

export default class TableCellContainer extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,  //column data
    isHead: PropTypes.bool,               //does this cell represent a column?
  }

  constructor(props) {
    super(props);
    this.state = {
      editable:   false,
      value:      this.props.value || this.props.column.value,
      newValue:   this.props.value || this.props.column.value,
    };

    this.type = this.props.isHead ? 'text' : this.props.column.type;

    this.handleChange =   this.handleChange.bind(this);
    this.handleSubmit =   this.handleSubmit.bind(this);
    this.handleKeyDown =  this.handleKeyDown.bind(this);
    this.handleSelect =   this.handleSelect.bind(this);
    this.handleClick =    this.handleClick.bind(this);
  }

  //adding an empty option for each 'select' column
  componentDidMount() {
    if (this.type === 'select' && this.props.column.options) {
      let options = this.props.column.options.slice(0);
      if (options[0] != '') options.unshift('');

      this.setState({
        options: options
      });
    }
  }

  //Cell click handler
  handleClick() {
    // console.log('TableCell::handleClick');
    if (!this.state.editable)
      this.setState({
        editable: true
      });
  }

  //Input change handler, except for type: select
  handleChange(event) {
    // console.log("TableCell::handleChange");
    let value = event.target.value;
    // console.log(value);
    this.setState({
      newValue: value
    });
  }

  //Submit form handler, except for type: select
  handleSubmit(event) {
    // console.log("TableCell::handleSubmit");
    event.preventDefault();
    let value = this.state.newValue;

    // console.log(`value: ${value}`);
    this.setState({
      value: value,
      editable: false
    });
  }

  //Escape handler, discard changes
  handleKeyDown(event) {
    // console.log("TableCell::handleKeyDown");
    if (event.key === 'Escape') {
      event.preventDefault();
      this.setState({
        newValue: this.state.value,
        editable: false
      });
    }
  }

  //Select change handler
  handleSelect(event) {
    // console.log("TableCell::handleSelect");
    this.setState({
      newValue: event.target.value
    });
  }

  render() {
    let tableCell;
    if (this.type === 'select' && !this.props.isHead) {
      tableCell = (
        <TableCellSelect options={this.state.options}
                      column={this.props.column}
                      value={this.state.value}
                      newValue={this.state.newValue}
                      required={this.props.column.isRequired}
                      handleSelect={this.handleSelect}
                      handleClick={this.handleClick}
                      handleSubmit={this.handleSubmit} />
              );
    } else {
      tableCell = (
        <TableCellDefault type={this.type}
                column={this.props.column}
                value={this.state.value}
                placeholder={this.props.column.title}
                required={this.props.column.isRequired}
                handleChange={this.handleChange}
                handleKeyDown={this.handleKeyDown}
                handleClick={this.handleClick}
                handleSubmit={this.handleSubmit} />
              );
    }

    return (
      <td className={!this.state.editable ? "editable" : ""} onClick={this.handleClick} >
        {tableCell}
      </td>
    )
  }
}