
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check } from "lucide-react"


export function NotificationCard() {
  return (
    <Card className="col-span-2 overflow-y-auto flex flex-col border rounded-sm h-[500px] w-full p-2">
    <h1>Notifications</h1>

    <CardContent className="grid gap-4">
  {/* <div className=" flex items-center space-x-4 rounded-md border p-4">
    <div className="flex-1 space-y-1">
      <p className="text-sm font-medium leading-none">
        Push Notifications
      </p>
      <p className="text-sm text-muted-foreground">
        Send notifications to device.
      </p>
    </div>
  </div> */}
  <Card className="m-0 p-2">
      <div
        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
      >
        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Note
          </p>
          <p className="text-sm text-muted-foreground">
            New user added
          </p>
        </div>
      </div>
    
  </Card>
  <Card className="m-0 p-2">
      <div
        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
      >
        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Note
          </p>
          <p className="text-sm text-muted-foreground">
            New user added
          </p>
        </div>
      </div>
    
  </Card>
  <Card className="m-0 p-2">
      <div
        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
      >
        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Note
          </p>
          <p className="text-sm text-muted-foreground">
            New user added
          </p>
        </div>
      </div>
    
  </Card>
</CardContent>
    <CardFooter>
  <Button className="w-full">
    <Check className="mr-2 h-4 w-4" /> Mark all as read
  </Button>
</CardFooter>
</Card>
  )
}
