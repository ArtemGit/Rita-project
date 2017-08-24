

////////////////////SetUp page//////////////////////////////

function setup() {
  var  greeting;
  var convas;
  generateText='';
  listinputFields=[];
  var numberGeneretinStrings;
  mainContextFlag=0;
  countLoadText=0;
  myText=[];
   markov=new RiMarkov(4);
  positonInput=0;
   var a=createA('#source','Источник');
  a.attribute('style','font-size: 11px; color: #555');
  a.attribute('id','view-source');
  a.position(470,25);
  convas=createCanvas(510, 500);
  convas.mousePressed(mfnc);
  convas.id("convas");
  showImputFilesFields();
   background(235);
}
//
  
///////////////////////////////////////////////////////////////

function addTextMessage(message,textSize, align,xpos,ypos)
{
  textFont('times', textSize);
  textAlign(align)
  lines = createP("Кликните по серой области,чтобы сгенерировать текст");
  lines.position(xpos,ypos);
}
/////////////////////Chech if choose file is txt//////////////////////////
function validateChooseExtentionFile()
{

  var pathToText= this.value();
  var ext = pathToText.substring(pathToText.lastIndexOf('.') + 1);
  if(ext === "txt")
  {
    positonInput=listinputFields.indexOf(this);
    return true;
  }
  else
  {
    alert("Укажите файл с расширением .txt");
    this.value('')
    return false;
  }
}
//////////////////////////////////////////////////////////////
function isAllTextFilesLoaded()
{
  if(countLoadText == 3)
  {
    for(var i=0;i<myText.length;i++)
      if(typeof myText[i] ==="undefined")
       return false;
    return true;
  }
  return false;

}
////////////////////////Show window where we can watch generating text/////////////////////////////
function showMainContext()
{

  greeting.remove();
  listinputFields=toEmptyList(listinputFields);
  buttonClear = createButton("Обновить данные");
  buttonClear.position(40, 40);
  buttonClear.mousePressed(function()
  {
    clearWindowAndShowLoadFields(buttonClear)
  });
  numberGeneretinStrings = createInput();
  numberGeneretinStrings.position(200, 40);
  numberGeneretinStrings.size(280,15);
  numberGeneretinStrings.attribute("placeholder", "количество гененерируемых предложений");
  numberGeneretinStrings.attribute("required");
  numberGeneretinStrings.attribute("type", "number");
  
  addTextMessage("Кликните по серой области,чтобы сгенерировать текст",16,CENTER,55,170);

}
////////////////////////////to empty list of inputFile fields/////////////////////////////
function toEmptyList(list)
{
  list.forEach(function(item)
  {
    item.remove();
  });
  return []
}
////////////////////////////////////////////////////////////////
function showImputFilesFields()
{

  for(var i=1,dist=0;i<4;i++,dist+=30)
  {
    var	input = createFileInput(readTextFile);
    input.position(20, 65+dist);
    input.changed(validateChooseExtentionFile);
    listinputFields.push(input);

  }
  greeting = createElement('h2', 'Укажите файлы для генерации текста');
  greeting.position(20, 5);
}
/////////////////////////////////////////////////////////////////
 function readTextFile(file) 
  { 

    myText[positonInput]=file.data;
    countLoadText=myText.length;

}

/////////////////////////////////////////////////////////////////
function clearWindowAndShowLoadFields(buttonClear)
{
  showImputFilesFields();
  buttonClear.remove();
  lines.remove();
  numberGeneretinStrings.remove();
  myText=[];
  clearTextContentConvas();
  markov = new RiMarkov(4);
  mainContextFlag=0;
}
////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
function drawText() {

    lines.remove();
    clearTextContentConvas();
    text(generateText.join(' '), 55, 90, 400, 400);
}
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
function mfnc() {

  if(mainContextFlag==3)
{
  if(checkDisaringCountString())
  {
  generateText = markov.generateSentences(new Number(numberGeneretinStrings.value()));
  if(checkGeneration())
  drawText();
  }
  else
     alert('Укажите количество предложений,которое хотите получить(положительное число , <20)');
}

}
//////////////////clear text  at convas//////////////////////////
function clearTextContentConvas()
{
clear();
	background(235);
}
//////////////////////////////////////////////////////////////
function checkDisaringCountString()
{
  var n=new Number(numberGeneretinStrings.value());
  if(n==0 || n>21 || n<0)
  {
return false;
}
return true;
}

///////////////////////////////////////////////////////////////

function checkGeneration()
{
if(generateText.length==0)
{
	alert('Генерация не возможна,попробуйте добавить текстовые файлы с большей информацией');
return false;
}
return true;
}
/////////////////////DRAW function//////////////////////
function draw()
{
     if(isAllTextFilesLoaded())
    {
      showMainContext();  
      mainContextFlag=countLoadText;
      countLoadText=0; 
      gettingText=new RiString(myText[0]+myText[1]+myText[2]);
      gettingText.replaceAll('\r\n',' ');
      markov.loadText(gettingText.text());
          
     }
}