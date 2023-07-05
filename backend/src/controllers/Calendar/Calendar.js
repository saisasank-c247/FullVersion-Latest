const CalendarEventModel = require("../../models/CalendarEvent");

async function getEvents(request,response) {
    const events = await CalendarEventModel.find({}).sort({createdAt: "descending"});
    try {
        response.status(200).send(events);
} catch (error) {
        response.status(500).send(error);
    }
}

async function insertEvent(request,response) {
    const event = new CalendarEventModel(request.body);
    console.log(request.body)
    try {
        await event.save();
        response.status(201).send(event);
    } catch (error) {
        response.status(500).send(error);
    }
}

async function updateEvent(request,response){
    try {
        await CalendarEventModel.findByIdAndUpdate(request.params.id, {
            title:request.body.title,
            from_date:request.body.from_date,
            to_date:request.body.to_date
        });
        response.status(204).send(request.body);
      } catch (error) {
        response.status(500).send(error);
      }
}

async function removeEvent(request,response){
    console.log("request",request.params);
    try {
        await CalendarEventModel.findByIdAndDelete(request.params.id);
        response.status(200).send();
      } catch (error) {
        response.status(500).send(error);
      }
}

module.exports = {
    getEvents,
    insertEvent,
    updateEvent,
    removeEvent
}