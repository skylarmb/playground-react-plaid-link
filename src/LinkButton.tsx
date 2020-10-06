import React from "react";
import { usePlaidLink } from "react-plaid-link";

interface Props {
  token: string;
}

const LinkButton: React.FC<Props> = (props: Props) => {
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

  return (
    <button onClick={() => open()} disabled={!ready}>
      open link from pre-generated token
    </button>
  );
};

LinkButton.displayName = "LinkButton";

export default LinkButton;
