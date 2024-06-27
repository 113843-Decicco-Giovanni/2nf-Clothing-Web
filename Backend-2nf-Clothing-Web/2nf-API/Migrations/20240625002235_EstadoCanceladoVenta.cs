using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _2nf_API.Migrations
{
    /// <inheritdoc />
    public partial class EstadoCanceladoVenta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Canceled",
                table: "Sales",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Canceled",
                table: "Sales");
        }
    }
}
