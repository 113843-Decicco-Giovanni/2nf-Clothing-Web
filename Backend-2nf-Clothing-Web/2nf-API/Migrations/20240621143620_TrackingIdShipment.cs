using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _2nf_API.Migrations
{
    /// <inheritdoc />
    public partial class TrackingIdShipment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "TrackingId",
                table: "Shipments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrackingId",
                table: "Shipments");
        }
    }
}
