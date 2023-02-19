class Paper{constructor(){this.width=.2*SHORTSIDE,this.height=.2*SHORTSIDE,this.strokeColorBase=color(PALETTE.paper),this.strokeColorOffset=10,this.strokeSize=1,this.lineLength=25,this.lineCount=.002*TOTALPIXEL,this.xCount=Math.ceil(width/this.width),this.yCount=Math.ceil(height/this.height),this.buffer=createGraphics(this.width,this.height),this.masterBuffer=createGraphics(width,height),this.create(),this.createMasterBuffer()}create(){for(var t=0;t<this.lineCount;t++){let t=createVector(getRandomFromInterval(0,this.width),getRandomFromInterval(0,this.height)),e=getRandomFromInterval(0,2*PI),h=getRandomFromInterval(2,this.lineLength),i=createVector(Math.cos(e)*h+t.x,Math.sin(e)*h+t.y);this.strokeColor=distortColorSuperNew(this.strokeColorBase,this.strokeColorOffset),this.buffer.stroke(this.strokeColor),this.buffer.strokeWeight(this.strokeSize),this.buffer.line(t.x,t.y,i.x,i.y),i.x>this.width&&(i.x-=this.width,t.x-=this.width,this.buffer.line(t.x,t.y,i.x,i.y)),i.y>this.height&&(i.y-=this.height,t.y-=this.height,this.buffer.line(t.x,t.y,i.x,i.y)),i.x<0&&(i.x+=this.width,t.x+=this.width,this.buffer.line(t.x,t.y,i.x,i.y)),i.y<0&&(i.y+=this.height,t.y+=this.height,this.buffer.line(t.x,t.y,i.x,i.y))}}createMasterBuffer(){for(var t=0;t<this.yCount;t++)for(var e=0;e<this.xCount;e++)this.masterBuffer.push(),this.masterBuffer.translate(e*this.buffer.width,t*this.buffer.height),this.masterBuffer.image(this.buffer,0,0),this.masterBuffer.pop()}show(){push(),image(this.masterBuffer,0,0),pop()}}