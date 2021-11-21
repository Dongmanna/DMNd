import React from 'react';
import styled from 'styled-components';

const ProfileCategoryStyle = styled.div`
width:100%;
/* width:80vw; */
margin-left: 10vw;
max-height:200vh;

.Im_in{
width: 82%;
display: flex;
flex-wrap: nowrap;
margin-top:26vw;
font-family: Poppins;
font-style: normal;
font-weight: bold;
font-size: 1.9vw;
border-bottom: solid var(--grn-1) 0.3rem;
margin-bottom:2rem;

}
`
const SelectedStyle = styled.p`
font-size:2rem;
        cursor:pointer;
        margin-left:3%;
        margin-right: 7%;
        color:${(props) => props.c === props.category ? "var(--grn-1)" : "black"};
        border-bottom:${(props) => props.c === props.category ? "var(--grn-1)" : "transparent"} solid 0.3rem;
        transition:.3s;
`
const MypageCate= ({ categoryM, setcategoryM}) => {
    return (
        <ProfileCategoryStyle>
            <>
            <div className="Im_in">
                <SelectedStyle category={categoryM} c={"ongoing"} onClick={() => setcategoryM("ongoing")}>참여중인 공동구매</SelectedStyle>
                <SelectedStyle category={categoryM} c={"past"} onClick={() => setcategoryM("past")}>참여했던 공동구매</SelectedStyle>
                <SelectedStyle category={categoryM} c={"author"} onClick={() => setcategoryM("author")}>내가 쓴 게시글</SelectedStyle>
            </div>
            <div className="border"></div>
            </>
        </ProfileCategoryStyle>
    )
}
export default MypageCate;