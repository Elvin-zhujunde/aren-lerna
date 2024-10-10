@echo off
echo 正在初始化 Git 提交...
echo.

echo 检查是否有未提交的更改...
git status

echo 暂存更改...
git add .

echo 提交更改...
set /p commitMessage="请输入提交信息: "
git commit -m "%commitMessage%"

git push
echo 提交完成。
echo.
echo 按任意键退出...
pause