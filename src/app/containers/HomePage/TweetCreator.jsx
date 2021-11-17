import React from "react";
import styled from "styled-components";
import { Marginer } from "../../components/marginer";
import tw from "twin.macro";
import { useState } from 'react';
import { ethers} from 'ethers';
import { Button } from "../../components/button";
import Twitters from "../../../artifacts/contracts/Twitters.sol/Twitters.json";



const{ create } = require('ipfs-http-client');
const client = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});

const twitterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 

const TweetContainer = styled.div`
    width: 100%;
    ${tw`
        w-full
        max-w-screen-xl
        flex
        flex-col
        justify-between
        lg:pl-12 
        lg:pr-12
        pl-3
        pr-3
        pt-10
        items-center
    `};
`;

const Title = styled.h2`
    ${tw`
        text-5xl
        lg:text-4xl 
        text-white
        font-extrabold
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

const Form = styled.form`
  ${tw`
    w-full
    flex
    flex-col
    items-center
  `};
`;

const InputText = styled.input.attrs(props => ({
    type: "text",
  }))`
    border: 2px solid black;
    width: 370px;
    height: 40px;
    ${tw`
    
        text-2xl
        
        
    `};
`;

// const InputFile = styled.input.attrs(props => ({
//     type: "file",
//   }))`
//     border: 2px solid black;
//     width: 370px;
//     height: 40px;
//     ${tw`
//         bg-white
//         text-2xl       
//     `};
// `;

export function TweetCreatorUi(props) {

    async function requestAccount() {
        await window.ethereum.request({ method : 'eth_requestAccounts' });
    }

    // const [img, setImg] = useState(null); 

    // useEffect(() => {
    //     if (img != null) { 
    //         var fileReader = new window.FileReader();
    //         fileReader.readAsArrayBuffer(img);
    //         fileReader.onloadend = () => { 
    //             setBuffer(Buffer(fileReader.result))
    //         }
    //     }
    // }, [img]);

    // const [buffer, setBuffer] = useState([]);
    
    // useEffect(() => {
    //     if (buffer != null ) {
    //         async function fetchfile(){
    //             const file = await client.add(buffer)
    //             console.log( JSON.stringify(file));
    //             setImgLink(`https://ipfs.infura.io/ipfs/${file.path}`)
    //         }       
    //         fetchfile()
    //     }
    // }, [buffer]);
    
    // const[imgLink, setImgLink] = useState('');
    const [tweet, setTweet] = useState('')

    async function createTweet() {
        if( tweet === '' ) {console.log("Write Something") ;
            return} 
        const data = JSON.stringify({
            tweet
        })
        try {
            const file = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${file.path}`
            console.log(url);
            uploadTweet(url)
            
            
        } catch (error) {
            console.log("Error uploading file", error)
        }
    }

    async function uploadTweet(url) {

        if( typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            let contract = new ethers.Contract(twitterAddress, Twitters.abi, signer)
            const transaction = await contract.createTweet(url)
            await transaction.wait() 
        }
    }

        return(
            <TweetContainer>
                <Title> Create a tweet </Title>
                <Marginer direction="vertical" margin = "1em"/>        
                <Form>
                    <InputText size="0.2em" onChange={e => setTweet(e.target.value)}  placeholder="Write Something" /> 
                </Form>  
                <Marginer direction="vertical" margin="1em" />
                {<ButtonsContainer onClick={createTweet}>
                    <Button text="Publish" />
                </ButtonsContainer> }  
                <Marginer direction="vertical" margin="1em" />
            </TweetContainer>
        );
}


