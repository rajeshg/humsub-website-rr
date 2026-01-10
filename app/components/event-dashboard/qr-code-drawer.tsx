import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { QRCodeDisplay } from "../qrcode"
import { Button } from "../ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "../ui/drawer"

interface QRCodeDrawerProps {
  itemId: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const QRCodeDrawer: React.FC<QRCodeDrawerProps> = ({ itemId, isOpen, onOpenChange }) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          title="Show QR code"
          aria-label="Show QR code"
          className="flex items-center justify-center md:w-auto md:h-auto md:px-3 md:py-2"
        >
          <Icon icon="mdi:qrcode" />
          <span className="inline ml-2 text-sm">Show QR Code</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center justify-center">
        <DrawerTitle>Scan QR Code for Check-in</DrawerTitle>
        <div className="py-4 flex justify-center items-center">
          <div className="max-w-[200px] max-h-[200px] w-full h-full flex items-center justify-center">
            <QRCodeDisplay text={itemId} />
          </div>
        </div>
        <DrawerClose asChild>
          <Button variant="secondary" className="mt-2">
            Close
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  )
}
