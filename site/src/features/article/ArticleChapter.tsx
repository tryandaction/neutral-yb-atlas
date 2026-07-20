import type { Chapter, Language } from '../../types/content'
import SectionRail from '../../components/SectionRail'
import ArticleSection from './ArticleSection'

interface ArticleChapterProps {
  chapter: Chapter
  language: Language
}

export default function ArticleChapter({ chapter, language }: ArticleChapterProps) {
  return (
    <article className="article-chapter" id={chapter.id === 'why-yb' ? 'yb-platform' : chapter.id}>
      <SectionRail number={chapter.number} label={chapter.shortTitle[language]} />
      <div className="article-chapter__body">
        <header className="chapter-header">
          <p>{String(chapter.number).padStart(2, '0')} / 06</p>
          <h2>{chapter.title[language]}</h2>
          <strong>{chapter.question[language]}</strong>
        </header>
        {chapter.sections.map((section) => (
          <ArticleSection
            key={section.id}
            language={language}
            section={section}
          />
        ))}
      </div>
    </article>
  )
}
