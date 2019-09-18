import React from 'react';
import ReactDOM from 'react-dom';

const Hello = props => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  );
};

const Footer = () => {
  return <div>footer</div>;
};

const App = () => {
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="George" />
      <Hello name="Daisy" />
      <Footer />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
