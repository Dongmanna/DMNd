import React from 'react'
import styled from 'styled-components'

const ButtonGreenAStyle = styled.button`
    position:relative;
    margin-right:2%;
    p{
        z-index:3;
        color:white;
        font-size:2rem;
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

export default function ButtonGreenA({children, function1, function2, secondText, part, join,id}) {

    function joinfunc(){
        join(id);
        function1(true);
    }
    return (
        // <ButtonGreenAStyle phase={phase}      onClick={phase===1?()=>{setPhase(0);function1()}:()=>{function2} > 실제 사용시
        <ButtonGreenAStyle phase={part?0:1}      onClick={!part?joinfunc:""} > {/* 콜백으로 넘기기 */}
            <p>{!part?children:secondText}</p>

        </ButtonGreenAStyle>
    )
}