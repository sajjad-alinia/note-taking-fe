export type TBackgroundColors =
  | "bg-note-1"
  | "bg-note-2"
  | "bg-note-3"
  | "bg-note-4";

export type TNoteSetting = {
  theme: {
    background: TBackgroundColors;
  };
};

export type TNOte = {
  id?: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  setting?: TNoteSetting;
};
