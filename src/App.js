import React, { useState } from 'react';
import './App.css';

function App() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  const executeCommand = async () => {
    try {
      const response = await fetch('http://localhost:3001/exec-shell-command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });
      const data = await response.json();
      setOutput(data.stdout + '\n' + data.stderr);
    } catch (error) {
      setOutput('Erro: ' + error.message);
    }
  };

  return (
    <div className="App">
      <h1>Executar Comando Shell</h1>
      <input
        type="text"
        placeholder="Digite o comando"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
      />
      <button onClick={executeCommand}>Executar Comando</button>
      <div className="output">
        <strong>Saída do Comando:</strong>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default App;
