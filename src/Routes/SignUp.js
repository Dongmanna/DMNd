import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router';

import ButtonGreen from '../Componenets/ButtonGreen';
import Input from '../Componenets/Input';
import axios from 'axios';
import styled from 'styled-components';
import url from "../Url"

const SignUpStyle = styled.div`
.red{
	font-size:1.2rem;
	color:red;
	line-height:3rem;
}
.gap{
	height:3rem;
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
	form {
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
    button{
        margin-top:5rem;
        margin-bottom:5rem;

    }
`;

export default function SignUp({setIsLogged}) {
	let history = useHistory();

	const [Email, setEmail] = useState("")
	// const [EmailAt,setEmailAt] = useState("")
	const [Password1, setPassword1] = useState("")
	const [Password2, setPassword2] = useState("")
	const [Nickname, setNickname] = useState("")
	const [Address, setAddress] = useState("")
	const [Error, setError] = useState([])
	const [geoInfo, setgeoInfo] = useState("")

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
	async function login( ) {
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
			setIsLogged(true);
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
	async function submit(){
        try{
            const response = await axios.post( url + "api/registration/",
			{
				email: Email,
				password1:Password1,
				password2:Password2,
				nickname:Nickname,
				address:geoInfo,
				// profile_image:null,
			}
			);            
            await login();
			history.push("/")
        }catch(error){
			if (error.response) {
				/*
				 * The request was made and the server responded with a
				 * status code that falls out of the range of 2xx
				 */
				console.log(error.response.data)
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
    };
	const kakao = window.kakao
	// const jsKey = "aa41ca117f2c98dd171a5c629a466b23";

    // // SDK는 한 번만 초기화해야 한다.
    // // 중복되는 초기화를 막기 위해 isInitialized()로 SDK 초기화 여부를 판단한다.
    // if (!window.Kakao.isInitialized()) {
    //   // JavaScript key를 인자로 주고 SDK 초기화
    //   window.Kakao.init(jsKey);
    //   // SDK 초기화 여부를 확인하자.
    //   console.log(window.Kakao.isInitialized());
    // }
	
	function getLocation() {
        if (navigator.geolocation) {
            // GPS를 지원하면
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const coords = position.coords;
                    console.log(latitude);
                    var geocoder = new kakao.maps.services.Geocoder();
                    function searchAddrFromCoords(coords, callback) {
                        // 좌표로 행정동 주소 정보를 요청합니다
                        geocoder.coord2RegionCode(coords.longitude, coords.latitude, callback);
                    }
                    searchAddrFromCoords(coords, displayCenterInfo);
    
                    function displayCenterInfo(result, status) {
                        if (status === kakao.maps.services.Status.OK) {
                            for (var i = 0; i < result.length; i++) {
                                // 행정동의 region_type 값은 'H' 이므로
                                if (result[i].region_type === "H") {
                                    const address2 = result[0].region_3depth_name;
									const address1 = result[0].region_2depth_name;

                                    setgeoInfo(address1 +" " +  address2);
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
            alert("GPS를 지원하지 않습니다");
        }
    }
	useEffect(() => {
		getLocation()
		console.log(geoInfo,"aaa")
	}, [])
	return (
		<SignUpStyle>
			<div className="box">
				<h1>회원가입</h1>
				<div className="line"></div>
				<div >
					<div className="input-box email">
						<label htmlFor="">이메일</label>
						<h2>이메일을 입력해주세요.</h2>
						<Input
							type="email"
							placeholder="이메일"
							name = "email"
							setState ={setEmail}
						/>
						{/* <h3>@</h3> */}
						{Error.email?<div className="red">이메일주소 입력해주세요</div>:""}
						{Error.email===""}
						{/* <select name="" id="">
							<option value="naver.com">naver.com</option>
							<option value="gmail.com">gmail.com</option>
							<option value="_manual">직접입력</option>
						</select> */}
					</div>

					<div className="input-box password">
						<label htmlFor="">비밀번호</label>
						<h2>비밀번호를 입력해주세요.</h2>
						<Input type="password" placeholder="비밀번호 입력" name="password1" setState ={setPassword1} />
						{Error.password1?<div className="red">비밀번호를 입력해주세요</div>:<div className="gap"></div>}
						<Input type="password" placeholder="비밀번호 확인" name="password2" setState ={setPassword2}/>
						{Error.password2?<div className="red">비밀번호가 다릅니다</div>:<div className="gap"></div>}
					</div>

					<div className="input-box nickname">
						<label htmlFor="">닉네임</label>
						<h2>
							앞으로의 거래에서 사용할 별명을 입력해주세요. 한 번
							정한 닉네임은 바꿀 수 없어요.
						</h2>
						<Input type="text" placeholder="닉네임 입력" name="nickname" setState ={setNickname}/>
						{Error.nickname?<div className="red">닉네임을 입력해주세요</div>:""}
					</div>

					<div className="input-box address">
						<label htmlFor="">주소</label>
						<h2>
							현재 위치하신 주소가 자동으로 입력됩니다. 위치 권한을 허용해주세요.
						</h2>
						{/* <Input type="text" placeholder="주소" name = "address" setState = {setAddress}/> */}
						<Input type="text" placeholder="주소" name = "address" value={geoInfo}/>

						{Error.address?<div className="red">주소를 입력해주세요</div>:""}
					</div>
						<ButtonGreen function1 = {submit}>가입하기</ButtonGreen>
				</div>
			</div>
		</SignUpStyle>
	);
}
