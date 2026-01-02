import * as React from 'react';
import { memo } from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { LiveProvider, LivePreview } from 'react-live';

type Props = {
  code: string;
  resumeData: any;
  width?: number | string;
  height?: number | string;
  className?: string;
};

const compileCache = new Map<string, string>();

// Memoized to prevent re-renders when template code hasn't changed
export const TemplatePreview = memo(function TemplatePreview({ code, resumeData, width = '100%', height, className }: Props) {
  const cacheKey = React.useMemo(() => `${hashString(code)}`, [code]);
  React.useEffect(() => {
    if (!compileCache.has(cacheKey)) {
      compileCache.set(cacheKey, code);
    }
  }, [cacheKey, code]);

  return (
    <div style={{ width, height, aspectRatio: height ? undefined : '1 / 1.414', overflow: 'hidden' }} className={className}>
      <Frame sandbox="allow-same-origin allow-scripts" style={{ width: '100%', height: '100%' }}>
        <FrameContextConsumer>
          {() => (
            <LiveProvider code={compileCache.get(cacheKey) || code} scope={{ React, resumeData }}>
              <LivePreview />
            </LiveProvider>
          )}
        </FrameContextConsumer>
      </Frame>
    </div>
  );
});

function hashString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return String(hash);
}


