
"use client"
import React from 'react'
import Image from 'next/image'
import { downloadFile } from '@/service/downloadFile';
import { Loader,ArrowDownToLine  } from 'lucide-react';
const ImageComp = ({finalFileView,loading}:{finalFileView:string,loading:boolean}) => {

    if (loading === true) {
        return (
            <div className="flex w-full h-72 items-center justify-center border shadow-md p-2 rounded-md">
                <Loader className="w-12 h-12 animate-spin text-blue-500" />
            </div>
        );
    }

  return (
    <div className=' flex flex-col w-full h-auto space-y-4   rounded-md'>
        <p className=''>Ai Generated Image</p>
        <div className="relative w-full h-72   shadow-2xl rounded-lg">
              <Image
                src={finalFileView}
                alt="Preview"
                fill
                className="rounded object-contain"
              />
    </div>
    <button onClick={() => downloadFile(finalFileView, "ai")}><ArrowDownToLine/></button>
    </div>
  )
}

export default ImageComp
