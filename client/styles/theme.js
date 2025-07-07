const colors = {
	black: '#141414',
	dark: '#1a1a1a',
	dark2: '#666',
	dark3: '#7e7e81',
	dark4: '#98989a',
	dark5: '#333333',
	yellow: '#ffd119',
	white: '#fff',
	borderColor : '#262626'
}

const fontFamilies = {
	main: 'Outfit, sans-serif',
	second: 'KumbhSans, sans-serif',
}

const adaptiveMedia = {
	dekstop: 'screen and (max-width: 1200px)',
	tablet: 'screen and (max-width: 1024px)',
	mobile: 'screen and (max-width: 768px)',
	s_small: 'screen and (max-width: 670px)',
	x_small: 'screen and (max-width: 470px)',
}


const heading = `
	font-family: ${fontFamilies.main};
    font-style: normal;
    font-weight: 500;
    line-height: 1.2;
    color: ${colors.white};
    padding: 0;
`;

const buttons = {
	yellowBtn: `
		cursor: pointer;
		line-height: 1.5;
		padding: 14px 20px;
		font-size: 18px;
		color: ${colors.black};
		border-radius: 10px;
		border:1px solid ${colors.yellow};
		background-color: ${colors.yellow};
		align-self: center;

		@media ${adaptiveMedia.desktop} {
			padding: 10px 14px;
			border-radius: 6px;
			font-size: 14px;
		}

		&:hover {
			background-color: transparent;
			color: ${colors.white};
		}`
};

const theme = {
	colors: { ...colors },
	fonts: {...fontFamilies},
	adaptiveMedia: { ...adaptiveMedia },
	buttons: {...buttons},
	h1: `
		${heading}
		font-size: 70px;
		letter-spacing: -2.1px;
		font-family: ${fontFamilies.second};
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.2;
		letter-spacing: -2.1px;
		text-align: left;
		color: #fff;

		@media screen and (max-width: 1270px) {
	        font-size: 55px;
	    }
		@media screen and (max-width: 920px) {
	        font-size: 40px;
	    }
		@media screen and (max-width: 480px) {
	        font-size: 30px;
	    }
	`,
	h2: `
		${heading}
		font-size: 58px;
		line-height: 1.3;
  		letter-spacing: -1.74px;

		@media screen and (max-width: 1270px) {
	        font-size: 44px;
	    }
		@media screen and (max-width: 920px) {
	        font-size: 38px;
	    }
		@media screen and (max-width: 480px) {
	        font-size: 36px;
	    }
	`,
	h3: `
		${heading}
		font-size: 40px;
		line-height: 1.5;
		font-family: ${fontFamilies.second};
  		letter-spacing: -1.2px;

		@media screen and (max-width: 1270px) {
	        font-size: 30px;
	    }
		@media screen and (max-width: 920px) {
	        font-size: 28px;
	    }
		@media screen and (max-width: 570px) {
	        font-size: 24px;
	    }
	`,
	h4: `
		${heading}
		font-size: 26px;
		font-weight: 600;
		line-height: 1.5;
		letter-spacing: -0.78px;

		@media screen and (max-width: 1270px) {
	        font-size: 22px;
	    }
		@media screen and (max-width: 920px) {
	        font-size: 18px;
	    }
	`,
	h5: `
		${heading}
		font-size: 24px;
		font-weight: 600;
		line-height: 1.5;
		letter-spacing: -0.78px;

		@media screen and (max-width: 1270px) {
	        font-size: 20px;
	    }
		@media screen and (max-width: 920px) {
	        font-size: 16px;
	    }
	`,
}

export default theme;
