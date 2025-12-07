
import axios from "axios";

// export async function uploadfile(files: File[]) {
//     console.log("file received in service", process.env.NEXT_PUBLIC_API_URL);

//     const formData = new FormData();
//     formData.append("file", files[0]); // Match Go key: "files"

//     const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/images`,
//         formData,
//         {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvMTJAZ21haWwuY29tIiwiaWQiOjEsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJyb3NoYW4iLCJpbWFnZSI6bnVsbCwiaWF0IjoxNzY1MTEwMzA2LCJleHAiOjE3NjUxMTc1MDZ9.DEuCHtnCY1EdmkdX5zCgNrUsV4bp4QlSbtzUWsnNdxs"
//             },
//             // withCredentials: true,  // MUST be outside headers
//         }
//     );

//     console.log("Server response:", response.data);
//     return response.data;
// }



export async function uploadfile(files: File[]) {
    try {
        console.log("file received in service", process.env.NEXT_PUBLIC_API_URL);

        const file = files[0];
        if (!file) throw new Error("No file provided");

        const formData = new FormData();
        formData.append("image_file", file);

        // Get image dimensions
        const imageDimensions = await getImageSize(file);
        const { width, height } = imageDimensions;

        // Append target width and height (you can modify for 4:3 or 9:16 ratio here)
        formData.append("target_width", `${width}`);
        formData.append("target_height", `${height}`);

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_AI_URL}`,
            formData,
            {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
                    "Content-Type": "multipart/form-data",
                },
                responseType: "arraybuffer",
                timeout: 20000,
            }
        );

        // Convert ArrayBuffer to Blob
        const blob = new Blob([response.data], { type: "image/jpeg" });

        // Create a preview URL for frontend
        const imageUrl = URL.createObjectURL(blob);
        console.log("Final Image URL:", imageUrl);

        return imageUrl;

    } catch (error) {
        console.error("Error uploading file:", error);
        return null; // Return null or handle error as needed
    }
}


// Helper function to get image dimensions
function getImageSize(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = (err) => reject(err);
    });
}
