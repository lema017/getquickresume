# Dummy Resume Generator

This is a **TEMPORARY** utility for generating dummy resume PDFs for testing purposes.

## Purpose

This tool generates dummy resume PDFs with specific file sizes (1.5 MB, 3 MB, 5 MB, and 51 MB) containing realistic resume content for testing file upload limits and PDF processing.

---

## How to Use

### Prerequisites

Make sure dependencies are installed in the project root:

```bash
cd /Users/home/Development/getquickresume
npm install
```

### Run the Generator

From the project root, execute:

```bash
npx tsx dummy-resume-generator/DummyResumeGenerator.ts
```

### Output

The generator creates four PDF files in the `output/` folder:

| File | Size | Description |
|------|------|-------------|
| `resume-1.5mb.pdf` | ~1.5 MB | For testing free user limits (2 MB) |
| `resume-3mb.pdf` | ~3 MB | For testing premium user limits (10 MB) |
| `resume-5mb.pdf` | ~5 MB | For testing standard upload limits |
| `resume-51mb.pdf` | ~51 MB | For testing large file rejection |

### Programmatic Usage

You can also import and use the class in your own code:

```typescript
import { DummyResumeGenerator } from './dummy-resume-generator/DummyResumeGenerator';

const generator = new DummyResumeGenerator();

// Generate a 1.5 MB resume
await generator.generate1_5MBResume('./my-output/test-1.5mb.pdf');

// Generate a 3 MB resume
await generator.generate3MBResume('./my-output/test-3mb.pdf');

// Generate a 5 MB resume
await generator.generate5MBResume('./my-output/test-5mb.pdf');

// Generate a 51 MB resume
await generator.generate51MBResume('./my-output/test-51mb.pdf');
```

### PDF Content

The generated PDFs contain realistic resume content:

- **Header**: Name and professional title
- **Contact Info**: Email, phone, LinkedIn, GitHub, portfolio
- **Professional Summary**: Career overview paragraph
- **Work Experience**: 3 detailed job entries with achievements
- **Education**: Master's and Bachelor's degrees
- **Technical Skills**: Organized by category (languages, frontend, backend, databases, cloud, tools)
- **Certifications**: Professional certifications list
- **Additional Pages**: Project portfolios and technical deep dives to reach target file size
