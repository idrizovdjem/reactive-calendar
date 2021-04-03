function setup(sequelize, DataTypes) {
    return sequelize.define('Todo', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: null
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        labelId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
}

module.exports = setup;