import React, { useState } from 'react';

const EnvironmentEditor = () => {
  const [envVars, setEnvVars] = useState({
    // App Configuration
    REACT_APP_NAME: 'Time Management Toolkit',
    REACT_APP_VERSION: '1.0.0',
    REACT_APP_DESCRIPTION: 'Master your workload and learn to say no with confidence',
    
    // Build Configuration
    GENERATE_SOURCEMAP: 'false',
    DISABLE_ESLINT_PLUGIN: 'false',
    SKIP_PREFLIGHT_CHECK: 'true',
    
    // Development Settings
    FAST_REFRESH: 'true',
    BROWSER: 'none',
    
    // Deployment Settings
    NODE_ENV: 'production',
    NPM_CONFIG_PRODUCTION: 'false',
    CI: 'false',
    
    // Optional Features
    REACT_APP_ENABLE_PWA: 'true',
    REACT_APP_ENABLE_OFFLINE: 'false',
    REACT_APP_ENABLE_NOTIFICATIONS: 'false',
    
    // Customization
    REACT_APP_THEME_COLOR: '#4facfe',
    REACT_APP_BACKGROUND_COLOR: '#ffffff'
  });

  const [customVar, setCustomVar] = useState({ key: '', value: '' });

  const envCategories = {
    'App Configuration': ['REACT_APP_NAME', 'REACT_APP_VERSION', 'REACT_APP_DESCRIPTION'],
    'Build Settings': ['GENERATE_SOURCEMAP', 'DISABLE_ESLINT_PLUGIN', 'SKIP_PREFLIGHT_CHECK'],
    'Development': ['FAST_REFRESH', 'BROWSER'],
    'Deployment': ['NODE_ENV', 'NPM_CONFIG_PRODUCTION', 'CI'],
    'Features': ['REACT_APP_ENABLE_PWA', 'REACT_APP_ENABLE_OFFLINE', 'REACT_APP_ENABLE_NOTIFICATIONS'],
    'Styling': ['REACT_APP_THEME_COLOR', 'REACT_APP_BACKGROUND_COLOR']
  };

  const updateEnvVar = (key, value) => {
    setEnvVars(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const addCustomVar = () => {
    if (customVar.key && customVar.value) {
      setEnvVars(prev => ({
        ...prev,
        [customVar.key]: customVar.value
      }));
      setCustomVar({ key: '', value: '' });
    }
  };

  const removeVar = (key) => {
    setEnvVars(prev => {
      const newVars = { ...prev };
      delete newVars[key];
      return newVars;
    });
  };

  const generateEnvFile = () => {
    let content = '# Time Management Toolkit - Environment Variables\n';
    content += '# Generated on ' + new Date().toLocaleString() + '\n\n';
    
    Object.entries(envCategories).forEach(([category, keys]) => {
      content += `# ${category}\n`;
      keys.forEach(key => {
        if (envVars[key] !== undefined) {
          content += `${key}=${envVars[key]}\n`;
        }
      });
      content += '\n';
    });

    // Add any custom variables
    const customKeys = Object.keys(envVars).filter(key => 
      !Object.values(envCategories).flat().includes(key)
    );
    
    if (customKeys.length > 0) {
      content += '# Custom Variables\n';
      customKeys.forEach(key => {
        content += `${key}=${envVars[key]}\n`;
      });
    }

    return content;
  };

  const downloadEnvFile = () => {
    const content = generateEnvFile();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', '.env.local');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateHerokuCommands = () => {
    const commands = Object.entries(envVars)
      .filter(([key]) => key.startsWith('REACT_APP_') || ['NODE_ENV', 'NPM_CONFIG_PRODUCTION'].includes(key))
      .map(([key, value]) => `heroku config:set ${key}="${value}"`)
      .join('\n');
    
    return commands;
  };

  const copyHerokuCommands = () => {
    const commands = generateHerokuCommands();
    navigator.clipboard.writeText(commands).then(() => {
      alert('Heroku commands copied to clipboard!');
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">🔧 Environment Configuration Editor</h1>
        <p className="text-lg text-gray-600">
          Configure environment variables for your Time Management Toolkit deployment.
        </p>
      </div>

      {/* Environment Variables by Category */}
      <div className="space-y-8">
        {Object.entries(envCategories).map(([category, keys]) => (
          <div key={category} className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keys.map(key => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {key}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={envVars[key] || ''}
                      onChange={(e) => updateEnvVar(key, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter value..."
                    />
                    <button
                      onClick={() => removeVar(key)}
                      className="px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Variable */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">➕ Add Custom Variable</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={customVar.key}
            onChange={(e) => setCustomVar(prev => ({ ...prev, key: e.target.value }))}
            placeholder="Variable name (e.g., REACT_APP_API_URL)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={customVar.value}
            onChange={(e) => setCustomVar(prev => ({ ...prev, value: e.target.value }))}
            placeholder="Variable value"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCustomVar}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={downloadEnvFile}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          📄 Download .env.local
        </button>
        
        <button
          onClick={copyHerokuCommands}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          🚀 Copy Heroku Commands
        </button>
      </div>

      {/* Preview */}
      <div className="mt-8">
        <details className="bg-gray-50 rounded-xl p-6">
          <summary className="text-lg font-semibold text-gray-900 cursor-pointer mb-4">
            📋 Preview Generated Files
          </summary>
          
          <div className="space-y-6">
            {/* .env file preview */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2">.env.local Preview:</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                {generateEnvFile()}
              </pre>
            </div>
            
            {/* Heroku commands preview */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2">Heroku Commands:</h3>
              <pre className="bg-gray-900 text-yellow-400 p-4 rounded-lg overflow-x-auto text-sm">
                {generateHerokuCommands()}
              </pre>
            </div>
          </div>
        </details>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">📚 How to Use</h3>
        <div className="space-y-2 text-blue-700">
          <p><strong>For Local Development:</strong></p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Click "Download .env.local" to get your environment file</li>
            <li>Place the file in your project root directory</li>
            <li>Restart your development server: <code className="bg-blue-100 px-2 py-1 rounded">npm run dev</code></li>
          </ol>
          
          <p className="mt-4"><strong>For Heroku Deployment:</strong></p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Click "Copy Heroku Commands" to get the config commands</li>
            <li>Run the commands in your terminal to set Heroku environment variables</li>
            <li>Deploy your app: <code className="bg-blue-100 px-2 py-1 rounded">git push heroku main</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentEditor;