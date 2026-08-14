# GitHub Actions Build Automation Setup Guide

This guide provides complete instructions for setting up automated cross-platform builds using GitHub Actions for your Neutralino.js application.

## 🚀 Quick Start

1. **Push your code to GitHub**
2. **Enable GitHub Actions** (usually enabled by default)
3. **Create a release** by pushing a tag:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```
4. **Watch the magic happen** - All platforms build automatically!

## 📁 Build System Architecture

### Workflow Files (`.github/workflows/`)
- **`release-all-platforms.yml`** - Main release workflow (builds all platforms)
- **`build-windows.yml`** - Individual Windows builds
- **`build-macos.yml`** - Individual macOS builds  
- **`build-linux.yml`** - Individual Linux builds

### Build Scripts (`build automation/`)
- **`build-mac.sh`** - macOS app bundle creation and DMG packaging
- **`build-linux.sh`** - Linux AppImage, DEB, and RPM packaging
- **`setup-macos-signing.sh`** - Apple Developer account setup (optional)
- **`preproc-*.sh`** / **`postproc-*.sh`** - Build customization scripts

## 🔧 Workflow Configuration

### Main Release Workflow
Triggered by:
- **Git tags**: `git tag v1.0.1 && git push origin v1.0.1`
- **Manual trigger**: GitHub Actions → Release All Platforms → Run workflow

### Individual Platform Workflows
Triggered by:
- **Code pushes** to `main` or `develop` branches
- **Pull requests** to `main`
- **Manual triggers**

## 🎯 Release Process

### Automatic Release (Recommended)
```bash
# 1. Update version in your app
# 2. Commit changes
git add .
git commit -m "Release v1.0.1"

# 3. Create and push tag
git tag v1.0.1
git push origin v1.0.1

# 4. GitHub Actions automatically:
#    - Builds Windows installer (.exe)
#    - Builds macOS DMG packages (Universal, Intel, Apple Silicon)
#    - Builds Linux packages (AppImage, DEB, RPM)
#    - Creates GitHub release with all installers
```

### Manual Release
1. Go to **GitHub Actions** tab
2. Select **Release All Platforms**
3. Click **Run workflow**
4. Enter version (e.g., `v1.0.1`)
5. Click **Run workflow**

## 📦 Build Outputs

### Windows
- **File**: `HabiticaPomodoroAppKeeper-Windows64_Installer.exe`
- **Type**: Inno Setup installer
- **Architecture**: x64
- **Features**: Start menu shortcuts, desktop icon, uninstaller

### macOS
- **Universal**: `Homestead Tools-1.0.1-universal.dmg` (Intel + Apple Silicon)
- **Intel**: `Homestead Tools-1.0.1-x64.dmg`
- **Apple Silicon**: `Homestead Tools-1.0.1-arm64.dmg`
- **Features**: Professional DMG with background, app bundle structure

### Linux
- **AppImage**: `Homestead Tools-1.0.1-x86_64.AppImage` (universal)
- **Debian/Ubuntu**: `homestead-tools-1.0.1-amd64.deb`
- **RedHat/Fedora**: `homestead-tools-1.0.1-x86_64.rpm`
- **Features**: Desktop integration, menu entries, icons

## 🔐 Signing & Security

### Current Setup (Unsigned)
- **Windows**: Users need to allow "unknown publisher" 
- **macOS**: Users need right-click → "Open" on first launch
- **Linux**: No signing needed

### Optional: Code Signing
For production releases, you can add code signing:

#### Windows Code Signing
```yaml
# Add to Windows workflow
- name: Sign Windows executable
  run: |
    # Add your code signing certificate and process
    signtool sign /f cert.p12 /p ${{ secrets.CERT_PASSWORD }} Output/*.exe
```

#### macOS Code Signing
```bash
# Run setup script (requires Apple Developer account)
./build\ automation/setup-macos-signing.sh
```

## 🛠️ Troubleshooting

### Common Issues

#### 1. Build Fails with "Path not found"
**Problem**: Build scripts moved to `build automation/` folder
**Solution**: Update workflow paths (already fixed in current setup)

#### 2. Artifacts Not Attached to Release
**Problem**: Artifact path issues in release workflow
**Solution**: Use the updated release workflow with organized file copying

#### 3. Windows Build Fails - Inno Setup Not Found
**Problem**: Chocolatey installation timing
**Solution**: 
```yaml
- name: Setup Inno Setup with retry
  run: |
    choco install innosetup -y
    Start-Sleep -Seconds 10
    if (-not (Test-Path "C:\Program Files (x86)\Inno Setup 6\ISCC.exe")) {
      choco install innosetup -y --force
    }
```

#### 4. macOS Build Fails - Missing Dependencies
**Problem**: Homebrew formula not found
**Solution**:
```yaml
- name: Install dependencies with fallback
  run: |
    brew install jq create-dmg || brew install --cask create-dmg
```

#### 5. Linux Build Fails - AppImage Tool Download
**Problem**: Network issues downloading AppImageTool
**Solution**: Use backup download sources in the script

#### 6. Release Workflow Too Many Retries
**Problem**: GitHub API rate limits or network issues
**Solution**: 
- Use `softprops/action-gh-release@v2` (updated)
- Add retry logic with exponential backoff
- Organize files before upload

#### 7. "Resource not accessible by integration" Error
**Problem**: GitHub Actions doesn't have permission to create releases
**Solution**: Add permissions to workflow files (already fixed):
```yaml
permissions:
  contents: write
```
**Additional Steps if Still Failing:**
1. Go to repository **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select **"Read and write permissions"**
3. Check **"Allow GitHub Actions to create and approve pull requests"**
4. Click **Save**

### Debug Workflows

#### View Build Logs
1. Go to **GitHub Actions** tab
2. Click on the failed workflow run
3. Click on the failed job
4. Expand the failed step to see detailed logs

#### Download Failed Artifacts
Even if release fails, individual build artifacts are available:
1. Go to failed workflow run
2. Scroll to **Artifacts** section
3. Download individual platform builds

#### Test Builds Locally
```bash
# Test macOS build (on macOS)
cd "build automation"
chmod +x build-mac.sh
./build-mac.sh --dmg

# Test Linux build (on Linux)
chmod +x build-linux.sh
./build-linux.sh --appimage --deb --rpm

# Test Windows build (on Windows)
# Use Inno Setup GUI to compile template.iss
```

## 🔄 Maintenance

### Update Dependencies
Workflows automatically use latest versions, but you can pin specific versions:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4  # Pin to specific version if needed
  with:
    node-version: '18'          # Update Node.js version as needed
```

### Update Build Scripts
Build scripts are in `build automation/` folder:
- Modify scripts as needed
- Test locally before committing
- Scripts automatically run in workflows

### Monitor Builds
- **GitHub Actions tab** shows all workflow runs
- **Releases tab** shows published releases
- **Email notifications** for failed builds (configurable in GitHub settings)

## 📋 Checklist for New Releases

- [ ] Update version numbers in app
- [ ] Test build locally (optional)
- [ ] Commit all changes
- [ ] Create and push git tag
- [ ] Monitor GitHub Actions for successful builds
- [ ] Verify all platform installers in release
- [ ] Test download and installation on each platform
- [ ] Update documentation if needed

## 🆘 Support

### If Builds Fail
1. Check the **Actions** tab for detailed error logs
2. Compare with previous successful runs
3. Check if any dependencies changed
4. Test build scripts locally
5. Open an issue with error logs

### Performance Optimization
- **Parallel builds**: All platforms build simultaneously
- **Caching**: Node.js dependencies cached automatically
- **Artifact retention**: Set to 7 days for releases, 90 days for development

### Cost Considerations
- **GitHub Actions minutes**: Free tier includes 2000 minutes/month
- **Storage**: Artifacts count toward storage quota
- **Private repos**: May have different limits

---

**🎉 Success!** With this setup, you have enterprise-level cross-platform distribution without needing multiple development machines or platform-specific knowledge! 