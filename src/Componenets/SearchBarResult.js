import React, { useState } from 'react'
import styled from 'styled-components'
import searchIconBlack from '../img/searchIconBlack.svg'
const SearchBarResultStyle=styled.div`
width:80vw;
display:flex;
align-items: center;
form{
    width:100%;
}
    input{
        margin-left:2rem;
        width: 65%;
        height: 8rem;
        border:solid 2px;
        border-radius: 3px;
        background-color: transparent;
        font-size: 2rem;
        padding-left:4rem;
        ::placeholder{
            color:var(--gray1);
        }
        :hover{
            background-color: #f2f2f2;
        }
        :focus{
            outline-width:0;
            background-color: white;
        }

        :focus::placeholder{
            color: transparent!important;
        }
        
    }
    img{
        margin-bottom:0.5rem;
        width:3rem;
    }
    button{
        font-weight: bold;
        font-size: 1.6rem;
        width:13%;
        max-width:15rem;
        height:4.5vw;
        background-color: #fff;
        border:solid 0.2rem;
        box-shadow: 0.8px -0.8px 4px 0 var(--gray1) ;
        margin-left:4rem;
        text-align: center;
        padding-right:0.8rem;
        min-width:6rem;
        @media(max-width: 800px){
        width: 15%;
        height: 5vw;
    }

        :active{
        box-shadow: -1px 1px 4px 0 var(--gray1) ;
    }
    :hover{
            background-color: #f2f2f2;
        }
        }
    `
export default function SearchBarResult({searchText, setSearchText}) {
    const [inputText, setInputText] = useState("")
    
    //데이터 결과창에 넘겨줄 때 searchtext사용

    const handleSearch = (e) => {
        e.preventDefault();
        setInputText(e.target.value);
    }
    const onclick= ()=>{
        setSearchText(inputText)
    }
    return (
        <SearchBarResultStyle>
            <img src={searchIconBlack}alt="검색" />
            <form >
            <input type="text" placeholder="검색어를 입력해주세요" value={inputText} onChange={handleSearch}/>
            <button type="submit" onClick={onclick}>검색</button>
            </form>
        </SearchBarResultStyle>
    )
}
