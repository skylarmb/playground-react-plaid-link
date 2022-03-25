import React from "react";

export const useLinkPlaidItemLazyQuery = (): [
  () => Promise<void>,
  {
    data: {
      getPlaidLinkToken: { linkToken: null | string };
    };
    loading: boolean;
    error: null;
  }
] => {
  const [data, setData] = React.useState({
    getPlaidLinkToken: { linkToken: null },
  });

  const [loading, setLoading] = React.useState(false);

  const linkPlaidItem = React.useCallback(async () => {
    setLoading(true);
    let response = await fetch("/api/create_link_token");
    const { link_token } = await response.json();
    setData({
      getPlaidLinkToken: { linkToken: link_token },
    });
    setLoading(false);
  }, []);

  return [
    linkPlaidItem,
    {
      data,
      loading,
      error: null,
    },
  ];
};
