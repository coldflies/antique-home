import React from 'react'
import './newsList.css'

const newsList = props => {
    return (
        <div className="container newscontainer">
            <p className="countp">通知动态共计 <span id="count">统计中...</span>条</p>
            <div className="row">


                <div className="col-md-3 col-xs-12">
                    <div className="input-group">
                        <input type="text" className="form-control searchname" placeholder="新闻名称..."></input>
                        <span className="input-group-btn">
                            <button className="searchbutton btn btn-default" type="button">搜索</button>
                        </span>
                    </div>
                    <ul className="nav nav-pills pianqu">
                        <li className="政策文件"><a id="政策文件" href="">政策文件</a></li>
                        <li className="地方动态"><a id="地方动态" href="">地方动态</a></li>
                        <li className="国家动态"><a id="国家动态" href="">国家动态</a></li>
                        <li className="成果展示"><a id="成果展示" href="">成果展示</a></li>
                    </ul>
                </div>


                <div className="col-md-9 col-xs-12 newslist">
                    <ul>
                        <li>
                            <a href="https://www.baidu.com">加载中...</a>
                            <span>2018-02-05</span>
                        </li>
                        <li>
                            <a href="https://www.baidu.com">加载中...</a>
                            <span>2018-02-05</span>
                        </li>
                        <li>
                            <a href="https://www.baidu.com">加载中...</a>
                            <span>2018-02-05</span>
                        </li>
                        <li>
                            <a href="https://www.baidu.com">加载中...</a>
                            <span>2018-02-05</span>
                        </li>
                        <li>
                            <a href="https://www.baidu.com">加载中...</a>
                            <span>2018-02-05</span>
                        </li>
                        <li>
                            <a href="https://www.baidu.com">加载中...</a>
                            <span>2018-02-05</span>
                        </li>
                        <li>
                            <a href="https://www.baidu.com">加载中...</a>
                            <span>2018-02-05</span>
                        </li>
                        <li>
                            <a href="https://www.baidu.com">加载中...</a>
                            <span>2018-02-05</span>
                        </li>
                        <li>
                            <a href="https://www.baidu.com">加载中...</a>
                            <span>2018-02-05</span>
                        </li>
                        <li>
                            <a href="https://www.baidu.com">加载中...</a>
                            <span>2018-02-05</span>
                        </li>
                        <li>
                            <a href="https://www.baidu.com">加载中...</a>
                            <span>2018-02-05</span>
                        </li>
                    </ul>


                </div>

            </div>
            <nav aria-label="Page navigation" className="turnpage">
                <ul className="pagination pagination-lg">

                </ul>
            </nav>
        </div>
    )
}

export default newsList