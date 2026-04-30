// Funcionalidades interativas básicas
document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling para os links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Ajuste para o header fixo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar classe ao header ao rolar a página (para efeito visual)
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
    });

    // Animação de reveal para elementos ao rolar (opcional, pode expandir depois)
    const revealElements = document.querySelectorAll('.benefit-card, .step, .diff-item');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    // Configurar estado inicial e observar
    revealElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        revealObserver.observe(el);
    });

    // Form Validation and Masking
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        const nome = document.getElementById('nome');
        const cpf = document.getElementById('cpf');
        const celular = document.getElementById('celular');
        const email = document.getElementById('email');
        const termos = document.getElementById('termos');
        const contato = document.getElementById('contato');
        const submitBtn = document.getElementById('submitBtn');

        // Masks
        cpf.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            if (value.length > 9) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            } else if (value.length > 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
            } else if (value.length > 3) {
                value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
            }
            e.target.value = value;
            checkForm();
        });

        celular.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            if (value.length > 10) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
            } else if (value.length > 6) {
                value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
            } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d{1,5})/, "($1) $2");
            }
            e.target.value = value;
            checkForm();
        });

        // Validation
        const checkForm = () => {
            const isValid = nome.value.trim().length > 3 &&
                            cpf.value.replace(/\D/g, '').length === 11 &&
                            celular.value.replace(/\D/g, '').length >= 10 &&
                            email.value.includes('@') && email.value.includes('.') &&
                            termos.checked &&
                            contato.checked;
            
            submitBtn.disabled = !isValid;
        };

        [nome, email, termos, contato].forEach(el => {
            el.addEventListener('input', checkForm);
            el.addEventListener('change', checkForm);
        });

        // Submit
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = `Iniciar Atendimento`;
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/5511999999999?text=${encodedText}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});
