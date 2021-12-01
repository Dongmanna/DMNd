import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import logo from "../img/logo.png"
const HeaderStyle = styled.div`
width: 100%;
img{
	width:20rem;
	margin-left:5vw;
	margin-top:1.5rem;
	object-fit: cover;
	@media(max-width:600px){
		margin-top:1.5vw;
		width: 22vw;
}
@media(max-width:390px){
	width:21vw;
	margin-top:3vw;
    margin-left:2.5vw;
}
@media(max-width:300px){
    margin-top:4vw;
	width:18vw;
}
}
	width: 100%;
	height: 10vh;
	padding-top: 2vh;
	padding-right: 4vw;
	.Header_L{
		position: absolute;
	}
	.Header_R {
		margin-top:2rem;
		font-family: 'NIXGONM-Vb';
		font-style: normal;
		font-weight: normal;
		font-size: 1.8rem;
		color: #a2a2a2;
		display: flex;
		justify-content: flex-end;
		@media(max-width:400px){
			font-size: 1rem;
		}
	}

	.gotowrite {
	}
	.gotomy {
	}
	.gotologout {
	}
	.border {
		height: 3rem;
		margin: 0 1.2rem;
		border-right: solid 3px #a2a2a2;
		transform: translate(0, -0.5rem);
	}

	.border2 {
		margin: 0 1.2rem;
		height: 3rem;
		border-right: solid 3px #a2a2a2;
		transform: translate(0, -0.5rem);
	}
`;

const SLink = styled(Link)`
	text-decoration: none;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
	color: inherit;
`;
const Hstyle = styled.div`
	position: relative;
	.sbar {
		position: absolute;
		right: calc(4vw + 30rem);
		top: 1rem;
		@media(max-width:350px){
			left:25vw;
		}
		@media(max-width:300px){
			left:22vw;
		}
	}
`;

const Header = ({s, setIsLogged}) => {
    const logout = ()=>{
        setIsLogged(false);
        localStorage.removeItem("user_token");
		localStorage.removeItem("userNow");

    }
	return (
		<Hstyle>
			<HeaderStyle>
				<div className="Header_L">
					<SLink to="/"><img src={logo} alt="" /></SLink>
				</div>
				<div className="Header_R">
					<SLink to="/write" className="gotowrite">
						{' '}
						게시글 작성{' '}
					</SLink>
					<div className="border"></div>
					<SLink to="/mypage" className="gotomy">
						{' '}
						마이페이지{' '}
					</SLink>
					<div className="border2" />

					<SLink to="/" onClick = {logout}className="gotologout">
						{' '}
						로그아웃{' '}
					</SLink>
				</div>
			</HeaderStyle>
			{s ? (
				<div className="sbar">
					<SLink to="/result">
						<SearchBar size="S" />
					</SLink>
				</div>
			) : (
				''
			)}
		</Hstyle>
	);
};

export default Header;
