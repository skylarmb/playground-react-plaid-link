import React, {useCallback} from 'react';
import {usePlaidLink} from 'react-plaid-link';

const Plaid = props => {
  const onSuccess = useCallback((token, metadata) => {
    // send token to server
  }, []);

  const config = {
    clientName: 'playground-react-plaid-link',
    env: 'sandbox',
    product: ['auth', 'transactions'],
    publicKey: process.env.REACT_APP_PLAID_PUBLIC_KEY,
    onSuccess,
    // ...
  };

  const {open, ready, error} = usePlaidLink(config);

  return (
    <>
      <button onClick={() => open()} disabled={!ready}>
        open
      </button>
    </>
  );
};

Plaid.displayName = 'Plaid';

export default Plaid;
