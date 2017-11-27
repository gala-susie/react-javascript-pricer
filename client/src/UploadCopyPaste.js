import React, { Component } from 'react';
import Papa from 'papaparse';
import * as $ from 'jquery';
import { Button } from 'react-bootstrap';
import {Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';

export default class UploadCopyPaste extends Component {
  handleStringUpload = (e) => {
    var bigThis = this;
    
    var tar = $('#csvString');
    window.tar = tar;
    Papa.parse(tar.val(),
       {header: true, complete: function(results) {
         bigThis.props.uploadRows(results);
         console.log(results);
    }});
  }
 
  render() {
    return  (
      <div className="csvUpload">
        <Form horizontal>
          <FormGroup >
            <Col componentClass={ControlLabel} sm={2}>
              CSV String
            </Col>
            <Col sm={10}>
              <FormControl id="csvString" componentClass="textarea" placeholder="paste csv here"/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" onClick={this.handleStringUpload}> 
                Submit 
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}     