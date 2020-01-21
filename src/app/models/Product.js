import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        valor: Sequelize.DOUBLE,
        tempo: Sequelize.INTEGER,
        data_inicio: Sequelize.DATE
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: "fk_id_file", as: "imagem" });
  }
}

export default Product;
