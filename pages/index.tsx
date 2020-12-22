import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState } from '@aws-amplify/ui-components';
import { App } from './components/App';
import { useAuthGuard } from './hooks/useAuthGuard';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const Index = () => {
  const [user, authState] = useAuthGuard();

  if (authState === AuthState.SignedIn && user) {
    return <App />;
  }

  return <AmplifyAuthenticator />;
};

export default Index;
