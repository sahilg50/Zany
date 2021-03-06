import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Brands() {
	const [categories, setCategories] = useState([]);

	const Fectch_Brand = async () => {
		try {
			const response = await axios.get(`http://localhost:4000/top_brands`);
			console.log(response.data);
			setCategories(response.data);
		} catch (error) {
			console.log('Directory request error');
		}
	};

	useEffect(() => {
		Fectch_Brand();
	}, []);
	return (
		<Container>
			<h2>TOP BRANDS</h2>
			<Content>
				{categories &&
					categories.map(({ brandid, brandname, brandUrl }) => (
						<Wrap key={brandid}>
							<Link to={`/shop/` + brandname}>
								<img src={brandUrl} alt={brandname} />
							</Link>
						</Wrap>
					))}
			</Content>
		</Container>
	);
}

export default Brands;

const Container = styled.div`
	padding: 0 30px 30px 30px;
	width: 100vw;
`;

const Content = styled.div`
	display: grid;
	grid-gap: 25px;
	gap: 25px;
	grid-template-columns: repeat(5, minmax(0, 1fr));
	@media (max-width: 768px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

const Wrap = styled.div`
	padding-top: 56.25%;
	box-shadow: rgb(0 0 0 / 10%) 0px 5px 5px 0px;
	cursor: pointer;
	overflow: hidden;
	position: relative;
	transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
	border: 1px solid rgba(249, 249, 249, 0.1);
	img {
		inset: 0px;
		display: block;
		height: 100%;
		object-fit: contain;
		opacity: 1;
		position: absolute;
		transition: opacity 500ms ease-in-out 0s;
		width: 100%;
		z-index: 1;
		top: 0;
	}
	&:hover {
		box-shadow: rgb(0 0 0 / 10%) 0px 10px 7px 0px,
			rgb(0 0 0 / 10%) 0px 10px 7px 0px;
		transform: scale(1.04);
		border-color: rgba(249, 249, 249, 0.3);
	}
`;
