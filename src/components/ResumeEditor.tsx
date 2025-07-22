'use client';

import React, { useState } from 'react';
import { ResumeData, WorkExperience, Education, Project, TemplateType } from '@/types/resume';
import { Plus, Trash2, Info, User, Briefcase, GraduationCap, Award, Folder, HelpCircle } from 'lucide-react';
import { TemplateSelector } from './TemplateSelector';

interface ResumeEditorProps {
    data: ResumeData;
    onChange: (data: ResumeData) => void;
}

export function ResumeEditor({ data, onChange }: ResumeEditorProps) {
    // Use counter for consistent ID generation instead of Date.now()
    const [idCounter, setIdCounter] = useState(1000);
    const [showTips, setShowTips] = useState<{ [key: string]: boolean }>({});

    const getNextId = () => {
        setIdCounter(prev => prev + 1);
        return idCounter.toString();
    };

    const toggleTip = (tipId: string) => {
        setShowTips(prev => ({ ...prev, [tipId]: !prev[tipId] }));
    };

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
            id: getNextId(),
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
            id: getNextId(),
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
            id: getNextId(),
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

    const baseInputClass = "w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 text-gray-700 placeholder:text-gray-400 hover:border-gray-300";
    const textareaClass = "w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 text-gray-700 placeholder:text-gray-400 hover:border-gray-300 resize-none";

    const SectionHeader = ({ icon, title, subtitle, tipId, tipContent }: {
        icon: React.ReactNode,
        title: string,
        subtitle: string,
        tipId?: string,
        tipContent?: string
    }) => (
        <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                    {icon}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
                </div>
            </div>
            {tipId && tipContent && (
                <div className="relative">
                    <button
                        onClick={() => toggleTip(tipId)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Click for tips"
                    >
                        <HelpCircle className="w-5 h-5" />
                    </button>
                    {showTips[tipId] && (
                        <div className="absolute right-0 top-10 w-80 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg z-10">
                            <div className="text-sm text-blue-800">
                                <Info className="w-4 h-4 inline mr-2" />
                                {tipContent}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    const AddButton = ({ onClick, text, color = "blue" }: { onClick: () => void, text: string, color?: string }) => {
        const colorClasses = {
            blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300",
            green: "bg-green-600 hover:bg-green-700 focus:ring-green-300",
            purple: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-300"
        };

        return (
            <button
                onClick={onClick}
                className={`flex items-center gap-2 px-6 py-3 ${colorClasses[color as keyof typeof colorClasses]} text-white rounded-lg hover:shadow-lg transition-all duration-200 focus:ring-3 font-medium`}
            >
                <Plus className="w-5 h-5" />
                {text}
            </button>
        );
    };

    const RemoveButton = ({ onClick }: { onClick: () => void }) => (
        <button
            onClick={onClick}
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Remove this item"
        >
            <Trash2 className="w-5 h-5" />
        </button>
    );

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Resume</h1>
                <p className="text-gray-600">Fill out the sections below to build your professional resume</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 space-y-12">
                {/* Progress Indicator */}
                <div className="flex items-center justify-center space-x-4 mb-8">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">1</span>
                        </div>
                        <span className="text-sm text-gray-600">Choose Template</span>
                    </div>
                    <div className="w-8 h-0.5 bg-gray-200"></div>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">2</span>
                        </div>
                        <span className="text-sm text-gray-600">Fill Information</span>
                    </div>
                    <div className="w-8 h-0.5 bg-gray-200"></div>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">3</span>
                        </div>
                        <span className="text-sm text-gray-600">Download</span>
                    </div>
                </div>

                {/* Template Selector */}
                <section className="border-b border-gray-100 pb-8">
                    <SectionHeader
                        icon={<Award className="w-6 h-6" />}
                        title="Choose Your Style"
                        subtitle="Select a template that best represents your professional style"
                        tipId="template"
                        tipContent="Different templates work better for different industries. Choose a clean, professional template for traditional roles, or a more creative one for design-focused positions."
                    />
                    <TemplateSelector
                        selectedTemplate={data.template}
                        onTemplateChange={updateTemplate}
                    />
                </section>

                {/* Personal Information */}
                <section className="border-b border-gray-100 pb-8">
                    <SectionHeader
                        icon={<User className="w-6 h-6" />}
                        title="About You"
                        subtitle="Your contact information and basic details"
                        tipId="personal"
                        tipContent="Use a professional email address and make sure your phone number is current. The location should be your city and state/country."
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={data.personalInfo.name}
                                onChange={(e) => updatePersonalInfo('name', e.target.value)}
                                className={baseInputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                            <input
                                type="email"
                                placeholder="john.doe@email.com"
                                value={data.personalInfo.email}
                                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                                className={baseInputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                            <input
                                type="tel"
                                placeholder="(555) 123-4567"
                                value={data.personalInfo.phone}
                                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                                className={baseInputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                            <input
                                type="text"
                                placeholder="New York, NY"
                                value={data.personalInfo.location}
                                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                                className={baseInputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Website <span className="text-gray-400">(optional)</span></label>
                            <input
                                type="text"
                                placeholder="www.yourwebsite.com"
                                value={data.personalInfo.website || ''}
                                onChange={(e) => updatePersonalInfo('website', e.target.value)}
                                className={baseInputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn <span className="text-gray-400">(optional)</span></label>
                            <input
                                type="text"
                                placeholder="linkedin.com/in/johndoe"
                                value={data.personalInfo.linkedin || ''}
                                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                                className={baseInputClass}
                            />
                        </div>
                    </div>
                </section>

                {/* Professional Summary */}
                <section className="border-b border-gray-100 pb-8">
                    <SectionHeader
                        icon={<Briefcase className="w-6 h-6" />}
                        title="Professional Summary"
                        subtitle="A brief overview of your professional background and goals"
                        tipId="summary"
                        tipContent="Write 2-4 sentences highlighting your key strengths, years of experience, and what you're looking for. Keep it concise and focused on what makes you unique."
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
                        <textarea
                            placeholder="Experienced marketing professional with 5+ years in digital marketing and brand management. Proven track record of increasing brand awareness by 40% and generating leads through innovative campaigns. Seeking to leverage my expertise in a dynamic marketing role at a growth-focused company."
                            value={data.summary}
                            onChange={(e) => updateSummary(e.target.value)}
                            rows={4}
                            className={textareaClass}
                        />
                        <p className="text-xs text-gray-500 mt-2">Tip: Mention your years of experience, key achievements, and career goals</p>
                    </div>
                </section>

                {/* Work Experience */}
                <section className="border-b border-gray-100 pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <SectionHeader
                            icon={<Briefcase className="w-6 h-6" />}
                            title="Work Experience"
                            subtitle="Your professional work history and achievements"
                            tipId="experience"
                            tipContent="List your jobs in reverse chronological order (newest first). Focus on achievements rather than just duties. Use action words and quantify results when possible."
                        />
                        <AddButton onClick={addWorkExperience} text="Add Job" color="blue" />
                    </div>
                    {data.workExperience.length === 0 && (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">No work experience added yet</p>
                            <p className="text-sm text-gray-500 mt-1">Click &quot;Add Job&quot; to get started</p>
                        </div>
                    )}
                    {data.workExperience.map((job, index) => (
                        <div key={job.id} className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </span>
                                    Job {index + 1}
                                </h3>
                                <RemoveButton onClick={() => removeWorkExperience(job.id)} />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                                    <input
                                        type="text"
                                        placeholder="ABC Corporation"
                                        value={job.company}
                                        onChange={(e) => updateWorkExperience(job.id, 'company', e.target.value)}
                                        className={baseInputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                                    <input
                                        type="text"
                                        placeholder="Marketing Manager"
                                        value={job.role}
                                        onChange={(e) => updateWorkExperience(job.id, 'role', e.target.value)}
                                        className={baseInputClass}
                                    />
                                </div>
                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                                    <input
                                        type="text"
                                        placeholder="January 2022 - Present"
                                        value={job.duration}
                                        onChange={(e) => updateWorkExperience(job.id, 'duration', e.target.value)}
                                        className={baseInputClass}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Job Description & Achievements *</label>
                                <textarea
                                    placeholder="• Managed digital marketing campaigns that increased website traffic by 45%&#10;• Led a team of 3 marketing specialists to develop brand strategies&#10;• Implemented new social media strategy resulting in 25% growth in followers"
                                    value={job.description}
                                    onChange={(e) => updateWorkExperience(job.id, 'description', e.target.value)}
                                    rows={4}
                                    className={textareaClass}
                                />
                                <p className="text-xs text-gray-500 mt-2">Use bullet points (•) to list your key responsibilities and achievements</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Education */}
                <section className="border-b border-gray-100 pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <SectionHeader
                            icon={<GraduationCap className="w-6 h-6" />}
                            title="Education"
                            subtitle="Your academic background and qualifications"
                            tipId="education"
                            tipContent="Include your highest level of education first. You can include relevant coursework, honors, or GPA if it strengthens your application."
                        />
                        <AddButton onClick={addEducation} text="Add Education" color="green" />
                    </div>
                    {data.education.length === 0 && (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                            <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">No education added yet</p>
                            <p className="text-sm text-gray-500 mt-1">Click &quot;Add Education&quot; to get started</p>
                        </div>
                    )}
                    {data.education.map((edu, index) => (
                        <div key={edu.id} className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <span className="bg-green-100 text-green-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </span>
                                    Education {index + 1}
                                </h3>
                                <RemoveButton onClick={() => removeEducation(edu.id)} />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">School/University *</label>
                                    <input
                                        type="text"
                                        placeholder="University of California"
                                        value={edu.institution}
                                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                        className={baseInputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
                                    <input
                                        type="text"
                                        placeholder="Bachelor of Science in Marketing"
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                        className={baseInputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                                    <input
                                        type="text"
                                        placeholder="2018 - 2022"
                                        value={edu.duration}
                                        onChange={(e) => updateEducation(edu.id, 'duration', e.target.value)}
                                        className={baseInputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">GPA <span className="text-gray-400">(optional)</span></label>
                                    <input
                                        type="text"
                                        placeholder="3.8/4.0"
                                        value={edu.gpa || ''}
                                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                                        className={baseInputClass}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Skills */}
                <section className="border-b border-gray-100 pb-8">
                    <SectionHeader
                        icon={<Award className="w-6 h-6" />}
                        title="Skills & Expertise"
                        subtitle="Your key skills and competencies"
                        tipId="skills"
                        tipContent="Include both technical and soft skills relevant to your target job. List the most important skills first and separate them with commas."
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                        <textarea
                            placeholder="Digital Marketing, Social Media Management, Google Analytics, Project Management, Team Leadership, Content Creation, Customer Relations, Problem Solving"
                            value={data.skills.join(', ')}
                            onChange={(e) => updateSkills(e.target.value)}
                            rows={4}
                            className={textareaClass}
                        />
                        <p className="text-xs text-gray-500 mt-2">Separate skills with commas. Include both technical and soft skills relevant to your field.</p>
                    </div>
                </section>

                {/* Projects */}
                <section>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <SectionHeader
                            icon={<Folder className="w-6 h-6" />}
                            title="Projects & Achievements"
                            subtitle="Notable projects, volunteer work, or personal achievements"
                            tipId="projects"
                            tipContent="Include significant projects from work, school, or personal time. Focus on the impact and results. This section is optional but can help you stand out."
                        />
                        <AddButton onClick={addProject} text="Add Project" color="purple" />
                    </div>
                    {data.projects.length === 0 && (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                            <Folder className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">No projects added yet</p>
                            <p className="text-sm text-gray-500 mt-1">This section is optional but can help showcase your work</p>
                        </div>
                    )}
                    {data.projects.map((project, index) => (
                        <div key={project.id} className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <span className="bg-purple-100 text-purple-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </span>
                                    Project {index + 1}
                                </h3>
                                <RemoveButton onClick={() => removeProject(project.id)} />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Website Redesign Project"
                                        value={project.name}
                                        onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                        className={baseInputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Link <span className="text-gray-400">(optional)</span></label>
                                    <input
                                        type="text"
                                        placeholder="https://github.com/username/project"
                                        value={project.link || ''}
                                        onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                                        className={baseInputClass}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
                                <textarea
                                    placeholder="Led the complete redesign of the company website, resulting in a 50% increase in user engagement and 30% improvement in conversion rates. Collaborated with design and development teams to create a modern, responsive interface."
                                    value={project.description}
                                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                    rows={3}
                                    className={textareaClass}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Skills/Tools Used</label>
                                <textarea
                                    placeholder="Adobe Photoshop, Figma, HTML, CSS, WordPress, Google Analytics"
                                    value={project.technologies.join(', ')}
                                    onChange={(e) => {
                                        const techs = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
                                        updateProject(project.id, 'technologies', techs);
                                    }}
                                    rows={2}
                                    className={textareaClass}
                                />
                                <p className="text-xs text-gray-500 mt-2">List the tools, software, or skills you used, separated by commas</p>
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            {/* Completion Message */}
            <div className="mt-8 text-center bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-green-600" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Great work! Your resume is taking shape.</h3>
                <p className="text-green-600">Fill out all the required fields (*) and check the preview to see how your resume looks. You can always come back and edit any section.</p>
            </div>
        </div>
    );
} 