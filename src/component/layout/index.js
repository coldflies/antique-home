import React from 'react'
import PubHeader from '../header'
import PubFooter from '../footer'

const PublicLayout = WrapComponent => {
    return props => {
        return (
            <div style={{ minHeight: '100vh' }}>
                <PubHeader  {...props} />
                <div style={{ minHeight: '68vh' }}>
                    <WrapComponent {...props} />
                </div>
                <PubFooter {...props} />
            </div>
        )
    }
}

export default PublicLayout