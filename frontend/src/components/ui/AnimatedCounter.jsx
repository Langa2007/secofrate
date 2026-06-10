import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const AnimatedCounter = ({ target, duration = 2000, className = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      let startTime = null
      const startValue = 0
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        const currentCount = Math.floor(progress * target)
        setCount(currentCount)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(target)
        }
      }
      
      requestAnimationFrame(animate)
    }
  }, [isInView, target, duration])

  return (
    <div ref={ref} className={className}>
      {count}
    </div>
  )
}

export default AnimatedCounter