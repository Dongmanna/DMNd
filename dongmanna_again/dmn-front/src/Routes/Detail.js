import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ButtonWhite from '../Componenets/ButtonWhite';
import ButtonGray from '../Componenets/ButtonGray';
import ButtonGreenA from '../Componenets/ButtonGreenA';
import MemberProfile from '../Componenets/MemberProfile';
import CommentBox from '../Componenets/CommentBox';
// import temp_image1 from "../img/temp_image1.png"
import avatar from '../img/avatar-pl.png';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DetailStyle = styled.div`
	font-family: 'NIXGONM-Vb';
	.body {
		padding: 0 13%;
		margin-top: 3vh;
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

				.title {
					font-family: 'Roboto';

					width: 100%;
					font-size: 2.2rem;
					overflow: hidden;
					text-overflow: ellipsis;
					height: 4rem;
				}
				.date {
					width: 100%;
					color: gray;
					margin-left: 1rem;
					font-size: 1.4rem;
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
			.type {
				width: 20rem;
				display: inline-block;
			}
			.must {
				font-size: 1.8rem;
				border-bottom: solid 0.1rem black;
				line-height: 5rem;
				padding-left: 3%;
				margin-bottom: 1rem;
				height: 50%;
			}
			.alpha {
				font-size: 1.6rem;
				line-height: 3rem;
				padding-left: 3%;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.btntop {
			padding-top: 2%;
			display: flex;
			justify-content: end;
			align-items: flex-end;
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
		display: flex;
		justify-content: flex-end;
	}
	.membersection {
		padding: 5%;
		padding-bottom: 2%;
		display: flex;
		justify-content: flex-start;
		border-bottom: solid 0.2rem;
		margin-bottom: 2rem;
	}
	.commentsection {
		form {
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
				/* ::-webkit-scrollbar {
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
				} */
			}
		}
	}
`;
//member 수 6명 이상이면 flex다시 설정해야해
const Detail = ({ location, history }) => {
	const token = 'Token ' + localStorage.getItem('user_token');

	//렌더링
	const [Part, setPart] = useState(false);
	const [post, setpost] = useState(
		// location.post1===undefined?JSON.parse(sessionStorage.getItem("post")):location.post1
		// JSON.parse(sessionStorage.getItem('posta'))
		{
			url: 'http://127.0.0.1:8000/api/posts/3/',
			id: 0,
			author: {
				url: 'http://127.0.0.1:8000/api/users/1/',
				id: 1,
				email: 'misby0327@gmail.com',
				nickname: '이',
				address: '마포구 공덕동',
				profile_image: null,
			},
			category: 'Offline',
			title: '양파',
			pub_date: '2021-11-12T19:21:07.434249+09:00',
			body: '양파 같이 살 착한 사람 구해요',
			region: '마포구 공덕동',
			item: '양파',
			limit: 3,
			link: '',
			deadline: '2021-11-27T19:20:00+09:00',
			members: [
				{
					url: 'http://127.0.0.1:8000/api/users/1/',
					id: 1,
					email: 'misby0327@gmail.com',
					nickname: '이',
					address: '마포구 공덕동',
					profile_image: null,
				},
				{
					url: 'http://127.0.0.1:8000/api/users/2/',
					id: 2,
					email: 'robot0327@naver.com',
					nickname: '리',
					address: '마포구 염리동',
					profile_image: null,
				},
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
	}, [Part,]);
	//states

	const [Comments, setComments] = useState([]);
	const [commentText, setcommentText] = useState('');
	const handleCommentText = (e) => {
		e.preventDefault();
		setcommentText(e.target.value);
	};
	//Mapping
	//멤버 목록
	const members = post.members.map((member) => {
		var isAuthor = member.url === post.author.url;
		return (
			<MemberProfile
				key={member.url}
				img=""
				nickname={member.nickname}
				author={isAuthor}
			></MemberProfile>
		);
	});
	//댓글 목록
	const commentBoxes = Comments.map((comment) => {
		return (
			<CommentBox nickname={comment.author.nickname} key={comment.id}>
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
				`http://127.0.0.1:8000/api/posts/` + id + `/join/`,
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

		await axios.delete('http://127.0.0.1:8000/api/posts/' + post.id + '/', {
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
				`http://127.0.0.1:8000/api/posts/` + id + `/comments/`,
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
				`http://127.0.0.1:8000/api/posts/` + id + `/doneregister/`,
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
					`http://127.0.0.1:8000/api/posts/` + id + `/done/`,
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

	//댓글 입력
	async function commentSubmit() {
		await axios.post(
			'http://127.0.0.1:8000/api/comments/',
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
		// window.scrollTo(0,document.body.scrollHeight);
	}
	//Get post by id & session storage
	async function getPost(postid) {
		try {
			// const token = 'Token ' + localStorage.getItem('user_token');
			const response = await axios.get(
				`http://127.0.0.1:8000/api/posts/` + postid,
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: token,
					},
				}
			);
			await setpost(response.data);
			console.log(response.data)

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
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<DetailStyle>
			{/* <SearchHeader /> */}
			<div className="body">
				<div className="top">
					<div className="left">
						<img src={post.image} alt="사진이 없습니다." />
					</div>
					<div className="right">
						<p className="category">{post.category}</p>
						<div className="titlesection">
							<div className="title-date">
								<div className="title">{post.title}</div>
								<div className="date">{post.pub_date}</div>
							</div>
							<div className="author">
								{post.author.image ? (
									<img
										src={''}
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
								<div className="type">품목</div> {post.item}
								<br />
								<div className="type">모집인원</div>{' '}
								{post.members.length}/{post.limit}
							</div>
							<div className="alpha">
								<div className="type">가격</div>{' '}
								{post.price ? post.price : '미정'}
								<br />
								<div className="type">마감기한</div>{' '}
								{post.deadline ? post.deadline : '미정'} <br />
								<div className="type">링크</div>{' '}
								{post.link ? post.link : '미정'}
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
									function2={'채팅방 입장'}
									secondText="채팅방 입장!"
								>
									참가하기!
								</ButtonGreenA>
							) : (
								<h2>마감되었어요 ㅠ</h2>
							)}

							{post.author.url ===
							JSON.parse(localStorage.userNow).url ? (
								''
							) : (
								<ButtonGray
									setPart={setPart}
									function1={join}
									id={post.id}
								>
									참가 취소
								</ButtonGray>
							)}
						</div>
					</div>
				</div>
				{post.done ? (
					<div className="done">거래가 완료되었습니다.</div>
				) : (
					<div className="textarea">{post.body} </div>
				)}
				<div className="btnsection">
					<ButtonWhite function1={() => done(post.id)}>
						구매완료
					</ButtonWhite>
					{post.author.url ===
					JSON.parse(localStorage.userNow).url ? (
						<>
							<Link to={{ pathname: '/Edit', post: post }}>
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
				{Part ? (
					<div className="commentsection">
						{commentBoxes}
						<div className="comment-sub">
							<form>
								<textarea
									name="comment"
									id=""
									cols="30"
									rows="10"
									placeholder="댓글 입력하기"
									onChange={handleCommentText}
								></textarea>
								<ButtonWhite function1={commentSubmit}>
									입력
								</ButtonWhite>
							</form>
						</div>
					</div>
				) : (
					''
				)}
			</div>
		</DetailStyle>
	);
};

export default withRouter(Detail);
