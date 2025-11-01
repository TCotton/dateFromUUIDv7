# GitHub Actions Setup Guide

This repository includes a GitHub Actions CI/CD pipeline that automatically:

## On Pull Requests:
- ✅ Runs tests on Node.js versions 18.x, 20.x, and 22.x
- ✅ Checks code formatting with Biome
- ✅ Runs linting and applies fixes
- ✅ Builds the project

## On Main Branch Push:
- ✅ Runs all the same checks as PR
- ✅ Automatically publishes to NPM if version has changed
- ✅ Creates a Git tag for the new version
- ✅ Creates a GitHub release

## Setup Instructions

### 1. Create NPM Access Token

1. Go to [npmjs.com](https://www.npmjs.com) and log in
2. Click on your profile → "Access Tokens"
3. Click "Generate New Token" → "Classic Token"
4. Select "Automation" for CI/CD usage
5. Copy the token

### 2. Add NPM Token to GitHub Secrets

1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Paste your NPM access token
6. Click "Add secret"

### 3. Workflow Permissions

1. Go to "Settings" → "Actions" → "General"
2. Under "Workflow permissions":
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
3. Click "Save"

## How It Works

### Version Management
The workflow automatically detects if the version in `package.json` has changed compared to what's published on NPM. If the version is new, it will:

1. Publish the package to NPM
2. Create a Git tag (e.g., `v1.0.1`)
3. Create a GitHub release

### To Publish a New Version:
1. Update the version in `package.json`:
   ```bash
   npm version patch  # for 1.0.0 → 1.0.1
   npm version minor  # for 1.0.0 → 1.1.0
   npm version major  # for 1.0.0 → 2.0.0
   ```
2. Commit and push to main branch
3. The GitHub Action will automatically publish if all tests pass

### Manual Commands
```bash
# Run the same checks locally
npm run test
npm run format:check
npm run lint:fix
npm run build
```

## Workflow Files
- `.github/workflows/ci-cd.yml` - Main CI/CD pipeline

## Troubleshooting

### Publication Fails
- Check that `NPM_TOKEN` secret is set correctly
- Verify the package name is available on NPM
- Ensure version in `package.json` is higher than published version

### Tests Fail
- Check that all dependencies are included in `package.json`
- Verify that scripts `test`, `format:check`, `lint:fix` exist
- Ensure Node.js compatibility (tested on 18.x, 20.x, 22.x)

### Permission Errors
- Verify "Read and write permissions" are enabled in repository settings
- Check that `GITHUB_TOKEN` has permission to create releases and tags