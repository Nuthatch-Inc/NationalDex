import { mkdir } from "fs/promises";
import sharp from "sharp";

const sizes = [192, 512];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#09090b"/>
  <text x="256" y="320" font-family="monospace" font-size="280" font-weight="bold" fill="#fafafa" text-anchor="middle">N</text>
</svg>`;

await mkdir("public/icons", { recursive: true });

for (const size of sizes) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(`public/icons/icon-${size}x${size}.png`);
  console.log(`Created icon-${size}x${size}.png`);
}

console.log("Done!");
