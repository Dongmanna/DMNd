import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Card from './Card.js';
import { withRouter } from "react-router";


const MainCategoryStyle = styled.div`

width:70vw;
margin:0 15vw;
max-height:200vh;
.phrase{
    font-size:3rem;
    margin-bottom:4rem;
    font-weight:600;
    font-family: 'Poppins';
}
.card-container{
    /* display:flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width:100%; */
    display: grid; 
    
    
        grid-template-columns: repeat(3,minmax(33%, auto));

    @media(max-width: 1040px){
        grid-template-columns: repeat(2,minmax(50%, auto));
    }

    column-gap: 0.3%;
    row-gap: 1.5%;
}
.categories{
    padding-left:1rem;
    display:flex;
    border-bottom: solid var(--grn-1) 0.3rem;
    margin-bottom:4rem;
}
a{
    text-decoration:none
}
`
const SelectorStyle = styled.p`
        font-family: 'Poppins';
        font-size:2.4rem;
        font-weight:600;
        margin:0;
        margin-bottom: 2rem;
        margin-right:4rem;
        cursor:pointer;
        color:${(props) => props.c === props.category ? "var(--grn-1)" : "black"};
        border-bottom:${(props) => props.c === props.category ? "var(--grn-1)" : "transparent"} solid 0.3rem;
        transition:.3s;
`


function MainCategory({ phrase, content }) {
    const [category, setcategory] = useState("");
    const [contentData, setContentData] = useState(content);
    useEffect(() => {
        setContentData(content)
    },[content]);


    useEffect(() => {
        setContentData(() =>
            content.filter((post) =>
                post.category.match(category)
            )
        );
    },[content, category]);
    contentData.reverse()
    const cards = contentData.map((post) => (
		<Link to={{ pathname: '/detail', postid: post.id }} key={post.id}>
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
	));
    return (
        <MainCategoryStyle>
            <div className="phrase">{phrase}</div>
            <div className="categories">
                <SelectorStyle category={category} c={""} onClick={() => setcategory("")}>전체</SelectorStyle>
                <SelectorStyle category={category} c={"Offline"} onClick={() => setcategory("Offline")}>오프라인</SelectorStyle>
                <SelectorStyle category={category} c={"Online"} onClick={() => setcategory("Online")}>온라인</SelectorStyle>
                <SelectorStyle category={category} c={"Delivery"} onClick={() => setcategory("Delivery")}>배달</SelectorStyle>
            </div>
            <div className="card-container">
                {cards}
            </div>
        </MainCategoryStyle >
    )
}
export default withRouter(MainCategory)