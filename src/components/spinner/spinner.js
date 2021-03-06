/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import web3 from "../../web3";
import contractAbi from "../../contractAbi";

import "./spinner.css";
function Spinner() {
  const [mustSpin, setspin] = useState(false);
  const [spinOutput, setSpinOutput] = useState(0);

  const data = [
    { option: "3", style: { backgroundColor: "skyBlue", textColor: "black" } },
    { option: "1", style: { backgroundColor: "orange" } },
    { option: "2" },
  ];
  const [account, setAccount] = useState([]);

  useEffect(async () => {
    const Accounts = await web3.eth.getAccounts();
    setAccount(Accounts);
    console.log("Accounts", account[0]);
  }, []);
  //from master
  const spinSpinner = async () => {
    setspin(true);
    const Accounts = await web3.eth.getAccounts();
    console.log("spin Account", Accounts[0]);

    const spin = await contractAbi.methods
      .spinAndWin("0xCccCC17854642B9b7503b3AC7C38F9F7Dba221F8", Accounts[0])
      .send({
        from: Accounts[0],
        gas: 9000000,
        gasLimit: 9000000,
      });
    console.log("spin result", spin.events.winningIds);

    if (spin) {
      // setspin(false);
      setSpinOutput(spin);
    }
  };
  return (
    <div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={spinOutput}
        data={data}
        backgroundColors={["#3e3e3e", "#df3428"]}
        textColors={["#ffffff"]}
      />
      <button className="spin" onClick={() => spinSpinner()}>
        Spin
      </button>
    </div>
  );
}

export default Spinner;
