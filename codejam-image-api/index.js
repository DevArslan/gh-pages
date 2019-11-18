



const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let pencilSelect = true;
let bucketSelect = false;
let pickerSelect = false;
let colorsArray = []
let isDrawing = false;

function colors() {


  for(let i = 0; i < 128; i++){
    colorsArray[i] = []
    for(let k = 0; k < 128; k++){
      colorsArray[i].push('#fff')
    }
  }
  
  //if(localStorage.getItem('colorsArray') != null){
  //  colorsArray = localStorage.getItem('colorsArray')
  //}
 
}

function getXY(event) {
  coordinates = []
  coordinates.push(event.offsetX)
  coordinates.push(event.offsetY)
  return coordinates
}

function colorPicker(event) {
  
  let currentColor = document.getElementById('currentColor')
  coordinates = getXY(event)
  let x = Math.floor(coordinates[0]/4)
  let y = Math.floor(coordinates[1]/4)
  

  localStorage.setItem('selectedColor',colorsArray[x][y])
  currentColor.setAttribute('fill',localStorage.getItem('selectedColor'))
  

}

function draw(event) {
  let currentColor = document.getElementById('currentColor')
  currentColor.setAttribute('fill',localStorage.getItem('selectedColor'))
  if(isDrawing){
    ctx.fillStyle = localStorage.getItem('selectedColor')
    
    coordinates = getXY(event)
    let x = Math.floor(coordinates[0]/4)
    let y = Math.floor(coordinates[1]/4)
    
  
    colorsArray[x][y] = (ctx.fillStyle)
    
    ctx.fillRect(x*4, y*4, 4, 4)
  }
  localStorage.setItem('canvasPic', canvas.toDataURL());
  //localStorage.setItem('colorsArray',colorsArray);
  
}



function changeColor(idSvg,idPrevSvg,idInput,idPicker){


  let prevColorSelect = document.getElementById('prevColorSelect')
  prevColorSelect.setAttribute('fill',localStorage.getItem('prevColor')) 

  let firstColorSelect = document.getElementById('firstColorSelect')
  
  let secondColorSelect = document.getElementById('secondColorSelect')




  prevColorSelect.addEventListener('click', ()=>{
    selectedColor = document.getElementById('prevColor').getAttribute('fill')
    localStorage.setItem('selectedColor',selectedColor)
  })
  firstColorSelect.addEventListener('click', ()=>{
    selectedColor = document.getElementById('firstColor').getAttribute('fill')
    localStorage.setItem('selectedColor',selectedColor)
  })
  secondColorSelect.addEventListener('click', ()=>{
    selectedColor = document.getElementById('secondColor').getAttribute('fill')
    localStorage.setItem('selectedColor',selectedColor)
  })





  let prevCvg = document.getElementById(idPrevSvg)
  let svg = document.getElementById(idSvg)
  let input = document.getElementById(idInput)
  let picker = document.getElementById(idPicker)
  let colorArray = []
  
  

  prevCvg.setAttribute('fill',localStorage.getItem('prevColor'))  
  svg.setAttribute('fill',localStorage.getItem('currentColor'))  

  input.addEventListener("change",function (event) {
    
    colorArray[1] = colorArray[0]
    colorArray[0] = input.value
    console.log(colorArray[1] )
    localStorage.setItem('currentColor',''+ colorArray[0])
    localStorage.setItem('selectedColor',''+ colorArray[0])
    localStorage.setItem('prevColor', colorArray[1])

    prevCvg.setAttribute('fill',colorArray[1]) 
    svg.setAttribute('fill',colorArray[0]) 

  })

  picker.addEventListener("click", function (event) {
    input.click()
    //svg.style.fill = input.value
  })

}

function paintBucket(event) {

  ctx.fillStyle = localStorage.getItem('selectedColor')
  ctx.fillRect(0, 0, 512, 512)

  for(let i = 0; i < 128; i++){
    for(let k = 0; k < 128; k++){
      colorsArray[i][k] = ctx.fillStyle;
    }
  }
  //localStorage.setItem('colorsArray',colorsArray)
  localStorage.setItem('canvasPic', canvas.toDataURL());

}

function selectTool(idPencil, idBucket,pickColor){

  let pencil = document.getElementById(idPencil)
  let bucket = document.getElementById(idBucket)
  let picker = document.getElementById(pickColor)
  let svgBucket = document.getElementById('svgBucket')
  let svgPencil = document.getElementById('svgPencil')
  let svgPicker = document.getElementById('svgPicker')

  document.addEventListener('keydown', function(event) {
        
    if (event.code == 'KeyP'){
      pencilSelect = true;
      pickerSelect = false; 
      bucketSelect = false;
      svgPencil.setAttribute('fill', '#66ff66')
      svgBucket.setAttribute('fill', 'black')
      svgPicker.setAttribute('fill', 'black')

    }
    if (event.code == 'KeyB'){
      bucketSelect = true; 
      pencilSelect = false;  
      pickerSelect = true
      svgBucket.setAttribute('fill', '#66ff66')
      svgPencil.setAttribute('fill', 'black')
      svgPicker.setAttribute('fill', 'black')
    }
    if (event.code == 'KeyC'){
      pickerSelect = true;
      bucketSelect = false;
      pencilSelect = false;
      svgPicker.setAttribute('fill', '#66ff66')
      svgBucket.setAttribute('fill', 'black')
      svgPencil.setAttribute('fill', 'black')
    }  
  });

  picker.addEventListener('click',function (event) {
    pickerSelect = true;
    bucketSelect = false;
    pencilSelect = false;
    svgPicker.setAttribute('fill', '#66ff66')
    svgBucket.setAttribute('fill', 'black')
    svgPencil.setAttribute('fill', 'black')
  })

  pencil.addEventListener('click', function (event) {
    pencilSelect = true;
    pickerSelect = false; 
    bucketSelect = false;
    svgPencil.setAttribute('fill', '#66ff66')
    svgBucket.setAttribute('fill', 'black')
    svgPicker.setAttribute('fill', 'black')
  })

  bucket.addEventListener('click', function (event) {
    bucketSelect = true; 
    pencilSelect = false;  
    pickerSelect = true
    svgBucket.setAttribute('fill', '#66ff66')
    svgPencil.setAttribute('fill', 'black')
    svgPicker.setAttribute('fill', 'black')
  })
}

function loadPic(url) {
  let canvasPicUrl = localStorage.getItem(url);
  let img = new Image;
  img.src = canvasPicUrl;
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
};
}

colors()
loadPic('canvasPic')
selectTool('pencil','paintBucket','pickColor')
changeColor('currentColor','prevColor','currentColorPick','colorPicker')
canvas.addEventListener('mousemove', (event)=> {

  if(pencilSelect == true){
    draw(event)
  }
})
canvas.addEventListener('click', ()=> {

  if(bucketSelect == true){
    console.log('paintBucket')
    paintBucket(event)
  }
  if(pickerSelect == true){
    colorPicker(event)
  }
})

canvas.addEventListener('mousedown', ()=> isDrawing = true)
canvas.addEventListener('mouseup', ()=> isDrawing = false)



async function getImage(city) {

  let url = `https://api.unsplash.com/photos/random?query=town,${city}&client_id=7d8ad6289850515abf7dd6ed56ac06f6e0af727c2dca5e8821d182f4cfc9ed9b`;
  
  result = await fetch(url)
  
  return result

  }

// async function calcImgParam(city) {

//   let url = `https://api.unsplash.com/photos/random?query=town,${city}&client_id=334e7af72a02293a2fe8689c09fb9002ee02355364892d51795328928da12c73`;
  
//   fetch(url)
//     .then(res => res.json())
//     .then(data => { 
//       let img = new Image();
//       img.src = data.urls.small
//       img.setAttribute('crossorigin',"anonymous")
//       console.log(data)
//       img.addEventListener('load',async()=>{

//         if( canvas.height/img.naturalHeight < canvas.width/img.naturalWidth){

          
          
//           return (indentX,indentY, modImageWidth)
          
//         }else{

          
//           return(indentX,indentY,modImageHeight)
          
//         }

//       })
//     });
// }

function drawImage(city) {

  getImage(city)
    .then(res => res.json())
    .then(data => { 
      let img = new Image();
      img.src = data.urls.small
      img.setAttribute('crossorigin',"anonymous")
      img.addEventListener('load',()=>{

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if( canvas.height/img.naturalHeight < canvas.width/img.naturalWidth){
          
          let modImageWidth = (img.naturalWidth)*(canvas.getAttribute('height')/img.naturalHeight)
          let indentY =  0
          let indentX =  (canvas.width-modImageWidth)/2
         
          ctx.drawImage(img,indentX,indentY, modImageWidth ,canvas.height)
          

        }else{

          let modImageHeight =  (img.naturalHeight)*(canvas.width/img.naturalWidth)
          let indentY =  (canvas.height-modImageHeight)/2
          let indentX =  0

          ctx.drawImage(img,indentX,indentY, canvas.width ,modImageHeight)
          

        }

      })
    });
}


 
  // var grayscale = function() {
  //   for (var i = 0; i < data.length; i += 4) {
  //     var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
  //     data[i]     = avg; // red
  //     data[i + 1] = avg; // green
  //     data[i + 2] = avg; // blue
  //   }
  //   ctx.putImageData(imageData, 0, 0);
  // };
function grayscale() {

  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i]     = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    ctx.putImageData(imageData, 0, 0);

 }

let button = document.getElementById("cityInputButton")
let inputForm = document.getElementById("cityInputForm")
button.addEventListener("click",(e)=>{
  e.preventDefault(drawImage(inputForm.value))
  
})

let grayscaleButton = document.getElementById('grayscale')
grayscaleButton.addEventListener('click',(e)=>{

  e.preventDefault(grayscale())

})

const anchorTag = document.getElementById('login')
const outputText = document.getElementById('output')
anchorTag.addEventListener('click', (e) => {
  e.preventDefault()
  const authenticator = new netlify.default ({})
  authenticator.authenticate({provider:"github", scope: "user"}, (err, data) => {
    err ? outputText.innerText = "Error Authenticating with GitHub: " + err : 
    outputText.innerText = "Authenticated with GitHub. Access Token: " + data.token
  })
})