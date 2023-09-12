// Licensed to the .NET Foundation under one or more agreements.

using Microsoft.AspNetCore.StaticFiles;
using Octokit;
using FileSwap.ViewModels;

namespace FileSwap.Services;

public class GitHubService
{
    private readonly GitHubClient _gitHubClient;
    private readonly FileExtensionContentTypeProvider _fileExtensionContentTypeProvider;
    private readonly AutoMapperService _autoMapperService;
    private readonly string OWNER;
    private readonly string REPO_NAME;
    private readonly string ROOT_FILE;

    public GitHubService(GitHubClient gitHubClient,
        FileExtensionContentTypeProvider fileExtensionContentTypeProvider,
        AutoMapperService autoMapperService,
        IConfiguration configuration)
    {
        _gitHubClient = gitHubClient;
        _fileExtensionContentTypeProvider = fileExtensionContentTypeProvider;
        _autoMapperService = autoMapperService;
        OWNER = configuration.GetValue<string>("github:owner")!;
        REPO_NAME = configuration.GetValue<string>("github:repoName")!;
        ROOT_FILE = configuration.GetValue<string>("github:rootPath")!;
    }

    public async Task<User> TestService()
    {
        var user = await _gitHubClient.User.Get(OWNER);
        var repocontent = await _gitHubClient.Repository.GetAllForUser(OWNER);
        foreach (var repo in repocontent)
        {
            await Console.Out.WriteLineAsync(repo.Name);
        }
        return user;
    }
    public async Task<List<ContentViewModel>> GetContentViewModelList(string path)
    {
        var contentList = (await _gitHubClient.Repository.Content.GetAllContentsByRef(OWNER, REPO_NAME, path, "main")).ToList();
        var contentViewModelList = _autoMapperService.Mapper.Map<List<RepositoryContent>, List<ContentViewModel>>(contentList);
        foreach (var contentViewMode in contentViewModelList)
        {
            if (contentViewMode.ContentType == ContentType.Dir)
            {
                contentViewMode.Child = await GetContentViewModelList(contentViewMode.Path!);
            }
        }
        return contentViewModelList;
    }
    public async Task<ContentViewModel> UploadFile(string fileName, MemoryStream fileStream)
    {
        var fileExist = true;
        var file = new RepositoryContent();
        try
        {
            file = (await _gitHubClient.Repository.Content.GetAllContents(OWNER, REPO_NAME, Path.Combine(ROOT_FILE, fileName + ".txt")))?.First()!;
        }
        catch (NotFoundException)
        {
            fileExist = false;
        }
        RepositoryContentInfo result;
        var fileContent = CommonTool.ConvertToBase64(fileStream);
        if (fileExist)
        {
            var existingFileSha = file.Sha;
            var updateFileRequest = new UpdateFileRequest($"Update {fileName}", fileContent, existingFileSha);
            result = (await _gitHubClient.Repository.Content.UpdateFile(OWNER, REPO_NAME, Path.Combine(ROOT_FILE, fileName + ".txt"), updateFileRequest)).Content;
        }
        else
        {
            var createFileRequest = new CreateFileRequest($"Add {fileName}", fileContent);
            result = (await _gitHubClient.Repository.Content.CreateFile(OWNER, REPO_NAME, Path.Combine(ROOT_FILE, fileName + ".txt"), createFileRequest)).Content;
        }
        return _autoMapperService.Mapper.Map<RepositoryContentInfo, ContentViewModel>(result);
    }
    public async Task<byte[]> DownloadFile(string fileName)
    {
        var repositoryContents = await _gitHubClient.Repository.Content.GetRawContent(OWNER, REPO_NAME, Path.Combine(ROOT_FILE, fileName + ".txt"));
        var fileContents = System.Text.Encoding.Default.GetString(repositoryContents);
        var binaryData = Convert.FromBase64String(fileContents);
        return binaryData;
    }
    public async Task DeleteFile(ContentViewModel contentViewModel)
    {
        var deleteChangeSet = new DeleteFileRequest($"Delete {contentViewModel.Name}", contentViewModel.Sha);
        await _gitHubClient.Repository.Content.DeleteFile(OWNER, REPO_NAME, contentViewModel.Path, deleteChangeSet);
    }
}

