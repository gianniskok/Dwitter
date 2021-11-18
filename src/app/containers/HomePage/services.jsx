import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import { Marginer } from "../../components/marginer";
import tw from "twin.macro";
import { ethers} from 'ethers';
import Twitters from "../../../artifacts/contracts/Twitters.sol/Twitters.json";
import { Button } from "../../components/button";
import axios from "axios";

const twitterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 

const ServicesContainer = styled.div `
    ${tw`
        bg-blue-400
        w-full
        flex
        flex-col
        items-center
        text-black
        font-extrabold
        text-4xl
    `};
`;

const Title = styled.p `
    ${tw`
        text-black
        font-extrabold
        text-xl
    `};
`;

const ServicesWrapper = styled.div`
    ${tw`
        bg-blue-400
        flex
        flex-wrap
    `}


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

// const ServiceThumbnail = styled.div `
//     width: 100%;
//     height: 14em;
    
//     img {
//         width: 100%;
//         height: 100%;
//     }
// `;

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

// const Title2 = styled.h2 `
//     font-size: 20px;
//     font-weight: 500;
//     ${tw`
//         text-white
//         text-base
//         font-extrabold
//     `};
// `;

const Title3 = styled.h2 `
    font-size: 20px;
    font-weight: 500;
    ${tw`
        text-black
        text-sm
        font-extrabold
    `};
`;

// const SpecialistName = styled.h4 `

//     ${tw`
//         text-white
//         text-base
//         items-center
//     `};
//     font-size: 20px;


// `;

const PriceContainer = styled.div `
    ${tw`
        flex
        flex-col
        items-center
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

const FooterContainer = styled.div `
    height:100%;
    ${tw`
        bg-blue-400
        flex
        items-center  
        pl-20 
    `};
    
`;


export function Services(props) {

    const [tweets, setTweets] = useState([]);
    const [mapping, setMapping] = useState('not')

    useEffect(() => {
        loadTweets()
    }, [])

    async function loadTweets() {
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(twitterAddress, Twitters.abi, signer);
            const data = await contract.fetchTweets();

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


    if ( mapping === 'not') { return <ServicesContainer>No tweets available</ServicesContainer>}
    console.log(tweets)
    return ( 
        <ServicesContainer>
            <Title>News Feed</Title>
            <Marginer direction="vertical" margin="3em"/>                           
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
        </ServicesContainer>
    );
}