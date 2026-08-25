export type Slide = {
  src: string;
  alt: string;
};

/** Order follows the sketch, with skiing and Arsenal added from the same set. */
export const slides: Slide[] = [
  { src: "/carousel/basketball.webp", alt: "Cedric with teammates in a sports hall" },
  { src: "/carousel/friends.webp", alt: "Cedric with friends at a restaurant in Tokyo" },
  { src: "/carousel/skiing.webp", alt: "Cedric on a ski slope, holding skis" },
  { src: "/carousel/arsenal.webp", alt: "Cedric in the Arsenal dressing room" },
  { src: "/carousel/chill.webp", alt: "The 'I'm just a chill guy' meme" },
];
