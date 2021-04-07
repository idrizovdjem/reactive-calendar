function setup(sequelize, DataTypes) {
    return sequelize.define('DateMood', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        date: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mood: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}

module.exports = setup;