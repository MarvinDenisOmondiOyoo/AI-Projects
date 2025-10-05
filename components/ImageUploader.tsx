import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { ImageIcon } from './icons/ImageIcon';

interface ImageUploaderProps {
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect, disabled }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onFileSelect(null);
      setPreview(null);
    }
  }, [onFileSelect]);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, [disabled, handleFileChange]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const onFileSelectFromInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
          handleFileChange(e.target.files[0]);
      }
  };

  return (
    <div className="w-full">
      <label htmlFor="file-upload" className={`
        relative block w-full aspect-square border-2 border-dashed rounded-lg
        flex flex-col items-center justify-center text-center p-4
        cursor-pointer transition-colors duration-200
        ${disabled ? 'cursor-not-allowed bg-slate-800' : 'bg-slate-700/50 hover:border-brand-secondary'}
        ${isDragging ? 'border-brand-secondary bg-brand-secondary/20' : 'border-slate-600'}
      `}>
        {preview ? (
          <img src={preview} alt="Image preview" className="max-h-full max-w-full object-contain rounded-md" />
        ) : (
          <div className={`flex flex-col items-center gap-2 text-slate-400 ${isDragging ? 'text-brand-light' : ''}`}>
            <UploadIcon className={`h-8 w-8 transition-transform duration-300 ${isDragging ? 'animate-bounce-sm' : ''}`} />
            <span className="text-sm font-semibold">Drop image here</span>
            <span className="text-xs">or click to browse</span>
          </div>
        )}
        <input 
            id="file-upload" 
            type="file" 
            className="sr-only" 
            accept="image/png, image/jpeg, image/dicom" 
            onChange={onFileSelectFromInput}
            disabled={disabled}
        />
      </label>
    </div>
  );
};