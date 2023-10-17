using System.Text;
using System.Threading;
// Licensed to the .NET Foundation under one or more agreements.

using Microsoft.AspNetCore.Mvc;
using FileSwap.Services;
using FileSwap.ViewModels;


namespace FileSwap.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GitHubController : ControllerBase
{
    private readonly GitHubService _gitHubService;
    private readonly IConfiguration _configuration;

    public GitHubController(GitHubService gitHubService, IConfiguration configuration)
    {
        _gitHubService = gitHubService;
        _configuration = configuration;
    }

    [HttpGet("Test")]
    public async Task<ActionResult> Test()
    {
        var user = await _gitHubService.TestService();
        var encryptString = CommonTool.AecEncrypt(_configuration.GetValue<string>("github:aesKey")!, Encoding.UTF8.GetBytes("hello"));
        Console.WriteLine(encryptString);
        var decryptString = CommonTool.AecDecrypt(_configuration.GetValue<string>("github:aesKey")!, encryptString);
        Console.WriteLine(decryptString);
        
        return Ok(Encoding.UTF8.GetString(decryptString));
    }
    [HttpGet]
    public async Task<List<ContentViewModel>> GetFileList()
    {
        var contentViewModelList = (await _gitHubService.GetContentViewModelList(_configuration.GetValue<string>("github:rootPath")!));
        return contentViewModelList;
    }
    [HttpPost]
    [RequestSizeLimit(int.MaxValue)]
    public async Task<ActionResult<List<ContentViewModel>>> AddFile(IFormFile[] files)
    {

        if (files.Length <= 0)
            return BadRequest("File is empty.");
        var result = new List<ContentViewModel>();
        foreach (var file in files)
        {
            var fileName = file.FileName;
            var memoryStream = new MemoryStream();
            file.CopyTo(memoryStream);
            var newContentViewModel = await _gitHubService.UploadFile(fileName, memoryStream);

            result.Add(newContentViewModel);
        }
        return result;
    }
    [HttpGet("{filePath}")]
    public async Task<FileResult> GetFile(string filePath)
    {
        var memoryStream = await _gitHubService.DownloadFile(filePath);
        return File(memoryStream, CommonTool.GetContentType(filePath), Path.GetFileName(filePath));
    }
    [HttpDelete]
    public async Task DeleteFile(ContentViewModel contentViewModel)
    {
        await _gitHubService.DeleteFile(contentViewModel);
    }
    #region private

    #endregion
}

