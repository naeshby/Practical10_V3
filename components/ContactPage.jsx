const { useState } = React;

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real implementation, this would send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({
            name: '',
            email: '',
            service: '',
            message: ''
        });
    };
    
    return (
        <section id="contact" className="py-5">
            <div className="container">
                <h2 className="section-title text-center">Get In Touch</h2>
                
                <div className="row">
                    <div className="col-md-8 mb-4 mb-md-0">
                        <div className="contact-form">
                            <h3 className="mb-4">Book Your Session</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="name" className="form-label">Your Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="name" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required 
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="service" className="form-label">Service Interested In</label>
                                    <select 
                                        className="form-select" 
                                        id="service" 
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a service</option>
                                        <option value="wedding">Wedding Photography</option>
                                        <option value="portrait">Portrait Session</option>
                                        <option value="event">Event Photography</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea 
                                        className="form-control" 
                                        id="message" 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5" 
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary-custom">Send Message</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h3 className="mb-4">Contact Information</h3>
                        <div className="mb-4">
                            <h5><i className="fas fa-map-marker-alt me-2"></i> Address</h5>
                            <p>123 Photography St, City, State 12345</p>
                        </div>
                        <div className="mb-4">
                            <h5><i className="fas fa-phone me-2"></i> Phone</h5>
                            <p>(123) 456-7890</p>
                        </div>
                        <div className="mb-4">
                            <h5><i className="fas fa-envelope me-2"></i> Email</h5>
                            <p>info@focusframe.com</p>
                        </div>
                        <div className="mb-4">
                            <h5><i className="fas fa-clock me-2"></i> Business Hours</h5>
                            <p>Monday - Friday: 9am - 6pm</p>
                            <p>Saturday: 10am - 4pm</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}