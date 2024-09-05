/*===============VARIABILI GLOBALI==============*/
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

let gameFrame = 0;
//impostiamo un valore per l'accellerazione dei frames
const stuggleFrame = 5;

//creo una variabile che prenda come valore lo stato del personaggio: nome oggetto nell'arrai di oggetti animationStates
let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(event){
  playerState = event.target.value;
});

/*===============ARRAY==============*/
const spriteAnimations = [];

//creiamo un array di oggetti che saranno popolati dal nome dello stato e dai frame
const animationStates = [
  {
    name: 'idle',
    frames: 7
  },
  {
    name: 'jump',
    frames: 7
  },
  {
    name: 'fall',
    frames: 7
  },
  {
    name: 'run',
    frames: 9
  },
  {
    name: 'dizzy',
    frames: 11
  },
  {
    name: 'sit',
    frames: 5
  },
  {
    name: 'roll',
    frames: 7
  },
  {
    name: 'bite',
    frames: 7
  },
  {
    name: 'ko',
    frames: 12
  },
  {
    name: 'gethit',
    frames: 4
  }
];    

/*=================FUNZIONI=================*/

//usiamo il metodo foreach degli array 
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  }
  for(let j = 0; j < state.frames; j++){
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({x: positionX, y: positionY})
  }
  spriteAnimations[state.name] = frames;
})

//animiamo il nostro personaggio
function animate(){
 
  //clear rectangle = cancella l'animazione precedente,in parentesi si aspetta quale area del canvas ripulire tramite cordinate
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  /*vediamo la nostra prima animazione all'opera
  
  if(frameX < 6) frameX++;
  else frameX = 0;

  la prima difficoltà sarà nel vedere come diverse animazioni hanno anche quantità di frame diversi
  
  ecco come suddividere i frame in base alla quantità di frame
  gameframe/stuggleframe = ???
  0/5 = 0 -> Math.floor(0) = 0
  1/5 = 0.2 -> Math.floor(0.2) = 0 => 0 % 6 = 0
  2/5 = 0.4 -> Math.floor(0.4) = 0 => ""
  3/5 = 0.6 -> Math.floor(0.6) = 0 => ""
  4/5 = 0.8 -> Math.floor(0.8) = 0 => ""
  5/5 = 1 -> Math.floor(1) = 1 => 1 % 6 = 1
  6/5 = 1.2 -> Math.floor(1.2) = 1 => ""
  7/5 = 1.4 -> Math.floor(1.4) = 1 => ""
  8/5 = 1.6 -> Math.floor(1.6) = 1 => ""
  9/5 = 1.8 -> Math.floor(1.8) = 1 => ""
  10/5 = 2 -> Math.floor(2) = 2 => 2 % 6 = 2 ecc...
  */

  let position = Math.floor(gameFrame / stuggleFrame) % spriteAnimations[playerState].loc.length;
  
  //reimpostiamo il valore di frameX
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;


    //disegnamo il nostro personaggio
  
  //prima prendiamo le dimensioni del personaggio sul layer del canvas,poi le assegnamo all'immagine, s=source, d=destination ossia la parte "croppata"
  
  //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh); prendiamo solo sx, sy, sw, sh saranno le dimensioni interessate, e le inseriamo dopo il valore playerImage di drawImage
  
  //sostituendo i valori di source x e y con delle ripetizioni di spriteWidth e spriteHeight, otteremo i frame della nostra immagine in movimento. Esempio frame 1(sx = 0 * spriteWidth), frame 2(sx = 1 * spriteWidth) e cosi via. mentre sy ci permetterà di spostarci da una posa ad un'altra, esempio stand 1(sy = 0 * spriteHeight), jump 1(sy = 1 * spriteHeight), land 1(sy = 2 * spriteHeight) ecc...   
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  //utilizziamo gameFrame ed usiamo il modulo per farlo ciclare
  if(gameFrame % stuggleFrame === 0) {
    if(frameX < 8) frameX++;
    else frameX = 0;
  }
  gameFrame++;
  //per un loop di animazioni
  requestAnimationFrame(animate);
}

animate();  // <- vedremo un immagine statica ma il programma sta interpretando l'animazione, ora testiamolo

//let x=0; <- tra le variabili
//ctx.fillRect(x,50,100,100); x++; <- nella funzione animate()
