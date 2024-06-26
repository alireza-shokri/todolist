let $=document;
let inputElm=$.querySelector(".input")
let buttonCradet=$.querySelector(".button")
let parent_item=$.querySelector(".parent_item")
let clear_all=$.querySelector(".button_delt_all")
let new_item;
let new_par_complat_delet;
let new_status_wrok;
let new_delet;
let statusdo="ucomplate";
let list=[];
let araay;
let vaz_status=false;
let count=0


/ chekText
let chekvaztext;
function chekText(){
    if(inputElm.value){
        if(list[0]){
            list.forEach(element2=>{
            if(element2.content==inputElm.value)
                chekvaztext=true;})
            if(chekvaztext){
                alert("این مورد وجود دارد")
                chekvaztext=false;
            }
            else
                savelocalhost()
        }
        else
            savelocalhost()
    }
    else
        alert("کادر خالیه")
}

function savelocalhost(){ 
    count+=1
    console.log(count)
    list.push({id:count,content:inputElm.value ,status:vaz_status})
    
    localStorage.setItem('item',JSON.stringify(list));
    console.log(list)
    Handl()
}



function Handl(){
    new_item=$.createElement("div");
    new_item.classList.add('item');
    new_title_Item=$.createElement("p");
    new_title_Item.classList.add('title_item')
    new_title_Item.innerHTML=inputElm.value;
    new_par_complat_delet=$.createElement("div");
    new_par_complat_delet.classList.add("parent_complate_delet")
    new_status_wrok=$.createElement("button");
    new_status_wrok.classList.add("uncomplate")
    new_status_wrok.innerHTML=statusdo;
    new_delet=$.createElement("button");
    new_delet.classList.add("delet")
    new_delet.innerHTML="delet";
    new_item.append(new_title_Item)
    new_par_complat_delet.append(new_status_wrok,new_delet)
    new_item.append(new_par_complat_delet)
    parent_item.append(new_item)
        inputElm.value="";
        inputElm.focus()
    new_status_wrok.addEventListener('click',status_wrok)
    new_delet.addEventListener('click',deletitem)
}
// onkeydown
function Enterhandl(eventkey){
    if(eventkey.key=="Enter")
        chekText()
}
// ---------------
function status_wrok(event){
    if(event.target){
        list.forEach(element=>{
            if(event.target.parentElement.parentElement.children[0].innerHTML==element.content){
                if(element.status==false){
                    element.status=true;
                    event.target.classList.add("complate")
                    event.target.innerHTML="complate";
                    event.target.parentElement.parentElement.children[0].classList.add('title_item_complate')            
                }
                else{
                    element.status=false;
                    event.target.classList.remove("complate")
                    event.target.innerHTML="uncomplate";
                    event.target.parentElement.parentElement.children[0].classList.remove("title_item_complate")   ;
                }
                localStorage.setItem('item',JSON.stringify(list));
            }
        })
    }
    else{
        event.classList.add("complate")
        event.innerHTML="complate";
        event.parentElement.parentElement.children[0].classList.add('title_item_complate')
    }
}


function clearAll(){
    if(list[0]){
        localStorage.removeItem("item");
        location.reload();
    }
    else 
        alert("چیزی برای پاک کردن نیست عزیزم")
}


function deletitem(event){
  let which= list.findIndex(element=>{
        return (event.target.parentElement.parentElement.children[0].innerHTML==element.content)})
        event.target.parentElement.parentElement.remove()
        count=0;
        list.splice(which,1)
        localStorage.setItem("item",JSON.stringify(list))
        list.forEach(element2 => {
            element2.id=count+=1
            localStorage.setItem("item",JSON.stringify(list))
        });
}



function loadatuo(){
    if(JSON.parse(localStorage.getItem("item"))){
        list=JSON.parse(localStorage.getItem("item"));
        list.forEach(element => {
          inputElm.value=element.content;

          if(element.status==false){
                statusdo="uncomplate";
                Handl()
          }
          else{
            statusdo="complate";
            Handl()
            status_wrok(new_status_wrok)
          }
        });}
    inputElm.focus()
}
window.onload=loadatuo;
clear_all.addEventListener("click",clearAll)
buttonCradet.addEventListener("click",chekText)
inputElm.addEventListener("keydown",Enterhandl)