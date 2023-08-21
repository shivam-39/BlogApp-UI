import React from 'react'
import { Audio } from 'react-loader-spinner'


function CustomLoading() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh'
        }}>
            <Audio
                height="80"
                width="80"
                radius="9"
                color='#095a18bd'
                ariaLabel='three-dots-loading'
                wrapperStyle
                wrapperClass

            />
        </div>
    )
}

export default CustomLoading