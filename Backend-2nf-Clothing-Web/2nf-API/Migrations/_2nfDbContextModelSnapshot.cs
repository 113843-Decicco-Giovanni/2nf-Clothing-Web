﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using _2nf_API.Data;

#nullable disable

namespace _2nf_API.Migrations
{
    [DbContext(typeof(_2nfDbContext))]
    partial class _2nfDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("_2nf_API.Entities.Article", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("DiscontinuedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("Price")
                        .HasColumnType("double");

                    b.Property<int>("TypeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TypeId");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("_2nf_API.Entities.ArticleType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("ArticleTypes");
                });

            modelBuilder.Entity("_2nf_API.Entities.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("DocId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SecondName")
                        .HasColumnType("longtext");

                    b.Property<string>("SecondSurname")
                        .HasColumnType("longtext");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("StreetNumber")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("_2nf_API.Entities.Devolution", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ClientDoc")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Detail")
                        .HasColumnType("longtext");

                    b.Property<string>("Reason")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("ShipmentId")
                        .HasColumnType("int");

                    b.Property<int>("State")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("ShipmentId");

                    b.ToTable("Devolutions");
                });

            modelBuilder.Entity("_2nf_API.Entities.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ArticleId")
                        .HasColumnType("int");

                    b.Property<string>("URL")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("_2nf_API.Entities.Refund", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ClientDoc")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Reason")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long>("RefundId")
                        .HasColumnType("bigint");

                    b.Property<int>("SaleId")
                        .HasColumnType("int");

                    b.Property<int>("State")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("SaleId");

                    b.ToTable("Refunds");
                });

            modelBuilder.Entity("_2nf_API.Entities.Sale", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Canceled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ClientDoc")
                        .HasColumnType("int");

                    b.Property<int?>("ClientId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<long>("PaymentId")
                        .HasColumnType("bigint");

                    b.Property<bool>("RefundPending")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.ToTable("Sales");
                });

            modelBuilder.Entity("_2nf_API.Entities.SaleDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<int>("ArticleId")
                        .HasColumnType("int");

                    b.Property<int?>("SaleId")
                        .HasColumnType("int");

                    b.Property<int>("SizeId")
                        .HasColumnType("int");

                    b.Property<double>("UnitPrice")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.HasIndex("SaleId");

                    b.HasIndex("SizeId");

                    b.ToTable("SaleDetails");
                });

            modelBuilder.Entity("_2nf_API.Entities.Shipment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Appartament")
                        .HasColumnType("longtext");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("ClientDoc")
                        .HasColumnType("int");

                    b.Property<string>("Details")
                        .HasColumnType("longtext");

                    b.Property<string>("Floor")
                        .HasColumnType("longtext");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("ProcessDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("SaleId")
                        .HasColumnType("int");

                    b.Property<string>("Service")
                        .HasColumnType("longtext");

                    b.Property<int>("ShipmentState")
                        .HasColumnType("int");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("StreetNumber")
                        .HasColumnType("int");

                    b.Property<long?>("TrackingId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("SaleId");

                    b.ToTable("Shipments");
                });

            modelBuilder.Entity("_2nf_API.Entities.Size", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Sizes");
                });

            modelBuilder.Entity("_2nf_API.Entities.Stock", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<int>("ArticleId")
                        .HasColumnType("int");

                    b.Property<int>("LastAmountAdded")
                        .HasColumnType("int");

                    b.Property<int>("SizeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.HasIndex("SizeId");

                    b.ToTable("Stocks");
                });

            modelBuilder.Entity("_2nf_API.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Active")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Client")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsUserAdmin")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("LastLogin")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("LastSessionId")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("_2nf_API.Entities.Article", b =>
                {
                    b.HasOne("_2nf_API.Entities.ArticleType", "Type")
                        .WithMany()
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Type");
                });

            modelBuilder.Entity("_2nf_API.Entities.Client", b =>
                {
                    b.HasOne("_2nf_API.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("_2nf_API.Entities.Devolution", b =>
                {
                    b.HasOne("_2nf_API.Entities.Shipment", "Shipment")
                        .WithMany()
                        .HasForeignKey("ShipmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Shipment");
                });

            modelBuilder.Entity("_2nf_API.Entities.Image", b =>
                {
                    b.HasOne("_2nf_API.Entities.Article", "Article")
                        .WithMany("Images")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Article");
                });

            modelBuilder.Entity("_2nf_API.Entities.Refund", b =>
                {
                    b.HasOne("_2nf_API.Entities.Sale", "Sale")
                        .WithMany()
                        .HasForeignKey("SaleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Sale");
                });

            modelBuilder.Entity("_2nf_API.Entities.Sale", b =>
                {
                    b.HasOne("_2nf_API.Entities.Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId");

                    b.Navigation("Client");
                });

            modelBuilder.Entity("_2nf_API.Entities.SaleDetail", b =>
                {
                    b.HasOne("_2nf_API.Entities.Article", "Article")
                        .WithMany()
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("_2nf_API.Entities.Sale", null)
                        .WithMany("Details")
                        .HasForeignKey("SaleId");

                    b.HasOne("_2nf_API.Entities.Size", "Size")
                        .WithMany()
                        .HasForeignKey("SizeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Article");

                    b.Navigation("Size");
                });

            modelBuilder.Entity("_2nf_API.Entities.Shipment", b =>
                {
                    b.HasOne("_2nf_API.Entities.Sale", "Sale")
                        .WithMany()
                        .HasForeignKey("SaleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Sale");
                });

            modelBuilder.Entity("_2nf_API.Entities.Stock", b =>
                {
                    b.HasOne("_2nf_API.Entities.Article", "Article")
                        .WithMany("Stocks")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("_2nf_API.Entities.Size", "Size")
                        .WithMany()
                        .HasForeignKey("SizeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Article");

                    b.Navigation("Size");
                });

            modelBuilder.Entity("_2nf_API.Entities.Article", b =>
                {
                    b.Navigation("Images");

                    b.Navigation("Stocks");
                });

            modelBuilder.Entity("_2nf_API.Entities.Sale", b =>
                {
                    b.Navigation("Details");
                });
#pragma warning restore 612, 618
        }
    }
}
