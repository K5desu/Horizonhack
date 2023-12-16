"use server";

import{prisma} from "@/lib/prisma"
export const editWork=  async  (id:string,title:string,url:string,img:string)=>{
   
   
  
    try{
   
     await prisma.work.update({
     
      where:{
        id:id},
        data:{
            title:title,
            url:url,
            img:img
              
                 
                    
                    
                

            }
           

        
      }
    
      
      )

}catch(error){
  return "error";
}

  
  

    };
