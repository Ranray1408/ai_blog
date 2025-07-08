import React, { useState } from 'react';
import Container from '../Container/Container';
import styled from '@emotion/styled';
import RenderForm from '../RenderForm/RenderForm';
import { useFetchData } from '@/Helpers/custom-hooks';
import { IContactsPageDataAPI, IFormFieldsName } from '@/interfaces';
import { fetchContactsPage } from '@/store/contactsPageSlice';
import { SVG_COMPONENTS } from '@/Helpers/single-func';
import Typography from '../Typography/Typography';
import API_ENDPOINTS from '@/app/config/APIs';
import { useDispatch } from 'react-redux';
import { setSessionId } from '@/store/userChatSlice';

const ContactFormWrapper = styled.section`
	border-bottom: 1px solid ${props => props.theme.colors.borderColor};

	.container {
		display: flex;

		@media screen and (max-width: 1200px) {
			flex-direction: column;
		}
	}

	.title-wrapper {
		max-width: 600px;
		padding-bottom: 80px;
		padding-top: 80px;
		padding-right: 80px;
		border-right: 1px solid ${props => props.theme.colors.borderColor};
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;

		.four-circle {
			margin-bottom: 58px;
		}
	}

	.form-wrapper {
		padding-bottom: 80px;
		padding-top: 80px;
		padding-left: 80px;
		max-width: 917px;
		width: 100%;

		@media screen and (max-width: 1200px) {
			padding-left: 0;
			padding-top: 0;
		}

		form {
			width: 100%;
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 70px 50px;

			@media screen and (max-width: 570px) {
				display: flex;
				flex-direction: column;
				gap: 50px;
			}

			.form-column {
				label {
					position: relative;
					// margin-bottom: 30px;

					.label-text {
						display: inline-block;
						margin-bottom: 16px;
					}

					.invalid-message {
						position: absolute;
						bottom: -30px;
						left: 0;
					}
				}

				&.message {
					grid-column: span 2;
					height: 163px;

					textarea {
						height: 100%;
						resize: none;
					}
				}

				&.acceptence {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.checkbox{
						display: flex;
						align-items: center;
						flex-direction: row;
						gap: 10px;

						.label-text {
							margin-bottom: 0;
						}
					}
				}
			}

			.submit-button {
				margin-left: auto;
				width: 137px;
				height: 60px;
				${props => props.theme.buttons.yellowBtn}

				@media screen and (max-width: 570px) {
					width: 100%;
				}
			}
		}
	}

	.contact-form {
		label {
			display: flex;
			flex-direction: column;

			span {
				font-size: 18px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.5;
				letter-spacing: normal;
				color: #fff;
				margin-bottom: 16px;
			}
		}
	}

	.inputs-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 50px;
	}
`;



const ContactForm = () => {
	const [serverMessage, setServerMessage] = useState<string | null>(null);
	const { title, svgIcons, inputs } = useFetchData<IContactsPageDataAPI>({
		reducer: 'contactsPageState',
		fetchAction: fetchContactsPage
	});
	const dispatch = useDispatch();

	const SvgComponent = SVG_COMPONENTS[svgIcons] || (() => null);

	const onSubmit = async (data: IFormFieldsName) => {

		try {
			const repJSON = await fetch(API_ENDPOINTS.CUSTOMERS, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			const response = await repJSON.json();

			if (response.success) {
				console.log('response', response);

				if (response.customer.session_id) {
					dispatch(setSessionId(response.customer.session_id))
				}

				setServerMessage("Your message was accepted, we will contact you soon!");
			} else {
				setServerMessage(response.message || "Something went wrong...");
			}
		} catch (error) {
			console.error('Error during form submit', error);
			setServerMessage("Server error. Please try again later.");
		}
	}

	return (
		<ContactFormWrapper>
			<Container>
				<div className="title-wrapper">
					{SvgComponent && <SvgComponent />}
					<Typography className='title' type='h2'>{title}</Typography>
				</div>
				<div className="form-wrapper">
					<RenderForm<IFormFieldsName>
						fields={inputs}
						onSubmit={onSubmit}
					/>
					{serverMessage && (
						<p style={{ marginTop: '20px', color: '#18cf2d', fontWeight: 'bold' }}>
							{serverMessage}
						</p>
					)}
				</div>
			</Container>
		</ContactFormWrapper>
	);
};

export default ContactForm;
