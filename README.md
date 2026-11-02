# FOOTBALL CLUB TOURNAMENT — landing page de catálogos

Site estático responsivo, sem frameworks, banco de dados ou instalação de pacotes. Pronto para **GitHub Pages** e **Vercel**.

## O que está incluído

- 10 seções com os banners fornecidos: 9 categorias com 187 clubes/seleções, mais a categoria **Outras Coleções** (sem itens fornecidos).
- 182 links de catálogo recebidos; 5 entradas sem link permanecem visíveis e não são clicáveis.
- Menu hierárquico por liga no computador e menu expansível no celular.
- Pesquisa instantânea por nome de clube, seleção ou campeonato (com tolerância a acentos).
- Carrosséis em loop horizontal, com movimento automático, setas, arraste e pausa durante interações. Com `prefers-reduced-motion`, a movimentação automática é desativada.
- Logomarca local em WebP, imagens externas com lazy loading e reserva de espaço. Escudos que não carregam usam monogramas como substitutos.
- WhatsApp da loja no rodapé. **Instagram omitido** conforme solicitado.

## Arquivos

```text
landing-page/
├── index.html
├── style.css
├── script.js
├── configuracao.js
├── assets/
│   └── imagens/
│       └── logo.webp
└── README.md
```

Todos os dados de conteúdo ficam em **`configuracao.js`**. Não é necessário editar `index.html`, `style.css` nem `script.js` para adicionar ou reorganizar categorias e clubes.

## Como publicar no GitHub Pages

1. Descompacte o ZIP.
2. Crie um repositório no GitHub, por exemplo `catalogo-futebol`.
3. Envie **o conteúdo da pasta `landing-page` para a raiz do repositório** (deve aparecer `index.html` no nível principal).
4. Acesse **Settings → Pages**.
5. Em **Build and deployment**, escolha **Deploy from a branch**; selecione a branch `main` e a pasta `/ (root)`; salve.
6. O site será disponibilizado em `https://SEU-USUARIO.github.io/catalogo-futebol/` quando o GitHub concluir a publicação.

> Se o repositório for do tipo `SEU-USUARIO.github.io`, o endereço principal será `https://SEU-USUARIO.github.io/`.

## Como publicar na Vercel

1. Envie os arquivos para um repositório GitHub conforme explicado acima.
2. Na [Vercel](https://vercel.com/), escolha **Add New → Project** e importe o repositório.
3. Escolha **Other** como framework, sem comando de build.
4. Deixe o diretório raiz como `/` e publique com **Deploy**.

Você também pode fazer o upload da pasta em ferramentas de deploy estático que aceitem HTML, CSS e JS sem build.

## Como atualizar a loja

Abra `configuracao.js` e localize o objeto `loja`:

```js
loja: {
  nome: "FOOTBALL CLUB TOURNAMENT",
  logo: "./assets/imagens/logo.webp",
  whatsapp: "https://wa.me/559885389789",
  whatsappExibicao: "+55 98 8538-9789",
  instagram: ""
}
```

- **`nome`**: nome mostrado no cabeçalho, rodapé e título da aba.
- **`logo`**: URL pública ou caminho local. Para trocar a imagem, substitua `assets/imagens/logo.webp` pelo novo arquivo (ou altere o caminho).
- **`whatsapp`**: link completo `https://wa.me/` seguido de código do país, DDD e número, sem espaços ou símbolos.
- **`whatsappExibicao`**: texto exibido para o usuário.
- **`instagram`**: mantenha a string vazia (`""`) para ocultá-lo. Se desejar incluir no futuro, use a URL completa da conta.

**Atenção ao WhatsApp:** o número foi montado com os dígitos exatamente informados (`+55 98 8538-9789`, removendo o `+` final digitado por engano). Confira se o número está completo antes de divulgar o site; não acrescentamos nenhum dígito presumido.

## Como adicionar uma nova liga

Dentro do array `ligas`, adicione um objeto seguindo esta estrutura:

```js
{
  id: "identificador-unico",
  nome: "Nome da Categoria",
  tipo: "clube",            // "clube", "selecao" ou "colecao"
  bannerDesktop: "https://exemplo.com/banner-desktop.webp",
  bannerMobile: "",          // opcional; vazio usa bannerDesktop
  clubes: [
    {
      nome: "Nome do Clube",
      imagem: "https://exemplo.com/escudo.webp",
      link: "https://photos.app.goo.gl/EXEMPLO"
    }
  ]
}
```

As URLs acima são **somente exemplos explicativos**. Não são usadas no site entregue.

- A **ordem dos objetos** em `ligas` é a ordem das seções, do menu e dos links rápidos.
- A **ordem dos objetos** em `clubes` é a ordem original exibida no carrossel.
- Para uma seleção, use `tipo: "selecao"`; o título muda automaticamente para "ESCOLHA SUA SELEÇÃO".
- Para **um clube sem link**, use `link: null`. Ele permanece no carrossel sem clique.
- Para adicionar clubes a **Outras Coleções**, encontre essa categoria ao final do arquivo e preencha o array `clubes` com os dados reais.
- Para uma categoria sem banner, use `bannerDesktop: ""`; será criado um espaço reservado com o nome da liga.
- **Não altere as URLs de catálogos existentes** ao atualizar banners ou escudos.

## Imagens, desempenho e compatibilidade

- Banners recebidos estão no ImageKit, originalmente em PNG; as URLs foram mantidas como fornecidas. Você pode substituí-las por WebP no futuro para melhorar o carregamento, sem mexer no código.
- Os escudos do arquivo original apontam para `footylogos.com`. **O próprio arquivo avisava que 184 URLs eram candidatas não verificadas**. Se alguma não abrir, o site exibirá automaticamente um monograma. Você pode substituir `imagem` por uma URL pública no ImageKit.
- Preferência de tamanho: **banner desktop 1920 × 600 px**, **banner mobile 1080 × 600 px**, **escudos 320 × 320 px** em WebP ou PNG com transparência.
- A imagem da logomarca foi convertida para WebP e recortada apenas nas bordas vazias, preservando o desenho e o fundo escuro original.
- O site usa caminhos relativos (`./...`), adequados a URLs em subdiretórios do GitHub Pages.
- Nenhum dado pessoal de usuário é armazenado pelo site. Catálogos e WhatsApp são links externos que abrem em nova aba.

## Observações de origem

- O texto que acompanha os escudos menciona “ATLANTA SPORTS”, mas a logomarca visual fornecida contém “FOOTBALL CLUB TOURNAMENT”. O nome da **logomarca enviada** foi utilizado por padrão e pode ser alterado em `configuracao.js`.
- A lista de clubes foi preservada na ordem de suas **9 categorias de origem**; a categoria **Outras Coleções**, que possuía banner mas não tinha itens no arquivo, foi acrescentada **ao final**, sem inventar clubes.
- Alguns links de catálogos recebidos são Google Drive ou Google Fotos em formato longo. Todos foram mantidos no formato original.
- Esta entrega foi testada localmente com Chromium em resoluções de 1440 px, 390 px e 320 px. **A disponibilidade futura de links externos não pode ser garantida**.

## Teste local rápido

Abra `index.html` no navegador. Se preferir um endereço local:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000/` na pasta que contém `index.html`.

---

Desenvolvido em HTML5, CSS3 e JavaScript moderno, sem dependências adicionais.
