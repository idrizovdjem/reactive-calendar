async function seedLabels(Label) {
    // initial labels
    const labels = [
        {
            backgroundColor: 'red',
            color: 'white',
            text: 'Very Important',
        },
        {
            backgroundColor: 'blueviolet',
            color: 'white',
            text: 'Important',
        },
        {
            backgroundColor: 'blue',
            color: 'white',
            text: 'Work',
        },
        {
            backgroundColor: 'yellow',
            color: 'black',
            text: 'Tasks',
        },
        {
            backgroundColor: 'green',
            color: 'white',
            text: 'Hobby',
        }
    ];

    for(const label of labels) {
        const { backgroundColor, color, text } = label;
        // check if the current label is already created
        const isCreatedResponse = await Label.findOne({
            attributes: ['id'],
            where: {
                text: text
            }
        });

        if(isCreatedResponse === null) {
            // if the label is not created, create new label object
            await Label.create({ backgroundColor, color, text });
        }
    }
}

module.exports = {
    seedLabels
};