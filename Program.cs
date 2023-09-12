using FileSwap.Services;
using Microsoft.AspNetCore.StaticFiles;
using Octokit;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var client = new GitHubClient(new ProductHeaderValue(builder.Configuration.GetValue<string>("github:repoName")));
var tokenAuth = new Credentials(builder.Configuration.GetValue<string>("github:token")); // NOTE: not real token
client.Credentials = tokenAuth;

builder.Services.AddSingleton(client);
builder.Services.AddSingleton<GitHubService>();
builder.Services.AddSingleton<FileExtensionContentTypeProvider>();
builder.Services.AddSingleton<AutoMapperService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseExceptionHandler("/error-development");
}
else
{
    app.UseExceptionHandler("/error");
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
