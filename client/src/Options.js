import { Button, ButtonToolbar, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import React, { Component } from 'react';
import DatePicker from 'react-bootstrap-date-picker';

import HideColsModal from './HideColsModal';

export default class Options extends Component {
  constructor(props) {
    super(props);    
    
    this.state = {
      showModal: false,
      columnKeys: []
    }
  }
  
  close = () => {
    this.setState({ showModal: false });
  }
  
  hideAndClose = () => {
    this.setState({showModal: false})
    this.props.hideCols(this.state.columnKeys);
  }
  
  onCheckboxClick = (e) => {  
    var key = e.target.value;
    
    this.props.clickCol(key); 
  }
 
  render() {
    return  (
      <div className="topBuffer">
        <FormGroup>
          <ButtonToolbar>
            <Button 
              bsStyle="primary" 
              onClick={() => {
                this.props.gridref.onToggleFilter();
                setTimeout(this.props.gridref.onToggleFilter, 10);
            }}>
              Clear all Filters 
            </Button>
            <Button 
              bsStyle="primary" 
              onClick={() => this.setState({showModal: true})}
            > 
              Hide/Show Columns 
            </Button>
          </ButtonToolbar>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Deal Type:</ControlLabel>
          <FormControl componentClass="select" placeholder="select">
            <option value="trs">TRS</option>
            <option value="portfolio">Portfolio</option>
            <option value="repo">Repo</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Expiry Date:</ControlLabel>
          <DatePicker id="example-datepicker" />
        </FormGroup>
        <FormGroup>
          <ControlLabel> Use only stable: <Checkbox id="test" inline/> </ControlLabel>
        </FormGroup>
        <HideColsModal 
          cols={this.props.cols}
          columnKeys={this.state.columnKeys}
          onCheckboxClick={this.onCheckboxClick}
          showModal={this.state.showModal}
          close={this.close}
        />
      </div>
    );
  }
}  