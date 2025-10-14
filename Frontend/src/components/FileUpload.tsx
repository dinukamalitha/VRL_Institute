"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DescriptionIcon from "@mui/icons-material/Description";

interface FileUploadProps {
  accept?: string;
  label?: string;
  buttonText?: string;
  onFileSelect?: (file: File) => void;
  currentFile?: string | string[];
  required?: boolean;
  showPreview?: boolean;
  id?: string;
}

export default function FileUpload({
  accept,
  label = "Upload File",
  buttonText = "Choose File",
  onFileSelect,
  currentFile,
  required = false,
  showPreview = false,
  id,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect?.(file);

      // Generate preview for images
      if (showPreview && file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const getCurrentFileUrl = (): string | null => {
    if (selectedFile) return selectedFile.name;
    if (!currentFile) return null;
    if (Array.isArray(currentFile)) return currentFile[0] || null;
    return currentFile;
  };

  const getFileDisplayName = () => {
    if (selectedFile) return selectedFile.name;
    if (currentFile) {
      if (Array.isArray(currentFile)) return currentFile[0] || null;
      return currentFile as string;
    }
    return null;
  };

  const isImageFile = () => {
    const cf = getCurrentFileUrl() || "";
    const fileName = selectedFile?.name || cf;
    if (fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return true;
    // Allow preview for URL paths when showPreview is enabled
    if (showPreview && (fileName.startsWith('http') || fileName.startsWith('/'))) return true;
    return false;
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {label} {required && "*"}
      </Typography>

      <input
        accept={accept || "image/*"}
        style={{ display: "none" }}
        id={id || "file-upload"}
        type="file"
        onChange={handleFileChange}
        required={required}
      />

      <label htmlFor={id || "file-upload"}>
        <Button
          variant="outlined"
          component="span"
          startIcon={<UploadIcon />}
          sx={{
            borderColor: "#E91E63",
            color: "#E91E63",
            "&:hover": {
              borderColor: "#C2185B",
              backgroundColor: "rgba(233, 30, 99, 0.04)",
            },
          }}
        >
          {buttonText}
        </Button>
      </label>

      {/* File Info Display - Only for non-image files */}
      {getFileDisplayName() && !isImageFile() && (
        <Paper
          elevation={0}
          sx={{
            mt: 2,
            p: 2,
            border: "2px dashed #E91E63",
            borderRadius: 2,
            backgroundColor: "rgba(233, 30, 99, 0.02)",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <DescriptionIcon sx={{ color: "#E91E63", fontSize: 24 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "medium", color: "#333" }}
            >
              {getFileDisplayName()}
            </Typography>
            {selectedFile && (
              <Typography variant="caption" color="text.secondary">
                Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </Typography>
            )}
          </Box>
        </Paper>
      )}

      {/* Image Preview */}
      {showPreview && isImageFile() && (previewUrl || getCurrentFileUrl()) && (
        <Paper
          elevation={0}
          sx={{
            mt: 2,
            p: 2,
            border: "2px dashed #E91E63",
            borderRadius: 2,
            backgroundColor: "rgba(233, 30, 99, 0.02)",
            textAlign: "center",
          }}
        >
          <img
            src={previewUrl || (getCurrentFileUrl() as string)}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              objectFit: "contain",
              borderRadius: "4px",
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1 }}
          >
            Image Preview
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
