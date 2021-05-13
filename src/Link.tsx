import React from "react";
import { usePlaidLink } from "react-plaid-link";

interface Props {
  token: string;
  receivedRedirectUri: string | null;
}

const Link: React.FC<Props> = (props: Props) => {
  const onSuccess = React.useCallback((public_token, metadata) => {
    // send public_token to server
    console.log("public_token", public_token);
  }, []);

  let config: Parameters<typeof usePlaidLink>[0] = {
    token: props.token,
    onSuccess,
    clientName: "hello world",
    env: "sandbox",
    product: ["auth"],
  };

  if (props.receivedRedirectUri != null) {
    config = {
      ...config,
      receivedRedirectUri: props.receivedRedirectUri
    };
  }

  const { open, ready, error } = usePlaidLink(config);

  React.useEffect(() => {
    if (!ready) {
      return;
    }
    open();
  }, [ready, open]);

  return <></>;
};

Link.displayName = "Link";

export default Link;
