# Example Usage

This file shows example scenarios of how the GitHub Action will work:

## Scenario 1: Pull Request
When you create a pull request:

```bash
git checkout -b feature/new-feature
# Make your changes...
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
# Create PR on GitHub
```

**What happens:**
- ✅ Tests run on Node.js 18.x, 20.x, 22.x
- ✅ Format checking with `npm run format:check`
- ✅ Linting with `npm run lint:fix`
- ✅ Build verification with `npm run build`
- ❌ No publishing (only on main branch)

## Scenario 2: Merge to Main (No Version Change)
When you merge to main without changing package.json version:

```bash
git checkout main
git merge feature/new-feature
git push origin main
```

**What happens:**
- ✅ All checks run again
- ✅ Version comparison (current: 1.0.0, NPM: 1.0.0)
- ⏭️ No publishing (version unchanged)

## Scenario 3: Merge to Main (With Version Change)
When you merge to main after updating the version:

```bash
# Update version first
npm version patch  # 1.0.0 → 1.0.1
git add package.json package-lock.json
git commit -m "Bump version to 1.0.1"
git push origin main
```

**What happens:**
- ✅ All checks run
- ✅ Version comparison (current: 1.0.1, NPM: 1.0.0)
- 🚀 **Publishes to NPM**
- 🏷️ **Creates Git tag: v1.0.1**
- 📋 **Creates GitHub Release**

## Version Commands

```bash
# Patch version (1.0.0 → 1.0.1) - for bug fixes
npm version patch

# Minor version (1.0.0 → 1.1.0) - for new features
npm version minor

# Major version (1.0.0 → 2.0.0) - for breaking changes
npm version major

# Custom version
npm version 1.2.3
```

## Workflow Status

You can monitor the workflow status:
1. Go to your GitHub repository
2. Click the "Actions" tab
3. See running/completed workflows
4. Click on any workflow to see detailed logs

## Success Indicators

✅ **PR Success**: All checks pass, ready to merge
🚀 **Publish Success**: Package published to NPM
🏷️ **Tag Created**: Git tag created for the version
📋 **Release Created**: GitHub release page created