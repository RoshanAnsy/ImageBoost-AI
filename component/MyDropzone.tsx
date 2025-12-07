"use client"
import { uploadfile } from "@/service/upload";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import ImageComp from "./ImageComp";
export default function MyDropzone() {
  const [preview, setView] = useState(false);
  const [finalView, setFinalView] = useState(false);
  const [finalFileView, SetFinalFileView] = useState<string>("");
  const [filePreview, setFilePreview] = useState<string>("");
  const [loading,setLoading]=useState<boolean>(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoading(true)
    const file = acceptedFiles[0];
    if (!file) return;
    // 10 MB = 10 * 1024 * 1024
    const MAX_SIZE = 10 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
        alert("File size must be less than 10 MB");
        setLoading(false);
        return;
    }
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setFilePreview(previewUrl);
    setView(true);

    console.log("Accepted files:", acceptedFiles);

    // Upload
   const url= await uploadfile(acceptedFiles);
   
   if(url==null){
    alert("failed to upload image")
   }
   setFinalView(true)
    SetFinalFileView(url as string)
    setLoading(false)
   
  
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // ensures only images
  });

  return (
    <div className=" w-full h-auto text-center my-12">
      <div 
        {...getRootProps()} 
        className="p-4 border border-dashed rounded cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
        <div className=" flex flex-col gap-4">
      
      {preview && filePreview  && (<>
        <p>Original Image</p>
        <div className="relative w-auto h-72   shadow p-4 rounded-lg">
          
          <Image
            src={filePreview}
            alt="Preview"
            fill
            className="rounded object-contain"
          />
        </div></>
      )}

      {
        finalView && finalFileView && (<ImageComp finalFileView={finalFileView} loading={loading}/>)
      }
      </div>
    </div>
  );
}
