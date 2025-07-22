'use client';

import React from 'react';
import { TemplateType, availableTemplates } from '@/types/resume';
import { CheckCircle, Circle } from 'lucide-react';

interface TemplateSelectorProps {
    selectedTemplate: TemplateType;
    onTemplateChange: (template: TemplateType) => void;
}

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Choose Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availableTemplates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => onTemplateChange(template.id)}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${selectedTemplate === template.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{template.name}</h3>
                            {selectedTemplate === template.id ? (
                                <CheckCircle className="w-5 h-5 text-blue-500" />
                            ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                            )}
                        </div>
                        <p className="text-sm text-gray-600">{template.description}</p>

                        {/* Template Preview Indicators */}
                        <div className="mt-3 flex items-center gap-2">
                            {template.id === 'harvard' && (
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-8 bg-gray-800"></div>
                                    <div className="text-xs text-gray-500">Classic</div>
                                </div>
                            )}
                            {template.id === 'basic' && (
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-8 bg-gray-400 border border-gray-300"></div>
                                    <div className="text-xs text-gray-500">Simple</div>
                                </div>
                            )}
                            {template.id === 'modern' && (
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600"></div>
                                    <div className="text-xs text-gray-500">Modern</div>
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
} 