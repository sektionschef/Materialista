class NoiseStripes{constructor(t,i,e){this.upperLeft=t,this.lowerRight=i,this.gridOrientation=e,this.width=this.lowerRight.x-this.upperLeft.x,this.height=this.lowerRight.y-this.upperLeft.y,this.clusterSize=4,this.lineHeight=SHORTSIDE/300,this.xinc=.005,this.yinc=.005,this.masterBuffer=createGraphics(this.width,this.height),"x"==this.gridOrientation?this.orientation="y":this.orientation="x",this.yoff=0;for(var s=0;s<this.masterBuffer.height;s+=this.clusterSize){this.xoff=0;for(var h=0;h<this.masterBuffer.width;h+=this.clusterSize)this.r=noise(this.xoff,this.yoff),random()<.5?this.masterBuffer.fill(color(255*this.r)):this.masterBuffer.fill(color(255*random())),this.masterBuffer.noStroke(),this.masterBuffer.rect(h,s,this.clusterSize,this.clusterSize),this.xoff+=this.xinc;this.yoff+=this.yinc}this.createStripes()}createStripes(){if(this.stripeBuffer=createGraphics(this.width,this.height),"x"==this.orientation)for(var t=0;t<this.height/(this.clusterSize*this.lineHeight);t++)this.stripeBuffer.fill(255*random()),this.stripeBuffer.noStroke(),this.stripeBuffer.rect(0,t*this.lineHeight*this.clusterSize,this.width,this.lineHeight*this.clusterSize);else for(t=0;t<this.width/(this.clusterSize*this.lineHeight);t++)this.stripeBuffer.fill(255*random()),this.stripeBuffer.noStroke(),this.stripeBuffer.rect(t*this.lineHeight*this.clusterSize,0,this.lineHeight*this.clusterSize,this.height);this.masterBuffer.blendMode(OVERLAY),this.masterBuffer.image(this.stripeBuffer,0,0)}show(){push(),tint(color(PALETTE.paper)),image(this.masterBuffer,this.upperLeft.x,this.upperLeft.y),pop()}}