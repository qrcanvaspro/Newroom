/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider } from './context/AppContext';
import { MobileFrame } from './components/MobileFrame';

export default function App() {
  return (
    <AppProvider>
      <MobileFrame />
    </AppProvider>
  );
}
