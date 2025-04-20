"use client"
import MCUGraph from '@/components/main-graph';
import MainQuery from '@/components/main-query';
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

// Your page component
export default function GraphPage() {
    const searchParams = useSearchParams()
    const redirect = searchParams.get("redirect") === "true"
    const requery = searchParams.get("requery") || ""
    const [graphData, setGraphData] = useState(null);

  // Your data fetching logic here
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://rhino-frank-tightly.ngrok-free.app/graph", {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setGraphData(data);
      } catch (err) {
        console.error("Error fetching graph data:", err);
      }
    };

    fetchData(); // only once on mount
  }, []);

  const fetchDataPlace = async () => {
    try {
      const res = await fetch("https://rhino-frank-tightly.ngrok-free.app/graph", {
        method: "POST",  // Change to POST
        headers: {
          'Content-Type': 'application/json',  // Set the content type as JSON
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ prompt: requery })  // Send requery in the body
      });
  
      if (!res.ok) throw new Error("Failed to fetch");
  
      const data = await res.json();
      setGraphData(data);
    } catch (err) {
      console.error("Error fetching graph data:", err);
    }
  };
  

  if (!graphData) return <p>Loading graph data...</p>;

  return (
    <div className="p-4">
      <MCUGraph data={graphData} className="w-full" />
      <MainQuery redirect={redirect} requery={requery} onQuerySent={fetchDataPlace}/>
    </div>
  );
}