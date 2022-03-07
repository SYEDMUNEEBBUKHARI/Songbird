pragma solidity >=0.7.0 <0.9.0;

import "./ERC721.sol";

// SPDX-License-Identifier: GPL-3.0

   contract OwnerNFT {
    address tokenContractAddress;
    uint256 [] public tokens;

   constructor(address  contractAddress, uint [] memory tkns) {
       tokenContractAddress=contractAddress;
       tokens = tkns;
    }

 event winningIds(address _from, address _to, uint []  _amount);
    function mintTheTokens(address _to, uint tokenId) external{
       ERC721 token = ERC721(address(tokenContractAddress));
       token._mint(_to,tokenId);
    }

    function makeApproveToAll(address owner) public{
        ERC721 token = ERC721(address(tokenContractAddress));
        token._setApprovalForAll(owner,address(this),true);
    }

    function checkApproved(address owner,address operator) public view returns(bool){
        ERC721 token = ERC721(address(tokenContractAddress));
       bool result = token.isApprovedForAll(owner,operator);
      return result;
    }
    function transferFrom(address _from, address _to, uint tokenId) public  returns(bool){
        ERC721 token = ERC721(address(tokenContractAddress));
        token.transferFrom(address(_from),_to,tokenId);
        return true;
    }

    function checkBalance(address owner) public view returns(uint256){
        ERC721 token = ERC721(address(tokenContractAddress));
       uint256 result = token.balanceOf(owner);
        return result;
    }
    function checkOwner (uint256 tokenId) public view returns(address){
       ERC721 token = ERC721(address(tokenContractAddress));
       address result = token.ownerOf(tokenId);
        return result;
    }
     uint  [] public collectId ;  
     uint []  public  ids;
     uint [] temp;
     uint public winCount;
    function spinAndWin(address _from, address _to) public  returns(bool)
    {
         require((tokens.length > 2) ,"tokens are not enough");
       winCount =  block.timestamp % (3 - 1 + 1) + 1;
      
        ids = winNft(winCount);

        for (uint i = 0; i < ids.length; i++) {
            transferFrom(_from, _to, ids[i]);
        }
       collectId=temp;
       emit winningIds(_from,  _to, ids);

       ids=temp;
       return true;
    }

     function winNft (uint winningNft ) public  returns(uint  [] memory){
          uint min=1;
        for(uint i=0; i < winningNft; i++){
            uint256 winningId =  block.timestamp % ((tokens.length-1) - min + 1) + min;
            collectId.push(tokens[winningId]);
            tokens[winningId]=tokens[tokens.length-1];
           tokens.pop();
        }
     return collectId;
    }
    
}