import React from 'react'

// Definition of the generic button component

export default function Button({ text, style, onClick}) {
    
    return (
        <button onClick={onClick} className='my--button' style={style}>{text}</button>
    )
}