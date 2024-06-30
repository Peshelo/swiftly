import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const templatePath = path.join(process.cwd(), 'templates/inputs.html');
  const template = fs.readFileSync(templatePath, 'utf8');
  res.status(200).json({ template });
}
