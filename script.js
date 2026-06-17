document.addEventListener('DOMContentLoaded', () => {
  // --- ANIMATED HERO TEXT ---
  const words = ["Sem Frescura", "Na Prática", "Sem Enrolação"];
  const textContainer = document.getElementById('animated-text-container');

  if (textContainer) {
    words.forEach((word, index) => {
      const span = document.createElement('span');
      // Classe base + inicia como entering se não for a primeira
      const baseClass = 'animated-word font-serif italic font-normal text-zait-mint tracking-normal ';
      span.className = baseClass + (index === 0 ? 'word-active' : 'word-entering');
      span.textContent = word;
      textContainer.appendChild(span);
    });

    const wordElements = textContainer.querySelectorAll('.animated-word');
    let currentIndex = 0;

    setInterval(() => {
      const currentWord = wordElements[currentIndex];
      // A palavra atual sai (sobe e some)
      currentWord.classList.replace('word-active', 'word-exiting');

      // Calcula a próxima palavra
      currentIndex = (currentIndex + 1) % wordElements.length;
      const nextWord = wordElements[currentIndex];

      // Reseta a próxima palavra instantaneamente para a posição de espera (abaixo)
      nextWord.classList.remove('word-exiting', 'word-active');
      nextWord.classList.add('word-entering');

      // Força o navegador a recalcular o layout (aplica a posição sem animar)
      void nextWord.offsetWidth;

      // Ativa a palavra (ela sobe suavemente com o efeito spring)
      nextWord.classList.replace('word-entering', 'word-active');
    }, 2500);
  }

  // --- SCROLL REVEAL ANIMATION ---
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(reveal => revealObserver.observe(reveal));

  // Aciona para os que já estão visíveis na tela no carregamento
  setTimeout(() => {
    reveals.forEach(reveal => {
      const windowHeight = window.innerHeight;
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - 50) {
        reveal.classList.add('active');
      }
    });
  }, 100);

  // --- MÁSCARA DE TELEFONE (WhatsApp) ---
  const phoneInput = document.getElementById('phone');

  if (phoneInput) phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número

    // Limita a 11 números (DDD + 9 dígitos)
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 2) {
      e.target.value = value.replace(/(\d{1,2})/, '($1');
      return;
    }

    const ddd = value.slice(0, 2);
    const numbers = value.slice(2);

    if (numbers.length <= 4) {
      e.target.value = `(${ddd}) ${numbers}`;
    } else if (numbers.length <= 8) {
      // 8 dígitos (celular antigo ou fixo): (XX) XXXX-XXXX
      e.target.value = `(${ddd}) ${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    } else {
      // 9 dígitos: (XX) XXXXX-XXXX
      e.target.value = `(${ddd}) ${numbers.slice(0, 5)}-${numbers.slice(5)}`;
    }
  });

  // --- VALIDAÇÃO E ENVIO DE FORMULÁRIO ---
  const form = document.getElementById('leadForm');
  const phoneError = document.getElementById('phoneError');
  const submitBtn = document.getElementById('submitBtn');

  // URL do Web App do Google Apps Script (Você vai colar a sua aqui)
  const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyHawc1VQwdghdtGLDiZKMtlZn_4bXD04ZQoTL0u0dJVmw7PEYxjnMgenlXGXw5BVU2/exec";

  // LINKS DO GRUPO DO WHATSAPP
  const WHATSAPP_GROUP_LINK_DEFAULT = "https://chat.whatsapp.com/BkrKC8mGPHXIwcW1VSWi6m";
  const WHATSAPP_GROUP_LINK_ADVANCED = "https://chat.whatsapp.com/IYaG09rx7td0x46vFciy2x";

  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();

    const phoneValue = phoneInput.value.replace(/\D/g, '');
    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const aiLevelValue = document.getElementById('ai-level').value;

    // Validação simples de telefone (pelo menos 10 dígitos: DDD + 8 números)
    if (phoneValue.length < 10) {
      phoneInput.classList.add('error');
      phoneError.classList.add('visible');
      phoneInput.style.borderColor = '#ff6b6b';
      return;
    } else {
      phoneInput.classList.remove('error');
      phoneError.classList.remove('visible');
      phoneInput.style.borderColor = 'var(--zait-mint)';
    }

    // Feedback visual de carregamento
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Processando...';
    submitBtn.disabled = true;

    // Define o link de redirecionamento com base no nível de IA
    const targetLink = aiLevelValue === 'avancado' ? WHATSAPP_GROUP_LINK_ADVANCED : WHATSAPP_GROUP_LINK_DEFAULT;

    // Função para mostrar a modal e redirecionar
    const showSuccessModal = () => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();

      const modal = document.getElementById('successModal');
      const modalContent = document.getElementById('successModalContent');

      modal.classList.remove('opacity-0', 'pointer-events-none');
      if (window.lucide) { lucide.createIcons(); }

      // Anima o conteúdo da modal
      setTimeout(() => {
        modalContent.classList.remove('translate-y-8');
        modalContent.classList.add('translate-y-0');
      }, 50);

      // Redirecionamento automático após 3 segundos
      setTimeout(() => {
        window.location.href = targetLink;
      }, 3000);
    };

    // Prepara os dados para envio
    const formData = new FormData();
    formData.append('nome', nameValue);
    formData.append('email', emailValue);
    formData.append('telefone', phoneInput.value);
    formData.append('nivel_ia', aiLevelValue);

    // Verifica se a URL foi configurada, senão apenas simula o envio
    if (GOOGLE_APPS_SCRIPT_URL && GOOGLE_APPS_SCRIPT_URL !== "COLE_SUA_URL_DO_GOOGLE_AQUI") {
      // Dispara a requisição em background (fire and forget) sem fazer o usuário esperar
      fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      }).catch(err => {
        console.error('Erro silencioso no envio:', err);
      });

      // Abre a modal instantaneamente
      showSuccessModal();
    } else {
      // Abre a modal instantaneamente
      showSuccessModal();
    }
  });

  // --- THREE.JS COSMIC PARTICLES (BOLINHAS VOANDO) ---
  function initDottedSurface() {
    const container = document.getElementById('dotted-surface');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.set(0, 0, 1000);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background

    container.appendChild(renderer.domElement);

    // Create particles
    const particleCount = 1000; // Quantidade aumentada de bolinhas (dense)
    const positions = [];
    const velocities = []; // Guarda a velocidade individual de cada bolinha

    const geometry = new THREE.BufferGeometry();

    for (let i = 0; i < particleCount; i++) {
      // Posições aleatórias espalhadas pela tela inteira
      const x = Math.random() * 4000 - 2000;
      const y = Math.random() * 2000 - 1000;
      // Empurra o eixo Z para trás (longe da câmera no z: 1000)
      const z = Math.random() * 2000 - 1500;

      positions.push(x, y, z);

      // Velocidade horizontal aleatória para cada bolinha (voando para a direita)
      velocities.push(Math.random() * 1.5 + 0.5);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 5, // Tamanho base ajustado
      color: 0xB5F2DB, // Cor Zait Mint
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      const positionAttribute = geometry.attributes.position;
      const positionsArray = positionAttribute.array;

      for (let i = 0; i < particleCount; i++) {
        const index = i * 3;

        // Move a bolinha para a direita com a sua velocidade correspondente
        positionsArray[index] += velocities[i];

        // Se a bolinha sair muito da tela pela direita, ela renasce na esquerda
        if (positionsArray[index] > 2000) {
          positionsArray[index] = -2000;
          positionsArray[index + 1] = Math.random() * 2000 - 1000; // Nova posição Y aleatória
        }
      }

      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
    }

    // Handle Window Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
  }

  // Inicializar o efeito 3D
  initDottedSurface();

});
