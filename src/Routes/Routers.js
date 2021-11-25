import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route} from "react-router-dom";
import Chatting from "./Chatting";
import Detail from "./Detail";
import Edit from "./Edit";
import Home from "./Home";
import Login from "./Login";
import Mypage from "./Mypage";
import Result from "./Result";
import Write from "./Write";
import SignUp from "./SignUp"
import ScrollToTop from "../Componenets/ScrollToTop";
import Header from "../Componenets/Header";
import styled from "styled-components";
const SwitchStyle =styled.div`
	/* padding:0 8%; */
`

function Routers() {
    const [isLogged,setIsLogged] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("user_token")){
            setIsLogged(true);
        }        
    }, [])
    return (
		<Router>
			<ScrollToTop />
			{isLogged ? (
				<>
					<Header s={true} setIsLogged={setIsLogged} />
					<SwitchStyle>
						<Switch>
							<>
								<Route exact path="/chatting">
									<Chatting />
								</Route>
								<Route  path="/detail">
									<Detail />
								</Route>
								<Route  path="/edit">
									<Edit />
								</Route>
								<Route exact path="/">
									<Home />
								</Route>
								<Route path="/mypage">
									<Mypage />
								</Route>
								<Route path="/result">
									<Result />
								</Route>
								<Route 	path="/write">
									<Write />
								</Route>
							</>
						</Switch>
					</SwitchStyle>
					{/* <Footer/> */}
				</>
			) : (
				<>
					<Route exact path="/">
						<Login setIsLogged={setIsLogged} />
					</Route>
					<Route exact path="/signUp">
						<SignUp  setIsLogged={setIsLogged}/>
					</Route>
				</>
			)}
		</Router>
	);
};

export default Routers;