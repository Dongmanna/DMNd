import React from 'react'
import styled from 'styled-components'
import temp_img from "../img/temp_image1.png"

const CardStyle=styled.div`
    text-decoration:none;

    width:20vw;
    @media(max-width:1040px){
        width:32vw;
    }
    @media(max-width: 500px){
        width: 38.5vw;
    }
    height:26rem;
    background-color:#fff;
    position:relative;
    color:black;
    .red-sign{
        background-color: var(--hred);
        border-radius:1px;
        width: 8.5rem;
        height: 3rem;
        color:#fff;
        font-weight:700;
        text-align: center;
        line-height:3rem;
        z-index:1;
        position:absolute;
        transform: translate(-0.9rem,-1rem);
        
    }
    .card{
        border-radius: .5rem;
        background-color:#f8f8f8;
        width:100%;
        height: 22rem;
        /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
        /* box-shadow: rgba(0, 0, 0, 0.15) 1px 1px 2.1px; */
        /* box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px; */
        position:relative;
        margin-top:1rem;
        display:flex;
        :hover{
            transition: .35s;
            transform: scale(1.05);
            cursor: pointer;
        }
    }
    .title{
        width: 100%;
        font-family: 'NIXGONM-Vb';
        position:absolute;
        top:21.5rem;
        font-family: NIXGONFONTS V2.0;
        font-size: 1.8rem;
        line-height: 2.4rem;
        line-break: break-all;
        overflow:hidden;
        text-overflow:ellipsis;
        display: block;
        max-height:4rem;
        /* display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
        margin-left:0.5rem; */
    }
    .container{
        font-family: 'NIXGONM-Vb';
        height:100%;
        width:40%;
        padding-left:1rem;
        display:flex;
        flex-direction: column;
        justify-content: space-evenly;
        @media(max-width:500px){
            padding-left:0.2vw;
}
    }
    img{
        margin:auto 0;
        width: 60%;
        height: 100%;
        border-radius:.1rem;
        background-color: #fff;
        object-fit: cover;

    }
    .category{
        border-radius:40000000px;
        background-color: #fff;
        text-align: center;
        position:absolute;
        right:0.8rem;
        bottom:-1.2rem;
        height:5rem;
        width:5rem;
        line-height:1rem;
        font-weight:600;
        opacity: 0.15;
    }
.itembox{
    display:flex;
    align-items: center;
    .itemtext {
        width:8rem;
        font-family: NIXGONFONTS V2.0;
        font-size: 1.6rem;
        line-height: 1.7rem;
        line-break: break-all;
        overflow:hidden;
        text-overflow:ellipsis;
        display: block;
        max-height:4rem;
        /* display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        /* -webkit-box-orient: vertical;*/
        margin-left: 1rem; 
        @media(max-width: 500px){
            width:15vw;
            font-size: 0.3vw;
            margin-left:0;
            justify-items: center;
    }
    }
    .item {
        width:3rem;
        font-family: NIXGONFONTS V2.0;
        font-size: .9rem;
        line-height: 1.6rem;
        overflow:hidden;
        text-overflow:ellipsis;
        /* display: block;
        max-height:4rem; */
        @media(max-width: 500px){
            left:0;
        width: 9vw;
        font-size: 0.3vw;
    }
        
    }
}
`
export default function Card({children, hot, img, item, num, category} ) {
    return (
        <CardStyle>
            {hot?<div className="red-sign">????????????</div>:"" }
            <div className="card">
                <img src={img?img:temp_img} alt="??????" /> 

                <div className="container">
                    <div className="itembox">
                        <span className="item">??????</span> <span className="itemtext">{item}</span>
                    </div>
                    <div className="itembox">
                        <span className="item">??????</span> <span className="itemtext">{num}</span>
                    </div>                    <div className="category">{category==="Offline"?"????????????": category==="Online"?"?????????":"??????"}</div>
                </div>

            </div>
            <p className="title">{children}</p>
        </CardStyle>
    )
}
