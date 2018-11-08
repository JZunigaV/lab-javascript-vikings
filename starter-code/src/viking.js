// Soldier
function Soldier(health,strength) {
	this.health=health;
	this.strength=strength;
	this.attack= function (){
		return this.strength;
	};
	this.receiveDamage=function(damage){
		this.health -= damage;
	};
}

// Viking
function Viking(name,health,strength) {
	this.name = name;
	this.health=health;
	this.strength=strength;
	this.battleCry = function(){
		return "Odin Owns You All!";
	};
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Soldier;
Viking.prototype.receiveDamage= function (damage) {
	this.health -= damage;
		if (this.health > 0) {
			return this.name + " has received " + damage + " points of damage";
		}else{
			return this.name + " has died in act of combat";
		}
};

Viking.prototype.attack = function (){
	return this.strength;
};



// // Saxon
function Saxon(health,strength) {
	this.health=health;
	this.strength=strength;

}
Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Soldier;
Saxon.prototype.attack = function (){
	return this.strength;
};
Saxon.prototype.receiveDamage= function (damage) {
	this.health -= damage;
		
		if (this.health > 0) {
			return  "A Saxon has received "+ damage +" points of damage";
		}else{
			return "A Saxon has died in combat";
		}
};

// War
function War() {

	this.vikingArmy = [];
	this.saxonArmy = [];

	this.addViking = function(Viking){
		this.vikingArmy.push(Viking);
	};

	this.addSaxon = function(Saxon){
		this.saxonArmy.push(Saxon);
	};

	this.vikingAttack = function(){
		var randomViking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
		var randomSaxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];	
		//Attack !!!
		var tradeResult = randomSaxon.receiveDamage(randomViking.strength);
		//Remove All the dead Saxons from the array
		var livingSaxons = this.saxonArmy.filter(function(elem){
			return elem.health > 0;
		});
		this.saxonArmy = livingSaxons;
		return tradeResult;
	};

	this.saxonAttack = function(){

		var randomViking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
		var randomSaxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];

		//Attack!!!
		var tradeResult = randomViking.receiveDamage(randomSaxon.strength);
		var livingVikings = this.vikingArmy.filter(function(elem){
			return elem.health > 0;
		});

		this.vikingArmy = livingVikings;
		return tradeResult;

	};

	this.showStatus = function(){

		if (this.saxonArmy.length === 0) {
			return "Vikings have won the war of the century!";
		}else if (this.vikingArmy.length === 0) {
			return "Saxons have fought for their lives and survive another day...";
		}else if(this.saxonArmy.length > 0 && this.vikingArmy.length > 0){
			return "Vikings and Saxons are still in the thick of battle.";
		}

	};
}


var viking1 = new Viking("Jolstar",100,100);
var viking2 = new Viking("Dovahkin",100,200);
var viking3 = new Viking("Olaf",100,300);

var saxon1 = new Saxon(100,200);
var saxon2 = new Saxon(100,300);
var saxon3 = new Saxon(100,100);
var centuryWar = new War();
centuryWar.addViking(viking1);
centuryWar.addViking(viking2);
centuryWar.addViking(viking3);
centuryWar.addSaxon(saxon1);
centuryWar.addSaxon(saxon2);
centuryWar.addSaxon(saxon3);
centuryWar.vikingAttack();
centuryWar.showStatus();
