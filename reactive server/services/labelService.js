const utilityService = require('./utilityService.js');
const { Label } = require('../data/context.js');

async function getByText(text) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    if(!text) {
        utilityService.addErrorMessage(response, 'Label is required!');
    } else {
        text = text.trim();
        if(text.length < 1) {
            utilityService.addErrorMessage(response, 'Label is required!');
        }
    }

    if(!response.successfull) {
        return response;
    }

    const labelResponse = await Label.findOne({
        attributes: ['id'],
        where: {
            text: text
        }
    });

    if(labelResponse === null) {
        utilityService.addErrorMessage(response, 'Invalid label text!');
    } else {
        const labelId = labelResponse.dataValues.id;
        response.data.labelId = labelId;
    }

    return response;
}

async function create(backgroundColor, color, text) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    if(!backgroundColor) {
        utilityService.addErrorMessage(response, 'Label backgroundColor is required!');
    } else {
        backgroundColor = backgroundColor.trim();
        if(backgroundColor.length < 1) {
            utilityService.addErrorMessage(response, 'Label backgroundColor is required!');
        }
    }

    if(!color) {
        utilityService.addErrorMessage(response, 'Label color is required!');
    } else {
        color = color.trim();
        if(color.length < 1) {
            utilityService.addErrorMessage(response, 'Label color is required!');
        }
    }

    if(!text) {
        utilityService.addErrorMessage(response, 'Label text is required!');
    } else {
        text = text.trim();
        if(text.length < 1) {
            utilityService.addErrorMessage(response, 'Label texts is required!');
        }
    }

    const isAlreadyCreatedResponse = await getByText(text);
    if(!isAlreadyCreatedResponse.successfull) {
        // if it's not already created
        const newLabel = await Label.create({ backgroundColor, color, text });
        response.data.label = newLabel;
    } else {
        utilityService.addErrorMessage(response, 'Label with this text is already created!');
    }

    return response;
}

async function getById(id) {
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    if(!id) {
        utilityService.addErrorMessage(response, 'Invalid id!');
    } else {
        const label = await Label.findOne({
            attributes: ['backgroundColor', 'color'],
            where: {
                id: id
            }
        });

        if(label === null) {
            utilityService.addErrorMessage(response, 'Missing label!');
        } else {
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
    const response = {
        successfull: true,
        errorMessages: [],
        data: {}
    };

    const labels = await Label.findAll();
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