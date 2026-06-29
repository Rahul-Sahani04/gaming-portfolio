import { ImageResponse } from 'next/og';
import { allProjects } from 'contentlayer/generated';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  const title = project?.title ?? 'Project';
  const description = project?.description ?? '';
  const date = project?.date ? new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '64px',
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

        {/* Top label */}
        <div style={{ position: 'absolute', top: 48, left: 64, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', opacity: 0.8 }} />
          <span style={{ color: '#555', fontSize: 13, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            rsahani.space / projects
          </span>
        </div>

        {/* Author top-right */}
        <div style={{ position: 'absolute', top: 48, right: 64, color: '#444', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Rahul Sahani
        </div>

        {/* Date */}
        {date && (
          <span style={{ color: '#555', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>
            {date}
          </span>
        )}

        {/* Title */}
        <h1 style={{
          color: '#fff',
          fontSize: title.length > 50 ? 48 : 60,
          fontWeight: 700,
          lineHeight: 1.1,
          margin: '0 0 20px',
          letterSpacing: '-0.02em',
        }}>
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p style={{
            color: '#777',
            fontSize: 20,
            lineHeight: 1.5,
            margin: 0,
            maxWidth: 900,
          }}>
            {description.length > 120 ? description.slice(0, 120) + '…' : description}
          </p>
        )}

        {/* Bottom rule */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#fff', opacity: 0.08 }} />
      </div>
    ),
    { ...size }
  );
}
