import React, { useState } from 'react'
import gemingfont from './images/geming-font.png'
import biglogo from './images/biglogo.png'
import logowenwuju from './images/logo_wenwuju.png'

const Header = props => {
    return (
        <header className='header'>
            <div className="header-blank">
                <div className="container">
                    <img className="biglogo" src={biglogo} />
                    <img className="font" src={gemingfont} />
                </div>
            </div>
            <nav className="navbar" role="navigation" style={{ backgroundColor: '#c63838' }}>
                <div className='container'>
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
                        <img className="logo" src={logowenwuju} alt="" style={{ display: 'none' }} />
                        <div className="input-group" style={{ display: 'none' }}>
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
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a className={props.location.pathname == '/'?'active':''} onClick={() => { props.history.push('/') }}>首页</a></li>
                            <li><a className={props.location.pathname == '/unmovable' ? 'active' : ''} onClick={() => { props.history.push('/unmovable') }} >不可移动革命文物</a></li>
                            <li><a className={props.location.pathname == '/movable' ? 'active' : ''} onClick={() => { props.history.push('/movable') }} >可移动文物</a></li>
                            <li><a className={props.location.pathname == '/area' ? 'active' : ''} onClick={() => { props.history.push('/area') }} >革命片区</a></li>
                            <li><a className={props.location.pathname == '/newsList' ? 'active' : ''} onClick={() => { props.history.push('/newsList') }} >通知动态</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header