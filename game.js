const hat = '<span class="box hat">r</span>'; //initializing 4 main const variables.
const hole = '<span class="box hole">x</span>';
const fieldCharacter = '<span class="box field">p</span>';
const pathCharacter = '<span class="box path">*</span>';

function showMessage(msg){
    //document.getElementById('game-messages').innerHTML = msg;
    alert(msg)
}

class Field { //declare a class
  constructor(field = [[]]) { //creating an object inside the class
    this.field = field; //setting proprties for Field class
    this.locationX = 0;
    this.locationY = 0;
    // Set the "home" position before the game starts
    this.field[0][0] = pathCharacter; //character will be displayed in (0,0) when the game starts
    this.playing = true; 
  }
 

  updateLocation(){ //messages according to the keys)
    if (!this.isInBounds()) {
      showMessage('Out of bounds. Please try again!');
      this.playing = false;
    } else if (this.isHole()) {
      showMessage('Sorry, you fell down a hole!');
      this.playing = false;
    } else if (this.isHat()) {
      showMessage('Congrats, the bunny found the carrot!');
      this.playing = false;
    }
    // Update the current location on the map
    this.field[this.locationY][this.locationX] = pathCharacter;
  }

  move(answer){
    switch (answer) { // assigning keys depending on the starting point(0,0)
      case 'U': //UP key
        this.locationY -= 1;
        break;
      case 'D': //DOWN key
        this.locationY += 1;
        break;
      case 'L':  //LEFT key
        this.locationX -= 1;
        break;
      case 'R': //RIGHT key
        this.locationX += 1;
        break;
      default:
        //showMessage('Enter U, D, L or R.');
        //this.askQuestion();
        break;
    }
    this.updateLocation(); //the location updates when user press a key 
    //(this.field[this.locationY][this.locationX] = pathCharacter;)
    this.print(); //the field boxes fill when the key moves
  }

  isInBounds() { //declaring the out of bound limits 
    return (
      this.locationY >= 0 && //when the character locations x or y is greater or = to 0
      this.locationX >= 0 && //go out of bound to left in the screen
      this.locationY < this.field.length && // when character location is lesser than field lenght
      this.locationX < this.field[0].length //go out of bound to right
    );
  }

  isHat() {
    return this.field[this.locationY][this.locationX] === hat; //initializing hat inside the field
  }

  isHole() {
    return this.field[this.locationY][this.locationX] === hole; //initializing hat inside the field
  }

  print() { //initializing  the game map
    const displayString = this.field.map(row => {
        return row.join('');
      }).join('<br/>');
    document.getElementById('game-container').innerHTML = (displayString);
  }

  //starting the game
  static generateField(height, width, percentage = 0.1) { //displaying the field (probability % of getting a hole 10%)
    const field = new Array(height).fill(0).map(el => new Array(width)); //randomizing the holes when the new game starts
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }
    // Set the "hat" location
    const hatLocation = { //randomizing the hat location alone x,y axis
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
    // Make sure the "hat" is not at the starting point
    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocation.y = Math.floor(Math.random() * height);
    }
    field[hatLocation.y][hatLocation.x] = hat;
    return field;
  }
}

const myfield = new Field(Field.generateField(10, 10, 0.2)); //adding the new location of the character
myfield.print();

function restartGame() {
  myfield = new Field(Field.generateField(10, 10, 0.2)); 
}

function move(direction){ //calling the move function of the arrow keys
  myfield.move(direction);
}

document.addEventListener('keydown', function(e){ //adding the keyboard arrow keys 
  let keyMap = {
    37: 'L',
    38: 'U',
    39: 'R',
    40: 'D'
  };
  let direction = keyMap[e.keyCode];
  if (direction != undefined){
    move(direction);
  }
});
