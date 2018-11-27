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

export interface Welcome {
  widgets: Widget[];
  keywords: WelcomeKeyword[];
  timeRanges: string[];
  examples: any[];
  shareText: string;
}

export interface WelcomeKeyword {
  keyword: string;
  name: string;
  type: string;
}

export interface Widget {
  request: Request;
  lineAnnotationText?: string;
  bullets?: Bullet[];
  showLegend?: boolean;
  showAverages?: boolean;
  helpDialog: HelpDialog;
  token: string;
  id: string;
  type: string;
  title: string;
  template: string;
  embedTemplate: string;
  version: string;
  isLong: boolean;
  isCurated: boolean;
  geo?: string;
  resolution?: string;
  searchInterestLabel?: string;
  displayMode?: string;
  color?: string;
  index?: number;
  bullet?: string;
  keywordName?: string;
}

export interface Bullet {
  text: string;
}

export interface HelpDialog {
  title: string;
  content: string;
  url?: string;
}

export interface Request {
  time?: string;
  resolution?: string;
  locale?: string;
  comparisonItem?: ComparisonItem[];
  requestOptions: RequestOptions;
  geo?: Geo;
  restriction?: ComparisonItem;
  keywordType?: string;
  metric?: string[];
  trendinessSettings?: TrendinessSettings;
  language?: string;
}

export interface ComparisonItem {
  geo?: Geo;
  complexKeywordsRestriction: ComplexKeywordsRestriction;
  time?: string;
}

export interface ComplexKeywordsRestriction {
  keyword: ComplexKeywordsRestrictionKeyword[];
}

export interface ComplexKeywordsRestrictionKeyword {
  type: string;
  value: string;
}

export interface Geo {}

export interface RequestOptions {
  property: string;
  backend: string;
  category: number;
}

export interface TrendinessSettings {
  compareTime: string;
}
