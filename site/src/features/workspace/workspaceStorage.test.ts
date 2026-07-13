import {
  createDefaultWorkspace,
  loadWorkspace,
  parseWorkspace,
  saveWorkspace,
  serializeWorkspace,
  WORKSPACE_KEY,
} from './workspaceStorage'

it('round-trips a workspace export', () => {
  const source = {
    ...createDefaultWorkspace(),
    language: 'en' as const,
    notes: { gates: 'Check loss-conditioned fidelity.' },
  }

  expect(parseWorkspace(serializeWorkspace(source))).toEqual(source)
})

it('rejects unknown workspace versions', () => {
  expect(() => parseWorkspace('{"version":99}')).toThrow(
    'Unsupported workspace version',
  )
})

it('falls back to defaults when stored JSON is corrupted', () => {
  localStorage.setItem(WORKSPACE_KEY, '{broken')

  expect(loadWorkspace()).toEqual(createDefaultWorkspace())
})

it('stores only the versioned workspace payload', () => {
  const workspace = createDefaultWorkspace()
  saveWorkspace(workspace)

  expect(localStorage.length).toBe(1)
  expect(localStorage.getItem(WORKSPACE_KEY)).toBe(serializeWorkspace(workspace))
})

it('repairs the known accidental inverse-problem edit without deleting other research data', () => {
  const workspace = {
    ...createDefaultWorkspace(),
    notes: { general: '保留这条研究笔记' },
    articleOverrides: {
      'inverse-problem': '理论首先把可测谱线、Rabi/Ramsey 曲线映射为参数。模型最有价值的输出通常是下一项最能区分=',
      'rabi-model': '保留另一个有意修改的正文块',
    },
  }
  localStorage.setItem(WORKSPACE_KEY, serializeWorkspace(workspace))

  const repaired = loadWorkspace()

  expect(repaired.articleOverrides['inverse-problem']).toBeUndefined()
  expect(repaired.articleOverrides['rabi-model']).toBe('保留另一个有意修改的正文块')
  expect(repaired.notes.general).toBe('保留这条研究笔记')
})
