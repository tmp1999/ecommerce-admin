import { NextResponse } from "next/server";
import {auth} from '@clerk/nextjs';
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    {params}:{params:{storeId:string}}
){
    try{
        const {userId} = auth();
        const body = await req.json();
        const {name, value}= body;
        if (!userId){
            return new NextResponse('Unauthenticated',{status:401})
        }
        if (!name){
            return new NextResponse('Name is required',{status:400});
        }
        if (!value){
            return new NextResponse('Value is required',{status:400});
        }
        if(!params.storeId){
            return new NextResponse('Store id is required',{status:400});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        });
        if(!storeByUserId){
            return new NextResponse("Unauthorized",{status:403})
        }


        const collection = await prismadb.collection.create({
            data:{
                name,
                value,
                storeId: params.storeId
            }
        });
        return NextResponse.json(collection)

    }catch(error){
       console.log('[COLLECTIONS_POST]',error);
       return new NextResponse ("Internal error",{status:500})
    }
}


export async function GET(
    req: Request,
    {params}:{params:{storeId:string}}
){
    try{
        if(!params.storeId){
            return new NextResponse('Store id is required',{status:400});
        }

        const collections= await prismadb.collection.findMany({
            where:{
                storeId: params.storeId
            }
        });
        return NextResponse.json(collections)

    }catch(error){
       console.log('[COLLECTIONS_GET]',error);
       return new NextResponse ("Internal error",{status:500})
    }
}