import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="nb-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="about">
                <img src="#" className="img-responsive center-block" alt="" />

                <div className="social-media">
                  <ul className="list-inline">
                    <li>
                      <a href="https://web.facebook.com/dopestflows" title="">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/IkennaAlfred" title="">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/AlfredBryan" title="">
                        <i className="fa fa-github" />
                      </a>
                    </li>
                    <li>
                      <a href="#" title="">
                        <i className="fa fa-linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-info-single">
                <h2 className="title">Help Center</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" title="">
                      <i className="fa fa-angle-double-right" /> How to Pay
                    </a>
                  </li>
                  <li>
                    <a href="#" title="">
                      <i className="fa fa-angle-double-right" /> FAQ's
                    </a>
                  </li>
                  <li>
                    <a href="#" title="">
                      <i className="fa fa-angle-double-right" /> Sitemap
                    </a>
                  </li>
                  <li>
                    <a href="#" title="">
                      <i className="fa fa-angle-double-right" /> Delivery Info
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-info-single">
                <h2 className="title">Customer information</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" title="">
                      <i className="fa fa-angle-double-right" /> About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" title="">
                      <i className="fa fa-angle-double-right" /> FAQ's
                    </a>
                  </li>
                  <li>
                    <a href="#" title="">
                      <i className="fa fa-angle-double-right" /> Check
                    </a>
                  </li>
                  <li>
                    <a href="#" title="">
                      <i className="fa fa-angle-double-right" /> Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" title="">
                      <i className="fa fa-angle-double-right" /> RSS
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-info-single">
                <h2 className="title">Security & privacy</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" title="">
                      <i className="fa fa-angle-double-right" /> Terms Of Use
                    </a>
                  </li>
                  <li>
                    <a href="#" title="">
                      <i className="fa fa-angle-double-right" /> Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" title="">
                      <i className="fa fa-angle-double-right" /> Return / Refund
                      Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" title="">
                      <i className="fa fa-angle-double-right" /> Store Locations
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-info-single">
                <h2 className="title">Blog</h2>
                <p>
                  Sample HTML page with Twitter's Bootstrap. Code example of
                  Easy Sticky Footer using HTML, Javascript, jQuery, and CSS.
                  This bootstrap tutorial covers all the major elements of
                  responsive
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <p>Copyright © 2018. Bryano.</p>
              </div>
              <div className="col-sm-6" />
            </div>
          </div>
        </section>
      </footer>
    );
  }
}

export default Footer;
