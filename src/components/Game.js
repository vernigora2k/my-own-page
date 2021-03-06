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
            const player = new Player(x, y, 10, 'white')
            const projectiles = []
            const enemies = []
            const particles = []

            function spawnEnemies() {
                setInterval(() => {
                    const x = Math.random() * canvas.width
                    const y = 100
                    const radius = Math.random() * (30 - 4) + 5
                    const color = `hsl(${Math.random() * 360}, 50%, 50%)`
                    
                    const angle = Math.atan2(
                        canvas.height / 1.1 - y,           
                        canvas.width / 2 - x
                        )
                    const velocity =  {
                        x: Math.cos(angle),
                        y: Math.sin(angle),
                    }
                    enemies.push(new Enemy(x, y, radius, color, velocity))
                }, 1000)
            }

            let animationId
            function animate() {
                animationId = requestAnimationFrame(animate)

                context.fillStyle = 'rgba(0, 0, 0, 0.1)'
                context.fillRect(0, 0, canvas.width, canvas.height)

                // context.clearRect(0, 0, canvas.width, canvas.height)
                player.draw()
                particles.forEach((particle, index) => {
                    if (particle.alpha <= 0) {
                        particles.splice(index, 1)
                    } else {
                        particle.update()
                    }
                })
                projectiles.forEach((projectile, index) => {
                    projectile.update()

                    //remove from edges of screen
                    if (
                        projectile.x + projectile.radius < 0 || 
                        projectile.x - projectile.radius > canvas.width ||
                        projectile.y + projectile.radius < 0  ||
                        projectile.y - projectile.radius > canvas.height
                        ) {
                        setTimeout(() => {
                            projectiles.splice(index, 1)
                        }, 0)
                    }
                })

                enemies.forEach((enemy, index) => {
                    enemy.update()

                    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

                    // end game
                    if (dist - enemy.radius - player.radius < 1) {
                        console.log('game over')
                        cancelAnimationFrame(animationId)
                    }

                    projectiles.forEach((projectile, projectileIndex) => {
                        const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
                        
                        //objects(projectiles) touch enemy
                        if (dist - enemy.radius - projectile.radius < 1) {
                            //create explosions
                            for (let i = 0; i < enemy.radius * 2; i++) {
                                particles.push(new Particle(
                                                    projectile.x, 
                                                    projectile.y, 
                                                    Math.random() * 2, 
                                                    enemy.color, 
                                                    {
                                                        x: (Math.random() - 0.5) * (Math.random() * 8), 
                                                        y: (Math.random() - 0.5) * (Math.random() * 8)
                                                    }
                                                ))
                            }

                            if (enemy.radius - 10 > 5) {
                                window.gsap.to(enemy, {
                                    radius: enemy.radius - 10
                                })
                                setTimeout(() => {
                                    projectiles.splice(projectileIndex, 1)
                                }, 0)
                            } else {
                                setTimeout(() => {
                                    enemies.splice(index, 1)
                                    projectiles.splice(projectileIndex, 1)
                                }, 0)
                            }
                        }
                    })
                })
            }
            
            window.addEventListener('click', (e) => {
                console.log(projectiles)
                const angle = Math.atan2(
                    e.clientY - canvas.width / 2, 
                    e.clientX - canvas.width / 2
                    )
                const velocity =  {
                    x: Math.cos(angle) * 5,
                    y: Math.sin(angle) * 5,
                }
                projectiles.push(new Projectile(
                    canvas.width / 2, 
                    canvas.height / 1.1, 
                    5, 
                    'white', 
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

    class Particle {
        constructor(x, y, radius, color, velocity) {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.velocity = velocity
            this.alpha = 1
        }

        draw() {
            context.save()
            context.globalAlpha = this.alpha
            context.beginPath()
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            context.fillStyle = this.color
            context.fill()
            context.restore()
        }

        update()  {
            this.draw()
            this.x = this.x + this.velocity.x
            this.y = this.y + this.velocity.y
            this.alpha -= 0.01
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