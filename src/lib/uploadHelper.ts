/**
 * Simple helper to upload an image/SVG file to /api/admin/upload,
 * with fallback to FileReader base64 Data URL.
 */
export async function uploadImageFile(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success && data.url) {
      return data.url;
    }
  } catch (err) {
    console.error("Upload API error, using Data URL fallback:", err);
  }

  // Fallback to local Data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as string) || "");
    reader.readAsDataURL(file);
  });
}
