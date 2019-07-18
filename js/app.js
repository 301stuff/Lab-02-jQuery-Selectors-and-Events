'use strict';

function Creature(animal){
    this.keyword = animal.keyword;
    this.image_url = animal.image_url;
    this.title = animal.title;
    this.description = animal.description;
    this.horns = animal.horns;
}
Creature.allCreatures = [];

Creature.prototype.render = function() {
    $('main').append('<div class="clone"></div>');
    let creatureClone = $('div[class="clone"]');
    let creatureHtml = $('#photo-template').html();
    creatureClone.html(creatureHtml);
    creatureClone.find('h2').text(this.title);
    creatureClone.find('img').attr('src', this.image_url).attr('alt', "alt text");
    creatureClone.find('p').text(this.description);
    creatureClone.removeClass('clone');
    creatureClone.attr('class', this.horns);
}

Creature.readJson = () => {
    $.get('../data/page-1.json', 'json')
    .then(data => {
        data.forEach(item => {
            Creature.allCreatures.push(new Creature(item));            
        });
    })
    .then(Creature.loadCreatures);
};

Creature.loadCreatures = () => {
    Creature.allCreatures.forEach(item => item.render());
};

$(() => Creature.readJson());