'use client';

import React, { use, Suspense } from 'react';
import ProjectView from '@/components/project-view';

export default function ProjectPage({ params }) {
    const { id } = use(params);
    return (
        <Suspense fallback={<div className="flex-1 animate-pulse bg-zinc-900/50" />}>
            <ProjectView projectId={id} />
        </Suspense>
    );
}
