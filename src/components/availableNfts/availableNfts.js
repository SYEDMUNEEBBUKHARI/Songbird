/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useContext, useState } from "react";
import "./availableNfts.css";
import availableNfts from "../../Ethereum/meta/rarepepe_metadata";
import web3 from "../../web3";
import web3Context from "../../context/web3context";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import notFound from "../../Assets/notfound.png";
import final from "../../Ethereum/meta/final.json";
import PaginationOutlined from "../pagination/pagination";

const AvailableNfts = () => {
  const contractAbi = useContext(web3Context);
  const [account, setAccount] = useState([]);
  const [availableTokens, setAavailableTokens] = useState("");
  const [fixedTokens, setFixedTokens] = useState("");

  //lifecycle
  useEffect(() => {
    console.log("contractAbi", contractAbi);
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
    console.log("findAvailableTokens", findAvailableTokens);
    setFixedTokens(findAvailableTokens);
    setAavailableTokens(findAvailableTokens[0].slice(0, 30));
    // availableNfts.include(findAvailableTokens);
    return () => {};
  }, []);

  useEffect(() => {}, [availableTokens]);
  const setPaginationTokens = (pageNo) => {
    setAavailableTokens(fixedTokens[0].slice((pageNo-1)*30 , pageNo*30));
    
  }
  return (
    <>
      <span className="head">Available Nfts</span>
      <div className="available-nfts">
        {console.log("availableNfts", availableNfts)}
        {!availableTokens && <span className="tna">Tokens Not Available!</span>}
        {availableTokens && (
          <Grid container spacing={2}>
            {availableTokens.map((d) => {
              return (
                <Grid item md={3} lg={3} sm={12} xs={12}>
                  {console.log("l", d)}
                  <Card sx={{ maxWidth: 345, maxHeight: 400 }}>
                    <p className="rank">Rank #{final[d].rank}</p>

                    <CardActionArea>
                      <img
                        className="handle-image"
                        src={`${final[d].image.replace(
                          "ipfs://",
                          "https://ipfs.io/ipfs/"
                        )}`}
                        alt={notFound}
                      />

                      <CardContent>
                        <p className="name">{final[d].name}</p>
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
        <PaginationOutlined
          setPaginationTokens={setPaginationTokens}
          fixedTokens={fixedTokens}
          count={10}
        />
      </div>
    </>
  );
};

export default AvailableNfts;
