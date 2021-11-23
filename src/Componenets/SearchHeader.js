import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import SearchBar from "./SearchBar";

const SearchHeaderStyle = styled.div`

position:relative;

   
`;

const SLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active{
        text-decoration:none;
    }
    color:inherit;
    position:absolute;
    right:calc(4vw + 30rem) ;
    top:0;
`;


const SearchHeader = () => {
    return (
        <SearchHeaderStyle>
            <Header/>
            <SLink to="/Result"><SearchBar size="S" /></SLink>

        </SearchHeaderStyle>
    );
};

export default SearchHeader;