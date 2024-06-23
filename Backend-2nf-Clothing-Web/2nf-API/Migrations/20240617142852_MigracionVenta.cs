using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace _2nf_API.Migrations
{
    /// <inheritdoc />
    public partial class MigracionVenta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Shipments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Floor = table.Column<string>(type: "longtext", nullable: false),
                    Appartament = table.Column<string>(type: "longtext", nullable: false),
                    Street = table.Column<string>(type: "longtext", nullable: false),
                    StreetNumber = table.Column<int>(type: "int", nullable: false),
                    City = table.Column<string>(type: "longtext", nullable: false),
                    State = table.Column<string>(type: "longtext", nullable: false),
                    PostalCode = table.Column<string>(type: "longtext", nullable: false),
                    ShipmentState = table.Column<int>(type: "int", nullable: false),
                    Details = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shipments", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Sales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Date = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ClientDoc = table.Column<int>(type: "int", nullable: false),
                    ClientId = table.Column<int>(type: "int", nullable: true),
                    ShipmentId = table.Column<int>(type: "int", nullable: false),
                    PaymentId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sales_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Sales_Shipments_ShipmentId",
                        column: x => x.ShipmentId,
                        principalTable: "Shipments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SaleDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    ArticleId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<double>(type: "double", nullable: false),
                    SaleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SaleDetails_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SaleDetails_Sales_SaleId",
                        column: x => x.SaleId,
                        principalTable: "Sales",
                        principalColumn: "Id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_SaleDetails_ArticleId",
                table: "SaleDetails",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_SaleDetails_SaleId",
                table: "SaleDetails",
                column: "SaleId");

            migrationBuilder.CreateIndex(
                name: "IX_Sales_ClientId",
                table: "Sales",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Sales_ShipmentId",
                table: "Sales",
                column: "ShipmentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SaleDetails");

            migrationBuilder.DropTable(
                name: "Sales");

            migrationBuilder.DropTable(
                name: "Shipments");
        }
    }
}
