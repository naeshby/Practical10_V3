const { useState, useEffect } = React;

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: ''
    });
    const [contactMethod, setContactMethod] = useState('whatsapp');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    
    // Clear success message after 5 seconds
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clear errors when user starts typing
        if (errors.length > 0) {
            setErrors([]);
        }
    };
    
    const handleMethodChange = (method) => {
        setContactMethod(method);
        setErrors([]);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors([]);
        setSuccessMessage('');
        
        // Validate form data
        const validation = validateContactForm(formData);
        
        if (!validation.isValid) {
            setErrors(validation.errors);
            setIsSubmitting(false);
            return;
        }
        
        // Process based on selected method
        setTimeout(() => {
            try {
                switch (contactMethod) {
                    case 'whatsapp':
                        sendViaWhatsApp();
                        break;
                    case 'email':
                        sendViaEmail();
                        break;
                    case 'website':
                        sendViaWebsite();
                        break;
                    default:
                        sendViaWhatsApp();
                }
            } catch (error) {
                console.error('Error processing form:', error);
                setErrors(['An error occurred. Please try again.']);
            } finally {
                setIsSubmitting(false);
            }
        }, 1000); // Simulate processing time
    };
    
    const sendViaWhatsApp = () => {
        const whatsappUrl = generateWhatsAppUrl(formData);
        window.open(whatsappUrl, '_blank');
        setSuccessMessage('WhatsApp opened with your message! Please click send to complete your inquiry.');
        resetForm();
    };
    
    const sendViaEmail = () => {
        const emailUrl = generateEmailUrl(formData);
        window.location.href = emailUrl;
        setSuccessMessage('Your email client opened with a pre-filled message. Please send to complete your inquiry.');
        resetForm();
    };
    
    const sendViaWebsite = () => {
        // Simulate server submission
        console.log('Form data to be sent to server:', formData);
        
        // In a real implementation, you would send to your backend here
        // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
        
        setSuccessMessage('Thank you! Your message has been sent. We\'ll contact you within 24 hours.');
        resetForm();
    };
    
    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            service: '',
            message: ''
        });
    };
    
    const handleQuickContact = (method) => {
        switch (method) {
            case 'whatsapp':
                window.open(quickContactLinks.whatsapp, '_blank');
                break;
            case 'email':
                window.location.href = quickContactLinks.email;
                break;
            case 'phone':
                window.location.href = quickContactLinks.phone;
                break;
        }
    };
    
    const getSubmitButtonText = () => {
        if (isSubmitting) {
            return 'Processing...';
        }
        
        switch (contactMethod) {
            case 'whatsapp':
                return 'Send via WhatsApp';
            case 'email':
                return 'Send via Email';
            case 'website':
                return 'Submit Form';
            default:
                return 'Send Message';
        }
    };
    
    const getSubmitButtonIcon = () => {
        switch (contactMethod) {
            case 'whatsapp':
                return 'fab fa-whatsapp';
            case 'email':
                return 'fas fa-envelope';
            case 'website':
                return 'fas fa-paper-plane';
            default:
                return 'fas fa-paper-plane';
        }
    };
    
    const getSubmitButtonColor = () => {
        switch (contactMethod) {
            case 'whatsapp':
                return 'success';
            case 'email':
                return 'primary';
            case 'website':
                return 'secondary';
            default:
                return 'primary';
        }
    };

    return (
        <section id="contact" className="py-5">
            <div className="container">
                <h2 className="section-title text-center">Get In Touch</h2>
                
                {/* Success Message */}
                {successMessage && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <i className="fas fa-check-circle me-2"></i>
                        {successMessage}
                        <button title="Close"
                            type="button" 
                            className="btn-close" 
                            onClick={() => setSuccessMessage('')}
                        ></button>
                    </div>
                )}
                
                <div className="row">
                    <div className="col-lg-8 mb-4 mb-lg-0">
                        <div className="contact-form">
                            <h3 className="mb-4">Book Your Session</h3>
                            
                            {/* Contact Method Selection */}
                            <div className="mb-4">
                                <label className="form-label fw-bold">How would you like to contact us?</label>
                                <div className="row g-2">
                                    <div className="col-md-4">
                                        <input 
                                            type="radio" 
                                            className="btn-check" 
                                            name="contactMethod" 
                                            id="whatsappMethod" 
                                            checked={contactMethod === 'whatsapp'}
                                            onChange={() => handleMethodChange('whatsapp')}
                                        />
                                        <label className={`btn btn-outline-success w-100 ${contactMethod === 'whatsapp' ? 'active' : ''}`} htmlFor="whatsappMethod">
                                            <i className="fab fa-whatsapp me-2"></i>WhatsApp
                                        </label>
                                    </div>
                                    <div className="col-md-4">
                                        <input 
                                            type="radio" 
                                            className="btn-check" 
                                            name="contactMethod" 
                                            id="emailMethod" 
                                            checked={contactMethod === 'email'}
                                            onChange={() => handleMethodChange('email')}
                                        />
                                        <label className={`btn btn-outline-primary w-100 ${contactMethod === 'email' ? 'active' : ''}`} htmlFor="emailMethod">
                                            <i className="fas fa-envelope me-2"></i>Email
                                        </label>
                                    </div>
                                    <div className="col-md-4">
                                        <input 
                                            type="radio" 
                                            className="btn-check" 
                                            name="contactMethod" 
                                            id="websiteMethod" 
                                            checked={contactMethod === 'website'}
                                            onChange={() => handleMethodChange('website')}
                                        />
                                        <label className={`btn btn-outline-secondary w-100 ${contactMethod === 'website' ? 'active' : ''}`} htmlFor="websiteMethod">
                                            <i className="fas fa-globe me-2"></i>Website Form
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Method Description */}
                            <div className="alert alert-info mb-4">
                                <div className="d-flex align-items-start">
                                    <i className={`fas ${
                                        contactMethod === 'whatsapp' ? 'fa-comments' : 
                                        contactMethod === 'email' ? 'fa-envelope-open' : 
                                        'fa-headset'
                                    } me-3 mt-1`}></i>
                                    <div>
                                        <h6 className="mb-1">
                                            {contactMethod === 'whatsapp' && 'Instant WhatsApp Message'}
                                            {contactMethod === 'email' && 'Direct Email'}
                                            {contactMethod === 'website' && 'Website Contact Form'}
                                        </h6>
                                        <p className="mb-0 small">
                                            {contactMethod === 'whatsapp' && 'Get instant responses via WhatsApp. Perfect for quick questions and fast communication.'}
                                            {contactMethod === 'email' && 'Send us a detailed email. Great for complex inquiries and attaching reference images.'}
                                            {contactMethod === 'website' && 'Submit through our secure form. We\'ll get back to you within 24 hours.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Validation Errors */}
                            {errors.length > 0 && (
                                <div className="alert alert-danger">
                                    <h6 className="mb-2">
                                        <i className="fas fa-exclamation-triangle me-2"></i>
                                        Please fix the following:
                                    </h6>
                                    <ul className="mb-0">
                                        {errors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="name" className="form-label">Your Name *</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="name" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            required 
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="email" className="form-label">Email Address *</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your.email@example.com"
                                            required 
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="service" className="form-label">Service Interested In *</label>
                                    <select 
                                        className="form-select" 
                                        id="service" 
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select a service</option>
                                        <option value="Wedding Photography">Wedding Photography</option>
                                        <option value="Engagement Session">Engagement Session</option>
                                        <option value="Portrait Session">Portrait Session</option>
                                        <option value="Family Photography">Family Photography</option>
                                        <option value="Event Photography">Event Photography</option>
                                        <option value="Commercial Photography">Commercial Photography</option>
                                        <option value="Other">Other Service</option>
                                    </select>
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="message" className="form-label">Message *</label>
                                    <textarea 
                                        className="form-control" 
                                        id="message" 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="6" 
                                        placeholder={`Tell us about your photography needs...${
                                            contactMethod === 'website' ? 
                                            ' Include details like date, location, number of people, and any specific requirements.' :
                                            ''
                                        }`}
                                        required
                                        disabled={isSubmitting}
                                    ></textarea>
                                    <div className="form-text">
                                        Minimum 10 characters. {
                                            contactMethod === 'website' ?
                                            'The more details you provide, the better we can assist you.' :
                                            'This message will be pre-filled in your selected app.'
                                        }
                                    </div>
                                </div>
                                
                                {/* Submit Button */}
                                <div className="d-grid">
                                    <button 
                                        type="submit" 
                                        className={`btn btn-${getSubmitButtonColor()} btn-lg`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <i className={`${getSubmitButtonIcon()} me-2`}></i>
                                                {getSubmitButtonText()}
                                            </>
                                        )}
                                    </button>
                                </div>
                                
                                {/* Help Text */}
                                <div className="mt-3 text-center">
                                    <small className="text-muted">
                                        <i className="fas fa-info-circle me-1"></i>
                                        {contactMethod === 'whatsapp' && 'You\'ll be redirected to WhatsApp. Make sure to click "Send" to complete your message.'}
                                        {contactMethod === 'email' && 'Your default email app will open with a pre-filled message. Click send to complete.'}
                                        {contactMethod === 'website' && 'Your message will be sent securely through our website. We respond within 24 hours.'}
                                    </small>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    {/* Contact Information Sidebar */}
                    <div className="col-lg-4">
                        <h3 className="mb-4">Contact Information</h3>
                        
                        {/* Quick Contact Cards */}
                        <div className="mb-4">
                            <h5 className="mb-3">Quick Contact</h5>
                            
                            {/* WhatsApp Card */}
                            <div className="card border-success mb-3">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-success bg-opacity-10 p-3 rounded me-3">
                                            <i className="fab fa-whatsapp fa-2x text-success"></i>
                                        </div>
                                        <div>
                                            <h5 className="card-title mb-0">WhatsApp</h5>
                                            <small className="text-muted">Instant messaging</small>
                                        </div>
                                    </div>
                                    <p className="card-text small mb-3">Get quick answers and instant responses for urgent inquiries.</p>
                                    <button 
                                        className="btn btn-success w-100"
                                        onClick={() => handleQuickContact('whatsapp')}
                                    >
                                        <i className="fab fa-whatsapp me-2"></i>
                                        Message Now
                                    </button>
                                </div>
                            </div>
                            
                            {/* Email Card */}
                            <div className="card border-primary mb-3">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
                                            <i className="fas fa-envelope fa-2x text-primary"></i>
                                        </div>
                                        <div>
                                            <h5 className="card-title mb-0">Email</h5>
                                            <small className="text-muted">Detailed inquiries</small>
                                        </div>
                                    </div>
                                    <p className="card-text small mb-3">Perfect for detailed questions, quotes, and attaching reference images.</p>
                                    <button 
                                        className="btn btn-primary w-100"
                                        onClick={() => handleQuickContact('email')}
                                    >
                                        <i className="fas fa-envelope me-2"></i>
                                        Send Email
                                    </button>
                                </div>
                            </div>
                            
                            {/* Phone Card */}
                            <div className="card border-info">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-info bg-opacity-10 p-3 rounded me-3">
                                            <i className="fas fa-phone fa-2x text-info"></i>
                                        </div>
                                        <div>
                                            <h5 className="card-title mb-0">Phone</h5>
                                            <small className="text-muted">Direct conversation</small>
                                        </div>
                                    </div>
                                    <p className="card-text small mb-3">Speak directly with our team for immediate assistance.</p>
                                    <a 
                                        href="tel:+918264768346" 
                                        className="btn btn-info w-100"
                                    >
                                        <i className="fas fa-phone me-2"></i>
                                        Call Now
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        {/* Business Information */}
                        <div className="bg-light p-4 rounded">
                            <h5 className="mb-3">
                                <i className="fas fa-clock me-2"></i>
                                Business Hours
                            </h5>
                            <div className="mb-2">
                                <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                            </div>
                            <div className="mb-2">
                                <strong>Saturday:</strong> 10:00 AM - 4:00 PM
                            </div>
                            <div className="mb-3">
                                <strong>Sunday:</strong> Closed
                            </div>
                            
                            <h5 className="mb-3 mt-4">
                                <i className="fas fa-map-marker-alt me-2"></i>
                                Studio Location
                            </h5>
                            <p className="mb-0">
                                somwhere in the world, Earth
                                <br />
                                Naeshby studio
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}