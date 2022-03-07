/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import "./App.css";
import Spinner from "./components/spinner/spinner";
import web3 from "./web3";
import contractAbi from "./contractAbi";
import axios from "axios";
import Web from "web3";
import _ from "underscore";
function App() {
  const [account, setAccount] = useState([]);
  const [tokenIds, setTokenId] = useState();
  const [masterAddress, setTheMasterWallet] = useState();
  const baseUrl = "https://coston-explorer.flare.network/api";
  useEffect(() => {
    console.log("change", masterAddress);
  }, [masterAddress]);
  useEffect(async () => {
    await window.ethereum.enable();
    const Accounts = await web3.eth.getAccounts();
    setAccount(Accounts);
    console.log("Accounts", account[0]);
    // const data = await axios.get(
    //   `${baseUrl}?action=${"tokentx"}&address=${
    //     Accounts[0]
    //   }&module=${"account"}`
    // );
    // console.log(" Data", data);

    // var destArray = _.uniq(data.data.result, (x) => x.tokenID);
    // const collectData = destArray.map((data) => data.tokenID);
    // console.log("Token Ids Data", collectData);
    // setTokenId(collectData);
  }, []);

  // for mint
  const mintTokens = async () => {
    await window.ethereum.enable();

    const Accounts = await web3.eth.getAccounts();

    console.log("Accounts", account[0]);

    const mint = await contractAbi.methods.mintTheTokens(Accounts[0], 1).send({
      from: Accounts[0],
      gas: 3000000,
      // value: 3,
    });
    console.log("mintTokens", mint);
  };

  const checkBalance = async () => {
    const Accounts = await web3.eth.getAccounts();
    console.log("Accounts", Accounts[0]);

    const chkBalance = await contractAbi.methods
      .checkBalance(Accounts[0])
      .call({
        from: Accounts[0],
      });
    console.log("chkBalance", chkBalance);
  };

  const makeApproveToAll = async () => {
    const Accounts = await web3.eth.getAccounts();
    console.log("Accounts", Accounts[0]);

    const makeApproveToAll = await contractAbi.methods
      .makeApproveToAll(Accounts[0])
      .send({
        from: Accounts[0],
        gas: 3000000,
      });
    console.log("makeApproveToAll", makeApproveToAll);
  };

  const checkApproved = async () => {
    const Accounts = await web3.eth.getAccounts();
    console.log("Accounts", Accounts[0]);
    //owner contract address approved
    const checkIsApproved = await contractAbi.methods
      .checkApproved(Accounts[0], "0x31146576B6e4d6d8625Aed2d6a3Bab9cCe6C8BC1")
      .call({
        from: Accounts[0],
      });
    console.log("checkIsApproved", checkIsApproved);
  };
  //swictch to account to and pass address of A
  const transferFrom = async (to, tokenId) => {
    const Accounts = await web3.eth.getAccounts();
    console.log("Accounts", Accounts[0]);
    console.log("Accounts 1", Accounts[1]);
    //Account A
    const transferFrom = await contractAbi.methods
      .transferFrom("0x31146576B6e4d6d8625Aed2d6a3Bab9cCe6C8BC1", to, tokenId)
      .send({
        from: Accounts[0],
        gas: 3000000,
      });
    console.log("transferFrom", transferFrom);
  };

  const checkTokens = async () => {
    const Accounts = await web3.eth.getAccounts();
    console.log("Accounts", Accounts[0]);
    //owner contract address approved
    const checkTokens = await contractAbi.methods.tokens(2).call({
      from: Accounts[0],
    });
    console.log("checkTokens", checkTokens);
  };
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
        <div className="handle-spinner"> </div>
        <Spinner />
        <div>
          <button className="mint-token" onClick={mintTokens}>
            Mint Tokens
          </button>

          <button className="mint-token" onClick={() => checkBalance()}>
            checkBalance
          </button>

          <button className="mint-token" onClick={() => makeApproveToAll()}>
            makeApproveToAll
          </button>
          <button className="mint-token" onClick={() => checkApproved()}>
            checkApproved
          </button>
          <button
            className="mint-token"
            onClick={() =>
              transferFrom("0x4Ce38CaEd522c6599B9F2116881aaBD8Ef363F1E", 1)
            }
          >
            transferFrom
          </button>
          <button className="mint-token" onClick={() => checkTokens()}>
            check tokens
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
