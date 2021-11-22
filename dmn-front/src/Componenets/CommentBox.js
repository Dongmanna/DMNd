import React from 'react'
import styled from 'styled-components'
import avatar from "../img/avatar-pl.png"

const CommentBoxStyle=styled.div`
    width:65%;
    min-height:4vw;
    border-bottom:.2rem solid var(--grn-1);
    display: flex;
    align-items: center;
    margin: 2rem 0;
    img{
        width:3vw;
        height:3vw;
        border-radius:40px;
    }
    .text{
        padding:1rem;
        font-size:1.5rem;
        line-height:2rem;
        margin-left:2rem;
    }
`

export default function CommentBox( {nickname, image, children}) {
    return (
        <CommentBoxStyle>
            <img src={image?image:avatar} alt="" />
            <div className="text">
                <div>{nickname}</div> 
                {children}
            </div>
        </CommentBoxStyle>
    )
}
