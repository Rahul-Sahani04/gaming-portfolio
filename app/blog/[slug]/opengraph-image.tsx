import { ImageResponse } from 'next/og';
import { allBlogs } from 'contentlayer/generated';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allBlogs.find((p) => p.slug === slug);
  const title = post?.title ?? 'Blog';
  const description = post?.description ?? '';
  const date = post?.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '52px 64px',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', opacity: 0.8 }} />
            <span style={{ color: '#555', fontSize: 13, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              rsahani.space / blog
            </span>
          </div>
          <span style={{ color: '#333', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Rahul Sahani
          </span>
        </div>

        {/* Center content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
          {date && (
            <span style={{ color: '#444', fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 24 }}>
              {date}
            </span>
          )}
          <h1 style={{
            color: '#fff',
            fontSize: title.length > 50 ? 46 : 58,
            fontWeight: 700,
            lineHeight: 1.1,
            margin: '0 0 24px',
            letterSpacing: '-0.02em',
            maxWidth: 1000,
          }}>
            {title}
          </h1>
          {description && (
            <p style={{
              color: '#666',
              fontSize: 19,
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 860,
            }}>
              {description.length > 130 ? description.slice(0, 130) + '…' : description}
            </p>
          )}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
          <div style={{ flex: 1, height: 1, background: '#1a1a1a' }} />
          <span style={{ color: '#333', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            writing
          </span>
          <div style={{ flex: 1, height: 1, background: '#1a1a1a' }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
