import React from 'react'
import styled from 'styled-components'

const ButtonGreenAStyle = styled.button`
    position:relative;
    margin-right:2%;
    p{
        z-index:3;
        color:white;
        font-size:1.8rem;
        transition:1s;
    }
    &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${(props) => props.phase===1?0:20}rem;
    max-width:18vw;

    height: 6.4rem;
    background-color: var(--grn-2);
    transition:1.5s;
    z-index: -1;
    }
    &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: ${(props) => props.phase===1?20:0}rem;
    max-width:18vw;

    height: 6.4rem;
    background-color: var(--grn-1);
    transition:1.5s;
    z-index: -2;
    }

    width:20rem;
    max-width:18vw;

    height:6.4rem;
    
    border:none;
    cursor: pointer;
    z-index:1;
    :hover{
        box-shadow: 2px 2px 7px 0 var(--grn-2);
    }
    box-shadow: 0.4px -0.4px 4px 0 var(--grn-2);
    :active{
        box-shadow: -0.8px 0.8px 4px 0 var(--grn-2);
    }
    

    

`

export default function ButtonGreenA({children, function1, secondText, part, join,id, link}) {

    function joinfunc(){
        join(id);
        function1(true);
    }
    return (
        <>
        {part?
            <a href = {link} target="_blank" rel="noopener noreferrer"><ButtonGreenAStyle phase={part?0:1}      onClick={!part?joinfunc:"location.href=link"} > {/* 콜백으로 넘기기 */}
        <p>{secondText}</p>

    </ButtonGreenAStyle></a>
    :
    <ButtonGreenAStyle phase={part?0:1}      onClick={!part?joinfunc:"location.href=link"} > {/* 콜백으로 넘기기 */}
        <p>{children}</p>

    </ButtonGreenAStyle>
}</>
        
    )
}