/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import "./availableNfts.css";
import availableNfts from "../../Ethereum/meta/rarepepe_metadata";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import notFound from "../../Assets/notfound.png";
import splitData from './helpers';
const AvailableNfts = () => {
  useEffect(() => {
    console.log("p", JSON.stringify(splitData()));
    return () => {};
  }, []);
  return (
    <>
      <span className="head">Available Nfts</span>

      <div className="available-nfts">
        {console.log("availableNfts", availableNfts)}
        <Grid container spacing={2}>
          {availableNfts &&
            availableNfts.rarity.map((d) => {
              return (
                <Grid item md={3} lg={3} sm={12} xs={12}>
                  <Card sx={{ maxWidth: 345, maxHeight: 400 }}>
                    <p className="rank">Rank #{d.rank}</p>

                    <CardActionArea>
                      <img
                        className="handle-image"
                        src={`${d.image.replace(
                          "ipfs://",
                          "https://ipfs.io/ipfs/"
                        )}`}
                        alt={notFound}
                      />

                      <CardContent>
                        <p className="name">{d.name}</p>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </>
  );
};

export default AvailableNfts;
