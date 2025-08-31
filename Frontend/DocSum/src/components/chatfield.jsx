import React, { useState } from 'react';
import { Upload, FileText, Loader2, AlertCircle, CheckCircle, BookOpen } from 'lucide-react';

export default function DocumentSummaryUploader() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCitation, setSelectedCitation] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setSummaryData(null);
      setSelectedCitation(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSummaryData(data);
    } catch (err) {
      setError(err.message || 'An error occurred while uploading the file');
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setError(null);
      setSummaryData(null);
      setSelectedCitation(null);
    }
  };

  const handleCitationClick = (citationMap) => {
    if (selectedCitation && selectedCitation.summary_sentence === citationMap.summary_sentence) {
      setSelectedCitation(null);
    } else {
      setSelectedCitation(citationMap);
    }
  };

  const renderSummaryWithCitations = () => {
    if (!summaryData || !summaryData.citation_map) return null;

    const summaryLines = summaryData.summary.split('\n').filter(line => line.trim());
    
    return (
      <div className="bg-slate-900 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Document Analysis Results</h2>
            <p className="text-slate-300">Click on any highlighted text to view its source reference</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            {/* Summary Section - Left Side */}
            <div className="bg-slate-800 rounded-lg p-6 overflow-y-auto">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-400 mr-2" />
                <h3 className="text-xl font-semibold text-white">Document Summary</h3>
              </div>
              
              <div className="prose prose-invert max-w-none">
                {summaryLines.map((line, lineIndex) => {
                  if (!line.trim()) return null;
                  
                  // Find citations for this line
                  const lineCitations = summaryData.citation_map.filter(citation => 
                    line.includes(citation.summary_sentence.trim())
                  );

                  if (lineCitations.length > 0) {
                    let processedLine = line;
                    
                    // Sort citations by length (longest first) to avoid overlap issues
                    lineCitations.sort((a, b) => b.summary_sentence.length - a.summary_sentence.length);
                    
                    lineCitations.forEach((citation, citationIndex) => {
                      const sentence = citation.summary_sentence.trim();
                      if (processedLine.includes(sentence)) {
                        const isSelected = selectedCitation && selectedCitation.summary_sentence === sentence;
                        const highlightClass = isSelected 
                          ? 'bg-blue-500 text-white cursor-pointer px-1 py-0.5 rounded transition-all duration-200' 
                          : 'bg-blue-200 text-blue-900 cursor-pointer px-1 py-0.5 rounded hover:bg-blue-300 transition-all duration-200';
                        
                        processedLine = processedLine.replace(
                          sentence,
                          `<span class="${highlightClass}" data-citation="${citationIndex}">${sentence}</span>`
                        );
                      }
                    });

                    return (
                      <div 
                        key={lineIndex} 
                        className="mb-4 leading-relaxed text-slate-200"
                        dangerouslySetInnerHTML={{ __html: processedLine }}
                        onClick={(e) => {
                          if (e.target.dataset.citation !== undefined) {
                            const citationIndex = parseInt(e.target.dataset.citation);
                            handleCitationClick(lineCitations[citationIndex]);
                          }
                        }}
                      />
                    );
                  }

                  return (
                    <div key={lineIndex} className="mb-4 leading-relaxed text-slate-200">
                      {line}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reference Section - Right Side */}
            <div className="bg-slate-800 rounded-lg p-6 overflow-y-auto">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-amber-400 mr-2" />
                <h3 className="text-xl font-semibold text-white">Source Reference</h3>
              </div>
              
              {selectedCitation ? (
                <div className="space-y-4">
                  <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-blue-400">
                    <h4 className="text-sm font-medium text-blue-300 mb-2">Selected Summary Text:</h4>
                    <p className="text-slate-200 italic">"{selectedCitation.summary_sentence}"</p>
                  </div>
                  
                  <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-amber-400">
                    <h4 className="text-sm font-medium text-amber-300 mb-2">
                      Source Paragraph (ID: {selectedCitation.reference_paragraph_id}):
                    </h4>
                    <p className="text-slate-200 leading-relaxed">
                      {selectedCitation.reference_text}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-slate-400">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Click on any highlighted text in the summary to view its source reference</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {!summaryData ? (
        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Document Analysis Platform</h1>
            <p className="text-slate-300">Upload a document to get an AI-generated summary with interactive citations</p>
          </div>

          {/* Upload Section */}
          <div className="mb-8">
            <div
              className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-slate-500 transition-colors bg-slate-800"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
              <div className="mb-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block">
                    Choose File
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                </label>
                <p className="text-slate-400 mt-3">or drag and drop your document here</p>
              </div>
              <p className="text-sm text-slate-500">Supports PDF, DOC, DOCX, TXT files</p>
            </div>

            {file && (
              <div className="mt-6 flex items-center justify-between bg-slate-800 p-4 rounded-lg border border-slate-600">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-slate-400 mr-3" />
                  <div>
                    <span className="text-slate-200 font-medium">{file.name}</span>
                    <span className="text-slate-400 text-sm ml-2">({Math.round(file.size / 1024)} KB)</span>
                  </div>
                </div>
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Generate Summary'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-900/50 border border-red-600 rounded-lg p-4 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-red-300">Error</h3>
                <p className="text-sm text-red-200 mt-1">{error}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        renderSummaryWithCitations()
      )}

      {/* Success Message - Only show when summary is loaded */}
      {summaryData && (
        <div className="fixed top-4 right-4 bg-green-800/90 border border-green-600 rounded-lg p-4 flex items-center max-w-sm backdrop-blur-sm">
          <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-green-300">Analysis Complete</h3>
            <p className="text-sm text-green-200">Interactive summary ready</p>
          </div>
        </div>
      )}

      {/* Back to Upload Button */}
      {summaryData && (
        <button
          onClick={() => {
            setSummaryData(null);
            setFile(null);
            setSelectedCitation(null);
          }}
          className="fixed bottom-6 left-6 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors border border-slate-600"
        >
          ← Upload New Document
        </button>
      )}
    </div>
  );
}