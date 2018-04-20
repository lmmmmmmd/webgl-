var canvas,gl;

/*var size = '10.0';
var linePosition = [
		-0.7, 0.1,
        -0.7, -0.5
];
var position = [
        0.3, 0.4,
        -0.7, -0.5,
        -0.3, 0.2
    ];*/
function main(){
	canvas = document.getElementById('canvas');
	canvas.width = document.documentElement.clientWidth;//屏幕宽度
	canvas.height = document.documentElement.clientHeight;//屏幕高度
	/* for (var i = 0; i < 100; i++) {
            var x = (Math.random() - 0.5);
            var y = (Math.random() - 0.5);
            var x2 = (Math.random() - 0.5);
            var y2 = (Math.random() - 0.5);

           getPoint(size,1.0,0.0,0.0,1.0,x,y);
           getLine('1.0',1.0,0.0,0.0,1.0,1.0,0.0,[x,y,x2,y2]);
        }*/
	/*getPoint('20.0',1.0,0.0,0.0,1.0,0.0,0.0);*/
	/*getLine(1.0,0.0,0.0,1.0,[-0.7, 0.1,-0.5, -0.5]);*/
	/*getTriangle(1.0,0.0,0.0,1.0,position);*/
}

function getPoint(size,r,g,b,a,x,y){
	//顶点着色器
	var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n'+
	'void main() { \n'+
		'gl_Position = a_Position;\n'+
		'gl_PointSize = '+size+';}';
	//片元着色器
	var FSHADER_SOURCE = 
	'precision mediump float;\n'+
	'uniform vec4 u_FragColor;\n'+
	'void main() {\n'+
		'gl_FragColor = u_FragColor;}';
	gl = getWebGLContext(canvas);
	if(!gl){
		console.log('Failed to get the rendering context for webgl');
		return;
	}
	//初始化着色器
	if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
		console.log('Failed to initialize shaders');
		return;
	}
	//获取a_Position变量存储位置
	var a_Position = gl.getAttribLocation( gl.program,'a_Position');
	//获取u_FragColor变量存储位置
	var u_FragColor = gl.getUniformLocation(gl.program,'u_FragColor');

	if (a_Position<0) {
		console.log('Failed to get the storage location of a_Position');
		return;
	}
	gl.vertexAttrib3f(a_Position, x, y, 0.0);//把坐标赋予aposition

	gl.uniform4f(u_FragColor,r,g,b,a);
	//设置<canvas>背景颜色
	gl.clearColor(0.0,0.0,0.0,0.0);

	//清空<canvas>
	//gl.clear(gl.COLOR_BUFFER_BIT);
	//绘制一个点
	gl.drawArrays(gl.POINT,0,1);
}

function getLine(r,g,b,a,position){
	//顶点着色器
	var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n'+
	'void main() { \n'+
		'gl_Position = a_Position;\n'+
		'gl_PointSize = 1.0;}';
	//片元着色器
	var FSHADER_SOURCE = 
	'precision mediump float;\n'+
	'uniform vec4 u_FragColor;\n'+
	'void main() {\n'+
		'gl_FragColor = u_FragColor;}';
	gl = getWebGLContext(canvas);

	if(!gl){
		console.log('Failed to get the rendering context for webgl');
		return;
	}
	//初始化着色器
	if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
		console.log('Failed to initialize shaders');
		return;
	}
	//获取a_Position变量存储位置
	var a_Position = gl.getAttribLocation( gl.program,'a_Position');
	//获取u_FragColor变量存储位置
	var u_FragColor = gl.getUniformLocation(gl.program,'u_FragColor');

	if (a_Position<0) {
		console.log('Failed to get the storage location of a_Position');
		return;
	}
	gl.vertexAttrib3f(a_Position, 0.0,0.0, 0.0);//把坐标赋予aposition

	gl.uniform4f(u_FragColor,r,g,b,a);
	//设置<canvas>背景颜色
	gl.clearColor(0.0,0.0,0.0,0.0);

	 var vertexBuffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);

    gl.vertexAttribPointer(a_Position,2 , gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.LINES, 0, 2);
}

function getTriangle(r,g,b,a,position){
	//顶点着色器
	var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n'+
	'void main() { \n'+
		'gl_Position = a_Position;\n'+
		'gl_PointSize = 1.0;}';
	//片元着色器
	var FSHADER_SOURCE = 
	'precision mediump float;\n'+
	'uniform vec4 u_FragColor;\n'+
	'void main() {\n'+
		'gl_FragColor = u_FragColor;}';

	gl = getWebGLContext(canvas);

	if(!gl){
		console.log('Failed to get the rendering context for webgl');
		return;
	}
	//初始化着色器
	if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
		console.log('Failed to initialize shaders');
		return;
	}
	//获取a_Position变量存储位置
	var a_Position = gl.getAttribLocation( gl.program,'a_Position');
	//获取u_FragColor变量存储位置
	var u_FragColor = gl.getUniformLocation(gl.program,'u_FragColor');

	if (a_Position<0) {
		console.log('Failed to get the storage location of a_Position');
		return;
	}
	gl.vertexAttrib3f(a_Position, 0.0,0.0, 0.0);//把坐标赋予aposition

	gl.uniform4f(u_FragColor,r,g,b,a);
	//设置<canvas>背景颜色
	gl.clearColor(0.0,0.0,0.0,0.0);

  	var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0); // 2表示数组中2个元素表示一个点
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.TRIANGLES, 0, 3); // 6是顶点数量
}