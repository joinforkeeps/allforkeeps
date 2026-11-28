export const hardwareRequirements = {
  minimum: [
    { label: "CPU", value: "2 cores (more for several workloads)" },
    { label: "Memory", value: "2 GB RAM (more as workloads grow)" },
    { label: "Disk", value: "10 GB free for images, volumes, and backups" },
    { label: "Architecture", value: "amd64 or arm64; Raspberry Pi OS requires arm64" },
  ],
  budgetNote:
    "Smaller can work (1 core, 512 MB RAM, 4 GB disk), but is not recommended. Start with 1 core and 1 GB RAM, then monitor usage and upgrade, especially when builds and apps share a server.",
  systems: [
    "Windows 11 running Linux containers (Docker Desktop with WSL2)",
    "Linux, such as Ubuntu",
  ],
  starterPack: ["Docker", "Node.js and npm", "Git", "A code editor", "A terminal"],
};
