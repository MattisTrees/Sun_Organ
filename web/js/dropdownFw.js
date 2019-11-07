"use strict"; 

function dropdown(subMenuId){
                
                var ele = document.getElementById(subMenuId);
                
                if(ele.style.visibility === "visible"){
                    hide(ele);
                } else {
                    show(ele);
                }
                
                function hide(ele){
                    ele.style.visibility = "hidden";
                }
                
                function show(ele){
                    ele.style.visibility = "visible";
                }
                
            } // end of function