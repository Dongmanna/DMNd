import React, { useEffect, useState } from "react";
// import { HashRouter as Router, Link } from "react-router-dom";
import { withRouter } from "react-router";
import styled from "styled-components";
import MainCategory from "../Componenets/MainCategory";
import SearchBarResult from "../Componenets/SearchBarResult";
import axios from 'axios';



const ResultStyle=styled.div`

.search-box{
    width:80vw;
    margin:0 10vw;
    margin-top:15rem;
    margin-bottom: 10rem;
}
`
const Result = ({location}) => {
    const word = location.word; 
    const [searchText, setsearchText] = useState(word); 
    const [resultData,setResultData]=useState([]);

    //백이랑 연결하는 부분
    //url에서 정보 받아오기
    async function getContent(){
        try{
            const response = await axios.get("http://127.0.0.1:8000/api/posts/");
            setResultData(()=> response.data.filter((post) => post.title.match(searchText)));

        }catch(error){
            console.error(error)

        }
    };

    useEffect(()=>{
        getContent();
    },[searchText]);
    return (
        <ResultStyle>
            {/* <Header /> */}
            <div className="search-box">
                <SearchBarResult searchText={searchText} setSearchText={setsearchText}/>
            </div>
            <MainCategory phrase={ searchText? '"'+searchText  +'"에 대한 검색 결과입니다.':"검색어를 입력해주세요."} content={resultData}/>
            {resultData?"":"<p>검색 결과가 없어요 ㅠ</p>"}
        </ResultStyle>
    )
}

export default withRouter(Result);