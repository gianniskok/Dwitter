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



export function AboutUs(props) {
    return (
    <AboutUsContainer>
        <InfoContainer>
            <Title>Welcome to decentralized Twitter!</Title>
        </InfoContainer>
    </AboutUsContainer>
    );
}