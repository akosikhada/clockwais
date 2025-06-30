"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, GamepadIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameInfo {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  icon: React.ReactNode;
}
const listOfGames = [
  "https://bejofo.com/",
  "https://tagpro.koalabeast.com/games/select",
  "https://garticphone.com/",
  "https://www.y8.com/games/az",
  "https://www.retrogames.cz/play_085-NES.php",
  "https://skribbl.io/",
];

const SAMPLE_GAMES: GameInfo[] = [
  {
    id: "game1",
    title: "Tic Tac Toe",
    description:
      "A simple two-player strategy game where players take turns marking X or O in a 3×3 grid. The first to align three symbols horizontally, vertically, or diagonally wins.",
    bgColor: "from-blue-600 to-blue-900",
    icon: <GamepadIcon className="h-12 w-12 mb-3 opacity-80" />,
  },
  {
    id: "game2",
    title: "TagPro (KoalaBeast)",
    description:
      "A fast-paced, online multiplayer capture-the-flag game featuring rolling balls. Players use teamwork, speed boosts, and power-ups to grab the enemy flag while defending their own.",
    bgColor: "from-green-600 to-green-900",
    icon: <GamepadIcon className="h-12 w-12 mb-3 opacity-80" />,
  },
  {
    id: "game3",
    title: "Gartic Phone",
    description:
      "An online party game that combines drawing and telephone. Players alternately draw and describe prompts, often leading to hilarious misinterpretations by the end of each round.",
    bgColor: "from-red-600 to-red-900",
    icon: <GamepadIcon className="h-12 w-12 mb-3 opacity-80" />,
  },
  {
    id: "game4",
    title: "Tank Battle",
    description:
      "An action-packed tank shooting game on Y8 where players control tanks in head-to-head combat or team battles. It often includes power-ups and destructible terrain for added strategy.",
    bgColor: "from-purple-600 to-purple-900",
    icon: <GamepadIcon className="h-12 w-12 mb-3 opacity-80" />,
  },
  {
    id: "game5",
    title: "Bomberman",
    description:
      "A classic arcade game where players plant bombs to destroy obstacles and defeat enemies or other players. Timing and movement are key to survive and outsmart opponents.",
    bgColor: "from-amber-600 to-amber-900",
    icon: <GamepadIcon className="h-12 w-12 mb-3 opacity-80" />,
  },
  {
    id: "game6",
    title: "Skribbl",
    description:
      "An online drawing and guessing game. One player draws a word while others try to guess it in real time. Points are awarded for correct guesses and drawing accuracy.",
    bgColor: "from-amber-600 to-amber-900",
    icon: <GamepadIcon className="h-12 w-12 mb-3 opacity-80" />,
  },
];

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose }) => {
  const [selectedGame, setSelectedGame] = useState<GameInfo | null>(null);
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  // Handle selection changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setSelectedGame(SAMPLE_GAMES[api.selectedScrollSnap()]);
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    // Initialize with the first game selected
    if (!selectedGame && SAMPLE_GAMES.length > 0) {
      setSelectedGame(SAMPLE_GAMES[0]);
    }

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, selectedGame]);

  // Custom autoplay implementation
  useEffect(() => {
    if (!api || !autoplayEnabled || !isOpen) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api, autoplayEnabled, isOpen]);

  // Pause autoplay when user interacts
  const handleInteraction = () => {
    setAutoplayEnabled(false);
    // Resume after 10 seconds of inactivity
    setTimeout(() => setAutoplayEnabled(true), 10000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border-slate-700 text-white shadow-2xl">
        <DialogHeader className="px-6 pt-6 relative">
          <DialogTitle className="text-3xl font-bold text-center text-white mb-2">
            Choose Your Game
          </DialogTitle>
          <DialogDescription className="text-center text-slate-300 mb-4">
            Select a game to play during your break session
          </DialogDescription>
        </DialogHeader>

        <div className="p-0">
          <Carousel
            className="w-full"
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
              skipSnaps: false,
              dragFree: true,
            }}
            onMouseDown={handleInteraction}
            onTouchStart={handleInteraction}
          >
            <CarouselContent className="-ml-4">
              {SAMPLE_GAMES.map((game, index) => (
                <CarouselItem
                  key={game.id}
                  className="pl-4 basis-full sm:basis-2/3 md:basis-1/2 lg:basis-1/3"
                >
                  <div
                    onClick={() => {
                      setSelectedGame(game);
                      if (api) api.scrollTo(index);
                      handleInteraction();
                    }}
                    className={cn(
                      "rounded-xl overflow-hidden transition-all duration-500 transform cursor-pointer h-64 relative",
                      current === index
                        ? "ring-4 ring-primary shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-105"
                        : "opacity-70 scale-95"
                    )}
                  >
                    <div
                      className={`h-full w-full bg-gradient-to-br ${game.bgColor} flex flex-col items-center justify-center p-6 relative`}
                    >
                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiPjwvcmVjdD4KPC9zdmc+')]"></div>

                      {/* Game icon */}
                      {game.icon}

                      {/* Game title with text shadow */}
                      <h3 className="text-white font-bold text-2xl text-center mb-2 tracking-wide drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">
                        {game.title}
                      </h3>

                      {/* Short description */}
                      <p className="text-white/80 text-sm text-center max-w-[80%]">
                        {game.description.split(" ").slice(0, 4).join(" ")}...
                      </p>

                      {/* Selection indicator */}
                      {current === index && (
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom navigation arrows with improved visibility */}
            <CarouselPrevious className="left-4 md:left-6 h-12 w-12 bg-black/50 border border-white/20 text-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center">
              <ChevronLeft className="h-7 w-7" />
            </CarouselPrevious>
            <CarouselNext className="right-4 md:right-6 h-12 w-12 bg-black/50 border border-white/20 text-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center">
              <ChevronRight className="h-7 w-7" />
            </CarouselNext>
          </Carousel>

          {selectedGame && (
            <div className="mt-8 bg-black/30 p-8 rounded-none border-x-0 border-t border-b-0 border-white/10 backdrop-blur-sm w-full mx-0">
              <div className="max-w-3xl mx-auto">
                <h3 className="font-bold text-2xl text-white mb-3">
                  {selectedGame.title}
                </h3>
                <p className="text-slate-300 text-base mb-8">
                  {selectedGame.description}
                </p>
                <Button
                  className="bg-primary hover:bg-primary/90 text-white w-full py-6 text-lg font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:shadow-xl"
                  onClick={() => {
                    // This would normally start the game
                    console.log(selectedGame.title);
                    if (selectedGame.title === "Tic Tac Toe") {
                      window.open(listOfGames[0], "_blank");
                    } else if (selectedGame.title === "TagPro (KoalaBeast)") {
                      window.open(listOfGames[1]), "_blank";
                    } else if (selectedGame.title === "Gartic Phone") {
                      window.open(listOfGames[2]), "_blank";
                    } else if (selectedGame.title === "Tank Battle") {
                      window.open(listOfGames[3]), "_blank";
                    } else if (selectedGame.title === "Bomberman") {
                      window.open(listOfGames[4]), "_blank";
                    } else if (selectedGame.title === "Skribbl") {
                      window.open(listOfGames[5]), "_blank";
                    }
                  }}
                >
                  Play Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;
