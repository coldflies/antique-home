import React, { useEffect } from 'react'
import './css/unmovList.css'

const unmovable = props => {
    useEffect(()=>{
        require('./js/index')
    },[])
    return (
        <div className="products-yemian">
            <div className="container">
                <div className="row">
                    <p className="countp">不可移动文物共计 <span id="count">
                        统计中...
						</span>处</p>
                    <div className="col-md-3 col-sm-4 products-leul">
                        <h3>不可移动革命文物</h3>

                        <div className="input-group">
                            <input type="text" className="form-control searchname" placeholder="不可移动文物名称..."></input>
                            <span className="input-group-btn">
                                <button className="searchbutton btn btn-default" type="button">搜索</button>
                            </span>
                        </div>

                        <div id="btnBox">
                            <span id="tittle">
                                所属省
							</span>
                            <div className="dropdown">
                                <button type="button" className="btn dropdown-toggle" id="provinceselect" data-toggle="dropdown">筛选省份<span className="caret"></span>
                                </button>
                                <ul id="provinceList" className="dropdown-menu provinceselect" role="menu" aria-labelledby="dropdownMenu1">
                                </ul>
                            </div>
                        </div>

                        <div id="btnBox">
                            <span id="tittle">
                                所属片区
							</span>
                            <div className="dropdown">
                                <button type="button" className="btn dropdown-toggle" id="pianquselect" data-toggle="dropdown">筛选片区<span className="caret"></span>
                                </button>
                                <ul id="pianquList" className="dropdown-menu pianquselect" role="menu" aria-labelledby="dropdownMenu1">
                                </ul>
                            </div>
                        </div>

                        <ul style={{display:'none'}}>
                            <li className="products-leli">
                                <span id="tittle">
                                    所属年代
								</span></li>
                            <li id="宋"><a href="">宋</a></li>
                            <li id="元"><a href="">元</a></li>
                            <li id="明"><a href="">明</a></li>
                            <li id="清"><a href="">清</a></li>
                            <li id="中华民国"><a href="">中华民国</a></li>
                            <li id="新中国"><a href="">新中国</a></li>
                        </ul>

                        <ul>
                            <li className="products-leli">
                                <span id="tittle">
                                    文物级别
								</span></li>
                            <li id="国保"><a href="">国保</a></li>
                            <li id="省保"><a href="">省保</a></li>
                            <li id="市县保"><a href="">市县保</a></li>
                            <li id="未定级"><a href="">未定级</a></li>
                        </ul>

                        <ul>
                            <li className="products-leli">
                                <span id="tittle">
                                    革命时期
								</span></li>
                            <li id="旧民主主义革命"><a href="">旧民主主义革命</a></li>
                            <li id="党组织的创立及大革命"><a href="">党组织的创立及大革命</a></li>
                            <li id="土地革命"><a href="">土地革命</a></li>
                            <li id="抗日战争"><a href="">抗日战争</a></li>
                            <li id="解放战争"><a href="">解放战争</a></li>
                            <li id="社会主义革命"><a href="">社会主义革命</a></li>
                            <li id="改革开放"><a href="">改革开放</a></li>
                        </ul>
                    </div>
                    <div className="col-md-9">
                        <div className="row" id="listDiv">
                        </div>
                    </div>
                    <nav aria-label="Page navigation" className="turnpage">
                        <ul className="pagination pagination-lg">
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default unmovable