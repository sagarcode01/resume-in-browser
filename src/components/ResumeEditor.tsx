'use client';

import React from 'react';
import { ResumeData, WorkExperience, Education, Project, TemplateType } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';
import { TemplateSelector } from './TemplateSelector';

interface ResumeEditorProps {
    data: ResumeData;
    onChange: (data: ResumeData) => void;
}

export function ResumeEditor({ data, onChange }: ResumeEditorProps) {
    const updateTemplate = (template: TemplateType) => {
        onChange({ ...data, template });
    };

    const updatePersonalInfo = (field: string, value: string) => {
        onChange({
            ...data,
            personalInfo: { ...data.personalInfo, [field]: value }
        });
    };

    const updateSummary = (summary: string) => {
        onChange({ ...data, summary });
    };

    const addWorkExperience = () => {
        const newJob: WorkExperience = {
            id: Date.now().toString(),
            company: '',
            role: '',
            duration: '',
            description: ''
        };
        onChange({
            ...data,
            workExperience: [...data.workExperience, newJob]
        });
    };

    const updateWorkExperience = (id: string, field: string, value: string) => {
        onChange({
            ...data,
            workExperience: data.workExperience.map(job =>
                job.id === id ? { ...job, [field]: value } : job
            )
        });
    };

    const removeWorkExperience = (id: string) => {
        onChange({
            ...data,
            workExperience: data.workExperience.filter(job => job.id !== id)
        });
    };

    const addEducation = () => {
        const newEdu: Education = {
            id: Date.now().toString(),
            institution: '',
            degree: '',
            duration: '',
            gpa: ''
        };
        onChange({
            ...data,
            education: [...data.education, newEdu]
        });
    };

    const updateEducation = (id: string, field: string, value: string) => {
        onChange({
            ...data,
            education: data.education.map(edu =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        });
    };

    const removeEducation = (id: string) => {
        onChange({
            ...data,
            education: data.education.filter(edu => edu.id !== id)
        });
    };

    const addProject = () => {
        const newProject: Project = {
            id: Date.now().toString(),
            name: '',
            description: '',
            technologies: [],
            link: ''
        };
        onChange({
            ...data,
            projects: [...data.projects, newProject]
        });
    };

    const updateProject = (id: string, field: string, value: string | string[]) => {
        onChange({
            ...data,
            projects: data.projects.map(project =>
                project.id === id ? { ...project, [field]: value } : project
            )
        });
    };

    const removeProject = (id: string) => {
        onChange({
            ...data,
            projects: data.projects.filter(project => project.id !== id)
        });
    };

    const updateSkills = (skillsString: string) => {
        const skills = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
        onChange({ ...data, skills });
    };

      return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow-lg">
      {/* Template Selector */}
      <TemplateSelector 
        selectedTemplate={data.template} 
        onTemplateChange={updateTemplate} 
      />
      
      {/* Personal Information */}
      <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={data.personalInfo.name}
                        onChange={(e) => updatePersonalInfo('name', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={data.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={data.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={data.personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Website (optional)"
                        value={data.personalInfo.website || ''}
                        onChange={(e) => updatePersonalInfo('website', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="LinkedIn (optional)"
                        value={data.personalInfo.linkedin || ''}
                        onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </section>

            {/* Summary */}
            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Professional Summary</h2>
                <textarea
                    placeholder="Write a brief professional summary..."
                    value={data.summary}
                    onChange={(e) => updateSummary(e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </section>

            {/* Work Experience */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
                    <button
                        onClick={addWorkExperience}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Experience
                    </button>
                </div>
                {data.workExperience.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-medium text-gray-800">Experience #{data.workExperience.indexOf(job) + 1}</h3>
                            <button
                                onClick={() => removeWorkExperience(job.id)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Company"
                                value={job.company}
                                onChange={(e) => updateWorkExperience(job.id, 'company', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Job Title"
                                value={job.role}
                                onChange={(e) => updateWorkExperience(job.id, 'role', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Duration (e.g., Jan 2022 - Present)"
                                value={job.duration}
                                onChange={(e) => updateWorkExperience(job.id, 'duration', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:col-span-2"
                            />
                        </div>
                        <textarea
                            placeholder="Job description and achievements..."
                            value={job.description}
                            onChange={(e) => updateWorkExperience(job.id, 'description', e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                ))}
            </section>

            {/* Education */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                    <button
                        onClick={addEducation}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Education
                    </button>
                </div>
                {data.education.map((edu) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-medium text-gray-800">Education #{data.education.indexOf(edu) + 1}</h3>
                            <button
                                onClick={() => removeEducation(edu.id)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Institution"
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Duration"
                                value={edu.duration}
                                onChange={(e) => updateEducation(edu.id, 'duration', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="GPA (optional)"
                                value={edu.gpa || ''}
                                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                ))}
            </section>

            {/* Skills */}
            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Skills</h2>
                <textarea
                    placeholder="Enter skills separated by commas (e.g., JavaScript, React, Node.js, Python)"
                    value={data.skills.join(', ')}
                    onChange={(e) => updateSkills(e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </section>

            {/* Projects */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
                    <button
                        onClick={addProject}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Project
                    </button>
                </div>
                {data.projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-medium text-gray-800">Project #{data.projects.indexOf(project) + 1}</h3>
                            <button
                                onClick={() => removeProject(project.id)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Project Name"
                                value={project.name}
                                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Project Link (optional)"
                                value={project.link || ''}
                                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <textarea
                            placeholder="Project description..."
                            value={project.description}
                            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                        />
                        <textarea
                            placeholder="Technologies used (comma-separated)"
                            value={project.technologies.join(', ')}
                            onChange={(e) => {
                                const techs = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
                                updateProject(project.id, 'technologies', techs);
                            }}
                            rows={2}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                ))}
            </section>
        </div>
    );
} 