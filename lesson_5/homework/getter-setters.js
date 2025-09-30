const game = {

    _tittle: '',
    _price: 0,
    markets:
        ['Steam', 'Epic Games', 'GOG'],

    get title() {
        return this._tittle;
    },
    get price() {
        return this._price;
    },
    set newPrice(value) {
        this._price = value;
    }
};

game._tittle = 'Forza Horizon 5';
game._price = 1399;
game.newPrice = -899;


function gameInfo() {
    if (game.price < 0) {
        return console .log('Error');
    } else {
        console.log(game.title);
        console.log('Old price: 1399');
        console.log('New prise: ' + game.price);
        console.log('You can buy this game in: ' + game.markets);
    }
}


gameInfo();
