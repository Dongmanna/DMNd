import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router';

import ButtonGreen from '../Componenets/ButtonGreen';
import Input from '../Componenets/Input';
import axios from 'axios';
import styled from 'styled-components';
import url from '../Url';
import Modal from 'react-modal'

const SignUpStyle = styled.div`
	
	.red {
		font-size: 1.2rem;
		color: red;
		line-height: 3rem;
	}
	.gap {
		height: 3rem;
	}
	display: flex;
	justify-content: center;
	padding-top: 10vh;
	h1 {
		font-family: 'Roboto';
		color: #424242;
		font-size: 2rem;
		margin-bottom: 4rem;
	}
	.box {
		width: 50rem;
	}
	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.line {
		border-bottom: solid #f2f2f2 2px;
		width: 100%;
	}
	label {
		font-size: 1.8rem;
		font-weight: bold;
		line-height: 4rem;
		display: block;
		margin-top: 4rem;
	}
	.input-box {
		width: 80%;
	}
	h2 {
		font-size: 1.5rem;
		color: gray;
		font-weight: 500;
		font-family: 'NIXGONM-Vb';
		margin-bottom: 2rem;
	}
	h3 {
		display: inline-block;
		margin: 0 0.8rem;
		color: #f2f2f2;
		font-size: 1.8rem;
	}
	Input {
		width: 100%;
		border-top: solid 2px var(--grn-1);
		border-left: solid 2px var(--grn-1);
		border-right: solid 2px var(--grn-1);
		border-radius: 5px;
		height: 4.2rem;
		:hover {
			background-color: #f2f2f2;
		}
		:focus {
			outline-width: 0;
			border: solid 2px orange;
			background-color: white;
		}
	}

	select {
		background-color: transparent;
		height: 4rem;
		width: calc(50% - 4rem);
		border-radius: 5px;
		border: var(--grn-1) 2px solid;

		:focus {
			outline-width: 0;

			border: solid 2px orange;
		}
	}
	button {
		margin-top: 5rem;
		margin-bottom: 5rem;
		margin-left :25rem;
	}
`;
const customStyles = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	  width: '40rem',
	  fontSize: "2rem",
	  display: "flex",
	  justifyContent:"space-evenly",
	  alignItems:"center",
	  flexDirection:"column",
	  height:"40rem",
	  fontFamily: 'NIXGONM-Vb',

	},
  };

export default function SignUp({ setIsLogged }) {
	let history = useHistory();

	const [Email, setEmail] = useState('');
	// const [EmailAt,setEmailAt] = useState("")
	const [Password1, setPassword1] = useState('');
	const [Password2, setPassword2] = useState('');
	const [Nickname, setNickname] = useState('');
	const [Address, setAddress] = useState('');
	const [Error, setError] = useState([]);
	const [geoInfo, setgeoInfo] = useState('');
	const [ModalOpen, setModalOpen] = useState(false)

	async function getUserNow() {
		try {
			const token = 'Token ' + localStorage.getItem('user_token');
			const response = await axios
				.get(url + 'api/user/', {
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
	async function login() {
		try {
			await axios
				.post(url + 'api/login/', {
					email: Email,
					password: Password1,
				})
				.then((res) => {
					localStorage.setItem('user_token', res.data.key);
				});
			await getUserNow();
		} catch (error) {
			// if (error.response) {
			// 	/*
			// 	 * The request was made and the server responded with a
			// 	 * status code that falls out of the range of 2xx
			// 	 */
			// 	console.log(error.response.data)
			// } else if (error.request) {
			// 	/*
			// 	 * The request was made but no response was received, `error.request`
			// 	 * is an instance of XMLHttpRequest in the browser and an instance
			// 	 * of http.ClientRequest in Node.js
			// 	 */
			// 	console.log(error.request);
			// } else {
			// 	// Something happened in setting up the request and triggered an Error
			// 	console.log('Error', error.message);
			// }
		}
	}
	async function submit() {
		try {
			const response = await axios.post(url + 'api/registration/', {
				email: Email,
				password1: Password1,
				password2: Password2,
				nickname: Nickname,
				address: geoInfo,
				// profile_image:null,
			});
			await login();
			setModalOpen(true)
		} catch (error) {
			if (error.response) {
				/*
				 * The request was made and the server responded with a
				 * status code that falls out of the range of 2xx
				 */
				console.log(error.response.data);
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
	const kakao = window.kakao;
	// const jsKey = "aa41ca117f2c98dd171a5c629a466b23";

	// // SDK??? ??? ?????? ??????????????? ??????.
	// // ???????????? ???????????? ?????? ?????? isInitialized()??? SDK ????????? ????????? ????????????.
	// if (!window.Kakao.isInitialized()) {
	//   // JavaScript key??? ????????? ?????? SDK ?????????
	//   window.Kakao.init(jsKey);
	//   // SDK ????????? ????????? ????????????.
	//   console.log(window.Kakao.isInitialized());
	// }

	function getLocation() {
		if (navigator.geolocation) {
			// GPS??? ????????????
			navigator.geolocation.getCurrentPosition(
				function (position) {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					const coords = position.coords;
					console.log(latitude);
					var geocoder = new kakao.maps.services.Geocoder();
					function searchAddrFromCoords(coords, callback) {
						// ????????? ????????? ?????? ????????? ???????????????
						geocoder.coord2RegionCode(
							coords.longitude,
							coords.latitude,
							callback
						);
					}
					searchAddrFromCoords(coords, displayCenterInfo);

					function displayCenterInfo(result, status) {
						if (status === kakao.maps.services.Status.OK) {
							for (var i = 0; i < result.length; i++) {
								// ???????????? region_type ?????? 'H' ?????????
								if (result[i].region_type === 'H') {
									const address2 =
										result[0].region_3depth_name;
									const address1 =
										result[0].region_2depth_name;

									setgeoInfo(address1 + ' ' + address2);
									break;
								}
							}
						}
					}
				},
				function (error) {
					console.error(error);
				},
				{
					enableHighAccuracy: false,
					maximumAge: 0,
					timeout: Infinity,
				}
			);
		} else {
			alert('GPS??? ???????????? ????????????');
		}
	}
	useEffect(() => {
		getLocation();
		console.log(geoInfo, 'aaa');
	}, []);
	return (
		<SignUpStyle>
			<Modal isOpen={ModalOpen} onRequestClose={() =>{if(localStorage.userNow)setIsLogged(true);
 history.push("/")}}         style={customStyles}
 >
				??????????????? ?????????????????????. ????????????!
				<ButtonGreen function1={()=>{history.push("/");if(localStorage.userNow)setIsLogged(true)}
}>??????</ButtonGreen>
			</Modal>
			<div className="box">
				<h1>????????????</h1>
				<div className="line"></div>
				<div className = "form">
					<div className="input-box email">
						<label htmlFor="">?????????</label>
						<h2>???????????? ??????????????????.</h2>
						<Input
							type="email"
							placeholder="?????????"
							name="email"
							setState={setEmail}
						/>
						{/* <h3>@</h3> */}
						{Error.email ? (
							<div className="red">{Error.email}</div>
						) : (
							''
						)}
						{/* <select name="" id="">
							<option value="naver.com">naver.com</option>
							<option value="gmail.com">gmail.com</option>
							<option value="_manual">????????????</option>
						</select> */}
					</div>

					<div className="input-box password">
						<label htmlFor="">????????????</label>
						<h2>??????????????? ??????????????????.</h2>
						<Input
							type="password"
							placeholder="???????????? ??????"
							name="password1"
							setState={setPassword1}
						/>
						{Error.password1 ? (
							<div className="red">{Error.password1}</div>
						) : (
							<div className="gap"></div>
						)}

						<Input
							type="password"
							placeholder="???????????? ??????"
							name="password2"
							setState={setPassword2}
						/>
						{Error.non_field_errors ? (
							<div className="red">
								??????????????? ????????? ?????????????????????.
							</div>
						) : (
							<div className="gap"></div>
						)}
					</div>

					<div className="input-box nickname">
						<label htmlFor="">?????????</label>
						<h2>
							???????????? ???????????? ????????? ????????? ??????????????????. ??? ???
							?????? ???????????? ?????? ??? ?????????.
						</h2>
						<Input
							type="text"
							placeholder="????????? ??????"
							name="nickname"
							setState={setNickname}
						/>
						{Error.nickname ? (
							Error.nickname[0] ===
							"??? ????????? ????????? ??????(unique)?????? ?????????." ? (
								<div className="red">
									?????? ???????????? ??????????????????.
								</div>
							) : (
								<div className="red">???????????? ??????????????????.</div>
							)
						) : (
							''
						)}
					</div>

					<div className="input-box address">
						<label htmlFor="">??????</label>
						<h2>
							?????? ???????????? ????????? ???????????? ???????????????. ??????
							????????? ??????????????????.
						</h2>
						{/* <Input type="text" placeholder="??????" name = "address" setState = {setAddress}/> */}
						<Input
							type="text"
							placeholder="??????"
							name="address"
							value={geoInfo}
						/>

						{Error.address ? (
							<div className="red">
								?????? ?????? ????????? ??????????????????.{' '}
							</div>
						) : (
							''
						)}
					</div>
					<ButtonGreen function1={submit}>????????????</ButtonGreen>
				</div>
			</div>
		</SignUpStyle>
	);
}
