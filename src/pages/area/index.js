import React from 'react'

const area = props => {
    return (
        <div className="products">
            <h2 className="text-center">革命文物片区</h2>
            <div className="row pianqurow">
				<div className="col-sm-6 col-xs-12 pianqu1">

                    <h3 className="text-center pici">第一批次</h3>
                    <ul className="nav nav-pills pianqu">
					</ul>
                </div>
                <div className="col-sm-6 col-xs-12 azhe">
                    <h3 className="text-center pici">第二批次</h3>
                    <ul className="nav nav-pills pianqu2">
					</ul>
                </div>
                <div className="col-xs-12 col-md-5 pre-scrollable tablepianqu">
					<table className="table table-hover">
                            <caption id="tableTitle">片区所含地域</caption>
                            <thead>
                                <tr>
                                    <th className="col-sm-2">城市</th>
                                    <th className="col-sm-10">区县</th>
                                </tr>
                            </thead>
                            <tbody>
						</tbody>
                        </table>
				</div>
                <div className="col-xs-12 col-md-7" id="dituContent">

                </div>
            </div>
            <div className="container"></div>
        </div>
    )
}

export default area