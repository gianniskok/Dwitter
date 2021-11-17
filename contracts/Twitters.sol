//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Twitters is ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter private _tweet;
    Counters.Counter private _newUser;


    
    struct Tweet {
        uint256 tweetId;
        uint256 likes;
        address publisher;
        string url;
    }
    
    struct User {
        uint256 userId;
        string userName;
    }
    
    mapping(address => address[]) private following;
    mapping(uint => User) private idToUser;
    mapping(uint => Tweet) private idToTweet;
    mapping(address => uint) private addToId;
    mapping(string => address) private usernameToAddress;
    mapping(address => uint256[])  private addToLikes;
    
    event TweetCreated (
        uint indexed tweetId,
        uint likes,
        address publisher,
        string url
    );

    
    function createUser(string memory _userName) public   {
        _newUser.increment();
        idToUser[_newUser.current()] = User (
            _newUser.current(),
            _userName
        );
        addToId[msg.sender] = idToUser[_newUser.current()].userId;
        usernameToAddress[idToUser[_newUser.current()].userName] = msg.sender;
    } 

    function isUser() external view returns (bool){      
            if(addToId[msg.sender] == 0){
                return false;
            }
            return true;  
    }

    function createTweet(string memory _url) external {
        _tweet.increment();
        idToTweet[_tweet.current()] = Tweet (
            _tweet.current(),
            0,
            msg.sender,
            _url
        );
        emit TweetCreated(idToTweet[_tweet.current()].tweetId, idToTweet[_tweet.current()].likes, idToTweet[_tweet.current()].publisher, _url);
    }
    
    function follow(address _followAd) external  {
        if(following[msg.sender].length != 0) {
            for(uint i =0 ; i<following[msg.sender].length; i++){
                require(following[msg.sender][i] != _followAd, "Already following");
            }
        }
        following[msg.sender].push(_followAd);
    }
    
    function unfollow(address _followAd) external {
        uint256 length = following[msg.sender].length;
        require(length >= 1, "You dont follow any address");
        if(length > 1){
            for(uint i = 0; i <= length-1; i++){
                if(following[msg.sender][i] == _followAd){
                    following[msg.sender][i] = following[msg.sender][length-1];
                    following[msg.sender].pop(); 
                    break; 
                }
            } 
        }else if(following[msg.sender][0] == _followAd){
            following[msg.sender].pop(); 
        }
    }
    
    function like(uint256 _tweetId) external {
        for(uint i = 0; i<addToLikes[msg.sender].length; i++){
            require(addToLikes[msg.sender][i] != _tweetId, "Already liked");
        }
        addToLikes[msg.sender].push(_tweetId);  
        idToTweet[_tweetId].likes++;
    }
    
    function unlike(uint256 _tweetId) external {
        require(addToLikes[msg.sender].length > 0, "No likes yet");
        for(uint i = 0; i<addToLikes[msg.sender].length; i++){
            if(addToLikes[msg.sender][i] == _tweetId){
                addToLikes[msg.sender][i] = addToLikes[msg.sender][addToLikes[msg.sender].length - 1];
                addToLikes[msg.sender].pop();
                idToTweet[_tweetId].likes--;
                break;
            }
        }
    }
    
    function followingView() public view returns (address[] memory ){
        return following[msg.sender];
    }
    
    function fetchTweets() public view returns (Tweet[] memory) {
        uint256 tweetsCount = _tweet.current();
        uint256 tweetsFetch = 0;
        uint256 currentIndex = 0;

        for(uint i = 0; i< tweetsCount; i++){
            if(idToTweet[i+1].publisher == msg.sender){
                tweetsFetch++;
            }else for(uint j = 0; j<following[msg.sender].length; j++){
                if(idToTweet[i+1].publisher == following[msg.sender][j]){
                    tweetsFetch++;
                }
            }
        }

        Tweet[] memory tweet = new Tweet[](tweetsFetch);
        for(uint i =0; i<tweetsCount; i++){
            if(idToTweet[i+1].publisher == msg.sender) {
                uint currentId = i+1;
                Tweet storage currentItem = idToTweet[currentId];
                tweet[currentIndex] = currentItem;
                currentIndex +=1;
            }else if(following[msg.sender].length > 0) {
                for(uint j = 0; j<following[msg.sender].length; j++){
                    if(idToTweet[i+1].publisher == following[msg.sender][j]){
                        uint currentId = i+1;
                        Tweet storage currentItem = idToTweet[currentId];
                        tweet[currentIndex] = currentItem;
                        currentIndex +=1;
                    }
                }
            }
        }
        return tweet;
    }  

    function getUrl(uint256 _tweetId) public view returns (string memory){
        string memory url = idToTweet[_tweetId].url;
        return url;
    }
}

    


//     function fetchMyNfts() public view returns (MarketItem[] memory) {
//         uint totalItemCount = _itemsIds.current();
//         uint itemCount = 0;
//         uint currentIndex = 0;

//         for(uint i =0; i<totalItemCount; i++){
//             if(idToMarketItem[i+1].owner == msg.sender){
//                 itemCount +=1;
//             }
//         }
//         MarketItem[] memory items = new MarketItem[](itemCount);
//         for(uint i =0; i<totalItemCount; i++){
//             if(idToMarketItem[i+1].owner == msg.sender) {
//                 uint currentId = i+1;
//                 MarketItem storage currentItem = idToMarketItem[currentId];
//                 items[currentIndex] = currentItem;
//                 currentIndex +=1;
//             }
//         }
//         return items;
//     }   
// }