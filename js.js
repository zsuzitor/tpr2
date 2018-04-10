//1--обычная ячейка  2--А Б(путь и тд по краям уровень 1)   3-- потенциалы

var column=0;//4
var row=4;
var matrix=[];



//TODO
//TODO сохранять еще и Q в файл и читать тоже



//старт страницы и начало работы
function page_start(){


	column=4;
	reload_ui(false);
	load_matr();
}
//создание пустой схемы ui по размерам() при ui=false стирает матрицу и создает заного пустую(только центральную матрицу)
function reload_ui(UI){
	var div=document.getElementById("main_div_tabl");
	
	div.innerHTML="";
	var tmp=column;
	column=0;
	for(var i=0;i<tmp;++i){
		add_column_f(UI);

	}
	
}




//внесение данных из ui в js
function save_matr(){
	for(var i=0;i<row;++i){
		for(var i2=0;i2<column;++i2){
			var div=document.getElementById("one_input_id"+i+"_"+i2)
			matrix[i][i2]=+div.value;
		}
		
	}	
}
//добавление в созданную ячейку значений в ui
function load_matr(){
	for(var i=0;i<row;++i){
		for(var i2=0;i2<column;++i2){
			var div=document.getElementById("one_input_id"+i+"_"+i2)
			div.value=matrix[i][i2];
		}
		
	}
}

//добавить строку
function add_row_f(){
	for(var i=0;i<column;++i){
	//обычне ячейки
	var div=document.getElementById("one_column_id"+i);
//div.innerHTML+=add_one_cell_ui(row,i,1);//"<input class='input_block' id='one_input_id"+row+"_"+i+"' type='text' type='number'>";
div.innerHTML+=add_one_cell_ui(row,i,1);
if(matrix[row]==undefined)
	matrix[row]=[];
matrix[row][i]=0;

}
row++;
}

function add_one_cell_ui(row,column,type){
	var res="";

	switch(type){
		case 1:
		res="<div class='input_block' id='input_block_id"+row+"_"+column+"'><input class='input_block' id='one_input_id"+row+"_"+column+"'  type='number'></div>";
		break;
		case 2:
		break;
	}
return res;
}

//добавить столбец
function add_column_f(UI){
	var res="";
	var main_div=document.getElementById("main_div_tabl");
	res+="<div class='div_inline_block div_one_colum' id='one_column_id"+column+"'>";

	for(var i=0;i<row;++i){
		res+=add_one_cell_ui(i,column,1);
		if(matrix[i]==undefined)
			matrix[i]=[];
		if(!UI){
			matrix[i][column]=0;
		}
		
	}
res+="</div>";

	//res+="</div>";
column++;
main_div.innerHTML+=res;

}


//кнопка удалить строку
function del_row(){
	row--;
	for(var i=0;i<column;++i){

		var div=document.getElementById("input_block_id"+row+"_"+i);
		div.remove();
		

	}
	matrix.splice(row,1);

}

//кнопка удалить столбец
function del_column(){
	column--;
	var div=document.getElementById("one_column_id"+column);
	div.remove();
	
	for(var i=0;i<row;++i){
		matrix[i].splice(column,1);
	}
	
}
//кнопка добавить столбец
function add_column(){
	save_matr();
	add_column_f(false);
	load_matr();
}
//кнопка добавить строку
function add_row(){
	save_matr();
	add_row_f();
	load_matr();

}
//очистить все кроме цены в коде(матрица+ потенциалы)
function not_full_clear_matrix(){//full
	alert("not_full_clear_matrix");
}
//functions подсчета северозаподного угла










//передавать параметры
function min_num(){

	var res=null;
	for(var i=0;i<arguments.length;++i){
		if(res==null)
			res=arguments[i];
		else
			if(arguments[i]<res)
				res=arguments[i];
		}
		return res;
	}
	function Z_matr(matrix){
		var res=0;
		for(var i=0;i<matrix.length;++i){
			for(var i2=0;i2<matrix[0].length;++i2){
				res+=matrix[i][i2].price*matrix[i][i2].count;
			}
		}
		return res;
	}



	document.addEventListener("DOMContentLoaded", page_start);




	function loadFile(files) {
		var file = files[0];
		if(file) {
			var reader = new FileReader();
			reader.onload = function (e) {  
				var text = e.target.result;
				var arr = text.split(',');
				row=+arr[0];
				column=+arr[1];
				arr.splice(0,2);
				matrix=[];



				var num=0;
				for(var i=0;i<row;++i){
					for(var i2=0;i2<column;++i2){
	//обычне ячейки
	
	if(matrix[i]==undefined)
		matrix[i]=[];
	matrix[i][i2]=arr[num];
	num++;
}
}

						//ОТРИСОВАТЬ UI
						reload_ui(true);
						load_matr();
					};
					reader.readAsText(file);
				}
			}


			function saveFile() {

//размерность ->матрица->границы->потенциалы
save_matr();
var str=""+row+","+column+",";
//TODO сохранять еще и Q
for(var i=0; i<row; i++) {
	for(var j=0; j<column; j++) {
								//num= i*j+j];
								str+=matrix[i][j]+",";
							}
						}
						
						str[str.length-1]="";

				//сохранение файла
				var pom=document.createElement('a');
				//alert(str);
				pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
				pom.setAttribute('download', 'example.txt');
				pom.click();
			}
