/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useState, useContext } from "react";
import { Wheel } from "react-custom-roulette";
import web3 from "../../web3";
// import contractAbi from "../../contractAbi";
import web3Context from "../../context/web3context";
import "./spinner.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
// import AvailableNfts from "../availableNfts/availableNfts";
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import final from "../../Ethereum/meta/final.json";
import notFound from "../../Assets/notfound.png";

function Spinner() {
  const [mustSpin, setspin] = useState(false);
  const [spinOutput, setSpinOutput] = useState(3);
  const contractAbi = useContext(web3Context);

  //user can play
  const [userCanPlay, setUserCanPlay] = useState("");
  const [data, setData] = useState([]);

  const [account, setAccount] = useState([]);
  const [winningLimit, setWinningLimit] = useState(3);
  const [payFee, setPayFee] = useState(3);
  const [flag, setFlag] = useState(false);
  const [fixedTokens, setFixedTokens] = useState("");
  useEffect(() => {}, [userCanPlay]);
  useEffect(() => {
    (async function () {
      const Accounts = await web3.eth.getAccounts();
      setAccount(Accounts);

      const userPlayStatus = await contractAbi.methods
        .userPlayStatus(Accounts[0])
        .call({
          from: Accounts[0],
        });
      setUserCanPlay(userPlayStatus);
      // userPlayStatus;
      const winningLimit = await contractAbi.methods.winningLimit().call({
        from: Accounts[0],
      });
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
      const pF = await contractAbi.methods.gameFee().call({
        from: Accounts[0],
      });
      setPayFee(pF);

      const findAvailableTokens = await contractAbi.methods
        .findAvailableTokens()
        .call({
          from: Accounts[0],
        });
      console.log("findAvailableTokens", findAvailableTokens);
      setFixedTokens(findAvailableTokens);
    })();
    // return () => {};
  }, []);
  useEffect(() => {}, [winningLimit, data, payFee]);
  useEffect(() => {}, [spinOutput]);

  const [winIds, setWinIds] = useState("");

  const spinSpinner = async () => {
    if (!userCanPlay) {
      //pay
      await contractAbi.methods.playGame().send({
        from: account[0],
        value: web3.utils.toWei(String(payFee), "ether"),
        gas: 30000000,
        gasLimit: 3000000000000000000,
      });
      setFlag(!flag);
      setUserCanPlay(true);
      // 275000000;
      // 30000000
    } else {
      //play
      const spinAndWin = await contractAbi.methods.spinAndWin().send({
        from: account[0],
        gas: 30000000,
        gasLimit: 3000000000000000000,
      });
      // spinAndWin.events.winningTokens.returnValues.winCount;
      // spinAndWin.events.winningTokens.returnValues.id;
      // spinAndWin.events.winningTokens.returnValues.winner;
      if (spinAndWin.events) {
        setspin(true);
        // setWinCount(spinAndWin.events.winningTokens);
        setWinIds(spinAndWin.events.winningTokens);
        setUserCanPlay(false);
        // setWinnerAddress(spinAndWin.events.winningTokens.returnValues.winner);
        setOpen(true);
        setSpinOutput(spinAndWin.events.winningTokens.length);
      }
    }
  };

  //dialog

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
    setWinCount("");
    setWinIds("");
    setWinnerAddress("");
  };

  useEffect(() => {}, [flag, winIds]);

  return (
    <div className="spinner-position">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={spinOutput - 1}
        data={data}
        // backgroundColors={["red", "red"]}
        textColors={["#ffffff"]}
      />
      <div>
        {" "}
        {console.log("fixed", fixedTokens)}
        <button
          className={fixedTokens.length > 0 ? "spin" : "not-spin"}
          onClick={() => spinSpinner()}
          disabled={fixedTokens.length > 0 ? false : true}
        >
          {!userCanPlay ? "Play" : "Spin"}
        </button>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <span className="count">count: {winIds && winIds.length}</span>
        <DialogTitle
          style={{ textAlign: "center" }}
          id="responsive-dialog-title"
        >
          {"Your Winning Tokens Are"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              {winIds &&
                winIds.map((d, k) => {
                  return (
                    <Grid key={k} item md={4} lg={4} sm={12} xs={12}>
                      <Card sx={{ maxWidth: 345, maxHeight: 400 }}>
                        <p className="rank">
                          Rank #
                          {final[d.returnValues.id] &&
                          final[d.returnValues.id].rank
                            ? final[d.returnValues.id].rank
                            : ""}
                        </p>

                        <CardActionArea>
                          <img
                            className="h-image"
                            src={`${
                              final[d.returnValues.id] &&
                              final[d.returnValues.id].image
                                ? final[d.returnValues.id].image.replace(
                                    "ipfs://",
                                    "https://ipfs.io/ipfs/"
                                  )
                                : ""
                            }`}
                            alt={notFound}
                          />

                          <CardContent>
                            <p className="name">
                              {final[d.returnValues.id] &&
                              final[d.returnValues.id].name
                                ? final[d.returnValues.id].name
                                : ""}
                            </p>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Spinner;
