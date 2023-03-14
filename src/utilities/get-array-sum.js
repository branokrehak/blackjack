const getArraySum = (array) => {
  let total = array
    .map(card => {
      if (card.name === 'A') return card.value[0];
      else return card.value;
    })
    .reduce((a,b) => a+b, 0);

  array.map(card => {
    if (card.name === 'A' && total + (card.value[1] - card.value[0]) <= 21) {
      total += (card.value[1] - card.value[0]);
    };
  });

  return total;
};
 
export default getArraySum;