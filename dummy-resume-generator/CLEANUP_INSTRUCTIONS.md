# Cleanup Instructions (FOR AI)

This file contains instructions for an AI assistant to remove the dummy resume generator tool after testing is complete.

**IMPORTANT**: This is a TEMPORARY tool. Delete it when no longer needed.

---

## Files and Dependencies to Remove

### Step 1: Delete this entire folder

```
dummy-resume-generator/
├── DummyResumeGenerator.ts
├── README.md
└── CLEANUP_INSTRUCTIONS.md
```

### Step 2: Remove dependencies from `package.json` (project root)

Remove these lines from `/package.json`:

```json
"pdfkit": "^0.15.2",
"@types/pdfkit": "^0.13.9"
```

### Step 3: Remove dependencies from `api/package.json`

Remove these lines from `/api/package.json`:

```json
"pdfkit": "^0.15.2"  // from dependencies
"@types/pdfkit": "^0.13.9"  // from devDependencies
```

### Step 4: Delete generated output files

```
output/
├── resume-1.5mb.pdf
├── resume-3mb.pdf
├── resume-5mb.pdf
└── resume-51mb.pdf
```

### Step 5: Reinstall dependencies

After removing the packages from package.json files, run:

```bash
cd /Users/home/Development/getquickresume
rm -rf node_modules package-lock.json
npm install

cd api
rm -rf node_modules package-lock.json
npm install
```

---

## Quick Cleanup Commands

Run these commands from the project root to fully remove the dummy resume generator:

```bash
# Remove the generator folder
rm -rf dummy-resume-generator

# Remove generated PDFs
rm -rf output

# Then manually edit package.json files to remove pdfkit dependencies
# and reinstall node_modules
```

---

## Summary Checklist

- [ ] Delete `dummy-resume-generator/` folder
- [ ] Delete `output/` folder (generated PDFs)
- [ ] Remove `pdfkit` from root `package.json` dependencies
- [ ] Remove `@types/pdfkit` from root `package.json` devDependencies
- [ ] Remove `pdfkit` from `api/package.json` dependencies
- [ ] Remove `@types/pdfkit` from `api/package.json` devDependencies
- [ ] Run `npm install` in root and `api/` folders to update lock files
