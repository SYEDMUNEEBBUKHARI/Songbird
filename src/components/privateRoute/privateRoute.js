import React, { useEffect, useContext, useState } from "react";
import web3 from "../../web3";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";

import Admin from "../admin/admin";

import { Navigate, } from "react-router-dom";
import web3Context from "../../context/web3context";


const override = css`
  display: block;
  margin: 30% auto;
  border-color: #326fad;
`;
const PrivateRoute = () => {
  const contractAbi = useContext(web3Context);
  const [owner, setOwner] = useState();
  const [account, setAccount] = useState();
  const [flag, setFlag] = useState(false);


  useEffect(() => {

    (async function () {
      const Accounts = await web3.eth.getAccounts();
      const data = await contractAbi.methods
        .owner()
        .call({ from: Accounts[0] });
      await setAccount(Accounts[0]);
      await setOwner(data);
      await setFlag(true);
    })();

    // return () => {};
  });
  useEffect(() => {
  }, [account]);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to login page
    //{true ? <Component {...rest} /> : <Navigate to="/" />}
    //owner ? <Admin /> : <Navigate to="/" />
    <div>
      {flag ? (
        owner.length > 0 ? (
          <Admin />
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <>
          <HashLoader color={"red"} css={override} size={100} />
        </>
      )}
    </div>
  );
};
// owner.length > 0 ? <Admin /> : <Navigate to="/" />;

export default PrivateRoute;

      
 


