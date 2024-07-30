"use client"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export default function AudioSpeed() {
  const [speed, setSpeed] = useState<string>("fine")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize text-lg bg-blue-900 text-slate-50 hover:bg-blue-950 hover:text-slate-50 duration-500 focus-visible:ring-0 focus-visible:ring-offset-0">{speed}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-blue-950 text-slate-50 border-none">
        <DropdownMenuLabel className="font-bold">Playback Speed</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={speed} onValueChange={setSpeed} className="capitalize font-bold">
          <DropdownMenuRadioItem value="slower">slower</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="slow">slow</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="fine">fine</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="fast">fast</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="fastest">fastest</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
