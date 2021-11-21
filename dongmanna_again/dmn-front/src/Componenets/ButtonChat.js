import React from 'react'
import styled from 'styled-components'

export default function ButtonChat({children}) {
    const ButtonChatStyle=styled.button`
    width: 13rem;
    height: 3rem;
    border:none;
    background-color: #fff;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    font-size:1.2rem;
    :hover{
        border:solid var(--gray1) 0.01rem ;
    }
    :active{
        box-shadow: -0.8px 0.8px 4px 0 var(--gray1) ;
    }
    `
    return (
        <ButtonChatStyle>
            {children}
        </ButtonChatStyle>
    )
}
