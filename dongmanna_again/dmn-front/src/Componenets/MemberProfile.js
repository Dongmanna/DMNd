import React from 'react'
import styled from 'styled-components'
import avatar from "../img/avatar-pl.png"

const MemberProfileStyle=styled.div`
    width:13vw;
    min-width:20rem;
    img{
        overflow: hidden;
        width: 5rem;
        height: 5rem;
        border-radius: 40px;
        background-color:#f2f2f2;
    }
    .name{
        margin-top:.8rem;
        font-size:1.5rem;
    }
    .author-tag{
        width:5rem;
        font-size:.7rem;
        height:1.5rem;
        line-height: 1.5rem;
        text-align: center;
        margin-left:2rem;
        background-color: #f2f2f2;
        display: inline-block;
    }
    .defaultimg{
        overflow: hidden;
        width: 5rem;
        height: 5rem;
        border-radius: 40px;
        background-color:gray;
    }
    
`

export default function MemberProfile({author,nickname,img}) {
    return (
        <MemberProfileStyle>
            <img src={avatar} alt="프로필" />
            <div className="name">
                {nickname} 
                {author===true ?<div className="author-tag">작성자</div>:<div></div>}
            </div>
            

            
        </MemberProfileStyle>
    )
}
