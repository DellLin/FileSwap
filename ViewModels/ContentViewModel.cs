// Licensed to the .NET Foundation under one or more agreements.

using Octokit;

namespace FileSwap.ViewModels;

public class ContentViewModel
{
    public string? Name { get; set; }
    public StringEnum<ContentType> ContentType { get; set; }
    public String? Sha { get; set; }
    public string? Path { get; set; }
    public List<ContentViewModel>? Child { get; set; }

}
