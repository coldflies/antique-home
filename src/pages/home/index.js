import React, { useEffect } from 'react'
import Header from '@/src/component/header'
import { connect } from 'react-redux'
import Carouse from './component/carouse'
import Notices from './component/notices'
import Moveable from './component/moveable'
import Unmoveable from './component/unmoveable'
import './css/gmww.css'
import './css/index.scss'

const Home = props => {
    //获取数据
    const getData = () => {
        props.dispatch({
            type: 'getImgs',
            payload: {
                page: 1,
                start: 0,
                limit: 4
            }
        })
        props.dispatch({
            type: 'getNotice',
            payload: {
                page: 1,
                start: 0,
                limit: 8
            }
        })
        props.dispatch({
            type: 'getMoveable',
            payload: {
                page: 1,
                start: 0,
                limit: 4
            }
        })
        props.dispatch({
            type: 'getUnmoveable',
            payload: {
                page: 1,
                start: 0,
                limit: 4
            }
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="newsList">
                <div className="container">
                    <div className="row">
                        <div id="leftimg" className="col-md-5 col-xs-12">
                            <Carouse {...props} />
                        </div>
                        <div id="rightlist" className="col-md-7 col-xs-12">
                            <div id="rtight-inner">
                                <a className="more" style={{ color: '#dc7880', top: '3%', right: '4%' }} >更多<i className="fa fa-angle-right"></i></a>
                                <Notices {...props} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="join unmovableMap container">
                <div className="col-md-3 col-xs-12">
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">革命时期</h3>
                        </div>
                        <div className="list-group">
                            <a name="gmsq-1" className="gmsq-1 list-group-item active">旧民主主义革命时期 (1840年-1921年)</a>
                            <a name="gmsq-2" className="gmsq-2 list-group-item">党组织的创立及大革命时期(1927-1937年)</a>
                            <a name="gmsq-3" className="gmsq-3 list-group-item">土地革命时期(1927-1937年)</a>
                            <a name="gmsq-4" className="gmsq-4 list-group-item">抗日战争时期(1937-1945年)</a>
                            <a name="gmsq-5" className="gmsq-5 list-group-item">解放战争时期(1945-1949年)</a>
                            <a name="gmsq-6" className="gmsq-6 list-group-item">社会主义革命时期(1949-1978年)</a>
                            <a name="gmsq-7" className="gmsq-7 list-group-item">改革开放和社会主义现代化建设时期(1978年后)</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 col-xs-12">
                    <div id="dituContent">

                    </div>
                </div>
            </div>

            <div className="join collectionList container">
                <a href="movable.html" className="more">更多<i className="fa fa-angle-right"></i></a>
                <div className="row foundCollectionList">
                    <h5><a >可移动文物</a></h5>
                    <Moveable {...props} />
                </div>
            </div>

            <div className="join unmovableList container">
                <a href="unmovable.html" className="more">更多<i className="fa fa-angle-right"></i></a>
                <div className="row foundUnmovableList">
                    <h5><a >不可移动文物</a></h5>
                    <Unmoveable {...props} />
                </div>
            </div>
        </>
    )
}

export default connect(state => ({ ...state }))(Home)