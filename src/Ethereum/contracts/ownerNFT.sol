pragma solidity >=0.7.0 <0.9.0;
import "../../../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./NFT.sol";

// SPDX-License-Identifier: GPL-3.0

   contract OwnerNFT is Ownable {
    address []  tokenContractAddress;
    address []  tokenUserAddress;

    uint256 public winNftLimit;
    uint ethCount;
   mapping(address=> bool) userCanPlayStatus;

    address [] public storeContractAddress;   
    address [] public storeUserAddress;   

    mapping(address => uint []) public addressToTokens;
    uint public winningLimit;

struct userContainTokenDetails{
  uint [] uTokenIds;
  address [] ownersAddress;
}

  struct tokenContractDetails{
    mapping(address=> userContainTokenDetails) userSructs;
    address [] userAddress;
    address  contractTokenAddress;
    uint tokenHoldersCount;
    uint [] tokenIds;
  } 
   address [] contractAdresses;
   mapping(address=> tokenContractDetails) contractStruct;
   mapping(address=>  bool) checkContractIsAlready;

   constructor() {
       
    }

  mapping(address=>mapping(uint=>address)) checkTokenOwner;

mapping(address=> bool) checkTheContractAddresses;

function setTokenAddressesAndIds(address contractAddress, uint [] memory  tokens,address tokensOwnerAddress) public onlyOwner returns(bool){
// require(!(checkContractIsAlready[contractAddress]),"is already used");
for(uint i=0; i<tokens.length; i++)
{
checkTokenOwner[contractAddress][tokens[i]]=tokensOwnerAddress;

if(!checkTheContractAddresses[contractAddress])
{//keep tract of all contract address
contractAdresses.push(contractAddress);
checkTheContractAddresses[contractAddress]=true;
}
//assign contract address
contractStruct[contractAddress].contractTokenAddress=  contractAddress;
checkContractIsAlready[contractAddress]=true;
//inside contract struct keep track of all the token holders address
contractStruct[contractAddress].userAddress.push(tokensOwnerAddress);

contractStruct[contractAddress].tokenIds.push(tokens[i]);

//push tokenholder address in struct details
contractStruct[contractAddress].userSructs[tokensOwnerAddress].ownersAddress.push(tokensOwnerAddress);


contractStruct[contractAddress].userSructs[tokensOwnerAddress].uTokenIds.push(tokens[i]);

}

       return true;
}

function userPlayStatus() public view returns(bool)
{
  return userCanPlayStatus[msg.sender];
}
function spinAndWin() public returns(bool){

require(userCanPlayStatus[msg.sender],"first pay!");
uint winCount =  block.timestamp % (winningLimit - 1 + 1) + 1;


sendTokens(winCount);
  
return true;
}

event winningTokens(address winner, uint id,uint winCount); 

function sendTokens(uint winC)public returns(bool)
{
uint min=1;

for(uint i =1; i<= winC; i++)
{
uint selectContract = i %  (contractAdresses.length - 1 + 1) + 1;
 
//fetch contract address
address contAdd=contractAdresses[selectContract-1];

  require(contractStruct[contAdd].tokenIds.length>0,"tokens are not sufficient");

//fetch token place
uint tokenPlace= block.timestamp %  (contractStruct[contAdd].tokenIds.length - min + 1) + min;


//fetch owner address
address ownerAddress=checkTokenOwner[contAdd][contractStruct[contAdd].tokenIds[tokenPlace-1]];
//transfer

transferFrom(ownerAddress, msg.sender, contractStruct[contAdd].tokenIds[tokenPlace-1],contAdd);
emit winningTokens(msg.sender, contractStruct[contAdd].tokenIds[tokenPlace-1],winC);
// //updateOwner
// checkTokenOwner[contAdd][tokenPlace-1]=msg.sender;
//if transfer success then remove id  using last entry
uint lastEntity=contractStruct[contAdd].tokenIds.length;
contractStruct[contAdd].tokenIds[tokenPlace-1]=contractStruct[contAdd].tokenIds[lastEntity-1];
//remove last entry
contractStruct[contAdd].tokenIds.pop();


//check contract has tokens or not
uint contLength;
if(!(contractStruct[contAdd].tokenIds.length > 0))
{
contLength=contractAdresses.length-1;
checkTheContractAddresses[contractAdresses[selectContract-1]]=false;
contractAdresses[selectContract-1]=contractAdresses[contLength];
contractAdresses.pop();
delete contractStruct[contAdd];
}
}
userCanPlayStatus[msg.sender]=false;
return true;

}





function setWinningCount (uint winningCount)  public onlyOwner returns(bool){
  uint availableTokens=0;
 for(uint k=0; k< contractAdresses.length; k++)
{
availableTokens= contractStruct[contractAdresses[k]].tokenIds.length + availableTokens;
}
require(availableTokens >= winningCount,"Winning limit is more than tokens count");
   winningLimit=winningCount;
    return true;
}

uint gameFee=3;

function setGameFee(uint fee) public onlyOwner returns(bool){

gameFee=fee;
  return true;
}


function playGame ()  public payable{
  for(uint k=0; k< contractAdresses.length; k++)
{
  require(contractStruct[contractAdresses[k]].tokenIds.length>1,"tokens are insufficient");
}
if(contractAdresses.length == 0)
{
  require(contractAdresses.length > 0,"add the token contract first");
}
    require(msg.value == gameFee *(10**18), "Not enough ETH");
    userCanPlayStatus[msg.sender]=true;
    ethCount=ethCount + 3;
}
function withdraw () public onlyOwner returns(bool res) {
    payable(msg.sender).transfer(address(this).balance);
    ethCount=0;
    return true;
}
    event winningIds(address _from, address _to, uint []  _amount);
   
    // function mintTheTokens(address _to, uint tokenId, address tokenContract) external{
    //    NFT token = NFT(address(tokenContract));
    //    token._mint(_to,tokenId);
    // }

    function makeApproveToAll(address tokenContract) public{
        NFT token = NFT(address(tokenContract));
       token.setApprovalForAll(address(tokenContract),true);
    }

    function checkApproved(address owner,address operator, address tokenAddress) public view returns(bool){
        NFT token = NFT(address(tokenAddress));
       bool result = token.isApprovedForAll(owner,operator);
      return result;
    }
    function transferFrom(address _from, address _to, uint tokenId, address tokenAdd) public  returns(bool){
       
            NFT token = NFT(address(tokenAdd));
             token.transferFrom(address(_from),_to,tokenId);
        return true;
    }

    function checkBalance(address owner, address tokenContract) public view returns(uint256){
        NFT token = NFT(address(tokenContract));
       uint256 result = token.balanceOf(owner);  
        return result;
    }
    function checkOwner (uint256 tokenId, address tokenContract) public view returns(address){
       NFT token = NFT(address(tokenContract));
       address result = token.ownerOf(tokenId);
        return result;
    }
  

    function checkTheFetchedtokens(address check) public view returns(uint [] memory)
    
    {

     return addressToTokens[check];
    }
   
}
