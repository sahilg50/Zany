import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const MenuItem = ({ title, imageUrl, history, size, linkUrl, match }) => {
	return (
		<MenuItemContainer
			size={size}
			onClick={() => history.push(`${match.url}${linkUrl}`)}
		>
			<BackgroundImageContainer
				className="background-image"
				imageUrl={imageUrl}
			/>
			<ContentContainer className="content">
				<ContentTitle>{title.toUpperCase()}</ContentTitle>
				<ContentSubtitle>SHOP NOW</ContentSubtitle>
			</ContentContainer>
		</MenuItemContainer>
	);
};

export default withRouter(MenuItem);

const MenuItemContainer = styled.div`
	height: ${(props) => (props.size ? '380px' : '240px')};
	min-width: 30%;
	overflow: hidden;
	flex: 1 1 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 3px solid rgba(249, 249, 249, 0.1);
	margin: 0 7.5px 15px;
	overflow: hidden;
	position: relative;
	&:hover {
		cursor: pointer;
		& .background-image {
			transform: scale(1.1);
			transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
		}
		& .content {
			opacity: 0.9;
		}
	}
	&:first-child {
		margin-right: 7.5px;
	}
	&:last-child {
		margin-left: 7.5px;
	}
`;

const BackgroundImageContainer = styled.div`
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
	background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

const ContentContainer = styled.div`
	height: 90px;
	padding: 0 25px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 1px solid black;
	background-color: white;
	opacity: 0.7;
	position: absolute;
	&:hover {
		color: #fdb302;
	}
`;

const ContentTitle = styled.span`
	margin-bottom: 6px;
	font-size: 22px;
	color: #4a4a4a;
`;

const ContentSubtitle = styled.span`
	font-weight: lighter;
	font-size: 16px;
`;
