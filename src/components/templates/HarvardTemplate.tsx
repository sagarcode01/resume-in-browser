'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';

interface HarvardTemplateProps {
    data: ResumeData;
}

export const HarvardTemplate = React.forwardRef<HTMLDivElement, HarvardTemplateProps>(
    ({ data }, ref) => {
        return (
            <div ref={ref} className="max-w-4xl mx-auto bg-white p-8 shadow-lg print:shadow-none print:p-0">
                {/* Header */}
                <header className="border-b-2 border-gray-800 pb-4 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {data.personalInfo.name}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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

                {/* Summary */}
                {data.summary && (
                    <section className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2 uppercase tracking-wider">
                            Professional Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
                    </section>
                )}

                {/* Work Experience */}
                {data.workExperience.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wider">
                            Professional Experience
                        </h2>
                        {data.workExperience.map((job) => (
                            <div key={job.id} className="mb-4">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-gray-900">{job.role}</h3>
                                    <span className="text-sm text-gray-600">{job.duration}</span>
                                </div>
                                <p className="text-gray-700 font-medium mb-2">{job.company}</p>
                                <p className="text-gray-700 leading-relaxed">{job.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wider">
                            Education
                        </h2>
                        {data.education.map((edu) => (
                            <div key={edu.id} className="mb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                                        <p className="text-gray-700">{edu.institution}</p>
                                        {edu.gpa && (
                                            <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-600">{edu.duration}</span>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wider">
                            Technical Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wider">
                            Projects
                        </h2>
                        {data.projects.map((project) => (
                            <div key={project.id} className="mb-4">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                                    {project.link && (
                                        <span className="text-sm text-gray-600">{project.link}</span>
                                    )}
                                </div>
                                <p className="text-gray-700 leading-relaxed mb-2">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
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
        );
    }
);

HarvardTemplate.displayName = 'HarvardTemplate'; 