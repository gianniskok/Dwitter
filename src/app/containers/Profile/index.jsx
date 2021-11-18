import React, { useState , useEffect} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Footer } from "../../components/footer";
import { ethers } from "ethers";
import Twitters from "../../../artifacts/contracts/Twitters.sol/Twitters.json";
import { Button } from "../../components/button";
import axios from "axios";
import { NavBarHomePage } from "../../components/navbarHomepage";

const twitterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const TopSectionContainer = styled.div`
    ${tw`
        min-h-screen
        w-full
        flex
        flex-col
        items-center
        bg-blue-400
        justify-between
    `};
`;

const Title = styled.p `
    ${tw`
        text-black
        font-extrabold
        text-xl
    `};
`;

const Description = styled.p`
    ${tw`
        flex 
        flex-wrap
        items-center
        max-w-2xl 
        text-sm
        text-white
        md:text-base
        font-normal
    `}
`;

const Slogan = styled.h1 `
    ${tw`
        
        text-white
        text-2xl 
        md:text-5xl 
        font-extrabold
        md:font-black
        md:leading-normal  
    `};
`;

const ServicesWrapper = styled.div`
    ${tw`
        bg-blue-400
        flex
        flex-wrap
    `}


`;

const Title3 = styled.h2 `
    font-size: 20px;
    font-weight: 500;
    ${tw`
        text-black
        text-sm
        font-extrabold
    `};
`;

const CardContainer = styled.div `
    ${tw`
        flex
        flex-col
        overflow-hidden
        mt-0.5 
        mb-5
        mr-2
        ml-9
        bg-blue-400
        
    `};
    box-shadow: 0 0 3.9px rgba(0, 0 ,0, 0.27);
    border-bottom: 3px solid rgba(0, 0, 0, 1);
    border-top: 3px solid rgba(0, 0, 0, 1);
    border-left: 3px solid rgba(0, 0, 0, 1);
    border-right: 3px solid rgba(0, 0, 0, 1);
`;

const TopContainer = styled.div `    
    ${tw`
        w-full
    `};
`;

const ContentContainer = styled.div `
    ${tw`
        w-full
        flex
        flex-col
        items-center
        justify-between
        pr-4
        pl-4
        pt-1
        bg-blue-400
    `};

`;

const PriceContainer = styled.div `
    ${tw`
        flex
        flex-col
        items-center
    `};
`;

const FooterContainer = styled.div `
    height:100%;
    ${tw`
        bg-blue-400
        flex
        items-center  
        pl-20 
    `};
    
`;

const ButtonsContainer=styled.div`
    width: 200px;
    ${tw`
        flex    
        flex-wrap
        h-full
    `};
`;

const BottomContainer = styled.div `
    ${tw`
        bg-blue-400
        w-full
        flex
        flex-col
        items-center
        justify-between

    `};

`;

const TitleContainer = styled.div `
    ${tw`
        bg-blue-400
        flex
        flex-row
        w-full
        items-center
        justify-between
        pr-24
        pl-24
    `};
`;

export function Profile({match}) {
    const {
        params: {addressId},
    } = match;
    console.log(addressId)

    const[id,setId] = useState("")

    async function getId(){
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(twitterAddress, Twitters.abi, signer);
            const data = await contract.addToId(addressId);
            setId(data.toNumber());
        }
    }
   const[state, setState] = useState(false)

    async function isFollowed(){
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(twitterAddress, Twitters.abi, signer);
            const data = await contract.isFollowed(addressId);
            setState(data);
        }
    }

    useEffect(() => {
        getId() 
        isFollowed()  
    })


    console.log(id);
    const [tweets, setTweets] = useState([]);
    const [mapping, setMapping] = useState('not');

    useEffect(() => {
        loadTweets()
    })

    async function loadTweets() {
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(twitterAddress, Twitters.abi, signer);
            const data = await contract.fetchUserTweets(addressId);

            const tweetsL = await Promise.all(data.map(async i => {
                const url = await contract.getUrl(i.tweetId)
                const meta = await axios.get(url)
                let tweetL = {
                    tweetId: i.tweetId.toNumber(),
                    publisher: i.publisher,
                    tweet: meta.data.tweet,
                    likes: i.likes
                }
                return tweetL;
                
            }))
            console.log(tweetsL.length)
            if(tweetsL.length > 0) { setMapping('yes')}
            setTweets(tweetsL)

        }
    }

    async function likeTweet(tweet) {
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(twitterAddress, Twitters.abi, signer);
            const transaction = await contract.like(tweet.tweetId)
            await transaction.wait()
        }
    }

    async function dislikeTweet(tweet) {
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(twitterAddress, Twitters.abi, signer);
            const transaction = await contract.unlike(tweet.tweetId)
            await transaction.wait()
        }
    }

    async function follow() {
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(twitterAddress, Twitters.abi, signer);
            const transaction = await contract.follow(addressId)
            await transaction.wait()
        }
    }

    async function unfollow() {
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(twitterAddress, Twitters.abi, signer);
            const transaction = await contract.unfollow(addressId)
            await transaction.wait()
        }
    }



    if(mapping==='not')return (
        <TopSectionContainer>
            <NavBarHomePage/>
            <Slogan>Welcome to {addressId}'s Profile</Slogan>
            {!state? <ButtonsContainer onClick={()=> follow()}>
                <Button text="FOLLOW"/>
            </ButtonsContainer> : 
            <ButtonsContainer onClick={()=> unfollow()}>
                <Button text="UNFOLLOW"/>
            </ButtonsContainer> }
            NO POSTS YET
        </TopSectionContainer>
    )
    return(
        <TopSectionContainer>
            <NavBarHomePage/>
            <Slogan>Welcome to {addressId}'s Profile</Slogan>
            {!state? <ButtonsContainer onClick={()=> follow()}>
                <Button text="FOLLOW"/>
            </ButtonsContainer> : 
            <ButtonsContainer onClick={()=> unfollow()}>
                <Button text="UNFOLLOW"/>
            </ButtonsContainer> }
            <Description>
                Recent Posts
            </Description>
            <ServicesWrapper >
                {tweets.map((tweet, i) => (          
                    <CardContainer key={i} >
                        <TopContainer >
                            <TitleContainer>
                                <Title3> ID: {tweet.tweetId.toString()} </Title3>
                                <Title3>Publisher: {tweet.publisher}</Title3> 
                            </TitleContainer>
                        </TopContainer>
                        <ContentContainer>
                            <Title>{tweet.tweet.toString()}</Title>
                        </ContentContainer>
                        <BottomContainer>
                            <PriceContainer>
                                <Title3>Likes: {tweet.likes.toString()} </Title3>
                            </PriceContainer>
                            <FooterContainer>
                                {<ButtonsContainer onClick={() => likeTweet(tweet)}>
                                    <Button text="Like Tweet"/>                         
                                </ButtonsContainer>}
                                {<ButtonsContainer onClick={() => dislikeTweet(tweet)}>
                                    <Button text="Dislike Tweet"/>                         
                                </ButtonsContainer>}                                        
                            </FooterContainer> 
                        </BottomContainer>
                    </CardContainer>
                    ))
                    }              
                </ServicesWrapper>            
            <Footer /> 
        </TopSectionContainer>         
    )
}
