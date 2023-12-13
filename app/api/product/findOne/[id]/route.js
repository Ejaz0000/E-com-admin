import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";


export async function GET(req, { params }){
    try{
      await mongooseConnect();
      const id = params.id;
      const getproduct = await Product.findOne({_id:id});
  
      if(getproduct){
        return NextResponse.json({
          success: true,
          data: getproduct,
        });
      }else{
        return NextResponse.json({
          success: false,
          message:
            "failed to fetch the products ! Please try again after some time",
        });
      }
  
    }catch(e){
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  }

  export  async function PUT(req, { params }) {
     
    try {
      await mongooseConnect();
      const {title, description, price, id, images} = await req.json();
      const eiditedProduct = await Product.updateOne({_id: id}, {$set:{title:title, description:description, price:price, images:images}});
  
      if (eiditedProduct) {
        return NextResponse.json({
          success: true,
          message: "Updated successfully!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed ! Please try after some time.",
        });
      }
    } catch (e) {
      console.log(e);
  
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
     }


     
     export  async function DELETE(req, { params }) {
     
      try {
        await mongooseConnect();
        const id = params.id;
        const deletedProduct = await Product.deleteOne({_id: id});
    
        if (deletedProduct) {
          return NextResponse.json({
            success: true,
            message: "Deleted successfully!",
          });
        } else {
          return NextResponse.json({
            success: false,
            message: "failed ! Please try after some time.",
          });
        }
      } catch (e) {
        console.log(e);
    
        return NextResponse.json({
          success: false,
          message: "Something went wrong",
        });
      }
       }