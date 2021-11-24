import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MypageCate from '../Componenets/MypageCate';
import MypageCard from '../Componenets/MypageCards';
import axios from 'axios';
import avatar from '../img/avatar-pl.png';
import url from '../Url';
const MypageStyle = styled.div`
	width: 100%;
	input {
		opacity: 0;
	}
	.imgbtn {
		width: 8rem;
		object-fit: cover;
		height: 1.8rem;
		position: absolute;
		top: 19.5vw;
		left: calc(25vw - 4rem);
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
	.profileimg {
		position: absolute;
		width: 10vw;
		height: 10vw;
		left: 20vw;
		top: 10vw;
		background: #f3f3f3;
		border: 1px solid #c4c4c4;
		box-sizing: border-box;
		border-radius: 4999px;
	}
	.profileinfo {
		font-family: 'Roboto';
		font-size: 1.8rem;
	}

	.nickname {
		position: absolute;
		width: 19.5rem;
		height: 5vh;
		left: 32vw;
		top: 12vw;
	}
	.loc {
		position: absolute;
		width: 19.5rem;
		height: 5vh;
		left: 32vw;
		top: 15vw;
	}
	.count {
		position: absolute;
		width: 19.5rem;
		height: 5vh;
		left: 31.5vw;
		top: 22vw;
	}
	.contain {
		position: absolute;
		left: 12.8vw;
		width: 77.5vw;

		height: 41vw;

		@media (max-width: 1040px) {
			height: 80vw;
		}
		overflow: hidden;
		.cards {
			transform: translate(${(props) => props.num * -79}vw, 0);
			transition: 1s;

			@media (max-width: 1040px) {
				transform: translate(${(props) => props.num * -79.5}vw, 0);
				transition: 1s;
			}
		}
	}
	.arrow {
		top: 56vw;

		@media (max-width: 1040px) {
			top: 70vw;
		}
	}
	.rarrow {
		position: absolute;
		width: 5vw;
		right: 0.2vw;
		border-top: 5rem solid transparent;
		border-left: 5rem solid #9bba74;
		border-bottom: 5rem solid transparent;
		:hover {
			cursor: pointer;
		}
	}
	.larrow {
		position: absolute;
		width: 5vw;
		left: 4vw;
		border-top: 5rem solid transparent;
		border-right: 5rem solid #9bba74;
		border-bottom: 5rem solid transparent;
		:hover {
			cursor: pointer;
		}
	}
`;

const MyPage = () => {
	const userNow = JSON.parse(localStorage.userNow);
	const [carouselNum, setcarouselNum] = useState(0);
	const [categoryM, setcategoryM] = useState('ongoing');
	const [Content, setContent] = useState([]);
	const formData = new FormData();
	const [Image, setImage] = useState('');
	const [ImagePreview, setImagePreview] = useState('');
	const [Address, setAddress] = useState(userNow.address)

	const handleImage = (e) => {
		const uploadFile = e.target.files[0];
		setImage(uploadFile);
		var reader = new FileReader();
		reader.onload = function (e) {
			setImagePreview(e.target.result);
		};
		reader.readAsDataURL(e.target.files[0]);
		submit(e.target.files[0])
	};
	async function submit(imagep) {
		const token = 'Token ' + localStorage.getItem('user_token');
		formData.append('profile_image', imagep);
        formData.append('address',Address)
		try {
			await axios.put(
				url +'api/user/',
				formData,

				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'multipart/form-data',
						// 'X-CSRFToken': csrftoken,
						Authorization: token,
					},
				}
			);
            await getUserNow();
		} catch (error) {
			if (error.response) {
				/*
				 * The request was made and the server responded with a
				 * status code that falls out of the range of 2xx
				 */
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
    async function getUserNow() {
		try {
			const token = 'Token ' + localStorage.getItem('user_token');
			const response = await axios
				.get(url +'api/user/', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: token,
					},
				})
				.then((res) =>
					localStorage.setItem('userNow', JSON.stringify(res.data))
				);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}
	async function getContent() {
		try {
			const response = await axios.get(
				url +'api/posts/'
			);
			await setContent(response.data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getContent();
	}, []);
	return (
		<MypageStyle num={carouselNum}>
			{/* <SearchHeader /> */}
			<br></br>
			<div className="profileinfo">
				<img
					className="profileimg"
					src={
						ImagePreview?ImagePreview:userNow.profile_image?userNow.profile_image:avatar
					}
					alt=""
				/>
				
					<>
						<label htmlFor="input-file" className="imgbtn">
							사진선택
						</label>
						<input
							type={'file'}
							accept="image/*"
							id="input-file"
							onChange={handleImage}
							className="imgsub"
						/>
					</>
				
				<div className="infos">
					<div className="nickname">{userNow.nickname}</div>{' '}
					<div className="loc">{userNow.address}</div>
				</div>
			</div>
			<div
				className="arrow larrow"
				onClick={() => {
					carouselNum > 0
						? setcarouselNum(carouselNum - 1)
						: setcarouselNum(carouselNum);
				}}
			></div>
			<div
				className="arrow rarrow"
				onClick={() => {
					carouselNum < 10
						? setcarouselNum(carouselNum + 1)
						: setcarouselNum(carouselNum);
				}}
			></div>
			<MypageCate categoryM={categoryM} setcategoryM={setcategoryM} />
			<div className="contain">
				<div className="cards">
					<MypageCard content={Content} categoryM={categoryM} />
				</div>
			</div>
		</MypageStyle>
	);
};

export default MyPage;
