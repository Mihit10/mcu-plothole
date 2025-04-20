// "use client"

import SplineModel from "./spline";
import Home from "./home";
import CreateButton from "./create";

export default function LandingPage() {
  return (
    <main >
      <div >
        <SplineModel />
      </div>
      <Home/>
      
      <CreateButton/>
        
     
    </main>
  );
}