import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Logo } from "../logo";

const NavBarContainer = styled.div `
    min-height:68px;
    ${tw`
        w-full
        max-w-screen-xl
        flex
        flex-row
        justify-between
        bg-black

    `}
`;

const LogoContainer = styled.div`
    ${tw`
        w-full
        flex
        flex-row
        justify-between
        items-center
        mb-5
        pl-5
    `};
`;
export function NavBar(props) {
   return (
        <NavBarContainer>
            <LogoContainer>
                <Logo/>
            </LogoContainer>
        </NavBarContainer>
   );
}