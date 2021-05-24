function fetchFromTableJson()
{
fetch("tables.json")
.then(response =>response.json())
.then(data => {
    //console.log(data);
    var tabledata=JSON.stringify(data);
    //console.log(imgdata)
    localStorage.setItem("tableData",tabledata);
    
});
}

function fetchFromMenuJson()
{

fetch("menu.json")
.then(response =>response.json())
.then(data => {
    //console.log(data);
    var tabledata=JSON.stringify(data);
    //console.log(imgdata)
    localStorage.setItem("menuData",tabledata);
    
});

}

if(localStorage.getItem("tableData")==null){
    fetchFromTableJson()
}


const items= document.querySelectorAll('.item');
const tables=document.querySelectorAll(".table");
function tabledata()
{

}
items.forEach(item => {
    item.addEventListener("dragstart",dragStart)
    
});
function dragStart(e) {
    e.dataTransfer.setData('itemid', e.target.id);
    console.log(e.dataTransfer.getData('itemid'))
    console.log(e.target.innerHTML)
}


tables.forEach(t => {
    t.addEventListener("dragenter",dragEnter)
    t.addEventListener("dragover",dragOver)
    t.addEventListener("dragleave",dragLeave)
    t.addEventListener("drop",drop)
    t.addEventListener("click",()=>
    {
        modal.style.display = "block";
        let tno=t.id[5]
        localStorage.setItem("currenttable",tno)
        displayOrders(tno)

    })
  
    
});
function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');
    var id = e.dataTransfer.getData('itemid');
    //var draggeditem = document.getElementById(id);
   // console.log(draggeditem);
    var tableno=e.target.id[5]
    console.log(tableno)
    extractDataAndStore(id,tableno)
    console.log("Dropping in "+tableno)
    loadTableData()
}

function extractDataAndStore(id,tableno)
{
    var rawdata=localStorage.getItem("tableData")
   // console.log(rawdata)
    var data=JSON.parse(rawdata)

    let namesrc="#"+id+" "+"h3"
    let pricesrc="#"+id+" "+"p"
    console.log(namesrc)
    let name=document.querySelector(namesrc).textContent
    let price=document.querySelector(pricesrc).textContent
    var order=[name,price,1]
   // data.tables[tableno-1].orders.add(order);
    console.log(data.tables[tableno-1].orders.length);
    var len=data.tables[tableno-1].orders.length
    for(i=0;i<len;i++)
    {
        let itemname=data.tables[tableno-1].orders[i][0]
        console.log(itemname,name)
        if(itemname===name)
    {
            data.tables[tableno-1].orders[i][2]=parseInt(data.tables[tableno-1].orders[i][2])+1
            console.log("Same name")
            break;
    }
    }
    if(i===len)
    {
        data.tables[tableno-1].orders[len]=order
        data.tables[tableno-1].totalitems=parseInt(data.tables[tableno-1].totalitems)+1
    }
    data.tables[tableno-1].totalprice=parseFloat(data.tables[tableno-1].totalprice)+parseFloat(price)
    localStorage.setItem("tableData",JSON.stringify(data))


}


function loadTableData()

{
    var rawdata=localStorage.getItem("tableData")
    console.log(rawdata)
    var data=JSON.parse(rawdata)
    console.log(data)
    console.log(data.tables)
    for(let i=0;i<data.tables.length;i++)
    {
        var name=data.tables[i].name
        var price=data.tables[i].totalprice
        var items=data.tables[i].totalitems
        tables[i].innerHTML="<h3 >"+name+"</h3><p>Rs."+price+"| Total items:"+items+"</p>";
    }


}

function loadMenuData()
{
    var menudata=localStorage.getItem("menuData")
    var menu=JSON.parse(menudata)
    console.log(menu)
    for(i=0;i<items.length;i++)
    {
        items[i].innerHTML="<h3>"+menu.items[i].name+"</h3><p>"+menu.items[i].price+"</p>"
    }

}

function searchMenu()
{

    //resetting
    for(i=0;i<items.length;i++)
    {
        items[i].style.display=""
    }
    console.log("searching")
    var menudata=localStorage.getItem("menuData")
    var menu=JSON.parse(menudata)
    var text=document.getElementById("menusearch").value.toUpperCase();
    for(i=0;i<items.length;i++)
    {
        let itemname=menu.items[i].name;
        if(!itemname.toUpperCase().includes(text))
        {
            items[i].style.display="none"
        
    }
}

}

function searchTable()
{
    //resetting
    for(i=0;i<tables.length;i++)
    {
        tables[i].style.display=""
    }
    console.log("searching")
    var tabledata=localStorage.getItem("tableData")
    var data=JSON.parse(tabledata)
    var text=document.getElementById("tablesearch").value.toUpperCase();
    for(i=0;i<tables.length;i++)
    {
        let tablename=data.tables[i].name
        if(!tablename.toUpperCase().includes(text))
        {
            tables[i].style.display="none"
        
    }
}

}

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.querySelector(".close");
console.log(modal)
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function displayBill(tableno)
{
 console.log("billing Table No "+tableno)   
 var tabledata=localStorage.getItem("tableData")
 var data=JSON.parse(tabledata)
 console.log(data.tables[tableno-1])
 var orders=data.tables[tableno-1].orders
 var bill=document.getElementById("totalbill")
 var session=document.getElementById("sessionclose")
 var text="<table class='table  table-striped'><thead class='thead-dark'><tr>"
        +"<th>S.no</th>"
         +"<th>Item</th>"
         +"<th>Price(Rs.)</th>"
         +"<th>Quantity</th>"
         +"</tr></thead>"
 for(i=0;i<orders.length;i++)
 {
    let j=i+1;
     text+="<tr><td>"+j+"</td><td>"+orders[i][0]+"</td><td>"+orders[i][1]+"</td><td>"+orders[i][2]+"</td></tr>"
 }
 var modalbody=document.querySelector(".modal-body");
 bill.innerHTML="TOTAL BILL :"+data.tables[tableno-1].totalprice
 session.innerHTML=''
modalbody.innerHTML=text
data.tables[tableno-1].totalitems=0
data.tables[tableno-1].totalprice=0
data.tables[tableno-1].orders=[]
//console.log(data);
localStorage.setItem("tableData",JSON.stringify(data))
loadTableData()



}

function displayOrders(tableno)
{
 console.log("displaying Table No "+tableno)   
 var header=document.getElementById("header")
 header.innerHTML=" Table "+tableno+" |Order-Details"
 var tabledata=localStorage.getItem("tableData")
 var data=JSON.parse(tabledata)
 console.log(data.tables[tableno-1])
 var orders=data.tables[tableno-1].orders
 var modalbody=document.querySelector(".modal-body");
 var bill=document.getElementById("totalbill")
 var closesession=document.getElementById("sessionclose")
 console.log(orders.length)
 if(orders.length===0)
 {
    modalbody.innerHTML="<br><br><h1 style='text-align: center;'>No Orders</h1>"
    bill.innerHTML=''
    closesession.innerHTML=''
    return 
}
var totalBill=0
 var text="<table><tr>"
        +"<th>S.no</th>"
         +"<th>Item</th>"
         +"<th>Price(Rs.)</th>"
         +"<th> </th>"
         +"<th> </th></tr>"
 for(i=0;i<orders.length;i++)
 {
    let j=i+1;
    totalBill+=(orders[i][1]*orders[i][2])
     text+="<tr><td>"+j+"</td><td>"+orders[i][0]+"</td><td>"+orders[i][1]+"<td><p class='servings'>Number of Servings</p><input type='number' id='quantity"+i+"'"+"value='"+(orders[i][2])+"' onchange='updateQuantity("+tableno+","+i+")' min='1'></td>"+ "<td><i class='fa fa-trash' onclick='deleteItem("+i+","+tableno+")' id='deletebtn'></i></td></tr>";
 }

 

bill.innerHTML="TOTAL BILL :"+data.tables[tableno-1].totalprice
closesession.innerHTML="CLOSE SESSION(GENERATE BILL)"
modalbody.innerHTML=text
}

var billgenerator =document.getElementById("sessionclose")
billgenerator.addEventListener("click",()=>{
    var tablenum=localStorage.getItem("currenttable")
    console.log("Current table is "+tablenum)
    displayBill(tablenum)
})
function updateQuantity(tableno,i)
{
    console.log(i,tableno)
    var tabledata=localStorage.getItem("tableData")
 var data=JSON.parse(tabledata)
 var price=data.tables[tableno-1].orders[i][1]
 var prevservings=data.tables[tableno-1].orders[i][2]
 console.log(data.tables[tableno-1])

    var q=document.getElementById("quantity"+i).value
    console.log(q)
    data.tables[tableno-1].orders[i][2]=q;
    data.tables[tableno-1].totalprice-=(price*prevservings)
    data.tables[tableno-1].totalprice+=(q*price)
    localStorage.setItem("tableData",JSON.stringify(data))
    loadTableData()
    displayOrders(tableno)

}

function deleteItem(i,tableno)
{
    console.log(i,tableno)
    var tabledata=localStorage.getItem("tableData")
    var data=JSON.parse(tabledata)
    var len=data.tables[tableno-1].orders.length
    var price=data.tables[tableno-1].orders[i][1]
    var prevservings=data.tables[tableno-1].orders[i][2]
    var updatedData=data.tables[tableno-1].orders.slice(0,i).concat(data.tables[tableno-1].orders.slice(i+1,len));
    data.tables[tableno-1].orders=updatedData
    data.tables[tableno-1].totalitems-=1
    data.tables[tableno-1].totalprice-=(price*prevservings)
    localStorage.setItem("tableData",JSON.stringify(data))
    loadTableData()
    displayOrders(tableno)

}
