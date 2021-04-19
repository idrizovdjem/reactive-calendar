const utilityService = require('./utilityService.js');
const { Label } = require('../data/context.js');

async function getByText(text) {
    const response = utilityService.createResponse();

    // validate label text
    if(!text) {
        utilityService.addErrorMessage(response, 'Label is required!');
    } else {
        text = text.trim();
        // check if the label text is not an empty string
        if(text.length < 1) {
            utilityService.addErrorMessage(response, 'Label is required!');
        }
    }

    if(!response.ok) {
        // if label text validation failed, return failed response
        return response;
    }

    // search the db for the label matching with the input label text
    const labelResponse = await Label.findOne({
        attributes: ['id'],
        where: {
            text: text
        }
    });

    if(labelResponse === null) {
        // if the label object is not found, append error message
        utilityService.addErrorMessage(response, 'Invalid label text!');
        return response;
    }

    // get the label id from the label object
    const labelId = labelResponse.dataValues.id;
    // add the label id to the response data
    response.data.labelId = labelId;

    return response;
}

async function create(backgroundColor, color, text) {
    const response = utilityService.createResponse();

    // validate backgroundColor
    if(!backgroundColor) {
        utilityService.addErrorMessage(response, 'Label backgroundColor is required!');
    } else {
        backgroundColor = backgroundColor.trim();
        // check if the input backgroundColor is valid string
        if(backgroundColor.length < 1) {
            utilityService.addErrorMessage(response, 'Label backgroundColor is required!');
        }
    }

    // validate color
    if(!color) {
        utilityService.addErrorMessage(response, 'Label color is required!');
    } else {
        color = color.trim();
        // check if the input color is valid string
        if(color.length < 1) {
            utilityService.addErrorMessage(response, 'Label color is required!');
        }
    }

    // validate label text
    if(!text) {
        utilityService.addErrorMessage(response, 'Label text is required!');
    } else {
        text = text.trim();
        // check if the label text is valid string
        if(text.length < 1) {
            utilityService.addErrorMessage(response, 'Label texts is required!');
        }
    }

    // check if the label is already created
    const isAlreadyCreatedResponse = await getByText(text);
    if(!isAlreadyCreatedResponse.ok) {
        // if not, then create the new label
        const newLabel = await Label.create({ backgroundColor, color, text });
        response.data.label = newLabel;
    } else {
        // if yes, append error message to the response
        utilityService.addErrorMessage(response, 'Label with this text is already created!');
    }

    return response;
}

async function getById(id) {
    const response = utilityService.createResponse();

    // validate label id
    if(!id) {
        utilityService.addErrorMessage(response, 'Invalid id!');
    } else {
        // search the db for label matching the id
        const label = await Label.findOne({
            attributes: ['backgroundColor', 'color'],
            where: {
                id: id
            }
        });

        if(label === null) {
            // if the label is not found, append error message to the response
            utilityService.addErrorMessage(response, 'Missing label!');
        } else {
            // otherwise, get backgroundColor and color properties and add them to the response data
            const { backgroundColor, color } = label.dataValues;
            response.data = {
                backgroundColor,
                color
            };
        }

        return response;
    }
}

async function getAll() {
    const response = utilityService.createResponse();

    // get all labels
    const labels = await Label.findAll();
    // add mapped labels to response data
    response.data.labels = labels.map(label => {
        return {
            backgroundColor: label.backgroundColor,
            color: label.color,
            text: label.text
        }
    });
    return response;
}

module.exports = {
    getByText,
    getAll,
    getById,
    create
};