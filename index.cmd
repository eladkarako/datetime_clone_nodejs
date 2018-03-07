@echo off
chcp 65001 2>nul >nul
set "EXIT_CODE=0"

set "SOURCE=%~f1"
set "TARGET=%~f2"

echo times from: %SOURCE%
echo set to:     %TARGET%
echo [Y] - correct.
echo [N] - switch.
echo [Q] - quit (default).
set /p "USER=? [Q] -"

if /i ["%USER%"] EQU [""]  ( set "USER=Q" )
if /i ["%USER%"] EQU ["Y"] ( goto RUN     )
if /i ["%USER%"] EQU ["N"] ( goto SWITCH  )

goto END

:SWITCH
  set "SOURCE=%~f2"
  set "TARGET=%~f1"
  echo.
  echo ------------------------switching...
  echo times from: %SOURCE%
  echo set to:     %TARGET%
  goto RUN

:RUN
  echo.
  echo [NODEJS - START]
  echo -----------------------------------------------------
  set COMMAND="%~sdp0node.exe" "%~sdp0index.js" "%SOURCE%" "%TARGET%"
  echo %COMMAND%
  call %COMMAND%
  set "EXIT_CODE=%ErrorLevel%"
  echo -----------------------------------------------------
  echo [NODEJS - END]
  goto END

:END  
  echo.
  pause
  exit /b %EXIT_CODE%
