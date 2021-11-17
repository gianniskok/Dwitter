import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Marginer } from "../../components/marginer";
import { NavBarHomePage } from "../../components/navbarHomepage";
import { AboutUs } from "./aboutUs";
import { Services } from "../../containers/HomePage/services";
import { Footer } from "../../components/footer";
import { CardCreatorUi } from "../../containers/HomePage/cardCreatorUi";



const PageContainer = styled.div `
    min-height:800px;
    ${tw`
        bg-black
        flex
        flex-col
        w-full
        h-full
        items-center
        overflow-x-hidden
    `}
`;


  
export function HomePage(props) {
    return (   
            <PageContainer>
                <NavBarHomePage />
                <Marginer direction="vertical" margin="1em" />
                <AboutUs />
                <Marginer direction="vertical" margin="4em" />
                <Services />
                <Marginer direction="vertical" margin="1em" />
                <CardCreatorUi />
                <Marginer direction="vertical" margin="1em" />
                <Footer />
            </PageContainer>
    );
}