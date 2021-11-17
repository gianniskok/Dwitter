import React from "react";
import styled from "styled-components";
import tw from "twin.macro";



const BaseButton = styled.button `
    ${tw`
        pl-5
        pr-5 
        pt-4 
        pb-4 
        outline-none
        rounded-md
        text-black
        text-base
        font-semibold
        border-transparent
        border-2
        border-solid
        focus:outline-none
        transition-all
        duration-200 
        ease-in-out
        m-1 
        
    `};
`;

const BaseButton2 = styled.button `
    ${tw`
        pl-5
        pr-5 
        pt-4 
        pb-4 
        outline-none
        rounded-md
        text-white
        text-base
        font-semibold
        border-transparent
        border-2
        border-solid
        focus:outline-none
        transition-all
        duration-200 
        ease-in-out
        m-1 
        
    `};
`;

const OutlinedButton = styled(BaseButton)`
    ${tw`
        bg-white
        hover:bg-transparent
        hover:text-white
        hover:border-black 
    `};
`;

const OutlinedButtonBlack = styled(BaseButton2)`
    ${tw`
        bg-black
        hover:bg-transparent
        hover:text-black
        hover:border-black 
    `};
`;

export function Button(props) {

    const {text} = props;
    return <OutlinedButton>{ text }</OutlinedButton>;
    
}

export function NewButton(props) {
    const {text} = props;
    return <OutlinedButtonBlack>{ text }</OutlinedButtonBlack>;
}