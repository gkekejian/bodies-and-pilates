const fs = require('fs');
const path = require('path');

// Minimal 1x1 pixel cream-colored PNG (base64)
// This is a valid 1x1 PNG with color #FDFCFA
const PNG_1X1 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP88+X/XgAI+AL0+Bz8KQAAAABJRU5ErkJggg==',
  'base64'
);

const images = [
  'hero.jpg', 'studio.jpg', 'instructor-naira.jpg', 'instructor-theresia.jpg',
  'instructor-hannah.jpg', 'class-beginner.jpg', 'class-fullbody.jpg',
  'class-flexibility.jpg', 'class-private.jpg', 'about-studio.jpg', 'og-image.jpg'
];

const dir = path.join(__dirname, '../public/images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

images.forEach(name => {
  const filePath = path.join(dir, name);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, PNG_1X1);
    console.log(`Created placeholder: ${name}`);
  }
});
console.log('Done.');
// Also create logo placeholder
const logoPath = path.join(dir, 'logo.png');
if (!fs.existsSync(logoPath)) {
  fs.writeFileSync(logoPath, PNG_1X1);
  console.log('Created placeholder: logo.png');
}
