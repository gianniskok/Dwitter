import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Marginer } from "../../components/marginer";
import { NavBarHomePage } from "../../components/navbarHomepage";
import { AboutUs } from "./aboutUs";
import { Services } from "../../containers/HomePage/services";
import { Footer } from "../../components/footer";
import { TweetCreatorUi } from "./TweetCreator";



const PageContainer = styled.div `

    ${tw`
        bg-blue-400
        flex
        flex-col       
        items-center
        max-h-screen
        overflow-x-hidden
        justify-center
    `}
`;


  
export function HomePage(props) {
    return (   
            <PageContainer>
                <NavBarHomePage />
                <Marginer direction="vertical" margin="1em" />
                <AboutUs />
                <Marginer direction="vertical" margin="4em" />
                <TweetCreatorUi />
                <Marginer direction="vertical" margin="1em" />
                <Services />
                <Marginer direction="vertical" margin="1em" />               
                <Footer />
            </PageContainer>
    );
}