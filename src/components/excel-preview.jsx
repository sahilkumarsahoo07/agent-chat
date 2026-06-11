'use client';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

export default function ExcelPreview({ fileUrl }) {
    const [html, setHtml] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const loadExcel = async () => {
            try {
                let workbook;
                if (fileUrl.startsWith('blob:') || fileUrl.startsWith('http')) {
                    const res = await fetch(fileUrl);
                    const arrayBuffer = await res.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);
                    workbook = XLSX.read(data, { type: 'array' });
                } else {
                    const base64Data = fileUrl.split(',')[1];
                    if (!base64Data) throw new Error("Invalid file data");
                    workbook = XLSX.read(base64Data, { type: 'base64' });
                }

                if (!isMounted) return;

                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                
                const htmlStr = XLSX.utils.sheet_to_html(worksheet, { id: "excel-table" });
            
            const styledHtml = `
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 16px; background: white; }
                    table { border-collapse: collapse; width: max-content; min-width: 100%; font-size: 13px; }
                    th, td { border: 1px solid #e2e8f0; padding: 6px 10px; text-align: left; white-space: nowrap; }
                    th { background-color: #f8fafc; font-weight: 600; color: #334155; }
                    td { color: #0f172a; }
                    tr:nth-child(even) { background-color: #f8fafc; }
                    
                    /* Simple hack to hide the empty first row/col that SheetJS sometimes adds if empty */
                    #excel-table { margin-top: 0; }
                </style>
                ${htmlStr}
            `;
            
            setHtml(styledHtml);
            } catch (err) {
                console.error(err);
                if (isMounted) setError("Failed to parse Excel file");
            }
        };
        
        loadExcel();
        return () => { isMounted = false; };
    }, [fileUrl]);

    if (error) {
        return <div className="flex items-center justify-center h-full text-red-500 font-medium">{error}</div>;
    }

    if (!html) {
        return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-t-transparent border-purple-500 rounded-full animate-spin"></div></div>;
    }

    return (
        <iframe 
            srcDoc={html} 
            className="w-full h-full border-none bg-white rounded-b-xl" 
            title="Excel Preview"
        />
    );
}
