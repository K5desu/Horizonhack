"use server";

import{prisma} from "@/lib/prisma"
export const postWork=  async  (id:string,title:string,url:string,img:string)=>{
   
   
  
    try{
   
     await prisma.user.update({
     
      where:{
        id:id},
        data:{
            work:{
                create:[
                    {title:title,
                    url:url,
                    img:img}
              
                 
                    
                    
                ]

            }
           

        }
      }
    
      
      )

}catch(error){
  return "error";
}

  
  

    };

