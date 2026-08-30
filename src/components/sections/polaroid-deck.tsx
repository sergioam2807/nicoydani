"use client";

import { Deck, type Card } from "@ikefakis/react-polaroid-photo-deck";
import "@ikefakis/react-polaroid-photo-deck/style.css";

export function PolaroidDeck({ cards }: { cards: Card[] }) {
  return <Deck cards={cards} style={{ width: "100%", height: "70vh" }} />;
}
