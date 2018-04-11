//1--обычная ячейка  2--А Б(путь и тд по краям уровень 1)   3-- потенциалы

var column=0;//4
var row=4;
var matrix=[];
var method=-1;


//TODO
//TODO сохранять еще и Q в файл и читать тоже
//add_column_math-- добавляет колонну с названием и парамтерами


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
		add_column_f(UI,false);

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
function add_column_f(UI,q){
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
	if(q)
		insert_ui('q',true,column);
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
	var bl=document.getElementById("one_inp_num_id"+column);
	bl.remove();
	
	for(var i=0;i<row;++i){
		matrix[i].splice(column,1);
	}
	
}
//кнопка добавить столбец
function add_column(){
	save_matr();
	var select=document.getElementById('method');
	var value = select.options[select.selectedIndex].value;
	//TODOтут смотреть выбраный метод и добавлять или нет q (2 параметр)
	add_column_f(false,true);
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
function min_max_num(min){

	var mass=[];
	for(var i=1;i<arguments.length;++i)
		mass.push(arguments[i]);
	return min_max_in_mass(min,mass);

//
function min_max_in_mass(min,mass){
	var res=null;
	for(var i=0;i<mass.length;++i){
		var num=mass[i];
if(mass[i] instanceof Array){//arguments[i] instanceof []||

	num=min_max_in_mass(min,mass[i]);
}
if(res==null)
	res=num;
else
	if(min){
		if(num<res)
			res=num;
	}
	else
		if(num>res)
			res=num;
	}
	return res;
}


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


//-----------------------------------------------------------------------------------------

function changeInput() {

	var select=document.getElementById('method');
	var value = select.options[select.selectedIndex].value;
	switch (value) {
		case 'minimax':
		insert_ui("",true);
		break;
		case 'bayes_laplas':
		insert_ui("q",true,column);
		break;
		case 'sevidg':
		insert_ui("",true);
		break;
		case 'gurvits':
		insert_ui("c",true);
		break;
		case 'hodg_lemon':
		insert_ui("q",true,column);
		insert_ui("v");
		break;
		case 'germeyer':
		insert_ui("q",true,column);
		insert_ui("a");
		break;
		case 'proizvedenie':
		insert_ui("a",true);
		break;

		default:
		alert('Unknown method');
	}

}

function insert_ui(what,clear,count){

	var div=document.getElementById("input_numbers");
	var res="";
	if(clear===true)
		div.innerHTML="";
	switch(what){


case "q"://one_input_q_"+i+"
for(var i=0;i<count;++i){
	var bl=document.getElementById("one_input_q_"+i);
//var ggg=bl===null?0:bl.value;

res+="<div class='div_inline_block one_inp_num' id='one_inp_num_id"+i+"'><label>q"+i+"</label><input value='"+(bl===null?0:bl.value)+"' id='one_input_q_"+i+"' type='number'></div>";


}
div.innerHTML+=res;

break;

case "c"://one_input_c

res+="<div class='div_inline_block one_inp_num' id='one_inp_num_c_id'><label>c=</label><input value='0'  id='one_input_c' type='number'></div>";
div.innerHTML+=res;
break;


case "v"://one_input_v
res+="<div class='div_inline_block one_inp_num' id='one_inp_num_v_id'><label>v=</label><input value='0' id='one_input_v' type='number'></div>";
div.innerHTML+=res;
break;

case "a"://one_input_a
res+="<div class='div_inline_block one_inp_num' id='one_inp_num_v_id'><label>a=</label><input value='0' id='one_input_a' type='number'></div>";
div.innerHTML+=res;
break;
}
}




function start_math(){
	save_matr();
	//div_for_math
	var select=document.getElementById('method');
	var value = select.options[select.selectedIndex].value;
	switch (value) {
		case 'minimax':
		minimax_method();
		break;
		case 'bayes_laplas':
		bayes_laplas_method();
		break;
		case 'sevidg':
		sevidg_method();
		break;
		case 'gurvits':
		gurvits_method();
		break;
		case 'hodg_lemon':
		hodg_lemon_method();
		break;
		case 'germeyer':
		germeyer_method();

		break;
		case 'proizvedenie':
		proizvedenie();
		break;

		default:
		alert('Unknown method');
	}

	load_matr();
}


function minimax_method(){
	var div=document.getElementById("div_for_math");

	var mass_eir=[];
	var res="<div class='div_one_colum div_inline_block'>";
	for(var i=0;i<row;++i){
		mass_eir[i]=min_max_num(true,matrix[i]);
		res+="<div class='output_block' id='output_block_id_eir"+row+"'><label>"+mass_eir[i]+"</label></div>";

	}

	res+="</div>";

	var max_eir=min_max_num(false,mass_eir);
	res+="<div class='div_one_colum div_inline_block'>";
	for(var i=0;i<row;++i){

		res+="<div class='output_block' id='output_block_id_max_eir"+row+"_"+column+"'><label>";
		if(max_eir==mass_eir[i])
			res+=max_eir;
		res+="</label></div>";
	}
	res+="</div>";
	div.innerHTML=res;
}

function bayes_laplas_method(){
	var div=document.getElementById("div_for_math");
	var q_mass=[];
	for(var i=0;i<column;++i){
		q_mass.push(+ document.getElementById("one_input_q_"+i).value)
	}
	var eq_mass=[];
	for(var i2=0;i2<row;++i2)
		eq_mass[i2]=[];

	var res="";
//S(EijQi)

for(var i2=0;i2<column;++i2){
	res+="<div class='div_one_colum div_inline_block'>";

	for(var i=0;i<row;++i){
		var eq=matrix[i][i2]*q_mass[i2];
		eq_mass[i][i2]=eq;
		res+="<div class='output_block' id='output_block_id_eq"+i2+"_"+i+"'><label>";
		
		res+=eq;
		res+="</label></div>";

	}
	res+="</div>";
}

res+="<div class='div_one_colum div_inline_block'>";
var mass_summ_eq=[];
for(var i=0;i<row;++i){
	mass_summ_eq[i]=0;	

	for(var i2=0;i2<column;++i2){
		mass_summ_eq[i]+=eq_mass[i][i2]


	}
	res+="<div class='output_block' id='output_block_id_eq"+row+"_"+column+"'><label>";

	res+=mass_summ_eq[i];
	res+="</label></div>";

}
res+="</div>";


res+="<div class='div_one_colum div_inline_block'>";
var max_sm=min_max_num(false,mass_summ_eq);
for(var i=0;i<row;++i){

	res+="<div class='output_block' id='output_block_id_max_eir_"+row+"_"+column+"'><label>";
	if(max_sm==mass_summ_eq[i])
		res+=max_sm;
	res+="</label></div>";
}
res+="</div>";


div.innerHTML=res;
}





function sevidg_method(){
	var div=document.getElementById("div_for_math");

	var matr_eir=[];
	var res="";

	for(var i2=0;i2<column;++i2){
		var mass_max_f=[];
		matr_eir[i2]=[];
		res+="<div class='div_one_colum div_inline_block'>";
		for(var i=0;i<row;++i){
			mass_max_f.push(matrix[i][i2]);

		}
		var max_col=min_max_num(false,mass_max_f);

		for(var i=0;i<row;++i){
			matr_eir[i2][i]=max_col-matrix[i][i2];
			res+="<div class='output_block' id='output_block_id_sevidg_method_"+row+"_"+column+"'><label>";
			res+=matr_eir[i2][i];
			res+="</label></div>";

		}

		res+="</div>";
	}

	var mass_eir=[];
	res+="<div class='div_one_colum div_inline_block'>";
	for(var i=0;i<row;++i){
		var mm=[]
		for(var i2=0;i2<column;++i2){
			mm.push(matr_eir[i2][i]);

		}
		mass_eir[i]=min_max_num(false,mm);
		res+="<div class='output_block' id='output_block_id_sevidg_methodc_"+row+"_"+column+"'><label>";
		res+=mass_eir[i];
		res+="</label></div>";

	}
	res+="</div>";


	res+="<div class='div_one_colum div_inline_block'>";
	var max_res=min_max_num(true,mass_eir);
	for(var i=0;i<row;++i){
	// var mm=[]
	// for(var i2=0;i2<column;++i2){
	// 	mm.push(matr_eir[i2][i]);

	// }

	//mass_eir[i]=min_max_num(true,mm);
	res+="<div class='output_block' id='output_block_id_sevidg_methodc_"+row+"_"+column+"'><label>";
	if(max_res==mass_eir[i])
		res+=mass_eir[i];
	res+="</label></div>";

}
res+="</div>";


div.innerHTML=res;
}





function gurvits_method(){
	var div=document.getElementById("div_for_math");
	var res="";
	var c_num=document.getElementById("one_input_c").value;
	res+="<div class='div_one_colum div_inline_block'>";
	var mass_min_ei=[];
	var mass_max_ei=[];

	for(var i=0;i<row;++i){
		var eq= min_max_num(true,matrix[i])*c_num;
		res+="<div class='output_block' id='output_block_id_gurvits_"+row+"_"+column+"'><label>";
		mass_min_ei.push(eq);
		res+=eq;
		res+="</label></div>";

	}


	res+="</div>";


	res+="<div class='div_one_colum div_inline_block'>";


	for(var i=0;i<row;++i){
		var eq= min_max_num(false,matrix[i])*(1-c_num);
		res+="<div class='output_block' id='output_block_id_gurvits_"+row+"_"+column+"'><label>";
		mass_max_ei.push(eq);
		res+=eq;
		res+="</label></div>";

	}


	res+="</div>";

	res+="<div class='div_one_colum div_inline_block'>";

	var min_mass_eir=[];
	for(var i=0;i<row;++i){

		res+="<div class='output_block' id='output_block_id_gurvits_"+row+"_"+column+"'><label>";
		var eq=+mass_max_ei[i]+ +mass_min_ei[i];
		min_mass_eir.push(eq);
		res+=eq;
		res+="</label></div>";

	}


	res+="</div>";


	res+="<div class='div_one_colum div_inline_block'>";

	var min_mass_eir_num=min_max_num(false,min_mass_eir);
	for(var i=0;i<row;++i){

		res+="<div class='output_block' id='output_block_id_gurvits_"+row+"_"+column+"'><label>";
		if(min_mass_eir_num==min_mass_eir[i])
			res+=min_mass_eir_num;
		res+="</label></div>";

	}


	res+="</div>";



	div.innerHTML=res;
}





function hodg_lemon_method(){
	var div=document.getElementById("div_for_math");
	var res="";
	var v_num=+document.getElementById("one_input_v").value;
	var q_mass=[];
	var eqv_mass=[];
	for(var i=0;i<column;++i)
		q_mass.push(+document.getElementById("one_input_q_"+i).value);

	var eq_mass=[];
	var tmp_str_1="<div class='div_one_colum div_inline_block'>";
	var tmp_str_2="<div class='div_one_colum div_inline_block'>";

	for(var i=0;i<row;++i){
		var summ_eq=0;
		for(var i2=0;i2<column;++i2){
			summ_eq+=+matrix[i][i2]*q_mass[i2];


		}
		eq_mass.push(summ_eq);
		eqv_mass.push(summ_eq*v_num);
		tmp_str_1+="<div class='output_block' id='output_block_id_gurvits_"+row+"_"+column+"'><label>";

		tmp_str_1+=summ_eq;
		tmp_str_1+="</label></div>";
		tmp_str_2+="<div class='output_block' id='output_block_id_gurvits_"+row+"_"+column+"'><label>";

		tmp_str_2+=eqv_mass[i];
		tmp_str_2+="</label></div>";


		
	}
	tmp_str_1+="</div>";
	tmp_str_2+="</div>";
	res+=tmp_str_1+tmp_str_2;

	var mass_eir=[];
	res+="<div class='div_one_colum div_inline_block'>";
	for(var i=0;i<row;++i){
		mass_eir[i]=min_max_num(true,matrix[i]);
		res+="<div class='output_block' id='output_block_id_eir"+row+"'><label>"+mass_eir[i]+"</label></div>";

	}

	res+="</div>";

	res+="<div class='div_one_colum div_inline_block'>";
	for(var i=0;i<row;++i){
		mass_eir[i]=min_max_num(true,matrix[i]);
		res+="<div class='output_block' id='output_block_id_eir"+row+"'><label>"+mass_eir[i]+"</label></div>";

	}

	res+="</div>";

	var one_m_v_min=[];
	res+="<div class='div_one_colum div_inline_block'>";
	for(var i=0;i<row;++i){
		one_m_v_min.push((1-v_num)*mass_eir[i]);
		res+="<div class='output_block' id='output_block_id_eir"+row+"'><label>"+one_m_v_min[i]+"</label></div>";

	}

	res+="</div>";

	var summ_2_col=[];
	res+="<div class='div_one_colum div_inline_block'>";
	for(var i=0;i<row;++i){
		summ_2_col.push(one_m_v_min[i]+eqv_mass[i]);
		res+="<div class='output_block' id='output_block_id_eir"+row+"'><label>"+summ_2_col[i]+"</label></div>";

	}

	res+="</div>";
	var max_summ_2_col=min_max_num(false,summ_2_col);
	res+="<div class='div_one_colum div_inline_block'>";
	for(var i=0;i<row;++i){
		
		res+="<div class='output_block' id='output_block_id_eir"+row+"'><label>";
		if(max_summ_2_col==summ_2_col[i])
			res+=max_summ_2_col;
		res+="</label></div>";
	}

	res+="</div>";



	div.innerHTML=res;
}


function germeyer_method(){
	var div=document.getElementById("div_for_math");
	var res="";
	var a_num=+document.getElementById("one_input_a").value;
	var q_mass=[];
	//var max_num_table=min_max_num(false,matrix);
	for(var i=0;i<column;++i)
		q_mass.push(+document.getElementById("one_input_q_"+i).value);
	var matrix_sub_1=[];
	
	for(var i2=0;i2<row;++i2){
		res+="<div class='div_one_colum div_inline_block'>";
		for(var i=0;i<row;++i){
			if(matrix_sub_1[i]==undefined)
				matrix_sub_1[i]=[];
			res+="<div class='output_block' id='output_block_id_eir"+row+"'><label>";
			matrix_sub_1[i][i2]=matrix[i][i2]-a_num;
			res+=matrix[i][i2]-a_num;
			res+="</label></div>";

		}
		res+="</div>";
	}

	for(var i2=0;i2<column;++i2){
		res+="<div class='div_one_colum div_inline_block'>";
		for(var i=0;i<row;++i){
			matrix_sub_1[i][i2]=matrix_sub_1[i][i2]/column;
			res+="<div class='output_block' id='output_block_id_eir"+row+"'><label>";
			
			res+=matrix_sub_1[i][i2];
			res+="</label></div>";
		}
		res+="</div>";
	}
	var min_eir=[];
	res+="<div class='div_one_colum div_inline_block'>";
	for(var i=0;i<row;++i){
		min_eir.push(min_max_num(true,matrix_sub_1[i]));
		res+="<div class='output_block' id='output_block_id_eir"+row+"'><label>";
		
		res+=min_eir[i];
		res+="</label></div>";
		
	}
	res+="</div>";
	var max_eir_num=min_max_num(false,min_eir);
	res+="<div class='div_one_colum div_inline_block'>";
	for(var i=0;i<row;++i){
		
		res+="<div class='output_block' id='output_block_id_eir"+row+"'><label>";
		if(max_eir_num==min_eir[i])
			res+=min_eir[i];
		res+="</label></div>";
		
	}
	res+="</div>";



	div.innerHTML=res;

}

function proizvedenie(){
	var div=document.getElementById("div_for_math");
	var res="";
	var a_num=+document.getElementById("one_input_a").value;
	var new_matr=[];

	for(var i2=0;i2<column;++i2){
		res+="<div class='div_one_colum div_inline_block'>";
		for(var i=0;i<row;++i){
			if(new_matr[i]==undefined)
				new_matr[i]=[];
			new_matr[i][i2]=matrix[i][i2]+a_num;
			res+="<div class='output_block' id='output_block_id_eir"+row+"'><label>";
			
			res+=new_matr[i][i2];
			res+="</label></div>";
		}

		res+="</div>";
	}
	var mult_mass=[];
	res+="<div class='div_one_colum div_inline_block'>";
	for(var i=0;i<row;++i){
		var mm_num=1;
		for(var i2=0;i2<column;++i2){
			mm_num*=new_matr[i][i2]
		}
		mult_mass.push(mm_num);
		res+="<div class='output_block' id='output_block_id_eir"+row+"'><label>";
		
		res+=mult_mass[i];
		res+="</label></div>";

	}
	res+="</div>";

	div.innerHTML=res;
}



//------------------------------------------------

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
