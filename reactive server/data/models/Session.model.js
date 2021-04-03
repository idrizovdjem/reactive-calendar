function setup(sequelize, DataTypes) {
    return sequelize.define('Session', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}

module.exports = setup;