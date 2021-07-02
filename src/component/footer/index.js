import React from 'react'
import logosingle from './images/logo_single.png'

const Footer = props => {
    return (
        <footer>
            <div className="footer-top link">
				<div className="container">
                    版权所有： 国家文物局 革命文物司 京ICP093739
				</div>
            </div>
            <div className="footer-button">
                <div className="container">
                    <p>主办单位：国家文物局</p>
                </div>
            </div>
            <div className="login">
                <a href="http://gmww.cchicc.org.cn/index.html"><img src={logosingle} />业务管理</a>
			</div>
		</footer>
    )
}

export default Footer