import { controlWikiEntries } from './wikiEntriesControl'
import { opticsWikiEntries } from './wikiEntriesOptics'
import { physicsWikiEntries } from './wikiEntriesPhysics'
import { platformWikiEntries } from './wikiEntriesPlatform'

export const wikiEntries = [
  ...opticsWikiEntries,
  ...controlWikiEntries,
  ...platformWikiEntries,
  ...physicsWikiEntries,
]
