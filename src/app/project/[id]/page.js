'use client';

import React, { use } from 'react';
import ProjectView from '@/components/project-view';

export default function ProjectPage({ params }) {
    const { id } = use(params);
    return (
        <ProjectView projectId={id} />
    );
}
