"use client"
import HomeLayout from '@/app/components/layout'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { analytics } from '@/app/firebase/firebase-config';
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid'
import Spineer from '@/app/components/spineer';





export default function ProductForm({_id, title:existTitle, description:exitDescription, price:existPrice, images:existImages}) {
    const [title,setTitle] = useState(existTitle || '');
    const [images,setImages] = useState(existImages || []);
    const [description,setdescription] = useState(exitDescription || '');
    const [price,setPrice] = useState(existPrice || '');
    const [goToProduct,setGoToProduct] = useState(false);
    const [isLoading,setIsloading] = useState(false);
    const route = useRouter()
    const links = []
    

    async function saveProduct(e){
        e.preventDefault();
        if(_id){
            
            const res =await fetch("/api/product/findOne/"+_id, {
                method: "put",
                headers: {
                  "Content-Type": "application/json",
                },  
                body: JSON.stringify({
                  title: title,
                  description: description,
                  price: price,
                  id: _id,
                  images:images
                }),
              });

              const data = await res.json();
    
              if (data && data.success) {
            
               console.log(data.message)
               setGoToProduct(true)
              } else {
                console.log(data.message)
              }

        }
        else{
            const res = await fetch("/api/product", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },  
                body: JSON.stringify({
                  title: title,
                  description: description,
                  price: price,
                  images:images
                }),
              });
    
              const data = await res.json();
    
              if (data && data.success) {
               console.log(data.message)
               setGoToProduct(true)
              } else {
                console.log(data.message)
              }
        }
        
    }
    if(goToProduct){
      route.push('/products')
    }

    // async function uploadImages(e){
    //   const files = e.target?.files
    //   if(files?.length > 0){
    //     const data = new FormData()
    //     for(const file of files ){
    //       data.append('file', file)
    //     }
    //     const res = await fetch('/api/upload',{
    //       method: 'POST',
    //       body: data,
    //     })
    //     console.log(data)
    //     console.log(files)
    //     const da = await res.json();
    
    //           if (da && da.success) {
    //            console.log(da.message)
               
    //           } else {
    //             console.log(da.message)
    //           }
    //   }
    // }

    function uploadImage(e){
      const files = e.target?.files
      
      
      if(files?.length > 0){
        setIsloading(true)
    
        for(const file of files ){
          
        let split = file.name.split('.');
        split.pop();
        let fileName = split.join(".");
        const fileRef = ref(analytics,`imgFiles/${fileName + v4()}`)
      
        uploadBytes(fileRef,file).then((data)=>{
          
          getDownloadURL(data.ref).then((url)=>{
            links.push(url)
            setImages(oldimages =>{
              return [...oldimages, ...links]
            })
            setIsloading(false)
          })
        })
        }
        
      }
      
    }

  return (
    
        <form onSubmit={saveProduct}>
        <label>Product name</label>
        <input 
         type='text'
         placeholder='product name'
         value={title}
         onChange={e => setTitle(e.target.value)}
         />
         <label>
          Photos
         </label>
         <div className='mb-2 flex flex-wrap gap-1'>
          {images && images?.map(link =>(
            
            <div key={link} className='h-24'>
              
              <img className='max-h-full rounded-lg' src={link} alt=''/>
              </div>
          ))}

           {isLoading && (
             <div className='h-4 pt-8'>
             <Spineer/>
             </div>
           )}
            
          

         <label className="w-24 h-24 flex flex-col justify-center items-center rounded-lg bg-blue-300 text-gray-600 cursor-pointer">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
         </svg>
         Upload
         <input type="file" multiple onChange={uploadImage} className="hidden" />
        </label>


          
          

         </div>
        <label>Description</label>
        <textarea 
        placeholder='description'
        value={description}
        onChange={e => setdescription(e.target.value)}
        ></textarea>
        <label>Price (in Taka)</label>
        <input type='number' placeholder='price'
        value={price}
        onChange={e => setPrice(e.target.value)}
        />
        <button type='submit' className='btn-primary'>{_id==null? (<>Add</>):(<>Edit</>)}</button>
        </form>

  )
}

 