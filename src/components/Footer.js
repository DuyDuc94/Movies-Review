import { } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row } from "react-bootstrap";
import FooterStyle from './css/Footer.module.css';

export default function Footer(params) {
	return (
		<Container className={FooterStyle.footer}>
			<hr/>
			<Row>
				<Col md={6}>
					<h5>
						About us
					</h5>
					<p>
						An project for learning FER201m course in FPT University <br />
						Language: ReactJS...
					</p>
				</Col>
				<Col md={4} className={FooterStyle.contact_link}>
					<h5>
						Contact Links
					</h5>
					<ul>
						<li>
							<a href="https://facebook.com/duyduclh">
								<FontAwesomeIcon />Facebook
							</a>
						</li>
						<li>
							<a href="https://github.com/DuyDucLH">
								<FontAwesomeIcon />Github
							</a>
						</li>
						<li>
							<a href="mailto:duyduc.luonghuu@gmail.com">
								<FontAwesomeIcon />Email
							</a>
						</li>
					</ul>
				</Col>
				<Col md={2} className={FooterStyle.contact_link}>
					<h5>
						Contact Links
					</h5>
					<ul>
						<li>
							<a href="https://facebook.com/duyduclh">
								<FontAwesomeIcon />Facebook
							</a>
						</li>
						<li>
							<a href="https://github.com/DuyDucLH" >
								<FontAwesomeIcon />Github
							</a>
						</li>
						<li>
							<a href="mailto:duyduc.luonghuu@gmail.com">
								<FontAwesomeIcon />Email
							</a>
						</li>
					</ul>
				</Col>
			</Row>
			<Row className="mt-3">
				<Col>
					<p className="text-center">Copyright &copy; 2023 by <a href="https://github.com/DuyDucLH">DuyDucLH</a></p>
				</Col>
			</Row>
		</Container>
	);
};
