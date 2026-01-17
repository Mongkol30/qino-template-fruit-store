import type { ChangeEvent, DragEvent, InputHTMLAttributes } from 'react';
import { useRef, useState } from 'react';

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /** On files change callback */
  onChange?: (files: File[]) => void;
  /** Accepted file types */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Max file size in bytes */
  maxSize?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text */
  helperText?: string;
  /** Additional class name */
  className?: string;
}

export function FileUpload({
  onChange,
  accept,
  multiple = false,
  maxSize,
  disabled = false,
  error = false,
  helperText,
  className = '',
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    let newFiles = Array.from(fileList);

    // Filter by max size
    if (maxSize) {
      newFiles = newFiles.filter((file) => file.size <= maxSize);
    }

    // Single file mode
    if (!multiple) {
      newFiles = newFiles.slice(0, 1);
    }

    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={className}>
      {/* Drop zone */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center p-6
          border-2 border-dashed rounded-lg cursor-pointer
          transition-colors
          ${isDragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''}
          ${error ? 'border-error-500' : 'border-neutral-300 dark:border-neutral-600'}
          ${disabled ? 'opacity-50 cursor-not-allowed bg-neutral-100 dark:bg-neutral-800' : 'hover:border-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          {...props}
        />

        <svg
          className="w-10 h-10 text-neutral-400 dark:text-neutral-500 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          <span className="font-medium text-primary-600 dark:text-primary-400">Click to upload</span>
          {' '}or drag and drop
        </p>

        {accept && (
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
            {accept}
          </p>
        )}

        {maxSize && (
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            Max size: {formatFileSize(maxSize)}
          </p>
        )}
      </div>

      {/* Helper text */}
      {helperText && (
        <p className={`mt-1.5 text-sm ${error ? 'text-error-500' : 'text-neutral-500 dark:text-neutral-400'}`}>
          {helperText}
        </p>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between px-3 py-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
            >
              <div className="flex items-center gap-2 min-w-0">
                <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-neutral-700 dark:text-neutral-300 truncate">
                  {file.name}
                </span>
                <span className="text-xs text-neutral-500 flex-shrink-0">
                  ({formatFileSize(file.size)})
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 text-neutral-400 hover:text-error-500 transition-colors"
                aria-label="Remove file"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
