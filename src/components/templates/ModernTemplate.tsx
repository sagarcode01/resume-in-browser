'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';

interface ModernTemplateProps {
    data: ResumeData;
}

export const ModernTemplate = React.forwardRef<HTMLDivElement, ModernTemplateProps>(
    ({ data }, ref) => {
        return (
            <div ref={ref} className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
                {/* Header */}
                <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
                    <h1 className="text-4xl font-bold mb-3">
                        {data.personalInfo.name}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-blue-100">
                        <span>{data.personalInfo.email}</span>
                        <span>{data.personalInfo.phone}</span>
                        <span>{data.personalInfo.location}</span>
                        {data.personalInfo.website && (
                            <span>{data.personalInfo.website}</span>
                        )}
                        {data.personalInfo.linkedin && (
                            <span>{data.personalInfo.linkedin}</span>
                        )}
                    </div>
                </header>

                <div className="p-8">
                    {/* Summary */}
                    {data.summary && (
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                                <div className="w-1 h-6 bg-blue-600 mr-3"></div>
                                Professional Summary
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {data.workExperience.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                                <div className="w-1 h-6 bg-blue-600 mr-3"></div>
                                Professional Experience
                            </h2>
                            {data.workExperience.map((job) => (
                                <div key={job.id} className="mb-6 pl-4 border-l-2 border-blue-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">{job.role}</h3>
                                            <p className="text-blue-600 font-medium text-lg">{job.company}</p>
                                        </div>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {job.duration}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{job.description}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Education */}
                    {data.education.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                                <div className="w-1 h-6 bg-blue-600 mr-3"></div>
                                Education
                            </h2>
                            {data.education.map((edu) => (
                                <div key={edu.id} className="mb-4 pl-4 border-l-2 border-blue-200">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                                            <p className="text-blue-600 font-medium">{edu.institution}</p>
                                            {edu.gpa && (
                                                <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                                            )}
                                        </div>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {edu.duration}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                                <div className="w-1 h-6 bg-blue-600 mr-3"></div>
                                Technical Skills
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {data.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.projects.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                                <div className="w-1 h-6 bg-blue-600 mr-3"></div>
                                Projects
                            </h2>
                            {data.projects.map((project) => (
                                <div key={project.id} className="mb-6 pl-4 border-l-2 border-blue-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                                        {project.link && (
                                            <span className="text-sm text-blue-600 font-medium">{project.link}</span>
                                        )}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        );
    }
);

ModernTemplate.displayName = 'ModernTemplate'; 