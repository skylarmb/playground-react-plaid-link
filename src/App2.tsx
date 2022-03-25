import React, { useCallback, useState } from "react";

import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from "react-plaid-link";

const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const [inc, setInc] = useState<number>(0);

  // generate a link_token when component mounts
  React.useEffect(() => {
    async function createLinkToken() {
      let response = await fetch("/api/create_link_token");
      const { link_token } = await response.json();
      setToken(link_token);
    }
    createLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    console.log(publicToken, metadata);
  }, []);
  const onEvent = useCallback<PlaidLinkOnEvent>((eventName, metadata) => {
    // log onEvent callbacks from Link
    // https://plaid.com/docs/link/web/#onevent
    console.log(eventName, metadata);
  }, []);
  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    // log onExit callbacks from Link, handle errors
    // https://plaid.com/docs/link/web/#onexit
    console.log(error, metadata);
  }, []);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
    onEvent,
    onExit,
  };
  const { open, ready, error, exit } = usePlaidLink(config);

  return (
    <>
      <button onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </button>
      <button onClick={() => setInc(inc+1)}>increment</button>
    {inc}
    {ready.toString()}
    {token?.toString()}
    </>
  );
};

export default App;
