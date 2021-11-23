import React, { useEffect, useState } from "react";
import MainCategory from "../Componenets/MainCategory";
import "../css/Home.css"
// import{ Content} from "../data";
import SearchBar from '../Componenets/SearchBar';
import styled from "styled-components";
import axios from 'axios';
import url from "../Url"

const HomeStyle = styled.main`
    .search-box{
        height:70vh;
        display:flex;
        justify-content: center;
        align-items: center;
        padding-bottom:20vh;
    }
`


// const Ani = () => {
//     return (
//         <>
//             <div className="Clouds">
//                 < div className="cloud cloud--one">
//                     <img src="https://cdn.pixabay.com/photo/2014/03/25/15/24/cloud-296722_1280.png" alt=""></img>
//                 </div>
//                 <div className="cloud cloud--two">
//                     <img src="https://cdn.pixabay.com/photo/2014/03/25/15/24/cloud-296722_1280.png" alt=""></img>
//                 </div>
//                 <div className="cloud cloud--three">
//                     <img src="https://cdn.pixabay.com/photo/2014/03/25/15/24/cloud-296722_1280.png" alt=""></img>
//                 </div>
//                 <div className="cloud cloud--four">
//                     <img src="https://cdn.pixabay.com/photo/2014/03/25/15/24/cloud-296722_1280.png" alt=""></img>
//                 </div>
//             </div>

//             <div className="slogan-box">
//                 <div className="slogan-wrap">
//                     <svg width="800" height="180" viewBox="0 0 620 220">
//                         <text x="0" y="20%">저</text>
//                         <text x="30" y="20%">렴</text>
//                         <text x="65" y="20%">한</text>
//                         <text x="140" y="50%">현</text>
//                         <text x="170" y="50%">명</text>
//                         <text x="205" y="50%">한</text>
//                         <text x="290" y="20%">낭</text>
//                         <text x="320" y="20%">비</text>
//                         <text x="350" y="20%">없</text>
//                         <text x="380" y="20%">는</text>
//                         <text x="460" y="30%">소</text>
//                         <text x="490" y="30%">비</text>
//                         <text x="520" y="30%">라</text>
//                         <text x="550" y="30%">이</text>
//                         <text x="580" y="30%">프</text>
//                     </svg>
//                 </div>
//             </div>
//         </>

//     )
// }

const Home = () => {
    const [Content, setContent] = useState([])
    //url에서 정보 받아오기
    async function getContent(){
        try{
            const response = await axios.get( url +"api/posts/");            
            await setContent(response.data);
        }catch(error){
            console.error(error)

        }
    };
    //로그인한 유저 정보 세션 스토리지에 저장
    
    useEffect(() => {
        getContent();
    }, [])
    // useEffect(() => {
    //     getUserNow()
    // }, [localStorage.getItem("user_token")])
    


    return (
        <HomeStyle>
            {/* <Header /> */}
            {/* {UserNow} */}
            <div>
                <div className="search-box">
                    {/* <Ani/> */}
                    <SearchBar />
                    
                </div>
                
                        <MainCategory phrase="이런 글은 어떠세요?" content={Content} />
                <div className="card-cate">
                    
                </div>
            </div>

        </HomeStyle>

    )
}

export default Home;