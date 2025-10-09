// API functions for the photography website

// Fetch weather data from external API
const fetchWeatherData = async () => {
    try {
        // Using a free weather API (Open-Meteo) that doesn't require an API key
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=22&longitude=79&current=temperature_2m,weather_code&temperature_unit=celsius');
        if (!response.ok) {
            throw new Error('Weather data fetch failed');
        }
        const data = await response.json();
        
        return {
            temperature: Math.round(data.current.temperature_2m),
            description: getWeatherDescription(data.current.weather_code),
            icon: getWeatherIcon(data.current.weather_code),
            city: "Ludhiana"
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Return mock data as fallback
        return {
            temperature: 27,
            description: "Sunny",
            icon: "☀️",
            city: "Ludiana"
        };
    }
};

// Fetch gallery data
const fetchGalleryData = async () => {
    try {
        // Using placeholder images from placehold.co with different categories
        const galleryData = [
            { 
                id: 1, 
                category: 'wedding', 
                title: 'Wedding Photography', 
                image: 'https://placehold.co/600x400/4A306D/FFFFFF?text=Wedding+Photo&font=oswald' 
            },
            { 
                id: 2, 
                category: 'portrait', 
                title: 'Portrait Session', 
                image: 'https://placehold.co/600x400/1A535C/FFFFFF?text=Portrait+Session&font=oswald' 
            },
            { 
                id: 3, 
                category: 'event', 
                title: 'Corporate Event', 
                image: 'https://placehold.co/600x400/4ECDC4/000000?text=Corporate+Event&font=oswald' 
            },
            { 
                id: 4, 
                category: 'nature', 
                title: 'Nature Photography', 
                image: 'https://placehold.co/600x400/45B69C/FFFFFF?text=Nature+Photo&font=oswald' 
            },
            { 
                id: 5, 
                category: 'wedding', 
                title: 'Outdoor Wedding', 
                image: 'https://placehold.co/600x400/6A4C93/FFFFFF?text=Outdoor+Wedding&font=oswald' 
            },
            { 
                id: 6, 
                category: 'portrait', 
                title: 'Family Portrait', 
                image: 'https://placehold.co/600x400/1A535C/FFFFFF?text=Family+Portrait&font=oswald' 
            },
            { 
                id: 7, 
                category: 'event', 
                title: 'Birthday Celebration', 
                image: 'https://placehold.co/600x400/F4A261/000000?text=Birthday+Party&font=oswald' 
            },
            { 
                id: 8, 
                category: 'nature', 
                title: 'Landscape', 
                image: 'https://placehold.co/600x400/2A9D8F/FFFFFF?text=Landscape&font=oswald' 
            }
        ];
        
        return galleryData;
    } catch (error) {
        console.error('Error fetching gallery data:', error);
        return [];
    }
};

// Helper function to get weather description from weather code
const getWeatherDescription = (weatherCode) => {
    const weatherMap = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Foggy',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        80: 'Rain showers',
        81: 'Rain showers',
        82: 'Violent rain showers',
        95: 'Thunderstorm'
    };
    return weatherMap[weatherCode] || 'Unknown';
};

// Helper function to get weather icon from weather code
const getWeatherIcon = (weatherCode) => {
    const iconMap = {
        0: '☀️',  // Clear sky
        1: '🌤️',  // Mainly clear
        2: '⛅',  // Partly cloudy
        3: '☁️',  // Overcast
        45: '🌫️', // Fog
        48: '🌫️', // Fog
        51: '🌦️', // Drizzle
        53: '🌦️', // Drizzle
        55: '🌦️', // Drizzle
        61: '🌧️', // Rain
        63: '🌧️', // Rain
        65: '🌧️', // Rain
        80: '🌦️', // Rain showers
        81: '🌦️', // Rain showers
        82: '⛈️',  // Violent rain showers
        95: '⛈️'   // Thunderstorm
    };
    return iconMap[weatherCode] || '🌈';
};

// Contact and WhatsApp integration functions

// WhatsApp message formatting
const formatWhatsAppMessage = (formData) => {
    return `New Photography Inquiry

Name: ${formData.name}
Email: ${formData.email}
Service: ${formData.service}
Message: ${formData.message}

Sent from Naeshby Photography Website`.trim();
};

// Email message formatting
const formatEmailMessage = (formData) => {
    return `New Photography Inquiry

Name: ${formData.name}
Email: ${formData.email}
Service: ${formData.service}
Message: ${formData.message}

This inquiry was sent from the Naeshby Photography website.`.trim();
};

// Generate WhatsApp URL
const generateWhatsAppUrl = (formData) => {
    const message = formatWhatsAppMessage(formData);
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '918264768346'; // REPLACE WITH YOUR NUMBER
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

// Generate Email URL
const generateEmailUrl = (formData) => {
    const subject = `New Photography Inquiry from ${formData.name}`;
    const body = formatEmailMessage(formData);
    return `mailto:indianaeshby@gmail.com.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// Form validation
const validateContactForm = (formData) => {
    const errors = [];
    
    if (!formData.name?.trim()) {
        errors.push('Name is required');
    }
    
    if (!formData.email?.trim()) {
        errors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.service?.trim()) {
        errors.push('Please select a service');
    }
    
    if (!formData.message?.trim()) {
        errors.push('Message is required');
    } else if (formData.message.trim().length < 10) {
        errors.push('Please provide a more detailed message (at least 10 characters)');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
};

// Quick contact links
const quickContactLinks = {
    whatsapp: 'https://wa.me/1234567890?text=Hello%20Naeshby%20Photography!%20I%20would%20like%20to%20inquire%20about%20your%20services.',
    email: 'mailto:info@Naeshby.com?subject=Photography%20Inquiry&body=Hello%2C%20I%20would%20like%20more%20information%20about%20your%20photography%20services.',
    phone: 'tel:+11234567890'
};