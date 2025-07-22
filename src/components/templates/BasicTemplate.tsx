'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';

interface BasicTemplateProps {
    data: ResumeData;
}

export const BasicTemplate = React.forwardRef<HTMLDivElement, BasicTemplateProps>(
    ({ data }, ref) => {
        return (
            <div ref={ref} className="max-w-4xl mx-auto bg-white p-8 shadow-lg print:shadow-none print:p-0">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
                        {data.personalInfo.name}
                    </h1>
                    <div className="text-center space-y-1 text-gray-600">
                        <div>{data.personalInfo.email} • {data.personalInfo.phone}</div>
                        <div>{data.personalInfo.location}</div>
                        {(data.personalInfo.website || data.personalInfo.linkedin) && (
                            <div className="flex justify-center gap-4 text-sm">
                                {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
                                {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                            </div>
                        )}
                    </div>
                </header>

                {/* Summary */}
                {data.summary && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-300">
                            Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
                    </section>
                )}

                {/* Work Experience */}
                {data.workExperience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-300">
                            Experience
                        </h2>
                        {data.workExperience.map((job) => (
                            <div key={job.id} className="mb-6">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{job.role}</h3>
                                        <p className="text-gray-700 font-medium">{job.company}</p>
                                    </div>
                                    <span className="text-sm text-gray-600 sm:text-right">{job.duration}</span>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{job.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-300">
                            Education
                        </h2>
                        {data.education.map((edu) => (
                            <div key={edu.id} className="mb-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                                        <p className="text-gray-700">{edu.institution}</p>
                                        {edu.gpa && (
                                            <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-600 sm:text-right">{edu.duration}</span>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-300">
                            Skills
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {data.skills.join(' • ')}
                        </p>
                    </section>
                )}

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-300">
                            Projects
                        </h2>
                        {data.projects.map((project) => (
                            <div key={project.id} className="mb-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                                    {project.link && (
                                        <span className="text-sm text-gray-600">{project.link}</span>
                                    )}
                                </div>
                                <p className="text-gray-700 leading-relaxed mb-2">{project.description}</p>
                                <p className="text-sm text-gray-600">
                                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                                </p>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        );
    }
);

BasicTemplate.displayName = 'BasicTemplate'; 