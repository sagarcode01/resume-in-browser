'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';
import { HarvardTemplate } from './templates/HarvardTemplate';
import { BasicTemplate } from './templates/BasicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';

interface ResumePreviewProps {
    data: ResumeData;
}

export const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(
    ({ data }, ref) => {
        const renderTemplate = () => {
            switch (data.template) {
                case 'harvard':
                    return <HarvardTemplate data={data} ref={ref} />;
                case 'basic':
                    return <BasicTemplate data={data} ref={ref} />;
                case 'modern':
                    return <ModernTemplate data={data} ref={ref} />;
                default:
                    return <HarvardTemplate data={data} ref={ref} />;
            }
        };

        return renderTemplate();
    }
);

ResumePreview.displayName = 'ResumePreview'; 