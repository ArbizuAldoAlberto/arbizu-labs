'use client';
import React, { useLayoutEffect } from 'react';
import Home from '../page';

export default function V2Page() {
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', 'v2');
    if (typeof window !== 'undefined' && window.__webanti) {
      window.__webanti.theme = 'v2';
    }
    return () => {
      document.documentElement.setAttribute('data-theme', 'v1');
    };
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('data-theme', 'v2');`,
        }}
      />
      <Home />
    </>
  );
}
