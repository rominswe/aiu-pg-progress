import _sequelize from 'sequelize';
const { Model } = _sequelize;

export default class Submission extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      studentName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      documentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      submittedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
    }, {
      sequelize,
      modelName: "submission",
      tableName: "submissions",
      timestamps: true,
      underscored: true,
    });
  }
}


