import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function ChangePassword () {

  const [isOpen, setIsOpen] = useState<boolean>(false)


  const toggleDialog = () => setIsOpen(!isOpen)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={toggleDialog}>Cambiar Contraseña</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] mx-auto p-6 bg-white rounded-lg">
        <DialogHeader className="border-b pb-4 mb-4">
          <DialogTitle className="text-lg font-medium">Cambiar Contraseña</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="current-password" className="text-right">
              Contraseña actual
            </Label>
            <Input id="current-password" value="" className="col-span-3 p-2 border border-gray-300 rounded" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-password" className="text-right">
              Nueva contraseña
            </Label>
            <Input id="new-password" value="" className="col-span-3 p-2 border border-gray-300 rounded" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirm-password" className="text-right">
              Confirmar nueva contraseña
            </Label>
            <Input id="confirm-password" value="" className="col-span-3 p-2 border border-gray-300 rounded" />
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Guardar cambios
          </Button>
          <Button onClick={toggleDialog} type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

