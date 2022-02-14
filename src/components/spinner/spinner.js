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
  const spinSpinner = async () => {
    setspin(true);
    const spin = await contractAbi.methods
      .spinSpinner()
      .call({ from: account[0] });
    console.log("spin result", spin);

    if (spin) {
      setspin(false);
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
