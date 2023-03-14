const deck = [];

let itemId = 0;

function getId() {
  itemId++;
  return itemId;
};

const cardsConfig = {
  colors: ['heart', 'diamond', 'leaf', 'dash'],
  from: 2,
  to: 10,
  specialCards: {
    'J': 10,
    'Q': 10,
    'K': 10,
    'A': [1, 11],
  },
};

cardsConfig.colors.forEach(color => {
  for (let i = cardsConfig.from; i <= cardsConfig.to; i++) {
    deck.push({
      id: getId(),
      name: i,
      value: i,
      color,
    });
  };
  
  for (const [key, value] of Object.entries(cardsConfig.specialCards)) {
    deck.push({
      id: getId(),
      name: key,
      value,
      color,
    });
  };
});






export default deck;