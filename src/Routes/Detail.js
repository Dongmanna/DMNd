import React, { useEffect, useState } from 'react';

import ButtonGray from '../Componenets/ButtonGray';
import ButtonGreenA from '../Componenets/ButtonGreenA';
import ButtonWhite from '../Componenets/ButtonWhite';
import CommentBox from '../Componenets/CommentBox';
import { Link } from 'react-router-dom';
import MemberProfile from '../Componenets/MemberProfile';
import Modal from 'react-modal';
import avatar from '../img/avatar-pl.png';
import axios from 'axios';
import styled from 'styled-components';
import url from "../Url"
import { withRouter } from 'react-router';

import temp_image1 from "../img/temp_image1.png"


const DetailStyle = styled.div`
width:100%;
	font-family: 'NIXGONM-Vb';
	img{
		object-fit: cover;

	}
	.body {
		padding: 0 18%;
		margin-top: 4rem;
	}
	.top {
		height: 30vw;
		min-height: 40rem;
		display: flex;
		margin-bottom: 1vh;
	}
	.left {
		width: 30vw;
		display: flex;
		align-items: center;
		img {
			border: solid 0.1rem var(--grn-1);
			border-radius: 0.1rem;
			max-height: 30vw;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.right {
		width: calc(100% - 30vw);
		padding: 0 2%;
		.category {
			font-family: 'Roboto';

			font-size: 0.8rem;
			color: var(--grn-1);
		}
		.titlesection {
			display: flex;
			justify-content: space-between;
			border-bottom: solid 0.3rem #f2f2f2;
			.title-date {
				width: 60%;
				:hover{
						width:100rem;
						float:right;
					}
				.title {
					font-family: 'Roboto';
					width: 100%;
					font-size: 2rem;
					@media(max-width:400px){
						font-size:2vw;
					}
					overflow: hidden;
					text-overflow: ellipsis;
					height: 2.5rem;
					
				}
				.date {
					width: 100%;
					color: gray;
					font-size: 1.4rem;
					line-height: 2rem;
				}
			}
			.author {
				display: flex;
				font-size: 1.4rem;
				img {
					width: 3rem;
					height: 3rem;
					border-radius: 40px;
					overflow: hidden;
					margin-right: 0.5rem;
				}
			}
		}
		.datasection {
			height: 58%;
			.must {
				font-size: 1.8rem;
				border-bottom: solid 0.1rem black;
				line-height:6rem;
				padding-left: 2%;
				margin-bottom: 2rem;
				height: 50%;
			}
			.alpha {
				font-size: 1.6rem;
				line-height: 3rem;
				padding-left: 2%;
				overflow: hidden;
				text-overflow: ellipsis;
				.linkbox{
					display:flex;
				}
				.link{
					display:inline-block;
					width:20rem;
					height:3rem;	
					overflow: hidden;
				text-overflow: ellipsis;
				}
			}
			.type {
				width:7rem;
        		display: inline-block;
				font-size:1rem
			}
		}
		.btntop {
			padding-top: 2%;
			display: flex;
			justify-content: end;
			align-items: flex-end;
			h2{
				margin-right: 2rem;
			}
		}
	}

	.textarea {
		width: 100%;
		min-height: 35vh;
		line-height: 2.2rem;
		box-shadow: 0 0 1px #f2f2f3;
		padding: 2rem;
		font-size: 1.6rem;
		border: solid 0.3rem #f2f2f2;
		margin-bottom: 2rem;
	}
	.done {
		width: 100%;
		min-height: 35vh;
		line-height: 35vh;

		text-align: center;
		font-size: 3rem;
		border: solid 0.3rem #f2f2f2;
	}
	.btnsection {
		padding-top:1rem;
		display: flex;
		justify-content: flex-end;
	}
	.membersection {
		padding: 5%;
		padding-bottom: 2%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		border-bottom: solid 0.2rem;
		margin-bottom: 2rem;
	}
	.commentsection {
		.form {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		display: flex;
		flex-direction: column;
		align-items: center;
		.comment-sub {
			width: 70vw;
			textarea {
				width: 70%;
				height: 10vh;
				border: none;
				box-shadow: 0 0 1px;
				border: solid var(--grn-1) 0.2rem;
				padding: 2rem;
				font-size: 1.5rem;
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
					width:0.8vw;
				}
				::-webkit-scrollbar-thumb {
					background-color: var(--grn-2); 
					border-radius: 10px;
					background-clip: padding-box;
					border: 0.5px solid transparent;
				}
				::-webkit-scrollbar-track {
					background-color: transparent;
					border-radius:10px;
					box-shadow: inset 0px 0px 5px white;
				}
			}
		}
	}
`;
const customStyles = {
	content: {
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
	overlay: {zIndex: 3}
};
//member 수 6명 이상이면 flex다시 설정해야해
const Detail = ({ location, history }) => {
	const token = 'Token ' + localStorage.getItem('user_token');

	//렌더링
	const [Part, setPart] = useState(false);
	const [ModalOpen, setModalOpen] = useState(false);

	const [CommentBoolean, setCommentBoolean] = useState(false)
	const [Comments, setComments] = useState([]);
	const [commentText, setcommentText] = useState('');
	const [IsDone, setIsDone] = useState(false)
	const handleCommentText = (e) => {
		e.preventDefault();
		setcommentText(e.target.value);
	};
	const [post, setpost] = useState(
		// location.post1===undefined?JSON.parse(sessionStorage.getItem("post")):location.post1
		// JSON.parse(sessionStorage.getItem('posta'))
		{
			url: url + 'api/posts/0/',
			id: 0,
			author: {
			   url: url + 'api/users/0/',
			   id: 0,
			   email: 'abcd@mail.com',
			   nickname: '동만나',
			   address: '동네',
			   profile_image: null,
			},
			category: 'Offline',
			title: '로딩중입니다',
			pub_date: '2021-08-23',
			body: '불러오는 중 ---',
			region: '',
			item: '로딩중',
			limit: 4,
			link: '',
			deadline: '2021-08-23',
			members: [
			   
			],
			image: null,
			done: false,
		}
	);
	useEffect(() => {
		location.postid
			? getPost(location.postid)
			: getPost(sessionStorage.postid);
		getComments(post.id);
		setcommentText("")
		// if(CommentBoolean){
		// 	// window.scrollTo(0,(document.body.scrollHeight+ "100px");
		// 	setCommentBoolean(!CommentBoolean)
		// }
		
		
	}, [Part,CommentBoolean]);
	//states

	
	//Mapping
	//멤버 목록
	const members = post.members.map((member) => {
		var isAuthor = member.url === post.author.url;
		return (
			<MemberProfile
				key={member.url}
				img={member.profile_image}
				nickname={member.nickname}
				author={isAuthor}
			></MemberProfile>
		);
	});
	//멤버 정렬
	//댓글 목록
	const commentBoxes = Comments.map((comment) => {
		return (
			<CommentBox nickname={comment.author.nickname} key={comment.id}image = {comment.author.profile_image}>
				{comment.content}
			</CommentBox>
		);
	});

	//Functions
	//참가하기
	async function join(id) {
		try {
			// const token = 'Token ' + localStorage.getItem('user_token');
			const response = await axios.post(
				url + `api/posts/`+id + `/join/`,
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
			setPart(!Part);
		} catch (error) {
			console.error(error);
		}
	}
	//삭제하기
	async function deletePost() {
		// const token = 'Token ' + localStorage.getItem('user_token');

		await axios.delete(url + 'api/posts/' + post.id + '/', {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});
		//삭제가 완료되었습니다 팝업창
		await history.push('/');
	}
	//댓글 리스트 가져오기
	async function getComments(id) {
		try {
			// const token = 'Token ' + localStorage.getItem('user_token');
			const response = await axios.get(
				url+`api/posts/` + id + `/comments/`,
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: token,
					},
				}
			);
			await setComments(response.data);
		} catch (error) {
			console.error(error);
		}
	}
	//구매완료
		//모델 생성
	async function doneRegister(id) {
		try {
			// const token = 'Token ' + localStorage.getItem('user_token');
			const response = await axios.post(
				url +`api/posts/`+ id + `/doneregister/`,
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
		//구매 완료하기
		async function done(id) {
			try {
				// const token = 'Token ' + localStorage.getItem('user_token');
				const response = await axios.post(
					url +`api/posts/`+ id + `/done/`,
					{},
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: token,
						},
					}
				);
				setModalOpen(false)
			} catch (error) {
				console.error(error);
			}
		}
	//구매완료한 사람 리스트 받아오기
	async function getIsDone() {
		const response = await axios.get(
			url +`api/posts/`+ post.id + `/doneregister/`,		
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: token,
				},
			}
		
		);
		setIsDone(response.data[0].users.some((member)=>member === JSON.parse(localStorage.userNow).url))
	}
	//댓글 입력
	async function commentSubmit() {
		await axios.post(
			url + 'api/comments/',
			{
				post: post.url,
				author: JSON.parse(localStorage.userNow),
				content: commentText,
			},
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: token,
				},
			}
		);
		setCommentBoolean(!CommentBoolean)
		// window.scrollTo(0,document.body.scrollHeight);
	}
	//Get post by id & session storage
	async function getPost(postid) {
		try {
			// const token = 'Token ' + localStorage.getItem('user_token');
			const response = await axios.get(
				url + `api/posts/`+postid,
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: token,
					},
				}
			);
			await setpost(response.data);

			await sessionStorage.setItem('postid', postid);
			await sessionStorage.setItem(
				'posta',
				JSON.stringify(response.data)
			);

			if (
				response.data.members.some(
					(member) =>
						member.url === JSON.parse(localStorage.userNow).url
				)
			) {
				setPart(true);
			}
			await getIsDone()
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<DetailStyle>
			{/* <SearchHeader /> */}
			<Modal
				isOpen={ModalOpen}
				onRequestClose={() => {
					setModalOpen(false)
				}}
				style={customStyles}
			>
				구매 완료시에만 눌러주세요
				<div className="modalbtn">
					<ButtonGray function1={done} function2={() => 
						setModalOpen(false)} id={post.id}>구매 완료</ButtonGray>
				<ButtonGray
					function1={() => {
						setModalOpen(false);
					}}
				>
					취소
				</ButtonGray></div>
				
			</Modal>
			<div className="body">
				<div className="top">
					<div className="left">
						<img src={post.image?post.image:temp_image1} alt="사진이 없습니다." />
					</div>
					<div className="right">
						<p className="category">{post.category}</p>
						<div className="titlesection">
							<div className="title-date">
								<div className="title">{post.title}</div>
								<div className="date">{post.pub_date}</div>
							</div>
							<div className="author">
								{post.author.profile_image ? (
									<img
										src={post.author.profile_image}
										alt="작성자"
										className="author-profile-img"
									/>
								) : (
									<img src={avatar} alt="작성자"></img>
								)}

								<div className="author-profile">
									{post.author.nickname}
									<br /> {/*author 어떻게 만지는지 확인 */}
									{post.author.address}
								</div>
							</div>
						</div>
						<div className="datasection">
							<div className="must">
								
								<div className="type">품목</div>{post.item}
								<br />
								<div className="type">모집인원</div>{post.members.length}/{post.limit}
							</div>
							<div className="alpha">
								<div className="type">가격</div>{' '}
								{post.price ? post.price : '미정'}
								<br />
								<div className="type">마감기한</div>{' '}
								{post.deadline ? post.deadline : '미정'} <br />
								<div className="linkbox">
								<div className="type">링크</div>{' '}
								<a href = {post.link}  target="_blank" rel="noopener noreferrer" className="link">{post.link ? post.link : '미정'}</a> 
								</div>
								
								<br />
							</div>
						</div>
						<div className="btntop">
							{post.members.length < post.limit ? (
								<ButtonGreenA
									function1={setPart}
									join={join}
									part={Part}
									id={post.id}
									
									secondText="카톡방 입장"
									link = {post.chatroom}
								>
									참가하기!
								</ButtonGreenA>
							) : (
								<h2>마감되었어요 ㅠ</h2>
							)}

							{post.author.url ===
							JSON.parse(localStorage.userNow).url ? (
								''
							) : Part &&!IsDone?
								<ButtonGray
									setPart={setPart}
									function1={join}
									id={post.id}
								>
									참가 취소
								</ButtonGray>:""
							}
						</div>
					</div>
				</div>
				{post.done ? (
					<div className="done">거래가 완료되었습니다.</div>
				) : (
					<div className="textarea">{post.body} </div>
				)}
				<div className="btnsection">
					{Part&&!IsDone?<ButtonWhite function1={() => setModalOpen(true)}>
                		구매완료
               		</ButtonWhite>:""}
					{post.author.url ===
					JSON.parse(localStorage.userNow).url ? (
						<>
							<Link to={{ pathname: '/edit', post: post }}>
								<ButtonWhite>수정하기</ButtonWhite>
							</Link>
							<ButtonWhite function1={deletePost}>
								삭제하기
							</ButtonWhite>
						</>
					) : (
						''
					)}
				</div>
				<div className="membersection">{members}</div>
				
					<div className="commentsection">
						{commentBoxes}
						<div className="comment-sub">
							<div className="form">
								<textarea
									name="comment"
									id=""
									cols="30"
									rows="10"
									placeholder="댓글 입력하기"
									onChange={handleCommentText}
									value = {commentText}
								></textarea>
								<ButtonWhite function1={commentSubmit}>
									입력
								</ButtonWhite>
							</div>
						</div>
					</div>
				
			</div>
		</DetailStyle>
	);
};

export default withRouter(Detail);
