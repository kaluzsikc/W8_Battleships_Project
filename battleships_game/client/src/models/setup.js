const FormView = require('../views/form_view.js')
const PubSub = require('../helpers/pub_sub.js');

const Setup = function (container) {
  this.container = container;
  this.counter = 0;
  this.gameState = [[0,0],[0,0]];
};

Setup.prototype.bindEvents = function () {

  console.log('set up setting up');

  PubSub.subscribe('EmptyTileView:tile-clicked', (event) => {
    // deal with counter
    //get id
    //check current state of corresponding tile
    //change state of tile
    //change counter
    if (this.counter < 1) { // will be 5 for MVP
      this.render(this.gamestate);
    } else {
      PubSub.publish('Setup:table-ready', array);
    }
  });

};

Setup.prototype.render = function (gamestate) {

  console.log('set up rendering');

  const formView = new FormView(this.container, gamestate);
  formView.render();

}


module.exports = Setup;
