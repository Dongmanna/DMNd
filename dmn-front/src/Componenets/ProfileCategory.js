import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';

const ProfileCategoryStyle = styled.div`
width:80vw;
margin-left: 10vw;
max-height:200vh;

.post_container{
    display:flex;
    flex-wrap: wrap;
    width:100%;
}
.Im_in{
display: flex;
flex-wrap: wrap;
margin-top:30%;
margin-bottom:15%;
font-family: Poppins;
font-style: normal;
font-weight: bold;
font-size: 24px;
line-height: 24px;
}

.border{
position: absolute;
width: 1070px;
height: 0px;
left: 130px;
top: 423px;
border: 3px solid #9BBA74;
background-color: #9BBA74;
}
`
const SelectedStyle = styled.p`
        cursor:pointer;
        margin-left:3%;
        margin-right: 7%;
        color:${(props) => props.c === props.category ? "var(--grn-1)" : "black"};
        border-bottom:${(props) => props.c === props.category ? "var(--grn-1)" : "transparent"} solid 0.3rem;
        transition:.3s;
`
const ProfileCate = ({ content }) => {
    const [category, setcategory] = useState("");
    const [postData, setpostData] = useState(content);

    useEffect(() => {
        setpostData(content)
    }, [content]);

    useEffect(() => {
        if (category === '') return;
        setpostData(() =>
            content.filter((post) =>
                post.category.match(category)
            )
        );
    }, [category])

    return (
        <ProfileCategoryStyle>
            <div className="Im_in">
                <SelectedStyle category={category} c={""} onClick={() => setcategory("")}>전체</SelectedStyle>
                <SelectedStyle category={category} c={"참여중인 공동구매"} onClick={() => setcategory("ongoing")}>참여중인 공동구매</SelectedStyle>
                <SelectedStyle category={category} c={"참여했던 공동구매"} onClick={() => setcategory("past")}>참여했던 공동구매</SelectedStyle>
                <SelectedStyle category={category} c={"내가 쓴 게시글"} onClick={() => setcategory("author")}>내가 쓴 게시글</SelectedStyle>
            </div>
            <div className = "border">
            </div>
            {/*  onClick 완전 바꿔야 함
             */}
            <div className="post_container">
                {postData && postData.map((post) => (
                    <Card
                        key={post.id}
                        item={post.item}
                        category={post.category}
                        hot={(post.limit === post.participants.length + 1) ? true : false}
                        img={post.img}
                        num={post.participants.length + "/" + post.limit}
                    >
                        {post.title}
                    </Card>
                )
                )}
            </div>
        </ProfileCategoryStyle>
    )
}

export default ProfileCate;