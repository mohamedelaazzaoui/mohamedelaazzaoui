let price=document.getElementById('price');
let title=document.getElementById('title');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let create=document.getElementById('create');
let category=document.getElementById('category');
let count=document.getElementById('count');
let data ;
let mode = 'creat';
let temp;
let searchmood='title';
let ptitle=document.getElementById('ptitle');

 

function getotal(){
    if( price.value!=''){
        
    let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
    total.innerHTML= result;
    
}
if( total.innerHTML > 0){
    total.style.cssText='background-color:green'
}
else{
    total.style.cssText='background-color:red'
}
} 

if(localStorage.datapro != null){
     data = JSON.parse(localStorage.datapro)
}else{
    data =[]
}

function gecreate(){
    let produit = {title:title.value.toUpperCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        category:category.value.toUpperCase(),
        count:count.value,
        
    }
    if(mode != 'creat'){
        count.value= 1 ;
        
    }
    
    if (title.value.length <= 0){
        mode = 'update';
        alert("pleas title this field ");
        title.style.cssText='border: 1px red solid';
         
        ptitle.style.cssText='display:block;';

    }if (price.value.length <= 0){
        mode = 'update';
        alert("pleas price this field ");
        price.style.cssText='border: 1px red solid';
        ptitle.style.cssText='display:block;';

    }
    if (taxes.value.length <= 0){
        mode = 'update';
        alert("pleas taxes this field ");
        taxes.style.cssText='border: 1px red solid';
        ptitle.style.cssText='display:block;';

    }
    if (ads.value.length <= 0){
        mode = 'update';
        alert("pleas ads this field ");
        ads.style.cssText='border: 1px red solid';
        ptitle.style.cssText='display:block;'; 

    }
    if (discount.value.length <= 0 ){
        mode = 'update';
        alert("pleas discount this field ");
        discount.style.cssText='border: 1px red solid';
        ptitle.style.cssText='display:block;';

    }
    
    if(count.value > 100){

        mode = 'update';
        alert("pleas value the count  <= 100 ");
        count.style.cssText='border: 1px red solid';
        ptitle.style.cssText='display:block;';
        }else if(count.value.length <=0){
            mode = 'update';
            alert("pleas count  this field  ");
            count.style.cssText='border: 1px red solid'; 
            ptitle.style.cssText='display:block;';
        }
        if (category.value.length <= 0 ){
            mode = 'update';
            alert("pleas category this field ");
            category.style.cssText='border: 1px red solid';
            ptitle.style.cssText='display:block;'; 
    
        }

        if( mode != 'update'){
            if(  count.value > 0 ){
                for(let i=0; i < count.value;i++ ){
                 data.push(produit);}
                 clear()
             }
        }else{
         data[temp] =produit;
         mode= 'creat';
         create.value='creat';
         count.style.display='inline'
        }
    
    
    localStorage.setItem('datapro',JSON.stringify(data))
    
   

}
function clear(){
    title.value='';
    price.value='';
    ads.value='';
    count.value='';
    taxes.value='';
    category.value='';
    total.innerHTML='';
    discount.value='';
}
function showdata(){
    for( let i = 1 ; i<data.length; i++){
        table +=`
        <tr><td class="idnum">${i}</td>
             <td id="colcontent">${data[i].title} </td> 
             <td id="colcontent">${data[i].price}</td> 
             <td id="colcontent">${data[i].taxes}</td>
              <td id="colcontent">${data[i].ads}</td> 
              <td id="colcontent">${data[i].discount}</td> 
              <td id="colcontent"> ${data[i].total}</td>
               <td id="colcontent"> ${data[i].category} </td>
                <td ><button onclick="update(${i})"> UPDATE</button></td> 
                <td> <button onclick="delet(${i})" id="delet"> DELETE</button></td></tr>
        `
    }
    let tbody = document.getElementById('tbody');
    tbody.innerHTML=table;
    let deletall=document.getElementById('delete');
    let bntdeleteall=document.getElementById('bntdeleteall')
    if(data.length > 0){
        deletall.style.cssText=' display:block'
        bntdeleteall.value= `DELETE ALL (${data.length})`
    }
       } showdata()
                    
       
function delet(i)
       {
       data.splice(i,1);
       localStorage.datapro = JSON.stringify(data);
       showdata()
       } 
       function deletall(){
        localStorage.clear();
        data.splice(0);
        showdata()
       }
function update(i){
title.value=data[i].title;
price.value=data[i].price;
taxes.value=data[i].taxes;
ads.value=data[i].ads;
discount.value=data[i].discount;
getotal()
count.style.display='none';
category.value=data[i].category;
create.value='UPDATE';
mode = 'update';
temp=i;
scroll({
    top:0,
    behavior:'smooth',
})
}

function getsearchmood(id){
    if(id =='serchbytitle' ){
        searchmood = 'title';
        search=document.getElementById('search');
        search.value=''
        
    }else{
        searchmood ='category';
        search.value=''
        
    }

}
function searchdata(value){
    let table='';
    if(searchmood == 'title'){
        
        for(let i=0 ; i<data.length;i++){
            if( data[i].title.includes(value.toUpperCase())){
                table +=`
        <tr><td>${i}</td>
             <td>${data[i].title} </td> 
             <td>${data[i].price}</td> 
             <td>${data[i].taxes}</td>
              <td>${data[i].ads}</td> 
              <td>${data[i].discount}</td> 
              <td> ${data[i].total}</td>
               <td> ${data[i].category} </td>
                <td><button onclick="update(${i})"> UPDATE</button></td> 
                <td> <button onclick="delet(${i})" id="delet"> DELETE</button></td></tr>
        ` 
            }
        }
    }else{
        for(let i=0 ; i<data.length;i++){
            if( data[i].category.includes(value.toUpperCase())){
                table +=`
        <tr><td>${i}</td>
             <td>${data[i].title} </td> 
             <td>${data[i].price}</td> 
             <td>${data[i].taxes}</td>
              <td>${data[i].ads}</td> 
              <td>${data[i].discount}</td> 
              <td> ${data[i].total}</td>
               <td> ${data[i].category} </td>
                <td><button onclick="update(${i})"> UPDATE</button></td> 
                <td> <button onclick="delet(${i})" id="delet"> DELETE</button></td></tr>
        ` ;
            }
        } 
    }
    document.getElementById('tbody').innerHTML = table;
}
function reset(id){
    let cast='f';
    let casp='f';
    let casx='f';
    let casa='f';
    let casd='f';
    let casc='f';
    let casg='f';
    if(id =='title'){
        title.style.cssText='border: 0px red solid';
        cast='v';
    }
    if(id =='price'){
        price.style.cssText='border: 0px red solid';
        casp='v';
    }
    if(id =='taxes'){
        taxes.style.cssText='border: 0px red solid';
        casx='v';
    }
    if(id =='ads'){
        ads.style.cssText='border: 0px red solid';
        casa='v';
    }
    if(id =='discount'){
        discount.style.cssText='border: 0px red solid';
        casd='v';
    }
    if(id =='count'){
        count.style.cssText='border: 0px red solid';
        casc='v';
    }
    if(id =='category'){
        category.style.cssText='border: 0px red solid';
        casg='v';
    }
if(casg !='f' ){
        ptitle.style.cssText='display:none;';

    }
    if(casd !='f' ){
        ptitle.style.cssText='display:none;';

    }
    if(casa !='f' ){
        ptitle.style.cssText='display:none;';

    }
    if(casx !='f' ){
        ptitle.style.cssText='display:none;';

    }
    if(casp !='f' ){
        ptitle.style.cssText='display:none;';

    }
    if(cast !='f' ){
        ptitle.style.cssText='display:none;';

    }
    if(casc !='f' ){
        ptitle.style.cssText='display:none;';

    }

} 










