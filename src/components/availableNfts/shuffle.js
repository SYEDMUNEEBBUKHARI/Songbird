import availableNfts from "../../Ethereum/meta/rarepepe_metadata";
import pixelAvailableNfts from "../../Ethereum/meta/pixelpepe_rarity_metadata.json";
import makeshuffle from "../../Ethereum/meta/shuffle.json";
import pepe from "../../Ethereum/meta/filterpepe.json";
import pixel from "../../Ethereum/meta/pixelFilter.json";


const splitData = (pageNo) => {
  let data;
  data = pepe.concat(pixel);
  // console.log("data", availableNfts.rarity.length);

  const output = shuffle(data);
  // console.log("output", output);
  console.log("shuffle", output);
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

function arrangeArray() {
  let myArray;
  for (let i = 0; i < makeshuffle.length; i++) {
    myArray[makeshuffle[i].id] = makeshuffle[i];
  }
  console.log("myArray", myArray);
}
export default splitData;


// let p = {};
// for (let i = 0; i < pepe.rarity.length; i++) {
//   if (pepe.rarity[i].id >= 6000 && pepe.rarity[i].id <= 10000) {
//     p[pepe.rarity[i].id] = pepe.rarity[i];
//     console.log(pepe.rarity[i].id);
//   }
// }
// console.log(";;;;;", p);