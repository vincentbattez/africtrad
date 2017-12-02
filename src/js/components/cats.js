export function init() {
  const cats = ['Caline', 'Maxou']
  $('<h1>Cats</h1>').appendTo('body');
  const ul = $('<ul></ul>').appendTo('body');
  for (const cat of cats) {
    $('<li></li>').text(cat).appendTo(ul);
  }
  console.log('components/cats.js');
}