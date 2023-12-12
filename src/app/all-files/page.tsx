import{list} from'@vercel/blob'
import DeleteButton from './delete-button';

export default async function AllFilesPage(){
    const {blobs}=await list();
    console.log({blobs});
    return <div>
        {blobs.map((blob)=>(
            <div key={blob.url}>
                {blob.pathname}-<DeleteButton url={blob.url}/>

            </div>
        ))}</div>
}