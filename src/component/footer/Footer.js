import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import "./Footer.css";
const Footer = () => {
	return (
		<div style={{ bottom: "0px", position: "fixed", width: "100%" }}>
			<div className="footer_section layout_padding">
				<div className="container">
					<div className="footer_menu">
						<ul>
							<li>
								<FaTwitter />
								<span style={{ marginLeft: "10px" }}>
									Twitter
								</span>
							</li>
							<li>
								<FaFacebook />
								<span style={{ marginLeft: "10px" }}>
									Facebook
								</span>
							</li>
							<li>
								<FaMailBulk />
								<span style={{ marginLeft: "10px" }}>Mail</span>
							</li>
							<li>
								<FaInstagram />
								<span style={{ marginLeft: "10px" }}>
									Instagram
								</span>
							</li>
							<li>
								<FaYoutube />
								<span style={{ marginLeft: "10px" }}>
									Youtube
								</span>
							</li>
						</ul>
					</div>
					<div className="location_main">
						Help Line Number : <a>+1 1800 1200 1200</a>
					</div>
				</div>
			</div>

			<div className="copyright_section">
				<div className="container">
					<p className="copyright_text">
						© {new Date().getFullYear()} All Rights Reserved. Design
						by
						<a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new">
							@ Amit
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};
export default Footer;
