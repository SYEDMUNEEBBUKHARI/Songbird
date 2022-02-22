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
    const data = await axios.get(
      `${baseUrl}?action=${"tokentx"}&address=${
        Accounts[0]
      }&module=${"account"}`
    );
    console.log(" Data", data);

    var destArray = _.uniq(data.data.result, (x) => x.tokenID);
    const collectData = destArray.map((data) => data.tokenID);
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
    const Accounts = await web3.eth.getAccounts();

    console.log("Accounts", account[0]);

    const mint = await contractAbi.methods.mintNFTs(5).send({
      from: Accounts[0],
      // value: 3,
    });
    console.log("mint", mint);
  };
  const setMasterTokens = async () => {
    console.log("Accounts", account[0]);
    // tokenIds;
    const mint = await contractAbi.methods.setToken([0, 1, 2, 3, 4]).call({
      from: account[0],
    });
  };
  const payAndPlay = async () => {
    console.log("Accounts", account[0]);
    const Accounts = await web3.eth.getAccounts();

    const mint = await contractAbi.methods.payandPlay().send({
      from: Accounts[0],
      value: 3 * 10 ** 18,
      gas: 3000000,
    });
    console.log("mint", mint);
  };
  const setAmount = async () => {
    console.log("Accounts", account[0]);

    const mint = await contractAbi.methods.setAmountToPlay(3).call({
      from: account[0],
    });
    console.log("mint", 3 * 10 ** 18);
  };

  const setToken = async () => {
    console.log("Accounts", account[0]);

    const mint = await contractAbi.methods.setToken([0, 1, 2, 3, 4]).call({
      from: account[0],
    });
    console.log("mint", 3 * 10 ** 18);
  };
  const getToken = async (address) => {
    console.log("Accounts", account[0]);

    const tokens = await contractAbi.methods.tokensOfOwner(address).call({
      from: account[0],
    });
    console.log("tokens", tokens);
  };
  const setWallet = async () => {
    console.log("Accounts", account[0]);

    const mint = await contractAbi.methods
      .setTheMasterWallet(masterAddress)
      .call({
        from: account[0],
      });
    console.log("mint", 3 * 10 ** 18);
  };

  const Approve = async () => {
    console.log("Accounts", account[0]);

    const approve = await contractAbi.methods
      .ApprovetheContract( true)
      .call({
        from: account[0],
      });
    console.log("approve", approve);
  };

  const checkToken = async () => {
    console.log("Accounts", account[0]);

    const checkToken = await contractAbi.methods.checkToken().call({
      from: account[0],
    });
    console.log("checkToken", checkToken);
  };
  const checkApprove = async () => {
    console.log("Accounts", account[0]);

    const checkIsApproved = await contractAbi.methods.checkIsApproved().call({
      from: account[0],
    });
    console.log("checkIsApproved", checkIsApproved);
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
        <div className="handle-spinner">
          {" "}
          <Spinner />
        </div>
        <div>
          <label className="label"> Set Master Wallet: </label>
          <input
            type="text"
            onChange={(e) => setTheMasterWallet(e.target.value)}
          />
          <button onClick={setWallet}>Submit</button>
        </div>
        <div>
          <button className="get-token" onClick={extractTokenIds}>
            Get Tokens tokensOfOwner
          </button>
          <button className="mint-token" onClick={mintTokens}>
            Mint Tokens
          </button>
          <button className="mint-token" onClick={setMasterTokens}>
            set wallet Tokens
          </button>
          <button className="mint-token" onClick={payAndPlay}>
            pay and play
          </button>
          <button className="mint-token" onClick={setAmount}>
            set fee
          </button>
          <button className="mint-token" onClick={setToken}>
            set Token
          </button>
          <button
            className="mint-token"
            onClick={() =>
              getToken("0xa2C1ee3dd1ac4b8Ed475396Fd1EF044Bcd25A40A")
            }
          >
            get Token
          </button>

          <button className="mint-token" onClick={() => Approve()}>
            Approve
          </button>
          <button className="mint-token" onClick={() => checkToken()}>
            Token length
          </button>
          <button className="mint-token" onClick={() => checkApprove()}>
            Check approve or not
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
