export type TBackgroundColors = "#F5F5DC" | "#ADD8E6" | "#98FF98" | "#FFC0CB";

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
