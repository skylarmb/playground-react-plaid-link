import React from "react";

import "./App.css";

import Link from "./Link";

interface Props {}

const App: React.FC<Props> = (props: Props) => {
  const [token, setToken] = React.useState<string | null>(null);
  const [receivedRedirectUri, setReceivedRedirectUri] = React.useState<string | null>(null);

  const generateToken = async () => {
    const response = await fetch("/api/create_link_token", {
      method: "POST"
    });
    const data = await response.json();
    setToken(data.link_token);
    localStorage.setItem('link_token', data.link_token)
  };

  React.useEffect(() => {
    // handle oauth redirect
    if(window.location.href.includes('oauth_state_id=')) {
      setReceivedRedirectUri(window.location.href)
      setToken(localStorage.getItem('link_token'))
    }
  }, [])


  return (
    <>
      <button onClick={generateToken}>
        generate token on click and then open Link
      </button>
      {token != null && <Link token={token} receivedRedirectUri={receivedRedirectUri} />}
    </>
  );
};

App.displayName = "App";

export default App;
