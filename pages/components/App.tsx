import React from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';

function App() {
  return (
    <React.Fragment>
      <div>You are logged in</div>
      <AmplifySignOut />
    </React.Fragment>
  );
}

export { App };
