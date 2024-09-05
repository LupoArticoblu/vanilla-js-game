const canvas = document.getElementById('canvas1');
//ctx=context
const ctx = canvas.getContext('2d');
//console.log(ctx);

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

//importiamo il nostro protagonista
const playerImage = new Image();
playerImage.src = './characters/shadow_dog.png';

//creiamo 2 variabili globali per conoscere le dimensioni del nostro sprite che diverranno rispettivamente i valori di sw e sh

const spriteWidth = 575; //<- questo valore è il risultato della divisione tra il width della nostra immagine campione e le colonne(in pixel)

const spriteHeight = 523; //<- questo valore è il risultato della divisione tra il height della nostra immagine campione e le righe

let frameX = 0;
let frameY = 0;

//animiamo il nostro personaggio
function animate(){
 
  //clear rectangle = cancella l'animazione precedente,in parentesi si aspetta quale area del canvas ripulire tramite cordinate
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  //disegnamo il nostro personaggio
  
  //prima prendiamo le dimensioni del personaggio sul layer del canvas,poi le assegnamo all'immagine, s=source, d=destination ossia la parte "croppata"
  
  //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh); prendiamo solo sx, sy, sw, sh saranno le dimensioni interessate, e le inseriamo dopo il valore playerImage di drawImage
  
  //sostituendo i valori di source x e y con delle ripetizioni di spriteWidth e spriteHeight, otteremo i frame della nostra immagine in movimento. Esempio frame 1(sx = 0 * spriteWidth), frame 2(sx = 1 * spriteWidth) e cosi via. mentre sy ci permetterà di spostarci da una posa ad un'altra, esempio stand 1(sy = 0 * spriteHeight), jump 1(sy = 1 * spriteHeight), land 1(sy = 2 * spriteHeight) ecc...   
  ctx.drawImage(playerImage, frameX * spriteWidth, frameY *  spriteHeight, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


  //per un loop di animazioni
  requestAnimationFrame(animate);
}

animate();  // <- vedremo un immagine statica ma il programma sta interpretando l'animazione, ora testiamolo

//let x=0; <- tra le variabili
//ctx.fillRect(x,50,100,100); x++; <- nella funzione animate()
