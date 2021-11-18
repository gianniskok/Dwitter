# Dwitter
# Full stack ethereum blockchain app for a decentralized version of twitter 

#### v0.1 in progress  :

  - [x] User has to create a username and connect with metamask
  - [x] User can create posts
  - [x] User can follow/unfollow other users
  - [x] User sees his posts and his followings posts 
  - [x] User can like/dislike posts
  - [x] User can see all other users profiles
  - [x] used ipfs for uploading tweets 
  - [ ] More to come




## __Here's how to deploy this project:__

1. Clone the repo
```shel
git clone https://github.com/gianniskok/yu-gi-oh-marketplace.git
```
2. Go to my-app folder
```shel
cd my-app
```
3. Install the dependencies
```shel
sudo npm install 
```
4. Start the local test node
```shel
npx hardhat node
```
5. Deploy the contract
```shel
npx hardhat run scripts/deploy.js --network localhost
```
6. install metamask extention on chrome or firefox.
  - create user.
  - connect to localhost:8545 .
  - import account 0 and 1.
  _(Copy privare keys from harhat node for addresses 0 and 19, click on metamask extension, select import accounts and paste private keys)._
  Click [here](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account) for more info on metamask import accounts

7. Run the app
```shel
npm start
```


#### Feel free to contact me on giannis.kokkoros@hotmail.com for more info
