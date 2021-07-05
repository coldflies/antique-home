import React, { useEffect, useState } from 'react'

const Moveable = props => {
    const [data, setData] = useState([])

    useEffect(() => {
        if (props.getUnmoveable && props.getUnmoveable.code == '1000') {
            setData(props.getUnmoveable.rows)
        }
    }, [JSON.stringify(props.getUnmoveable)])

    console.log(data)

    return (
        <>
            {data.map((item, index) => {
                return (
                    <div key={index} className="col-md-3 col-sm-3 col-xs-6 collectionItem" >
                        <div className="innerItem">
                            <a >
                                <img src={`/je/api/readImg?filePath=${JSON.parse(item.ZP_FJ)[0].path}`} alt="" className="img-xz img-responsive" />
                            </a>
                            <time>{item.WBDW_DZ}</time>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Moveable