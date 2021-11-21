import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchHeader from "../Componenets/SearchHeader";
import styled from "styled-components";
import ButtonGreen from "../Componenets/ButtonGreen";
import Input from "../Componenets/Input"
import axios from "axios";
import { withRouter } from 'react-router';

const EditStyle = styled.div`
	font-family: 'NIXGONM-Vb';
	width: 100%;
	.body{
		width:74vw;
		margin:0 13vw;
		margin-bottom:10rem;
		padding-top:5vh;

	}
	.top {
		display: flex;
		height: 35vh;
		width: 100%;
		margin-bottom:2%;
	}
	.category {
		width: 20rem;
		height: 3rem;
		border: var(--grn-1) 0.2rem solid;
		border-radius: 8px;
		padding-left: 1rem;
		margin-bottom: 2rem;
		:hover{
			background-color: #f2f2f2;
		
		}
		:focus{
			background-color: white;
			outline-width: 0;
		}
	}
	.title {
		width: 100%;
		height: 3rem;
		font-size: 2rem;
		border: none;
		border-bottom: solid 0.2rem var(--grn-1);
		margin-bottom: 2rem;
		padding-left: 1.5rem;

		:focus {
			outline-width: 0;
		}
		::placeholder{
			color:black;
        }

	}
	.container {
		display: flex;
		height: 60%;
	}
	.inputs {
		width: 60%; //여기서 넓이
	}
	.con {
		width: 40%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	.imgbox {
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		img {
		height: 100%;
		width:35vmin;
		height:35vmin;
		}
		.default-img{
		font-size:1.6rem;
		padding: 0 4rem;
		padding-top: calc(17vmin - 2rem);
		text-align:center;
		/* max-width:calc(35vh - 3rem);
		height:35vh;
		max-height:40vw; */
		width:35vmin;
		height:35vmin;
		
		background-color: #f2f2f2;
		/* z-index:-1; */
		
		}
	}
	
	.imgbtn {
		width:6rem;
		height: 1.8rem;
		
		text-align: center;
		border: 1px solid #b9b9b9;
		border-radius: 5px;
		font-size: 1.4rem;
		background-color: #fff;
		color: #b9b9b9;
		:hover {
			box-shadow: 1px 1px 7px;
		}
		box-shadow: 0.4px -0.4px 4px;
		:active {
			box-shadow: -0.6px 0.6px 4px;
		}
	}
	.imgsub {
		position:absolute;
		opacity: 0;
	}
	textarea {
		width: 100%;
		height: 35vh;
		border: none;
		box-shadow: 0 0  1px;
		border-top: solid var(--grn-1) 0.3rem;
		padding: 2rem;
		font-size: 1.5rem;
		overflow: scroll;
		resize:none;
		:focus {
			outline-width: 0.1rem ;
			outline-color: var(--grn-1);
		}
		:focus::placeholder {
			color: transparent !important;
		}
		margin-bottom: 2rem;
		::-webkit-scrollbar{
			opacity:0;
		}
		::-webkit-scrollbar-thumb{
			opacity:0.3;
			border-right:solid 4px var(--grn-2);
			border-radius: 3px;
			width:2px;
			
		}
		::-webkit-scrollbar-corner{
			opacity: 0;
			background-color: transparent;
		}
		


	}
	
	.btn {
		position: absolute;
		right: 14vw;
	}
`;
const Edit = ({location}) => {
	const [Category, setCategory] = useState("Offline")
	const [Region, setRegion] = useState("")
	const [Item, setItem] = useState("")
	const [Limit, setLimit] = useState("")
	const [LinkA, setLinkA] = useState("")
	const [Price, setPrice] = useState("")
	const [Deadline, setDeadline] = useState(null)
	const [Body, setBody] = useState("")
	const [Image, setImage] = useState("")
	const [Title, setTitle] = useState("")
	const handleBody = (e)=> {
		e.preventDefault();
		setBody(e.target.value);
	};
	const handleTitle = (e)=> {
		e.preventDefault();
		setTitle(e.target.value);
	};
	const handleSelect = (e)=>{
		setCategory(e.target.selectedIndex===0?"Offline":e.target.selectedIndex===1?"Online":"Delivery");
	};
	axios.defaults.xsrfCookieName = 'csrftoken';
	axios.defaults.xsrfHeaderName = 'X-CSRFToken';
	axios.defaults.withCredentials = true

	function getCookie(name) {
		let cookieValue = null;
		if (document.cookie && document.cookie !== '') {
			const cookies = document.cookie.split(';');
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
	

	const csrftoken = getCookie('csrftoken');
	const	CSRFToken = () => {
			return (
				<input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
			);
		};

		async function submit(){
			const token = "Token "+localStorage.getItem("user_token")  
			const Liimit = Limit*1;
			await axios.put("http://127.0.0.1:8000/api/posts/"+ location.postid + "/",
			{
				category:Category,
				region:Region,
				title:Title,
				item:Item,
				limit:Liimit,
				linka:LinkA,
				// price:Price,
				// deadline:Deadline,
				body:Body,
				imagea:Image,
			}, {
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken,
					"Authorization":token,
			}
		}
			)}
    return (
		<EditStyle>
			{/* <SearchHeader /> */}
			<form className="body"action="">
				<CSRFToken/>
				<div className="top">
					<div className="inputs">
						<select name="category"className="category"  onChange={handleSelect}>
							<option value="Offline">오프라인</option>
							<option value="Online">온라인</option>
							<option value="Delivery" >배달</option>
						</select>
						<input type="text"  name="title" className="title"placeholder="제목을 입력해주세요" onChange = {handleTitle}/>
						<div className="container">
							<div className="left-con con">
								<Input required placeholder='지역'name="region" setState={setRegion} ></Input>
								<Input required placeholder='품목' name="item" setState={setItem}></Input>
								<Input required placeholder='정원' name="limit" setState={setLimit}></Input>
							</div>
							<div className="right-con con">
								<Input size="L" placeholder="링크" name="link" setState={setLinkA}></Input>
								{/* <Input size="L" placeholder="가격" name="price"setState={setPrice}></Input> */}
								<Input size="L" placeholder="마감기한" name="deadline"setState={setDeadline} type={"date"}></Input>
							</div>
						</div>
					</div>
					<div className="imgbox">
						{/* <img src="" alt=""  /> */}
						<div className="default-img">사진을 추가하지 않으면 설정하신 품목에 맞는 랜덤 이미지가 배정됩니다.</div>
						<label htmlFor="input-file" className="imgbtn">사진추가</label>
					{/* <input type="file" id="input-file" className="imgsub"/> */}
                    </div>
				</div>
				<textarea name="body" id="" cols="30" onChange={handleBody} rows="10" placeholder="만날 장소와 시간, 구매 방법과 배분방법 등을 간단히 적어주세요."/>
				<br />
				<Link to="/" className="btn" onClick={submit}>
					<ButtonGreen type="submit" >작성하기</ButtonGreen>
				</Link>
			</form>
		</EditStyle>
	);


}

export default withRouter(Edit);