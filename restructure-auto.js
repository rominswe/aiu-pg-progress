// // restructure-auto.js
// import fs from "fs";
// import path from "path";
// import crypto from "crypto";

// // ===============================
// // CONFIG
// // ===============================
// const CLIENT_DIR = path.join(process.cwd(), "client");

// // The folders to scan
// const FRONTEND_PATHS = [
//   path.join(CLIENT_DIR, "frontend-admin"),
//   path.join(CLIENT_DIR, "frontend-user"),
// ];

// // Shared folder structure
// const SHARED_DIR = path.join(CLIENT_DIR, "shared");
// const SHARED_CATEGORIES = ["components", "hooks", "utils", "api", "styles"];

// // Map file types to shared subfolder
// const TYPE_MAP = {
//   ".jsx": "components",
//   ".js": "utils",
//   ".ts": "utils",
//   ".tsx": "components",
//   ".css": "styles",
//   ".scss": "styles",
// };

// // ===============================
// // HELPERS
// // ===============================

// // Create shared folder structure
// const createSharedFolders = () => {
//   if (!fs.existsSync(SHARED_DIR)) fs.mkdirSync(SHARED_DIR);
//   SHARED_CATEGORIES.forEach((folder) => {
//     const dir = path.join(SHARED_DIR, folder);
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//       console.log(`Created: ${dir}`);
//     }
//   });
// };

// // Recursively get all files
// const getAllFiles = (dir, files = []) => {
//   if (!fs.existsSync(dir)) return files;
//   fs.readdirSync(dir).forEach((file) => {
//     const fullPath = path.join(dir, file);
//     if (fs.statSync(fullPath).isDirectory()) {
//       getAllFiles(fullPath, files);
//     } else {
//       files.push(fullPath);
//     }
//   });
//   return files;
// };
// // ✅ DEBUG: Log file counts
// console.log("Admin files:", getAllFiles(FRONTEND_PATHS[0]).length);
// console.log("User files:", getAllFiles(FRONTEND_PATHS[1]).length);

// // Move file to shared folder
// const moveToShared = (filePath) => {
//   const ext = path.extname(filePath);
//   const category = TYPE_MAP[ext] || "utils";
//   const destDir = path.join(SHARED_DIR, category);

//   const destPath = path.join(destDir, path.basename(filePath));

//   if (!fs.existsSync(destPath)) {
//     fs.renameSync(filePath, destPath);
//     console.log(`Moved → ${destPath}`);
//   }

//   return destPath;
// };

// // Update imports to reflect new shared location
// const updateImports = (sharedName, newPath) => {
//   FRONTEND_PATHS.forEach((frontendRoot) => {
//     const files = getAllFiles(frontendRoot);
//     files.forEach((file) => {
//       if (!file.endsWith(".jsx") && !file.endsWith(".js") && !file.endsWith(".tsx")) return;

//       let content = fs.readFileSync(file, "utf8");
//       const regex = new RegExp(`(\\.\\.?\\/.*)?${sharedName}`, "g");

//       if (regex.test(content)) {
//         const relativePath = path
//           .relative(path.dirname(file), newPath)
//           .replace(/\\/g, "/");

//         const fixedPath = relativePath.startsWith(".") ? relativePath : "./" + relativePath;

//         content = content.replace(regex, fixedPath);
//         fs.writeFileSync(file, content, "utf8");
//         console.log(`Updated imports in ${file}`);
//       }
//     });
//   });
// };

// // Identify duplicate files across frontends
// const getFileHash = (filePath) => {
//   const content = fs.readFileSync(filePath, "utf8");
//   return crypto.createHash("md5").update(content).digest("hex");
// };

// const detectDuplicates = () => {
//   const map = {};
//   FRONTEND_PATHS.forEach((root) => {
//     getAllFiles(root).forEach((file) => {
//       const base = path.basename(file);
//       const hash = getFileHash(file);

//       const key = base + "-" + hash;

//       if (!map[key]) map[key] = [];
//       map[key].push(file);
//     });
//   });

//   return Object.entries(map).filter(([key, list]) => list.length > 1);
// };


// // ===============================
// // MAIN PROCESS
// // ===============================
// console.log("🔹 Starting optimized restructuring...");

// // Create shared folder structure
// createSharedFolders();

// // Detect duplicates
// const duplicates = detectDuplicates();

// // Move duplicates
// duplicates.forEach(([name, files]) => {
//   console.log(`\nFound duplicate: ${name}`);

//   // Move one copy to shared
//   const newPath = moveToShared(files[0]);

//   // Update imports everywhere
//   updateImports(path.basename(files[0]), newPath);

//   // Remove ALL original copies (including the moved one placeholder)
//   files.forEach((file) => {
//     if (fs.existsSync(file)) {
//       fs.unlinkSync(file);
//       console.log(`Removed original: ${file}`);
//     }
//   });
// });


// console.log("\n✅ Restructuring complete!");

// restructure-auto.js
import fs from "fs";
import path from "path";
import crypto from "crypto";

// ===============================
// CONFIG
// ===============================
const CLIENT_DIR = path.join(process.cwd(), "client");

// Frontend folders to scan
const FRONTEND_PATHS = [
  path.join(CLIENT_DIR, "frontend-admin"),
  path.join(CLIENT_DIR, "frontend-user"),
];

// Shared folder structure
const SHARED_DIR = path.join(CLIENT_DIR, "shared");
const SHARED_CATEGORIES = ["components", "hooks", "utils", "api", "styles"];

// Map file extensions to shared subfolder
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

// Create shared folders if not exist
const createSharedFolders = () => {
  if (!fs.existsSync(SHARED_DIR)) fs.mkdirSync(SHARED_DIR);
  SHARED_CATEGORIES.forEach((folder) => {
    const dir = path.join(SHARED_DIR, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
};

// Recursively get all files in a folder
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

// Compute a hash of the file content (normalize line endings)
const getFileHash = (filePath) => {
  const content = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
  return crypto.createHash("md5").update(content).digest("hex");
};

// Detect duplicates across frontends
const detectDuplicates = () => {
  const map = {};
  FRONTEND_PATHS.forEach((root) => {
    getAllFiles(root).forEach((file) => {
      const base = path.basename(file);
      const hash = getFileHash(file);
      const key = `${base}-${hash}`;

      if (!map[key]) map[key] = [];
      map[key].push(file);
    });
  });

  return Object.entries(map).filter(([key, files]) => files.length > 1);
};

// Move a file to the shared folder
const moveToShared = (filePath) => {
  const ext = path.extname(filePath);
  const category = TYPE_MAP[ext] || "utils";
  const destDir = path.join(SHARED_DIR, category);

  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  let destPath = path.join(destDir, path.basename(filePath));

  // Handle name collisions by appending a number
  let counter = 1;
  while (fs.existsSync(destPath)) {
    const name = path.basename(filePath, ext);
    destPath = path.join(destDir, `${name}_${counter}${ext}`);
    counter++;
  }

  fs.renameSync(filePath, destPath);
  return destPath;
};

// Update import statements in all frontend files
const updateImports = (oldName, newPath) => {
  FRONTEND_PATHS.forEach((frontendRoot) => {
    getAllFiles(frontendRoot).forEach((file) => {
      if (!/\.(js|jsx|ts|tsx)$/.test(file)) return;

      let content = fs.readFileSync(file, "utf8");
      const regex = new RegExp(`(['"\`].*?)${oldName}(['"\`])`, "g");

      if (regex.test(content)) {
        const relativePath = path
          .relative(path.dirname(file), newPath)
          .replace(/\\/g, "/");
        const fixedPath = relativePath.startsWith(".") ? relativePath : "./" + relativePath;
        content = content.replace(regex, `$1${fixedPath}$2`);
        fs.writeFileSync(file, content, "utf8");
        console.log(`✅ Updated imports in: ${file}`);
      }
    });
  });
};

// Remove all files in a list
const removeFiles = (files) => {
  files.forEach((file) => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`🗑 Removed: ${file}`);
    }
  });
};

// ===============================
// MAIN PROCESS
// ===============================
console.log("🔹 Starting restructuring...");

// 1️⃣ Create shared folders
createSharedFolders();

// 2️⃣ Detect duplicates
const duplicates = detectDuplicates();
console.log(`🔍 Found ${duplicates.length} duplicate sets.`);

// 3️⃣ Process duplicates
duplicates.forEach(([name, files]) => {
  console.log(`\n📂 Processing duplicate: ${name}`);

  // Move first file to shared
  const sharedPath = moveToShared(files[0]);
  console.log(`➡ Moved to shared: ${sharedPath}`);

  // Update all imports to point to shared
  updateImports(path.basename(files[0]), sharedPath);

  // Remove all original copies (excluding the moved one in shared)
  removeFiles(files.slice(1));
});

console.log("\n✅ Restructuring complete!");