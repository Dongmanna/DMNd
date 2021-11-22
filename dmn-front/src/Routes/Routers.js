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
								<Route exact path="/Chatting">
									<Chatting />
								</Route>
								<Route path="/Detail">
									<Detail />
								</Route>
								<Route exact path="/Edit">
									<Edit />
								</Route>
								<Route exact path="/">
									<Home />
								</Route>
								<Route path="/Mypage">
									<Mypage />
								</Route>
								<Route path="/Result">
									<Result />
								</Route>
								<Route exact path="/Write">
									<Write />
								</Route>
							</>
						</Switch>
					</SwitchStyle>
				</>
			) : (
				<>
					<Route exact path="/">
						<Login setIsLogged={setIsLogged} />
					</Route>
					<Route exact path="/SignUp">
						<SignUp  setIsLogged={setIsLogged}/>
					</Route>
				</>
			)}
		</Router>
	);
};

export default Routers;