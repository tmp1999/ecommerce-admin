"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type CollectionColumn = {
  id: string
  name: string
  value: string
  createdAt:string
}

export const columns: ColumnDef<CollectionColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id:"actions",
    cell:({row})=><CellAction data={row.original}/>
  }
]
