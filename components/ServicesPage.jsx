const { useState, useEffect } = React;

function ServicesPage() {
    const [servicesData, setServicesData] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    
    // Fetch services data from internal JSON
    useEffect(() => {
        const fetchData = async () => {
            try {
                // In a real implementation, this would fetch from services.json
                const mockData = {
                    services: [
                        {
                            id: 1,
                            title: 'Wedding Photography',
                            description: 'Capture your special day with beautiful, timeless photographs.',
                            price: 1200,
                            features: ['Full day coverage', 'Second photographer', 'Online gallery', 'Print release']
                        },
                        {
                            id: 2,
                            title: 'Portrait Sessions',
                            description: 'Professional portraits for individuals, couples, and families.',
                            price: 300,
                            features: ['1-hour session', 'Multiple locations', 'Online gallery', '10 edited images']
                        },
                        {
                            id: 3,
                            title: 'Event Photography',
                            description: 'Document your corporate events, parties, and celebrations.',
                            price: 500,
                            features: ['Up to 4 hours coverage', 'Online gallery', 'Quick turnaround', 'Unlimited downloads']
                        }
                    ],
                    testimonials: [
                        {
                            id: 1,
                            text: "Naeshby captured our wedding day perfectly! The photos are absolutely stunning and bring back all the emotions of that special day.",
                            author: "Sarah & Michael"
                        },
                        {
                            id: 2,
                            text: "The family portrait session was so much fun! The photographer made us all feel comfortable and the results were beautiful.",
                            author: "The Johnson Family"
                        },
                        {
                            id: 3,
                            text: "Professional, creative, and delivered exactly what we wanted for our corporate event. Highly recommended!",
                            author: "TechSolutions Inc."
                        }
                    ]
                };
                
                setServicesData(mockData.services);
                setTestimonials(mockData.testimonials);
                
                // Real implementation:
                /*
                const response = await fetch('data/services.json');
                const data = await response.json();
                setServicesData(data.services);
                setTestimonials(data.testimonials);
                */
            } catch (error) {
                console.error('Error fetching services data:', error);
            }
        };
        
        fetchData();
    }, []);
    
    return (
        <section id="services" className="py-5">
            <div className="container">
                <h2 className="section-title text-center">Our Services</h2>
                
                {/* Services Cards */}
                <div className="row">
                    {servicesData.map(service => (
                        <div key={service.id} className="col-md-4 mb-4">
                            <div className="service-card">
                                <div className="card-body p-4 text-center">
                                    <div className="service-icon">
                                        <i className="fas fa-camera"></i>
                                    </div>
                                    <h4>{service.title}</h4>
                                    <p className="mb-4">{service.description}</p>
                                    <div className="price">${service.price}</div>
                                    <ul className="list-unstyled mb-4">
                                        {service.features.map((feature, index) => (
                                            <li key={index} className="mb-2">
                                                <i className="fas fa-check text-success me-2"></i>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <a href="#contact" className="btn btn-primary-custom">Book Now</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Testimonials */}
                <div className="mt-5">
                    <h3 className="text-center mb-4">What Our Clients Say</h3>
                    <div className="row">
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="col-md-4">
                                <div className="testimonial-card">
                                    <p className="testimonial-text">"{testimonial.text}"</p>
                                    <p className="testimonial-author">- {testimonial.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}