import React, { Fragment, useEffect, useRef, useState } from 'react';
import './game.scss';

export const Game = () => {
    const canvasRef = useRef()
    console.log(canvasRef)
    let ctx
    // const ctx = canvasRef.current.getContext('2d')
    
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')
        console.log(ctx)
        // console.log(canvasRef.current.innerWidth)
        // console.log(document.innerWidth)
        
        // const ctx = canvasRef.current.getContext('2d')
        // console.log(ctx)

        // canvasRef.current.width = innerWidth
        // canvasRef.current.height = innerHeight
    }, [])

    class Player {
        constructor(x, y, radius, color) {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
        }

        draw() {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false)
            ctx.fill()
        }
    }
    
    const player = new Player(100, 100, 30, 'blue')
    console.log(player)
    // player.draw()

    return (
        <canvas className="game" ref={canvasRef}>
            sldkjflsk
        </canvas>
    )
}