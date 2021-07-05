import React, { useEffect, useState } from 'react'

const Moveable = props => {
    const [data, setData] = useState([])

    useEffect(() => {
        if (props.getMoveable && props.getMoveable.code == '1000') {
            setData(props.getMoveable.rows)
        }
    }, [JSON.stringify(props.getMoveable)])

    return (
        <>
            {data.map((item, index) => {
                return (
                    <div key={index} className="col-md-3 col-sm-3 col-xs-6 collectionItem" >
                        <div className="innerItem">
                            <a >
                                <img src={`/je/api/readImg?filePath=${JSON.parse(item.KYDWW_TP)[0].path}`} alt="" className="img-xz img-responsive" />
                            </a>
                            <time>{item.KYDWW_CPMC}</time>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Moveable