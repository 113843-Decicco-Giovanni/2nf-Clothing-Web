using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _2nf_API.Migrations
{
    /// <inheritdoc />
    public partial class TrackingIdShipmentAndService : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "TrackingId",
                table: "Shipments",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<string>(
                name: "Service",
                table: "Shipments",
                type: "longtext",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Service",
                table: "Shipments");

            migrationBuilder.AlterColumn<long>(
                name: "TrackingId",
                table: "Shipments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);
        }
    }
}
