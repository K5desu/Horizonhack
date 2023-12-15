import{list} from'@vercel/blob'

import DeleteButton from './delete-button';

export default async function AllFilesPage(){
    const {blobs}=await list();
    
   

    
  
    
    


   
    return <div>
        {blobs.map((blob)=>(
            <div key={blob.url}>
                <img src={blob.url}></img>  {/* この情報をデータベースからgetする*/}
                {blob.pathname}-<DeleteButton url={blob.url}/>
            
            </div>
        ))}
        </div>
}