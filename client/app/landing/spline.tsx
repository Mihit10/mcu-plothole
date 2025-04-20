'use client'

import Spline from '@splinetool/react-spline'

export default function SplineModel({ onLoaded }: { onLoaded: () => void }) {
  return (
    <Spline
      scene="https://prod.spline.design/b5tnFzEqaI08PdoC/scene.splinecode"
      onLoad={onLoaded} // ← This must be exactly "onLoad", not "onLoaded"
    />
  )
}
