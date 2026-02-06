export interface Memory {
  id: number;
  imageUrl: string;
  caption: string;
  rotation: number; // degrees for polaroid effect
}

export interface ConfettiGlobal {
  (options?: any): Promise<null> | null;
  reset: () => void;
}

declare global {
  interface Window {
    confetti: ConfettiGlobal;
  }
}