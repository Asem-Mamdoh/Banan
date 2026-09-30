import fs from 'fs'
import path from 'path'

// Mock the environment to read the files
const projectsContent = fs.readFileSync('./src/data/projects.ts', 'utf8')
const translationsContent = fs.readFileSync('./src/translations.ts', 'utf8')

// Simple extraction logic (since we can't easily import TS files and run them here)
const projectsMatch = projectsContent.match(/export const projectsData: Project\[\] = (\[[\s\S]*?\]);/)
const translationsMatch = translationsContent.match(/export const translations = ({[\s\S]*?});/)

if (!projectsMatch || !translationsMatch) {
  console.error("Could not parse files")
  process.exit(1)
}

// Clean up for JSON parsing (very basic)
const projects = eval(`(${projectsMatch[1]})`)
const translations = eval(`(${translationsMatch[1]})`)

const ndjson = projects.map(p => {
  const transKey = p.translationKey
  const en = translations.en.projects.items[transKey]
  const ar = translations.ar.projects.items[transKey]

  return JSON.stringify({
    _type: 'project',
    _id: p.id,
    titleEn: en.title,
    titleAr: ar.title,
    slug: { _type: 'slug', current: p.id },
    category: p.category,
    descriptionEn: en.fullDescription || en.description,
    descriptionAr: ar.fullDescription || ar.description,
    specs: {
      area: p.specs.area,
      bedrooms: p.specs.bedrooms,
      typeEn: en.category,
      typeAr: ar.category
    }
  })
}).join('\n')

fs.writeFileSync('projects.ndjson', ndjson)
console.log("Generated projects.ndjson")
