import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Orders from '../components/Orders';

const OrderPage = () => {
	const [orderIds, setOrderIds] = useState(null);

	const Fetch_OrderIds = async () => {
		try {
			const response = await axios({
				method: 'get',
				url: 'http://localhost:4000/get_distinct_orders',
				responseType: 'json',
			});
			console.log(response.data);
			setOrderIds(response.data);
		} catch (error) {
			console.log('Order IDs Cannot Be Fetched');
		}
	};

	useEffect(() => {
		Fetch_OrderIds();
	}, []);

	return (
		<CheckoutPageContainer>
			{orderIds ? (
				<Main>
					<CheckoutHeaderContainer>
						<HeaderBlockContainer>
							<span>Product</span>
						</HeaderBlockContainer>
						<HeaderBlockContainer>
							<span>Description</span>
						</HeaderBlockContainer>
						<HeaderBlockContainer>
							<span>Total Quantity</span>
						</HeaderBlockContainer>
						<HeaderBlockContainer>
							<span>Total Price</span>
						</HeaderBlockContainer>
						<HeaderBlockContainer>
							<span>Date Ordered</span>
						</HeaderBlockContainer>
					</CheckoutHeaderContainer>

					{Object.keys(orderIds).map(function (key) {
						// console.log(orderIds[key]);
						return (
							<Orders key={orderIds[key].orderId} OrderId={orderIds[key]} />
						);
					})}
				</Main>
			) : (
				<h1>NO ORDERS</h1>
			)}
		</CheckoutPageContainer>
	);
};

export default OrderPage;

const CheckoutPageContainer = styled.div`
	width: 55%;
	min-height: 90vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 50px auto 0;
	button {
		margin-left: auto;
		margin-top: 50px;
	}
	overflow-x: hidden;
`;
const Main = styled.div`
	width: 100%;
`;

const CheckoutHeaderContainer = styled.div`
	margin-top: 72px;
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid darkgrey;
`;

const HeaderBlockContainer = styled.div`
	text-transform: capitalize;
	width: 23%;
	&:last-child {
		width: 8%;
	}
`;