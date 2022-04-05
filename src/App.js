/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";

import "./App.css";
import Home from "./components/home/home";
import { css } from "@emotion/react";
import web3 from "./web3";
import fetchAbiInterface from "./contractAbi";
import config from "./config.js";
import { Routes, Route } from "react-router-dom";
import web3Context from "./context/web3context";
import HashLoader from "react-spinners/HashLoader";
import Admin from "./components/admin/admin";
import PrivateRoute from "./components/privateRoute/privateRoute";
const override = css`
  display: block;
  margin: 30% auto;
  border-color: #326fad;
`;
function App() {
  const [account, setAccount] = useState([]);
  const [contractAbi, setContractAbi] = useState();
  const address = config.DEPLOYMENT_OWNER_CONTRACT_ADDRESS;
  const baseUrl = "https://coston-explorer.flare.network/api";

  useEffect(() => {}, [contractAbi]);

  useEffect(async () => {
    (async function () {
      await window.ethereum.enable();
      const Accounts = await web3.eth.getAccounts();
      setAccount(Accounts);

      fetchAbiInterface.then((abiInterface) => {
        setContractAbi(
          new web3.eth.Contract(JSON.parse(abiInterface), address)
        );
      });
    })();
  }, []);

  return contractAbi ? (
    <web3Context.Provider value={contractAbi}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
    </web3Context.Provider>
  ) : (
    <>
      <HashLoader color={"#326FAD"} css={override} size={100} />
    </>
  );
}

export default App;
