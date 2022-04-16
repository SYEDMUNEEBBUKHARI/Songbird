/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useState, useContext } from "react";
import { Grid } from "@mui/material";
import "./home.css";
import web3 from "../../web3";
import web3Context from "../../context/web3context";
import Spinner from "../spinner/spinner";
import AvailableNfts from "../availableNfts/availableNfts";
const Home = () => {
  const [account, setAccount] = useState([]);
  const contractAbi = useContext(web3Context);

  //lifecycle
  useEffect(() => {}, [contractAbi]);
  useEffect(async () => {
    await window.ethereum.enable();
    const Accounts = await web3.eth.getAccounts();
    setAccount(Accounts);
    await contractAbi.methods.userPlayStatus(Accounts[0]).call({
      from: Accounts[0],
    });
    return () => {};
  }, []);

  return (
    <>
      <div className="home">
        <Grid container spacing={2}>
          <Grid item md={10} xs={6} />

          <Grid item md={2} xs={6}>
            <div className="box">{account[0]}</div>
          </Grid>
        </Grid>
        <div className="logo"></div>
      </div>
      <div className="spin-win">Spin To Win!</div>
      <div className="spinner-center">
        <Spinner />
      </div>
      <div className="spinner-center">
        <AvailableNfts />
      </div>
    </>
  );
};

export default Home;
