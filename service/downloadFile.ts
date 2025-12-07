export function downloadFile(url: string, fileName?: string) {
    const link = document.createElement("a");
    link.href = url;

    // Optional: set custom file name
    link.download = fileName || url.split("/").pop() || "download";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
