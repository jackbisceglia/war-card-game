import { JSXElement, children, createEffect, createMemo } from "solid-js";

import { Card } from "../game/Card";

function CardCorner(props: {
  ident: Card["ident"];
  suit: Card["suit"];
  pos: "top" | "bottom";
}) {
  return (
    <div
      class={`tracking-tighter text-2xl text-zinc-950 ${
        props.pos === "top" ? "mr-auto" : "ml-auto rotate-180"
      }`}
    >
      <p>{props.ident}</p>
      <img src={`/suits/${props.suit}.svg`} class="w-6 h-6 mx-auto" alt="" />
    </div>
  );
}

function CardSkeleton(props: { children: JSXElement }) {
  return (
    <div class="relative flex flex-col p-3 w-72 h-[26rem] rounded-md justify-between text-lg font-medium bg-zinc-100 ">
      {children(() => props.children)()}
    </div>
  );
}

export function CardView(props: { card: Card; side: "back" | "front" }) {
  const getPrimaryImageSrc = () =>
    props.card?.type === "Number" || props.card?.ident === "A"
      ? `/suits/${props.card?.suit}.svg`
      : `/suits/${props.card?.suit}.svg`;
  // : `/faces/${props.card?.ident}.svg`;

  return createMemo(() => {
    if (props.side === "back") {
      return (
        <CardSkeleton>
          <div class="w-full card-bg bg-coolmint-700 h-full  rounded-md self-stretch"></div>
        </CardSkeleton>
      );
    }

    return (
      <CardSkeleton>
        <CardCorner
          ident={props.card?.ident}
          suit={props.card?.suit}
          pos={"top"}
        />
        <img src={getPrimaryImageSrc()} class="w-20 h-20 mx-auto" alt="" />
        <CardCorner
          ident={props.card?.ident}
          suit={props.card?.suit}
          pos={"bottom"}
        />
      </CardSkeleton>
    );
  }) as unknown as Element;
}
