'use client';

import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import type ReactQuillType from 'react-quill-new';
import { uploadToCloudinary } from '@/utils/fileUpload';
import {RichTextEditorProps} from "@/types/components";

// ---- Dynamic import with typing ----
const ReactQuill = dynamic(async () => {
  const { default: RQ } = await import('react-quill-new');
  return RQ;
}, {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
}) as unknown as typeof ReactQuillType;

// ---- Quill modules + formats ----
const buildModules = (imageHandler: () => void) => ({
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'blockquote', 'code-block', 'image'],
      [{ align: [] }],
      ['clean'],
    ],
    handlers: {
      image: imageHandler,
    },
  },
});

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list',
  'link', 'blockquote', 'code-block',
  'align', 'image',
];

// ---- Styles ----
const columnStyles = `
.ql-editor .columns-container {
  display: flex;
  gap: 20px;
  margin: 15px 0;
  padding: 15px;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
}
.ql-editor .column {
  flex: 1;
  min-width: 0;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: white;
}
.ql-toolbar .ql-columns svg {
  width: 16px;
  height: 16px;
  margin: 6px;
}
`;

export default function RichTextEditor({
                                         value,
                                         onChange,
                                         placeholder,
                                         onImageUpload,
                                         height,
                                         uploadFolder = 'publications'
                                       }: RichTextEditorProps) {
  const quillRef = useRef<ReactQuillType | null>(null);
  const resolvedHeight = useMemo(() => {
    if (typeof height === 'number') return `${height}px`;
    return height || '240px';
  }, [height]);

  // ---- Image handler ----
  const imageHandler = useCallback(async () => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const imageUrl = onImageUpload
            ? await onImageUpload(file)
            : await uploadToCloudinary(file, uploadFolder);

        const range = quill.getSelection(true);
        quill.insertEmbed(range?.index || 0, 'image', imageUrl);
        quill.setSelection((range?.index || 0) + 1);
      } catch (error) {
        console.error('Image upload failed:', error);
        alert('Image upload failed. Please try again.');
      }
    };
  }, [onImageUpload, uploadFolder]);

  // ---- Column handler ----
  const columnHandler = useCallback(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const range = quill.getSelection();
    const index = range ? range.index : quill.getLength();

    const columnsHtml = `
      <div class="columns-container">
        <div class="column"><p>Column 1 content</p></div>
        <div class="column"><p>Column 2 content</p></div>
      </div>
    `;

    quill.clipboard.dangerouslyPasteHTML(index, columnsHtml, 'user');
  }, []);

  // ---- Add custom "Columns" button ----
  useEffect(() => {
    const addColumnButton = () => {
      const toolbar = document.querySelector('.ql-toolbar');
      if (toolbar && !toolbar.querySelector('.ql-columns')) {
        const btn = document.createElement('button');
        btn.className = 'ql-columns';
        btn.type = 'button';
        btn.title = 'Insert Columns';
        btn.innerHTML = `
          <svg viewBox="0 0 18 18">
            <rect x="2" y="4" width="5" height="12" rx="1" />
            <rect x="9" y="4" width="5" height="12" rx="1" />
          </svg>
        `;
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          columnHandler();
        });
        toolbar.appendChild(btn);
      }
    };
    const timer = setTimeout(addColumnButton, 500);
    return () => clearTimeout(timer);
  }, [columnHandler]);

  const modules = useMemo(() => buildModules(imageHandler), [imageHandler]);

  return (
      <>
        <style>{columnStyles}</style>
        <Box
          sx={{
            '& .ql-toolbar': {
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderColor: '#e0e0e0',
              backgroundColor: '#fafafa',
            },
            '& .ql-container': {
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderColor: '#e0e0e0',
              minHeight: resolvedHeight,
              maxHeight: resolvedHeight,
              overflowY: 'auto',
            },
            '& .ql-editor': {
              minHeight: `calc(${resolvedHeight} - 42px)`,
            },
          }}
        >
          <ReactQuill
              ref={quillRef as any}
              theme="snow"
              value={value}
              onChange={onChange}
              modules={modules}
              formats={formats}
              placeholder={placeholder}
          />
        </Box>
      </>
  );
}
