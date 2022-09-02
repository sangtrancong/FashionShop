import React from 'react';

import { Link } from "react-router-dom";

const FooterContrainer = ({
    title,
    link,
}) => {

    return (
        <footer className="site__footer">
            <div className="site-footer">
                <div className="container">
                    <div className="site-footer__widgets">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="site-footer__widget footer-contacts">
                                    <h5 className="footer-contacts__title">Liên hệ</h5>
                                    <div className="footer-contacts__text">Hoạt động tại hơn 70 quốc gia, chúng tôi mang đến giá trị và cơ hội kinh doanh bằng cách kết nối các nhà cung cấp sản phẩm hàng đầu thế giới </div>
                                    <ul className="footer-contacts__contacts">
                                        <li><i className="footer-contacts__icon fas fa-globe-americas" />Tầng 12, Toà nhà VietJet Plaza, 60A Trường Sơn, P.2, Q.Tân Bình, Tp.HCM, Việt Nam</li>
                                        <li><i className="footer-contacts__icon far fa-envelope" /> hotro@shopping.vn
                                        </li>
                                        <li><i className="footer-contacts__icon fas fa-mobile-alt" />(800) 060-0730</li>
                                        <li><i className="footer-contacts__icon far fa-clock" /> T2-CN 10:00pm - 7:00pm
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="site-footer__widget footer-links">
                                    <h5 className="footer-links__title">Thông tin</h5>
                                    <ul className="footer-links__list">
                                        <li className="footer-links__item"><a href="#" className="footer-links__link">Về chúng tôi</a></li>
                                        <li className="footer-links__item"><a href="#" className="footer-links__link">Thông tin giao hàng</a></li>
                                        <li className="footer-links__item"><a href="#" className="footer-links__link">Chính sách bảo mật</a></li>
                                        <li className="footer-links__item"><a href="#" className="footer-links__link">Brands</a>
                                        </li>
                                        <li className="footer-links__item"><a href="#" className="footer-links__link">Liên hệ</a></li>
                                        <li className="footer-links__item"><a href="#" className="footer-links__link">Bản đồ</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div className="site-footer__widget footer-links">
                                    <h5 className="footer-links__title">Tài khoản</h5>
                                    <ul className="footer-links__list">
                                        <li className="footer-links__item"><a href="#" className="footer-links__link">Cửa hàng</a></li>
                                        <li className="footer-links__item"><a href="#" className="footer-links__link">Giỏ hàng</a></li>
                                        <li className="footer-links__item"><a href="#" className="footer-links__link">Thanh toán</a></li>
                                        <li className="footer-links__item"><a href="#" className="footer-links__link">Đơn hàng</a></li>
                                        <li className="footer-links__item"><a href="#" className="footer-links__link">Đăng nhập</a></li>
                                        <li className="footer-links__item"><a href="#" className="footer-links__link">Đăng ký </a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-12 col-lg-4">
                                <div className="site-footer__widget footer-newsletter">
                                    <h5 className="footer-newsletter__title">Bản tin</h5>
                                    <div className="footer-newsletter__text">Liên hệ với chúng tôi qua email</div>
                                    <form action="#" className="footer-newsletter__form"><label className="sr-only" htmlFor="footer-newsletter-address">Email Address</label> <input type="text" className="footer-newsletter__form-input form-control" id="footer-newsletter-address" placeholder="Email Address..." /> <button className="footer-newsletter__form-button btn btn-primary">Subscribe</button>
                                    </form>
                                    <div className="footer-newsletter__text footer-newsletter__text--social">Follow us on
                                        social networks</div>
                                    <ul className="footer-newsletter__social-links">
                                        <li className="footer-newsletter__social-link footer-newsletter__social-link--facebook">
                                            <a href="https://themeforest.net/user/kos9" target="_blank"><i className="fab fa-facebook-f" /></a></li>
                                        <li className="footer-newsletter__social-link footer-newsletter__social-link--twitter">
                                            <a href="https://themeforest.net/user/kos9" target="_blank"><i className="fab fa-twitter" /></a></li>
                                        <li className="footer-newsletter__social-link footer-newsletter__social-link--youtube">
                                            <a href="https://themeforest.net/user/kos9" target="_blank"><i className="fab fa-youtube" /></a></li>
                                        <li className="footer-newsletter__social-link footer-newsletter__social-link--instagram">
                                            <a href="https://themeforest.net/user/kos9" target="_blank"><i className="fab fa-instagram" /></a></li>
                                        <li className="footer-newsletter__social-link footer-newsletter__social-link--rss">
                                            <a href="https://themeforest.net/user/kos9" target="_blank"><i className="fas fa-rss" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="site-footer__bottom">
                        {/* <div className="site-footer__copyright"><a target="_blank" href="https://www.templateshub.net">Templates Hub</a></div> */}
                        <div className="site-footer__payments"><img src="images/payments.png" alt="" /></div>
                    </div>
                </div>
            </div>
        </footer>
    );

}

export default FooterContrainer;
