using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _2nf_API.Migrations
{
    /// <inheritdoc />
    public partial class ModificacionRelacionVentaEnvio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sales_Shipments_ShipmentId",
                table: "Sales");

            migrationBuilder.DropIndex(
                name: "IX_Sales_ShipmentId",
                table: "Sales");

            migrationBuilder.DropColumn(
                name: "ShipmentId",
                table: "Sales");

            migrationBuilder.AddColumn<int>(
                name: "SaleId",
                table: "Shipments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Shipments_SaleId",
                table: "Shipments",
                column: "SaleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shipments_Sales_SaleId",
                table: "Shipments",
                column: "SaleId",
                principalTable: "Sales",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shipments_Sales_SaleId",
                table: "Shipments");

            migrationBuilder.DropIndex(
                name: "IX_Shipments_SaleId",
                table: "Shipments");

            migrationBuilder.DropColumn(
                name: "SaleId",
                table: "Shipments");

            migrationBuilder.AddColumn<int>(
                name: "ShipmentId",
                table: "Sales",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Sales_ShipmentId",
                table: "Sales",
                column: "ShipmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sales_Shipments_ShipmentId",
                table: "Sales",
                column: "ShipmentId",
                principalTable: "Shipments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
