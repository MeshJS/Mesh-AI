import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import { remarkInclude } from 'fumadocs-mdx/config';
import { source } from '@/lib/source';
import type { InferPageType } from 'fumadocs-core/source';
import { readFile } from 'fs/promises';

const processor = remark()
  .use(remarkMdx)
  // needed for Fumadocs MDX
  .use(remarkInclude)
  .use(remarkGfm);

export async function getLLMText(page: InferPageType<typeof source>) {
  if (!page.absolutePath) {
    throw new Error(`Page ${page.url} has no absolutePath`);
  }

  const content = await readFile(page.absolutePath, 'utf-8');
  const processed = await processor.process({
    path: page.absolutePath,
    value: content,
  });

  return `# ${page.data.title}
URL: ${page.url}

${page.data.description}

${processed.value}`;
}