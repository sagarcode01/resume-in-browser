'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ResumeEditor } from '@/components/ResumeEditor';
import { ResumePreview } from '@/components/ResumePreview';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultResumeData, ResumeData } from '@/types/resume';
import { Download, FileText } from 'lucide-react';

export default function Home() {
  const [resumeData, setResumeData] = useLocalStorage<ResumeData>('resumeData', defaultResumeData);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume`,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Resume Builder by
                <a href="https://x.com/_sagar_js" target="_blank" className="text-blue-600 ml-2">
                  Tenzor
                </a>
              </h1>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Editor Panel */}
          <div className="space-y-6 lg:pr-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Edit Your Resume</h2>
              <p className="text-gray-600">
                Fill out the form below and see your resume update in real-time. Your data is automatically saved in your browser.
              </p>
            </div>
            <ResumeEditor data={resumeData} onChange={setResumeData} />
          </div>

          {/* Preview Panel - Sticky */}
          <div className="mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Live Preview</h2>
                  <p className="text-gray-600">
                    Your resume will look like this when printed or exported to PDF.
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-lg">
                <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
                  <ResumePreview ref={printRef} data={resumeData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>Built with Cursor in 1H</p>
            <p>Contribute a new template here
              <a href="https://github.com/sagarcode01/resume-in-browser" target="_blank" className="text-blue-600"> GitHub
              </a>
            </p>
            <p className="mt-2 text-sm">Your data is stored locally in your browser and never leaves your device.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
