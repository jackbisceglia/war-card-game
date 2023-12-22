import { Card, deck } from "./lib/game/Card";
import {
  For,
  Match,
  Switch,
  createEffect,
  createSignal,
  onMount,
} from "solid-js";

import { CardView } from "./lib/components/Card";
import { shuffleCards } from "./lib/utils";

function App() {
  const [gameState, setGameState] = createSignal<"playing" | "over">("over");
  const cardSide = () => (gameState() === "playing" ? "front" : "back");

  const [p1Deck, setP1Deck] = createSignal<Card[]>([]);
  const [p1Pile, setP1Pile] = createSignal<Card[]>([]);
  const currentP1Card = () => p1Deck()[0];

  const toggleGameState = () => {
    console.log("running");
    setGameState((prev) => (prev === "playing" ? "over" : "playing"));
  };

  createEffect(() => {
    console.log("game state: ", gameState());
    console.log("card side", cardSide());
    console.log("\n");
  });

  const [p2Deck, setP2Deck] = createSignal<Card[]>([]);
  const [p2Pile, setP2Pile] = createSignal<Card[]>([]);
  const currentP2Card = () => p2Deck()[0];

  onMount(async () => {
    const gameDeck = shuffleCards(deck);

    setP1Deck(gameDeck.slice(0, 26));
    setP2Deck(gameDeck.slice(26, 52));
  });

  const playTurn = () => {
    // flip the card for the player who played
    // if both players have played their turn, play round:
    // - compare cards
    // - flash animation for winner
    // - move cards to winner's pile
    // - if tie, play war
    // - show back of card for next round
    // otherwise, wait for other player to play
  };

  return (
    <div class="w-full mx-auto text-center">
      <h1 class="text-4xl text-zinc-100 pb-2">War</h1>
      <div class="flex gap-24 py-6">
        <div class="space-y-4">
          <p>Jack</p>
          <CardView card={currentP1Card()} side={cardSide()} />
          <button class="px-4 py-2 bg-coolmint-700 rounded-sm hover:bg-coolmint-800  transition-all duration-300 border-2 border-coolmint-700">
            Play Turn
          </button>
        </div>
        <div class="space-y-4">
          <p>Jenna</p>
          <CardView card={currentP2Card()} side={cardSide()} />
          <button class="px-4 py-2 bg-coolmint-700 rounded-sm hover:bg-coolmint-800  transition-all duration-300 border-2 border-coolmint-700">
            Play Turn
          </button>
        </div>
      </div>
      <Switch fallback={<p>invalid game state</p>}>
        <Match when={gameState() === "playing"}>
          <button
            onClick={() => toggleGameState()}
            class="px-4 py-2 bg-coolmint-700 rounded-sm hover:bg-coolmint-800  transition-all duration-300 border-2 border-coolmint-700"
          >
            End Game
          </button>
        </Match>
        <Match when={gameState() === "over"}>
          <button
            onClick={() => toggleGameState()}
            class="px-4 py-2 bg-coolmint-700 rounded-sm hover:bg-coolmint-800  transition-all duration-300 border-2 border-coolmint-700"
          >
            Start Game
          </button>
        </Match>
      </Switch>
    </div>
  );
}

// type PlayerDeckListProps = { deck: () => Card[]; title: string };

// function PlayerDeckList(props: PlayerDeckListProps) {
//   return (
//     <div class="text-center">
//       <p class="font-bold underline px-2">{props.title} Deck</p>
//       <For each={props.deck()}>
//         {(card) => (
//           <p>
//             {card.ident} of {card.suit}
//           </p>
//         )}
//       </For>
//     </div>
//   );
// }

export default App;
