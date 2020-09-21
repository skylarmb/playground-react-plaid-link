import React from "react";

import Link from "./Link";

interface Props {}

const App: React.FC<Props> = (props: Props) => {
  // hmm would prefer to init this to null but TS doesnt like that
  const [token, setToken] = React.useState("");

  const generateToken = async () => {
    const response = await fetch("/api/create_link_token", {
      method: "POST"
    });
    const data = await response.json();
    setToken(data.link_token);
  };

  return (
    <>
      <button onClick={generateToken}>generate token then open Link</button>
      {token != "" && <Link token={token} />}
    </>
  );
};

App.displayName = "App";

export default App;
