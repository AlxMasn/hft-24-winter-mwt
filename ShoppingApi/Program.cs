using Microsoft.EntityFrameworkCore;
using ShoppingApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add PostgreSQL Database context
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ShoppingContext>(options =>
    options.UseNpgsql(connectionString)
    .LogTo(Console.WriteLine, LogLevel.Information));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.AllowAnyOrigin() // Replace with your frontend URL
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    // Enable HTTPS redirection
    app.UseHttpsRedirection(); // Uncomment to enforce HTTPS
}

app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();


using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ShoppingContext>();
    dbContext.Database.EnsureCreated();
}
app.Run();
