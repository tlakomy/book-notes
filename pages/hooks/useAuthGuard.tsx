import React from 'react';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

function useAuthGuard(): [
  Record<string, any> | undefined,
  AuthState | undefined,
] {
  const [user, setUser] = React.useState<Record<string, any> | undefined>();
  const [authState, setAuthState] = React.useState<AuthState>();

  React.useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setUser(authData);
      setAuthState(nextAuthState);
    });
  }, []);

  return [user, authState];
}

export { useAuthGuard };
