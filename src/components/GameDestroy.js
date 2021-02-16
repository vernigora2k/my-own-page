import React, { Fragment, useEffect, useRef, useState } from 'react';
import './gamedestroy.scss';

export const GameDestroy = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        console.log(canvasRef.current.innerWidth)
        console.log(document.innerWidth)
        // canvasRef.current.width = innerWidth
        // canvasRef.current.height = innerHeight
    })

    return (
        <canvas className="game" ref={canvasRef}>
            sldkjflsk
        </canvas>
    )
}