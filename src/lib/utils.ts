import axios, { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { getCookie } from "cookies-next/client";
import { twMerge } from "tailwind-merge";
import imageCompression from "browser-image-compression";
import qs from "qs";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const fetcher = () => {
  const token = getCookie("accessToken");

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return axiosInstance;
};

export const convertToKBs = (bytes: number): string => {
  const sizeInKB = Number((bytes / 1024).toFixed(2));
  return `${sizeInKB.toFixed(2)} KB`;
};

export const validateImage = (file: File): string | null => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/bmp",
    "image/tiff",
  ];
  const maxSize = 4 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return "Invalid file type. Please upload an image (JPG, PNG, GIF, WEBP, SVG, BMP, or TIFF).";
  }

  if (file.size > maxSize) {
    return "File size exceeds 4MB. Please upload a smaller image.";
  }

  return null;
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const calculateDuration = (start: string, end: string): string => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime(); // ensure both are numbers
  const diffHours = diffMs / (1000 * 60 * 60); // convert ms to hours
  return `${diffHours.toFixed(1)}h`;
};

export const getErrorMessage = (error: AxiosError) => {
  const apiResponse = error?.response?.data as unknown as { message?: string };
  const message = apiResponse?.message || error?.message;

  return message;
};

export const generateId = () =>
  Date.now().toString() + Math.random().toString(36).substr(2, 9);

export const compressImage = async (file: File) => {
  try {
    // Step 1: Compress the image
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1, // Max size in MB
      maxWidthOrHeight: 1024, // Resize image if too large
      useWebWorker: true,
    });

    return compressedFile;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export const blobToFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { type: blob.type });
};
