import availableNfts from "../../Ethereum/meta/shuffle";

const splitData = (pageNo) => {
  let maxlimit = pageNo * 25;
  let minlimit = maxlimit - 25;

  let total_pages = parseInt(availableNfts.length, 10) / parseInt(25, 10);
  total_pages = total_pages === 0 ? total_pages : Math.ceil(total_pages);
  return {
    data: availableNfts.slice(minlimit, maxlimit),
    count: total_pages,
    pageNo: pageNo,
  };
};

export default splitData;
