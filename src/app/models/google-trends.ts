export interface TimelineData {
    time: string;
    formattedTime: string;
    formattedAxisTime: string;
    value: number[];
    formattedValue: string[];
    isPartial?: boolean;
}

export interface Default {
    timelineData: TimelineData[];
    averages: any[];
}
