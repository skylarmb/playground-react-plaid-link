import React, { useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";

import { useLinkPlaidItemLazyQuery } from "./useLinkPlaidItemLazyQuery";

export const LinkPlaidItemButton: React.FC = (props) => {
  const [linkPlaidItem, { data, loading, error }] = useLinkPlaidItemLazyQuery();

  const token = data?.getPlaidLinkToken.linkToken ?? null;
  console.log("got token", token);

  const { open, ready } = usePlaidLink({
    token,
    onEvent: (eventName, metadata) => console.log(eventName, metadata),
    onLoad: () => console.log("link loaded"),
    onExit: (error) => console.log(error),
    onSuccess: () => {},
  });

  useEffect(() => {
    if (token && ready) {
      open();
    }
  }, [token, ready, open]);

  if (error) throw error;

  return (
    <button
      disabled={loading || Boolean(token && !ready)}
      onClick={() => linkPlaidItem()}
    >
      Add Account
    </button>
  );
};

export default LinkPlaidItemButton;
