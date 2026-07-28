import React, { useState } from 'react';

const Support = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will respond within 24 hours.');
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Customer Support</h1>
            <p style={styles.subtitle}>Have questions? We're here to help.</p>
            
            <div style={styles.content}>
                <div style={styles.info}>
                    <h3 style={styles.infoTitle}>Contact Information</h3>
                    <p style={styles.infoItem}><strong>Email:</strong> support@cube.com</p>
                    <p style={styles.infoItem}><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p style={styles.infoItem}><strong>Hours:</strong> Mon-Fri, 9AM-6PM EST</p>
                </div>
                
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                        style={styles.input}
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                        style={styles.input}
                    />
                    <textarea
                        placeholder="Your Message"
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        required
                        rows="6"
                        style={styles.textarea}
                    />
                    <button type="submit" style={styles.btn}>Send Message</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: { maxWidth: '1000px', margin: '0 auto', padding: '50px' },
    title: { fontSize: '36px', fontWeight: '700', marginBottom: '15px', textAlign: 'center' },
    subtitle: { textAlign: 'center', color: '#666', marginBottom: '60px', fontSize: '18px' },
    content: { display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px' },
    info: { background: '#f9f9f9', padding: '40px' },
    infoTitle: { fontSize: '20px', fontWeight: '600', marginBottom: '25px' },
    infoItem: { marginBottom: '15px', fontSize: '15px' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    input: { padding: '15px', border: '1px solid #ddd', fontSize: '15px' },
    textarea: { padding: '15px', border: '1px solid #ddd', fontSize: '15px', resize: 'vertical' },
    btn: { background: '#000', color: '#fff', padding: '18px', border: 'none', fontSize: '16px', fontWeight: '600', textTransform: 'uppercase' }
};

export default Support;
