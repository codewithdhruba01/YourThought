export type PaperColor = 'peach' | 'yellow' | 'green' | 'blue' | 'lavender';
export type TapeType = 'frosted' | 'gingham' | 'polka' | 'linen' | 'hearts' | 'smiley' | 'stars' | 'classic';

export type Thought = {
  id: string;
  text: string;
  author?: string;
  likes: number;
  createdAt: number;
  paperColor: PaperColor;
  tape: TapeType;
  rotation: number;
};
