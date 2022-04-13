import availableNfts from "../../Ethereum/meta/rarepepe_metadata";
import pixelAvailableNfts from "../../Ethereum/meta/pixelpepe_rarity_metadata.json";

const splitData = (pageNo) => {
  let data;
  data = availableNfts.rarity.concat(pixelAvailableNfts.rarity);
  console.log("data", availableNfts.rarity.length);

  const output = shuffle(data);

  console.log("output", output);
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default splitData;
