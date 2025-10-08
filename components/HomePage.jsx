const { useState, useEffect } = React;

function HomePage() {
    const [weatherData, setWeatherData] = useState(null);
    
    // Fetch weather data from external API
    useEffect(() => {
        const getWeatherData = async () => {
            const data = await fetchWeatherData();
            setWeatherData(data);
        };
        
        getWeatherData();
    }, []);
    
    return (
        <div>
            {/* Hero Section */}
            <section id="home" className="hero-section">
                <div className="container">
                    <h1 className="display-4 fw-bold mb-4">Capture Your Precious Moments</h1>
                    <p className="lead mb-4">Professional photography services for weddings, portraits, events, and more.</p>
                    <a href="#contact" className="btn btn-primary-custom btn-lg">Book a Session</a>
                </div>
            </section>
            
            {/* About Section */}
            <section className="py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <h2 className="section-title">About FocusFrame</h2>
                            <p>With over 10 years of experience, FocusFrame Photography specializes in capturing life's most precious moments. Our team of professional photographers is dedicated to creating stunning images that tell your unique story.</p>
                            <p>We believe that every moment is worth preserving, and we're passionate about creating beautiful, timeless photographs that you'll cherish for years to come.</p>
                            <a href="#services" className="btn btn-primary-custom mt-3">Our Services</a>
                        </div>
                        <div className="col-md-6">
                            <img src="https://placehold.co/600x400" alt="About FocusFrame" className="img-fluid rounded shadow" />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Featured Gallery */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="section-title text-center">Featured Work</h2>
                    <div className="gallery-grid">
                        <div className="gallery-item">
                            <img src="https://placehold.co/400x300" alt="Wedding Photography" />
                            <div className="p-3">
                                <h5 className="mb-0">Wedding Photography</h5>
                            </div>
                        </div>
                        <div className="gallery-item">
                            <img src="https://placehold.co/400x300" alt="Portrait Photography" />
                            <div className="p-3">
                                <h5 className="mb-0">Portrait Session</h5>
                            </div>
                        </div>
                        <div className="gallery-item">
                            <img src="https://placehold.co/400x300" alt="Event Photography" />
                            <div className="p-3">
                                <h5 className="mb-0">Corporate Event</h5>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <a href="#gallery" className="btn btn-primary-custom">View Full Gallery</a>
                    </div>
                </div>
            </section>
            
            {/* Weather Widget */}
            <section className="py-5">
                <div className="container">
                    <h2 className="section-title text-center">Perfect Conditions for Photography</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="weather-widget text-center">
                                <h3>Current Weather</h3>
                                {weatherData ? (
                                    <div>
                                        <div className="weather-icon">{weatherData.icon}</div>
                                        <div className="temperature">{weatherData.temperature}°C</div>
                                        <div className="weather-description">{weatherData.description}</div>
                                        <div className="city">{weatherData.city}</div>
                                    </div>
                                ) : (
                                    <p>Loading weather data...</p>
                                )}
                                <p className="mt-3">Great weather for outdoor photoshoots!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}