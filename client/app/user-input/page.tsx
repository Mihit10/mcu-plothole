'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ComicFileUpload from '@/components/file-upload';
import MCUGraph from '@/components/main-graph';
import MainQuery from '@/components/main-query';

export default function UserInputPage() {
  const [file, setFile] = useState<File | null>(null);
  const [graphData, setGraphData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const uploadBackendUrl = "https://rhino-frank-tightly.ngrok-free.app/process_pdf"; // Define your backend URL here
  const handleFileUploadComplete = (data: any) => {
    console.log('File upload complete:', data);
    setGraphData(data);
    setIsLoading(false);
  };

  const handleFileUploadError = (error: any) => {
    console.error('File upload failed:', error);
    setIsLoading(false);
  };

  const handleFileSelect = async (selectedFile: File | null) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setIsLoading(true);


    // Dummy API call to simulate PDF upload + backend parsing
    setTimeout(() => {
      const dummyGraph = [
        {
          "a": {
            "identity": 3,
            "labels": [
              "Human"
            ],
            "properties": {
              "confidence": 0.9,
              "name": "Tony Stark",
              "type": "character"
            },
            "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
          },
          "r": {
            "identity": 1155173304420532227,
            "start": 3,
            "end": 43,
            "type": "FOUNDED",
            "properties": {
      
            },
            "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1155173304420532227",
            "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3",
            "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:43"
          },
          "b": {
            "identity": 43,
            "labels": [
              "Organization"
            ],
            "properties": {
              "confidence": 0.9,
              "name": "Avengers",
              "type": "organization"
            },
            "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:43"
          }
        },
        {
          "a": {
            "identity": 3,
            "labels": [
              "Human"
            ],
            "properties": {
              "confidence": 0.9,
              "name": "Tony Stark",
              "type": "character"
            },
            "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
          },
          "r": {
            "identity": 6917529027641081911,
            "start": 3,
            "end": 55,
            "type": "FOUNDED",
            "properties": {
      
            },
            "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:6917529027641081911",
            "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3",
            "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:55"
          },
          "b": {
            "identity": 55,
            "labels": [],
            "properties": {
              "name": "None"
            },
            "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:55"
          }
        },
        {
          "a": {
            "identity": 3,
            "labels": [
              "Human"
            ],
            "properties": {
              "confidence": 0.9,
              "name": "Tony Stark",
              "type": "character"
            },
            "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
          },
          "r": {
            "identity": 1152922604118474755,
            "start": 3,
            "end": 6,
            "type": "MARRIED",
            "properties": {
      
            },
            "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:1152922604118474755",
            "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3",
            "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:6"
          },
          "b": {
            "identity": 6,
            "labels": [
              "Human"
            ],
            "properties": {
              "confidence": 0.9,
              "name": "Pepper Potts",
              "type": "character"
            },
            "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:6"
          }
        },
        {
          "a": {
            "identity": 3,
            "labels": [
              "Human"
            ],
            "properties": {
              "confidence": 0.9,
              "name": "Tony Stark",
              "type": "character"
            },
            "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3"
          },
          "r": {
            "identity": 6917537823734104121,
            "start": 3,
            "end": 57,
            "type": "DEVELOPS",
            "properties": {
      
            },
            "elementId": "5:b74641b3-1e31-465f-8422-dd827e8b9720:6917537823734104121",
            "startNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:3",
            "endNodeElementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:57"
          },
          "b": {
            "identity": 57,
            "labels": [],
            "properties": {
              "name": "Time-Space GPS"
            },
            "elementId": "4:b74641b3-1e31-465f-8422-dd827e8b9720:57"
          }
        }];
      setGraphData(dummyGraph);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-yellow-50 p-4 md:p-8 font-comic">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* File Upload Area */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {!file && (
            <ComicFileUpload
              onFileSelect={handleFileSelect}
              uploadUrl={uploadBackendUrl} // Make sure uploadBackendUrl is defined in this component
              onUploadComplete={handleFileUploadComplete} // If you want to handle completion here
              onUploadError={handleFileUploadError}     // If you want to handle errors here
/>
          )}
        </motion.div>

        {/* Show mini file info once uploaded */}
        {file && (
          <motion.div
            className="p-3 rounded-xl bg-yellow-200 border-2 border-purple-400 text-purple-900 shadow comic-border w-fit"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            📄 <strong>Uploaded:</strong> {file.name}
          </motion.div>
        )}

        {/* Loading Animation */}
        {isLoading && (
          <motion.div
            className="text-xl text-center text-purple-700 mt-10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            ⏳ Generating timeline...
          </motion.div>
        )}

        {/* Render MCUGraph and MainQuery after data is ready */}
        {graphData && !isLoading && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-10"
          >
            <MCUGraph data={graphData} className="w-full" />
            <MainQuery />
          </motion.div>
        )}
      </div>
    </div>
  );
}
