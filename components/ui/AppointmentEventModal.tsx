import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { AppointmentEventData } from "./AppointmentEvent";
import { Badge } from "./badge";

export const AppointmentEventModal: React.FC<{ event: AppointmentEventData; onClose: () => void }> = ({ event, onClose }) => (
  <Dialog open onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{event.title}</DialogTitle>
        <DialogDescription>
          {event.date} {event.time && <>at {event.time}</>}
          {event.patient && <> | Patient: {event.patient}</>}
          {event.doctor && <> | Doctor: {event.doctor}</>}
          {" | Type: "}{event.type.toUpperCase()}
          {event.description && <> | Description: {event.description}</>}
        </DialogDescription>
        <div className="flex flex-col gap-2 mt-2">
          {event.patient && <div><span className="font-semibold">Patient:</span> {event.patient}</div>}
          {event.doctor && <div><span className="font-semibold">Doctor:</span> {event.doctor}</div>}
          <div><span className="font-semibold">Type:</span> <Badge>{event.type.toUpperCase()}</Badge></div>
          {event.description && <div><span className="font-semibold">Description:</span> {event.description}</div>}
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
); 