export interface UploadMediaResult {
  url: string;
  mediaType: "image" | "video";
  filename?: string;
}

/**
 * Upload an image or video file to /api/admin/upload.
 */
export async function uploadMediaFile(
  file: File,
  fetchFn: typeof fetch = fetch
): Promise<UploadMediaResult> {
  const isVideo =
    file.type.startsWith("video/") ||
    /\.(mp4|webm|mov|m4v|ogg)$/i.test(file.name);

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetchFn("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (data.success && data.url) {
    return {
      url: data.url,
      mediaType: data.mediaType || (isVideo ? "video" : "image"),
      filename: data.filename,
    };
  }

  throw new Error(data.error || "Upload failed");
}

/**
 * Simple helper to upload an image/SVG file to /api/admin/upload,
 * with fallback to FileReader base64 Data URL.
 */
export async function uploadImageFile(
  file: File,
  fetchFn: typeof fetch = fetch
): Promise<string> {
  try {
    const res = await uploadMediaFile(file, fetchFn);
    return res.url;
  } catch (err: any) {
    console.error("Upload API error, using Data URL fallback:", err);
  }

  // Fallback to local Data URL for images
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as string) || "");
    reader.readAsDataURL(file);
  });
}

/**
 * Upload multiple files concurrently to /api/admin/upload.
 */
export async function uploadMultipleMediaFiles(
  files: FileList | File[],
  fetchFn: typeof fetch = fetch
): Promise<UploadMediaResult[]> {
  const fileArray = Array.from(files);
  const results = await Promise.all(
    fileArray.map((f) =>
      uploadMediaFile(f, fetchFn).catch((err) => {
        console.error(`Failed to upload ${f.name}:`, err);
        return null;
      })
    )
  );
  return results.filter((r): r is UploadMediaResult => r !== null);
}


