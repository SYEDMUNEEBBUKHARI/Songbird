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
    uint amountToPlay;
    uint [] public tokens;
    address private masterWallet;
    mapping(address => mapping (address => uint256)) allowed;
    mapping(uint => bool) transferedNft; 
    uint256 public winCount;
    mapping(address=> bool) userStatus;


    constructor(uint  minimumId, uint  maximumId) ERC721("NFT Collectible", "NFTC") {
        setBaseURI('ufone');
        min=minimumId;
        max=maximumId;
    }

    function setTheMasterWallet(address master) public returns(bool){
        masterWallet=master;
        return true;
    }
     function setAmountToPlay(uint amount) public returns(bool){
        amountToPlay=amount;
        return true;
    }

    function setToken(uint [] memory Usertokens) public {
            tokens=Usertokens;
    }

 

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

   

    function spinSpinner()  external   returns (uint[] memory,uint )  {
    // Formula is (max-min+1) + min;
    require((tokens.length>2) ,"tokens are not enough");
    require(userStatus[msg.sender],"first pay then play");
    winCount =  block.timestamp % (3 - 1 + 1) + 1;
    uint [] memory ids = winNft(winCount);

    userStatus[msg.sender]=false;
    return (ids,winCount);
    }

    uint  [] public collectId ;
    uint public findLength;

    function allowContract(address  approveTheAddress)public{
    for(uint i=0; i < tokens.length; i++){
        approve(approveTheAddress,tokens[i]);
    }
    }

    function winNft (uint winningNft ) internal  returns(uint  [] memory){
    for(uint i=0; i < winningNft; i++){
        uint256 winningId =  block.timestamp % ((tokens.length-1) - min + 1) + min;
        collectId.push(tokens[winningId]);
       _transferFrom(address(masterWallet),msg.sender,tokens[winningId]);

        tokens[winningId]=tokens[tokens.length-1];
        tokens.pop();
    }
    findLength=collectId.length;
     return collectId;
    }
    
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );
        allowed[msg.sender][to] = tokenId;

        _approve(to, tokenId);
    }

    function _allowance(address _owner, address _spender)  public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    function _transferFrom(
        address _from,
        address _to,
        uint256 _amount
    )   public  returns  (bool ) {
         // balances[_from] -= _amount;
            // allowed[_from][msg.sender] -= _amount;
          _transfer(_from, _to, _amount);
            return true;
    }

    function mintNFTs(uint _count) public payable {
        uint totalMinted = _tokenIds.current();
        require(totalMinted.add(_count) <= MAX_SUPPLY, "Not enough NFTs left!");
        require(_count >0 && _count <= MAX_PER_MINT, "Cannot mint specified number of NFTs.");
        for (uint i = 0; i < _count; i++) {
            _mintSingleNFT( );
        }
    }
    function _mintSingleNFT() private {
        uint newTokenID = _tokenIds.current();

        _safeMint(msg.sender, newTokenID);
        _tokenIds.increment();
    }

    function tokensOfOwner(address _owner) external view  returns (uint[] memory) {

        uint tokenCount = balanceOf(_owner);
        uint[] memory tokensId = new uint256[](tokenCount);

        for (uint i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    function sendBackToOwner(address _from,
        address _to,
        uint256 _amount
    )   public onlyOwner returns  (bool ) {
         
          _transfer(_from, _to, _amount);
            return true;
    }


    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }
    

    function payandPlay() public payable returns (bool){
    require((msg.value==amountToPlay),"pay 3 ethers");
    userStatus[msg.sender]=true;

    return true;
    }


    function checkUserStatus() public view returns(bool){
   return userStatus[msg.sender];
    }


    function withdraw() public payable onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");

        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }
   
}