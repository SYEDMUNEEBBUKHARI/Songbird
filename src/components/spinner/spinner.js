/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useState, useContext } from "react";
import { Wheel } from "react-custom-roulette";
import web3 from "../../web3";
// import contractAbi from "../../contractAbi";
import web3Context from "../../context/web3context";
import "./spinner.css";
import AvailableNfts from "../availableNfts/availableNfts";

function Spinner() {
  const [mustSpin, setspin] = useState(false);
  const [spinOutput, setSpinOutput] = useState(0);
  const contractAbi = useContext(web3Context);

  //user can play
  const [userCanPlay, setUserCanPlay] = useState();
  const [data, setData] = useState([]);

  const [account, setAccount] = useState([]);
  const [winningLimit, setWinningLimit] = useState(3);

  useEffect(() => {
    (async function () {
      const Accounts = await web3.eth.getAccounts();
      setAccount(Accounts);

      const userPlayStatus = await contractAbi.methods.userPlayStatus().call({
        from: account[0],
      });
      setUserCanPlay(userPlayStatus);
      // userPlayStatus;

      const winningLimit = await contractAbi.methods.winningLimit().call({
        from: account[0],
      });
      console.log("Winning Limit", winningLimit);
      setWinningLimit(winningLimit === 0 ? 3 : winningLimit);
      for (let i = 1; i <= 3; i++) {
        setData((data) => [
          ...data,
          {
            option: i,
            style: {
              backgroundColor: `#${Math.floor(
                Math.random() * 16777215
              ).toString(16)}`,
              textColor: "white",
            },
          },
        ]);
      }
    })();
    // return () => {};
  }, []);
  useEffect(() => {}, [winningLimit, data]);

  // {
  //       option: i,
  //       style: {
  //         backgroundColor: Math.floor(Math.random() * 16777215).toString(16),
  //         textColor: "black",
  //       },
  //     }
  //from master
  // setspin(true);
  // const Accounts = await web3.eth.getAccounts();
  // console.log("spin Account", Accounts[0]);

  // const spin = await contractAbi.methods
  //   .spinAndWin("0xCccCC17854642B9b7503b3AC7C38F9F7Dba221F8", Accounts[0])
  //   .send({
  //     from: Accounts[0],
  //     gas: 9000000,
  //     gasLimit: 9000000,
  //   });
  // console.log("spin result", spin.events.winningIds);

  // if (spin) {
  //   // setspin(false);
  //   setSpinOutput(spin);
  // }
  const spinSpinner = async () => {
    if (!userCanPlay) {
      console.log("pay");
    } else {
      console.log("play");
    }
  };
  return (
    <div className="spinner-position">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={spinOutput}
        data={data}
        // backgroundColors={["red", "red"]}
        textColors={["#ffffff"]}
      />
      <div>
        {" "}
        <button className={"spin"} onClick={() => spinSpinner()}>
          {!userCanPlay ? "Play" : "Spin"}
        </button>
      </div>
    </div>
  );
}

export default Spinner;
