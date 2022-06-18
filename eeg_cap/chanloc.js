var caps = [
	{
		'name': 'NuAmps40',
		'id': 'nuamps40'
	},
	{
		'name': 'NuAmps64',
		'id': 'nuamps64'
	}
]

var config = {
	'width' : 600,
	'height': 500,
	'circleRadius' : 10,
	'circleColor' : 'red',
	'font': "12px Arial"
}

var cCap = caps[1];
var capData = chanlocsData[cCap['id']];
var activeElecs = [];
capData.forEach((elec) => activeElecs.push(true));

var canvas = document.getElementById("capCanvas");
var ctx = canvas.getContext("2d");

function initCap(icap){
	cCap = caps[icap];
	capData = chanlocsData[cCap['id']];
	activeElecs = [];
	capData.forEach((elec) => activeElecs.push(true));
}

var capSelector = document.getElementById("capsInput");
capSelector.onchange = function(e){
	var capSelected = e.srcElement.value;
	icap = caps.findIndex((cap) => cap.id == capSelected)
	initCap(icap);
	ctx.clearRect(0, 0, config.width, config.height);
	drawCap();
}

function drawCap(){
	for(i in capData){
		var elec = capData[i];
		ctx.beginPath();
		ctx.arc(elec['x0']*config.width, elec['y0']*config.height, config.circleRadius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.font = config.font;
		ctx.fillText(elec['name'], elec['x0']*config.width, elec['y0']*config.height-config.circleRadius-2);
	}
}

canvas.onclick = function(e) {
	var pos = getMousePos(canvas, e);
	var ielec = isMouseInElec(pos);
	if(ielec > -1){
		console.log(ielec)
		var circle = getCircle(ielec);
		ctx.beginPath();
		ctx.clearRect(circle.x - circle.radius - 1, circle.y - circle.radius - 1,
                      circle.radius * 2 + 2, circle.radius * 2 + 2);
		if(activeElecs[ielec]){
			ctx.arc(circle.x, circle.y, circle.radius-1, 0, 2 * Math.PI);
			ctx.fillStyle = circle.color;
			activeElecs[ielec] = false;
			ctx.fill();
		}
		else{
			ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
			ctx.fillStyle = 'white';
			ctx.fill();
			ctx.stroke();
			activeElecs[ielec] = true;
		}
		
		
	}
}

function getCircle(i){
	return {
		x : parseFloat(capData[i]['x0']) * config.width,
		y : parseFloat(capData[i]['y0']) * config.height,
		radius : config.circleRadius,
		color : config.circleColor
	}
}

function isPointInCircle(point, circle) {
	return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
}

function isMouseInElec(pos){
	var ielec = -1;
	for(i in capData){
		if(isPointInCircle(pos, getCircle(i))){
			return i;
		}
	}
	return ielec;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        'x' : (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        'y' : (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

drawCap();