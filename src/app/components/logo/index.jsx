import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

import HomeLogoImg from "../../../assets/images/index.jpg";

const LogoContainer = styled.div`
    ${tw`
        flex
        items-center
        ml-7
        mt-5
    `};
`;

const LogoText = styled.div`
    ${tw`
        text-base
        md:text-base
        font-bold
        text-white
        ml-7
    `};
`;

const Image = styled.div`
    width: auto;
    ${tw`h-6 md:h-10`};

    img {
        width: auto;
        height: 100%;
    }
`;

export function Logo(props) {
    return (
        <LogoContainer>
            <Image>
                <img src={HomeLogoImg}  alt=""/>
            </Image>
            <LogoText>Twitter</LogoText>
        </LogoContainer>
    )
}