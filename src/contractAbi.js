import fetchAbi from "./artifacts/src_Ethereum_contracts_ownerNFT_sol_OwnerNFT.abi";

const setAbi = async (data) => {
  let abi = await data.then((data) => data);
  return abi;
};

async function fetchTheAbi(setAbi) {
  let d = await fetch(fetchAbi);
  let s = setAbi(d.text());
  return s;
}
let fetchAbiInterface = fetchTheAbi(setAbi);
//deployed address

export default fetchAbiInterface;
// export default new web3.eth.Contract(fetchAbiInterface, address);
