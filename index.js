function CommonBuilder(value) {
  this.value = value;
}

CommonBuilder.prototype.multiply = function (n) {
  this.value *= n;
  return this;
};

CommonBuilder.prototype.divide = function (n) {
  this.value = Math.floor(this.value / n);
  return this;
};

CommonBuilder.prototype.mod = function (n) {
  this.value %= n;
  return this;
};

CommonBuilder.prototype.get = function () {
  return this.value;
};


function StringBuilder(str) {
  CommonBuilder.call(this, str || '');
}

StringBuilder.prototype = Object.create(CommonBuilder.prototype);
StringBuilder.prototype.constructor = StringBuilder;


StringBuilder.prototype.plus = function (...str) {
  for (var i = 0; i < str.length; i++) {
    this.value += str[i];
  }
  return this;
};

StringBuilder.prototype.minus = function (n) {
  this.value = this.value.slice(0, -n);
  return this;
};

StringBuilder.prototype.multiply = function (n) {
  this.value = new Array(n + 1).join(this.value);
  return this;
};

StringBuilder.prototype.divide = function (n) {
  this.value = this.value.slice(0, Math.floor(this.value.length / n));
  return this;
};

StringBuilder.prototype.remove = function (str) {
  var index = this.value.indexOf(str);
  while (index !== -1) {
    this.value = this.value.slice(0, index) + this.value.slice(index + str.length);
    index = this.value.indexOf(str);
  }
  return this;
};

StringBuilder.prototype.sub = function (from, n) {
  this.value = this.value.substr(from, n);
  return this;
};


class IntBuilder extends CommonBuilder {
  constructor(int = 0) {
    super(int);
  }

  static random(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  plus(...n) {
    this.value += n.reduce((sum, current) => sum + current, 0);
    return this;
  }

  minus(...n) {
    this.value -= n.reduce((difference, current) => difference + current, 0);
    return this;
  }
}



const intBuilder = new IntBuilder(10);
console.log(intBuilder.plus(5, 8).get());
console.log(intBuilder.minus(2, 3).get());

const strBuilder = new StringBuilder('Hello');
console.log(strBuilder.plus(' ', 'World').get());
console.log(strBuilder.multiply(3).get());
console.log(strBuilder.divide(2).get());
console.log(strBuilder.remove('l').get());
console.log(strBuilder.sub(4, 5).get());
console.log(strBuilder.minus(2).get());

console.log(IntBuilder.random(1, 100));