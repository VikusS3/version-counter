export function avanzarVersion(version: string): string {
  const [major, minor] = version.split(".");
  if (minor === "8") {
    return `${parseInt(major) + 1}.0`;
  }
  return `${major}.${parseInt(minor) + 1}`;
}
