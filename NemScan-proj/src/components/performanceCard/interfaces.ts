import React, {ReactNode} from "react";
import {LucideIcon} from "lucide-react-native";

export interface PerformanceCardProps {
    title?: string;
    icon?: LucideIcon;
    colors?: string[];
    value?: string | number;
    subtitle?: string;
    trend?: number;
    animated?: boolean;
    children?: ReactNode;
}