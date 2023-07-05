const CreatePageModel = require("../../models/CreatePage");
//insertAPI
async function insertDetails(request, response) {
    const event = new CreatePageModel(request.body);
    try {
        await event.save();
        response.status(201).send(event);
    } catch (error) {
        response.status(500).send(error);
    }
}

//getAPI
async function getDetails(request, response) {
    const events = await CreatePageModel.find({}).sort({ createdAt: "descending" });
    try {
        response.status(200).send(events);
    } catch (error) {
        response.status(500).send(error);
    }
}

//getbyID

async function getDetailsById(request, response) {
    console.log("request", request.params)
    try {
        let data = await CreatePageModel.findOne({ _id: request.params.id });
        response.status(200).send(data);
    } catch (error) {
        response.status(500).send(error);
    }
}

//updateDetails

async function updateDetails(request,response){
    try {
        await CreatePageModel.findByIdAndUpdate(request.params.id, {
            name:request.body.name,
            description:request.body.description,
            content:request.body.content,
            status:request.body.status,
            template:request.body.template,
            image:request.body.image,
        });
        response.status(200).send(request.body);
      } catch (error) {
        response.status(500).send(error);
      }
}

//deleteAPI
async function removeDetails(request,response){
    try {
        await CreatePageModel.deleteOne({ _id: request.params.id });
        response.status(200).send();
      } catch (error) {
        response.status(500).send(error);
      }
}


module.exports = {
    insertDetails,
    getDetails,
    getDetailsById,
    updateDetails,
    removeDetails
}