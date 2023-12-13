import multiparty from 'multiparty';
import { NextResponse } from "next/server";
import { analytics } from '@/app/firebase/firebase-config';
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage';


export  async function POST(req) {
     
    try {
      
        const formData = await req.formData();
        const file = formData.get('file');
        console.log(file)
        const fileRef = ref(analytics,'newfiles/image')
      
        uploadBytes(fileRef,file).then((data)=>{
          getDownloadURL(data.ref).then((url)=>{
            console.log("url",url)
          })
        })
        
        return NextResponse.json({
            success: true,
            message: "done",
          });
      
    } catch (e) {
      console.log(e);
  
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
     }


     