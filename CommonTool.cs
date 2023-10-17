// Licensed to the .NET Foundation under one or more agreements.

using System.Security.Cryptography;
using System.Text;
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

    public static byte[] AecEncrypt(string key, byte[] content)
    {
        Aes aes = Aes.Create();
        byte[] iv = aes.IV;
        ICryptoTransform transform = aes.CreateEncryptor(Encoding.UTF8.GetBytes(key), iv);
        byte[] bPlainText = content;
        byte[] outputData = transform.TransformFinalBlock(bPlainText, 0, bPlainText.Length);
        var result = new byte[outputData.Length + iv.Length];
        outputData.CopyTo(result, 0);
        iv.CopyTo(result, outputData.Length);
        return result;
    }
    public static byte[] AecDecrypt(string key, byte[] content)
    {
        Aes aes = Aes.Create();
        byte[] iv = content.Skip(content.Length - aes.IV.Length).ToArray();
        content = content.Take(content.Length - aes.IV.Length).ToArray();
        ICryptoTransform transform = aes.CreateDecryptor(Encoding.UTF8.GetBytes(key), iv);
        byte[] bEnBase64String = content;//有可能base64String格式錯誤
        byte[] outputData = transform.TransformFinalBlock(bEnBase64String, 0, bEnBase64String.Length);//有可能解密出錯
        return outputData;
    }
}

