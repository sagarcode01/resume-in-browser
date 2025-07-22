'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';

interface HarvardTemplateProps {
    data: ResumeData;
}

export const HarvardTemplate = React.forwardRef<HTMLDivElement, HarvardTemplateProps>(
    ({ data }, ref) => {
        return (
            <div
                ref={ref}
                className="max-w-[850px] mx-auto bg-white p-10 print:p-10 font-serif text-black text-[15px] leading-[1.4] print:text-black print:bg-white"
                style={{ fontFamily: 'Times New Roman, Times, serif' }}
            >
                {/* Header */}
                <header className="text-center border-b-2 border-black pb-2 mb-4">
                    <h1 className="text-3xl font-bold tracking-wide mb-1 uppercase">{data.personalInfo.name}</h1>
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[15px] font-normal text-black">
                        <span>{data.personalInfo.email}</span>
                        <span>{data.personalInfo.phone}</span>
                        <span>{data.personalInfo.location}</span>
                        {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
                        {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                    </div>
                </header>

                {/* Summary */}
                {data.summary && (
                    <section className="mb-3">
                        <h2 className="font-bold text-[1.1em] mb-1 tracking-wide border-b border-black/60 uppercase">Summary</h2>
                        <p className="mt-1 text-[15px]">{data.summary}</p>
                    </section>
                )}

                {/* Work Experience */}
                {data.workExperience.length > 0 && (
                    <section className="mb-3">
                        <h2 className="font-bold text-[1.1em] mb-1 tracking-wide border-b border-black/60 uppercase">Professional Experience</h2>
                        {data.workExperience.map((job) => (
                            <div key={job.id} className="mb-2">
                                <div className="flex justify-between items-baseline">
                                    <div>
                                        <span className="font-semibold text-[1em]">{job.role}</span>
                                        <span className="ml-2 italic text-[0.98em]">{job.company}</span>
                                    </div>
                                    <span className="text-[0.98em] whitespace-nowrap">{job.duration}</span>
                                </div>
                                <ul className="list-disc ml-6 mt-1 text-[15px]">
                                    {job.description.split('\n').map((line, idx) => (
                                        <li key={idx}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section className="mb-3">
                        <h2 className="font-bold text-[1.1em] mb-1 tracking-wide border-b border-black/60 uppercase">Education</h2>
                        {data.education.map((edu) => (
                            <div key={edu.id} className="mb-2">
                                <div className="flex justify-between items-baseline">
                                    <div>
                                        <span className="font-semibold text-[1em]">{edu.degree}</span>
                                        <span className="ml-2 italic text-[0.98em]">{edu.institution}</span>
                                    </div>
                                    <span className="text-[0.98em] whitespace-nowrap">{edu.duration}</span>
                                </div>
                                {edu.gpa && <div className="ml-1 text-[0.98em]">GPA: {edu.gpa}</div>}
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <section className="mb-3">
                        <h2 className="font-bold text-[1.1em] mb-1 tracking-wide border-b border-black/60 uppercase">Skills</h2>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-[15px]">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="block">{skill}</span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section className="mb-3">
                        <h2 className="font-bold text-[1.1em] mb-1 tracking-wide border-b border-black/60 uppercase">Projects</h2>
                        {data.projects.map((project) => (
                            <div key={project.id} className="mb-2">
                                <div className="flex justify-between items-baseline">
                                    <span className="font-semibold text-[1em]">{project.name}</span>
                                    {project.link && (
                                        <span className="text-[0.98em] whitespace-nowrap">{project.link}</span>
                                    )}
                                </div>
                                <div className="ml-1 text-[15px]">{project.description}</div>
                                <div className="ml-1 flex flex-wrap gap-x-4 gap-y-1 mt-1 text-[0.98em]">
                                    {project.technologies.map((tech, idx) => (
                                        <span key={idx} className="inline-block">{tech}</span>
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