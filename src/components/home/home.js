/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useState, useContext } from "react";
import "./home.css";
import web3 from "../../web3";
import web3Context from "../../context/web3context";
import Spinner from "../spinner/spinner";
const Home = () => {
  const [account, setAccount] = useState([]);
  const baseUrl = "https://coston-explorer.flare.network/api";
  const contractAbi = useContext(web3Context);

  //lifecycle
  useEffect(() => {
    console.log("contractAbi", contractAbi);
  }, [contractAbi]);
  useEffect(async () => {
    await window.ethereum.enable();
    const Accounts = await web3.eth.getAccounts();
    setAccount(Accounts);
    const userPlayStatus = await contractAbi.methods.userPlayStatus().call({
      from: account[0],
    });
    console.log("userPlayStatus", userPlayStatus);
  }, []);

  return (
    <>
      <div className="home">
        <header className="App-header">
          <div className="user">
            {" "}
            <span>
              <b>Wallet Id:</b>
            </span>{" "}
            {account[0]}
          </div>
          <div className="handle-spinner"> </div>
          <Spinner />
          <div></div>
        </header>
      </div>
    </>
  );
};

export default Home;
