import React, { useEffect, useContext, useState } from "react";
import web3 from "../../web3";
import Admin from "../admin/admin";
import PropTypes from "prop-types";
import { Route, Navigate, Routes } from "react-router-dom";
import web3Context from "../../context/web3context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const contractAbi = useContext(web3Context);
  const [owner, setOwner] = useState(false);
  const [account, setAccount] = useState(false);

  useEffect(() => {
    (async function () {
      const Accounts = await web3.eth.getAccounts();
      console.log(contractAbi);
      const data = await contractAbi.methods
        .owner()
        .call({ from: Accounts[0] });
      setAccount(Accounts[0]);
      setOwner(data);
    })();

    return () => {};
  });
  useEffect(() => {
    console.log("==--flag", owner);
    return () => {};
  }, [owner]);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to login page
    //{true ? <Component {...rest} /> : <Navigate to="/" />}
    <div>{owner ? <Admin /> : <Navigate to="/" />}</div>
  );
};

// PrivateRoute.propTypes = {
//   component: PropTypes.shape(),
// };

export default PrivateRoute;
