"use client"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CollectionColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"

import axios from "axios"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionProps{
    data: CollectionColumn
}


export const CellAction:React.FC<CellActionProps> =({
    data,
})=>{
    const router = useRouter();
    const params = useParams();
    const [loading,setLoading] = useState(false);
    const [open,setOpen] = useState(false);

    const onCopy = (id:string)=>{
        navigator.clipboard.writeText(id);
        toast.success('Collection Id copied to the clipboard')
    }
    const onConfirm = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/collections/${data.id}`);
          toast.success('Collection deleted.');
          router.refresh();
        } catch (error) {
          toast.error('Make sure you removed all products using this collection first.');
        } finally {
          setOpen(false);
          setLoading(false);
        }
      };
    return(
        <>
            <AlertModal 
            isOpen={open} 
            onClose={()=>setOpen(false)} 
            onConfirm={onConfirm} 
            loading={loading}/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4"/>
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/collections/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4"/>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=> setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}