/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import "./App.css";
import web3 from "./web3";
import contractAbi from "./contractAbi";
function App() {
  const [account, setAccount] = useState([]);
  useEffect(async () => {
    await window.ethereum.enable();
    const Accounts = await web3.eth.getAccounts();
    setAccount(Accounts);
    console.log("Accounts", account[0]);
    const contrac = await contractAbi.methods
      .findLength()
      .call({ from: account[0] });
    console.log("contractAbi", contrac);
  }, []);
  return (
    <div className="App">
      <header className="App-header">Welcome {account[0]}</header>
    </div>
  );
}

export default App;
