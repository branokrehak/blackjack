import React from 'react';
import Index from './pages/index';

import { Header } from './components/index';
import { CardArrayProvider } from './context/CardArrayProvider';
import { MoveCardProvider } from './context/MoveCardProvider';
import { ChangeTurnProvider } from './context/ChangeTurnProvider';
import { BetAmmountProvider } from './context/BetAmmountProvider';

function App() {
  return (
    <>
      <MoveCardProvider>
        <CardArrayProvider>
          <ChangeTurnProvider>
            <BetAmmountProvider>
              <div className="App">
                <Header />
                <Index />
              </div>
            </BetAmmountProvider>
          </ChangeTurnProvider>
        </CardArrayProvider>
      </MoveCardProvider>
    </>
  );
};

export default App;




