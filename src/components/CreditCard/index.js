import React, { Component } from 'react';
import './creditcard.css';

class App extends Component {
  render() {
    const { fullname = '', cardnumber = '', expiration = '' } = this.props;
    return (
      <div style={{...this.props.styles}}>
        <div className="card card--front">
            <div className="card__number">{cardnumber.length ? cardnumber : '4111 1111 1111 1111'}</div>
            <div className="card__expiry-date">{expiration.length ? expiration : 'XX/YY'}</div>
            <div className="card__owner">{fullname.length ? fullname : 'Lois Lane'}</div>
        </div>
      </div>
    );
  }
}

export default App;
