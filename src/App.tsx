import React from "react";
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
} from "react-plaid-link";

const App: React.FC = () => {
  const isOauthRedirect = document.location.href.includes("oauth_state_id");

  const [token, setToken] = React.useState<string | null>(null);

  const generateToken = async () => {
    // get link_token from API
    //
    // const response = await fetch("/api/create_link_token", {
    //   method: "POST",
    // });
    // const data = await response.json();
    // setToken(data.link_token);
    // sessionStorage.setItem("link_token", data.link_token);


    // hardcode a token for easy testing
    const link_token = 'link-sandbox-192d620d-3f24-44f9-b677-a5f0a262a256';
    setToken(link_token);
    sessionStorage.setItem("link_token", link_token);
  };

  // handle OAuth redirect
  React.useEffect(() => {
    generateToken();
    if (isOauthRedirect) {
      setToken(sessionStorage.getItem("link_token"));
    } else {
      generateToken();
    }
  }, [isOauthRedirect]);

  return token == null ? (
    <div className="loader"></div>
  ) : (
    <>
      <LinkButton token={token} isOauthRedirect={isOauthRedirect} />
      <br />
      is OAuth redirect: {isOauthRedirect.toString()}
    </>
  );
};

interface ButtonProps {
  token: string;
  isOauthRedirect: boolean;
}

const LinkButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const onSuccess = React.useCallback<PlaidLinkOnSuccess>(
    (public_token, metadata) => {
      // send public_token to server
      console.log("success: public_token", public_token);
    },
    []
  );

  const config: PlaidLinkOptions = {
    token: props.token,
    onSuccess,
  };

  // if we are handling an OAuth redirect, add receivedRedirectUri to the config
  if (props.isOauthRedirect) {
    config.receivedRedirectUri = document.location.href;
  }

  const { open, ready, error } = usePlaidLink(config);

  // if handling OAuth, open Link immediately instead of requiring button click
  React.useEffect(() => {
    if (props.isOauthRedirect && ready) {
      open();
    }
  }, [props.isOauthRedirect, open, ready]);

  return (
    <button onClick={() => open()} disabled={!ready}>
      open link
    </button>
  );
};

App.displayName = "App";

export default App;
