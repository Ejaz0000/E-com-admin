'use client'
import HomeLayout from '@/app/components/layout'
import ProductForm from '@/app/components/productForm';
import React, { useEffect, useState } from 'react'

export default function EditProduct({params}) {
  const [productInfo,setProductInfo] = useState(null)
  const id = params.id
  useEffect(()=>{
    async function fetchData() {
    const res = await fetch("/api/product/findOne/"+id, {
      method: "GET",
      cache: "no-store",
    });
  
    const data = await res.json();
    if (data && data.success) {
    
      setProductInfo(data.data)
     } else {
       console.log(data.message)
     }
    
  }
  fetchData();
  },[id]);
  return (
    <HomeLayout>
      <h1>Edit Product</h1>
      {productInfo && (
        <ProductForm {...productInfo}/>
      )}
    
    </HomeLayout>
  )
}

