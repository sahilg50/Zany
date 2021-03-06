import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Logo from './LoadingPageLogo.png';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import Header from './components/Header';
import SignInAndSignUpPage from './pages/SignInAndSignUpPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, createUserProfileDocument } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, resetUser } from './redux/user/user';
import Seller from './pages/Seller/Seller';
import axios from 'axios';
import { SetCartitems, ResetCart } from './redux/cart/cart';
import OrderPage from './pages/OrderPage';
import Merchant from './pages/MERCHANT/Merchant';
import { selectCurrentMerchant } from './redux/merchant/merchant.reducer';
import SellerProductsPage from './pages/Seller/SellerProductsPage';

const App = () => {
	const [user, loading] = useAuthState(auth);
	const dispatch = useDispatch();
	const [retrievedCartItems, setRetrievedCartItems] = useState([]);

	const Fetch_User = async (userDetails) => {
		try {
			const response = await axios({
				method: 'post',
				url: 'http://localhost:4000/',
				data: userDetails,
				responseType: 'json',
			});
			console.log(response.data);
		} catch (error) {
			console.log('User fetch error');
		}
	};

	const Retrieve_Cart_Items = async () => {
		try {
			const response = await axios({
				method: 'get',
				url: 'http://localhost:4000/retrieve_cart_items',
				responseType: 'json',
			});
			console.log(response.data);
			setRetrievedCartItems(response.data);
		} catch (error) {
			console.log('cart Items cannot be retrieved');
		}
	};

	useEffect(() => {
		if (user) {
			const userDetails = {
				userName: user.displayName,
				userEmail: user.email,
				userId: user.uid,
			};
			Fetch_User(userDetails);

			createUserProfileDocument(user);

			dispatch(resetUser());

			dispatch(
				setCurrentUser({
					currentUser: user,
				})
			);

			dispatch(ResetCart());
			Retrieve_Cart_Items();
		}
	}, [user, dispatch]);

	const tempCart = [];
	retrievedCartItems.map((item) =>
		tempCart.push({
			id: item.productid,
			name: item.productName,
			price: item.productPrice,
			imageUrl: item.productImage,
			quantity: item.Quantity,
		})
	);
	dispatch(SetCartitems({ CartItems: tempCart }));

	var merchant = useSelector(selectCurrentMerchant);
	// var merchant = true;

	if (loading) {
		return (
			<LoadContainer>
				<img src={Logo} alt="" />
			</LoadContainer>
		);
	}

	return (
		<div className="App">
			<Switch>
				<Route
					exact
					path="/"
					render={() =>
						user ? (
							<div>
								<HomePage />
							</div>
						) : (
							<Redirect to="/signin" />
						)
					}
				/>
				<Route
					path="/shop"
					render={() =>
						user ? (
							<div>
								<Header />
								<ShopPage />
							</div>
						) : (
							<Redirect to="/signin" />
						)
					}
				/>
				<Route
					exact
					path="/signin"
					render={() =>
						user ? (
							<Redirect to="/" />
						) : (
							<div>
								<Header />
								<SignInAndSignUpPage />
							</div>
						)
					}
				/>
				<Route
					exact
					path="/checkout"
					render={() =>
						user ? (
							<div>
								<Header />
								<CheckoutPage />
							</div>
						) : (
							<Redirect to="/signin" />
						)
					}
				/>

				<Route
					exact
					path="/orders"
					render={() =>
						user ? (
							<div>
								<Header />
								<OrderPage />
							</div>
						) : (
							<Redirect to="/signin" />
						)
					}
				/>

				<Route
					exact
					path="/seller_homepage"
					render={() =>
						merchant ? (
							<div>
								<Header />
								<Seller />
							</div>
						) : (
							<Redirect to="/seller_login" />
						)
					}
				/>

				<Route
					exact
					path="/seller_login"
					render={() =>
						user ? (
							<Redirect to="/" />
						) : merchant ? (
							<Redirect to="/seller_homepage" />
						) : (
							<div>
								<Header />
								<Merchant />
							</div>
						)
					}
				/>

				<Route
					exact
					path="/seller_homepage/my_products"
					render={() =>
						merchant ? <SellerProductsPage /> : <Redirect to="/seller_login" />
					}
				/>

				<Route
					path="/"
					render={() =>
						true ? (
							<div>
								<h1>404 Page Not found! </h1>
								<Link to="/">Take be back</Link>
							</div>
						) : null
					}
				/>
			</Switch>
		</div>
	);
};

export default App;

const LoadContainer = styled.div`
	display: flex;
	height: 100vh;
	width: 100vw;
	justify-content: center;
`;

// const Load = styled.h1`
// 	font-size: 150px;
// 	letter-spacing: 30px;
// 	margin-bottom: 50px;
// `;

/* 
Seller
SearchBar
DropDown
Price Filtering
SHOP Page
*/
