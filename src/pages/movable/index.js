import React from 'react'
import './movList.css'

const movable = props => {

    return (
        <div className="products-yemian">
            <div className="container">
                <div className="row">
                    <p className="countp">革命纪念馆共计 <span id="count">
                        统计中...
						</span>处</p>
					<div className="col-md-3 col-sm-4 products-leul">
                        <h3>革命纪念馆</h3>

                        <div className="input-group">
                            <input type="text" className="form-control searchname" placeholder="革命纪念馆名称..."></input>
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


                        <ul>
                            <li className="products-leli">
                                <span id="tittle">
                                    所属时期
								</span></li>
                            <li id="土地革命战争时期"><a href="">土地革命战争时期</a></li>
                            <li id="大革命时期"><a href="">大革命时期</a></li>
                            <li id="抗日战争时期"><a href="">抗日战争时期</a></li>
                            <li id="旧民主主义革命时期"><a href="">旧民主主义革命时期</a></li>
                            <li id="社会主义革命和建设时期"><a href="">社会主义革命和建设时期</a></li>
                            <li id="解放战争时期"><a href="">解放战争时期</a></li>
                        </ul>

                        <ul>
                            <li className="products-leli">
                                <span id="tittle">
                                    博物馆等级
								</span></li>
                            <li id="一级博物馆"><a href="">一级博物馆</a></li>
                            <li id="二级博物馆"><a href="">二级博物馆</a></li>
                            <li id="三级博物馆"><a href="">三级博物馆</a></li>
                            <li id="未定级"><a href="">未定级</a></li>
                        </ul>
                        <ul>
                            <li className="products-leli"><span id="tittle">
                                爱国教育示范基地级别
								</span></li>
                            <li id="全国基地"><a href="">全国基地</a></li>
                            <li id="省级基地"><a href="">省级基地</a></li>
                            <li id="市级基地"><a href="">市级基地</a></li>
                            <li id="县级基地"><a href="">县级基地</a></li>
                            <li id="非爱国主义教育基地"><a href="">非爱国主义教育基地</a></li>

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

export default movable