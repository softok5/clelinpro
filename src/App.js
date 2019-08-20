
import React from 'react';
import { Route } from 'react-router-dom';
import UserForms from './containers/user-forms/userForms';

const App = () => {
  return (
    <div>
      <Route exact path="/" component={UserForms} />
    </div>
  );
};

export default App;