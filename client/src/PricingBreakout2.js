import { ListGroup, ListGroupItem} from 'react-bootstrap';
import React, { Component } from 'react';

export default class PricingBreakout2 extends Component {
  constructor(props) {
    super(props);
    
    var max = 40;
    var min = 1
    var rate1 = Math.floor(Math.random()*(max-min+1)+min)/100;
    var rate2 = Math.floor(Math.random()*(max-min+1)+min)/100;
    var rate3 = Math.floor(Math.random()*(max-min+1)+min)/100;
    var rate4 = Math.floor(Math.random()*(max-min+1)+min)/100;
    var rate5 = Math.floor(Math.random()*(max-min+1)+min)/100;
    var rate6 = Math.floor(Math.random()*(max-min+1)+min)/100;
    
    var rateSort = [rate1, rate2, rate3, rate4].sort().reverse();
    console.log(rateSort);
    
    this.state = {
      rate1: rateSort[0], rate2: rateSort[1], rate3: rateSort[2], rate4: rateSort[3], rate5, rate6
    }
  }
 
  render() {
    return  (
      <div>
        <ListGroup className="prices">
          <ListGroupItem>
            Base Price: OBFR + {this.state.rate1}
          </ListGroupItem>
          <ListGroupItem>
            Tenor Price: OBFR + {this.state.rate2}
          </ListGroupItem>
          <ListGroupItem>
            True Price Spot: OBFR + {this.state.rate3}
      </ListGroupItem>
          <ListGroupItem>
            Cost of Funding: OBFR + {this.state.rate4}
          </ListGroupItem>
          <ListGroupItem>
            LCR Cost: {this.state.rate5}
          </ListGroupItem>
          <ListGroupItem>
            RWA Cost: {this.state.rate6}
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}  