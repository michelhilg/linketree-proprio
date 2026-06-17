# Design System - Zait AI
*Um guia completo das fundações visuais, componentes e interações da landing page para manter a consistência da marca Zait.*

## 1. Identidade Visual e Temática
A marca Zait reflete sofisticação, tecnologia avançada e alta eficiência. O design é focado em um tema *dark* corporativo premium, com contornos brilhosos (mint green), tipografia forte e elegante, e animações fluidas. A proposta transmite confiança e foco em resultados na integração de Inteligência Artificial.

## 2. Paleta de Cores (Cores Primitivas)
A paleta prioriza tons profundos de azul/teal para transmitir segurança estrutural, combinados com tons luminosos vibrantes como verde-menta e amarelo para gerar engajamento em zonas de ação (CTAs).

- **Background Principal (`--zait-deep-teal`)**: `#042F34` (Verde/Azul Escuro profundo). Serve como base para o ambiente 3D/espacial.
- **Background Secundário (`--zait-charcoal-teal`)**: `#16232B` (Chumbo/Teal Escuro). Utilizado na composição de base de Cards, Footer, Modal, e grids de características, aumentando o contraste com o fundo primário.
- **Cor de Realce Primária (`--zait-mint`)**: `#B5F2DB` (Menta). Utilizada amplamente em CTAs principais, detalhes de bordas luminosas, palavras de destaque tipográfico (`italic`) e efeitos visuais como os *glows* projetados em backgrounds.
- **Cor de Realce Secundária (`--zait-yellow`)**: `#FFC933` (Amarelo). Usada sobretudo como cor de *hover* de altíssimo contraste nos botões e avaliações/reviews (estrelinhas).
- **Texto Principal (`--zait-white`)**: `#FFFFFF` (Branco). Destinado exclusivamente a Títulos e subtítulos diretos de leitura obrigatória.
- **Texto Secundário (`--zait-pale-blue`)**: `#E4EEF0` (Azul Pálido). Combinado com opacidades variadas (como `text-[#E4EEF0]/60` ou `/80`) para preencher parágrafos e detalhamentos sem cansar ou agredir a vista na leitura de longos textos.

## 3. Tipografia
O design trabalha majoritariamente com duas fontes para harmonizar rigor técnico e flexibilidade emocional.

- **Fonte Base / Headings / Interface (Sans-serif)**: `League Spartan`
  - *Comportamento*: Utilizada em quase tudo. É a principal condutora do texto no sistema.
  - *Títulos Grandes*: Usam entrelinhamento próximo e tracking encurtado (e.g., `text-5xl font-bold tracking-tighter sm:text-6xl text-white`). 
  - *Parágrafos*: São delineados com menor peso (e.g., `font-light`) e mais folgados na altura de linha (e.g., `leading-relaxed`).

- **Fonte de Impacto e Destaque (Serif)**: `Instrument Serif`
  - *Comportamento*: Usada apenas com *italics* (`font-serif-italic`). Usada em momentos precisos para sofisticar ou evidenciar um conceito dentro de um H1 ou H2 (e.g., *Ecossistema*, *Liderar*, *Impactos*). Essa classe destaca uma fração valiosa da frase principal na cor primária da marca.

## 4. Botões e CTAs
Os botões seguem dois padrões (Primary State e Outline/Ghost State), sempre apostando em cantos bastante arredondados e alta interatividade visual.

- **Botão Primário (Ação Crítica - ex: Agendar Consulta)**:
  - Estilo estático: Fundo verde-menta vibrante (`bg-[#B5F2DB]`), texto na cor azul de fundo sólido (`text-[#042F34]`), font-bold e contornos abaulados (`rounded-xl` ou `2xl`).
  - Interação: *Hover* causa transição brusca e intencional de cor (para a cor amarela: `hover:bg-[#FFC933]`), realocando a cor de texto para facilitar o contraste (`hover:text-[#16232B]`). Há *click scale down* de clique e leve emissão de sombra projetada nas extremidades do botão (`shadow-[0_0_40px_rgba(255,201,51,0.2)]`).

- **Botão Secundário (Ação Discreta - ghost border)**:
  - Estilo estático: Fundo transparente com fina linha limiar menta de baixa opacidade (`border border-[#B5F2DB]/30`), letras coloridas e caixa alta.
  - Interação: No hover há preenchimento invertido (O botão assume a cor base verde menta total). Setas de ícone acionam pequenos distanciamentos interativos `group-hover:translate-x-1`.

## 5. Formulários e Inputs
O sistema de inputs presente na Modal e no bloco final de Contato segue uma estética "Dark Neo-Burtalism": caixas grandes, espaçosas e bordas visíveis.

- **Formatação de Inputs Base**: Background na cor absoluta primária (`bg-[#042F34]`), com `border` translúcido fino e espaçamentos internos longos (`px-6 py-4`).
- **Raio de bordas**: Todos os campos apresentam `rounded-2xl` combinando com as quinas de todo o site.
- **Status (States)**: 
  - Quando os campos recebem *Focus*: ganham contorno de `border` nítida na cor do acento primário (`focus:border-[#B5F2DB]`).
  - Textos inseridos e placeholders diferem pelo nível de luminosidade translúcida do pálido (`text-[#E4EEF0]`).
- **Validação Automática (Regex)**: Especificamente nos telefones, a formatação limpa e reorganiza visualmente a máscara em tempo real usando state no formato `(XX)XXXXX-XXXX`, bloqueando letras ou formatações errôneas.

## 6. Cards e Componentes Estruturais
A estrutura preza por limites visuais e centralização clássica:

- **Contêineres de conteúdo e padding**: Limita visivelmente a interface num core center flexível `max-w-7xl mx-auto px-6`.
- **Card Styling (Planos, Features e Testimonials)**:
  - Extremos raios em bordas (Raio `[40px]` ou `[32px]`), background escovados de base chumbo e acréscimos sutis do blur (`backdrop-blur-sm`).
  - Apresentam elementos de detalhamento subjacente (ex: grandes números translúcidos atrás do layout) revelados timidamente em efeitos de hover.
  - **Imagens Thumbnail**: Renderizadas majoritariamente com filtro preto e branco (`grayscale`), com restituição plena das cores ou suaves escalas em efeitos `hover`.

## 7. Efeitos Visuais e Animações
O design é intensamente preenchido com sutilezas táteis que guiam ou captam o leitor.

- **Background Cósmico de Estrelas**: Implementação estática via canvas, com partículas esparsas interativas na tonalidade Zait Mint Muted que reforçam o "Caminho rumo à nova economia".
- **Auras de Realce Brilhante (Glows)**: Emprego extenso do blur extremo nas camadas mais inferiores de blocos específicos. Formas vetoriais borradas `blur-3xl` geram luzes pontuais azuladas/menta ao fundo das quinas superiores no Footer e na Modal.
- **Scroll Reveals (Framer Motion)**: Absolutamente tudo é revelado quando passa para o campo de visão (`viewport`). Isso evita carregar estaticamente todos os pesos visuais ao mesmo tempo e os encadeia a partir do atraso de tempo dinâmico (Stagger delays e Slide-Up fade-ins).

## 8. Elementos de Marca: Identificadores
- **Favicon**: Símbolo único (letra "z"), importado em png de alta definição, mapeado com `apple-touch-icon`.
- **Logotipos e Símbolos Principais**:
  - Nas áreas institucionais de cabeçalho (`navbar`) e finalização (`footer`), usa-se a logo extensa completa, em formato `img` (Símbolo + Nome).
  - Em locais isolados como modais e caixas centralizadas de formulário, é alocado apenas o seu símbolo emblemático para manter o minimalismo no miolo do card. Sempre com descrições curtas e em pulse-animation.
- **Ícones Funcionais (`lucide-react`)**: Todos os ícones comunicativos utilizam espessura base uniforme com os fundos escuros da página para harmonização geral, garantindo que botões de redes sociais alterem para a cor secundária (menta) no ato do sobrevoar (hover) do mouse.

---
*Este documento é atualizado ativamente, servindo de base de referências para a construção e refatoração do Front-end em React / Tailwind para a Zait AI Systems.*
