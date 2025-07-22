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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Edit Your Resume</h2>
              <p className="text-gray-600">
                Fill out the form below and see your resume update in real-time. Your data is automatically saved in your browser.
              </p>
            </div>
            <ResumeEditor data={resumeData} onChange={setResumeData} />
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Live Preview</h2>
                <p className="text-gray-600">
                  Your resume will look like this when printed or exported to PDF.
                </p>
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <ResumePreview ref={printRef} data={resumeData} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
            <p className="mt-2 text-sm">Your data is stored locally in your browser and never leaves your device.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
