import React, { useEffect, useState } from 'react'

const Notices = props => {
    const [data, setData] = useState([])

    useEffect(() => {
        if (props.getNotice && props.getNotice.code == '1000') {
            setData(props.getNotice.rows)
        }
    }, [JSON.stringify(props.getNotice)])

    return (
        <>
            <h2>通知动态</h2>
            <ul>
                {data.map((item,index)=><li key={index}>
                    <a>{item.XWLBSX_XWBT}</a>
                    <span>{item.XWLBSX_XWRQ}</span>
                </li>)}
            </ul>
        </>
    )
}

export default Notices