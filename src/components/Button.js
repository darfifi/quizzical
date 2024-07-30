import React from 'react'

export default function Button({ text, style, onClick}) {
    
    return (
        <button onClick={onClick} className='my--button' style={style}>{text}</button>
    )
}