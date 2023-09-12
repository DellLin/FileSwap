// Licensed to the .NET Foundation under one or more agreements.

using AutoMapper;
using Octokit;
using FileSwap.ViewModels;

namespace FileSwap.Services;

public class AutoMapperService
{
    public IMapper Mapper { get; set; }
    public AutoMapperService()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<RepositoryContent, ContentViewModel>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Sha, opt => opt.MapFrom(src => src.Sha))
            .ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.Path))
            .ForMember(dest => dest.ContentType, opt => opt.MapFrom(src => src.Type))
            .ForMember(dest => dest.Child, opt => opt.Ignore())
            ;
            cfg.CreateMap<RepositoryContentInfo, ContentViewModel>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Sha, opt => opt.MapFrom(src => src.Sha))
            .ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.Path))
            .ForMember(dest => dest.ContentType, opt => opt.MapFrom(src => src.Type))
            .ForMember(dest => dest.Child, opt => opt.Ignore())
            ;
        });
        // only during development, validate your mappings; remove it before release
#if DEBUG
        configuration.AssertConfigurationIsValid();
#endif
        Mapper = configuration.CreateMapper();

    }
}
