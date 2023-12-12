import { put ,del} from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || "";

 
if(filename&&request.body){
  const blob = await put(filename, request.body, {
    access: 'public',
  });



  return NextResponse.json(blob);
}else {
    return NextResponse.json({message:"Nofile"});
}
} 

export async function DELETE(request:Request){
    const json=await request.json;
    console.log({json});
    
    return NextResponse.json({});
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
