const canvas = document.getElementById('canvas1');
//ctx=context
const ctx = canvas.getContext('2d');
//console.log(ctx);

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

//importiamo il nostro protagonista
const playerImage = new Image();
playerImage.src = './characters/shadow_dog.png';

//animiamo il nostro personaggio
function animate(){
  //clear rectangle = cancella l'animazione precedente,in parentesi si aspetta quale area del canvas ripulire tramite cordinate
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //disegnamo un singolo rettangolo
  ctx.fillRect(x,50,100,100);

  x++;
  //per un loop di animazioni
  requestAnimationFrame(animate);
}

animate();  // <- vedremo un immagine statica ma il programma sta interpretando l'animazione, ora testiamolo

let x=0;