// theme
import ThemeProvider from './theme';
import Router from './routes'


function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
