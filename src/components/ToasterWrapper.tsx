"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterWrapper() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: "#333",
          color: "#fff",
          textAlign: "center",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        success: {
          style: {
            background: "#28a745",
            border: "1px solid #218838",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#28a745",
          },
        },
        error: {
          style: {
            background: "#07BC0C", // Changed to green
            border: "1px solid #06910A", // Slightly darker green for border
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#07BC0C",
          },
        },
        loading: {
          style: {
            background: "#007bff",
            border: "1px solid #0069d9",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#007bff",
          },
        },
        blank: {
          style: {
            background: "#6c757d",
            border: "1px solid #5a6268",
          },
        },
        custom: {
          style: {
            background: "#ffc107",
            border: "1px solid #e0a800",
            color: "#000",
          },
        },
      }}
      containerStyle={{
        top: "20px",
        right: "20px",
        position: "fixed",
        zIndex: 9999,
      }}
    />
  );
}