import React from "react";

export interface CameraPermissionProps {
    onRequestPermission: () => void;
    onSkip: () => void;
}

export interface Props {
    children: React.ReactNode;
}