import { motion } from 'framer-motion'

export const FadeMotionDiv = ({
  duration = 0.5,
  delay = 0,
  className,
  title,
  children
}) => {
  return (
    <motion.div
      key={title}
      className={className}
      transition={{
        duration: duration,
        delay: delay,
        type: 'linear'
      }}
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
    >
      {children}
    </motion.div>
  )
}
