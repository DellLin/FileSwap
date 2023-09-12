﻿// Licensed to the .NET Foundation under one or more agreements.

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
        return Ok(user);
    }
    [HttpGet]
    public async Task<List<ContentViewModel>> GetFileList()
    {
        var contentViewModelList = (await _gitHubService.GetContentViewModelList(_configuration.GetValue<string>("github:rootPath")!));
        return contentViewModelList;
    }
    [HttpPost]
    [RequestSizeLimit(int.MaxValue)]
    public async Task<ActionResult<ContentViewModel>> AddFile(IFormFile file)
    {
        if (file == null)
            return BadRequest("File is empty.");

        var fileName = file.FileName;
        var memoryStream = new MemoryStream();
        file.CopyTo(memoryStream);
        var newContentViewModel = await _gitHubService.UploadFile(fileName, memoryStream);
        return newContentViewModel;
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

