import React from 'react';
import { connect } from 'react-redux';
import { registerRoute } from 'client/routes';
import OrderSummary from 'client/components/OrderSummary';


@registerRoute('/')
class HomePage extends React.Component {
  render() {
    return (
      <div>
        <OrderSummary />
      </div>
    );
  }
}
