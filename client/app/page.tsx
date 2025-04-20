'use client'

import { useState } from 'react'
import SplineModel from '../app/landing/spline'
import Home from '../app/landing/home'
import CreateButton from '../app/landing/create'

export default function LandingPage() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false)

  const handleSplineLoad = () => {
    setIsSplineLoaded(true)
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {!isSplineLoaded && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-[#598bd9] z-50" />
      )}

      <div className="h-screen w-full relative z-40">
        <SplineModel onLoaded={handleSplineLoad} />
      </div>

      {isSplineLoaded && (
        <>
          <div className="relative z-30">
            <Home />
          </div>

          <div className="relative z-30 -mt-10">
            <CreateButton />
          </div>
        </>
      )}
    </main>
  )
}
