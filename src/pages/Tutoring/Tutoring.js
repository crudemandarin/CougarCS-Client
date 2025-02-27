import axios from 'axios';
import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import headerImage from '../../assets/tutoring.svg';
import discordIcon from '../../assets/icons/discord-icon.webp';
import { MetaData } from '../../components/Meta/MetaData';
import { useQuery, useQueryClient } from 'react-query';
import Loading from '../../components/Loading/Loading';
import './Tutoring.css';

const meta = {
	title: 'Tutoring',
	desc: 'Learn more about CougarCS Tutoring',
	url: 'https://cougarcs.com/tutoring',
	img: 'https://i.ibb.co/NTLFrdj/cougarcs-background11.jpg',
};

const url = `${process.env.REACT_APP_API_URL}/api/tutors`;

const fetchTutors = async () => {
	const res = await axios.get(url);
	return res.data.tutors;
};

const Tutoring = () => {
	const queryClient = useQueryClient();
	const { data, isFetching } = useQuery('tutors', fetchTutors, {
		initialData: () => queryClient.getQueryData('tutors'),
		staleTime: 300000,
	});

	const displayTutors = () => {
		return isFetching ? (
			<Loading />
		) : (
			data.map((val, i) =>
				val?.linkedin ? (
					<div key={i}>
						<a
							href={val.linkedin}
							rel='nofollow noopener noreferrer'
							target='_blank'
						>
							{val.name}
						</a>
					</div>
				) : (
					<div key={i}>{val.name}</div>
				)
			)
		);
	};

	return (
		<>
			<MetaData {...meta} />
			<Container fluid className='contained hero hero-tutoring'>
				<Row>
					<Col md='6' className='order-md-2'>
						<img src={headerImage} alt='undraw svg' className='img-fluid'></img>
					</Col>
					<Col md='6' className='order-md-0'>
						<div className='about-us'>
							<h1>Tutoring at CougarCS</h1>
							<p className='lead-text'>
								Our mission is to provide free peer-to-peer tutoring for all UH
								undergraduate students. We offer tutoring for a wide range of
								courses in the CS undergrad course catalogue, from 1000 level to
								3000! Visit our scheduled tutoring hours, email
								tutoring@cougarcs.com, or just shoot your question in our
								Discord chats to get help any time of day all from the
								convenience of your computer!
							</p>
							<div className='hero-ctas'>
								<div className='discord-button-wrapper'>
									<Button
										className='discord-button'
										href='https://discord.gg/rEuFP8ZgN9'
										target='_blank'
										rel='nofollow noopener'
									>
										<img src={discordIcon} alt='discord button logo' />
										Join Discord
									</Button>
								</div>
								<Button
									className='ghost-button'
									href='mailto:tutoring@cougarcs.com?subject=CougarCS Tutor Application'
								>
									Become a Tutor
								</Button>
							</div>
						</div>
					</Col>
				</Row>
			</Container>

			<Container fluid className='contained sub-section'>
				<h2 className='heading'>Courses Available</h2>
				<div className='classes-wrapper'>
					<div className='class-number'>General</div>
					<div className='class-number'>COSC 1306</div>
					<div className='class-number'>COSC 1430</div>
					<div className='class-number'>COSC 2430</div>
					<div className='class-number'>COSC 3320</div>
					<div className='class-number'>COSC 3360</div>
					<div className='class-number'>COSC 3380</div>
				</div>
			</Container>

			<Container fluid className='contained sub-section'>
				<h2 className='heading'>Special Thanks to Our Tutors</h2>
				<div className={isFetching ? 'fetching' : 'tutors-wrapper'}>
					{displayTutors()}
				</div>
				<div className='tutor-cta text-center'>
					<p>Interested in joining the team?</p>
					<p>
						<ul>
							<li>Free CougarCS Membership</li>
							<li>Develop Soft & Technical Skills</li>
							<li>Polish Resume</li>
							<li>Pathway to UH Peer Mentor Program</li>
							<li>Earn UH Accredited Volunteer Hours</li>
							<li>Earn CougarCS Member Points</li>
						</ul>
					</p>
					<Button
						className='ghost-button'
						href='mailto:tutoring@cougarcs.com?subject=CougarCS Tutor Application'
					>
						Become a Tutor
					</Button>
				</div>
			</Container>

			<Container fluid className='contained partners-wrapper'>
				<Row></Row>
			</Container>
		</>
	);
};

export default Tutoring;
