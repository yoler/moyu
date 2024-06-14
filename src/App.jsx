import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  var balls = []; //存储对象
  var texts = ["功德", "财富", "爱情", "事业", "健康"];
  const canvasRef = useRef()
  useEffect(() => {
    loop();
  }, [])

  const mouseup = (e) => {
    var x = e.pageX;
    var y = e.pageY;
    createBall(x, y);
  }
  
//小球的基本属性
function ball() {
  this.x = null;
  this.y = null;
  this.angle = null;
  this.vx=null;
  this.vy=null;
  this.r = null;
  this.color = null;
  this.init = function (x, y, text) {
    //初始化属性值
    this.x = x;
    this.y = y;
    //随机角度
    this.angle = Math.random() * Math.PI * 2;
    //随机小球的大小
    this.r = this.randomNum(10,25);
    this.vx=(this.randomNum(6,12)+Math.random()*0.5)*Math.cos(this.angle);
    this.vy=(this.randomNum(6,12)+Math.random()*0.5)*Math.sin(this.angle);
    this.color = this.randomColor();
    this.text = text;
  };
  //随机小球颜色
  this.randomColor = function () {
    return "#" + parseInt(Math.random() * 16777216).toString(16);
  };
  //随机大小
  this.randomNum = function (min, max) {
    return Math.random() * max + min;
  };
  //重绘时需移动
  this.move=function(){
    this.x+=this.vx;
    this.y+=this.vy;
    this.r-=0.3;
    this.vx*=0.93;
    this.vy*=0.93;
  }
}
//创建小球
function createBall(x, y) {
  var count = parseInt(Math.random() * 30 + 10);
  var text = texts[parseInt(Math.random() * texts.length)];
  for (var i = 0; i < count; i++) {
    var b = new ball();
    b.init(x, y, text);
    balls.push(b);
  }
}
//画小球
function Draw(content2d){
  for(var i=0;i<balls.length;i++){
      var circle=balls[i];
      circle.move();
      content2d.beginPath();
      content2d.font = "24px Verdana"
      content2d.fillStyle=circle.color;
      content2d.fillText(circle.text + '+1', circle.x,circle.y);
      content2d.fill();
      content2d.closePath();
  }
}
//移除小球
function removeBall(){
  for(var i=0;i<balls.length;i++){
    var circle=balls[i];
    if(circle.r<0.3){
      balls.splice(i,1);
      i--;
    }
  }
}

//计时器，即重绘
function loop(){
  var canvas = canvasRef.current;
  var content2d = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //清除整个canvas
  content2d.clearRect(0,0,canvas.width,canvas.height);
  Draw(content2d);
  removeBall();
  window.requestAnimationFrame(loop);
}
  return (
    <>
      <canvas ref={canvasRef} onMouseUp={mouseup}></canvas>
    </>
  )
}

export default App
