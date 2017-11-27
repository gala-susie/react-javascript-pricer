import { Grid, Panel, Tab, Tabs, Row, Col } from 'react-bootstrap';
import React, { Component } from 'react';
import UploadFile from './UploadFile';
import UploadCopyPaste from './UploadCopyPaste';
import PricingBreakout from './PricingBreakout';
import PricingBreakout2 from './PricingBreakout2';
import PricingBreakout3 from './PricingBreakout3';
import Options from './Options';

export default class PricingPanel extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pricing: 0
    } 
  }
 
  changingPricing = () => {
    this.setState({
      pricing: 1
    }) 
  }
  
  render() {
    var prices = [<PricingBreakout/>, <PricingBreakout2/>, <PricingBreakout2/>];
    var pricingBreakoutComponent = prices[this.state.pricing]
    return  (
      <Grid fluid={true}>
        <Row>
          <Col className="full-col" sm={4}>
            <Tabs id="left-tabs-example" defaultActiveKey="first">
              <Tab title="Upload CSV file" eventKey="first">
                <UploadFile uploadRows={this.props.uploadRows}/>
              </Tab>
              <Tab title="Upload CSV text" eventKey="second">
                <UploadCopyPaste uploadRows={this.props.uploadRows}/>
              </Tab>
            </Tabs>
          </Col>
          <Col className="full-col" sm={4}>
            <Panel header="Prices for this basket">
              {pricingBreakoutComponent}
            </Panel>
          </Col>
          <Col className="full-col" sm={4}>
            <Panel header="Options">
              <Options 
                gridref={this.props.gridref} 
                hideCols={this.props.hideCols} 
                cols={this.props.cols}
                clickCol={this.props.clickCol}
              />
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}  