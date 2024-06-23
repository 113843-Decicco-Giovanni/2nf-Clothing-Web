using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _2nf_API.Migrations
{
    /// <inheritdoc />
    public partial class SizeAddToSaleDetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SizeId",
                table: "SaleDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SaleDetails_SizeId",
                table: "SaleDetails",
                column: "SizeId");

            migrationBuilder.AddForeignKey(
                name: "FK_SaleDetails_Sizes_SizeId",
                table: "SaleDetails",
                column: "SizeId",
                principalTable: "Sizes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SaleDetails_Sizes_SizeId",
                table: "SaleDetails");

            migrationBuilder.DropIndex(
                name: "IX_SaleDetails_SizeId",
                table: "SaleDetails");

            migrationBuilder.DropColumn(
                name: "SizeId",
                table: "SaleDetails");
        }
    }
}
