import React from "react";

import LinkButton from "./LinkButton";

interface Props {}

const App: React.FC<Props> = (props: Props) => {
  const [token, setToken] = React.useState<string | null>(null);

  const generateToken = async () => {
    const response = await fetch("/api/create_link_token", {
      method: "POST"
    });
    const data = await response.json();
    setToken(data.link_token);
  };

  React.useEffect(() => {
    generateToken();
  }, []);

  return token == null ? (
    <div className="loader"></div>
  ) : (
    <LinkButton token={token} />
  );
};

App.displayName = "App";

export default App;
