document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loader = document.getElementById('loader');
    const resultSection = document.getElementById('resultSection');
    const sentimentValue = document.getElementById('sentimentValue');
    const confidenceBar = document.getElementById('confidenceBar');
    const confidenceValue = document.getElementById('confidenceValue');
    const reasonText = document.getElementById('reasonText');
    const resetBtn = document.getElementById('resetBtn');
    const currentDate = document.getElementById('currentDate');

    // Set current date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.textContent = new Date().toLocaleDateString('ko-KR', options);

    analyzeBtn.addEventListener('click', async () => {
        const text = textInput.value.trim();

        if (!text) {
            alert('분석할 내용을 입력해주세요.');
            return;
        }

        // UI State
        analyzeBtn.disabled = true;
        loader.style.display = 'block';
        analyzeBtn.querySelector('span').textContent = '분석 중...';

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error('분석 요청에 실패했습니다.');
            }

            const data = await response.json();

            // Display Results
            displayResults(data);
        } catch (error) {
            console.error('Error:', error);
            alert('오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            analyzeBtn.disabled = false;
            loader.style.display = 'none';
            analyzeBtn.querySelector('span').textContent = '분석 시작하기';
        }
    });

    resetBtn.addEventListener('click', () => {
        textInput.value = '';
        resultSection.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function displayResults(data) {
        sentimentValue.textContent = data.sentiment;
        confidenceValue.textContent = `${data.confidence}%`;
        reasonText.textContent = data.reason;

        // Reset progress bar then animate
        confidenceBar.style.width = '0%';
        resultSection.classList.remove('hidden');

        // Scroll to result
        setTimeout(() => {
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                confidenceBar.style.width = `${data.confidence}%`;
            }, 100);
        }, 100);

        // Adjust color based on sentiment
        if (data.sentiment.toLowerCase().includes('positive') || data.sentiment.includes('긍정')) {
            sentimentValue.style.color = '#2f82a2'; // Subtle blue for positive (optional contrast)
        } else if (data.sentiment.toLowerCase().includes('negative') || data.sentiment.includes('부정')) {
            sentimentValue.style.color = '#a23a2f'; // Red for negative
        } else {
            sentimentValue.style.color = '#1f1a17'; // Neutral
        }
    }
});
