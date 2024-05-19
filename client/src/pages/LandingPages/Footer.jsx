import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import { TiSocialInstagram } from "react-icons/ti";
import { AiFillYoutube } from "react-icons/ai";

import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-top mt-5">
      <Container>
        <div className="footer-bottom-content clearfix">
          <Row>
            <Col lg={4} md={4}>
              <div className="logo-footer">
                <a className="navbar-brand" href="/">
                  <img
                    src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
                    alt="evangadi logo"
                  />
                </a>
              </div>
              <ul className="footer-social-list list-social list-inline">
                <li>
                  <a href="https://www.facebook.com/EthiopiansNetwork" target="_blank">
                    <AiFillFacebook />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/evangaditech/" target="_blank">
                    <TiSocialInstagram />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/c/weareethiopians" target="_blank">
                    <AiFillYoutube />
                  </a>
                </li>
              </ul>
            </Col>
            <Col lg={4} md={4}>
              <div>
                <h5>Useful Links</h5>
                <ul className="list-menu">
                  <li>
                    <a href="/explained">How it works</a>
                  </li>
                  <li>
                    <a href="/legal/terms/">Terms of Service</a>
                  </li>
                  <li>
                    <a href="/legal/privacy/">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={4} md={4}>
              <div>
                <h5>Contact Info</h5>
                <ul className="list-menu contact-list">
                  <li>Evangadi Networks</li>
                  <li>support@evangadi.com</li>
                  <li>+1-202-386-2702</li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
