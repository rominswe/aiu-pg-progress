// restructure-auto.js
import fs from "fs";
import path from "path";
import crypto from "crypto";

// ===============================
// CONFIG
// ===============================
const CLIENT_DIR = path.join(process.cwd(), "client");

// The folders to scan
const FRONTEND_PATHS = [
  path.join(CLIENT_DIR, "frontend-admin"),
  path.join(CLIENT_DIR, "frontend-user"),
];

// Shared folder structure
const SHARED_DIR = path.join(CLIENT_DIR, "shared");
const SHARED_CATEGORIES = ["components", "hooks", "utils", "api", "styles"];

// Map file types to shared subfolder
const TYPE_MAP = {
  ".jsx": "components",
  ".js": "utils",
  ".ts": "utils",
  ".tsx": "components",
  ".css": "styles",
  ".scss": "styles",
};

// ===============================
// HELPERS
// ===============================

// Create shared folder structure
const createSharedFolders = () => {
  if (!fs.existsSync(SHARED_DIR)) fs.mkdirSync(SHARED_DIR);
  SHARED_CATEGORIES.forEach((folder) => {
    const dir = path.join(SHARED_DIR, folder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created: ${dir}`);
    }
  });
};

// Recursively get all files
const getAllFiles = (dir, files = []) => {
  if (!fs.existsSync(dir)) return files;
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  });
  return files;
};

// Move file to shared folder
const moveToShared = (filePath) => {
  const ext = path.extname(filePath);
  const category = TYPE_MAP[ext] || "utils";
  const destDir = path.join(SHARED_DIR, category);

  const destPath = path.join(destDir, path.basename(filePath));

  if (!fs.existsSync(destPath)) {
    fs.renameSync(filePath, destPath);
    console.log(`Moved → ${destPath}`);
  }

  return destPath;
};

// Update imports to reflect new shared location
const updateImports = (sharedName, newPath) => {
  FRONTEND_PATHS.forEach((frontendRoot) => {
    const files = getAllFiles(frontendRoot);
    files.forEach((file) => {
      if (!file.endsWith(".jsx") && !file.endsWith(".js") && !file.endsWith(".tsx")) return;

      let content = fs.readFileSync(file, "utf8");
      const regex = new RegExp(`(\\.\\.?\\/.*)?${sharedName}`, "g");

      if (regex.test(content)) {
        const relativePath = path
          .relative(path.dirname(file), newPath)
          .replace(/\\/g, "/");

        const fixedPath = relativePath.startsWith(".") ? relativePath : "./" + relativePath;

        content = content.replace(regex, fixedPath);
        fs.writeFileSync(file, content, "utf8");
        console.log(`Updated imports in ${file}`);
      }
    });
  });
};

// Identify duplicate files across frontends
const getFileHash = (filePath) => {
  const content = fs.readFileSync(filePath, "utf8");
  return crypto.createHash("md5").update(content).digest("hex");
};

const detectDuplicates = () => {
  const map = {};
  FRONTEND_PATHS.forEach((root) => {
    getAllFiles(root).forEach((file) => {
      const base = path.basename(file);
      const hash = getFileHash(file);

      const key = base + "-" + hash;

      if (!map[key]) map[key] = [];
      map[key].push(file);
    });
  });

  return Object.entries(map).filter(([key, list]) => list.length > 1);
};


// ===============================
// MAIN PROCESS
// ===============================
console.log("🔹 Starting optimized restructuring...");

// Create shared folder structure
createSharedFolders();

// Detect duplicates
const duplicates = detectDuplicates();

// Move duplicates
duplicates.forEach(([name, files]) => {
  console.log(`\nFound duplicate: ${name}`);
  const newPath = moveToShared(files[0]);
  updateImports(name, newPath);

  // Remove duplicates in other locations
  for (let i = 1; i < files.length; i++) {
    try {
      fs.unlinkSync(files[i]);
      console.log(`Removed duplicate: ${files[i]}`);
    } catch (err) {}
  }
});

console.log("\n✅ Restructuring complete!");
