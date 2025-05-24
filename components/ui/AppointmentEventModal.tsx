import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { AppointmentEventData } from "./AppointmentEvent";
import { Badge } from "./badge";

export const AppointmentEventModal: React.FC<{ event: AppointmentEventData; onClose: () => void }> = ({ event, onClose }) => (
  <Dialog open onOpenChange={onClose}>
    <DialogContent className="bg-background flex flex-col  p-10">
      <DialogHeader className="flex flex-col gap-5 ">
        <div className="flex justify-start items-center gap-2   ">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>

        </Avatar>
        <DialogTitle >{event.title}</DialogTitle>
        </div>
      
        <DialogDescription>
          {event.date} {event.time && <>at {event.time}</>}
          {event.patient && <> | Patient: {event.patient}</>}
          {event.doctor && <> | Doctor: {event.doctor}</>}
          {" | Type: "}{event.type.toUpperCase()}
          {event.description && <> | Description: {event.description}</>}
        </DialogDescription>

        <div className="flex flex-col gap-2 mt-2 ">
          {event.patient && <div><span className="font-semibold mr-2">Patient:</span> {event.patient}</div>}
          <div><span className="font-semibold mr-2">Type:</span> <Badge>{event.type.toUpperCase()}</Badge></div>
          {event.description && <div><span className="font-semibold mr-2">Description:</span> {event.description}</div>}
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
); 