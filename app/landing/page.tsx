// "use client"

import SplineModel from "./spline";
import CardGrid from "@/components/test-card";

export default function LandingPage() {
  return (
    <main className="h-full w-full relative">
      <div className="w-full">
        <SplineModel />
      </div>
      
        <CardGrid />
     
    </main>
  );
}