import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { collectionId: string } }
) {
  try {
    if (!params.collectionId) {
      return new NextResponse("Collection id is required", { status: 400 });
    }

    const collection = await prismadb.collection.findUnique({
      where: {
        id: params.collectionId
      }
    });
  
    return NextResponse.json(collection);
  } catch (error) {
    console.log('[COLLECTION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { collectionId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.collectionId) {
      return new NextResponse("Collection id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const collection = await prismadb.collection.delete({
      where: {
        id: params.collectionId,
      }
    });
  
    return NextResponse.json(collection);
  } catch (error) {
    console.log('[COLLECTION_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { collectionId: string, storeId: string } }
) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { name, value } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!params.collectionId) {
      return new NextResponse("collection id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const collection = await prismadb.collection.update({
      where: {
        id: params.collectionId,
      },
      data: {
        name,
        value
      }
    });
  
    return NextResponse.json(collection);
  } catch (error) {
    console.log('[COLLECTION_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};