var info={
    txt:{
        v:"",
        last:"",
    },
    addInfo:function(v)
    {
        //info.txt.v=info.txt.v+v+"\n";
       // info.txt.last = v;
        var element=document.getElementById("info");
        if(!element.hasChildNodes())
        {
            var para=document.createElement("label");
            element.appendChild(para);
            var oDivText = document.createTextNode(v);//创建一个文本节点内容是“666”，因为是document对象的方法。  
            para.appendChild(oDivText);//父级.appendChild(子节点);在div元素中添加“666” 
            para.style.opacity = 1; 
            para.style.transition="opacity 1s";
            para.addEventListener('webkitTransitionEnd', function(){
                    document.getElementById("info").removeChild(para);
                });
            setTimeout(()=>{
                para.style.opacity = 0 ;
            } , 1000);
        }
        //if(info.txt.v.length>1000)
        //{
        //    info.txt.v.slice(-500);
        //}
    }
};

export default { info }; 