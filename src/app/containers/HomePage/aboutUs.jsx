import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const AboutUsContainer = styled.div`
${tw`
    w-full
    flex
    items-center
    max-w-screen-xl
    xl:justify-center
    pt-4 
    pr-7 
    pl-7 
    md:pl-0 
    md:pr-0 
    
`};
`;

const InfoContainer = styled.div`
    ${tw`
        
        w-full
        flex
        items-center
        justify-between
        flex-col
        pl-16
    `};
`;

const Title = styled.h1`
    ${tw`
        
        text-white
        text-2xl 
        md:text-5xl 
        font-extrabold
        md:font-black
        md:leading-normal      
    `};
`;

const InfoText = styled.p`
    ${tw`
        
        max-w-2xl 
        text-sm
        text-gray-200
        md:text-base
        font-normal
        mt-4
    `};
`;

export function AboutUs(props) {
    return (
    <AboutUsContainer>
        <InfoContainer>
            <Title>Mint a new Yu-Gi-Oh NFT now!</Title>
            <InfoText>
               Mint new Yu-Gi-Oh NFT's easily with our new defi app! 
            </InfoText>
            <InfoText>
                Mint, Buy, Sell , Repeat!
            </InfoText>
        </InfoContainer>
    </AboutUsContainer>
    );
}