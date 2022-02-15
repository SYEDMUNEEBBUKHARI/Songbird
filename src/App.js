/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import "./App.css";
import Spinner from "./components/spinner/spinner";
import web3 from "./web3";
import contractAbi from "./contractAbi";
import axios from "axios";
import _ from "underscore";
function App() {
  const [account, setAccount] = useState([]);
  const [tokenIds, setTokenId] = useState();
  const baseUrl = "https://coston-explorer.flare.network/api";
  
  useEffect(async () => {
    await window.ethereum.enable();
    const Accounts = await web3.eth.getAccounts();
    setAccount(Accounts);
    console.log("Accounts", account[0]);
    const data = await axios.get(
      `${baseUrl}?action=${"tokentx"}&address=${
        Accounts[0]
      }&module=${"account"}`
    );
    console.log(" Data", data);

    var destArray = _.uniq(data.data.result, (x) => x.tokenID);
   const collectData= destArray.map(data => data.tokenID);
    console.log("Token Ids Data", collectData);
    setTokenId(collectData);
  }, []);
  const extractTokenIds = async () => {
    console.log("Accounts", account[0]);

    const tokensOfOwner = await contractAbi.methods
      .tokensOfOwner(account[0])
      .call({ from: account[0] });
    console.log("tokensOfOwner", tokensOfOwner);
  };
  const mintTokens = async () => {
    console.log("Accounts", account[0]);

    const mint = await contractAbi.methods.mintNFTs(4).send({
      from: account[0],
      value: 3,
    });
    console.log("mint", mint);
  };
  const setMasterTokens = async () => {
    console.log("Accounts", account[0]);

    const mint = await contractAbi.methods.setToken(tokenIds).call({
      from: account[0],
    });
    
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="user">
          {" "}
          <span>
            <b>Wallet Id:</b>
          </span>{" "}
          {account[0]}
        </div>
        <div className="handle-spinner">
          {" "}
          <Spinner />
        </div>
        <div>
          <button className="get-token" onClick={extractTokenIds}>
            Get Tokens
          </button>
          <button className="mint-token" onClick={mintTokens}>
            Mint Tokens
          </button>
          <button className="mint-token" onClick={setMasterTokens}>
            set wallet Tokens
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
