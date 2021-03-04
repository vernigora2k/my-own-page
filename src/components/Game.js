import React, { Fragment, useEffect, useRef, useState } from 'react';
import './game.scss';

interface CanvasProps {
    width: number;
    height: number;
}

export const Game = ({ width, height }: CanvasProps) => {
    const canvasRef = useRef(null);
    let context;

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            context = canvas.getContext('2d');  
           
            const x = canvas.width / 2
            const y = canvas.height / 1.1
            const player = new Player(x, y, 30, 'blue')
            const projectiles = []
            const enemies = []

            function spawnEnemies() {
                setInterval(() => {
                    const x = 100
                    const y = 100
                    const radius = 30
                    const color = 'green'
                    
                    const angle = Math.atan2(
                        canvas.height / 1.1 - y,           //height
                        canvas.width / 2 - x
                        )
                    const velocity =  {
                        x: Math.cos(angle),
                        y: Math.sin(angle),
                    }
                    enemies.push(new Enemy(x, y, radius, color, velocity))
                    console.log(enemies)
                }, 1000)
            }

            function animate() {
                requestAnimationFrame(animate)
                context.clearRect(0, 0, canvas.width, canvas.height)
                player.draw()

                projectiles.forEach(projectile => {
                    projectile.update()
                })

                enemies.forEach(enemy => {
                    enemy.update()
                })
            }
            
            window.addEventListener('click', (e) => {
                const angle = Math.atan2(
                    e.clientY - canvas.width / 2, 
                    e.clientX - canvas.width / 2
                    )
                const velocity =  {
                    x: Math.cos(angle),
                    y: Math.sin(angle),
                }
                projectiles.push(new Projectile(
                    canvas.width / 2, 
                    canvas.height / 1.1, 
                    5, 
                    'red', 
                    velocity
                ))
            })

            animate()
            spawnEnemies()
        }          
    },[]);

    class Player {
        constructor(x, y, radius, color) {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
        }
    
        draw() {
            context.beginPath()
            context.arc(this.x, this.y, this.radius, Math.PI * 2, false)
            context.fillStyle = this.color
            context.fill()
        }
    }

    class Projectile {
        constructor(x, y, radius, color, velocity) {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.velocity = velocity
        }

        draw() {
            context.beginPath()
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            context.fillStyle = this.color
            context.fill()
        }

        update()  {
            this.draw()
            this.x = this.x + this.velocity.x
            this.y = this.y + this.velocity.y
        }
    }

    class Enemy {
        constructor(x, y, radius, color, velocity) {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.velocity = velocity
        }

        draw() {
            context.beginPath()
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            context.fillStyle = this.color
            context.fill()
        }

        update()  {
            this.draw()
            this.x = this.x + this.velocity.x
            this.y = this.y + this.velocity.y
        }
    }

    

    return <canvas className="game" ref={canvasRef} height={height} width={width} />;
};

Game.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight
};



// export const Game = () => {
//     const canvasRef = useRef()
//     console.log(canvasRef)
//     let ctx
//     // const ctx = canvasRef.current.getContext('2d')
    
//     useEffect(() => {
//         const ctx = canvasRef.current.getContext('2d')
//         console.log(ctx)
//         // console.log(canvasRef.current.innerWidth)
//         // console.log(document.innerWidth)
        
//         // const ctx = canvasRef.current.getContext('2d')
//         // console.log(ctx)

//         // canvasRef.current.width = innerWidth
//         // canvasRef.current.height = innerHeight
//     }, [])

//     class Player {
//         constructor(x, y, radius, color) {
//             this.x = x
//             this.y = y
//             this.radius = radius
//             this.color = color
//         }

//         draw() {
//             ctx.beginPath()
//             ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false)
//             ctx.fill()
//         }
//     }
    
//     const player = new Player(100, 100, 30, 'blue')
//     console.log(player)
//     // player.draw()

//     return (
//         <canvas className="game" ref={canvasRef}>
//             sldkjflsk
//         </canvas>
//     )
// }