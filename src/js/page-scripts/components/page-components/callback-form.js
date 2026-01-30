export function initCallbackForm({ selector, endpoint } = {}) {
    if (!selector || !endpoint) return;

    const form = document.querySelector(selector);
    if (!form) return;

    const errorEl = form.querySelector('.error-message');
    const submitBtn = form.querySelector('button[type="submit"]');

    const normalize = (v) => v.replace(/\s+/g, ' ').trim();

    const setState = (state, message = '') => {
        form.classList.remove('is-loading', 'is-error', 'is-success');
        if (errorEl) errorEl.textContent = '';

        if (state === 'loading') form.classList.add('is-loading');
        if (state === 'error') {
            form.classList.add('is-error');
            if (errorEl) errorEl.textContent = message || 'Ошибка отправки. Попробуйте позже.';
        }
        if (state === 'success') form.classList.add('is-success');
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        form.classList.add('is-validated');
        if (!form.checkValidity()) {
            form.reportValidity?.();
            return;
        }
        setState('loading');

        try {
            const formData = new FormData(form);

            for (const [key, value] of formData.entries()) {
                if (typeof value === 'string') formData.set(key, normalize(value));
            }

            if (!form.checkValidity()) {
                form.reportValidity?.();
                setState(null);
                return;
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'fetch'
                }
            });

            const text = await response.text();

            if (!response.ok) {
                throw new Error(text || `HTTP ${response.status}`);
            }

            if (text.trim().toLowerCase() !== 'ok') {
                throw new Error(text);
            }

            setState('success');
            form.reset();
            form.classList.remove('is-validated');

            setTimeout(() => form.classList.remove('is-success'), 4500);

        } catch (err) {
            console.error(err);
            setState('error', 'Ошибка отправки. Попробуйте позже.');
        } finally {
            form.classList.remove('is-loading');
            submitBtn?.blur();
        }
    });
}