// Main App Component
const { useState, useEffect } = React;

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    
    // Handle navigation
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1) || 'home';
            setCurrentPage(hash);
        };
        
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Initial page load
        
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);
    
    // Render current page
    const renderPage = () => {
        switch(currentPage) {
            case 'gallery':
                return <GalleryPage />;
            case 'services':
                return <ServicesPage />;
            case 'contact':
                return <ContactPage />;
            default:
                return <HomePage />;
        }
    };
    
    return (
        <div>
            {renderPage()}
        </div>
    );
}

// Render the App
ReactDOM.render(<App />, document.getElementById('app'));