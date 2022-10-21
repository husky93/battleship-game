# battleship-game

Classic Battleship Game web application. This project purpose was to practice [Test-Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) which was used to to test and code core game logic. Made with vanilla JavaScript with use of Publisher/Subscriber pattern to control application events. Tests were written with a help of [jest](https://jestjs.io/) JavaScript Testing Framework.

### Live: [click here](https://husky93.github.io/battleship-game)

## Features
- Dynamically generated DOM
- Drag and drop place ship UI
- Horizontal and vertical ship placement
- 1 Square free space between ships rule
- Ship rearrangement after they have been placed
- Random ship placement option
- Turn tracker UI 3d flipper
- Interactive game board UI
- Random ship placement on computer board
- Advanced computer AI - Tracks hit ship tiles and hits all tiles around them. If there are two adjacent hit ship tiles it prioritizes hitting squares in a straight line from them
- Marks all squares around sunk ship as hit (1 free square space rule)
- Controls game state each turn and ends game when all ships are sunk on either of the two boards.
- Restart game option

### To add in the future:
- Mobile support.
 
<img src="https://github.com/husky93/battleship-game/blob/main/battleships.png?raw=true"/>

### Dependencies Used:
- [PubSubJS](https://github.com/mroderick/PubSubJS)

#### Dev dependencies:
- [webpack](https://github.com/webpack/webpack)
- [jest](https://jestjs.io/)
- [babel](https://github.com/babel/babel)
- [style-loader](https://github.com/webpack-contrib/style-loader)
- [css-loader](https://github.com/webpack-contrib/css-loader)
