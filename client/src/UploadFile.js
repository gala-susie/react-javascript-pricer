import React, { Component } from 'react';
import {Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';

import * as $ from 'jquery';
import Papa from 'papaparse';

export default class UploadFile extends Component {
  constructor(props) {
    super(props);  
    
    this.state = {
      fileCount: 0
    }
  }
  
  handleFileUpload = (e) => {
    var bigThis = this;
    var tar = $("#csvFile");
    Papa.parse(tar[0].files[0],
       {header: true, complete: function(results) {
         bigThis.props.uploadRows(results);
         console.log(results);
    }});
  }
  
  fileChange = (ev) => {
      this.setState({
        fileCount: ev.target.files.length
      });
  }
 
  render() {
    return  (
      <div className="csvUpload">
        <Form horizontal>
          <FormGroup >
            <Col componentClass={ControlLabel} sm={2}>
              CSV File
            </Col>
            <Col sm={10}>
              <FormControl id="csvFile" type="file" onChange={this.fileChange}/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" disabled={(this.state.fileCount === 0)} onClick={this.handleFileUpload}> 
                Submit 
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}     