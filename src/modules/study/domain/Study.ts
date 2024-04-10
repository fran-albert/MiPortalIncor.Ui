export interface Study {
  id: number;
  name: string;
  locationS3?: string;
  date?: string;
  studyType?: {
    id: number;
    name: string;
  };
  note?: string;
}
