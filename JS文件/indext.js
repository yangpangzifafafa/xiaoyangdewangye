var flag=true;//全局变量
function show_menu(){
	var menu1=document.getElementById("menu1");
	if(flag==true){
		menu1.style.display="block";
		flag=false;
	}else{
		menu1.style.display="none";
		flag=true;
	}
}
function show_menu1(){
	//alert("dhgd");
	var title1=document.getElementById("title");
	title1.style.display="none";
	flag=false;
}