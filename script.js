const cards = document.querySelectorAll(".card");
let matchCard = 0;
let cardOne, cardTwo;
let disableDeck = false;


function flipCard(e){
    let clickedCard = e.target; //getting user clicked card
    if(clickedCard !==cardOne && !disableDeck)  {
        clickedCard.classList.add('flip');
        if(!cardOne) {
            // return the cardOne value to clicked Card
            return cardOne = clickedCard;
        }
      
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImage = cardOne.querySelector('img').src,
        cardTwoImage = cardTwo.querySelector('img').src;
        matchCards(cardOneImage, cardTwoImage);
        
    }
   
}

function   matchCards(img1, img2) {
   if(img1 === img2) { // if two cards img matched
    matchCard++; // increment matched value by 1
    // if matched vvalue is 8 that means user has matched all the cards (8*2 = 16 cards)
    if(matchCard == 8){
      setTimeout(() =>{
        return shuffleCard();
      }, 1000);// calling shuffleCard function after 1second
    }
    cardOne.removeEventListener('Click', flipCard);
    cardTwo.removeEventListener('Click', flipCard);
    cardOne = cardTwo = ""; // setting both card value to blank
    return   disableDeck = false;
   }
// if two card not matched
 setTimeout(() =>{
    // adding shake class to both card after 400ms
    cardOne.classList.add("shake")
    cardTwo.classList.add("shake")
 },400)

 setTimeout(() =>{
    // removing both shake & flip classes from the both card after 1.2seconds
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = ""; // setting both card value to blank
    disableDeck = false;
 },1200)
}
 
function shuffleCard() {
    matchCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    // creating array of 16 items and each item is repeated twice
    let arr =[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); // sorting array item randomly
    // removing flip class from all cards and passing random image to each card
    cards.forEach((card, index)=> { 
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
       imgTag.src = `img-${arr[index]}.png`;
         
        card.addEventListener('click', flipCard);
      });
}

shuffleCard();

cards.forEach(card => { // adding click event to all cards
 
  card.addEventListener('click', flipCard);
});