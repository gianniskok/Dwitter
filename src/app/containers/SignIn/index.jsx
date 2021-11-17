import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Button } from "../../components/button";
import { Marginer } from "../../components/marginer";
import { injected } from "../../components/wallet/connectors";
import { useWeb3React } from "@web3-react/core";
import { NavBar } from "../../components/navbarSignIn";
import { Link } from "react-router-dom";
import { Footer } from "../../components/footer";
import { ethers } from "ethers";
import Twitters from "../../../artifacts/contracts/Twitters.sol/Twitters.json";

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

const FormContainer = styled.div`
    ${tw`
        flex
        flex-col
        items-center
    `}
`
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
        mt-4
    `}
`;

const ButtonsContainer=styled.div`
    ${tw`
        flex   
        mt-4 
        flex-wrap
    `};
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

export function SignIn(props) {
    
    const {active, account,  activate } = useWeb3React();

    async function connect() {
        try {
            await activate(injected)
            
        } catch(ex) {
            console.log(ex)
        }
    }

    
    async function requestAccount() {
        await window.ethereum.request({ method : 'eth_requestAccounts' });
    }
    const[boolean, setBool] = useState(false);
    const[username, setUsername] = useState('');
    async function checkIfUser() {
        if(typeof window.ethereum !== "undefined"){
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
            const contract = new ethers.Contract(twitterAddress, Twitters.abi, provider);
            try{
                const data = await contract.isUser();
                setBool(data);
                console.log(data);
            }catch(error){
                console.log(error);
            }
        }
    }

    async function signUp(){
        if(typeof window.ethereum !== "undefined"){
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer =  provider.getSigner()
            const contract = new ethers.Contract(twitterAddress, Twitters.abi, signer);
            const tx = await contract.createUser(username);
            await tx.wait()
        }
    }
    return(
        <TopSectionContainer>
            <NavBar/>
            <Slogan>Welcome to Twitter!</Slogan>
            <Slogan>Sign In to proceed!</Slogan>
            <Marginer direction="vertical" margin="0.2em"/>
            <Description>
                Connect with your metamask wallet with just a single click!
            </Description>
            {!active ? 
                <ButtonsContainer onClick={() => connect()}> 
                    {<Button text="Connect metamask" />}
                </ButtonsContainer> : 
                <ButtonsContainer onClick={() => checkIfUser()}> 
                    {<Button text="Check address" />}
                </ButtonsContainer>}
            {!boolean ? 
                <FormContainer>
                    <Form>
                        <InputText size="0.2em" onChange={e => setUsername(e.target.value)}  placeholder="Set Username"/>
                    </Form>
                    <ButtonsContainer onClick={() => signUp()}> 
                        <Button text="Sign Up!" />                    
                    </ButtonsContainer>
                </FormContainer>
                    : 
                <Link to="/Home">
                    <ButtonsContainer> 
                        <Button text="Welcome Back!" />                    
                    </ButtonsContainer>
                </Link>
            }
                
            { active ? <Description > Connected with {account} </Description>  : <Description> Not connected </Description>} 
            <Footer /> 
        </TopSectionContainer>         
    )
}
