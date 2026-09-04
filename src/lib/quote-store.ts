import { create } from "zustand";

export type CateringQuote = {
  guests: number;
  packageName: string;
  total: number;
  summary: string;
};

type QuoteState = {
  quote: CateringQuote | null;
  setQuote: (quote: CateringQuote | null) => void;
};

export const useQuote = create<QuoteState>((set) => ({
  quote: null,
  setQuote: (quote) => set({ quote }),
}));
