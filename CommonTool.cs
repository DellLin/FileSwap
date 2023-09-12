// Licensed to the .NET Foundation under one or more agreements.

using Microsoft.AspNetCore.StaticFiles;

namespace FileSwap;

public static class CommonTool
{
    private static FileExtensionContentTypeProvider _fileExtensionContentTypeProvider = new FileExtensionContentTypeProvider();
    public static string ConvertToBase64(this Stream stream)
    {
        if (stream is MemoryStream memoryStream)
        {
            return Convert.ToBase64String(memoryStream.ToArray());
        }

        var bytes = new Byte[(int)stream.Length];

        stream.Seek(0, SeekOrigin.Begin);
        stream.Read(bytes, 0, (int)stream.Length);

        return Convert.ToBase64String(bytes);
    }
    public static string GetContentType(string fileName)
    {
        const string DefaultContentType = "application/octet-stream";
        if (!_fileExtensionContentTypeProvider.TryGetContentType(
            fileName, out var contentType))
        {
            contentType = DefaultContentType;
        }
        return contentType;
    }
}

