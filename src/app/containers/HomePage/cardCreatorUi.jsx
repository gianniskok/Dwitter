import React from "react";
import styled from "styled-components";
import { Marginer } from "../../components/marginer";
import tw from "twin.macro";
import { useState, useEffect } from 'react';
import { ethers} from 'ethers';
import { Button } from "../../components/button";
import CardMarketPlace from "../../../artifacts/contracts/CardMarketPlace.sol/CardMarketPlace.json";
import NFT from "../../../artifacts/contracts/NFT.sol/NFT.json";


const{ create } = require('ipfs-http-client');
const client = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});

const createMarketPlaceAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 
const nftAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

const CardCreatorContainer = styled.div`
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

const StepDescription = styled.p`
    ${tw`
        text-base
        md:text-base
        text-center
        w-10/12 
        text-gray-200
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


const Input = styled.input.attrs(props => ({
    type: "number",
  }))`
    border: 2px solid black;
    width: 370px;
    height: 40px;
    ${tw`
        text-2xl 
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

const InputFile = styled.input.attrs(props => ({
    type: "file",
  }))`
    border: 2px solid black;
    width: 370px;
    height: 40px;
    ${tw`
        bg-white
        text-2xl       
    `};
`;

export function CardCreatorUi(props) {

    async function requestAccount() {
        await window.ethereum.request({ method : 'eth_requestAccounts' });
    }

    const [price, setPrice] = useState('');
    const [img, setImg] = useState(null); 

    useEffect(() => {
        if (img != null) { 
            var fileReader = new window.FileReader();
            fileReader.readAsArrayBuffer(img);
            fileReader.onloadend = () => { 
                setBuffer(Buffer(fileReader.result))
            }
        }
    }, [img]);

    const [buffer, setBuffer] = useState([]);
    
    useEffect(() => {
        if (buffer != null ) {
            async function fetchfile(){
                const file = await client.add(buffer)
                console.log( JSON.stringify(file));
                setImgLink(`https://ipfs.infura.io/ipfs/${file.path}`)
            }       
            fetchfile()
        }
    }, [buffer]);
    
    const[imgLink, setImgLink] = useState('');
    const [formInput, updateFormInput] = useState({name: '', totalSupply: ''});
    const [cardType, setCardType] = useState('')
    const [stars, setStars] = useState('')
    async function createCard() {
        const { name, totalSupply} = formInput
        if( price === '' && imgLink === '' && name === '' ) {console.log("Put valid price") ;
            return} 
        const data = JSON.stringify({
            name,  image: imgLink, totalSupply
        })
        try {
            const file = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${file.path}`
            console.log(url);
            createSale(url, totalSupply)
            
            
        } catch (error) {
            console.log("Error uploading file", error)
        }
    }

    async function createSale(url, totalSupply) {

        if( typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            let nftcontract = new ethers.Contract(nftAddress, NFT.abi, signer)
            for(let i=0; i<totalSupply; i++){
                let transaction = await nftcontract.createToken(url)
                let tx = await transaction.wait()
                let event = tx.events[0]
                let value = event.args[2]
                let tokenId = value.toNumber()
                console.log(event, value, tokenId)
                const valueEthers = ethers.utils.parseUnits(price, 'ether')

                let marketcontract = new ethers.Contract(createMarketPlaceAddress, CardMarketPlace.abi, signer)
                let listingPrice = await marketcontract.getListingPrice()
                listingPrice = listingPrice.toString()
                transaction = await marketcontract.createMarketItem(nftAddress, tokenId, valueEthers, stars, cardType, {value: listingPrice})
                await transaction.wait()
            }  
        }
    }

    async function getContractBalance() {
        if(typeof window.ethereum !== 'undefined'){
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            let contract = new ethers.Contract(createMarketPlaceAddress, CardMarketPlace.abi, provider);
            try {
                let data = await contract.contractBalance()
                console.log(data.toString());
            }catch(error){
                console.log("Error: " , error)
            }
            
        }
    }

    async function getContractOwner() {
        if(typeof window.ethereum !== 'undefined'){
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            let contract = new ethers.Contract(createMarketPlaceAddress, CardMarketPlace.abi, provider);
            try {
                let data = await contract.contractOwner()
                setOwner(data.toString());
            }catch(error){
                console.log("Error: " , error)
            }
            
        }
    }
    const[address, setAddress] = useState('')

    async function getSigner() {
        if(typeof window.ethereum !== 'undefined'){
            await requestAccount()
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            var signer = provider.getSigner();
            setAddress((await signer.getAddress()).toString());
        }     
    }

    const[owner, setOwner] = useState('')

    useEffect(() => {
        getContractOwner()
        getSigner()      
    })


    if(address === owner){
        return(
            <CardCreatorContainer>
                <Title> Mint a new card </Title>
                <Marginer direction="vertical" margin = "1em"/>        
                <Form>
                    <StepDescription>
                        Declare the price of the card in ETH!
                    </StepDescription>
                    <Input size="0.2em" onChange={e => setPrice(e.target.value)} placeholder="Price of NFT" />
                    <Marginer direction="vertical" margin="1em" />
                    <StepDescription>
                        Upload the card's image!
                    </StepDescription>
                    <InputFile size="0.2em" onChange={e => setImg(e.target.files[0])}  placeholder="Upload Image" />   
                    <StepDescription>
                        Upload the card's Name!
                    </StepDescription>
                    <InputText size="0.2em" onChange={e => updateFormInput({...formInput, name: e.target.value})}  placeholder="Upload Nft's Name" /> 
                    <StepDescription>
                        Upload the card's Stars!
                    </StepDescription>
                    <InputText size="0.2em" onChange={e => setStars(e.target.value)}  placeholder="Upload Nft's Stars" />      
                    <StepDescription>
                        Upload the card's Type. For Monster type 0 , For Spell type 1, For Trap type 2, For Special type 3!
                    </StepDescription>
                    <Input size="0.2em" onChange={e => setCardType(e.target.value)}  placeholder="Upload Card's Type" />
                    <StepDescription>
                        Upload the card's Total Supply **WARNING IT CAN'T BE CHANGED LATER **!
                    </StepDescription>
                    <InputText size="0.2em" onChange={e => updateFormInput({...formInput, totalSupply: e.target.value})}  placeholder="Upload Nft's Total Supply" /> 
                </Form>  
                <Marginer direction="vertical" margin="1em" />
                {imgLink!=='' && <ButtonsContainer onClick={createCard}>
                    <Button text="Mint Card" />
                </ButtonsContainer> }  
                <Marginer direction="vertical" margin="1em" />
                <ButtonsContainer onClick={getContractBalance}>
                    <Button text="Balance Test" />
                </ButtonsContainer>
            </CardCreatorContainer>
        );
    }else return <CardCreatorContainer />
}


