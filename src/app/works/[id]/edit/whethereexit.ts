"use server"
import {prisma} from "@/lib/prisma"

export const whethere=async(id:string)=>{
    try {
        await prisma.work.findUniqueOrThrow({
            where: {
                id: id,
              },
            

        })
        return "edit"
        
    } catch (error) {
        return "post"
        
    }


}