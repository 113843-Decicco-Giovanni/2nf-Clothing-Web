using _2nf_API.Data;
using _2nf_API.Repositories;
using _2nf_API.Repositories.Imp;
using _2nf_API.Requests;
using _2nf_API.Services;
using _2nf_API.Services.Imp;
using _2nf_API.Utils;
using _2nf_API.Validators;
using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("MySql");
builder.Services.AddDbContext<_2nfDbContext>(options =>
{
    options.UseMySQL(connectionString);
});
//services
builder.Services.AddTransient<IArticleService, ArticleService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IClientService, ClientService>();
builder.Services.AddTransient<ISaleService, SaleService>();
builder.Services.AddTransient<IShipmentService, ShipmentService>();
builder.Services.AddTransient<IReportsService, ReportsService>();
//repositories
builder.Services.AddScoped<IArticleRepository, ArticleRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<ISaleRepository, SaleRepository>();
builder.Services.AddScoped<IShipmentRepository, ShipmentRepository>();
builder.Services.AddScoped<IReportsRepository, ReportsRepository>();
//validators
builder.Services.AddTransient<IValidator<ArticleRequest>, ArticleRequestValidator>();
builder.Services.AddTransient<IValidator<UserRequest>, UserRequestValidator>();
builder.Services.AddTransient<IValidator<UserLoginRequest>, UserLoginRequestValidator>();
builder.Services.AddTransient<IValidator<StockRequest>,  StockRequestValidator>();
builder.Services.AddTransient<IValidator<ClientRequest>, ClientRequestValidator>();
builder.Services.AddTransient<IValidator<ClientLoginRequest>, ClientLoginRequestValidator>();
//mapper
var mapperConfiguration = new MapperConfiguration(cfg =>
{
    cfg.AddProfile<MappingProfile>();
});
var mapper = mapperConfiguration.CreateMapper();
builder.Services.AddSingleton(mapper);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
