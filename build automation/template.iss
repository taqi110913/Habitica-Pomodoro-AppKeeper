; Inno Setup Script Template
[Setup]
AppName=Habitica Pomodoro AppKeeper
AppPublisher=taqi110913
AppCopyright=© 2026 taqi110913
AppVersion=0.1.0-pre-alpha
DefaultDirName={commonpf}\HabiticaPomodoroAppKeeper
DefaultGroupName=Habitica Pomodoro AppKeeper
OutputBaseFilename=HabiticaPomodoroAppKeeper-Windows64_Installer
OutputDir=../Output
Compression=lzma
SolidCompression=yes
DisableDirPage=no
SetupIconFile=..\resources\icons\favicon.ico

[Files]
Source: "..\dist\HabiticaPomodoroAppKeeper\HabiticaPomodoroAppKeeper-win_x64.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\dist\HabiticaPomodoroAppKeeper\resources.neu"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\resources\icons\favicon.ico"; DestDir: "{app}"; Flags: ignoreversion

; note: this is my own addition to allow NeutralinoJS to run correctly
[Dirs]
Name: "{app}"; Permissions: users-modify

[Icons]
Name: "{group}\Habitica Pomodoro AppKeeper"; Filename: "{app}\HabiticaPomodoroAppKeeper-win_x64.exe"; IconFilename: "{app}\favicon.ico"
Name: "{commondesktop}\Habitica Pomodoro AppKeeper"; Filename: "{app}\HabiticaPomodoroAppKeeper-win_x64.exe"; IconFilename: "{app}\favicon.ico"; Tasks: desktopicon

[Tasks]
Name: "desktopicon"; Description: "Create a &desktop shortcut"; GroupDescription: "Additional icons:" 
