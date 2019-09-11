//variable super global

var win_width = window.innerWidth;
var win_height = window.innerHeight;

var time = 0;

var player;
var map;

var x = 0;
var y = 0;

var jump_time = 0;
var val;

var nb_plateforms = 0;
var nb_plateforms_total = 0;

var game_over = 0;
var distance = 1;

var speed_map = 20;
var speed = 100;


//obj

function jump ()
{
	player.style.backgroundImage = "url('img/botjump.png')";
	jump_time++;
	if (jump_time < 6)
	{
		y += jump_time *2;
	}
	else if (jump_time >= 6)
	{
		y -= jump_time *2;
	}
	
	val = keep_nb(player.style.top) - y;
	console.log(jump_time+" : "+val);
	player.style.top = val +'px';
	
	if (jump_time == 10)
	{
		player.style.backgroundImage = "url('img/botright.png')";
		jump_time = 0;
		y = 0;
		clearTimeout(aJump);
	}
	else
	{
		var aJump = setTimeout('jump()', 100);
	}
};

function map_init()
{
	player = document.getElementById('player');
	map = document.getElementById('map');

	map.style.width = win_width + 100 + 'px';
	
	player.style.top ='200px';
	player.style.left = win_width/2-50+'px';
}

function create_gap()
{
	nb_plateforms_total++;
	nb_plateforms++;
	map.innerHTML += '<div id="'+nb_plateforms_total+'" class="empty"></div>';
}

function keydown(e)
{
	if (game_over)
		window.location.href="index.php";
	jump();
};

function click()
{
	if (game_over)
		window.location.href="index.php";
	jump();
};

//utils

function keep_nb(str)
{
	var reg = new RegExp(["[^0-9]"], "g");
	var nb = str.replace(reg,"");
	nb = Number(nb);
	return nb;
};

function info(info)
{
	document.getElementById('info').innerHTML = info;
};


function animate()
{
	//player
	var position = keep_nb(player.style.backgroundPosition);
	if (game_over == 1)
	{
		distance+=4;
		player.style.top = keep_nb(player.style.top)+ distance + 'px';
	}
	else
		player.style.backgroundPosition = position + 100 + 'px';
	if (position == 300)
	{
		player.style.backgroundPosition = '0px';
	}
};

function animate_map()
{
	x -= 10;
	if(time%speed_map*1.5 == 0 && Math.ceil(Math.random()*10) < 7)
	{
		create_gap();
	}
	var i = 0;	
	while (i < nb_plateforms)
	{
		i++;
		document.getElementById(i).style.right = keep_nb(document.getElementById(i).style.right) + 4 + 'px';
	}
	setTimeout(animate_map, speed_map);
};

function fall()
{
	var i = 0;
	var on_plateform = 0;
	while (i < nb_plateforms)
	{
		i++;
		if(keep_nb(document.getElementById(i).style.right) > (win_width/2-50 - 25 + 100) && keep_nb(document.getElementById(i).style.right) < (win_width/2-50 + 60 + 100) && player.style.top =="200px")
		{
			player.style.backgroundImage = "url('img/botdeath.png')";
			game_over = 1;
			speed_map=10000000;
			info("");
			document.getElementById('plateform').innerHTML = '<br/><br/><br/><h1>GAME OVER !</h1><h2>Score : '+time+'</h2><a href="index.php">';
		}
	}
};


function render()
{
	animate();
	fall();
	if(game_over != 1)
	{
		info(time);
		time ++;
	}

	if (time %50 == 0)
	{
		speed_map -= 2;
		speed -= 2;

	}
	setTimeout('render()', speed);
};
	
//main

map_init();
render();
animate_map();
document.onkeydown = keydown;
document.onclick = click;
