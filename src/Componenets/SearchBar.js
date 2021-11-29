import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import searchIcon from '../img/searchIcon.svg'
import { withRouter } from "react-router";


const SearchBarStyle = styled.form`
    border: solid var(--grn-1,green) .6rem;
    border-radius:4rem;
    width:45vw;
    height:10rem;
    display:flex;
    align-items:center;
    padding:0 3%;
    padding-right: 2%;

    input{
        width:90%;
        height:9rem;
        background-color: transparent;
        font-size: 2.5vw;
        border:none;
      ::placeholder{
            color:var(--gray1);
        }

        :focus{
            outline-width:0;
        }

        :focus::placeholder{
            color: transparent!important;
        }
        
    }

    .after{
            height:4rem;
            border-right:solid var(--grn-1) 0.3rem;
            margin-right:1.5rem;
        }
    
    button{
        max-width:5vw;
        img{
            width:100%;
        }
        background-color:transparent;
        border:none;
        cursor:pointer;
        padding:0;
        :active{

        }
    }
    
    ${(props) =>
    props.size==="S" &&`          
    border: solid var(--grn-1,green) 3px;
    width:30rem;
    max-width:20vw;
    height:4.3rem;
    margin-top:2vh;
    padding-right:5%;
    pointer-events:none;
    .after{
            height:1.7rem;
            border-right:solid var(--grn-1) 2px;
            margin-right:.5rem;
        }

    input{
        width:90%;
        height:1.7rem;
        background-color: transparent;
        font-size: 1.2rem;
        border:none;
        }
    
        button{
        width:2rem;
        img{
            width:100%;
        }
        background-color:transparent;
        border:none;
        cursor:pointer;
        padding:0;
        :active{

        }

    `}

`


function SearchBar({size, onclick, }) {

    //데이터 결과창에 넘겨줄 때 searchtext사용
    const [searchText, setsearchText] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
        setsearchText(e.target.value);
    }
    

    return (
		<SearchBarStyle size={size}>
			<input
				type="text"
				placeholder="검색어를 입력해주세요"
				value={searchText}
				onChange={handleSearch}
			/>
			<div className="after"></div>
			{size === 'S' ? (
				<button type="submit" onClick={onclick}>
					<img src={searchIcon} alt="검색" />
				</button>
			) : (
				<Link to={{ pathname: '/Result', word: searchText }}>
					<button type="submit" onClick={onclick}>
						<img src={searchIcon} alt="검색" />
					</button>
				</Link>
			)}
		</SearchBarStyle>
	);
};

export default withRouter(SearchBar);