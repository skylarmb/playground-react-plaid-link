import React from "react";
import { usePlaidLink } from "react-plaid-link";

interface Props {
  token: string;
}

const Link: React.FC<Props> = (props: Props) => {
  const onSuccess = React.useCallback((public_token, metadata) => {
    // send public_token to server
    console.log("public_token", public_token);
  }, []);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: props.token,
    onSuccess,
    clientName: "hello world",
    env: "sandbox",
    product: ["auth"]
  };

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
