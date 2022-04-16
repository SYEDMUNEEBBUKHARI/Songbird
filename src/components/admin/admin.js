/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useState, useContext } from "react";
import "./admin.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { TabList, TabPanel, TabContext } from "@material-ui/lab";
import { TextField, Button, TextareaAutosize } from "@mui/material";
import web3 from "../../web3";
// import contractAbi from "../../contractAbi";
import web3Context from "../../context/web3context";

const Admin = () => {
  const [value, setValue] = React.useState("1");
  const [winningLimit, setWiningLimit] = useState("");
  const [inputError, setInputErrors] = useState({
    winningLimit: false,
    contractAddress: false,
    tokenIds: false,
    tokenOwnerAddress: false,
  });
  const [account, setAccount] = useState("");
  const [winLim, setWinLim] = useState("");
  const [contractAddressV, setContractAddress] = useState("");
  const [tokenidsV, setTokenIds] = useState("");
  const [tokenOwnerAddressV, setTokenOwnerAddress] = useState("");

  const contractAbi = useContext(web3Context);

  useEffect(() => {
    (async function () {
      const Accounts = await web3.eth.getAccounts();
      setAccount(Accounts);
      const wL = await contractAbi.methods.winningLimit().call({
        from: Accounts[0],
      });
      setWinLim(wL);
    })();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const submitLimit = async () => {
    if (!(winningLimit.length > 0))
      setInputErrors({ ...inputError, winningLimit: true });
    else {
      setInputErrors({ ...inputError, winningLimit: false });

      const winLimit = await contractAbi.methods
        .setWinningCount(winningLimit)
        .call({
          from: account[0],
        });
    }
    console.log("inputError", inputError);
  };

  const submitData = async () => {
    if (
      !(contractAddressV.length > 0) ||
      !(tokenidsV.length > 0) ||
      !(tokenOwnerAddressV.length > 0)
    )
      setInputErrors({
        tokenIds: !(tokenidsV.length > 0) ? true : false,
        contractAddress: !(contractAddressV.length > 0) ? true : false,
        tokenOwnerAddress: !(tokenOwnerAddressV.length > 0) ? true : false,
      });
    const { tokenIds, contractAddress, tokenOwnerAddress } = inputError;
    if ((!tokenIds, !contractAddress, !tokenOwnerAddress)) {
      let output = [...tokenidsV.replace(/'/g, "")];
      let str = "";
      let temp = [];
     await output.filter((d, k) => {
        if (d !== "," && !(k === output.length - 1)) {
          str = str.concat(d);
          console.log("in");
        } else if (k === output.length - 1 && d !== ",") {
          str = str.concat(d);
          temp.push(parseInt(str));
          str = "";
        } else {
          temp.push(parseInt(str));
          str = "";
          console.log("k", k);
        }

        return temp;
      });
      console.log("daata", temp);

       const setTokenAndIds = await contractAbi.methods
         .setTokenAddressesAndIds(contractAddressV, temp, tokenOwnerAddressV)
         .send({
           from: account[0],
         });
      console.log("setTokenAndIds", setTokenAndIds);
      
    }

    // const winLimit = await contractAbi.methods
    //   .setWinningCount(winningLimit)
    //   .call({
    //     from: account[0],
    //   });
    console.log("inputError", inputError);
  };
  return (
    <>
      <div>
        <Box
          md={{ width: "100%", typography: "body1" }}
          className="make-center"
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Set Winning Limit" value="1" />
                <Tab label="Add Tokens Data" value="2" />
                <Tab label="Item Three" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1" className="make-center">
              <span className="win-limit">
                {" "}
                Winning Limit: {winLim && winLim}
              </span>
              <Grid
                className="panel-1"
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item md={12} xs={12}>
                  <TextField
                    error={inputError.winningLimit ? true : false}
                    helperText="Enter The Winning Limit"
                    id="demo-helper-text-aligned"
                    label="Winning Limit"
                    onChange={(e) => {
                      if (e.target.value < 1)
                        setInputErrors({ winningLimit: true });
                      else setInputErrors({ winningLimit: false });
                      setWiningLimit(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Button variant="contained" onClick={() => submitLimit()}>
                    Set Limit
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value="2" className="make-center">
              <Grid
                className="panel-1"
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item md={12} xs={12}>
                  <TextField
                    error={inputError.contractAddress ? true : false}
                    aria-label="minimum height"
                    helperText="Enter The Contract Address"
                    minRows={3}
                    placeholder="Contract Address"
                    style={{ width: 200 }}
                    onChange={(e) => {
                      if (e.target.value < 1)
                        setInputErrors({ contractAddress: true });
                      else setInputErrors({ contractAddress: false });
                      setContractAddress(e.target.value);

                      console.log("input nerroes", inputError);
                    }}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    error={inputError.tokenIds ? true : false}
                    aria-label="minimum height"
                    minRows={3}
                    helperText="Enter The Token Ids Seperated By Comma"
                    placeholder="Token Ids"
                    style={{ width: 200 }}
                    onChange={(e) => {
                      if (e.target.value < 1)
                        setInputErrors({ tokenIds: true });
                      else setInputErrors({ tokenIds: false });
                      setTokenIds(e.target.value);

                      console.log("input nerroes", inputError);
                    }}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    error={inputError.tokenOwnerAddress ? true : false}
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Token Owner Address"
                    helperText="Enter The Token Owner Address"
                    style={{ width: 200 }}
                    onChange={(e) => {
                      if (e.target.value < 1)
                        setInputErrors({ tokenOwnerAddress: true });
                      else setInputErrors({ tokenOwnerAddress: false });
                      setTokenOwnerAddress(e.target.value);

                      console.log("input nerroes", inputError);
                    }}
                  />
                </Grid>
                <Grid md={12} xs={12}>
                  <Button variant="contained" onClick={() => submitData()}>
                    Add Data
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
};

export default Admin;