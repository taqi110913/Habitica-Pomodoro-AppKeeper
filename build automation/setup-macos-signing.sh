#!/bin/bash
#
# setup-macos-signing.sh
#
# Setup script for macOS code signing and notarization
# This script helps you configure your environment for distributing signed macOS apps
#
# Requirements:
# - Apple Developer Account
# - Xcode or Xcode Command Line Tools

echo
echo -e "\033[1mmacOS Code Signing Setup for Habitica-Pomodoro-AppKeeper\033[0m"
echo

# Install required tools
echo -e "\033[1m1. Installing required tools...\033[0m"
if ! command -v brew &> /dev/null; then
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

echo "Installing jq and create-dmg..."
brew install jq create-dmg

# Check for Xcode tools
echo
echo -e "\033[1m2. Checking Xcode Command Line Tools...\033[0m"
if ! xcode-select -p &> /dev/null; then
    echo "Installing Xcode Command Line Tools..."
    xcode-select --install
    echo "Please complete the Xcode tools installation and run this script again."
    exit 1
else
    echo "✓ Xcode Command Line Tools are installed"
fi

# Check for certificates
echo
echo -e "\033[1m3. Checking for Developer Certificates...\033[0m"

APP_CERT=$(security find-certificate -c "Developer ID Application" 2>/dev/null | grep "Developer ID Application" | head -1)
INSTALLER_CERT=$(security find-certificate -c "Developer ID Installer" 2>/dev/null | grep "Developer ID Installer" | head -1)

if [ -n "$APP_CERT" ]; then
    echo "✓ Developer ID Application certificate found"
    FOUND_APP_CERT=$(echo "$APP_CERT" | sed 's/.*"\(.*\)".*/\1/')
    echo "  Certificate: $FOUND_APP_CERT"
else
    echo "✗ Developer ID Application certificate not found"
    echo "  Please download and install your certificates from Apple Developer Portal"
fi

if [ -n "$INSTALLER_CERT" ]; then
    echo "✓ Developer ID Installer certificate found"
    FOUND_INSTALLER_CERT=$(echo "$INSTALLER_CERT" | sed 's/.*"\(.*\)".*/\1/')
    echo "  Certificate: $FOUND_INSTALLER_CERT"
else
    echo "✗ Developer ID Installer certificate not found"
    echo "  Please download and install your certificates from Apple Developer Portal"
fi

# Create environment configuration
echo
echo -e "\033[1m4. Creating environment configuration...\033[0m"

cat > .env.macos-signing << EOF
# macOS Code Signing Configuration
# Copy this file to your shell profile (.bashrc, .zshrc, etc.) or source it before building

# Developer certificates (update with your actual certificate names)
export DEVELOPER_ID_APP="${FOUND_APP_CERT:-Developer ID Application: Your Name (XXXXXXXXXX)}"
export DEVELOPER_ID_INSTALLER="${FOUND_INSTALLER_CERT:-Developer ID Installer: Your Name (XXXXXXXXXX)}"

# Apple ID for notarization (update with your Apple ID)
export APPLE_ID="your-email@example.com"

# Team ID (find this in Apple Developer Portal)
export TEAM_ID="XXXXXXXXXX"

# App-specific password for notarization
# Generate this in Apple ID settings: https://appleid.apple.com/account/manage
export APP_SPECIFIC_PASSWORD="xxxx-xxxx-xxxx-xxxx"
EOF

echo "✓ Created .env.macos-signing configuration file"

# Instructions for app-specific password
echo
echo -e "\033[1m5. Next Steps:\033[0m"
echo
echo "1. Edit .env.macos-signing and update with your information:"
echo "   - Your Apple ID email"
echo "   - Your Team ID (found in Apple Developer Portal)"
echo "   - Generate an app-specific password at: https://appleid.apple.com/account/manage"
echo
echo "2. Source the environment file before building:"
echo "   source .env.macos-signing"
echo
echo "3. Build with signing and notarization:"
echo "   ./build-mac.sh --sign --notarize --dmg"
echo
echo -e "\033[1mCertificate Installation:\033[0m"
echo "If you don't have Developer certificates installed:"
echo "1. Go to https://developer.apple.com/account/resources/certificates"
echo "2. Create 'Developer ID Application' and 'Developer ID Installer' certificates"
echo "3. Download and double-click the .cer files to install them in Keychain"
echo
echo -e "\033[1mApp-Specific Password:\033[0m"
echo "1. Go to https://appleid.apple.com/account/manage"
echo "2. Sign in with your Apple ID"
echo "3. In the 'Security' section, generate an app-specific password"
echo "4. Use this password in the APP_SPECIFIC_PASSWORD environment variable"
echo

echo -e "\033[1mSetup complete! Check the instructions above to finish configuration.\033[0m" 