import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import {SinglePost} from './pages/SinglePost'
import MenuBar from './components/MenuBar';

import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRouter';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { RecoverPassword } from './pages/RecoverPassword';
import { ResetPassword } from './pages/ResetPassword';



function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
				<MenuBar/>
				<Route exact path='/' component={Home}/>
				<AuthRoute exact path='/login' component={Login}/>
				<AuthRoute exact path='/register' component={Register}/>
				<Route exact path='/post/:postId' component={SinglePost}/>
				<Route exact path='/recover' component={RecoverPassword}/>
				<Route exact path='/reset/:resetId' component={ResetPassword}/>

				</Container>
			</Router>
		</AuthProvider>
	);
	}

export default App;
