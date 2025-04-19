'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Minimize2, HelpCircle } from 'lucide-react'; // Assuming HelpCircle might be used for the legend toggle later
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

// Dynamically import ForceGraph2D with no SSR
const ForceGraph2D = dynamic(
  () => import('react-force-graph-2d'),
  { ssr: false }
);

// Updated Types for the graph data
type NodeLabel = 'Human' | 'Organization' | 'Timeline' | 'Location' | 'Weapons' | 'Others';

interface GraphNode {
  id: string;
  name: string;
  type: string; // Original type property from data, if needed
  label: NodeLabel; // The category for styling
  confidence: number;
}

interface GraphLink {
  source: string;
  target: string;
  type: string; // Relationship type
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface MCUGraphProps {
  data: any[]; // Your raw data format
  className?: string;
}

// Updated NODE_COLORS based on new categories
const NODE_COLORS: Record<NodeLabel, string> = {
  Human: '#FFD700',       // Gold
  Organization: '#7B68EE', // Medium slate blue
  Timeline: '#FF69B4',     // Hot pink (representing time/events)
  Location: '#32CD32',     // Lime green
  Weapons: '#FF4500',      // Orange-red (representing artifacts/weapons)
  Others: '#708090',       // Slate gray (fallback)
};

// Updated NODE_ICONS based on new categories
const NODE_ICONS: Record<NodeLabel, string> = {
  Human: '👤', // Person
  Organization: '🏢', // Building
  Timeline: '⏳', // Hourglass
  Location: '📍', // Pin
  Weapons: '⚔️', // Crossed Swords
  Others: '❓', // Question mark
};

// Helper function to map raw labels to new categories
const mapLabelToCategory = (labels: string[] | undefined): NodeLabel => {
  if (!labels || labels.length === 0) return 'Others';
  const primaryLabel = labels[0]; // Assuming the first label is the most relevant

  // Basic mapping logic (you might need to refine this based on your actual data labels)
  if (primaryLabel === 'Human' || primaryLabel === 'Character') return 'Human';
  if (primaryLabel === 'Organization' || primaryLabel === 'Team') return 'Organization';
  if (primaryLabel === 'Location' || primaryLabel === 'Place') return 'Location';
  if (primaryLabel === 'Artifact' || primaryLabel === 'Weapon' || primaryLabel === 'Technology') return 'Weapons';
  if (primaryLabel === 'Event' || primaryLabel === 'Timeline') return 'Timeline';

  // More specific checks can go here...

  return 'Others'; // Fallback category
};


const MCUGraph = ({ data, className }: MCUGraphProps) => {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1); // Tracks current zoom programmatically
  const [showLegend, setShowLegend] = useState(true);
  const [graphInitialized, setGraphInitialized] = useState(false);
  const graphRef = useRef<any>(null); // Use 'any' or install/find types for react-force-graph
  const containerRef = useRef<HTMLDivElement>(null);

  // Convert the input data to the format needed by ForceGraph2D
  useEffect(() => {
    if (!data || !data.length) {
       setGraphData({ nodes: [], links: [] }); // Clear graph if data is empty
       return;
    }

    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    const nodeMap = new Map<number, string>();

    data.forEach(item => {
      // Basic validation for item structure
      if (!item || !item.a || !item.b || !item.r || !item.a.identity || !item.b.identity || !item.a.properties || !item.b.properties) return;
      // Skip nodes named "None" as requested
      if (item.a.properties.name === "None" || item.b.properties.name === "None") return;

      // Process node A
      const aId = `node-${item.a.identity}`;
      if (!nodeMap.has(item.a.identity)) {
        nodeMap.set(item.a.identity, aId);
        nodes.push({
          id: aId,
          name: item.a.properties.name || 'Unknown Name',
          type: item.a.properties.type || 'unknown', // Keep original type if needed
          label: mapLabelToCategory(item.a.labels), // Map to defined categories
          confidence: item.a.properties.confidence || 0.5,
        });
      }

      // Process node B
      const bId = `node-${item.b.identity}`;
      if (!nodeMap.has(item.b.identity)) {
        nodeMap.set(item.b.identity, bId);
        nodes.push({
          id: bId,
          name: item.b.properties.name || 'Unknown Name',
          type: item.b.properties.type || 'unknown', // Keep original type if needed
          label: mapLabelToCategory(item.b.labels), // Map to defined categories
          confidence: item.b.properties.confidence || 0.5,
        });
      }

      // Process relationship (link)
      if (item.r.type) { // Ensure relationship type exists
        links.push({
          source: aId,
          target: bId,
          type: item.r.type,
        });
      }
    });

    setGraphData({ nodes, links });
    // Use a short delay to ensure DOM is ready and graph instance exists
    // This helps prevent race conditions before calling graphRef methods
    const initTimer = setTimeout(() => setGraphInitialized(true), 100);

    return () => clearTimeout(initTimer); // Cleanup timer on unmount or data change

  }, [data]); // Rerun effect when data changes


  // Handle zoom buttons
  const handleZoomIn = () => {
    if (graphRef.current) {
      const currentZoom = graphRef.current.zoom();
      const newZoom = currentZoom * 1.3; // Increase zoom factor
      graphRef.current.zoom(newZoom, 500); // Smooth zoom transition
      setZoomLevel(newZoom);
    }
  };

  const handleZoomOut = () => {
    if (graphRef.current) {
      const currentZoom = graphRef.current.zoom();
      const newZoom = currentZoom / 1.3; // Decrease zoom factor
      graphRef.current.zoom(newZoom, 500); // Smooth zoom transition
      setZoomLevel(newZoom);
    }
  };

  const handleResetView = () => {
    if (graphRef.current && graphData.nodes.length > 0) {
        // Center graph and set a default zoom level slightly closer than default fit
        graphRef.current.zoomToFit(400, 60); // Adjust padding for closer initial view
        // Optionally, center on a specific node or coords if needed after zoomToFit
        // graphRef.current.centerAt(x, y, 500);
        // Update internal zoom state tracker after zoomToFit finishes
        setTimeout(() => {
             if (graphRef.current) {
                setZoomLevel(graphRef.current.zoom());
             }
        }, 410); // Slightly after zoomToFit duration
    }
  };

  // Initialize graph view after graph data is set and component is mounted
  useEffect(() => {
    if (graphInitialized && graphRef.current && graphData.nodes.length > 0) {
      // Fit graph to view after initialization
      // Use a slightly larger padding to make it seem a bit more zoomed in initially
      const fitTimer = setTimeout(() => {
        if (graphRef.current) {
          graphRef.current.zoomToFit(400, 60); // Padding: smaller value zooms more
          // Update the zoom level state after the initial fit
           setTimeout(() => {
               if (graphRef.current) {
                 setZoomLevel(graphRef.current.zoom());
               }
           }, 410); // Update state after zoom animation
        }
      }, 500); // Delay fitting slightly more to ensure layout stabilization

       return () => clearTimeout(fitTimer); // Cleanup timer
    }
  }, [graphInitialized, graphData.nodes.length]); // Dependencies: initialization flag and node presence


  return (
    <div
      className={cn(
        "relative bg-zinc-900 rounded-lg border-4 border-yellow-500 overflow-hidden",
        className
      )}
      ref={containerRef}
      style={{
        height: '70vh', // Example height, adjust as needed
        backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)', // Slightly lighter dots
        backgroundSize: '25px 25px', // Slightly larger grid
      }}
    >
      {/* Comic-style header */}
      <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-zinc-800 to-transparent z-10 flex justify-between items-center">
         <h2 className="font-bangers text-3xl text-yellow-400 tracking-wider text-center flex-grow" style={{ textShadow: '2px 2px #000' }}>
            MCU UNIVERSE CONNECTIONS
         </h2>
         <button
            onClick={() => setShowLegend(!showLegend)}
            title={showLegend ? "Hide Legend" : "Show Legend"}
            className="bg-zinc-800 text-yellow-400 p-2 rounded-full hover:bg-zinc-700 transition-colors mr-2 border border-yellow-500"
         >
            <HelpCircle size={20} />
         </button>
      </div>


      {/* Graph container */}
      <div className="w-full h-full pt-12"> {/* Add padding-top to avoid overlap with header */}
        {graphInitialized && graphData.nodes.length > 0 && (
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            nodeLabel={node => `${(node as GraphNode).name}`} // Tooltip on hover (browser default)
            nodeColor={node => NODE_COLORS[(node as GraphNode).label] || NODE_COLORS.Others} // Use updated colors/labels
            // --- Node Rendering ---
            nodeCanvasObject={(node, ctx, globalScale) => {
              const { x, y, id, name, label } = node as GraphNode & { x: number, y: number };
              if (x === undefined || y === undefined) return; // Ensure node has coordinates

              const baseNodeSize = 8; // Base size
              const nodeSize = Math.max(4, baseNodeSize / Math.sqrt(globalScale)); // Node size adjusts with zoom, min size 4
              const fontSize = Math.min(14, 10 / globalScale); // Font size adjusts, max size 14
              const iconFontSize = Math.max(8, nodeSize * 1.2); // Icon size relative to node size
              const outlineWidth = Math.max(0.5, 2 / globalScale); // Outline width adjusts


              // Comic book style node (Circle)
              ctx.beginPath();
              ctx.arc(x, y, nodeSize, 0, 2 * Math.PI, false);
              ctx.fillStyle = NODE_COLORS[label] || NODE_COLORS.Others;
              ctx.strokeStyle = 'black'; // Black outline for comic feel
              ctx.lineWidth = outlineWidth;
              ctx.fill();
              ctx.stroke();

              // Add icon in the center (adjust size with zoom)
               if (globalScale > 0.3) { // Only draw icon if node is large enough
                    ctx.font = `${iconFontSize}px Sans-Serif`; // Simple font for emoji icon
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = 'black'; // Icon color
                    const icon = NODE_ICONS[label] || '❓';
                    ctx.fillText(icon, x, y);
               }

              // Display name in speech bubble on hover or when zoomed in significantly
              if (hoveredNode?.id === id || globalScale > 2.5) { // Show name if hovered or very zoomed in
                const nameFontSize = Math.max(8, 12 / globalScale); // Adjust name font size, min size 8
                const bgPadding = Math.max(2, 4 / globalScale); // Padding adjusts

                ctx.font = `bold ${nameFontSize}px "Comic Sans MS", cursive`; // Comic font for name
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const textWidth = ctx.measureText(name).width;
                const bubbleWidth = textWidth + bgPadding * 2;
                const bubbleHeight = nameFontSize + bgPadding * 2;
                const bubbleYOffset = nodeSize + bubbleHeight / 2 + Math.max(3, 5 / globalScale); // Position above node
                const bubbleX = x;
                const bubbleY = y - bubbleYOffset;

                // Draw speech bubble background (manual rounded rect)
                 ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; // Semi-transparent white
                 ctx.strokeStyle = 'black';
                 ctx.lineWidth = Math.max(0.5, 1.5/globalScale);
                 const cornerRadius = Math.max(2, 5 / globalScale);

                 ctx.beginPath();
                 ctx.moveTo(bubbleX - bubbleWidth / 2 + cornerRadius, bubbleY - bubbleHeight / 2);
                 ctx.lineTo(bubbleX + bubbleWidth / 2 - cornerRadius, bubbleY - bubbleHeight / 2);
                 ctx.arcTo(bubbleX + bubbleWidth / 2, bubbleY - bubbleHeight / 2, bubbleX + bubbleWidth / 2, bubbleY - bubbleHeight / 2 + cornerRadius, cornerRadius);
                 ctx.lineTo(bubbleX + bubbleWidth / 2, bubbleY + bubbleHeight / 2 - cornerRadius);
                 ctx.arcTo(bubbleX + bubbleWidth / 2, bubbleY + bubbleHeight / 2, bubbleX + bubbleWidth / 2 - cornerRadius, bubbleY + bubbleHeight / 2, cornerRadius);
                 ctx.lineTo(bubbleX - bubbleWidth / 2 + cornerRadius, bubbleY + bubbleHeight / 2);
                 ctx.arcTo(bubbleX - bubbleWidth / 2, bubbleY + bubbleHeight / 2, bubbleX - bubbleWidth / 2, bubbleY + bubbleHeight / 2 - cornerRadius, cornerRadius);
                 ctx.lineTo(bubbleX - bubbleWidth / 2, bubbleY - bubbleHeight / 2 + cornerRadius);
                 ctx.arcTo(bubbleX - bubbleWidth / 2, bubbleY - bubbleHeight / 2, bubbleX - bubbleWidth / 2 + cornerRadius, bubbleY - bubbleHeight / 2, cornerRadius);
                 ctx.closePath();
                 ctx.fill();
                 ctx.stroke();


                // Draw speech bubble tail
                const tailBaseWidth = Math.max(4, 8 / globalScale);
                const tailHeight = Math.max(3, 5 / globalScale);
                ctx.beginPath();
                ctx.moveTo(x, y - nodeSize - outlineWidth / 2); // Start slightly above node outline
                ctx.lineTo(x - tailBaseWidth / 2, y - nodeSize - tailHeight);
                ctx.lineTo(x + tailBaseWidth / 2, y - nodeSize - tailHeight);
                ctx.closePath();
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.fill();
                ctx.stroke();


                // Draw Text inside bubble
                ctx.fillStyle = 'black'; // Text color
                ctx.fillText(name, bubbleX, bubbleY);
              }
            }}
            // --- Link Rendering ---
            linkCanvasObject={(link, ctx, globalScale) => {
              const start = link.source as GraphNode & { x: number, y: number };
              const end = link.target as GraphNode & { x: number, y: number };
              const type = (link as GraphLink).type;

              if (!start || !end || start.x === undefined || start.y === undefined || end.x === undefined || end.y === undefined) return; // Ensure links have coords

              const lineWidth = Math.max(0.5, 1.5 / globalScale); // Adjust line width with zoom
              const linkColor = '#FFD700'; // Gold color for links

              // Line
              ctx.beginPath();
              ctx.moveTo(start.x, start.y);
              ctx.lineTo(end.x, end.y);
              ctx.strokeStyle = linkColor; // Use theme color
              ctx.lineWidth = lineWidth;
              ctx.stroke();

              // Relationship text (only if zoomed in enough)
               if (globalScale > 0.8 && type) { // Show relationship type when reasonably zoomed
                    const midX = (start.x + end.x) / 2;
                    const midY = (start.y + end.y) / 2;

                    const fontSize = Math.min(12, Math.max(6, 10 / globalScale)); // Adjust font size, min 6, max 12
                    ctx.font = `italic ${fontSize}px "Comic Sans MS", cursive`; // Comic font, italic
                    const textWidth = ctx.measureText(type).width;
                    const bgPadding = Math.max(1, 3 / globalScale); // Adjust padding

                    const textHeight = fontSize;
                    const rectWidth = textWidth + bgPadding * 2;
                    const rectHeight = textHeight + bgPadding * 2;
                    const cornerRadius = Math.max(1, 3 / globalScale);

                    // Draw background bubble for text (manual rounded rect)
                    ctx.fillStyle = 'rgba(255, 215, 0, 0.85)'; // Semi-transparent gold
                    ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)'; // Darker outline for contrast
                    ctx.lineWidth = Math.max(0.3, 1 / globalScale);

                    ctx.beginPath();
                    ctx.moveTo(midX - rectWidth / 2 + cornerRadius, midY - rectHeight / 2);
                    ctx.lineTo(midX + rectWidth / 2 - cornerRadius, midY - rectHeight / 2);
                    ctx.arcTo(midX + rectWidth / 2, midY - rectHeight / 2, midX + rectWidth / 2, midY - rectHeight / 2 + cornerRadius, cornerRadius);
                    ctx.lineTo(midX + rectWidth / 2, midY + rectHeight / 2 - cornerRadius);
                    ctx.arcTo(midX + rectWidth / 2, midY + rectHeight / 2, midX + rectWidth / 2 - cornerRadius, midY + rectHeight / 2, cornerRadius);
                    ctx.lineTo(midX - rectWidth / 2 + cornerRadius, midY + rectHeight / 2);
                    ctx.arcTo(midX - rectWidth / 2, midY + rectHeight / 2, midX - rectWidth / 2, midY + rectHeight / 2 - cornerRadius, cornerRadius);
                    ctx.lineTo(midX - rectWidth / 2, midY - rectHeight / 2 + cornerRadius);
                    ctx.arcTo(midX - rectWidth / 2, midY - rectHeight / 2, midX - rectWidth / 2 + cornerRadius, midY - rectHeight / 2, cornerRadius);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    // Draw Text
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = 'black'; // Black text for readability on gold
                    ctx.fillText(type, midX, midY);
               }
            }}
            // linkDirectionalArrowLength={Math.max(2, 5 / globalScale)} // Arrow size adjusts
            linkDirectionalArrowLength={4} // Set a fixed size for the arrow head. // Arrow size adjusts
            linkDirectionalArrowRelPos={0.9} // Position arrow near the target node
            linkDirectionalArrowColor={() => '#FFEB3B'} // Changed arrow color to a bright Yellow
            onNodeHover={node => setHoveredNode(node as GraphNode | null)} // Handle null when hovering off
            onBackgroundClick={() => setHoveredNode(null)} // Clear hover on background click
            cooldownTicks={50} // Reduce physics simulation time slightly for faster stabilization
            warmupTicks={10} // Start with some iterations
            enableZoomInteraction={true}
            enablePanInteraction={true}
            enableNodeDrag={true}
          />
        )}
      </div>

      {/* Zoom controls - Comic style */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomIn}
          title="Zoom In"
          className="bg-yellow-500 text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-black hover:bg-yellow-400 transition-colors"
        >
          <Maximize2 size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomOut}
          title="Zoom Out"
          className="bg-yellow-500 text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-black hover:bg-yellow-400 transition-colors"
        >
          <Minimize2 size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleResetView}
          title="Reset View"
          className="bg-zinc-800 text-yellow-400 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-500 hover:bg-zinc-700 transition-colors"
        >
          {/* Simple Reset Icon (Replace with a suitable one if needed) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/><path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/></svg>
        </motion.button>
      </div>

       {/* Legend (Using updated categories) */}
        {showLegend && (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-20 left-4 bg-zinc-800 bg-opacity-90 p-4 rounded-lg border-2 border-yellow-500 shadow-lg max-w-xs z-10"
            >
            <h3 className="font-bangers text-xl text-yellow-400 mb-3 text-center border-b border-yellow-600 pb-1">LEGEND</h3>
            <div className="space-y-2">
                {Object.entries(NODE_COLORS).map(([label, color]) => (
                <div key={label} className="flex items-center gap-3">
                    <div
                    className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center"
                    style={{ backgroundColor: color }}
                    title={label}
                    >
                      <span className="text-sm">{NODE_ICONS[label as NodeLabel]}</span>
                    </div>
                    <div className="text-white font-comic text-sm">{label}</div>
                </div>
                ))}
            </div>
            <div className="mt-4 border-t border-zinc-600 pt-2">
                <div className="flex items-center gap-2">
                <div className="w-8 h-[3px] bg-yellow-500 rounded"></div>
                <div className="text-white font-comic text-sm">Relationship</div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                 <svg width="20" height="10" viewBox="0 0 20 10">
                    <line x1="0" y1="5" x2="15" y2="5" stroke="#FFEB3B" strokeWidth="1.5"/>
                    <polygon points="14,2 20,5 14,8" fill="#FFEB3B"/>
                 </svg>
                 <div className="text-white font-comic text-sm">Direction</div>
                </div>
            </div>
            <div className="mt-3 text-xs text-zinc-300 italic space-y-1">
                <p>• Drag nodes to rearrange.</p>
                <p>• Scroll / Pinch to zoom.</p>
                <p>• Hover node for its name.</p>
                <p>• Click background to deselect.</p>
            </div>
            </motion.div>
        )}

      {/* Loading state or empty data message */}
      {(!graphInitialized || graphData.nodes.length === 0) && (
         <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-80 z-20">
            <div className="bg-zinc-800 p-6 rounded-lg border-4 border-yellow-500 text-center max-w-md shadow-xl">
            <h3 className="font-bangers text-2xl text-yellow-400 mb-4 animate-pulse">
                {!data || data.length === 0 ? "NO CONNECTIONS LOADED!" : "ASSEMBLING THE UNIVERSE..."}
            </h3>
            <p className="text-white font-comic">
                {!data || data.length === 0
                ? "Looks like the data stream is empty. Check your source or try reloading!"
                : "Calculating connections across realities... The graph will appear shortly!"}
            </p>
            {/* Optional: Add a spinner here */}
            {graphInitialized && (!data || data.length === 0) && (
                 <button onClick={() => window.location.reload()} className="mt-4 bg-yellow-500 text-black font-comic px-4 py-1 rounded border border-black hover:bg-yellow-400">
                    Reload Data?
                 </button>
            )}
            </div>
        </div>
      )}
    </div>
  );
};

export default MCUGraph;