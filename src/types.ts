export type PaperColor = 'peach' | 'yellow' | 'green' | 'blue' | 'lavender';
export type TapeType = 'frosted' | 'gingham' | 'polka' | 'linen' | 'hearts' | 'smiley' | 'stars' | 'classic' | 'india';
export type PaperTexture = 'grid' | 'dots' | 'lines' | 'blank';

export type Thought = {
  id: string;
  text: string;
  author?: string;
  likes: number;
  createdAt: number;
  paperColor: PaperColor;
  tape: TapeType;
  texture?: PaperTexture;
  rotation: number;
};
