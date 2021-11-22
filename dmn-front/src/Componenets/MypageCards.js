import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import {  Link } from "react-router-dom";

const ProfileCategoryStyle = styled.div`

width:80vw;
max-height:200vh;
.content{
    display: grid; 
    
        grid-template-columns: repeat(${props=>props.num},minmax(33%, auto));
    
    @media(max-width: 1050px){
        grid-template-columns: repeat(${props=>props.num},minmax(50%, auto));
    }
    /* repeat 숫자는 포스트 개수 % 2 */
    column-gap: 0.1%;
}
/* .border{
position: absolute;
width: 80vw;
height: 0px;
left: 130px;
top: 50vh;
border: 3px solid #9BBA74;
background-color: #9BBA74;
} */
`
const MypageCard = ({ content, categoryM }) => {
    const [postData, setpostData] = useState(content);

    useEffect(() => {
        //필터 설정하기. A는 모두 현재 사용자로 수정하기
        setpostData(content)
        if (categoryM==="ongoing"){
            setpostData(  
				content.filter((post) => {
                    return(!post.done
                    &&(post.members.some(
                        (member) =>
                            member.url === JSON.parse(localStorage.userNow).url
                    )
                    )
                    )}))
        }else if(categoryM==="past"){
            setpostData(  
				content.filter((post) => {
                    return(post.done
                    &&(post.members.some(
                        (member) =>
                            member.url === JSON.parse(localStorage.userNow).url
                    )
                    )
                    )}))
            
        }else if(categoryM==="author"){
            setpostData(
				content.filter((post) => (post.author.url===JSON.parse(localStorage.userNow).url)
			))

        }
    },[content, categoryM])
    const cards = postData && postData.map((post) => (
        <Link to={{ pathname: '/Detail', post1: post }} key={post.id}>
			<Card
				item={post.item}
				category={post.category}
				hot={post.limit === post.members.length + 1 ? true : false}
				img={post.image}
				num={post.members.length + '/' + post.limit}
			>
				{post.title}
			</Card>
		</Link>
    
)
)
    return (
        <ProfileCategoryStyle num={postData.length%2===0?postData.length/2:(postData.length+1)/2 }>
            <div className="content">
                {cards}
            </div>
        </ProfileCategoryStyle>
    )
}

export default MypageCard;