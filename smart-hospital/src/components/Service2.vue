<template>
    <div class="service2-container">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        
        <h2>What to Expect During Your Dental Consultation</h2>
        <ul>
            <li>Thorough dental examination</li>
            <li>Discussion of your dental history</li>
            <li>X-rays as needed</li>
            <li>Teeth cleaning and polishing</li>
            <li>Recommendations for oral hygiene practices</li>
            <li>Follow-up care or referrals if necessary</li>
        </ul>
    
        <h2>Frequently Asked Questions</h2>
        <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
            <h3>{{ faq.question }}</h3>
            <p>{{ faq.answer }}</p>
        </div>
        
        <router-link to="/appointment" class="btn-appointment">Book an Appointment</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: 'Dental Consultation',
            description: 'A dental consultation is an important visit to evaluate your oral health, address any concerns, and maintain your smile.',
            faqs: [
                {
                    question: 'How often should I visit the dentist?',
                    answer: 'It is generally recommended to visit the dentist every six months for regular check-ups and cleanings.'
                },
                {
                    question: 'What should I expect during my first dental appointment?',
                    answer: 'During your first appointment, the dentist will perform a comprehensive examination and may take X-rays to assess your dental health.'
                }
            ]
        };
    }
}
</script>

<style scoped>
.service2-container {
    padding: 20px;
}

h1 {
    color: #333;
}

h2 {
    color: #555;
}

ul {
    list-style-type: disc;
    margin-left: 20px;
}

.faq-item {
    margin-top: 10px;
}

.btn-appointment {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}
</style>