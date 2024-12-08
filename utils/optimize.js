import path from 'node:path';
import fs from 'node:fs';
import { globby } from 'globby';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

(async () => {
  const inputImagesDir = 'imgOld';
  const outputImagesDir = 'img';

  fs.mkdirSync(outputImagesDir, { recursive: true });

  console.log('Searching for files in images directory...');
  const allFiles = await globby([`${inputImagesDir}/**/*`], { dot: false });

  const imageExtensions = new Set(['jpg', 'jpeg', 'png']);
  const imageFiles = allFiles.filter((filePath) =>
    imageExtensions.has(path.extname(filePath).slice(1).toLowerCase())
  );
  const otherFiles = allFiles.filter((filePath) =>
    !imageExtensions.has(path.extname(filePath).slice(1).toLowerCase())
  );

  console.log('Found image files:', imageFiles);
  console.log('Found other files:', otherFiles);

  if (imageFiles.length > 0) {
    console.log('Optimizing images...');
    for (const imagePath of imageFiles) {
      const relativePath = path.relative(inputImagesDir, imagePath);
      const outputFilePath = path.join(outputImagesDir, relativePath);
      fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });

      const buffer = fs.readFileSync(imagePath);
      try {
        const optimized = await imagemin.buffer(buffer, {
          plugins: [
            imageminMozjpeg({ quality: 80 }),
            imageminPngquant({ quality: [0.6, 0.8] })
          ]
        });
        fs.writeFileSync(outputFilePath, optimized);
        console.log(`Optimized image: ${relativePath}`);
      } catch (err) {
        console.error(`Error optimizing image ${relativePath}:`, err);
      }
    }
  } else {
    console.log('No images found to optimize.');
  }

  if (otherFiles.length > 0) {
    console.log('Copying other files...');
    for (const filePath of otherFiles) {
      const relativePath = path.relative(inputImagesDir, filePath);
      const outputFilePath = path.join(outputImagesDir, relativePath);

      fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
      fs.copyFileSync(filePath, outputFilePath);
      console.log(`Copied file: ${relativePath}`);
    }
  } else {
    console.log('No other files found to copy.');
  }

  console.log('Process complete!');
})();
