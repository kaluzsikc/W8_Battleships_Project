const PubSub = require('../helpers/pub_sub.js');
const FormTileView = require('./form_tile_view.js');
const createAndAppend = require('../helpers/create_append.js');

const FormView = function (container, gamestate) {
  this.container = container;
  this.gamestate = gamestate;
};

FormView.prototype.render = function (event) {

  this.container.innerHTML = '';

  const info = "place your ships here"

  const form1 = createAndAppend('div', 'form1', '' , this.container)
  console.log(form1);
  createAndAppend('h3', 'game-info1', `Player 1 ${info}` , form1)
  const form2 = createAndAppend('div', 'form2', '' , this.container)
  createAndAppend('h3', 'game-info2', `Player 2 ${info}` , form2)

  this.createSelects(form1, form2);

  const formTable1 = createAndAppend('table', 'form-table', '', form1)
  for (let i = 0; i < this.gamestate.player1.length; i++) {
    const row = createAndAppend('tr', null , '', formTable1)
    for (let j = 0; j < this.gamestate.player1[0].length; j++) {
      const formTileView = new FormTileView(row, "1" + i.toString() + j.toString(), this.gamestate.player1[i][j], this.gamestate.turn);
      formTileView.bindEvents();
    };
  };

  const formTable2 = createAndAppend('table', 'form-table', '', form2)
  for (let i = 0; i < this.gamestate.player2.length; i++) {
    const row = createAndAppend('tr', null , '', formTable2)
    for (let j = 0; j < this.gamestate.player2[0].length; j++) {
      const formTileView = new FormTileView(row, "2" + i.toString() + j.toString(), this.gamestate.player2[i][j], this.gamestate.turn);
      formTileView.bindEvents();
    };
  };
};

FormView.prototype.createSelects = function (form1, form2) {

  let selectShip;
  let selectPosition;
  let currentShips

  if (this.gamestate.turn === 1) {
    selectShip = createAndAppend('select', `select-ship`, '', form1);
    selectPosition = createAndAppend('select', `select-position`, '', form1);
    reset = createAndAppend('button','reset', 'Reset', form1 );
    currentShips = this.gamestate.shipArrayPlayer1;

    reset.addEventListener('click', () => {
      this.gamestate.resetSetupPlayer1()
      this.render()
    });
  } else {
    selectShip = createAndAppend('select', `select-ship`, '', form2);
    selectPosition = createAndAppend('select', `select-position`, '', form2);
    reset = createAndAppend('button','reset', 'Reset', form2 );
    currentShips = this.gamestate.shipArrayPlayer2;

    reset.addEventListener('click', () => {
      this.gamestate.resetSetupPlayer2()

      this.render()
    });
  };


  if (currentShips[0] === 0) {
    const destroyer = createAndAppend('option', 1 , 'Destroyer', selectShip);
    destroyer.value = 1;
  }

  if (currentShips[1] === 0) {
    const cruiser = createAndAppend('option', 2, 'Cruiser', selectShip);
    cruiser.value = 2;
  }

  if (currentShips[2] === 0) {
    const submarine = createAndAppend('option', 3, 'Submarine', selectShip);
    submarine.value = 3;
  }

  if (currentShips[3] === 0) {
    const battleship = createAndAppend('option', 4, 'Battleship', selectShip);
    battleship.value = 4;
  }

  if (currentShips[4] === 0) {
    const carrier = createAndAppend('option', 5, 'Carrier', selectShip);
    carrier.value = 5;
  }

  const horizontal = createAndAppend('option', 1, 'Horizonal', selectPosition );
  horizontal.value = 1;
  const vertical = createAndAppend('option', 2, 'Vertical', selectPosition );
  vertical.value = 2;

};

module.exports = FormView;
