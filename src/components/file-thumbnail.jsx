'use client';
import React, { useState, useEffect } from 'react';
import ExcelPreview from './excel-preview';

export default function FileThumbnail({ file, url, type, name }) {
    // file is the File object (if from input), url is the data URL (if from history)
    const fileUrl = url || (file ? URL.createObjectURL(file) : null);
    const fileName = name || (file ? file.name : '');
    const fileType = type || (file ? file.type : '');
    
    if (!fileUrl) return null;

    if (fileType.startsWith('image/')) {
        return <img src={fileUrl} alt="preview" className="w-full h-full object-cover" />;
    }

    const isPdf = fileType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf');
    const isExcel = fileName.toLowerCase().endsWith('.xlsx') || fileName.toLowerCase().endsWith('.xls') || fileName.toLowerCase().endsWith('.csv');

    if (isPdf || isExcel) {
        return (
            <div className="relative w-full h-full overflow-hidden bg-white">
                <div 
                    className="absolute top-0 left-0 pointer-events-none origin-top-left" 
                    style={{ 
                        width: '1000%', 
                        height: '1000%', 
                        transform: 'scale(0.1)'
                    }}
                >
                    {isPdf && (
                        <iframe src={fileUrl + '#toolbar=0&navpanes=0&scrollbar=0'} className="w-full h-full border-none" />
                    )}
                    {isExcel && (
                        <div className="w-full h-full pointer-events-none">
                            <ExcelPreview fileUrl={fileUrl} />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Fallback for text files or unknown
    return (
        <div className="w-full h-full bg-gradient-to-br from-blue-500/80 to-purple-500/80 flex items-center justify-center text-white font-bold text-[10px]">
            {fileName.split('.').pop().toUpperCase().substring(0, 4)}
        </div>
    );
}
