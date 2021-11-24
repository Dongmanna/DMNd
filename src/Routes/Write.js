import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router';

import ButtonGreen from '../Componenets/ButtonGreen';
import Input from '../Componenets/Input';
import Modal from 'react-modal';
import axios from 'axios';
import styled from 'styled-components';
import url from '../Url';

// import { Link } from 'react-router-dom';








// import Cookies from 'js-cookie'

const WriteStyle = styled.div`
	font-family: 'NIXGONM-Vb';
	.body {
		width: 60vw;
		margin: 0 20vw;
		@media (max-width: 700px) {
			width: 90vw;
			margin: 0 5vw;
		}
		margin-bottom: 10rem;
		padding-top: 7vh;
	}
	.top {
		display: flex;
		height: 28rem;
		min-height: 25rem;
		width: 100%;
		margin-bottom: 2%;
	}
	.category {
		width: 20rem;
		height: 3rem;
		border: var(--grn-1) 0.2rem solid;
		border-radius: 8px;
		padding-left: 1rem;
		margin-bottom: 2rem;
		:hover {
			background-color: #f2f2f2;
		}
		:focus {
			background-color: white;
			outline-width: 0;
		}
	}
	.red {
		border: none;
		border-bottom: 2px solid red;
	}
	.title {
		width: 95%;
		height: 3rem;
		font-size: 2rem;
		border: none;
		border-bottom: solid 0.2rem var(--grn-1);
		margin-bottom: 2rem;
		padding-left: 1.5rem;

		:focus {
			outline-width: 0;
		}
		::placeholder {
			color: black;
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
		#blank {
			opacity: 0;
			height: calc(3rem + 2px);
		}
	}
	.imgbox {
		padding-top: calc((35vh - 35vmin) / 2);
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		img {
			width: 35vmin;
			height: 35vmin;
			display: inline-block;
			z-index: 2;
			object-fit: cover;
		}
		.default-img {
			font-size: 1.6rem;
			padding: 0 4rem;
			padding-top: calc(17vmin - 2rem);
			text-align: center;
			width: 35vmin;
			height: 35vmin;

			background-color: #f2f2f2;
			/* z-index:-1; */
		}
	}

	.imgbtn {
		width: 7rem;
		height: 1.8rem;

		text-align: center;
		border: 1px solid #b9b9b9;
		border-radius: 5px;
		font-size: 1.2rem;
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
		position: absolute;
		opacity: 0;
	}
	.red {
		border-bottom: 2px solid red;
	}
	textarea {
		margin-top: 2rem;
		width: 95%;
		height: 35vh;
		min-height: 20rem;
		border: none;
		box-shadow: 0 0 1px;
		border-top: solid var(--grn-1) 0.3rem;
		padding: 2rem;
		font-size: 1.5rem;
		overflow: scroll;
		resize: none;
		:focus {
			outline-width: 0.1rem;
			outline-color: var(--grn-1);
		}
		:focus::placeholder {
			color: transparent !important;
		}
		margin-bottom: 2rem;
		::-webkit-scrollbar {
			opacity: 0;
		}
		::-webkit-scrollbar-thumb {
			opacity: 0.3;
			border-right: solid 4px var(--grn-2);
			border-radius: 3px;
			width: 2px;
		}
		::-webkit-scrollbar-corner {
			opacity: 0;
			background-color: transparent;
		}
	}

	.btn {
		position: absolute;
		right: 21vw;
	}
`;
const customStyles = {
	content: {
		zIndex: 3,
		top: '45%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		width: '40rem',
		fontSize: '2rem',
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexDirection: 'column',
		height: '40rem',
		fontFamily: 'NIXGONM-Vb',
		borderRadius: "10px",
		
	},
};

const Write = () => {
	const token = 'Token ' + localStorage.getItem('user_token');
	const userNow = JSON.parse(localStorage.getItem('userNow'));
	const [ModalOpen, setModalOpen] = useState(false);

	const [Category, setCategory] = useState('Offline');
	const [Region, setRegion] = useState('');
	const [Item, setItem] = useState('');
	const [Limit, setLimit] = useState('');
	const [LinkA, setLinkA] = useState('');
	const [ChatRoom, setChatRoom] = useState('');
	const [Price, setPrice] = useState('');
	const [Deadline, setDeadline] = useState(null);
	const [Body, setBody] = useState('');
	const [Image, setImage] = useState('');
	const [ImagePreview, setImagePreview] = useState('');
	const [Title, setTitle] = useState('');
	const [Error, setError] = useState([]);
	const formData = new FormData();
	let history = useHistory();

	const handleBody = (e) => {
		e.preventDefault();
		setBody(e.target.value);
	};
	const handleTitle = (e) => {
		e.preventDefault();
		setTitle(e.target.value);
	};
	const handleSelect = (e) => {
		setCategory(
			e.target.selectedIndex === 0
				? 'Offline'
				: e.target.selectedIndex === 1
				? 'Online'
				: 'Delivery'
		);
	};
	// function setThumbnail(e) {
	// 	var reader = new FileReader();
	// 	reader.onload = function (e) {
	// 		setImagePreview(e.target.result)
	// 	};
	// 	reader.readAsDataURL(e.target.files[0]);
	// }

	const handleImage = (e) => {
		if (e.target.files[0]) {
			const uploadFile = e.target.files[0];
			setImage(uploadFile);
			var reader = new FileReader();
			reader.onload = function (e) {
				setImagePreview(e.target.result);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	axios.defaults.xsrfCookieName = 'csrftoken';
	axios.defaults.xsrfHeaderName = 'X-CSRFToken';
	axios.defaults.withCredentials = true;

	function getCookie(name) {
		let cookieValue = null;
		if (document.cookie && document.cookie !== '') {
			const cookies = document.cookie.split(';');
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === name + '=') {
					cookieValue = decodeURIComponent(
						cookie.substring(name.length + 1)
					);
					break;
				}
			}
		}
		return cookieValue;
	}

	const csrftoken = getCookie('csrftoken');
	const CSRFToken = () => {
		return (
			<input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
		);
	};
	//모델 생성
	async function doneRegister(id) {
		try {
			// const token = 'Token ' + localStorage.getItem('user_token');
			const response = await axios.post(
				url + `api/posts/` + id + `/doneregister/`,
				{},
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: token,
					},
				}
			);
			console.log('done');
		} catch (error) {
			console.error(error);
		}
	}
	async function submit() {
		const token = 'Token ' + localStorage.getItem('user_token');
		formData.append('category', Category);
		formData.append('region', Region);
		formData.append('title', Title);
		formData.append('item', Item);
		formData.append('limit', Limit);
		formData.append('link', LinkA);
		formData.append('price', Price);
		if (Deadline) formData.append('deadline', Deadline);
		formData.append('body', Body);
		formData.append('image', Image);
		formData.append('chatroom', ChatRoom);

		try {
			await axios
				.post(url + 'api/posts/', formData, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'multipart/form-data',
						'X-CSRFToken': csrftoken,
						Authorization: token,
					},
				})
				.then((res) => {
					axios.post(
						url + `api/posts/` + res.data.id + `/join/`,
						{
							_content: '',
							_content_type: 'application/json',
						},
						{
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json',
								Authorization: token,
							},
						}
					);
					doneRegister(res.data.id);
					setModalOpen(true);
				});
			// history.push("/")
		} catch (error) {
			if (error.response) {
				/*
				 * The request was made and the server responded with a
				 * status code that falls out of the range of 2xx
				 */

				setError(error.response.data);
			} else if (error.request) {
				/*
				 * The request was made but no response was received, `error.request`
				 * is an instance of XMLHttpRequest in the browser and an instance
				 * of http.ClientRequest in Node.js
				 */
				console.log(error.request);
			} else {
				// Something happened in setting up the request and triggered an Error
				console.log('Error', error.message);
			}
		}
	}
	console.log(Error);

	return (
		<WriteStyle>
			<Modal
				isOpen={ModalOpen}
				onRequestClose={() => {
					history.push('/');
				}}
				style={customStyles}
			>
				작성되었습니다
				<ButtonGreen
					function1={() => {
						history.push('/');
					}}
				>
					확인
				</ButtonGreen>
			</Modal>
			<div className="body">
				<CSRFToken />
				<div className="top">
					<div className="inputs">
						<select
							name="category"
							className="category"
							onChange={handleSelect}
						>
							<option value="Offline">오프라인</option>
							<option value="Online">온라인</option>
							<option value="Delivery">배달</option>
						</select>
						<input
							type="text"
							name="title"
							className={Error.title ? 'title red' : 'title'}
							placeholder="제목을 입력해주세요"
							onChange={handleTitle}
						/>
						<div className="container">
							<div className="left-con con">
								<Input
									required
									placeholder="지역"
									name="region"
									// setState={setRegion}
									value={userNow.address}
									red={Error.region}
								></Input>
								<Input
									required
									placeholder="품목"
									name="item"
									setState={setItem}
									red={Error.item}
								></Input>
								<Input
									required
									placeholder="정원"
									name="limit"
									setState={setLimit}
									red={Error.limit}
								></Input>
							</div>
							<div className="right-con con">
								<Input
									size="L"
									placeholder="가격"
									name="price"
									setState={setPrice}
									red={Error.price}
								></Input>
								<Input
									size="L"
									placeholder="마감기한"
									name="deadline"
									setState={setDeadline}
									typeOn={'date'}
									red={Error.deadline}
								></Input>
								<Input
									size="L"
									placeholder="관련 링크"
									name="link"
									setState={setLinkA}
									red={Error.link}
								></Input>{' '}
							</div>
						</div>
						<Input
							size="LL"
							placeholder="오픈카톡방 링크"
							name="chatroom"
							type={'url'}
							setState={setChatRoom}
							red={Error.chatroom}
							required
						></Input>
					</div>

					<div className="imgbox">
						{Image ? (
							<img src={ImagePreview} alt="" />
						) : (
							<div className="default-img">
								사진을 추가해주세요
							</div>
						)}

						<label htmlFor="input-file" className="imgbtn">
							사진추가
						</label>
						<input
							type={'file'}
							accept="image/*"
							id="input-file"
							onChange={handleImage}
							className="imgsub"
						/>
					</div>
				</div>

				<textarea
					name="body"
					id=""
					cols="30"
					onChange={handleBody}
					rows="10"
					placeholder={
						Error.body
							? '본문을 작성해주세요'
							: '만날 장소와 시간, 구매 방법과 배분방법 등을 간단히 적어주세요.'
					}
					className={Error.body ? ' red' : ''}
				/>
				<br />
				<div className="btn">
					<ButtonGreen function1={submit}>작성하기</ButtonGreen>
				</div>
			</div>
		</WriteStyle>
	);
};

export default withRouter(Write);
