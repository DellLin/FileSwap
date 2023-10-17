FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5250

ENV ASPNETCORE_URLS=http://+:5250

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["FileSwap.csproj", "./"]
RUN dotnet restore "FileSwap.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "FileSwap.csproj" -c $configuration -o /app/build

FROM node:16-alpine as frontend
WORKDIR /src
COPY ./ClientApp .
RUN npm install
RUN npm run build -- --configuration production

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "FileSwap.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=frontend /src/dist ./wwwroot
ENTRYPOINT ["dotnet", "FileSwap.dll"]
