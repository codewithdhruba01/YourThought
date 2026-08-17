import { v4 as uuidv4 } from 'uuid';
import type { PaperColor, TapeType, Thought } from './types';

const THOUGHT_TEXTS = [
  "Make time for the people who make time for you.",
  "A quiet morning can change the whole day.",
  "Small kindnesses are rarely as small as they seem.",
  "You don't need to have everything figured out today.",
  "Leave a little room for unexpected good things.",
  "Call someone just because you thought of them.",
  "Rest is part of the process, not the opposite of it.",
  "Notice the things you usually rush past.",
  "A good conversation can stay with you for years.",
  "Be gentle with the version of you that is still learning.",
  "Read a book that has nothing to do with your goals.",
  "Drink a glass of water, step outside, and breathe.",
  "It is okay if your dream changes.",
  "Forgive yourself for not knowing what you didn't know.",
  "Take the scenic route today.",
  "Let someone know you appreciate them out of the blue.",
  "The world needs your unique kind of warmth.",
  "Listen to understand, not just to reply.",
  "Celebrate your small wins.",
  "It's never too late to start over.",
  "Your best effort looks different every day.",
  "A handwritten note goes a long way.",
  "Silence is sometimes the best answer.",
  "Be the reason someone smiles today.",
  "Happiness often sneaks in through a door you didn't know you left open.",
  "Don't compare your behind-the-scenes to someone else's highlight reel.",
  "Water your own grass instead of checking if the neighbor's is greener.",
  "Do something today that your future self will thank you for.",
  "A walk in nature walks the soul back home.",
  "You are allowed to take up space."
];

const AUTHORS = [
  "someone",
  "anonymous",
  "friend",
  "@curious_mind",
  "a wanderer",
  "just me",
  "", // Some have no author
  "",
  "",
  ""
];

const PAPER_COLORS: PaperColor[] = ['peach', 'yellow', 'green', 'blue', 'lavender'];
const TAPE_TYPES: TapeType[] = ['frosted', 'gingham', 'polka', 'linen', 'hearts', 'smiley'];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem<T>(arr: T[]): T {
  return arr[getRandomInt(0, arr.length - 1)];
}

function getRandomRotation() {
  // Random rotation between -1.5 and 1.5 degrees
  return (Math.random() * 3) - 1.5;
}

export function generateInitialThoughts(): Thought[] {
  const now = Date.now();
  
  return THOUGHT_TEXTS.map((text, index) => {
    return {
      id: uuidv4(),
      text,
      author: getRandomItem(AUTHORS) || undefined,
      likes: getRandomInt(0, 25),
      createdAt: now - (index * 1000 * 60 * 60), // Space them out by hours
      paperColor: getRandomItem(PAPER_COLORS),
      tape: getRandomItem(TAPE_TYPES),
      rotation: getRandomRotation(),
    };
  });
}
