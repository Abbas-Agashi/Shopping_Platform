import React from 'react';

const Policy = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Return & Exchange Policy</h1>
            
            <div style={styles.content}>
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>30-Day Return Policy</h2>
                    <p style={styles.text}>
                        We offer a 30-day return policy on all items. Items must be unworn, unwashed, 
                        and in original packaging with tags attached.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>How to Return</h2>
                    <ol style={styles.list}>
                        <li>Contact our support team at support@cube.com</li>
                        <li>Receive a return authorization number</li>
                        <li>Ship the item back to our warehouse</li>
                        <li>Refund will be processed within 5-7 business days</li>
                    </ol>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Exchanges</h2>
                    <p style={styles.text}>
                        We offer free exchanges for size changes. Contact us within 30 days of 
                        receiving your order to initiate an exchange.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Shipping</h2>
                    <p style={styles.text}>
                        All orders are delivered within 7 days. Free shipping on orders over $100.
                        Express shipping available at checkout.
                    </p>
                </section>
            </div>
        </div>
    );
};

const styles = {
    container: { maxWidth: '900px', margin: '0 auto', padding: '50px' },
    title: { fontSize: '36px', fontWeight: '700', marginBottom: '60px', textAlign: 'center', letterSpacing: '2px' },
    content: { display: 'flex', flexDirection: 'column', gap: '50px' },
    section: { borderBottom: '1px solid #eee', paddingBottom: '40px' },
    sectionTitle: { fontSize: '26px', fontWeight: '600', marginBottom: '20px' },
    text: { fontSize: '20px', lineHeight: '1.8', color: '#555' },
    list: { fontSize: '20px', lineHeight: '2', color: '#555', paddingLeft: '20px' }
};

export default Policy;
