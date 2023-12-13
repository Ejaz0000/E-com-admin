'use client'
import React, { Fragment, useEffect, useState } from 'react'
import HomeLayout from '../components/layout'
import Link from 'next/link'
import Modal from '../components/modal';
import { useRouter } from 'next/navigation';



export default function Products() {
  const[showModal,setShowModal] = useState(false);
  const [products,setProducts] = useState([]);
  const [deleteProd,setDeleteProd] = useState({title: null, id: null});
  const [deleted,setDeleted]= useState(null);
  
  useEffect(()=>{
    async function fetchData() {
    const res = await fetch("/api/product", {
      method: "GET",
      cache: "no-store",
    });
  
    const data = await res.json();
    if (data && data.success) {
    
      setProducts(data.data);
     } else {
       console.log(data.message)
     }
    
  }
  fetchData();
  
  },[deleted]);
  
  const  handleDelete = async (e) =>{
    const delete_id = deleteProd.id;
    e.preventDefault();
    const res =await fetch("/api/product/findOne/"+delete_id, {
      method: "delete",
      
    });

    const data = await res.json();
    
    if (data && data.success) {
  
     console.log(data.message)
     setShowModal(false)
     setDeleted(delete_id)
    } else {
      console.log(data.message)
    }

    
  }
 

  return (
    <HomeLayout>
        <Fragment>
        <Link className='text-white rounded-md py-1 px-2 bg-green-500' href={'/products/newprod'}>
          Add new product
        </Link>
        <table className='basic mt-2'>
          <thead>
            <tr>
              <td>Product name</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            
             {products.map(product =>(
              <tr>
                <td>{product.title}</td>
                <td>
                  <Link href={'/products/edit/'+product._id}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>


                    Edit
                  </Link>
                  <Link href={""} onClick={()=>{setShowModal(true); setDeleteProd({title: product.title, id:product._id})}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                   Delete
                  </Link>
                </td>
              </tr>
            ))}  
          </tbody>
        </table>
        <Modal isVisible={showModal} onClose={()=>{setShowModal(false)}}>
          <div className='flex flex-col'>
          <div className='p-1 mb-3'>
          Do you want to delete {deleteProd.title}?
          </div>
          <div className='flex fl justify-end'>
          <button className='bg-green-500 text-white py-1 px-2 rounded-md mr-2' onClick={handleDelete}>
             Yes
          </button>
          <button className='bg-red-500 text-white py-1 px-2 rounded-md mr-2' onClick={()=>{setShowModal(false)}}>
             No
          </button>
          </div>
          </div>
        </Modal>
        </Fragment>
    </HomeLayout>
  )
}
