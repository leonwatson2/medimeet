import Image from "next/image";
import React, { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  files?: Array<File>;
  onChange: (files: Array<File>) => void;
};

export const FileUploader: FC<FileUploaderProps> = ({ files, onChange }) => {
  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      onChange(acceptedFiles);
    },
    [onChange],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="file-upload" {...getRootProps()}>
      <input {...getInputProps()} />
      {!files && (
        <Image
          src="/assets/icons/upload.svg"
          width={32}
          height={32}
          alt="upload"
        />
      )}
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="Identification Photo"
          className="file-upload-image"
        />
      ) : isDragActive ? (
        <p className="file-upload-label">Drop the files here ...</p>
      ) : (
        <p className="file-upload-label">
          Drag &#39;n&#39; drop some files here, or click to select files
        </p>
      )}
    </div>
  );
};
