const fs = require('fs');

const replacements = [
  ['posiciÃ³n', 'posición'],
  ['ubicaciÃ³n', 'ubicación'],
  ['estÃ¡', 'está'],
  ['dÃ³nde', 'dónde'],
  ['recogerÃ¡', 'recogerá'],
  ['llegarÃ¡', 'llegará'],
  ['seÃ±al', 'señal'],
  ['evaluÃ¡', 'evalúa'],
  ['compensaciÃ³n', 'compensación'],
  ['mÃ¡s', 'más'],
  ['tambiÃ©n', 'también'],
  ['aquÃ­', 'aquí'],
  ['allÃ­', 'allí'],
  ['cÃ³mo', 'cómo'],
  ['quÃ©', 'qué'],
  ['cuÃ¡l', 'cuál'],
  ['dÃ­a', 'día'],
  ['corazÃ³n', 'corazón'],
  ['Ã©xito', 'éxito'],
  ['informaciÃ³n', 'información'],
  ['automÃ¡tico', 'automático'],
  ['bÃºsqueda', 'búsqueda'],
  ['pÃ¡gina', 'página'],
  ['nÃºmero', 'número'],
  ['Ãºltimo', 'último'],
  ['canciÃ³n', 'canción']
];

function fixFile(p){
  try {
    let s = fs.readFileSync(p, 'utf8');
    let changed = false;
    for (const [from, to] of replacements) {
      if (s.includes(from)) {
        s = s.split(from).join(to);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(p, s, 'utf8');
      console.log('fixed', p);
    } else {
      console.log('nochange', p);
    }
  } catch(e) {
    console.log('err', p, e.message);
  }
}

fixFile('js/routes.js');
fixFile('js/page-translations.js');
fixFile('js/guia-playa-paraiso.js');
fixFile('js/carrito-golf.js');
fixFile('js/mapas.js');
fixFile('function.js');
