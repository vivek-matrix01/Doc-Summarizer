export default function formatFileNameAsTitle(filename: string) {
     // Remove file extension
  filename = filename.replace(/\.[^.]+$/, "");

  // Replace special characters (-, _) with spaces
  filename = filename.replace(/[-_]+/g, " ");

  // Add spaces between camelCase words
  filename = filename.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Convert to title case
  return filename
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();

}