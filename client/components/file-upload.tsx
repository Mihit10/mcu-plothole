import { useState, useRef } from 'react';
import { FileIcon, UploadCloud, X, CheckCircle, AlertCircle } from 'lucide-react';

interface ComicFileUploadProps {
  onFileSelect?: (file: File | null) => void;
}

const ComicFileUpload: React.FC<ComicFileUploadProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      if (onFileSelect) onFileSelect(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null; // Convert undefined to null
  
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      if (onFileSelect) onFileSelect(selectedFile);
    } else {
      setFile(null); // Optional: reset file state if no valid file
    }
  };
  

  const validateFile = (file: File | null): boolean => {
    if (!file) return false;
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are accepted');
      return false;
    }
    setError('');
    return true;
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onFileSelect) onFileSelect(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };


  return (
    <div className="w-full">
      {!file ? (
        <div className="comic-panel relative">
          {/* Comic panel background with dots pattern */}
          <div className="absolute inset-0 bg-yellow-100 opacity-50" style={{
            backgroundImage: 'radial-gradient(circle, #ff5757 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
          
          {/* Comic panel border */}
          <div 
            className={`relative border-8 border-black rounded-lg p-8 transition-all duration-300 ease-in-out flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden`}
            style={{
              boxShadow: '8px 8px 0px 0px rgba(0,0,0,0.75)',
              background: isDragging ? 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)' : 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
            }}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handleFileSelect}
            />

            {/* Comic style burst badge */}
            <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6">
              <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-12"
                   style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}}>
                <span className="text-xs font-extrabold text-center text-red-600" style={{transform: 'rotate(-12deg)'}}>PDF ONLY!</span>
              </div>
            </div>

            {/* Comic style upload icon */}
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-white rounded-full transform rotate-45"></div>
              <div className="absolute inset-0 bg-blue-500 rounded-full transform scale-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <UploadCloud className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Comic style typography with text effects */}
            <h3 className="text-black font-extrabold text-3xl mb-3" style={{
              textShadow: '2px 2px 0px #ffffff, 4px 4px 0px #ff0000',
              fontFamily: 'Bangers, cursive',
              letterSpacing: '2px'
            }}>
              DROP IT HERE!
            </h3>
            
            <div className="bg-white p-3 transform -rotate-2 mb-4" style={{
              border: '3px solid black',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.75)'
            }}>
              <p className="text-black font-bold" style={{
                fontFamily: 'Comic Sans MS, cursive',
                transform: 'rotate(2deg)'
              }}>
                Your PDF adventure awaits!
              </p>
            </div>

            {/* Comic style speech bubble for button */}
            <div className="relative mb-4">
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-3 w-6 h-6 bg-red-500 rotate-45"></div>
              <button
                type="button"
                onClick={handleBrowseClick}
                className="px-6 py-3 bg-red-500 text-white font-extrabold rounded-lg transform transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                  fontFamily: 'Bangers, cursive',
                  border: '3px solid black',
                  boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.75)',
                  letterSpacing: '1px'
                }}
              >
                BROWSE FILES!
              </button>
            </div>

            {/* Comic style caption */}
            <p className="mt-4 text-xs bg-white px-2 py-1 rounded-full border-2 border-black font-bold italic text-black">
              *Superheroes only accept PDF formats
            </p>

            {isDragging && (
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center" style={{
                background: 'repeating-linear-gradient(45deg, rgba(255,255,0,0.2), rgba(255,255,0,0.2) 10px, rgba(255,0,0,0.2) 10px, rgba(255,0,0,0.2) 20px)'
              }}>
                <div className="bg-yellow-400 p-6 transform rotate-6 rounded" style={{
                  border: '5px solid black',
                  boxShadow: '5px 5px 0 rgba(0,0,0,0.75)'
                }}>
                  <span className="text-black font-extrabold text-2xl" style={{
                    fontFamily: 'Bangers, cursive',
                    textShadow: '1px 1px 0 white'
                  }}>KAPOW! DROP IT!</span>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 text-center">
                <div className="inline-block bg-white p-2 border-2 border-red-500" style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)'
                }}>
                  <p className="text-red-500 font-bold flex items-center justify-center pb-6" style={{
                    fontFamily: 'Comic Sans MS, cursive'
                  }}>
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {error}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border-8 border-black rounded-lg p-5 overflow-hidden relative" style={{
          background: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
          boxShadow: '8px 8px 0px 0px rgba(0,0,0,0.75)'
        }}>
          {/* Diagonal stripes in background */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 10px, transparent 10px, transparent 20px)'
          }}></div>
          
          {/* Success badge */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500 rounded-full flex items-center justify-center transform rotate-12"
               style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}}>
            <span className="text-xs font-extrabold text-center text-white" style={{transform: 'rotate(-12deg)'}}>UPLOADED!</span>
          </div>
          
          <div className="flex items-center relative z-10">
            <div className="p-4 rounded-full mr-4 bg-blue-500 border-4 border-black">
              <FileIcon className="w-8 h-8 text-white" />
            </div>

            <div className="flex-1 min-w-0 bg-white p-2 rounded border-2 border-black" style={{
              transform: 'rotate(-1deg)'
            }}>
              <h4 className="text-black font-bold text-lg truncate" style={{
                fontFamily: 'Comic Sans MS, cursive'
              }}>{file.name}</h4>
              <p className="text-gray-700 text-sm font-bold italic">{formatFileSize(file.size)}</p>
            </div>

            <div className="flex items-center space-x-3 ml-3">
              <div>
                <CheckCircle className="w-8 h-8 text-green-500 drop-shadow-md" />
              </div>
              <button
                onClick={handleRemoveFile}
                className="p-2 bg-red-500 rounded-full border-2 border-black hover:bg-red-600 transition-colors duration-200 focus:outline-none"
                style={{
                  boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.75)'
                }}
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComicFileUpload;