export interface WorkExperience {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    duration: string;
    gpa?: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
}

export type TemplateType = 'harvard' | 'basic' | 'modern';

export interface Template {
    id: TemplateType;
    name: string;
    description: string;
}

export interface ResumeData {
    template: TemplateType;
    personalInfo: {
        name: string;
        email: string;
        phone: string;
        location: string;
        website?: string;
        linkedin?: string;
    };
    summary: string;
    workExperience: WorkExperience[];
    education: Education[];
    skills: string[];
    projects: Project[];
}

export const availableTemplates: Template[] = [
    {
        id: 'harvard',
        name: 'Harvard',
        description: 'Professional template with classic formatting'
    },
    {
        id: 'basic',
        name: 'Basic',
        description: 'Clean and simple layout'
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Contemporary design with color accents'
    }
];

export const defaultResumeData: ResumeData = {
    template: 'harvard',
    personalInfo: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "(555) 123-4567",
        location: "San Francisco, CA",
        website: "johndoe.com",
        linkedin: "linkedin.com/in/johndoe"
    },
    summary: "Experienced software engineer with a passion for building scalable web applications and solving complex problems.",
    workExperience: [
        {
            id: "1",
            company: "Tech Corp",
            role: "Senior Software Engineer",
            duration: "Jan 2022 - Present",
            description: "Led development of microservices architecture serving 10M+ users. Improved system performance by 40% and reduced deployment time by 60%."
        }
    ],
    education: [
        {
            id: "1",
            institution: "University of California",
            degree: "Bachelor of Science in Computer Science",
            duration: "2018 - 2022",
            gpa: "3.8"
        }
    ],
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker"],
    projects: [
        {
            id: "1",
            name: "E-commerce Platform",
            description: "Built a full-stack e-commerce platform with React, Node.js, and PostgreSQL",
            technologies: ["React", "Node.js", "PostgreSQL", "Stripe API"],
            link: "github.com/johndoe/ecommerce"
        }
    ]
}; 