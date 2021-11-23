import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Input from '../Componenets/Input'
const SignUpStyle = styled.div`
	overflow: hidden;
	width: 100vw;
	height: 100vh;
	.highlight {
		height: 70vh;
		width: 35vw;
		margin: 0 auto;
		margin-top: 15vh;
		z-index: 3;
		background-color: transparent;
		border: solid var(--grn-2) 2px;
		/* overflow: hidden; */
	}
	.content {
		display: flex;
		transform: translate(${(props) => props.num * -35}vw, 0);
		transition: 1s;
	}
	.box {
		min-width: 32vw;
		height: 67vh;
		border: dotted var(--grn-1) 1px;
		margin: 1.5vh 1.5vw;
		padding: 3rem;
		position: relative;
		.next {
			background: #ffffff;
			border: 1px solid var(--grn-1);
			transition: 0.4s;
			:hover {
				background-color: var(--grn-1);
				color: #fff;
				border: none;
			}
			:active {
				box-shadow: -0.8px 0.8px 4px 0 var(--gray1);
			}
			width: 6rem;
            height:3rem;
			font-size: 1.5rem;
			position: absolute;
			right: 2rem;
			bottom: 15vh;
		}
        .sub{
            width:12rem;
            height:4rem;
        }
		h1 {
			font-size: 3rem;
		}
		h2 {
			margin-left: 3rem;
			color: var(--gray1);
		}
		Input {
			width: 15vw;
			margin-left: 3rem;
			font-size: 1.2rem;
			padding-left: 1rem;
		}
        .input-box {
			padding-top: 10vh;
		}
        .double-box{
            padding-top: 5vh;
        }
	}
	
`;
export default function SignUp() {
    // function getLocation() {
    //     if (navigator.geolocation) {
    //         // GPS를 지원하면
    //         navigator.geolocation.getCurrentPosition(
    //             function (position) {
    //                 const latitude = position.coords.latitude;
    //                 const longitude = position.coords.longitude;
    //                 const coords = position.coords;
    //                 console.log(latitude);
    //                 var geocoder = new kakao.maps.services.Geocoder();
    //                 function searchAddrFromCoords(coords, callback) {
    //                     // 좌표로 행정동 주소 정보를 요청합니다
    //                     geocoder.coord2RegionCode(coords.longitude, coords.latitude, callback);
    //                 }
    //                 searchAddrFromCoords(coords, displayCenterInfo);
    
    //                 function displayCenterInfo(result, status) {
    //                     if (status === kakao.maps.services.Status.OK) {
    //                         for (var i = 0; i < result.length; i++) {
    //                             // 행정동의 region_type 값은 'H' 이므로
    //                             if (result[i].region_type === "H") {
    //                                 const address = result[0].region_2depth_name;
    //                                 setgeoInfo(address);
    //                                 break;
    //                             }
    //                         }
    //                     }
    //                 }
    //             },
    //             function (error) {
    //                 console.error(error);
    //             },
    //             {
    //                 enableHighAccuracy: false,
    //                 maximumAge: 0,
    //                 timeout: Infinity,
    //             }
    //         );
    //     } else {
    //         alert("GPS를 지원하지 않습니다");
    //     }
    // }
    const [num, setNum] = useState(0);
    const [geoInfo, setgeoInfo] = useState("");
    // useEffect(() => {
    //         getLocation()
    // }, [])
    console.log(num);
    
    return (
        <SignUpStyle num={num}>
            <div className="highlight">
                <form className="content">
                    <div className="first box">
                        <h1>1.아이디</h1>
                        <h2>아이디를 입력해주세요.</h2>
                        <div className="input-box">
                            <Input size="L" placeholder="아이디를 입력해주세요"></Input>
                        </div>
                        <button className="next" onClick={num<3?()=>setNum(num+1):""}>다음</button>
                    </div>
                    <div className="second box">
                        <h1>2.비밀번호</h1>
                        <h2>비밀번호는 최소 하나 이상의 문자와 숫자를 포함하는 8자 이상의 조합이어야 합니다.</h2>
                        <div className="double-box">
                            <Input size="L"placeholder="비밀번호를 입력해주세요"></Input>
                            <br />  경고메시지 <br />
                            <Input size="L"placeholder="비밀번호를 확인해주세요"></Input>
                        </div>
                        

                    <button className="next" onClick={num<3?()=>setNum(num+1):""}>다음</button>

                    </div>
                    <div className="third box">
                        <h1>3.닉네임</h1>
                        <h2>닉네임을 입력해주세요</h2>
                        <div className="input-box">
                            <Input size="L" placeholder="닉네임을 입력해주세요"></Input>
                        </div>
                    <button className="next" onClick={num<3?()=>setNum(num+1):""}>다음</button>

                    </div>
                    <div className="fourth box">
                        <h1>4.지역 확인</h1>
                        <h2>현재 위치를 기반으로 활동지역을 설정합니다. <br />버튼을 눌러 지역을 확인해주세요.</h2>
                        <div className="input-box">
                        <Input size="L" value="geoInfo"></Input>
                        </div>
                    <Link to= "/"><button type="submit" className="next sub">회원가입하기</button></Link>
                    </div>
                </form>
            </div>
            {/* <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ffa2bfd8acfec27a8fec4112952c13e6&libraries=services"
    ></script> */}
        </SignUpStyle>
    )
}
