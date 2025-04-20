"use client"
import MCUGraph from '@/components/main-graph';
import MainQuery from '@/components/main-query';
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

// Your page component
export default function GraphPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") === "true";
  const requeryFromURL = searchParams.get("requery") || ""; // Get initial requery from URL
  const [graphData, setGraphData] = useState(null);
  const [currentQuery, setCurrentQuery] = useState(requeryFromURL); // State to hold the current query

  useEffect(() => {
    setCurrentQuery(requeryFromURL); // Update currentQuery when URL changes
  }, [requeryFromURL]);

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

  const fetchDataPlace = async (query: string) => { // 'query' is the argument passed from MainQuery
    try {
      const res = await fetch("https://rhino-frank-tightly.ngrok-free.app/graph", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ prompt: query }) // Use the 'query' argument here
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
      <MainQuery
        redirect={redirect}
        requery={requeryFromURL}
        onQuerySent={fetchDataPlace}
      />
    </div>
  );
}