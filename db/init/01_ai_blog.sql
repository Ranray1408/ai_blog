--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text,
    phone text,
    message text,
    acceptence boolean DEFAULT false,
    session_id character varying(255)
);



--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: page_blocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_blocks (
    id integer NOT NULL,
    block_key text NOT NULL,
    "position" integer NOT NULL,
    data jsonb NOT NULL
);



--
-- Name: page_blocks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.page_blocks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- Name: page_blocks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.page_blocks_id_seq OWNED BY public.page_blocks.id;


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: page_blocks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_blocks ALTER COLUMN id SET DEFAULT nextval('public.page_blocks_id_seq'::regclass);


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, first_name, last_name, email, phone, message, acceptence, session_id) FROM stdin;
33	Test	Customer	email1@gmail.com	0000000000	First custmer	t	5cd7d237-720c-4006-ad62-6987d15ba754
34	SecondTest	Customer	email2@gmail.com	0000000000	Second custmer	t	9d9d59eb-59d4-4921-899d-52bdbb1d0423
\.


--
-- Data for Name: page_blocks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.page_blocks (id, block_key, "position", data) FROM stdin;
1	blog_info_block.json	1	{"blogsInfoData": {"blogInfoData1": {"svg": "CircleQuarter", "title": "Future Technology Blog", "columns": [{"columnText": "Over 1,000 articles on emerging tech trends and breakthroughs.", "columnTitle": "Quantity"}, {"columnText": "Articles cover fields like AI, robotics, biotechnology, and more.", "columnTitle": "Variety"}, {"columnText": "Fresh content added daily to keep you up to date.", "columnTitle": "Frequency"}, {"columnText": "Written by our team of tech experts and industry professionals.", "columnTitle": "Authoritative"}], "description": "Stay informed with our blog section dedicated to future technology."}, "blogInfoData2": {"svg": "TriangleFlag", "title": "Research Insights Blogs", "columns": [{"columnText": "500+ research articles for in-depth understanding.", "columnTitle": "Depth"}, {"columnText": "Visual aids and infographics to enhance comprehension.", "columnTitle": "Graphics"}, {"columnText": "Explore emerging trends in future technology research.", "columnTitle": "Trends"}, {"columnText": "Contributions from tech researchers and academics.", "columnTitle": "Contributors"}], "description": "Dive deep into future technology concepts with our research section."}}}
2	contacts_page_data.json	2	{"title": "Get in Touch with AI Podcasts", "inputs": [{"name": "first_name", "type": "text", "label": "First name", "required": true, "placeholder": "Enter First Name"}, {"name": "last_name", "type": "text", "label": "Last name", "required": true, "placeholder": "Enter Last Name"}, {"name": "email", "type": "email", "label": "Email", "required": true, "placeholder": "Enter your Email"}, {"name": "phone", "type": "text", "label": "Phone Number", "required": true, "placeholder": "Enter Phone Number"}, {"name": "message", "type": "textarea", "label": "Message", "required": true, "placeholder": "Enter your Message"}, {"name": "acceptence", "type": "checkbox", "label": "I agree with Terms of Use and Privacy Policy", "required": true, "defaultValue": false}], "svgIcons": "FourCircle"}
3	blog_info_block	1	{"blogsInfoData": {"blogInfoData1": {"svg": "CircleQuarter", "title": "Future Technology Blog", "columns": [{"columnText": "Over 1,000 articles on emerging tech trends and breakthroughs.", "columnTitle": "Quantity"}, {"columnText": "Articles cover fields like AI, robotics, biotechnology, and more.", "columnTitle": "Variety"}, {"columnText": "Fresh content added daily to keep you up to date.", "columnTitle": "Frequency"}, {"columnText": "Written by our team of tech experts and industry professionals.", "columnTitle": "Authoritative"}], "description": "Stay informed with our blog section dedicated to future technology."}, "blogInfoData2": {"svg": "TriangleFlag", "title": "Research Insights Blogs", "columns": [{"columnText": "500+ research articles for in-depth understanding.", "columnTitle": "Depth"}, {"columnText": "Visual aids and infographics to enhance comprehension.", "columnTitle": "Graphics"}, {"columnText": "Explore emerging trends in future technology research.", "columnTitle": "Trends"}, {"columnText": "Contributions from tech researchers and academics.", "columnTitle": "Contributors"}], "description": "Dive deep into future technology concepts with our research section."}}}
4	contacts_page_data	2	{"title": "Get in Touch with AI Podcasts", "inputs": [{"name": "first_name", "type": "text", "label": "First name", "required": true, "placeholder": "Enter First Name"}, {"name": "last_name", "type": "text", "label": "Last name", "required": true, "placeholder": "Enter Last Name"}, {"name": "email", "type": "email", "label": "Email", "required": true, "placeholder": "Enter your Email"}, {"name": "phone", "type": "text", "label": "Phone Number", "required": true, "placeholder": "Enter Phone Number"}, {"name": "message", "type": "textarea", "label": "Message", "required": true, "placeholder": "Enter your Message"}, {"name": "acceptence", "type": "checkbox", "label": "I agree with Terms of Use and Privacy Policy", "required": true, "defaultValue": false}], "svgIcons": "FourCircle"}
28	title_links_block	11	{"text": "Immerse yourself in the world of future technology. Explore our comprehensive resources, connect with fellow tech enthusiasts, and drive innovation in the industry. Join a dynamic community of forward-thinkers.", "links": [{"url": "/", "text": "Visitors can access a wide range of resources, including ebooks, whitepapers, reports.", "title": "Resource Access"}, {"url": "/", "text": "Join our active community forum to discuss industry trends, share insights, and collaborate with peers.", "title": "Community Forum"}, {"url": "/", "text": "Stay updated on upcoming tech events, webinars, and conferences to enhance your knowledge.", "title": "Tech Events"}], "title": "Be Part of the Future Tech Revolution", "grayText": "Learn, Connect, and Innovate"}
7	download_blocks	4	{"downloadBlock1": {"svg": "DividedTarget", "text": "Explore our collection of ebooks covering a wide spectrum of future technology topics.", "title": "Ebooks", "imageUrl": "/images/donwlodBlock1Image.png", "rightTitle": "Variety of Topics", "buttonText1": "Download Whitepapers Now", "buttonText2": "Preview", "innersBlocks": [{"innerText": "Over 100 ebooks", "innerTitle": "Total Ebooks"}, {"innerText": "PDF format for access.", "innerTitle": "Download Formats"}, {"innerText": "Ebooks are authored by renowned experts with an average of 15 years of experience", "innerTitle": "Average Author Expertise"}], "blockStatistic": {"text": "Downloaded By", "text2": "+ Users", "downloadUsersCount": 10000}, "rightDescription": "Topics include AI in education (25%), renewable energy (20%), healthcare (15%), space exploration (25%), and biotechnology (15%)."}, "downloadBlock2": {"svg": "DividedTarget", "text": "Explore our collection of ebooks covering a wide spectrum of future technology topics.", "title": "Ebooks", "imageUrl": "/images/donwlodBlock2Image.png", "rightTitle": "Variety of Topics", "buttonText1": "Download Whitepapers Now", "buttonText2": "Preview", "innersBlocks": [{"innerText": "Over 100 ebooks", "innerTitle": "Total Ebooks"}, {"innerText": "PDF format for access.", "innerTitle": "Download Formats"}, {"innerText": "Ebooks are authored by renowned experts with an average of 15 years of experience", "innerTitle": "Average Author Expertise"}], "blockStatistic": {"text": "Downloaded By", "text2": "+ Users", "downloadUsersCount": 10000}, "rightDescription": "Topics include AI in education (25%), renewable energy (20%), healthcare (15%), space exploration (25%), and biotechnology (15%)."}}
8	footer_data	5	{"footerMenus": [{"menuName": "Home", "menuItems": [{"isNew": false, "itemUrl": "/", "itemName": "Features"}, {"isNew": false, "itemUrl": "/", "itemName": "Blogs"}, {"isNew": true, "itemUrl": "/", "itemName": "Resources"}, {"isNew": false, "itemUrl": "/", "itemName": "Testimonials"}, {"isNew": false, "itemUrl": "/", "itemName": "Contact Us"}, {"isNew": false, "itemUrl": "/", "itemName": "Newsletter"}]}, {"menuName": "News", "menuItems": [{"isNew": false, "itemUrl": "/", "itemName": "Trending Stories"}, {"isNew": false, "itemUrl": "/", "itemName": "Featured Videos"}, {"isNew": true, "itemUrl": "/", "itemName": "Technology"}, {"isNew": false, "itemUrl": "/", "itemName": "Health"}, {"isNew": false, "itemUrl": "/", "itemName": "Politics"}, {"isNew": false, "itemUrl": "/", "itemName": "Environment"}]}, {"menuName": "Blogs", "menuItems": [{"isNew": false, "itemUrl": "/", "itemName": "Quantum Computing"}, {"isNew": false, "itemUrl": "/", "itemName": "AI Ethics"}, {"isNew": false, "itemUrl": "/", "itemName": "Space Exploration"}, {"isNew": true, "itemUrl": "/", "itemName": "Biotechnology"}, {"isNew": false, "itemUrl": "/", "itemName": "Renewable Energy"}, {"isNew": false, "itemUrl": "/", "itemName": "Biohacking"}]}, {"menuName": "Podcasts", "menuItems": [{"isNew": false, "itemUrl": "/", "itemName": "AI Revolution"}, {"isNew": false, "itemUrl": "/", "itemName": "AI Revolution"}, {"isNew": false, "itemUrl": "/", "itemName": "TechTalk AI"}, {"isNew": false, "itemUrl": "/", "itemName": "AI Conversations"}]}, {"menuName": "Resources", "menuItems": [{"isNew": false, "itemUrl": "/", "itemName": "Whitepapers"}, {"isNew": false, "itemUrl": "/", "itemName": "Ebooks"}, {"isNew": false, "itemUrl": "/", "itemName": "Reports"}, {"isNew": false, "itemUrl": "/", "itemName": "Research Papers"}]}], "footerBottomInfo": {"ps": "© 2024 FutureTech. All rights reserved.", "policy": [{"itemUrl": "/", "itemName": "Terms & Conditions"}, {"itemUrl": "/", "itemName": "Privacy Policy"}], "socials": [{"socialId": 1, "socialUrl": "/", "socialIcon": "Twitter"}, {"socialId": 2, "socialUrl": "/", "socialIcon": "Spotify"}, {"socialId": 3, "socialUrl": "/", "socialIcon": "Linkedin"}]}}
11	link_blocks	8	{"linkBlocks": [{"svg": "<svg className=\\"windrose\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"50\\" height=\\"50\\" viewBox=\\"0 0 50 50\\" fill=\\"none\\"><path d=\\"M28.9275 34.4167H21.1219V50H28.9275V34.4167Z\\" fill=\\"#FFD11A\\" /><path d=\\"M28.9275 0H21.1219V15.5833H28.9275V0Z\\" fill=\\"#FFD11A\\" /><path d=\\"M34.4097 21.0945V28.9001H49.993V21.0945H34.4097Z\\" fill=\\"#FFD11A\\" /><path d=\\"M0 21.1016L0 28.9072H15.5833V21.1016H0Z\\" fill=\\"#FFD11A\\" /><path d=\\"M34.4245 28.8769L28.9052 34.3962L39.9241 45.4151L45.4434 39.8958L34.4245 28.8769Z\\" fill=\\"#404040\\" /><path d=\\"M10.0906 4.54558L4.57129 10.0649L15.5903 21.0839L21.1096 15.5646L10.0906 4.54558Z\\" fill=\\"#404040\\" /><path d=\\"M28.886 15.5885L34.4053 21.1078L45.4243 10.0888L39.9049 4.56949L28.886 15.5885Z\\" fill=\\"#404040\\" /><path d=\\"M4.55724 39.9197L10.0765 45.439L21.0955 34.4201L15.5762 28.9008L4.55724 39.9197Z\\" fill=\\"#404040\\" /></svg>", "url": "#", "text": "Over 1,000 articles published monthly", "title": "Latest News Updates", "suptitle": "Stay Current"}, {"svg": "<svg className=\\"mandala-symbol\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"41\\" height=\\"40\\" viewBox=\\"0 0 41 40\\" fill=\\"none\\"><path d=\\"M20.3335 30C20.3335 35.5228 24.8106 40 30.3335 40C35.8563 40 40.3335 35.5228 40.3335 30C40.3335 24.4772 35.8563 20 30.3335 20H20.3335V30Z\\" fill=\\"#FFD11A\\" /><path d=\\"M20.3335 10C20.3335 4.47715 15.8563 0 10.3335 0C4.81065 0 0.333496 4.47715 0.333496 10C0.333496 15.5228 4.81065 20 10.3335 20H20.3335V10Z\\" fill=\\"#FFD11A\\" /><path fillRule=\\"evenodd\\" clipRule=\\"evenodd\\" d=\\"M30.3335 0C24.8106 0 20.3335 4.47715 20.3335 10V20H30.3335C35.8563 20 40.3335 15.5228 40.3335 10C40.3335 4.47715 35.8563 0 30.3335 0ZM35.3335 10C35.3335 12.7614 33.0949 15 30.3335 15C27.5721 15 25.3335 12.7614 25.3335 10C25.3335 7.23858 27.5721 5 30.3335 5C33.0949 5 35.3335 7.23858 35.3335 10Z\\" fill=\\"#404040\\" /><path fillRule=\\"evenodd\\" clipRule=\\"evenodd\\" d=\\"M10.3335 40C15.8563 40 20.3335 35.5228 20.3335 30V20H10.3335C4.81065 20 0.333496 24.4772 0.333496 30C0.333496 35.5228 4.81065 40 10.3335 40ZM15.3335 30C15.3335 32.7614 13.0949 35 10.3335 35C7.57207 35 5.3335 32.7614 5.3335 30C5.3335 27.2386 7.57207 25 10.3335 25C13.0949 25 15.3335 27.2386 15.3335 30Z\\" fill=\\"#404040\\" /></svg>", "url": "#", "text": "50+ renowned AI experts on our team", "title": "Expert Contributors", "suptitle": "Trusted Insights"}, {"svg": "<svg className=\\"dual-halves\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"41\\" height=\\"40\\" viewBox=\\"0 0 41 40\\" fill=\\"none\\"><path d=\\"M0.666748 0H20.6667C31.7124 0 40.6667 8.95431 40.6667 20H20.6667C9.62105 20 0.666748 11.0457 0.666748 0Z\\" fill=\\"#FFD11A\\" /><path d=\\"M0.666748 20H20.6667C31.7124 20 40.6667 28.9543 40.6667 40H20.6667C9.62105 40 0.666748 31.0457 0.666748 20Z\\" fill=\\"#404040\\" /></svg>", "url": "#", "text": "2 million monthly readers", "title": "Global Readership", "suptitle": "Worldwide Impact"}]}
9	header_data	6	{"headerText": "Subscribe to our Newsletter For New & latest Blogs and Resources", "navigation": [{"href": "/", "label": "Home"}, {"href": "/news", "label": "News"}, {"href": "/podcast", "label": "Podcast"}, {"href": "/resources", "label": "Resources"}, {"href": "/contacts", "label": "Contacts"}], "contactButtonText": "Contact Us"}
10	hero_banner	7	{"title": "Explore the Frontiers of Artificial Intelligence ", "uptitle": "Your Journey to Tomorrow Begins Here", "suptitle": "Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a world where machines think, learn, and reshape the future. Join us on this visionary expedition into the heart of AI.", "infoTitle": "Explore 1000+ resources", "infotText": "Over 1,000 articles on emerging tech trends and breakthroughs.", "buttonText": "Explore Resources", "statistics": [{"title": "Resources available", "value": "300"}, {"title": "Total Downloads", "value": "12k"}, {"title": "Active Users", "value": "10k"}]}
76	members_list	9	[{"id": 1, "photo": "", "title": "The Quantum Leap in Computing", "fullName": "John Techson", "position": "Quantum Computing", "likesCount": 25500, "commentsCount": 50, "messagesCount": 20, "shortDescription": "Explore the revolution in quantum computing, its applications, and its potential impact on various industries."}, {"id": 2, "photo": "", "title": "The Ethical Dilemmas of AI", "fullName": "Sarah Ethicist", "position": "AI Ethics", "likesCount": 32000, "commentsCount": 72, "messagesCount": 18, "shortDescription": "A deep dive into ethical challenges posed by AI, including bias, privacy, and transparency."}, {"id": 3, "photo": "", "title": "Web Development Expert", "fullName": "John Duo", "position": "Web Development", "likesCount": 20000, "commentsCount": 31, "messagesCount": 12, "shortDescription": "Exploring cool web UI/UX technologies."}, {"id": 4, "photo": "", "title": "The Mars Colonization Challenge", "fullName": "Astronomer X", "position": "Space Exploration", "likesCount": 20000, "commentsCount": 31, "messagesCount": 12, "shortDescription": "Exploring the technical and logistical challenges of human colonization on Mars."}, {"id": 5, "photo": "", "title": "Revolutionizing Medicine with Biotechnology", "fullName": "Alice Biotech", "position": "Biotechnology", "likesCount": 18500, "commentsCount": 41, "messagesCount": 15, "shortDescription": "Exploring the latest advancements in biotechnology, from gene editing to personalized medicine."}, {"id": 6, "photo": "", "title": "The Future of Biotech in Healthcare", "fullName": "David Greenfield", "position": "Biotechnology", "likesCount": 21000, "commentsCount": 56, "messagesCount": 22, "shortDescription": "How biotechnology is shaping the future of healthcare with innovative treatments and therapies."}, {"id": 7, "photo": "", "title": "Solar Energy: A Sustainable Future", "fullName": "Linda Solar", "position": "Renewable Energy", "likesCount": 24000, "commentsCount": 62, "messagesCount": 25, "shortDescription": "Discover the transformative potential of solar energy and its role in combating climate change."}, {"id": 8, "photo": "", "title": "Harnessing Wind Energy for a Greener World", "fullName": "Ethan Windmill", "position": "Renewable Energy", "likesCount": 29000, "commentsCount": 75, "messagesCount": 28, "shortDescription": "The potential of wind energy in the global shift towards sustainable power solutions."}, {"id": 9, "photo": "", "title": "The Evolution of Green Energy Solutions", "fullName": "Mia Ecoheart", "position": "Renewable Energy", "likesCount": 26500, "commentsCount": 54, "messagesCount": 19, "shortDescription": "A look into the growing industry of renewable energy, including wind, solar, and hydroelectric power."}, {"id": 10, "photo": "", "title": "Building a Sustainable Future with Clean Energy", "fullName": "Mark Greenstein", "position": "Renewable Energy", "likesCount": 23000, "commentsCount": 48, "messagesCount": 14, "shortDescription": "Innovative ways clean energy is transforming industries and reducing our carbon footprint."}, {"id": 11, "photo": "", "title": "The Promise of CRISPR in Genetic Engineering", "fullName": "Sophia BioTech", "position": "Biotechnology", "likesCount": 19500, "commentsCount": 36, "messagesCount": 13, "shortDescription": "How gene editing tools like CRISPR are revolutionizing medical treatments and agricultural practices."}, {"id": 12, "photo": "", "title": "Sustainable Agriculture through Biotechnology", "fullName": "Oscar Greenleaf", "position": "Biotechnology", "likesCount": 21000, "commentsCount": 49, "messagesCount": 16, "shortDescription": "The role of biotechnology in creating sustainable farming practices and ensuring food security."}]
77	title_blocks_data	10	{"titleBlocksData": {"titleBlock1": {"title": "FutureTech Features", "uptitle": "Unlock the Power of", "linkHref": "", "linkText": ""}, "titleBlock2": {"title": "FutureTech Features", "uptitle": "Unlock the Power of", "linkHref": "", "linkText": ""}, "titleBlock3": {"title": "FutureTech Features", "uptitle": "Unlock the Power of", "linkHref": "/", "linkText": "View All Blogs"}, "titleBlock4": {"title": "FutureTech Features", "uptitle": "Unlock the Power of", "linkHref": "/", "linkText": "View All Blogs"}}}
\.


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 34, true);


--
-- Name: page_blocks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.page_blocks_id_seq', 78, true);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: page_blocks page_blocks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_blocks
    ADD CONSTRAINT page_blocks_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

