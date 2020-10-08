var gifs = {
  ghost: {
    image: null,
    isShown: true
  },
  skeleton: {
    image: null,
    isShown: false
  },
  skeleton_2: {
    image: null,
    isShown: false
  },
  zhaba: {
    image: null,
    isShown: false
  },
  ice: {
    image: null,
    isShown: false
  },
  leg: {
    image: null,
    isShown: false
  },
  run: {
    image: null,
    isShown: false
  },
  bird: {
    image: null,
    isShown: false
  },
  run2: {
    image: null,
    isShown: false
  }

}

var televisor = null;
let hiddenGifs = [];

let angle = 0,
  pause = true;
// let sound = null;
let node;

function setup() {
  createCanvas(600, 400);
  // sound.loop();
  // sound.pause();
  // load gifs   
  Object.keys(gifs).forEach((gif_name) => {
    gifs[gif_name].image = createImg(urls[gif_name], "");
    gifs[gif_name].image.id("gif_" + gif_name)
    document.getElementById("gif_" + gif_name).style.width = "500px";
    document.getElementById("gif_" + gif_name).style.height = "350px";
    gifs[gif_name].image.position(
      (600 - gifs[gif_name].image.width) / 2,
      (400 - gifs[gif_name].image.height) / 2);
    gifs[gif_name].image.hide();
  })
  // load russian televisor  
  televisor = createImg(urls.televisor, "");
  // set up televisor dimensions   
  televisor.id("telek")
  document.getElementById("telek").style.width = "710px";
  document.getElementById("telek").style.height = "405px";
  televisor.position(-5, -2)
  // televisor.hide()
  
  node = document.createElement("p");
  node.id = "TVTEXT"
  node.innerText = "CAN YOU CLICK ME???"
  node.style.marginLeft = "230px"
  document.getElementsByTagName("body")[0].append(node)
}

function preload() {
  // sound = createAudio("phonk.mp3");
}

function changeGIF(shownGif) {
  // generate hidden gifs arr  
  Object.keys(gifs).forEach(g => {
    if (!gifs[g].isShown)
      hiddenGifs.push(gifs[g]);
  });
  // show next random gif
  hiddenGifs[getRandomInt(0, Object.keys(gifs).length - 2)].isShown = true;
  // hide previously shown gif
  shownGif.isShown = false;
  // empty the hidden gifs arr
  hiddenGifs.length = 0;
}

function draw() {
  let dx = pause ? 0 : getRandomInt(0, 10)
  node.style.marginLeft = (dx >=5 ? dx*2 : dx*-2) + 230 + "px"
  televisor.position(-5 + dx, -2)
  frameRate(28)
  background(252);
  noStroke()
  // draw broken televisor
  let step = 5
  for (let i = 0; i < 600; i += step) {
    for (let j = 0; j < 400; j += step) {
      fill(random(0, 255))
      rect(i+dx, j, step, step)
    }
  }
  let shownGif = null;
  // place gifs   
  Object.keys(gifs).forEach((gif_name) => {
    if (gifs[gif_name].isShown === true) {
      if (Math.sin(angle).toFixed(0) <= 0 || random(0, 1) > 0.5)
        gifs[gif_name].image.show();
      // gifs[gif_name].image.position(
      //   (600 - gifs[gif_name].image.width ) / 2 + dx, 
      //   (400 - gifs[gif_name].image.height ) / 2);
      gifs[gif_name].image.position(
        (600 - 500) / 2 + dx,
        (400 - 350) / 2);
      shownGif = gifs[gif_name];
    } else {
      gifs[gif_name].image.hide();
    }
  })
  
  if(pause)
    Object.keys(gifs).forEach((gif_name) => gifs[gif_name].image.hide())

  if (Math.sin(angle).toFixed(0) > 0) {
    changeGIF(shownGif);
    angle += 0.1;
  }
  else
    angle += 0.15;
}

function mouseClicked() {
  // if(!pause)
    // sound.pause()
  // else 
    // sound.play()
  pause = !pause;
  angle = 13.1;
}


var urls = {
  skeleton: "https://64.media.tumblr.com/24c821ee6cf992dc85e520b150b46ee9/tumblr_mjd0ip9Oly1rx6xgdo1_400.gif",
  ghost: "https://i.kym-cdn.com/photos/images/original/001/421/838/60e.gif",
  skeleton_2: "https://64.media.tumblr.com/47f68a48bbd97df3bbade91ff97a8ffe/tumblr_mzkcv6ThBc1st90ato1_500.gif",
  televisor: "https://raw.githubusercontent.com/mjstest/orgb6/feb3e0c9509bb27cefd7f2047d7f389a/tv.png",
  zhaba: "https://i.pinimg.com/originals/91/6e/f6/916ef6f1aa322565e1f0c59cf2ddec96.gif",
  ice: "https://i.pinimg.com/originals/18/9f/28/189f284d8ea6f3084556ffd59a6df252.gif",
  leg: "https://thumbs.gfycat.com/PlasticDistinctInsect-size_restricted.gif",
  run: "https://i.pinimg.com/originals/fe/c4/aa/fec4aa2fdb1e69942093c220ecbb7d09.gif",
  bird: "https://64.media.tumblr.com/6cd2d0df1bb37464dbb1ffc4743e3513/tumblr_ml4wa7BLyl1rxagu2o1_500.gif",
  run2: "https://cdn.lowgif.com/full/e419b9c7faa46389-top-7-scary-disturbing-old-disney-cartoons-cartoon-amino.gif"
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}