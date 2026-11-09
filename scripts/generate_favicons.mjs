import sharp from "sharp";
import fs from "node:fs";

async function buildIcons() {
  const src = "public/assets/images/logo/mylogo.png";

  // 1. Base 512x512 rounded icon with smooth antialiased corners
  const size = 512;
  const radius = 96; // ~18.75% corner radius for super-slick rounded squircle
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff" /></svg>`
  );

  const base512 = await sharp(src)
    .resize(size, size)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  // Save high-res icons
  await sharp(base512).toFile("src/app/icon.png");

  const apple180 = await sharp(base512).resize(180, 180).png().toBuffer();
  await sharp(apple180).toFile("src/app/apple-icon.png");
  await sharp(apple180).toFile("public/assets/images/logo/apple-touch-icon.png");

  // Generate multi-size PNGs with subtle sharpening for ultra-crisp display at small sizes
  const png48 = await sharp(base512)
    .resize(48, 48)
    .sharpen({ sigma: 1, m1: 1.2, m2: 2 })
    .png()
    .toBuffer();

  const png32 = await sharp(base512)
    .resize(32, 32)
    .sharpen({ sigma: 1, m1: 1.5, m2: 2 })
    .png()
    .toBuffer();
  await sharp(png32).toFile("public/assets/images/logo/favicon-32x32.png");

  const png16 = await sharp(base512)
    .resize(16, 16)
    .sharpen({ sigma: 0.8, m1: 1.2, m2: 1.8 })
    .png()
    .toBuffer();
  await sharp(png16).toFile("public/assets/images/logo/favicon-16x16.png");

  // Pack 16x16, 32x32, 48x48 into a proper ICO file
  const images = [
    { width: 16, height: 16, data: png16 },
    { width: 32, height: 32, data: png32 },
    { width: 48, height: 48, data: png48 },
  ];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type 1
  header.writeUInt16LE(images.length, 4); // count of images

  let offset = 6 + images.length * 16;
  const entries = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.data.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    offset += img.data.length;
    entries.push(entry);
  }

  const icoBuffer = Buffer.concat([
    header,
    ...entries,
    ...images.map((img) => img.data),
  ]);

  fs.writeFileSync("src/app/favicon.ico", icoBuffer);
  fs.writeFileSync("public/favicon.ico", icoBuffer);
}

buildIcons().catch(console.error);
