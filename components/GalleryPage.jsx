const { useState, useEffect } = React;

function GalleryPage() {
    const [galleryData, setGalleryData] = useState([]);
    const [filter, setFilter] = useState('all');
    
    // Fetch gallery data from internal JSON
    useEffect(() => {
        const getGalleryData = async () => {
            const data = await fetchGalleryData();
            setGalleryData(data);
        };
        
        getGalleryData();
    }, []);
    
    const filteredGallery = filter === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === filter);
    
    return (
        <section id="gallery" className="py-5">
            <div className="container">
                <h2 className="section-title text-center">Our Gallery</h2>
                
                {/* Filter Buttons */}
                <div className="d-flex justify-content-center flex-wrap mb-4">
                    <button 
                        className={`btn ${filter === 'all' ? 'btn-primary-custom' : 'btn-outline-secondary'} m-1`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button 
                        className={`btn ${filter === 'wedding' ? 'btn-primary-custom' : 'btn-outline-secondary'} m-1`}
                        onClick={() => setFilter('wedding')}
                    >
                        Wedding
                    </button>
                    <button 
                        className={`btn ${filter === 'portrait' ? 'btn-primary-custom' : 'btn-outline-secondary'} m-1`}
                        onClick={() => setFilter('portrait')}
                    >
                        Portrait
                    </button>
                    <button 
                        className={`btn ${filter === 'event' ? 'btn-primary-custom' : 'btn-outline-secondary'} m-1`}
                        onClick={() => setFilter('event')}
                    >
                        Events
                    </button>
                    <button 
                        className={`btn ${filter === 'nature' ? 'btn-primary-custom' : 'btn-outline-secondary'} m-1`}
                        onClick={() => setFilter('nature')}
                    >
                        Nature
                    </button>
                </div>
                
                {/* Gallery Grid */}
                <div className="gallery-grid">
                    {filteredGallery.map(item => (
                        <div key={item.id} className="gallery-item">
                            <img src={item.image} alt={item.title} />
                            <div className="p-3">
                                <h5 className="mb-0">{item.title}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}