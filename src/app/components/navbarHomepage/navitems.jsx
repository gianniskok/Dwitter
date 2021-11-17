import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";

const ListContainer = styled.ul`
    ${tw`
        flex
        list-none
        pr-10

    `};
`;

const NavItem = styled.li`
    ${tw`
        flex
        items-start
        text-xs
        md:text-base
        text-white
        font-medium
        mr-1
        md:mr-5
        cursor-pointer
        transition
        duration-300
        ease-in-out
        hover:text-white
        pr-5
        pt-3
               
    `};

   

`;

export function NavItems (props) {

    return (
        <ListContainer>
            <Link to="/Home">
                <NavItem >
                    Home
                </NavItem>
            </Link>
            <Link to="/MyCollection">
                <NavItem >
                    My NFT's
                </NavItem>
            </Link>
            <Link to="/MySellings">
                <NavItem >
                    My Sellings
                </NavItem>
            </Link>
            <Link to="/Specials">
                <NavItem >
                    Specials
                </NavItem>
            </Link>
            <NavItem >
                Contact Us
            </NavItem>
        </ListContainer>
    );
}