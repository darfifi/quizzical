import React from 'react'

export default function Background(props) {
    return (
        <div className="main--page">
            <img className='image--up' src='../images/blob-up.png'/>
            <img className='image--down' src='../images/blob-down.png'/>
            {props.children}
        </div>
    )
}