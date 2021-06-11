import React from 'react'
// import biglogo from './images/biglogo.png'
import gemingfont from './images/geming-font.png'
import biglogo from './images/biglogo.png'
import './index.scss'

const Header = props => {
    return (
        <header>
            <div className="header-blank">
                <div className="container">
                    <img className="biglogo" src={biglogo} />
                    <img className="font" src={gemingfont} />
                </div>
            </div>
            <nav className="navbar" role="navigation" style={{ backgroundColor: '#c63838' }}>
                <div className="navbar-header">
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1"
                        style={{ color: '#080808' }}
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <p id="zyglpt">资源管理平台(试运行)</p>
                    <img className="logo" src="img/logo_wenwuju.png" alt="" style={{ display: 'none' }} />
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="不可移动文物..." />
                        <div className="dropdown">
                            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                不可移动
							    <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li id="unmovable" className="selected"><a href="#">不可移动文物</a></li>
                                <li id="movable" ><a href="#">可移动文物</a></li>
                                <li id="message"><a href="#">通知动态</a></li>
                            </ul>
                        </div>
                        <button id="search" className="btn btn-default" type="button">搜索</button>
                    </div>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1"></div>
            </nav>
        </header>
    )
}

export default Header