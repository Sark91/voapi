import React from 'react';
import { registerRoute } from 'client/routes';
import { Link } from 'react-router';

@registerRoute('/thankyou')
export default class ThankYouPage extends React.Component {
  render() {
    return (
      <div>
        Dziekujemy za zloenie zamowienie<br />
        <Link to="/">Wroc</Link>
      </div>
    );
  }
}
