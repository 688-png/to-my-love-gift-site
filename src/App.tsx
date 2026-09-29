/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RomanticProvider } from './context/RomanticContext';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';

export default function App() {
  return (
    <RomanticProvider>
      <div className="min-h-screen bg-[#FFF9F5] text-[#302329] flex flex-col font-sans">
        <Navigation />
        <main className="flex-1 w-full">
          <Home />
        </main>
      </div>
    </RomanticProvider>
  );
}
