# Compile svelte bundle

& "npm" run build

# Download Resource Hacker if not already installed

Push-Location $PSScriptRoot+"/../"

$file = "./pack/build/resource_hacker/ResourceHacker.exe";
$location = "./pack/build/resource_hacker";

if (-not(Test-Path -Path $file -PathType Leaf)) {
    New-Item -ItemType Directory -Force -Path $location
    echo "Resource Hacker not found, downloading..."
    $url = "http://www.angusj.com/resourcehacker/resource_hacker.zip"
    Invoke-WebRequest $url -OutFile "pack/build/resource_hacker.zip"
    Expand-Archive -Path "pack/build/resource_hacker.zip" -DestinationPath $location
    # Delete the unzipped zip
    Remove-Item -Path "pack/build/resource_hacker.zip"
}

# Download scapp.exe if not exists

$sciterurl = "https://github.com/c-smile/sciter-js-sdk/raw/main/bin/windows/x64/scapp.exe"
$sciterpath = "./pack/build/sciter/scapp.exe"
if (-not(Test-Path -Path $sciterpath -PathType Leaf)) {
    echo "Downloading Sciter scapp.exe"
    New-Item -ItemType Directory -Force -Path "./pack/build/sciter"
    Invoke-WebRequest $sciterurl -OutFile $sciterpath
    # Delete the unzipped zip
}

# Install 7Zip module to unpack/build 7zip CLI.....

$7zlib = "./pack/build/7Zip4Powershell/2.1.0/7Zip4Powershell.psd1"

if (-not(Test-Path -Path $7zlib -PathType Leaf)) {
    echo "Downloading 7zip module"
    New-Item -ItemType Directory -Force -Path "./pack/build"
    Save-Module -Name 7Zip4Powershell -RequiredVersion "2.1.0" -Path "./pack/build"
}


# Download 7z CLI standalone

Import-Module $7zlib
$7zcli = "pack/build/7zcli/7za.exe"
if (-not(Test-Path -Path $7zcli -PathType Leaf)) {
    echo "Downloading 7zip CLI"
    $url = "https://www.7-zip.org/a/7z2107-extra.7z"
    Invoke-WebRequest $url -OutFile "pack/build/7zcli.7z"
    Expand-7Zip -ArchiveFileName "pack/build/7zcli.7z" -TargetPath "pack/build/7zcli"
    # Delete the unzipped file
    Remove-Item -Path "pack/build/7zcli.7z"
}

# Download 7zip LZMA SDK if not exists

$sdkpath = "pack/build/7zsdk/bin/7zSD.sfx"
if (-not(Test-Path -Path $sdkpath -PathType Leaf)) {
    echo "Downloading 7zip SDK"
    $url = "https://www.7-zip.org/a/lzma2107.7z"
    Invoke-WebRequest $url -OutFile "pack/build/7zsdk.7z"
    Expand-7Zip -ArchiveFileName "pack/build/7zsdk.7z" -TargetPath "pack/build/7zsdk"
    # Delete the unzipped file
    Remove-Item -Path "pack/build/7zsdk.7z"
}
Remove-Module $7zlib

& "pack/build/7zcli/7za.exe" a "pack/build/data.7z" "pack/build/sciter/scapp.exe" "page"

Get-Content $sdkpath,"pack/7zSD_config.txt","pack/build/data.7z" -Encoding Byte -Read 512 | Set-Content "pack/build/output.exe" -Encoding Byte

$process = Start-Process "pack/build/resource_hacker/ResourceHacker.exe" -ArgumentList "-open","pack/versioninfo.rc","-action","compile","-save","pack/build/versioninfo.res" -Passthru

$process = Start-Process "pack/build/resource_hacker/ResourceHacker.exe" -ArgumentList "-script","pack/resourcehacker_script.txt" -Passthru
Wait-Process $process.Id

Move-Item "pack/build/output.exe" "pack/output.exe" -Force

Pop-Location