import React, { useState , useEffect} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { NavBar } from "../../components/navbarSignIn";
import { Footer } from "../../components/footer";
import { ethers } from "ethers";
import Twitters from "../../../artifacts/contracts/Twitters.sol/Twitters.json";
import { Link } from "react-router-dom";

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
        cursor-pointer
        
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

export function User(props) {
    
    
    const [users, setUsers] = useState([]);
    const [mapping2, setMapping2] = useState('not');

    useEffect(() => {
        loadUsers()
    })

    var user = [];

    async function loadUsers() {
        if(typeof window.ethereum !== 'undefined' ){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(twitterAddress, Twitters.abi, signer);
            const length = await contract.userLength();
            for(let i =1; i<=length; i++){
                const data = await contract.idToUser(i);
                user.push([data.userId.toNumber(), data.userName, data.userAd])
            }
            const usersL = await Promise.all(user.map(async i => {
                let userL = {
                    userId: i[0],
                    username: i[1],
                    userAd: i[2]
                }
                return userL;
                
            }))
            if(usersL.length > 0) { setMapping2('yes')}
            setUsers(usersL)
            console.log(users)
        }
    }

    if ( mapping2 === 'not') { return <TopSectionContainer>No tweets available</TopSectionContainer>}
    return(
        <TopSectionContainer>
            <NavBar/>
            <Slogan>Welcome to Twitter!</Slogan>
            <Description>
                All current users, click to visit their profile
            </Description>
            <ServicesWrapper>
                {users.map((user, i) => (
                    
                    <CardContainer key={i}>
                        <Link to={`/Profile/${user.userAd}`}>
                            <TopContainer>
                                <TitleContainer>
                                    <Title3>ID:{user.userId}</Title3>
                                    <Title3>Username:{user.username}</Title3>
                                </TitleContainer>
                            </TopContainer>
                            <ContentContainer>
                                <Title3>Address: {user.userAd}</Title3>
                            </ContentContainer>
                        </Link>
                    </CardContainer>
                ))
                }
            </ServicesWrapper>
            <Footer /> 
        </TopSectionContainer>         
    )
}
