import React from "react";

export interface CameraPermissionProps {
    onRequestPermission: () => void;
    onSkip: () => void;
}

export interface CameraPermissionWrapperProps {
    children: React.ReactNode;
}