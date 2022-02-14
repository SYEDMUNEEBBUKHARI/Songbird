// SPDX-License-Identifier: GPL-3.0

// By HashLips

pragma solidity >=0.7.0 <0.9.0;

import "../../../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../../../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../../../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../../../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";



contract TNFT is ERC721Enumerable, Ownable {
using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    uint public constant MAX_SUPPLY = 100;
    uint public constant PRICE = 0.01 ether;
    uint public constant MAX_PER_MINT = 5;

    string public baseTokenURI;
    uint public min;
    uint public max;
    uint [] public tokens;

    constructor(uint  minimumId, uint  maximumId) ERC721("NFT Collectible", "NFTC") {
        setBaseURI('ufone');
        min=minimumId;
        max=maximumId;
    }

function setToken(uint [] memory Usertokens) public {
        tokens=Usertokens;
}
    function reserveNFTs() public onlyOwner {
        uint totalMinted = _tokenIds.current();

        require(totalMinted.add(10) < MAX_SUPPLY, "Not enough NFTs left to reserve");

        for (uint i = 0; i < 10; i++) {
            _mintSingleNFT();
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }
//-=-=-=-=-=-=--
 mapping(uint => bool) transferedNft; 
    uint256 public winCount;
    function spinSpinner()  external  returns (uint[] memory)  {
    // Formula is (max-min+1) + min;
    winCount =  block.timestamp % (3 - 1 + 1) + 1;
   uint [] memory ids = winNft(winCount);
   return ids;
    }

    uint  [] public collectId ;
    uint public findLength;
    function winNft (uint winningNft ) public  returns(uint  [] memory){

    for(uint i=0; i < winningNft; i++){
      uint256 winningId =  block.timestamp % (max - min + 1) + min;
        collectId.push(tokens[winningId]);
        tokens[winningId]=tokens[tokens.length-1];
        tokens.pop();

    }
    findLength=collectId.length;
     return collectId;
    }
    
    // -=-=-=-=-=-=
    function mintNFTs(uint _count) public payable {
        uint totalMinted = _tokenIds.current();

        require(totalMinted.add(_count) <= MAX_SUPPLY, "Not enough NFTs left!");
        require(_count >0 && _count <= MAX_PER_MINT, "Cannot mint specified number of NFTs.");

        for (uint i = 0; i < _count; i++) {
            _mintSingleNFT();
        }
    }

    function _mintSingleNFT() private {
        uint newTokenID = _tokenIds.current();
        _safeMint(msg.sender, newTokenID);
        _tokenIds.increment();
    }

    function tokensOfOwner(address _owner) external view returns (uint[] memory) {

        uint tokenCount = balanceOf(_owner);
        uint[] memory tokensId = new uint256[](tokenCount);

        for (uint i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    function withdraw() public payable onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");

        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }
}