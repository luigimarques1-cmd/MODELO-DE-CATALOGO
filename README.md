# CATÁLOGO DIGITAL — Landing Page BLACK PREMIUM

Site estático, responsivo, em **HTML5 + CSS3 + JavaScript puro**.
Não exige banco de dados, backend, Node, build nem dependências externas de código.

## Conteúdo incluído

- **9 categorias**, na ordem enviada, com os **9 banners originais** do ImageKit.
- **187 clubes e seleções** com nomes, URLs de escudos candidatas e links de catálogo informados.
- Cabeçalho fixo com menu lateral, marca centralizada e pesquisa instantânea.
- Carrosséis independentes com rolagem suave em loop, setas inferiores, arraste no desktop e gesto de deslizar no mobile.
- Suporte a acessibilidade, teclado e preferência por movimento reduzido.
- Foto da logomarca original recortada para remover grandes margens pretas, **sem alterar a arte dourada**.

## Arquivos

```text
index.html
style.css
script.js
configuracao.js
assets/imagens/logo-catalogo-digital.png
assets/imagens/favicon.png
README.md
```

## Publicação na Vercel

1. Crie um repositório no GitHub e envie **o conteúdo desta pasta** (não precisa enviar o ZIP inteiro como um único arquivo).
2. Acesse https://vercel.com/new e conecte a conta GitHub.
3. Escolha o repositório e clique em **Import**.
4. Framework Preset: **Other**. Build Command: **vazio**. Output Directory: **vazio** (raiz).
5. Clique em **Deploy**. A Vercel servirá `index.html` automaticamente.
6. Atualizações feitas no GitHub podem ser publicadas novamente pela Vercel automaticamente.

### GitHub Pages

1. Envie os arquivos para a raiz do repositório.
2. No GitHub, abra **Settings > Pages > Build and deployment**.
3. Em Source, escolha **Deploy from a branch**; selecione `main` e `/ (root)`, depois Save.
4. O site será publicado no endereço do GitHub Pages.

> Importante: para testar localmente, abra `index.html` no navegador. Também é possível iniciar um servidor estático com `python -m http.server 8000` na pasta e abrir `http://localhost:8000`.

## Trocar informações para outra loja

Edite **somente `configuracao.js`**. O HTML, CSS e JS continuam funcionando:

```js
loja: {
  nome: 'NOME DA LOJA',
  logo: './assets/imagens/logo-catalogo-digital.png',
  whatsapp: '55DDDNUMERO',
  instagram: 'https://www.instagram.com/usuario/' // ou '' para ocultar
},
ligas: [
  {
    id: 'liga-01',
    nome: 'NOME DA CATEGORIA',
    bannerDesktop: 'https://.../banner.png',
    bannerMobile: '',
    clubes: [{ nome: 'CLUBE', imagem: 'https://.../escudo.png', link: 'https://photos.app.goo.gl/...' }]
  }
]
```

Se deixar o Instagram vazio, o botão não é exibido. Não informe perfis ou destinos fictícios. Se algum clube ainda não tiver álbum, deixe `link: ''`: o clube será exibido sem clique.

Se substituir a logomarca, salve o arquivo em `assets/imagens/` e atualize o caminho em `configuracao.js` **e, para o cabeçalho inicial, o `src` da imagem no `index.html`**. Ajuste a descrição do site, se necessário.

## Avisos importantes sobre os materiais fornecidos

1. **Instagram:** não foi informado; o botão fica oculto, conforme orientação anterior.
2. **WhatsApp:** o número enviado foi `+55 98 8538-9789+`; o endereço foi montado com os dígitos `559885389789`. **Confira o número antes de publicar** — o telefone fornecido não contém nove dígitos na parte local, e pode estar incompleto.
3. **Clubes sem catálogo no arquivo:** Genoa, Montpellier, Nantes, Brest e FC Dallas. Aparecem sem link para evitar direcionar ao lugar errado.
4. **Escudos:** as URLs fornecidas apontam para o serviço público FootyLogos. O próprio arquivo informava que apenas Brasil, Argentina e Arsenal foram verificados originalmente. Para todas as demais URLs, a disponibilidade **não foi confirmada**. O site tem fallback discreto com as iniciais caso o arquivo de imagem não carregue.
5. **Banners:** usam as 9 URLs do ImageKit exatamente como foram fornecidas. Dimensões declaradas: `width="1080" height="608"`, proporção CSS **135/76**, largura máxima de 1080px, sem crop.
6. **Dependência de imagem externa:** o site precisa de conexão com ImageKit/FootyLogos/Google Fotos para carregar banners, escudos e abrir os catálogos. Os arquivos de imagem originais de 187 escudos **não foram enviados** (apenas seus caminhos no TXT). Se desejar máxima estabilidade, hospede suas próprias imagens e altere `imagem` em `configuracao.js`.

## Testes recomendados antes de divulgar

- Abra no celular e desktop; verifique banners completos e sem deformações.
- Verifique os nove banners e as URLs externas dos escudos.
- Clique em alguns clubes para confirmar se o álbum abre corretamente.
- Teste o menu lateral, submenus, pesquisa, setas e arraste dos carrosséis.
- Confirme o número do WhatsApp.

Esta versão preserva a ordem, os nomes e os links do arquivo de origem. Não substitui destinos ausentes por links inventados.
