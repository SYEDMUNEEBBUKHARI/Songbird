/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useContext, useState } from "react";
import "./availableNfts.css";
import web3 from "../../web3";
import web3Context from "../../context/web3context";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import notFound from "../../Assets/notfound.png";
import final from "../../Ethereum/meta/final.json";
import PaginationOutlined from "../pagination/pagination";

const AvailableNfts = () => {
  const contractAbi = useContext(web3Context);
  const [account, setAccount] = useState([]);
  const [availableTokens, setAavailableTokens] = useState([]);
  const [fixedTokens, setFixedTokens] = useState("");

  //lifecycle
  useEffect(() => {
  }, [contractAbi]);
  useEffect(async () => {
    await window.ethereum.enable();
    const Accounts = await web3.eth.getAccounts();
    setAccount(Accounts);
    const findAvailableTokens = await contractAbi.methods
      .findAvailableTokens()
      .call({
        from: account[0],
      });
    let concatArrays = [];
    for (let i = 0; i < findAvailableTokens.length; i++) {
      concatArrays = concatArrays.concat(findAvailableTokens[i]);
    }
    const d = shuffle(concatArrays);
    setFixedTokens(d);
    setAavailableTokens(d.slice(0, 60));
    // availableNfts.include(findAvailableTokens);
    return () => {};
  }, []);

  useEffect(() => {}, [availableTokens, fixedTokens]);
  const setPaginationTokens = (pageNo) => {
    setAavailableTokens(fixedTokens.slice((pageNo - 1) * 60, pageNo * 60));
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <>
      <span className="head">Available Nfts</span>
      <div className="available-nfts">
        {!fixedTokens && (
          <span className="tna">Tokens Not Available.......</span>
        )}
        {availableTokens && (
          <Grid container spacing={2}>
            {availableTokens.map((d, k) => {
              return (
                <Grid
                  key={k}
                  item
                  md={availableTokens.length > 4 ? 3 : 6}
                  lg={availableTokens.length > 4 ? 3 : 6}
                  sm={12}
                  xs={12}
                >
                  <Card sx={{ maxWidth: 345, maxHeight: 400 }}>
                    <p className="rank">
                      Rank #{final[d] && final[d].rank ? final[d].rank : ""}
                    </p>

                    <CardActionArea>
                      <img
                        className="handle-image"
                        src={`${
                          final[d] && final[d].image
                            ? final[d].image.replace(
                                "ipfs://",
                                "https://ipfs.io/ipfs/"
                              )
                            : ""
                        }`}
                        alt={notFound}
                      />

                      <CardContent>
                        <p className="name">
                          {final[d] && final[d].name ? final[d].name : ""}
                        </p>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
      <div className="pagination-center">
        {fixedTokens && (
          <PaginationOutlined
            setPaginationTokens={setPaginationTokens}
            fixedTokens={fixedTokens && fixedTokens}
            count={10}
          />
        )}
      </div>
    </>
  );
};

export default AvailableNfts;
