import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd'
import '../css/carouse.scss'

const carousel = props => {
    const [data, setData] = useState([])
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (props.getImgs && props.getImgs.code == 1000) {
            setData(props.getImgs.rows)
        }
    }, [JSON.stringify(props.getImgs)])

    return (
        <Carousel dotPosition='top' autoplay afterChange={current => { setCurrent(current) }}>
            {data.map((item, index) => <div
                key={index}
                className='item'
            >
                <a><img style={{ width: '100%' }} src={`/je/api/readImg?filePath=${item.XWLBSX_XWPT.split("*")[1]}`} /></a>
                <div className="carousel-caption"><p>{item.XWLBSX_XWBT}</p></div>
            </div>)}
        </Carousel>
    )
}

export default carousel