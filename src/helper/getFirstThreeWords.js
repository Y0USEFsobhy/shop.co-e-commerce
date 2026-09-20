export default function getFirstThreeWords(text) {
  return text.split(" ").slice(0, 3).join(" ");
}