// @ts-nocheck
import { primaryInput } from 'detect-it'
import { useEffect, useRef } from 'react'

const useHlsPlayer = (playerRef, source, onReady) => {
  const hlsRef = useRef()

  useEffect(() => {
    if (source) {
      const video = playerRef.current

      const onCanPlay = () => {
        onReady?.()
      }
      video.addEventListener('canplay', onCanPlay)

      import('hls.js').then(Hls => {
        if (Hls.default.isSupported()) {
          const HLS = Hls.default
          hlsRef.current = new HLS({
            capLevelToPlayerSize: true,
            startLevel: primaryInput === 'touch' ? undefined : 5
          })
          hlsRef.current.loadSource(source)
          hlsRef.current.attachMedia(playerRef.current)
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = source
        }
      })

      return () => {
        video.removeEventListener('canplay', onCanPlay)
        if (hlsRef.current) {
          hlsRef.current.detachMedia()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source])

  return [hlsRef]
}

export default useHlsPlayer
