import HashMap from './hash-map.js';
import HashSet from './hash-set.js';

const map = new HashMap();

map.set('apple', 'red');
map.set('banana', 'yellow');
map.set('carrot', 'orange');
map.set('dog', 'brown');
map.set('elephant', 'gray');
map.set('frog', 'green');
map.set('grape', 'purple');
map.set('hat', 'black');
map.set('ice cream', 'white');
map.set('jacket', 'blue');
map.set('kite', 'pink');
map.set('lion', 'golden');
map.set('moon', 'silver');

map.printTable();
console.log();

const set = new HashSet();

set.set('apple');
set.set('banana');
set.set('carrot');
set.set('dog');
set.set('elephant');
set.set('frog');
set.set('grape');
set.set('hat');
set.set('ice cream');
set.set('jacket');
set.set('kite');
set.set('lion');
set.set('moon');

set.printTable();
