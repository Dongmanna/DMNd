import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MypageCate from "../Componenets/MypageCate";
import MypageCard from "../Componenets/MypageCards";
import axios from "axios";

const MypageStyle = styled.div`
width:100%;
.profileimg{
    position: absolute;
    width:13vw;
    height:13vw;
    left:18vw;
    top:13vw;
    background: #F3F3F3;
    border: 1px solid #C4C4C4;
    box-sizing: border-box;
    border-radius: 4999px;
}
.profileinfo{
    font-family: 'Roboto';
    font-size:1.8rem;
}

.nickname{
    position:absolute;
    width: 19.5rem;
    height:5vh;
    left: 31.5vw;
    top:15vw;
}
.loc{
    position:absolute;
    width: 19.5rem;
    height:5vh;
    left: 31.5vw;
    top:18.5vw;
}
.count{
    position:absolute;
    width: 19.5rem;
    height:5vh,;
    left: 31.5vw;
    top:22vw;
}
.contain{
    position:absolute;
    left:12.8vw;
    width: 77.5vw;
    
            height: 41vw;
   
        @media(max-width: 1040px){
            height: 80vw;
    }
    overflow: hidden;
.cards{
        
            transform: translate(${(props) => props.num * -79}vw, 0);
                        transition: 1s;
   
        @media(max-width: 1040px){
            transform: translate(${(props) => props.num * -79.5}vw, 0);
                            transition: 1s;
    }
        }
}
.arrow{
    
            top: 56vw;
    
        @media(max-width: 1040px){
            top: 70vw;
    }
}
.rarrow{
    position: absolute;
    width: 5vw;
    right: 0.2vw;
    border-top: 5rem solid transparent;
    border-left: 5rem solid #9BBA74;
    border-bottom: 5rem solid transparent;
    :hover{
        cursor:pointer;
    }
}
.larrow{
    position: absolute;
    width: 5vw;
    left: 4vw;
    border-top: 5rem solid transparent;
    border-right: 5rem solid #9BBA74;
    border-bottom: 5rem solid transparent;
    :hover{
        cursor:pointer;
    }
}

`

const MyPage = () => {
    const [carouselNum, setcarouselNum] = useState(0);
    const [categoryM, setcategoryM] = useState("ongoing");
    const [Content, setContent] = useState([])

    console.log(categoryM)
    async function getContent(){
        try{
            const response = await axios.get( "http://127.0.0.1:8000/api/posts/");            
            await setContent(response.data);
        }catch(error){
            console.error(error)

        }
    };

    useEffect(() => {
        getContent();
    },[])
    const userNow = JSON.parse(localStorage.userNow)
    return (
        <MypageStyle num={carouselNum}>
            {/* <SearchHeader /> */}
            <br></br>
            <div className="profileinfo">
                <div className="profileimg"></div>
                <div className="infos">
                    <div className="nickname">{userNow.nickname}</div>                    {/* 닉네임, 주소 추가 - 현 사용자 정보 받아오기 구현 필 */}

                    <div className="loc">{userNow.address}</div>
                </div>
            </div>
            <div className="arrow larrow"
                onClick={() => {
                    carouselNum > 0 ? setcarouselNum(carouselNum - 1) :
                        setcarouselNum(carouselNum);
                }}></div>
            <div className="arrow rarrow"
                onClick={() => {
                    carouselNum < 10 ? setcarouselNum(carouselNum + 1)
                        : setcarouselNum(carouselNum);
                }}></div>
            <MypageCate categoryM={categoryM} setcategoryM={setcategoryM}/>
            <div className="contain">
                <div className="cards">
                    <MypageCard content={Content} categoryM={categoryM} />
                </div>
            </div>
            
        </MypageStyle>
    )
}

export default MyPage;